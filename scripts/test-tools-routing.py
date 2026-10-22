"""Exercise the production Nginx routes with local HTTP ports and no SSL dependency.

Usage: python scripts/test-tools-routing.py --nginx /path/to/nginx
The temporary configuration only changes listeners, certificates and filesystem roots.
"""
import argparse
import http.client
import os
from pathlib import Path
import shutil
import socket
import subprocess
import tempfile
import time


def free_port():
    with socket.socket() as sock:
        sock.bind(('127.0.0.1', 0))
        return sock.getsockname()[1]


def run(nginx, config_source=None, temp_root=None):
    root = Path(__file__).resolve().parents[1]
    http_port, app_port = free_port(), free_port()
    while app_port == http_port:
        app_port = free_port()
    flags = subprocess.CREATE_NO_WINDOW if os.name == 'nt' else 0
    with tempfile.TemporaryDirectory(prefix='.tools-routing-', dir=temp_root or root) as directory:
        # Use a normalized absolute prefix for Windows portability.
        prefix = Path(directory).resolve()
        (prefix / 'logs').mkdir()
        (prefix / 'temp').mkdir()
        production = Path(config_source or root / 'docker/nginx.conf').read_text(encoding='utf-8')
        adapted = '\n'.join(line for line in production.splitlines() if not line.strip().startswith('ssl_'))
        adapted = adapted.replace('listen 80;', f'listen 127.0.0.1:{http_port};')
        adapted = adapted.replace('listen 443 ssl http2;', f'listen 127.0.0.1:{app_port};')
        adapted = adapted.replace('/var/www/static-sites', (root / 'products').as_posix())
        (prefix / 'nginx.conf').write_text('events {}\nhttp {\n' + adapted + '\n}\n', encoding='utf-8')
        command = [nginx, '-p', prefix.as_posix() + '/', '-c', 'nginx.conf']
        validation = subprocess.run(command + ['-t'], capture_output=True, creationflags=flags)
        if validation.returncode:
            error_log = prefix / 'logs/error.log'
            details = validation.stdout + validation.stderr
            if error_log.exists():
                details += error_log.read_bytes()
            raise RuntimeError('Nginx config validation failed: ' + details.decode('utf-8', errors='replace'))
        process = subprocess.Popen(command + ['-g', 'daemon off;'], creationflags=flags)
        try:
            for _ in range(50):
                if process.poll() is not None:
                    raise RuntimeError('Nginx exited before the routing checks')
                try:
                    with socket.create_connection(('127.0.0.1', app_port), timeout=.2):
                        break
                except OSError:
                    time.sleep(.1)
            else:
                raise RuntimeError('Nginx did not start')

            def request(path, host='tools.tmlab.site', port=app_port):
                connection = http.client.HTTPConnection('127.0.0.1', port, timeout=5)
                connection.request('GET', path, headers={'Host': host})
                response = connection.getresponse()
                result = response.status, response.getheader('Location')
                response.read()
                connection.close()
                return result

            redirects = {
                '/': '/home/',
                '/index.html': '/home/',
                '/?ref=bing': '/home/?ref=bing',
                '/home/index.html': '/home/',
                '/home/index.html?ref=bing&x=1': '/home/?ref=bing&x=1',
                '/remove-bg/index.html': '/remove-bg/',
                '/image-stitch/index.html?mode=vertical': '/image-stitch/?mode=vertical',
            }
            failures = []
            for path, destination in redirects.items():
                expected = (301, 'https://tools.tmlab.site' + destination)
                actual = request(path)
                if actual != expected:
                    failures.append(f'{path}: expected {expected}, got {actual}')
            for path in ['/home/', '/home/?next=/home/index.html', '/remove-bg/', '/image-stitch/', '/shared/images/home.jpg']:
                actual = request(path)
                if actual[0] != 200:
                    failures.append(f'Canonical/asset {path}: expected 200, got {actual}')
            other = request('/home/index.html', host='morandi.tmlab.site')
            if other != (404, None):
                failures.append(f'Unrelated product was affected: {other}')
            if request('/home/index.html?ref=bing', port=http_port) != (301, 'https://tools.tmlab.site/home/index.html?ref=bing'):
                failures.append('Existing HTTP-to-HTTPS redirect changed')
            if failures:
                raise AssertionError('\n'.join(failures))
            print('PASS: 14 routing checks; aliases redirect, queries survive, canonical URLs do not loop, other products are unchanged.')
        finally:
            subprocess.run(command + ['-s', 'quit'], check=False, creationflags=flags)
            try:
                process.wait(timeout=10)
            except subprocess.TimeoutExpired:
                process.terminate()
                process.wait(timeout=5)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--nginx', default=os.environ.get('NGINX_BIN') or shutil.which('nginx'))
    parser.add_argument('--config', help='Optional Nginx config to check instead of docker/nginx.conf')
    parser.add_argument('--temp-dir', help='Optional writable parent for temporary Nginx files')
    args = parser.parse_args()
    if not args.nginx:
        parser.error('Pass --nginx or set NGINX_BIN to an existing official Nginx executable')
    run(str(Path(args.nginx).resolve()), args.config, args.temp_dir)

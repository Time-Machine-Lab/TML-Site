"""Rebuild Tools' geometric SVG/PNG/ICO brand assets (requires Pillow)."""
from pathlib import Path
import shutil
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / 'products/tools/shared/images'
BRAND = IMAGES / 'brand'
DESIGN = ROOT / 'design/tools-brand'

# A single geometry source drives both vector and raster output, on a 64-unit grid.
DESIGNS = {
    'toolbox': ('#4f46e5', [
        (22, 16, 42, 32, 5, '#ffffff'),
        (26, 20, 38, 29, 2, '#4f46e5'),
        (12, 26, 52, 50, 5, '#ffffff'),
        (12, 34, 52, 38, 0, '#4f46e5'),
        (28, 32, 36, 41, 2, '#22d3ee'),
    ]),
    'frame': ('#0f2438', [
        (14, 14, 20, 40, 2, '#ffffff'),
        (14, 14, 40, 20, 2, '#ffffff'),
        (44, 24, 50, 50, 2, '#22d3ee'),
        (24, 44, 50, 50, 2, '#22d3ee'),
        (29, 29, 37, 37, 2, '#ffffff'),
        (44, 14, 50, 20, 2, '#fb923c'),
    ]),
    'module': ('#4338ca', [
        (12, 16, 24, 28, 3, '#ffffff'),
        (26, 16, 38, 28, 3, '#ffffff'),
        (40, 16, 52, 28, 3, '#ffffff'),
        (26, 30, 38, 50, 3, '#22d3ee'),
    ]),
}


def vector(name):
    bg, shapes = DESIGNS[name]
    rects = [(0, 0, 64, 64, 15, bg), *shapes]
    body = ''.join(
        f'  <rect x="{x}" y="{y}" width="{r-x}" height="{b-y}" rx="{radius}" fill="{color}"/>\n'
        for x, y, r, b, radius, color in rects
    )
    return '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">\n' + body + '</svg>\n'


def raster(name, size):
    scale = size * 4 / 64
    canvas = Image.new('RGBA', (size * 4, size * 4))
    draw = ImageDraw.Draw(canvas)
    bg, shapes = DESIGNS[name]
    for x, y, r, b, radius, color in [(0, 0, 64, 64, 15, bg), *shapes]:
        # Pillow's inclusive pixel bounds need one subpixel removed at right/bottom.
        draw.rounded_rectangle((x*scale, y*scale, r*scale-1, b*scale-1), radius=radius*scale, fill=color)
    return canvas.resize((size, size), Image.Resampling.LANCZOS)


def preview():
    sheet = Image.new('RGB', (1500, 940), '#f4f5f8')
    d = ImageDraw.Draw(sheet)
    font_dir = Path('C:/Windows/Fonts')
    regular = lambda size: ImageFont.truetype(str(font_dir / 'segoeui.ttf'), size)
    bold = lambda size: ImageFont.truetype(str(font_dir / 'segoeuib.ttf'), size)
    d.text((70, 48), 'TOOLS / IDENTITY STUDIES', fill='#4f46e5', font=bold(17))
    d.text((70, 82), 'Small mark. Clear purpose.', fill='#18181b', font=bold(47))
    d.text((70, 151), 'Three geometric directions for everyday image tools.', fill='#626873', font=regular(22))
    labels = [('01', 'Toolbox', 'Practical / familiar', 'SELECTED'),
              ('02', 'Focus frame', 'Precise / image-first', 'ALTERNATIVE'),
              ('03', 'Modular T', 'Flexible / connected', 'ALTERNATIVE')]
    for i, (name, (number, title, subtitle, status)) in enumerate(zip(DESIGNS, labels)):
        x = 70 + i * 460
        d.rounded_rectangle((x, 225, x+440, 865), radius=24, fill='white')
        d.text((x+30, 251), number, fill='#9095a2', font=regular(18))
        d.text((x+258, 254), status, fill='#4f46e5' if i == 0 else '#9095a2', font=bold(13))
        sheet.paste(raster(name, 200), (x+120, 325), raster(name, 200))
        d.text((x+30, 570), title, fill='#18181b', font=bold(29))
        d.text((x+30, 614), subtitle, fill='#626873', font=regular(19))
        d.line((x+30, 668, x+410, 668), fill='#e7e9ef', width=1)
        d.text((x+30, 690), 'ACTUAL SIZES / 16, 32, 48 PX', fill='#9095a2', font=bold(12))
        d.rounded_rectangle((x+30, 724, x+410, 827), radius=12, fill='#101827')
        for j, size in enumerate((16, 32, 48)):
            left = x+53+j*112
            sheet.paste(raster(name, size), (left, 744+(48-size)//2), raster(name, size))
            d.text((left, 799), f'{size}px', fill='#b3bdcd', font=regular(12))
    d.text((70, 898), 'TMLAB  /  TOOL HUB', fill='#626873', font=bold(14))
    d.text((1080, 898), 'GEOMETRY BEFORE DETAIL', fill='#626873', font=regular(14))
    sheet.save(DESIGN / 'logo-options.png')


def main():
    BRAND.mkdir(parents=True, exist_ok=True)
    DESIGN.mkdir(parents=True, exist_ok=True)
    for name in DESIGNS:
        (BRAND / f'{name}.svg').write_text(vector(name), encoding='utf-8')
        raster(name, 512).save(BRAND / f'{name}.png')
    shutil.copyfile(BRAND / 'toolbox.svg', IMAGES / 'logo.svg')
    for size in (48, 96, 192, 512):
        raster('toolbox', size).save(IMAGES / f'icon-{size}.png')
    raster('toolbox', 180).save(IMAGES / 'apple-touch-icon.png')
    raster('toolbox', 256).save(ROOT / 'products/tools/favicon.ico', sizes=[(16,16), (32,32), (48,48), (64,64), (256,256)])
    preview()
    print('Generated 3 logo variants, favicon family and design/tools-brand/logo-options.png')


if __name__ == '__main__':
    main()

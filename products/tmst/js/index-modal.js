// Integration Logic
    const initPreviewModal = () => {
        const modal = document.getElementById('preview-modal-container');
        const iframe = document.getElementById('preview-iframe');
        if (!modal || !iframe) return;

        // Attach click handlers to all gallery cards
        // Select both .gallery-card and .hero-card to cover all bases
        const cards = document.querySelectorAll('.gallery-card, .hero-card');
        
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default navigation
                
                // Get image source
                // Try to find img tag inside
                const img = card.querySelector('img');
                let src = '';
                let title = '';
                let artist = '';
                
                if (img) {
                    src = img.src;
                }
                
                // Try to get metadata
                if (card.dataset.title) title = card.dataset.title;
                if (card.dataset.artist) artist = card.dataset.artist;
                
                if (!title) {
                     const titleEl = card.querySelector('.card-info-title, .hero-title');
                     if(titleEl) title = titleEl.textContent;
                }

                if (src) {
                    // Collect all wallpaper URLs from the gallery to maintain order
                    const allCards = document.querySelectorAll('.gallery-card img');
                    const wallpaperList = Array.from(allCards).map(img => img.src);
                    
                    // Save to sessionStorage for the preview page to access
                    try {
                        sessionStorage.setItem('preview_wallpapers', JSON.stringify(wallpaperList));
                    } catch (e) {
                        console.error('Failed to save wallpapers to sessionStorage', e);
                    }

                    // Open Modal
                    // Encode params
                    const params = new URLSearchParams({
                        src: src,
                        title: title || 'Wallpaper',
                        artist: artist || 'Artist'
                    });
                    
                    iframe.src = `/wallpaper-preview?${params.toString()}`;
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Disable scroll on body
                }
            });
        });

        // Listen for close message from iframe
        window.addEventListener('message', (event) => {
             // In real production, check origin
             if (event.data === 'close-preview') {
                 closeModal();
             }
        });

        // Also allow closing by function for external calls if needed
        window.closePreviewModal = closeModal;

        function closeModal() {
            modal.style.display = 'none';
            iframe.src = ''; // Stop video/animations
            document.body.style.overflow = '';
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPreviewModal);
    } else {
        initPreviewModal();
    }

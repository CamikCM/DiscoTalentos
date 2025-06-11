        // Filter functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Modal functionality
        const modal = document.getElementById('image-modal');
        const modalImg = document.getElementById('modal-image');

        galleryItems.forEach((item, index) => {
            item.style.setProperty('--item-index', index);
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                modalImg.src = imgSrc;
                modal.classList.add('show');
            });
        });

        function closeModal() {
            modal.classList.remove('show');
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Enhanced mousemove effect
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                const items = document.querySelectorAll('.gallery-item');
                const mouseX = e.clientX;
                const mouseY = e.clientY;

                items.forEach(item => {
                    const rect = item.getBoundingClientRect();
                    const itemX = rect.left + (rect.width / 2);
                    const itemY = rect.top + (rect.height / 2);

                    const distX = mouseX - itemX;
                    const distY = mouseY - itemY;
                    const distance = Math.sqrt(distX * distX + distY * distY);
                    const maxDistance = 500;

                    if (distance < maxDistance) {
                        const power = (1 - distance / maxDistance) * 20;
                        const rotateX = (distY / distance) * power;
                        const rotateY = (distX / distance) * power;

                        item.style.transform = `
                            perspective(1000px) 
                            rotateX(${rotateX}deg) 
                            rotateY(${rotateY}deg)
                            scale(1.02)
                            translateZ(10px)
                        `;
                    } else {
                        item.style.transform = 'none';
                    }
                });
            });
        });

        // Create floating icons
        function createFloatingIcons() {
            const icons = ['🎵', '🎶', '🎸', '🎤', '🎧', '✨', '🎉'];
            const maxIcons = 20; // Limit maximum icons
            let currentIcons = 0;

            setInterval(() => {
                if (currentIcons < maxIcons) {
                    const icon = document.createElement('div');
                    icon.style.position = 'fixed';
                    icon.style.left = Math.random() * 100 + 'vw';
                    icon.style.top = '-30px';
                    icon.style.fontSize = Math.random() * 10 + 20 + 'px';
                    icon.style.opacity = '0.8';
                    icon.style.animation = `float ${Math.random() * 2 + 3}s linear`;
                    icon.style.zIndex = '-1';
                    icon.textContent = icons[Math.floor(Math.random() * icons.length)];
                    document.body.appendChild(icon);
                    currentIcons++;

                    setTimeout(() => {
                        icon.remove();
                        currentIcons--;
                    }, 5000);
                }
            }, 500);
        }

        createFloatingIcons();

        // Create digital rain effect
        function createDigitalRain() {
            const canvas = document.createElement('canvas');
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.zIndex = '-1';
            canvas.style.opacity = '0.3'; // Increased from 0.15 to 0.3
            document.body.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            const characters = '01'; // Matrix-style binary
            const fontSize = 16; // Increased from 14 to 16
            let drops = [];

            function init() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                const columns = canvas.width / fontSize;
                drops = [];
                for(let i = 0; i < columns; i++) {
                    drops[i] = 1;
                }
            }

            function draw() {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'; // Slightly reduced fade for more visibility
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#00ff41'; // Matrix green
                ctx.font = `bold ${fontSize}px monospace`; // Added bold

                for(let i = 0; i < drops.length; i++) {
                    const text = characters.charAt(Math.floor(Math.random() * characters.length));
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    if(drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
                        drops[i] = 0;
                    }
                    drops[i]++;
                }
            }

            window.addEventListener('resize', init);
            init();
            setInterval(draw, 33);
        }

        createDigitalRain();
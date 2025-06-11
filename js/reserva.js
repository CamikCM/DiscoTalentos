

        document.addEventListener('scroll', () => {
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }
            });
        });
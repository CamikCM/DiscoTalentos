        let ticketCount = 1;
        const prices = {
            'bailarina-viral': 40,
            'los-electricos': 35,
            'nye-maxwell': 60
        };

        function updateTickets(change) {
            const newCount = ticketCount + change;
            if (newCount >= 1 && newCount <= 10) {
                ticketCount = newCount;
                document.getElementById('ticket-count').textContent = ticketCount;
                document.getElementById('summary-quantity').textContent = ticketCount;
                updateTotal();
            }
        }

        function updateTotal() {
            const eventSelect = document.getElementById('event-select');
            const selectedEvent = eventSelect.value;
            const price = prices[selectedEvent] || 40;
            
            document.getElementById('price-per-ticket').textContent = `$${price.toFixed(2)}`;
            const total = price * ticketCount;
            document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
        }

        document.getElementById('event-select').addEventListener('change', updateTotal);

        function handleSubmit(event) {
            event.preventDefault();
            alert('¡Gracias por su compra! Se ha enviado un correo de confirmación con los detalles.');
            return false;
        }

        // Floating icons animation
        function createFloatingIcons() {
            const icons = ['🎵', '🎶', '🎸', '🎤', '🎧', '✨', '🎉'];
            
            setInterval(() => {
                const icon = document.createElement('div');
                icon.style.position = 'fixed';
                icon.style.left = Math.random() * 100 + 'vw';
                icon.style.top = '-30px';
                icon.style.fontSize = '20px';
                icon.style.opacity = '0.8';
                icon.style.animation = 'float 4s linear';
                icon.textContent = icons[Math.floor(Math.random() * icons.length)];
                document.body.appendChild(icon);

                setTimeout(() => icon.remove(), 4000);
            }, 300);
        }

        createFloatingIcons();
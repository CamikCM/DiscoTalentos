
function createDiscoElements() {
            const icons = [
                `<svg width="40" height="40" viewBox="0 0 24 24" style="fill:var(--primary)">
                    <path d="M12,3V12.26C11.5,12.09 11,12 10.5,12C8.56,12 7,13.56 7,15.5C7,17.44 8.56,19 10.5,19C12.44,19 14,17.44 14,15.5V6H18V3H12Z"/>
                </svg>`,
                `<svg width="40" height="40" viewBox="0 0 24 24" style="fill:var(--secondary)">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
                </svg>`,
                `<svg width="40" height="40" viewBox="0 0 24 24" style="fill:var(--accent)">
                    <path d="M7.5,7L5.5,5H18.5L16.5,7M11,13V19H6V21H18V19H13V13L21,5V3H3V5L11,13Z"/>
                </svg>`,
                `<svg width="40" height="40" viewBox="0 0 24 24" style="fill:var(--accent2)">
                    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
                </svg>`,
                `<svg width="40" height="40" viewBox="0 0 24 24" style="fill:var(--accent3)">
                    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
                </svg>`
            ];

            setInterval(() => {
                const element = document.createElement('div');
                element.classList.add('disco-element');
                element.style.left = Math.random() * 100 + '%';
                element.style.animationDuration = (Math.random() * 4 + 4) + 's'; // Random duration between 4-8s
                element.style.transform = `scale(${Math.random() * 0.5 + 0.5})`; // Random size
                element.innerHTML = icons[Math.floor(Math.random() * icons.length)];
                document.querySelector('.hero').appendChild(element);

                setTimeout(() => {
                    element.remove();
                }, 8000);
            }, 500);
        }
      
      
      function rotateBackgrounds() {
            const backgrounds = document.querySelectorAll('.hero-background');
            let currentIndex = 0;
            
            backgrounds[0].classList.add('active');
            
            setInterval(() => {
                backgrounds[currentIndex].classList.remove('active');
                
                currentIndex = (currentIndex + 1) % backgrounds.length;
                
                backgrounds[currentIndex].classList.add('active');
            }, 6000); 
        }

        function setupMusicVisualizer() {
            const canvas = document.getElementById('musicVisualizer');
            const ctx = canvas.getContext('2d');
            
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            let time = 0;
            const particles = Array(100).fill().map(() => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                hue: Math.random() * 360
            }));

            function animate() {
                ctx.fillStyle = 'rgba(10, 8, 18, 0.2)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                time += 0.02;

                const waveCount = 3;
                for (let w = 0; w < waveCount; w++) {
                    ctx.beginPath();
                    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
                    gradient.addColorStop(0, `hsla(${(time * 50 + w * 120) % 360}, 100%, 50%, 0.3)`);
                    gradient.addColorStop(1, `hsla(${(time * 50 + w * 120 + 180) % 360}, 100%, 50%, 0.3)`);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 2;

                    for (let x = 0; x < canvas.width; x += 2) {
                        const y = canvas.height / 2 
                            + Math.sin(x * 0.01 + time + w) * 50 * Math.sin(time * 0.5)
                            + Math.cos(x * 0.02 - time * 2 + w) * 30;
                        
                        if (x === 0) {
                            ctx.moveTo(x, y);
                        } else {
                            ctx.lineTo(x, y);
                        }
                    }
                    ctx.stroke();
                }

                particles.forEach(particle => {
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;
                    particle.hue = (particle.hue + 0.5) % 360;

                    if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                    if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

                    const size = particle.size * (1 + Math.sin(time * 2) * 0.3);
                    ctx.beginPath();
                    ctx.fillStyle = `hsla(${particle.hue}, 100%, 50%, 0.8)`;
                    ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
                    ctx.fill();
                });

                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const barCount = 180;
                const radius = Math.min(canvas.width, canvas.height) * 0.25;

                for (let i = 0; i < barCount; i++) {
                    const angle = (i / barCount) * Math.PI * 2;
                    const amplitude = Math.abs(Math.sin(time * 2 + i * 0.1)) * 0.5 + 0.5;
                    const barHeight = radius * amplitude * 0.5;
                    
                    const hue = (time * 50 + i * 2) % 360;
                    ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${0.7 * amplitude})`;
                    ctx.lineWidth = 3;
                    
                    const x1 = centerX + Math.cos(angle) * radius;
                    const y1 = centerY + Math.sin(angle) * radius;
                    const x2 = centerX + Math.cos(angle) * (radius + barHeight);
                    const y2 = centerY + Math.sin(angle) * (radius + barHeight);
                    
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }

                requestAnimationFrame(animate);
            }
            
            animate();
        }

        createDiscoElements();
        rotateBackgrounds();
        setupMusicVisualizer();
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = document.querySelector('.hero-content');
            heroContent.style.transform = `translate(-50%, ${-50 + (scrolled * 0.3)}%)`;
        });

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        if(targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

// En tu página principal (index.html o similar)

onAuthStateChanged(auth, async (user) => {
    if (user) {
        if (user.emailVerified) {
            await updateDoc(doc(db, "usuarios", user.uid), {
                "permisos.verificado": true
            });
        }
    }
});

function updateLoginLink() {
  const loginLink = document.querySelector('.back-to-main'); // Asegúrate de que este selector sea correcto
  if (auth.currentUser) {
    // Usuario logueado
    const userDoc = doc(db, "usuarios", auth.currentUser.uid);
    getDoc(userDoc).then((docSnap) => {
      if (docSnap.exists()) {
        const nombre = docSnap.data().infoBasica.nombreCompleto;
        loginLink.textContent = `Hola, ${nombre}`;
        loginLink.href = "#"; // o cualquier otra URL que desees
      }
    });
  } else {
    // Usuario no logueado
    loginLink.textContent = "Iniciar Sesión";
    loginLink.href = "AuthUser.html";
  }
}

// Llama a la función cuando se carga la página
document.addEventListener('DOMContentLoaded', updateLoginLink);

// También llama a la función cuando el usuario inicia o cierra sesión
auth.onAuthStateChanged((user) => {
  updateLoginLink();
});


  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
    this.reset();
  });
});

        
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
            this.reset();
        });
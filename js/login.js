import { getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
    auth,
    createUserWithEmailAndPassword,
    db,
    doc,
    increment,
    sendEmailVerification,
    serverTimestamp,
    setDoc,
    signInWithEmailAndPassword,
    updateDoc
} from './firebase.js';


// ==================== Efectos Visuales ====================
function createFloatingIcons() {
    const icons = ['🎵', '🎶', '🎸', '🎼', '🎹', '🎷', '🎺', '🪩', '🎊', '🎉'];
    
    setInterval(() => {
        const icon = document.createElement('div');
        icon.style.position = 'fixed';
        icon.style.left = Math.random() * 100 + 'vw';
        icon.style.top = '-30px';
        icon.style.fontSize = (Math.random() * 10 + 15) + 'px';
        icon.style.opacity = '0.8';
        icon.style.animation = `float ${Math.random() * 2 + 3}s linear`;
        icon.style.zIndex = '1';
        icon.textContent = icons[Math.floor(Math.random() * icons.length)];
        document.body.appendChild(icon);

        setTimeout(() => icon.remove(), 5000);
    }, 400);
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function setupScrollAnimations() {
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
}

// ==================== Funcionalidad Auth ====================
function showNotification(message, isSuccess = true) {
    const notification = document.createElement('div');
    notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

function handleAuthError(error) {
    let errorMessage = 'Error en la autenticación';
    
    switch(error.code) {
        case 'auth/email-already-in-use':
            errorMessage = 'El email ya está registrado';
            break;
        case 'auth/invalid-email':
            errorMessage = 'Email no válido';
            break;
        case 'auth/weak-password':
            errorMessage = 'La contraseña debe tener al menos 6 caracteres';
            break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
            errorMessage = 'Email o contraseña incorrectos';
            break;
        case 'auth/too-many-requests':
            errorMessage = 'Demasiados intentos. Intenta más tarde';
            break;
        case 'auth/user-disabled':
            errorMessage = 'Cuenta deshabilitada';
            break;
        default:
            errorMessage = `Error: ${error.message}`;
    }
    
    showNotification(errorMessage, false);
}

async function handleSignup(e) {
    e.preventDefault();
    
    const signupForm = e.target;
    const nombre = signupForm.querySelector('input[type="text"]').value;
    const email = signupForm.querySelector('input[type="email"]').value;
    const password = signupForm.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = signupForm.querySelectorAll('input[type="password"]')[1].value;
    const fechaNacimiento = signupForm.querySelector('input[type="date"]').value;
    
    // Validaciones
    if (password !== confirmPassword) {
        showNotification('Las contraseñas no coinciden', false);
        return;
    }
    
    if (password.length < 6) {
        showNotification('La contraseña debe tener al menos 6 caracteres', false);
        return;
    }
    
    try {
        // Crear usuario en Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Enviar verificación por email
        await sendEmailVerification(user);
        
        // Crear documento en Firestore
        await setDoc(doc(db, "usuarios", user.uid), {
            infoBasica: {
                nombreCompleto: nombre,
                email: email,
                fechaNacimiento: fechaNacimiento,
                fechaRegistro: serverTimestamp()
            },
            permisos: {
                rol: "usuario",
                activo: true,
                verificado: false
            },
            sistema: {
                uid: user.uid,
                ultimoAcceso: null,
                vecesAccedido: 0
            }
        });
        
        showNotification('¡Registro exitoso! Se ha enviado un email de verificación');
        setTimeout(() => window.location.href = 'index.html', 3000);
    } catch (error) {
        console.error('Error en registro:', error);
        handleAuthError(error);
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    const loginForm = e.target;
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    
    try {
        // Iniciar sesión con Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Actualizar datos de último acceso en Firestore
        await updateDoc(doc(db, "usuarios", user.uid), {
            "sistema.ultimoAcceso": serverTimestamp(),
            "sistema.vecesAccedido": increment(1)
        });
        
        showNotification('¡Inicio de sesión exitoso!');
        setTimeout(() => window.location.href = 'index.html', 2000);
    } catch (error) {
        console.error('Error en login:', error);
        handleAuthError(error);
    }
}

// ==================== Inicialización ====================
document.addEventListener('DOMContentLoaded', () => {
    // Efectos visuales
    createFloatingIcons();
    setupSmoothScrolling();
    setupScrollAnimations();
    
    // Toggle entre formularios
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.account-form').forEach(f => f.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(`${btn.dataset.form}-form`).classList.add('active');
        });
    });
    

    function updateLoginLink() {
  const loginLink = document.querySelector('.back-to-main');
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

    // Verificar si el usuario ya está autenticado
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            const userDoc = await getDoc(doc(db, "usuarios", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                if (userData.permisos.verificado) {
                    window.location.href = 'index.html';
                } else {
                    showNotification('Por favor verifica tu email antes de continuar', false);
                }
            } else {
                showNotification('Usuario no encontrado', false);
            }
        }
    });
    // Manejo de formularios
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    
    if (signupForm) signupForm.addEventListener('submit', handleSignup);
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
});
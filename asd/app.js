// ── Cursor personalizado ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
});

(function animateRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(animateRing);
})();

// Elementos interactivos para el cursor
const interactiveElements = document.querySelectorAll('a, button, .product-card, .social-card, .stat-card, .filter-btn, .launch-card, .btn-launch');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        ring.style.width = '54px';
        ring.style.height = '54px';
        ring.style.borderColor = 'var(--amarillo-neon)';
    });
    el.addEventListener('mouseleave', () => {
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = 'var(--celeste)';
    });
});

// ── Header scroll effect ──
window.addEventListener('scroll', () => {
    const header = document.getElementById('mainHeader');
    if (header) {
        header.style.background = window.scrollY > 40 ? 'rgba(5,13,26,.97)' : 'rgba(5,13,26,.88)';
    }
});

// ── Reveal on scroll ──
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

// ── Contadores animados ──
function animateCount(el, target) {
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 80));
    const timer = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = target >= 1000 ? cur.toLocaleString('es-PE') : cur;
        if (cur >= target) clearInterval(timer);
    }, 20);
}

const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const num = entry.target.querySelector('.stat-num');
            if (num && num.dataset.target) {
                animateCount(num, parseInt(num.dataset.target));
                delete num.dataset.target;
            }
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

document.querySelectorAll('.stat-card').forEach(card => statObserver.observe(card));

// ── Filtros de productos ──
window.filterProducts = function(cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    document.querySelectorAll('.product-card').forEach(card => {
        const match = cat === 'all' || card.dataset.cat === cat;
        card.style.opacity = match ? '1' : '0.18';
        card.style.transform = match ? '' : 'scale(0.96)';
        card.style.pointerEvents = match ? 'auto' : 'none';
        card.style.transition = 'opacity 0.4s, transform 0.4s, box-shadow 0.35s, border-color 0.35s';
    });
};

// ── Formulario de contacto ──
const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
    sendBtn.addEventListener('click', function() {
        this.innerHTML = '✓ ¡Enviado correctamente!';
        this.style.background = 'var(--acento-cyan)';
        this.style.color = 'var(--azul-profundo)';
        setTimeout(() => {
            this.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/552/552489.png" alt="Icono de enviar" style="width:18px"> Enviar mensaje';
            this.style.background = '';
            this.style.color = '';
        }, 3000);
    });
}

// ── Newsletter (para la página de lanzamientos si existe) ──
const subscribeBtn = document.querySelector('.btn-subscribe');
if (subscribeBtn) {
    subscribeBtn.addEventListener('click', function() {
        const input = document.querySelector('.newsletter-form input');
        if (input && input.value.trim() !== '') {
            this.textContent = '✓ ¡Suscripción exitosa!';
            setTimeout(() => {
                this.textContent = 'Suscribirme 🚀';
            }, 3000);
            input.value = '';
        } else if (input) {
            alert('Por favor ingresa tu correo electrónico');
        }
    });
}
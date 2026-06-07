// AI-RollCall — Enhanced Interactions & Animations
document.addEventListener('DOMContentLoaded', () => {

    // ── 1. Hero orbs ──
    const hero = document.querySelector('.hero');
    if (hero) {
        ['hero-orb-center','hero-orb-accent','hero-orb-pink'].forEach(cls => {
            const el = document.createElement('div');
            el.className = cls;
            hero.appendChild(el);
        });
    }

    // ── 2. Scroll Reveal observer ──
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = Number(entry.target.dataset.delay || 0);
                setTimeout(() => entry.target.classList.add('visible'), delay);
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    function addReveal(selector, cls, delayFn) {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add(cls);
            if (delayFn) el.dataset.delay = delayFn(i);
            revealObs.observe(el);
        });
    }

    // Feature cards — stagger
    addReveal('.feature-card', 'reveal', i => i * 120);

    // Tech cards — stagger
    addReveal('.tech-card', 'reveal', i => i * 100);

    // Flow steps — left/right alternating per element
    document.querySelectorAll('.flow-step').forEach((step, i) => {
        const content = step.querySelector('.flow-content');
        const image   = step.querySelector('.flow-image');
        const isEven  = i % 2 === 1;
        if (content) { content.classList.add(isEven ? 'reveal-right' : 'reveal-left'); content.dataset.delay = 0;   revealObs.observe(content); }
        if (image)   { image.classList.add(isEven ? 'reveal-left' : 'reveal-right');   image.dataset.delay   = 160; revealObs.observe(image); }
    });

    // About section
    const aboutImg     = document.querySelector('.about-image-wrap');
    const aboutContent = document.querySelector('.about-content');
    if (aboutImg)     { aboutImg.classList.add('reveal-left');  aboutImg.dataset.delay = 0;   revealObs.observe(aboutImg); }
    if (aboutContent) { aboutContent.classList.add('reveal-right'); aboutContent.dataset.delay = 150; revealObs.observe(aboutContent); }

    addReveal('.about-link', 'reveal', i => 200 + i * 100);
    addReveal('.skill-chip', 'reveal', i => i * 60);

    // Section headings
    addReveal('.features h2, .tech-stack h2, .purple-section h2, .about-content h2, .flow-section-header h2', 'reveal', () => 0);

    // CTA section
    addReveal('.purple-section p, .btn-white', 'reveal', i => i * 130);

    // ── 3. Navbar scroll ──
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 60) {
            navbar.style.background = 'rgba(6,7,13,0.97)';
            navbar.style.boxShadow  = '0 8px 40px rgba(0,0,0,0.45)';
        } else {
            navbar.style.background = 'rgba(6,7,13,0.85)';
            navbar.style.boxShadow  = 'none';
        }
    }, { passive: true });

    // ── 4. Smooth cursor glow ──
    const glow = document.createElement('div');
    Object.assign(glow.style, {
        position: 'fixed', width: '320px', height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: '9998',
        transform: 'translate(-50%,-50%)', willChange: 'left,top',
        transition: 'opacity 0.3s'
    });
    document.body.appendChild(glow);

    let mx = -500, my = -500, gx = -500, gy = -500;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

    (function tick() {
        gx += (mx - gx) * 0.07;
        gy += (my - gy) * 0.07;
        glow.style.left = gx + 'px';
        glow.style.top  = gy + 'px';
        requestAnimationFrame(tick);
    })();

    // ── 5. Magnetic buttons ──
    document.querySelectorAll('.btn-cta, .btn-pill, .btn-white').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const r = btn.getBoundingClientRect();
            const dx = (e.clientX - r.left - r.width  / 2) * 0.14;
            const dy = (e.clientY - r.top  - r.height / 2) * 0.14;
            btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-3px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });

    // ── 6. Floating card parallax (desktop only) ──
    const cards = document.querySelectorAll('.floating-card');
    if (cards.length && window.innerWidth > 1200) {
        document.addEventListener('mousemove', e => {
            const cx = window.innerWidth  / 2;
            const cy = window.innerHeight / 2;
            const dx = (e.clientX - cx) / cx;
            const dy = (e.clientY - cy) / cy;
            cards.forEach((card, i) => {
                const f = i === 0 ? 14 : -11;
                const r = i === 0 ? -5  :  5;
                card.style.transform = `rotate(${r + dx * 2}deg) translate(${dx * f}px, ${dy * f}px)`;
            });
        }, { passive: true });
    }

    console.log('%c✦ AI-RollCall UI Active', 'color:#6366f1;font-weight:800;font-size:13px;');
});
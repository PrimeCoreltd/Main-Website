// ==========================================
// SPIM.ai - Advanced Animations
// Custom Animation Controllers
// ==========================================

// ==========================================
// Initialize on DOM Load
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    initFloatingCards();
    initTechVisualization();
    initTextAnimations();
});

// ==========================================
// Floating Cards Animation
// ==========================================
function initFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');

    cards.forEach((card, index) => {
        // Set random animation parameters
        const duration = 6 + Math.random() * 4;
        const delay = Math.random() * 2;

        card.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
}

// ==========================================
// Tech Visualization Animation
// ==========================================
function initTechVisualization() {
    const vizCircle = document.querySelector('.viz-circle');
    const vizRing = document.querySelector('.viz-ring');

    if (vizCircle) {
        // Create animated dots
        const dotsContainer = document.querySelector('.viz-dots');
        if (dotsContainer) {
            const dotCount = 8;
            for (let i = 0; i < dotCount; i++) {
                const dot = document.createElement('div');
                dot.className = 'viz-dot';
                const angle = (i / dotCount) * Math.PI * 2;
                const radius = 140;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                dot.style.cssText = `
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: var(--color-primary);
                    border-radius: 50%;
                    left: calc(50% + ${x}px);
                    top: calc(50% + ${y}px);
                    transform: translate(-50%, -50%);
                    animation: pulse 2s ease-in-out ${i * 0.25}s infinite;
                    box-shadow: 0 0 10px var(--color-primary);
                `;

                dotsContainer.appendChild(dot);
            }
        }
    }
}

// ==========================================
// Text Animations
// ==========================================
function initTextAnimations() {
    const gradientTexts = document.querySelectorAll('.gradient-text-animated');

    gradientTexts.forEach(text => {
        text.style.backgroundSize = '200% auto';
    });
}

// ==========================================
// Particle System
// ==========================================
class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.particles = [];
        this.options = {
            count: options.count || 50,
            speed: options.speed || 1,
            size: options.size || 2,
            color: options.color || 'rgba(0, 102, 255, 0.5)',
            connections: options.connections !== false
        };

        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;';
        this.container.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.resize();

        window.addEventListener('resize', () => this.resize());

        this.createParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }

    createParticles() {
        for (let i = 0; i < this.options.count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.options.speed,
                vy: (Math.random() - 0.5) * this.options.speed,
                size: Math.random() * this.options.size + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = this.options.color;
            this.ctx.fill();

            // Draw connections
            if (this.options.connections) {
                this.particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        this.ctx.strokeStyle = `rgba(0, 102, 255, ${1 - distance / 100})`;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.stroke();
                    }
                });
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ==========================================
// Magnetic Button Effect
// ==========================================
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-magnetic');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// ==========================================
// Cursor Trail Effect
// ==========================================
class CursorTrail {
    constructor() {
        this.trail = [];
        this.maxTrail = 20;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.addTrailPoint(e.clientX, e.clientY);
        });

        this.animate();
    }

    addTrailPoint(x, y) {
        const point = document.createElement('div');
        point.className = 'cursor-trail-point';
        point.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--color-primary);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.6;
        `;

        document.body.appendChild(point);
        this.trail.push({ element: point, life: 1 });

        if (this.trail.length > this.maxTrail) {
            const old = this.trail.shift();
            old.element.remove();
        }
    }

    animate() {
        this.trail.forEach((point, index) => {
            point.life -= 0.05;
            point.element.style.opacity = point.life;
            point.element.style.transform = `scale(${point.life})`;

            if (point.life <= 0) {
                point.element.remove();
                this.trail.splice(index, 1);
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ==========================================
// Scroll Progress Indicator
// ==========================================
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--gradient-primary);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;

    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ==========================================
// 3D Tilt Effect
// ==========================================
function init3DTilt() {
    const cards = document.querySelectorAll('.card-3d-tilt');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ==========================================
// Export for use in other scripts
// ==========================================
window.spimAnimations = {
    ParticleSystem,
    CursorTrail,
    initMagneticButtons,
    initScrollProgress,
    init3DTilt
};

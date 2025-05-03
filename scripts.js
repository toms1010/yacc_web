document.addEventListener('DOMContentLoaded', function() {
    // Animate CONNECT letters
    const connectLetters = document.querySelectorAll('.animated-connect span');
    connectLetters.forEach((letter, index) => {
        letter.style.animation = `bounce 0.5s ease ${index * 0.1}s infinite alternate`;
    });

    // Modal functionality
    const modalLinks = document.querySelectorAll('.nav-link');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    modalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.style.display = 'block';
            modal.querySelector('.modal-content').focus();
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.querySelector('nav').focus();
        });
    });

    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.querySelector('nav').focus();
        }
    });

    // Keyboard accessibility for modals
    modals.forEach(modal => {
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
                document.querySelector('nav').focus();
            }
        });
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        });
    });

    // Add animation to highlight cards when they come into view
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const highlightCards = document.querySelectorAll('.highlight-card');
    highlightCards.forEach(card => {
        observer.observe(card);
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Add keyframe animation for CONNECT letters
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);
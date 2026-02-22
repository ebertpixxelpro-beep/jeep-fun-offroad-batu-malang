// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled', 'shadow');
    } else {
        navbar.classList.remove('scrolled', 'shadow');
    }
});

// Back to Top Button Logic
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function () {
    // Reading Progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.querySelector(".reading-progress");
    if (progressBar) {
        progressBar.style.width = scrolled + "%";
    }

    // Back to Top
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form Submission (Demo)
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Terima kasih! Pesan Anda telah terkirim. Kami akan menghubungi Anda segera melalui email atau WhatsApp.');
        this.reset();
    });
}

// Smooth Scrolling using event delegation (handles dynamic elements like TOC)
document.addEventListener('click', function (e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('mainNavbar')?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    }
});

// Automatic Table of Contents (TOC)
document.addEventListener('DOMContentLoaded', function () {
    const tocContainer = document.querySelector('.toc-list');
    const blogContent = document.querySelector('.blog-content');

    if (tocContainer && blogContent) {
        const headings = blogContent.querySelectorAll('h2, h3');

        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.setAttribute('id', id);

            const li = document.createElement('li');
            li.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-h3' : 'toc-h2';

            const a = document.createElement('a');
            a.href = `#${id}`;
            a.textContent = heading.textContent.trim();

            li.appendChild(a);
            tocContainer.appendChild(li);
        });

        // TOC Toggle Logic
        const tocHeader = document.querySelector('.toc-header');
        if (tocHeader) {
            // Auto-collapse on mobile (screen width < 768px)
            if (window.innerWidth < 768) {
                tocContainer.classList.add('d-none');
                tocHeader.classList.add('collapsed');
            }

            tocHeader.addEventListener('click', function () {
                tocContainer.classList.toggle('d-none');
                this.classList.toggle('collapsed');
            });
        }
    }
});

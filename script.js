// Theme Toggle & Mobile Menu Management

function applyTheme(isDark) {
    if (isDark) {
        document.documentElement.classList.add('dark');
        if (document.body) document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        if (document.body) document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    applyTheme(!isDark);
}

// Immediate theme setup - Default to Day / Light Mode
(function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    if (isDark) {
        document.documentElement.classList.add('dark');
        if (document.body) document.body.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
        if (document.body) document.body.classList.remove('dark');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    applyTheme(isDark);

    // Attach click listeners to all theme toggle buttons
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            toggleTheme();
        });
    });

    // Support legacy checkboxes if any
    document.querySelectorAll('.theme-toggle-input').forEach(input => {
        input.addEventListener('change', (e) => {
            applyTheme(e.target.checked);
        });
    });

    // Mobile Hamburger Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                if (hamburgerIcon) hamburgerIcon.classList.add('hidden');
                if (closeIcon) closeIcon.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
                if (hamburgerIcon) hamburgerIcon.classList.remove('hidden');
                if (closeIcon) closeIcon.classList.add('hidden');
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                if (hamburgerIcon) hamburgerIcon.classList.remove('hidden');
                if (closeIcon) closeIcon.classList.add('hidden');
            }
        });

        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                if (hamburgerIcon) hamburgerIcon.classList.remove('hidden');
                if (closeIcon) closeIcon.classList.add('hidden');
            });
        });
    }

    // Floating Project Cursor Follower (for work page project cards)
    const projectCursor = document.getElementById('project-cursor');
    const projectCards = document.querySelectorAll('.project-card');

    if (projectCursor && projectCards.length > 0) {
        let mouseX = -100, mouseY = -100;
        let isHovering = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (isHovering) {
                projectCursor.style.left = '0px';
                projectCursor.style.top = '0px';
                projectCursor.style.transform = `translate3d(${mouseX + 14}px, ${mouseY + 14}px, 0)`;
            }
        });

        projectCards.forEach(card => {
            card.classList.add('cursor-pointer');

            card.addEventListener('mouseenter', (e) => {
                isHovering = true;
                mouseX = e.clientX;
                mouseY = e.clientY;
                projectCursor.style.left = '0px';
                projectCursor.style.top = '0px';
                projectCursor.style.transform = `translate3d(${mouseX + 14}px, ${mouseY + 14}px, 0)`;
                projectCursor.classList.remove('opacity-0', 'scale-75');
                projectCursor.classList.add('opacity-100', 'scale-100');
            });

            card.addEventListener('mouseleave', () => {
                isHovering = false;
                projectCursor.classList.remove('opacity-100', 'scale-100');
                projectCursor.classList.add('opacity-0', 'scale-75');
            });

            // Click anywhere on card opens project repository
            card.addEventListener('click', (e) => {
                if (e.target.closest('a')) return;
                const targetLink = card.querySelector('h3 a')?.getAttribute('href');
                if (targetLink) {
                    window.open(targetLink, '_blank', 'noopener,noreferrer');
                }
            });
        });
    }
});

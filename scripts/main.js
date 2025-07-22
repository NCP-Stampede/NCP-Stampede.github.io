// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'rotate(0) translate(0, 0)';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'rotate(0) translate(0, 0)';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'rotate(0) translate(0, 0)';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'rotate(0) translate(0, 0)';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background opacity on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.overview-card, .feature-card, .step-card, .api-card, .component-card').forEach(card => {
    observer.observe(card);
});

// Copy code to clipboard functionality
function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(codeBlock => {
        const pre = codeBlock.parentElement;
        const wrapper = document.createElement('div');
        wrapper.className = 'code-wrapper';
        
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="m5 15h4a2 2 0 0 1 2 2v4"></path>
            </svg>
            Copy
        `;
        
        copyButton.addEventListener('click', async function() {
            const text = codeBlock.textContent;
            
            try {
                await navigator.clipboard.writeText(text);
                copyButton.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                    Copied!
                `;
                copyButton.classList.add('copied');
                
                setTimeout(() => {
                    copyButton.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="m5 15h4a2 2 0 0 1 2 2v4"></path>
                        </svg>
                        Copy
                    `;
                    copyButton.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
        
        // Wrap the pre element and add the copy button
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        wrapper.appendChild(copyButton);
    });
}

// Add copy buttons when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add some delay to ensure Prism.js has processed the code
    setTimeout(addCopyButtons, 100);
});

// Add CSS for copy buttons
const copyButtonStyles = `
    .code-wrapper {
        position: relative;
    }
    
    .copy-button {
        position: absolute;
        top: 12px;
        right: 12px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #ffffff;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        font-family: 'Inter', sans-serif;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s ease;
        backdrop-filter: blur(10px);
    }
    
    .copy-button:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.3);
    }
    
    .copy-button.copied {
        background: rgba(34, 197, 94, 0.2);
        border-color: rgba(34, 197, 94, 0.3);
        color: #22c55e;
    }
    
    .copy-button svg {
        width: 16px;
        height: 16px;
    }
`;

// Inject copy button styles
const styleSheet = document.createElement('style');
styleSheet.textContent = copyButtonStyles;
document.head.appendChild(styleSheet);

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    const progressBarFill = progressBar.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', function() {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBarFill.style.width = scrolled + '%';
    });
}

// Add scroll progress styles
const scrollProgressStyles = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(0, 0, 0, 0.1);
        z-index: 1001;
    }
    
    .scroll-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #007AFF, #40a0ff);
        width: 0%;
        transition: width 0.1s ease;
    }
`;

// Add scroll progress on load
document.addEventListener('DOMContentLoaded', function() {
    createScrollProgress();
    
    // Inject scroll progress styles
    const scrollStyleSheet = document.createElement('style');
    scrollStyleSheet.textContent = scrollProgressStyles;
    document.head.appendChild(scrollStyleSheet);
});

// Enhanced navigation highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// Add active nav link styles
const activeNavStyles = `
    .nav-link.active {
        color: #007AFF;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;

// Inject active nav styles
const activeNavStyleSheet = document.createElement('style');
activeNavStyleSheet.textContent = activeNavStyles;
document.head.appendChild(activeNavStyleSheet);

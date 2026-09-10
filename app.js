// Initialize Lucide Icons
lucide.createIcons();

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initial Page Load Animation
window.addEventListener("load", () => {
    const tl = gsap.timeline();

    // Preloader Animation
    tl.to(".preloader-bar", { width: "100%", duration: 1.5, ease: "power2.inOut" })
      .to(".preloader-text", { y: -50, opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.2")
      .to("#preloader", { y: "-100%", duration: 0.8, ease: "power3.inOut" })
      
      // Reveal elements in Hero Section
      .fromTo(".hero-element", 
          { y: 50, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }, "-=0.3"
      );

    // Scroll Animations for elements with .gsap-fade-up
    const fadeElements = document.querySelectorAll(".gsap-fade-up");
    fadeElements.forEach((el) => {
        gsap.fromTo(el,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%", // Trigger when element is 85% down the viewport
                    toggleActions: "play none none reverse" // Play on enter, reverse on leave back
                }
            }
        );
    });
});

// Custom Cursor Logic
const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

// Only run cursor logic on non-touch devices
if (window.matchMedia("(pointer: fine)").matches) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Track mouse position
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Dot follows instantly
        if(cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }
    });

    // Smooth follow for the outer circle
    const animateCursor = () => {
        // Linear interpolation for smooth movement
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;

        if(cursor) {
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
        }
        
        requestAnimationFrame(animateCursor);
    };
    
    animateCursor();

    // Add hover states for interactive elements
    const interactiveElements = document.querySelectorAll("a, button, input, textarea, .hover-target");
    
    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            if(cursor) {
                cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
                cursor.style.backgroundColor = "rgba(184, 134, 11, 0.1)";
                cursor.style.borderColor = "transparent";
            }
        });
        
        el.addEventListener("mouseleave", () => {
            if(cursor) {
                cursor.style.transform = "translate(-50%, -50%) scale(1)";
                cursor.style.backgroundColor = "transparent";
                cursor.style.borderColor = "#B8860B";
            }
        });
    });
}

// Navigation Background on Scroll
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        nav.classList.add("py-4", "shadow-lg");
        nav.classList.remove("py-6");
    } else {
        nav.classList.add("py-6");
        nav.classList.remove("py-4", "shadow-lg");
    }
});

// Contact Form Logic
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;
        
        const subject = encodeURIComponent(`New Inquiry from ${name}`);
        const body = encodeURIComponent(`${message}\n\n---\nName: ${name}\nEmail: ${email}`);
        
        window.location.href = `mailto:davu.venkat2411@gmail.com?subject=${subject}&body=${body}`;
    });
}

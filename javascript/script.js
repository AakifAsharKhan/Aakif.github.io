document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject),
            });

            if (response.ok) {
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                alert('Error sending message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const texts = [
        "Computer Science Engineer",
        "Machine Learning / Deep Learning Engineer",
        "Computer Vision Engineer"
        // "Deep Learning Engineer"
    ];
    const typingElement = document.getElementById('typing-effect');
    let textIndex = 0;
    let charIndex = 0;
    const typingSpeed = 100; // Adjust speed for typing (milliseconds)
    const deletingSpeed = 50; // Adjust speed for deleting (milliseconds)
    const pauseBetween = 1500; // Pause between different texts (milliseconds)

    function typeWriter() {
        if (charIndex < texts[textIndex].length) {
            typingElement.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            setTimeout(deleteWriter, pauseBetween);
        }
    }

    function deleteWriter() {
        if (charIndex > 0) {
            typingElement.textContent = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(deleteWriter, deletingSpeed);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeWriter, typingSpeed);
        }
    }

    typeWriter();
});

document.addEventListener('DOMContentLoaded', function () {
    // Add click event listener to all nav links
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function () {
            // Remove active class from all links
            document.querySelectorAll('.navbar-nav .nav-link').forEach(el => {
                el.classList.remove('active');
            });
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section');
    let lastScrollTop = 0;
    const navbarHeight = navbar.offsetHeight;

    // Function to handle scroll
    function handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Navbar hide/show logic
        if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
            navbar.classList.add('navbar-hidden');
        } else {
            navbar.classList.remove('navbar-hidden');
        }

        lastScrollTop = scrollTop;

        // Highlight active section in navbar
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight;
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - navbarHeight,
                behavior: 'smooth'
            });
        });
    });
});
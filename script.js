document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled', 'bg-gray-900', 'shadow-lg');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-2');
            
            // Ubah warna link saat scroll jika perlu
            navLinks.forEach(link => link.classList.add('text-gray-300'));
        } else {
            navbar.classList.remove('scrolled', 'bg-gray-900', 'shadow-lg');
            navbar.classList.remove('py-2');
            navbar.classList.add('py-4');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenuContainer = document.createElement('div');
    
    // Membuat elemen menu mobile secara dinamis
    mobileMenuContainer.id = 'mobile-menu-overlay';
    mobileMenuContainer.className = 'fixed inset-0 bg-black bg-opacity-95 z-[60] flex flex-col items-center justify-center space-y-8 text-2xl text-white hidden';
    mobileMenuContainer.innerHTML = `
        <button id="close-menu" class="absolute top-6 right-6 text-4xl">&times;</button>
        <a href="#home" class="mobile-link">Home</a>
        <a href="#about" class="mobile-link">Tentang</a>
        <a href="#facilities" class="mobile-link">Fasilitas</a>
        <a href="#classes" class="mobile-link">Kelas</a>
        <a href="#contact" class="bg-orange-600 px-8 py-3 rounded-full">Daftar Sekarang</a>
    `;
    document.body.appendChild(mobileMenuContainer);

    menuBtn.addEventListener('click', () => {
        mobileMenuContainer.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    });

    const closeMenu = () => {
        mobileMenuContainer.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    document.getElementById('close-menu').addEventListener('click', closeMenu);
    
    // Menutup menu saat salah satu link diklik
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- 3. BMI Calculator Logic ---
    window.calculateBMI = function() {
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value) / 100; 
        const resultDiv = document.getElementById('bmi-result');
        const valueSpan = document.getElementById('bmi-value');
        const statusSpan = document.getElementById('bmi-status');

        if (weight > 0 && height > 0) {
            const bmi = (weight / (height * height)).toFixed(1);
            let status = "";
            let color = "";

            if (bmi < 18.5) {
                status = "Kekurangan Berat Badan";
                color = "#fbbf24"; 
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                status = "Berat Badan Ideal";
                color = "#10b981"; 
            } else if (bmi >= 25 && bmi <= 29.9) {
                status = "Kelebihan Berat Badan";
                color = "#f59e0b"; 
            } else {
                status = "Obesitas";
                color = "#ef4444";
            }

            valueSpan.innerText = bmi;
            statusSpan.innerText = status;
            statusSpan.style.color = color;
            
            resultDiv.classList.remove('hidden');
            resultDiv.classList.add('block');
        } else {
            alert("Mohon masukkan berat dan tinggi badan yang valid.");
        }
    };

    // --- 4. Smooth Scrolling for Navigation ---
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

    // --- 5. Video Loading Handler ---
    const video = document.querySelector('video');
    if(video) {
        video.addEventListener('error', (e) => {
            console.error('Video loading error:', e);
            // Jika video tidak bisa dimuat, tampilkan poster image
            video.style.display = 'none';
            const heroSection = document.querySelector('#home');
            heroSection.style.backgroundImage = `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80')`;
            heroSection.style.backgroundSize = 'cover';
            heroSection.style.backgroundPosition = 'center';
        });
    }

    // --- 6. Form Submission (Dummy) ---
    const contactForm = document.querySelector('form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.');
            contactForm.reset();
        });
    }

    // easeout ketika scroll pada hero section untuk efek yang lebih halus
    window.addEventListener('scroll', function() {
        const heroContent = document.querySelector('#home .relative.z-10');
        let scrollPos = window.scrollY;
        
        if (scrollPos <= window.innerHeight) {
            heroContent.style.opacity = 1 - (scrollPos / (window.innerHeight * 0.8));
            heroContent.style.transform = `translateY(${scrollPos * 0.4}px)`; 
        }
    });
});
/* ===========================================
   KAIO BARBER - JAVASCRIPT FUNCTIONALITY
   =========================================== */

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 Kaio Barber - Landing Page carregada com sucesso!');
    
    // Inicializa todas as funcionalidades
    initMobileMenu();
    initScrollEffects();
    initCarousel();
    initSmoothScroll();
    initBackToTop();
    initContactLinks();
    initAnimationsOnScroll();
    
    // =====================================
    // NOVA FUNCIONALIDADE: CARROSSEIS DOS BARBEIROS
    // =====================================
    initBarbersCarousels();
});

/* =====================================
   MENU MOBILE
   ===================================== */
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle do menu mobile
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Anima o ícone do hambúrguer
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Fecha o menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // Fecha o menu ao clicar fora dele
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

/* =====================================
   EFEITOS DE SCROLL
   ===================================== */
function initScrollEffects() {
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Adiciona classe quando faz scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Destaca o link ativo baseado na seção visível
        highlightActiveNavLink();
    });
    
    // Função para destacar o link ativo
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove classe active de todos os links
                navLinks.forEach(link => link.classList.remove('active'));
                // Adiciona classe active ao link correspondente
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
}

/* =====================================
   CARROSSEL DA GALERIA PRINCIPAL
   ===================================== */
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentSlide = 0;
    let slideInterval;
    
    // Inicia o carrossel automático
    function startCarousel() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000); // Troca de slide a cada 5 segundos
    }
    
    // Para o carrossel automático
    function stopCarousel() {
        clearInterval(slideInterval);
    }
    
    // Mostra o slide especificado
    function showSlide(index) {
        // Remove classe active de todos os slides e indicadores
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Adiciona classe active ao slide e indicador atual
        if (slides[index] && indicators[index]) {
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    // Próximo slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    // Slide anterior
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopCarousel();
            nextSlide();
            startCarousel();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopCarousel();
            prevSlide();
            startCarousel();
        });
    }
    
    // Indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopCarousel();
            showSlide(index);
            startCarousel();
        });
    });
    
    // Pausa o carrossel quando o mouse está sobre ele
    const carousel = document.querySelector('.gallery-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopCarousel);
        carousel.addEventListener('mouseleave', startCarousel);
    }
    
    // Controle por teclado
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            stopCarousel();
            prevSlide();
            startCarousel();
        } else if (event.key === 'ArrowRight') {
            stopCarousel();
            nextSlide();
            startCarousel();
        }
    });
    
    // Inicia o carrossel
    if (slides.length > 0) {
        showSlide(0);
        startCarousel();
    }
}

/* =====================================
   NOVA FUNCIONALIDADE: CARROSSEIS DOS BARBEIROS
   ===================================== */
function initBarbersCarousels() {
    // Inicializa carrossel do Peterson
    initBarberCarousel('peterson');
    
    // Inicializa carrossel do Kaio Garcia
    initBarberCarousel('kaio');
}

function initBarberCarousel(barberName) {
    const carousel = document.getElementById(`${barberName}-carousel`);
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.barber-slide');
    const indicators = carousel.querySelectorAll('.barber-indicator');
    const prevBtn = carousel.querySelector('.barber-carousel-btn.prev');
    const nextBtn = carousel.querySelector('.barber-carousel-btn.next');
    
    let currentSlide = 0;
    let slideInterval;
    
    // Inicia o carrossel automático
    function startCarousel() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 4000); // Troca de slide a cada 4 segundos
    }
    
    // Para o carrossel automático
    function stopCarousel() {
        clearInterval(slideInterval);
    }
    
    // Mostra o slide especificado
    function showSlide(index) {
        // Remove classe active de todos os slides e indicadores
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Adiciona classe active ao slide e indicador atual
        if (slides[index] && indicators[index]) {
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    // Próximo slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    // Slide anterior
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // Event listeners para botões
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopCarousel();
            nextSlide();
            startCarousel();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopCarousel();
            prevSlide();
            startCarousel();
        });
    }
    
    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopCarousel();
            showSlide(index);
            startCarousel();
        });
    });
    
    // Pausa o carrossel quando o mouse está sobre ele
    carousel.addEventListener('mouseenter', stopCarousel);
    carousel.addEventListener('mouseleave', startCarousel);
    
    // Inicia o carrossel
    if (slides.length > 0) {
        showSlide(0);
        startCarousel();
        
        console.log(`✅ Carrossel do ${barberName} inicializado com sucesso!`);
    }
}

/* =====================================
   SCROLL SUAVE
   ===================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =====================================
   BOTÃO VOLTAR AO TOPO
   ===================================== */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Mostra/esconde o botão baseado na posição do scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Funcionalidade do botão
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/* =====================================
   LINKS DE CONTATO
   ===================================== */
function initContactLinks() {
    // Link do WhatsApp
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Analytics ou tracking pode ser adicionado aqui
            console.log('📱 WhatsApp clicado');
        });
    });
    
    // Links de telefone
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('📞 Telefone clicado');
        });
    });
    
    // Links de email
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('📧 E-mail clicado');
        });
    });
    
    // Links de redes sociais
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.classList.contains('instagram') ? 'Instagram' :
                           this.classList.contains('facebook') ? 'Facebook' :
                           this.classList.contains('tiktok') ? 'TikTok' : 'Rede Social';
            console.log(`🌐 ${platform} clicado`);
        });
    });
    
    // =====================================
    // NOVA FUNCIONALIDADE: TRACKING DOS BOTÕES DOS BARBEIROS
    // =====================================
    
    // Botões de agendamento dos barbeiros
    const barberScheduleLinks = document.querySelectorAll('.btn-barber.schedule');
    barberScheduleLinks.forEach(link => {
        link.addEventListener('click', function() {
            const barberName = this.textContent.includes('Peterson') ? 'Peterson' : 'Kaio Garcia';
            console.log(`📅 Agendamento solicitado com ${barberName}`);
        });
    });
    
    // Links do Instagram dos barbeiros
    const barberInstagramLinks = document.querySelectorAll('.btn-barber.instagram');
    barberInstagramLinks.forEach(link => {
        link.addEventListener('click', function() {
            const barberName = link.closest('.barber-profile').querySelector('.barber-name').textContent;
            console.log(`📸 Instagram do ${barberName} acessado`);
        });
    });
}

/* =====================================
   ANIMAÇÕES NO SCROLL
   ===================================== */
function initAnimationsOnScroll() {
    // Observador de interseção para animações
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
    
    // Elementos para animar (incluindo os novos elementos dos barbeiros)
    const elementsToAnimate = document.querySelectorAll(`
        .service-card,
        .contact-card,
        .review-card,
        .info-item,
        .section-title,
        .barber-profile,
        .barber-info,
        .barber-gallery
    `);
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

/* =====================================
   UTILITY FUNCTIONS
   ===================================== */

// Debounce function para otimizar performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function para eventos de scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Função para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Função para formatar número de telefone
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* =====================================
   OTIMIZAÇÕES DE PERFORMANCE
   ===================================== */

// Otimiza eventos de scroll
const optimizedScrollHandler = throttle(function() {
    // Handlers de scroll otimizados aqui
}, 16); // ~60fps

// Otimiza eventos de resize
const optimizedResizeHandler = debounce(function() {
    // Ajustes de layout responsivo aqui
    console.log('📱 Viewport redimensionado');
}, 250);

window.addEventListener('scroll', optimizedScrollHandler);
window.addEventListener('resize', optimizedResizeHandler);

/* =====================================
   ERROR HANDLING
   ===================================== */

// Captura erros JavaScript
window.addEventListener('error', function(event) {
    console.error('❌ Erro JavaScript:', event.error);
    // Aqui você pode enviar o erro para um serviço de monitoramento
});

// Captura erros de Promise rejeitadas
window.addEventListener('unhandledrejection', function(event) {
    console.error('❌ Promise rejeitada:', event.reason);
    event.preventDefault();
});

/* =====================================
   ACCESSIBILITY IMPROVEMENTS
   ===================================== */

// Melhora a navegação por teclado
document.addEventListener('keydown', function(event) {
    // Escape para fechar modais/menus
    if (event.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const navToggle = document.getElementById('nav-toggle');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// Adiciona indicação visual para elementos com foco
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
});

/* =====================================
   LAZY LOADING PARA IMAGENS
   ===================================== */

// Implementa lazy loading básico para imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Uncomment the line below if you want to use lazy loading
// initLazyLoading();

console.log('✅ Kaio Barber - Todos os scripts carregados com sucesso!');
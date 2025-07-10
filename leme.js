document.addEventListener('DOMContentLoaded', function() {
  // Carousel functionality
  let currentSlide = 0;
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');

  function showSlide(n) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === n);
      indicators[i].classList.toggle('active', i === n);
    });
    currentSlide = n;
  }

  window.changeSlide = function(direction) {
    let next = (currentSlide + direction + slides.length) % slides.length;
    showSlide(next);
  };

  window.currentSlide = function(n) {
    showSlide(n - 1);
  };

  // Auto slide
  setInterval(() => {
    changeSlide(1);
  }, 5000);

  // Inicializa
  showSlide(0);

  // Menu mobile toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }
  
  // Smooth scroll para links do menu
  const menuLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Fecha o menu mobile se estiver aberto
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
        }
      }
    });
  });
  
  // Header scroll effect
  const header = document.querySelector('.header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
      header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Animações de scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Adiciona classe fade-in aos elementos
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });
  
  // Formulário de reserva
  const reservationForm = document.querySelector('.contato-form form');
  if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simula envio do formulário
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Enviando...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        alert('Reserva enviada com sucesso! Entraremos em contato em breve.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }
  
  // Parallax effect para elementos flutuantes
  const floatingIcons = document.querySelectorAll('.floating-icon');
  
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    floatingIcons.forEach((icon, index) => {
      const speed = 0.5 + (index * 0.1);
      icon.style.transform = `translateY(${rate * speed}px)`;
    });
  });
  
  // Contador de visitantes (simulado)
  function updateVisitorCount() {
    const visitorCount = Math.floor(Math.random() * 50) + 100;
    // Você pode adicionar um elemento para mostrar o contador
    console.log(`Visitantes online: ${visitorCount}`);
  }
  
  // Atualiza o contador a cada 30 segundos
  setInterval(updateVisitorCount, 30000);
  updateVisitorCount();
  
  // Efeito de digitação no título
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    // Inicia a animação após 1 segundo
    setTimeout(typeWriter, 1000);
  }
  
  // Adiciona efeito de hover nos cards de eventos
  const eventCards = document.querySelectorAll('.evento-card');
  eventCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Adiciona efeito de clique nos itens do cardápio
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'translateX(5px)';
      }, 150);
    });
  });
  
  // Adiciona efeito de loading na página
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });
  
  // Adiciona efeito de confete quando clicar no botão principal
  const primaryBtn = document.querySelector('.btn-primary');
  if (primaryBtn) {
    primaryBtn.addEventListener('click', function() {
      createConfetti();
    });
  }
  
  // Função para criar efeito de confete
  function createConfetti() {
    const colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B'];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = '50%';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';
      
      document.body.appendChild(confetti);
      
      const animation = confetti.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ], {
        duration: 3000 + Math.random() * 2000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });
      
      animation.onfinish = () => {
        confetti.remove();
      };
    }
  }
  
  // Adiciona efeito de vibração nos ícones sociais
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.animation = 'shake 0.5s ease-in-out';
    });
    
    link.addEventListener('animationend', function() {
      this.style.animation = '';
    });
  });
  
  // Adiciona CSS para animação de shake
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    
    .loaded {
      opacity: 1;
    }
    
    body {
      opacity: 0;
      transition: opacity 0.5s ease;
    }
  `;
  document.head.appendChild(style);

  // Botão flutuante voltar ao topo
  const btnTop = document.getElementById('btn-top');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 200) {
      btnTop.style.display = 'flex';
    } else {
      btnTop.style.display = 'none';
    }
  });
  btnTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}); 
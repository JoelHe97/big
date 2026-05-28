document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     NAVBAR DINÁMICO (CAMBIO CON SCROLL)
     ========================================== */
  const header = document.getElementById('main-header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Ejecutar al inicio por si la página carga con scroll activo
  handleScroll();

  /* ==========================================
     MENÚ RESPONSIVE (TOGGLE DE HAMBURGUESA)
     ========================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      
      // Rotar ligeramente o animar el botón si fuera necesario
      menuToggle.style.transform = navMenu.classList.contains('open') ? 'rotate(90deg)' : 'rotate(0deg)';
      menuToggle.style.transition = 'transform 0.3s ease';
    });

    // Cerrar el menú al hacer click en cualquier link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.style.transform = 'rotate(0deg)';
      });
    });
  }

  /* ==========================================
     ANIMACIONES DE ENTRADA Y SALIDA (REVEAL ON SCROLL)
     ========================================== */
  const revealItems = document.querySelectorAll('.reveal-item');

  if (revealItems.length > 0) {
    const revealOptions = {
      root: null, // utiliza el viewport
      threshold: 0.1, // se activa cuando el 10% del elemento es visible
      rootMargin: '0px 0px -50px 0px' 
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          // Remover la clase para efecto de salida (animación bidireccional)
          entry.target.classList.remove('active');
        }
      });
    }, revealOptions);

    revealItems.forEach(item => {
      revealObserver.observe(item);
    });
  }

  /* ==========================================
     EFECTO PARALLAX PREMIUM
     ========================================== */
  const parallaxElements = document.querySelectorAll('.parallax-bg');
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
      parallaxElements.forEach(el => {
        let speed = el.dataset.speed || 0.4;
        // Calculamos la posición relativa del contenedor respecto a la ventana
        // para que la imagen no sea empujada fuera de su contenedor al hacer scroll
        const rect = el.parentElement.getBoundingClientRect();
        // Diferencia entre el centro de la pantalla y el centro del contenedor
        const centerOffset = (window.innerHeight / 2) - (rect.top + rect.height / 2);
        
        el.style.transform = `translateY(${centerOffset * speed}px) scale(1.1)`;
      });
    });
  }

  /* ==========================================
     EFECTO FOCUS INTERACTIVO EN FORMULARIO
     ========================================== */
  const formControls = document.querySelectorAll('.form-control');

  formControls.forEach(control => {
    // Al cargar la página, comprobar si tienen texto pre-rellenado (por autocompletado)
    if (control.value.trim() !== '') {
      control.placeholder = ''; // Quita placeholder para disparar la animación
    }

    // Evento de entrada de texto
    control.addEventListener('blur', () => {
      if (control.value.trim() !== '') {
        control.setAttribute('data-has-value', 'true');
      } else {
        control.removeAttribute('data-has-value');
      }
    });
  });

});

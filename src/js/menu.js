// Selecciona el elemento del navbar
const navbar = document.getElementById('navbar');
const navLinks = document.querySelector('.nav-links')

// Escucha el evento de scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white', 'shadow');
        navbar.classList.remove('bg-transparent');
    } else {
        navbar.classList.add('bg-transparent');
        navbar.classList.remove('bg-white', 'shadow');
    }
});

function onToggleMenu(e) {
    e.name = e.name === 'menu' ? 'close' : 'menu'
    if (e.name === 'close') {
        navLinks.classList.remove('-top-[100vh]')
        navLinks.classList.add('top-0')
    } else {
        navLinks.classList.add('-top-[100vh]')
        navLinks.classList.remove('top-0')
        // Al cerrar el menú, vuelve el color a azul
        const barraMenu = document.getElementById('barra-menu');
        if (barraMenu) {
            barraMenu.style.color = "#007BEA";
        }
    }

    // --- ACTUALIZA EL COLOR DE LA BARRA AL DESPLEGAR EL MENÚ ---
    if (window.innerWidth < 768) {
        const barraMenu = document.getElementById('barra-menu');
        const selectedLi = document.querySelector('li[id^="li"] a.font-bold');
        if (barraMenu) {
            if (navLinks.classList.contains('top-0') && selectedLi && selectedLi.parentElement.id === 'li1') {
                barraMenu.style.color = "#000";
            } else if (navLinks.classList.contains('top-0')) {
                barraMenu.style.color = "#007BEA";
            }
            // No hace falta else aquí porque ya lo pusimos arriba al cerrar
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const text = "30 DÍAS";
    const typewriterElement = document.getElementById("typewriter");
    let index = 0;

    function typeEffect() {
        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeEffect, 300); // Velocidad del efecto
        }
    }

    typewriterElement.textContent = ""; // Asegura que esté vacío
    typeEffect();
});

function selectMenuItem(selectedId) {
    const menuItems = document.querySelectorAll('li[id^="li"]');
    const slider = document.getElementById('menu-slider');
    const selectedItem = document.getElementById(selectedId);
    const menuList = document.querySelector('.subtitulo__1');
    const barraMenu = document.getElementById('barra-menu');
    const navLinks = document.querySelector('.nav-links');

    // Obtener el índice del elemento seleccionado
    const index = Array.from(menuItems).indexOf(selectedItem);

    if (window.innerWidth < 768) {
        // Calcula la posición real del li
        const selectedRect = selectedItem.getBoundingClientRect();
        const menuRect = menuList.getBoundingClientRect();
        const newTop = selectedRect.top - menuRect.top;
        slider.style.transform = `translateY(${newTop}px)`;
        slider.style.height = `${selectedRect.height}px`;

        // Cambia el color de la barra al seleccionar un li en móvil
        if (barraMenu) {
            barraMenu.style.background = ""; // negro
        }
    } else {
        const selectedRect = selectedItem.getBoundingClientRect();
        const menuRect = menuList.getBoundingClientRect();
        const newLeft = selectedRect.left - menuRect.left;
        slider.style.transform = `translateX(${newLeft}px)`;
        slider.style.width = `${selectedRect.width}px`;

        // Opcional: vuelve la barra a su color original en desktop
        if (barraMenu) {
            barraMenu.style.background = ""; // o el color original
        }
    }

    // SOLO en móvil y SOLO si el menú está desplegado
    if (window.innerWidth < 768 && navLinks.classList.contains('top-0')) {
        if (selectedId === 'li1') {
            barraMenu.style.color = "#000";
        } else {
            barraMenu.style.color = "#007BEA";
        }
    } else {
        barraMenu.style.color = "#007BEA";
    }

    menuItems.forEach(item => {
        const link = item.querySelector('a');
        if (item.id === selectedId) {
            link.classList.remove('font-normal');
            link.classList.add('font-bold', 'text-white', 'hover:text-white');
        } else {
            link.classList.remove('font-bold', 'text-white', 'hover:text-white');
            link.classList.add('font-normal');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    selectMenuItem('li1');
});

// --- ACTUALIZACIÓN AUTOMÁTICA DEL MENÚ SEGÚN LA SECCIÓN VISIBLE ---
const sectionToMenu = {
    hero: 'li1',
    beneficios: 'li2',
    resultados: 'li4',
    funcionamiento: 'li3',
    garantia: 'li5'
};

const sections = Object.keys(sectionToMenu).map(id => document.getElementById(id));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Para la sección de beneficios usamos un umbral más bajo
        const threshold = entry.target.id === 'beneficios' ? 0.3 : 0.8;
        
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            const menuId = sectionToMenu[entry.target.id];
            if (menuId) {
                selectMenuItem(menuId);
            }
        }
    });
}, {
    // Ajustamos los thresholds para cubrir tanto el caso de beneficios como los demás
    threshold: [0.3, 0.5, 0.7, 0.8, 0.9, 1.0],
    // Agregamos un margen para mejorar la detección
    rootMargin: '-5% 0px'
});

sections.forEach(section => {
    if (section) observer.observe(section);
});

document.addEventListener('DOMContentLoaded', function () {
    const menuBottom = document.getElementById('menu-bottom');
    const footer = document.querySelector('footer');
    if (!menuBottom || !footer) return;

    function setFixed() {
        menuBottom.style.position = 'fixed';
        menuBottom.style.bottom = '0';
        menuBottom.style.left = '0';
        menuBottom.style.width = '100%';
        menuBottom.style.zIndex = '50';
    }

    function setRelative() {
        menuBottom.style.position = 'relative';
        menuBottom.style.left = '0';
        menuBottom.style.width = '100%';
        menuBottom.style.bottom = 'auto';
    }

    // Siempre fijo al cargar
    setFixed();

    // Observer para el footer: si el footer es visible, menú relative para que no lo tape
    const footerObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (window.innerWidth <= 640) {
                    if (entry.isIntersecting) {
                        setRelative();
                    } else {
                        setFixed();
                    }
                }
            });
        },
        {
            threshold: 0.1
        }
    );
    footerObserver.observe(footer);

    // Oculta el menú en desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 640) {
            setFixed();
            menuBottom.classList.add('hidden');
        } else {
            menuBottom.classList.remove('hidden');
            setFixed();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Selecciona todos los enlaces del menú superior (ajusta el selector según tu HTML)
    const navLinks = document.querySelectorAll('.nav-links a');
    const navMenu = document.querySelector('.nav-links');
    const barraMenu = document.getElementById('barra-menu');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Solo cerrar si está en móvil y el menú está abierto
            if (window.innerWidth < 768 && navMenu.classList.contains('top-0')) {
                navMenu.classList.remove('top-0');
                navMenu.classList.add('-top-[100vh]');
                // Cambia el icono a barra/hamburguesa si aplica
                if (barraMenu) {
                    barraMenu.name = 'menu';
                    barraMenu.style.color = "#007BEA";
                    barraMenu.classList.remove('is-active'); // si usas una clase para la X
                }
            }
        });
    });
});


// document.addEventListener('DOMContentLoaded', function () {
//     const sectionIds = ['beneficios', 'resultados', 'funcionamiento', 'garantia'];
//     const sections = sectionIds.map(id => document.getElementById(id));
//     const menuBottom = document.getElementById('menu-bottom');
//     if (!menuBottom) return;
//     const menuLinks = menuBottom.querySelectorAll('a[data-section]');

//     function selectBottomMenu(sectionId) {
//         menuLinks.forEach(link => {
//             if (link.dataset.section === sectionId) {
//                 link.classList.add('menu-bottom-a-active');
//             } else {
//                 link.classList.remove('menu-bottom-a-active');
//             }
//         });
//     }

//     let lastActive = null;
//     const observer = new IntersectionObserver((entries) => {
//         let maxRatio = 0.4;
//         let activeSection = null;
//         entries.forEach(entry => {
//             if (entry.intersectionRatio >= 0.4 && entry.isIntersecting) {
//                 if (entry.intersectionRatio > maxRatio) {
//                     maxRatio = entry.intersectionRatio;
//                     activeSection = entry.target.id;
//                 }
//             }
//         });
//         if (activeSection && activeSection !== lastActive) {
//             selectBottomMenu(activeSection);
//             lastActive = activeSection;
//         }
//     }, {
//         threshold: [0, 0.4, 0.7, 1]
//     });

//     sections.forEach(section => {
//         if (section) observer.observe(section);
//     });
// });


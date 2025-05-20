// MODAL PARA CALENDY


// Abrir modal al hacer click en cualquier botón con la clase .abrir-calendly
document.querySelectorAll('.abrir-calendly').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const modal = document.getElementById('calendly-modal');
        const content = document.getElementById('calendly-modal-content');
        modal.style.display = 'flex';
        setTimeout(() => {
            content.style.transform = 'translateX(0)';
        }, 10);
    });
});
// Cerrar modal al hacer click en el botón "Cerrar"
document.getElementById('cerrar-calendly').onclick = function () {
    cerrarCalendlyModal();
};
// Cerrar al hacer click fuera del contenido (solo si se hace click en el fondo oscuro)
document.getElementById('calendly-modal').addEventListener('click', function (e) {
    if (e.target === this) cerrarCalendlyModal();
});
function cerrarCalendlyModal() {
    const modal = document.getElementById('calendly-modal');
    const content = document.getElementById('calendly-modal-content');
    content.style.transform = 'translateX(-100%)';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 400);
}

// Botón para expandir/reducir el modal
const toggleBtn = document.getElementById('toggle-size-modal');
const modalContent = document.getElementById('calendly-modal-content');
let expanded = false;
toggleBtn.addEventListener('click', function () {
    expanded = !expanded;
    if (expanded) {
        modalContent.style.width = '90vw';
        modalContent.style.maxWidth = '90vw';
        // Cambia el icono si quieres (opcional)
        document.getElementById('icon-expand').innerHTML = `
                <path stroke="#007BEA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    d="M8 16H4v-4M16 16h4v-4M4 8V4h4M20 8V4h-4M8 20l5-5M16 4l-5 5"/>
            `;
    } else {
        modalContent.style.width = '600px';
        modalContent.style.maxWidth = '98vw';
        document.getElementById('icon-expand').innerHTML = `
                <path stroke="#007BEA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4M16 4l-5 5M8 20l5-5"/>
            `;
    }
});
function ajustarTamanoLetras() {
    const anchoVentana = window.innerWidth;
    const nt1Elements = document.querySelectorAll('.nt1');
    const nt2Elements = document.querySelectorAll('.nt2');
    const nt3Elements = document.querySelectorAll('.nt3');
    const nt4Elements = document.querySelectorAll('.nt4');

    let tamanoNt1 = 70; // Tamaño base
    let tamanoNt2 = 40; // Tamaño base

    if (anchoVentana >= 2560) {
        tamanoNt1 = 170; // Ultra grande (4K)
        tamanoNt2 = 120;
    } else if (anchoVentana >= 1920) {
        tamanoNt1 = 135; // Muy grande (FullHD+)
        tamanoNt2 = 95;
    } else if (anchoVentana >= 1440) {
        tamanoNt1 = 110; // 1440p
        tamanoNt2 = 75;
    } else if (anchoVentana < 768) {
        tamanoNt1 = 40; // Tamaño para pantallas pequeñas
        tamanoNt2 = 25;
    } else {
        // Rango intermedio
        tamanoNt1 = 70 + (anchoVentana - 768) * 0.02;
        tamanoNt2 = 40 + (anchoVentana - 768) * 0.01;
    }

    nt1Elements.forEach(element => element.style.fontSize = `${tamanoNt1}px`);
    nt2Elements.forEach(element => element.style.fontSize = `${tamanoNt2}px`);
    nt3Elements.forEach(element => element.style.fontSize = `${tamanoNt1}px`);
    nt4Elements.forEach(element => element.style.fontSize = `${tamanoNt2}px`);
}

window.onload = ajustarTamanoLetras;
window.addEventListener('resize', ajustarTamanoLetras);
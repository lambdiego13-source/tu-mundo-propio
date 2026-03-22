const btnBuscar = document.getElementById('btnBuscar');
const btnVoz = document.getElementById('btnVoz');
const inputBusqueda = document.getElementById('inputBusqueda');
const resultados = document.getElementById('resultados');

// Función para buscar (Simulada)
function realizarBusqueda() {
    const termino = inputBusqueda.value;
    
    if(termino === "") {
        alert("Escribe algo primero");
        return;
    }

    // Aquí podrías conectar con una API o base de datos local
    resultados.innerHTML = `
        <div style="border: 1px solid #00f2ff; padding: 10px; border-radius: 10px;">
            <h3 style="color: #00ff00;">Resultado para: ${termino}</h3>
            <p id="textoParaLeer">Has buscado sobre ${termino} en la naturaleza. Aquí aparecería la información de tu enciclopedia.</p>
        </div>
    `;
}

// Función de Voz (Sintetizador)
function hablarResultado() {
    const texto = document.getElementById('textoParaLeer')?.innerText;
    if (texto) {
        const lectura = new SpeechSynthesisUtterance(texto);
        lectura.lang = 'es-ES';
        window.speechSynthesis.speak(lectura);
    } else {
        alert("No hay nada que leer todavía.");
    }
}

// Eventos
btnBuscar.addEventListener('click', realizarBusqueda);
btnVoz.addEventListener('click', hablarResultado);

// Buscar al presionar Enter en Android
inputBusqueda.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') realizarBusqueda();
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('Service Worker registrado con éxito', reg))
    .catch(err => console.warn('Error al registrar el Service Worker', err));
}

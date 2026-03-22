// 1. Función para buscar imágenes
async function buscarImagenes(tema) {
    const apiKey = 'TU_CLAVE_DE_PIXABAY'; // REEMPLAZA ESTO CON TU LLAVE DE PIXABAY
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(tema)}&image_type=photo&per_page=6`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const contenedor = document.getElementById('contenedor-fotos');
        
        contenedor.innerHTML = ''; // Limpia las fotos anteriores

        data.hits.forEach(imagen => {
            const img = document.createElement('img');
            img.src = imagen.webformatURL;
            img.alt = tema;
            
            // Aplicamos el estilo neón directamente
            img.style.width = '100%';
            img.style.borderRadius = '15px';
            img.style.border = '3px solid #39FF14'; 
            img.style.boxShadow = '0 0 10px #39FF14, 0 0 20px #ff00ff';
            img.style.marginBottom = '15px';
            
            contenedor.appendChild(img);
        });
    } catch (error) {
        console.error("Error al cargar imágenes:", error);
    }
}

// 2. Función para el botón Investigar (une el texto con las imágenes)
function realizarBusqueda() {
    let busqueda = document.getElementById("inputBusqueda").value;
    
    if (busqueda.trim() !== "") {
        // Aquí puedes poner tu lógica actual para cambiar el texto del cuadro verde
        // Y llamamos a la función de las fotos:
        buscarImagenes(busqueda);
    } else {
        alert("Por favor, escribe algo para investigar.");
    }
}

// 3. Función para el botón Escuchar (Voz)
function hablar() {
    // Busca el texto dentro de tu cuadro de información
    const textoParaLeer = document.getElementById("info-texto").innerText;
    const lectura = new SpeechSynthesisUtterance(textoParaLeer);
    lectura.lang = 'es-ES'; // Configurado en español
    window.speechSynthesis.speak(lectura);
}

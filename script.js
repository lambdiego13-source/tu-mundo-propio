async function buscarImagenes(tema) {
    const apiKey = 'TU_CLAVE_DE_PIXABAY'; // Aquí pones tu llave
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(tema)}&image_type=photo&per_page=6`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const contenedor = document.getElementById('contenedor-fotos');
        
        contenedor.innerHTML = ''; // Limpiar resultados anteriores

        data.hits.forEach(imagen => {
            const img = document.createElement('img');
            img.src = imagen.webformatURL;
            img.alt = tema;
            // Estilo neón directo en JS para probar
            img.style.width = '100%';
            img.style.borderRadius = '15px';
            img.style.border = '3px solid #39FF14'; // Verde neón
            img.style.boxShadow = '0 0 10px #39FF14';
            img.style.marginBottom = '15px';
            
            contenedor.appendChild(img);
        });
    } catch (error) {
        console.error("Error cargando imágenes", error);
    }
}

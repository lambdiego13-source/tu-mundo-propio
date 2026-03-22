async function realizarBusqueda() {
    const termino = inputBusqueda.value.trim();
    
    if (termino === "") {
        alert("Escribe algo para investigar de todo");
        return;
    }

    resultados.innerHTML = `<p style="color: #00f2ff;">Buscando en Wikipedia...</p>`;

    try {
        // 1. Buscamos el texto y la imagen en la API de Wikipedia
        const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(termino)}`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        if (datos.type === 'standard') {
            // Si hay resultado, lo mostramos con estilo neón
            resultados.innerHTML = `
                <div style="border: 2px solid #00f2ff; padding: 15px; border-radius: 15px; background: #1a1a2e; text-align: left;">
                    <h2 style="color: #00ff00; margin-top: 0;">${datos.title}</h2>
                    
                    ${datos.thumbnail ? 
                        `<img src="${datos.thumbnail.source}" style="width: 100%; border-radius: 10px; border: 2px solid #ff00ff; margin-bottom: 10px;">` 
                        : ''}
                    
                    <p id="textoParaLeer" style="color: #fff; line-height: 1.5;">${datos.extract}</p>
                    
                    <a href="${datos.content_urls.desktop.page}" target="_blank" style="color: #ff00ff; text-decoration: none; font-size: 0.9rem;">
                        Leer más en Wikipedia →
                    </a>
                </div>
            `;
        } else {
            resultados.innerHTML = `<p style="color: #ff00ff;">No encontré información sobre "${termino}". Intenta con otra palabra.</p>`;
        }
    } catch (error) {
        console.error("Error al buscar:", error);
        resultados.innerHTML = `<p style="color: red;">Error de conexión. Revisa tu internet.</p>`;
    }
}

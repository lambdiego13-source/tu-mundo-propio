async function realizarBusqueda() {
    const termino = inputBusqueda.value.trim();
    
    if (termino === "") {
        alert("Escribe algo para investigar");
        return;
    }

    // Mensaje de carga con estilo neón
    resultados.innerHTML = `<p style="color: #00f2ff; font-weight: bold; animation: pulse 1s infinite;">🔍 Buscando en Tu Mundo...</p>`;

    try {
        // Usamos la API de Wikipedia con formato JSON y origen permitido
        const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(termino)}`;
        
        const respuesta = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
        });

        if (!respuesta.ok) {
            throw new Error("No se encontró información.");
        }

        const datos = await respuesta.json();

        // Limpiamos y mostramos los datos
        resultados.innerHTML = `
            <div style="border: 2px solid #00f2ff; padding: 15px; border-radius: 15px; background: #1a1a2e; box-shadow: 0 0 15px #00f2ff;">
                <h2 style="color: #00ff00; margin-bottom: 10px;">${datos.title}</h2>
                
                ${datos.thumbnail ? 
                    `<img src="${datos.thumbnail.source}" style="width: 100%; border-radius: 10px; border: 2px solid #ff00ff; margin-bottom: 15px;">` 
                    : '<p style="color: #555;">(Sin imagen disponible)</p>'}
                
                <p id="textoParaLeer" style="color: #fff; line-height: 1.6; font-size: 1.1rem;">
                    ${datos.extract}
                </p>
                
                <div style="margin-top: 15px; border-top: 1px solid #333; padding-top: 10px;">
                    <a href="${datos.content_urls.desktop.page}" target="_blank" style="color: #ff00ff; text-decoration: none; font-weight: bold;">
                        🌐 Ver artículo completo
                    </a>
                </div>
            </div>
        `;

    } catch (error) {
        console.error("Error detallado:", error);
        resultados.innerHTML = `
            <div style="border: 2px solid #ff0000; padding: 10px; border-radius: 10px;">
                <p style="color: #ff0000;">⚠️ No pudimos encontrar "${termino}".</p>
                <p style="font-size: 0.8rem; color: #888;">Intenta con una palabra más sencilla (ej. Sol, Luna, Perro).</p>
            </div>
        `;
    }
}

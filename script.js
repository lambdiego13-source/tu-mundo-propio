async function realizarBusqueda() {
    const termino = inputBusqueda.value.trim();
    
    if (termino === "") {
        alert("Escribe algo para investigar");
        return;
    }

    resultados.innerHTML = `<p style="color: #00f2ff; font-weight: bold;">🔍 Buscando "${termino}" en Tu Mundo...</p>`;

    // Usamos el formato "propuesto" por Wikipedia para evitar bloqueos en móviles
    const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(termino)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("No encontrado");
            return response.json();
        })
        .then(datos => {
            // Si llegamos aquí, Wikipedia respondió bien
            resultados.innerHTML = `
                <div style="border: 2px solid #00f2ff; padding: 15px; border-radius: 15px; background: #1a1a2e; box-shadow: 0 0 15px #00f2ff; text-align: left;">
                    <h2 style="color: #00ff00; margin-top: 0;">${datos.title}</h2>
                    
                    ${datos.thumbnail ? 
                        `<img src="${datos.thumbnail.source}" style="width: 100%; border-radius: 10px; border: 2px solid #ff00ff; margin-bottom: 10px;">` 
                        : ''}
                    
                    <p id="textoParaLeer" style="color: #fff; line-height: 1.5; font-size: 1rem;">
                        ${datos.extract}
                    </p>
                    
                    <a href="${datos.content_urls.desktop.page}" target="_blank" style="color: #ff00ff; text-decoration: none; font-weight: bold; display: block; margin-top: 10px;">
                        Ver en Wikipedia →
                    </a>
                </div>
            `;
        })
        .catch(error => {
            // Si hay error, mostramos este mensaje neón
            resultados.innerHTML = `
                <div style="border: 2px solid #ff00ff; padding: 15px; border-radius: 15px; background: #1a1a2e;">
                    <p style="color: #ff00ff;">❌ No encontré info sobre "${termino}".</p>
                    <p style="color: #fff; font-size: 0.8rem;">Prueba con: Luna, Sol, o Plantas.</p>
                </div>
            `;
        });
}

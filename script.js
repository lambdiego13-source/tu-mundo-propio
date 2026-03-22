const inputBusqueda = document.getElementById('inputBusqueda');
const btnBuscar = document.getElementById('btnBuscar');
const resultados = document.getElementById('resultados');

async function realizarBusqueda() {
    const termino = inputBusqueda.value.trim();
    if (!termino) return alert("Escribe algo");

    resultados.innerHTML = "<p style='color:cyan'>Cargando desde Wikipedia...</p>";

    // Usamos el formato de búsqueda más compatible para móviles
    const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(termino)}`;

    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error("No encontrado");
        
        const datos = await respuesta.json();

        resultados.innerHTML = `
            <div style="background:#1a1a2e; border:2px solid #00ff00; padding:15px; border-radius:15px; color:white;">
                <h2 style="color:#ff00ff">${datos.title}</h2>
                ${datos.thumbnail ? `<img src="${datos.thumbnail.source}" style="width:100%; border-radius:10px;">` : ''}
                <p id="textoParaLeer">${datos.extract}</p>
            </div>
        `;
    } catch (error) {
        resultados.innerHTML = `<p style="color:red">No hay información sobre "${termino}". Prueba con otra palabra.</p>`;
    }
}

btnBuscar.addEventListener('click', realizarBusqueda);

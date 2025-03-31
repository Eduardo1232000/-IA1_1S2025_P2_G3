let jsonData = "", lista_lugares = [];
let lugarActual = {};

// Función para cargar y validar JSON
window.onload = function () {
    validar_base_json();
};

// Validación del JSON en sessionStorage
function validar_base_json() {
    try {
        jsonData = sessionStorage.getItem("JSON_DATA");
        if (!jsonData) {
            console.log("No hay JSON almacenado!");
            return;
        }
        console.log("HAY JSON ALMACENADO");
        document.getElementById("STATUS_JSON").style.backgroundColor = "green";
        lista_lugares = JSON.parse(jsonData);
        llenarSelectLugares();
    } catch (error) {
        console.log("ERROR AL OBTENER JSON", error);
    }
}

// Llenar el dropdown de lugares
function llenarSelectLugares() {
    const select = document.getElementById("SELECT_LUGAR");
    select.innerHTML = "<option value='-1'>Seleccione un Lugar</option>"; // Limpiar y agregar opción predeterminada
    lista_lugares.forEach(marcador => {
        const option = document.createElement("option");
        option.value = marcador.index;
        option.textContent = marcador.nombre_lugar;
        select.appendChild(option);
    });
    select.addEventListener("change", onLugarSelect);
}

// Función para manejar la selección de lugar
function onLugarSelect() {
    const selectedIndex = document.getElementById("SELECT_LUGAR").value;
    lugarActual = lista_lugares.find(marcador => marcador.index == selectedIndex) || {};
    if (lugarActual.index === undefined) {
        console.log("No se seleccionó ningún lugar válido.");
        return;
    }
    // Asignar valores del lugar seleccionado
    asignarValoresFormulario(lugarActual);
}

// Asignar valores al formulario
function asignarValoresFormulario(lugar) {
    document.getElementById("nombre_lugar").value = lugar.nombre_lugar;
    document.getElementById("info_ubicacion").value = lugar.informacion.ubicacion;
    document.getElementById("info_historia").value = lugar.informacion.historia;
    document.getElementById("info_dato_curioso").value = lugar.informacion.datos_curiosos;
    document.getElementById("ubicacion_lugar").value = lugar.ubicacion;
    document.getElementById("sitio_lugar").value = lugar.sitio_web;
    document.getElementById("filtro_tematico").value = lugar.filtro_tematico;
}

// Función para cargar el archivo JSON
document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            jsonData = e.target.result;
            lista_lugares = JSON.parse(jsonData);
            console.log("EXITO AL CARGAR JSON");
            sessionStorage.setItem("JSON_DATA", jsonData);
            document.getElementById("STATUS_JSON").style.backgroundColor = "green";
        } catch (error) {
            console.log("Error al cargar el JSON: " + error);
        }
    };
    reader.readAsText(file);
});

// Guardar JSON a archivo
function guardarJson() {
    const jsonString = JSON.stringify(lista_lugares, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "datos.json";
    a.click();
}

// Función para limpiar el formulario
function LimpiarForm() {
    document.getElementById("nombre_lugar").value = "";
    document.getElementById("multimedia_titulo").value = "";
    document.getElementById("multimedia_url").value = "";
    document.getElementById("info_ubicacion").value = "";
    document.getElementById("info_historia").value = "";
    document.getElementById("info_dato_curioso").value = "";
    document.getElementById("ubicacion_lugar").value = "";
    document.getElementById("sitio_lugar").value = "";
    document.getElementById("filtro_tematico").value = "";
}

// Función para agregar un nuevo lugar
function AccionAgregar() {
    document.getElementById("ADMIN_DIV").classList.add("oculto");
    document.getElementById("EDITAR_AGREGAR").classList.remove("oculto");
    LimpiarForm();
    document.getElementById("BOTON_ACCION_MODIFICAR").classList.add("oculto");
}

// Función para guardar un lugar
function guardarLugar() {
    
    let multimedia = [];
    let multimediaTitles = document.querySelectorAll("#multimedia_titulo");
    let multimediaUrls = document.querySelectorAll("#multimedia_url");

    for (let i = 0; i < multimediaTitles.length; i++) {
        let titulo = multimediaTitles[i].value.trim(); // Usar .value para obtener el texto dentro de textarea
        let url = multimediaUrls[i].value.trim();
        if (titulo && url) { // Solo agregar si ambos campos tienen valor
            multimedia.push({
                titulo: titulo,
                link: url
            });
        }
    }
    const nuevoLugar = {
        "index": obtenerNuevoIndex(),
        "nombre_lugar": document.getElementById("nombre_lugar").value,
        "ubicacion_deteccion": document.getElementById("ubicacion_lugar").value,
        multimedia: multimedia,
        "informacion": {
            "nombre": document.getElementById("nombre_lugar").value,
            "ubicacion": document.getElementById("info_ubicacion").value,
            "historia": document.getElementById("info_historia").value,
            "datos_curiosos": document.getElementById("info_dato_curioso").value
        },
        "sitio_web": document.getElementById("sitio_lugar").value,
        "ubicacion": document.getElementById("ubicacion_lugar").value,
        "filtro_tematico": document.getElementById("filtro_tematico").value,
    };

    lista_lugares.push(nuevoLugar);
    sessionStorage.setItem("JSON_DATA", JSON.stringify(lista_lugares));

    console.log("Lugar guardado:", nuevoLugar);
    alert("Lugar agregado exitosamente.");
    LimpiarForm();
}

// Obtener el índice para el nuevo lugar
function obtenerNuevoIndex() {
    const ultimoLugar = lista_lugares[lista_lugares.length - 1];
    return ultimoLugar ? ultimoLugar.index + 1 : 0;
}

function AccionAtras() {
    document.getElementById("ADMIN_DIV").classList.remove("oculto");
    document.getElementById("EDITAR_AGREGAR").classList.add("oculto");
    document.getElementById("BOTON_ACCION_MODIFICAR").classList.remove("oculto");
}




function obtenerLugarSeleccionado() {
    let select = document.getElementById("SELECT_LUGAR");
    let selectedIndex = select.value;
    if (selectedIndex == -1) {
        alert("Seleccione un lugar");
        return null;
    }
    return lista_lugares.find(marcador => marcador.index == selectedIndex);
}

function mostrarFormularioEdicion() {
    document.getElementById("ADMIN_DIV").classList.add("oculto");
    document.getElementById("EDITAR_AGREGAR").classList.remove("oculto");
    document.getElementById("BOTON_ACCION_MODIFICAR").classList.remove("oculto");
}

function cargarDatosLugarEnFormulario(lugar) {
    // Asignar valores a los campos principales
    document.getElementById("nombre_lugar").value = lugar.nombre_lugar;
    // Limpiar los campos multimedia antes de llenarlos, pero no borrar los campos generados
    const container = document.getElementById('multimedia_fields');
    container.innerHTML = ''; // Limpiar los campos multimedia actuales
    // Agregar los campos multimedia desde los datos existentes (si hay)
    if (lugar.multimedia && lugar.multimedia.length > 0) {
        lugar.multimedia.forEach(item => {
            console.log(item.titulo)
            agregarCampoMultimedia(item.titulo, item.link);
        });
    } else {
        // Si no hay multimedia, agregar un campo vacío por defecto
        agregarCampoMultimedia('', '');
    }

    // Asignar valores a los otros campos del formulario
    document.getElementById("info_ubicacion").value = lugar.informacion.ubicacion;
    document.getElementById("info_historia").value = lugar.informacion.historia;
    document.getElementById("info_dato_curioso").value = lugar.informacion.datos_curiosos;
    document.getElementById("ubicacion_lugar").value = lugar.ubicacion;
    document.getElementById("sitio_lugar").value = lugar.sitio_web;
    document.getElementById("filtro_tematico").value = lugar.filtro_tematico;
}

function AccionModificar() {
    let selectedLugar = obtenerLugarSeleccionado();
    if (!selectedLugar) return;

    mostrarFormularioEdicion();
    cargarDatosLugarEnFormulario(selectedLugar);
}

function guardarModificacion() {
    let selectedLugar = obtenerLugarSeleccionado();
    if (!selectedLugar) return;
    // Obtener los nuevos valores de los campos
    selectedLugar.nombre_lugar = document.getElementById("nombre_lugar").value;
    // Obtener las entradas multimedia (puede haber múltiples)
    selectedLugar.multimedia = [];
    let multimediaTítulos = document.getElementsByName("multimedia_titulo");
    let multimediaURLs = document.getElementsByName("multimedia_url");

    for (let i = 0; i < multimediaTítulos.length; i++) {
        let titulo = multimediaTítulos[i].value.trim(); // Usar .value para obtener el texto dentro de textarea
        let url = multimediaURLs[i].value.trim();
        if (titulo && url) {  // Solo agregar si ambos campos están completos
            selectedLugar.multimedia.push({ titulo: titulo, link: url });
        }
    }


    selectedLugar.informacion.ubicacion = document.getElementById("info_ubicacion").value;
    selectedLugar.informacion.historia = document.getElementById("info_historia").value;
    selectedLugar.informacion.datos_curiosos = document.getElementById("info_dato_curioso").value;
    selectedLugar.ubicacion = document.getElementById("ubicacion_lugar").value;
    selectedLugar.sitio_web = document.getElementById("sitio_lugar").value;
    selectedLugar.filtro_tematico = document.getElementById("filtro_tematico").value;
    // Obtener la lista de lugares desde sessionStorage
    let listaLugares = JSON.parse(sessionStorage.getItem("JSON_DATA")) || [];
    // Encontrar el índice del lugar seleccionado
    let index = listaLugares.findIndex(lugar => lugar.index === selectedLugar.index);
    if (index !== -1) {
        listaLugares[index] = selectedLugar; // Reemplazar el lugar en la lista con los nuevos valores
        sessionStorage.setItem("JSON_DATA", JSON.stringify(listaLugares)); // Guardar la lista actualizada en sessionStorage
        alert("Lugar modificado exitosamente.");
    } else {
        alert("No se pudo encontrar el lugar en la lista.");
    }
    // Limpiar el formulario y regresar a la vista principal
    LimpiarForm();
    document.getElementById("ADMIN_DIV").classList.remove("oculto");
    document.getElementById("EDITAR_AGREGAR").classList.add("oculto");
}

function agregarCampoMultimedia(titulo = '', url = '') {
    let container = document.getElementById('multimedia_fields');
    let newPair = document.createElement('div');
    newPair.classList.add('multimedia_pair');

    newPair.innerHTML = `
        <textarea id="multimedia_titulo" class="cuadro_texto" placeholder="Título Multimedia">${titulo}</textarea>
        <textarea id="multimedia_url" class="cuadro_texto" placeholder="URL Multimedia">${url}</textarea>
    `;
    container.appendChild(newPair);
}
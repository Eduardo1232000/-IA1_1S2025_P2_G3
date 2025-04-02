let jsonData = "", lista_lugares = [];
let lugarActual = {};
let lugarseleccionado = ""

// Función para cargar y validar JSON
window.onload = function () {
    validar_base_json();
};

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
            llenarSelectLugares()
        } catch (error) {
            console.log("Error al cargar el JSON: " + error);
        }
    };
    reader.readAsText(file);
});

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

// Guardar JSON a archivo
function guardarJson() {
    const jsonString = JSON.stringify(lista_lugares, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "datos.json";
    a.click();
}

// LLenar el select
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

// Cuando se selecciona un lugar
function onLugarSelect() {
    const selectedIndex = document.getElementById("SELECT_LUGAR").value;
    lugarActual = lista_lugares.find(marcador => marcador.index == selectedIndex) || {};
    if (lugarActual.index === undefined) {
        console.log("No se seleccionó ningún lugar válido.");
        return;
    }

}

// Asignar valores al formulario (PARA MODIFICAR )
function asignarValoresFormulario(lugar) {
    document.getElementById("nombre_lugar").value = lugar.nombre_lugar;
    document.getElementById("info_ubicacion").value = lugar.informacion.ubicacion;
    document.getElementById("info_historia").value = lugar.informacion.historia;
    document.getElementById("info_dato_curioso").value = lugar.informacion.datos_curiosos;
    document.getElementById("ubicacion_lugar").value = lugar.ubicacion;
    document.getElementById("sitio_lugar").value = lugar.sitio_web;
    document.getElementById("filtro_tematico").value = lugar.filtro_tematico;
    document.getElementById("ubifiltro").value = lugar.ubicacion_deteccion;
    document.getElementById("multimedia_titulo").value = "";
    document.getElementById("multimedia_url").value = "";
    document.getElementById("titulo_vid").value = "";
    document.getElementById("link_vid").value = "";
    mostrar_tablas(lugar)
}

function mostrar_tablas(lugar) {
    //IMAGENES
    const divContainer = document.getElementById("conjunto_imagenes");
    divContainer.innerHTML = "";                                //VACIAR DIV
    const tabla = document.createElement("table");
    tabla.style.textAlign = "center";
    tabla.classList.add("tabla_multimedia");
    tabla.innerHTML = `
                <thead>
                    <tr>
                        <th style="font-size: 21px; width: 60%; border: 1px solid black;">Título</th>
                        <th style="font-size: 21px; width: 20%; border: 1px solid black;">Enlace</th>
                        <th style="font-size: 21px; width: 20%; border: 1px solid black;">Acciones</th>
                    </tr>
                </thead>
                <tbody id="tablaBody"></tbody>
            `;
    divContainer.appendChild(tabla); // Agregar la tabla al div

    const tbody = document.getElementById("tablaBody");
    lugar.multimedia[0].forEach((foto, index) => {
        const fila = document.createElement("tr");
        fila.style.height = "40px";
        fila.style.border = "1px solid black";
        fila.innerHTML = `
                    <td style="text-align: left;border: 1px solid black; ">${foto.titulo}</td>
                    <td style="border: 1px solid black;"><a href="${foto.link}" target="_blank">Ver</a></td>
                    <td style="border: 1px solid black;">
                        <button id="boton_tabla_eliminar" onclick="modificar_imagen(${index})">✏️</button>
                        <button onclick="eliminar_imagen(${index})">❌</button>
                    </td>
                `;
        tbody.appendChild(fila);

    });

    //VIDEOS
    const divContainerV = document.getElementById("conjunto_videos");
    divContainerV.innerHTML = "";                                //VACIAR DIV
    const tablaV = document.createElement("table");
    tablaV.style.textAlign = "center";
    tablaV.classList.add("tabla_multimedia");
    tablaV.innerHTML = `
                <thead>
                    <tr>
                        <th style="font-size: 21px; width: 60%; border: 1px solid black;">Título</th>
                        <th style="font-size: 21px; width: 20%; border: 1px solid black;">Enlace</th>
                        <th style="font-size: 21px; width: 20%; border: 1px solid black;">Acciones</th>
                    </tr>
                </thead>
                <tbody id="tablaBodyV"></tbody>
            `;
    divContainerV.appendChild(tablaV); // Agregar la tabla al div

    const tbodyV = document.getElementById("tablaBodyV");
    lugar.multimedia[1].forEach((video, index) => {
        const filav = document.createElement("tr");
        filav.style.height = "40px";
        filav.style.border = "1px solid black";
        filav.innerHTML = `
                    <td style="text-align: left;border: 1px solid black; ">${video.titulo}</td>
                    <td style="border: 1px solid black;"><a href="${video.link}" target="_blank">Ver</a></td>
                    <td style="border: 1px solid black;">
                        <button id="boton_tabla_eliminar" onclick="modificar_video(${index})">✏️</button>
                        <button onclick="eliminar_video(${index})">❌</button>
                    </td>
                `;
        tbodyV.appendChild(filav);

    });
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
    llenarSelectLugares()
}
function AccionModificar() {
    console.log(lugarActual.index)
    try {
        if (lugarActual.index === undefined) {
            alert("Seleccione un lugar valido")
            return;
        }
        mostrarFormularioEdicion();
        asignarValoresFormulario(lugarActual);
    } catch (error) {
        alert("ERROR")
        return;
    }
}
// FUNCION CUANDO SE PRESIONA EL BOTON DE AGREGAR NUEVO
function AccionAgregar() {
    lugarActual = {
        index: obtenerNuevoIndex(),
        nombre_lugar: "",
        ubicacion_deteccion: "",
        multimedia: [
            [],
            []
        ],
        informacion: {
            nombre: "",
            ubicacion: "",
            historia: "",
            datos_curiosos: ""
        },
        sitio_web: "",
        ubicacion: "",
        filtro_tematico: ""
    }
    console.log(lugarActual.index)
    console
    asignarValoresFormulario(lugarActual);
    BOTON_ACCION_GUARDAR
    mostrarFormularioEdicion2()
}

function mostrarFormularioEdicion() {
    document.getElementById("ADMIN_DIV").classList.add("oculto");
    document.getElementById("EDITAR_AGREGAR").classList.remove("oculto");
    document.getElementById("BOTON_ACCION_MODIFICAR").classList.remove("oculto");
    document.getElementById("BOTON_ACCION_GUARDAR").classList.add("oculto");
}
function mostrarFormularioEdicion2() {
    document.getElementById("ADMIN_DIV").classList.add("oculto");
    document.getElementById("EDITAR_AGREGAR").classList.remove("oculto");
    document.getElementById("BOTON_ACCION_GUARDAR").classList.remove("oculto");
    document.getElementById("BOTON_ACCION_MODIFICAR").classList.add("oculto");
}

function agregar_nueva_imagen() {
    lugarActual.multimedia[0].push({
        titulo: document.getElementById("multimedia_titulo").value,
        link: document.getElementById("multimedia_url").value
    })
    console.log(lugarActual)
    mostrar_tablas(lugarActual)
}
function eliminar_imagen(index) {
    if (index >= 0 && index < lugarActual.multimedia[0].length) {
        lugarActual.multimedia[0].splice(index, 1);
    }
    console.log(index)
    mostrar_tablas(lugarActual)
}
function modificar_imagen(index) {
    console.log(index)
    const titulo_multimedia = document.getElementById("multimedia_titulo").value
    const url_multimedia = document.getElementById("multimedia_url").value

    if (titulo_multimedia != "") {
        lugarActual.multimedia[0][index].titulo = titulo_multimedia
    }

    if (url_multimedia != "") {
        lugarActual.multimedia[0][index].link = url_multimedia
    }
    mostrar_tablas(lugarActual)
    console.log(titulo_multimedia, url_multimedia)
}

function agregar_nuevo_video() {
    lugarActual.multimedia[1].push({
        titulo: document.getElementById("titulo_vid").value,
        link: document.getElementById("link_vid").value
    })
    console.log(lugarActual)
    mostrar_tablas(lugarActual)
}
function eliminar_video(index) {
    if (index >= 0 && index < lugarActual.multimedia[1].length) {
        lugarActual.multimedia[1].splice(index, 1);
    }
    console.log(index)
    mostrar_tablas(lugarActual)
    console.log(lugarActual)
}
function modificar_video(index) {
    console.log(index)
    const titulo_multimedia = document.getElementById("titulo_vid").value
    const url_multimedia = document.getElementById("link_vid").value

    if (titulo_multimedia != "") {
        lugarActual.multimedia[1][index].titulo = titulo_multimedia
    }

    if (url_multimedia != "") {
        lugarActual.multimedia[1][index].link = url_multimedia
    }
    mostrar_tablas(lugarActual)
    console.log(titulo_multimedia, url_multimedia)
}

function guardar_valores_json() {
    const campos = [
        { id: "nombre_lugar", mensaje: "Llenar campo Nombre" },
        { id: "ubifiltro", mensaje: "Llenar campo Ubicacion imagen deteccion" },
        { id: "info_ubicacion", mensaje: "Llenar campo Ubicacion" },
        { id: "info_historia", mensaje: "Llenar campo historia" },
        { id: "info_dato_curioso", mensaje: "Llenar campo datos curiosos" },
        { id: "sitio_lugar", mensaje: "Llenar campo sitio web" },
        { id: "ubicacion_lugar", mensaje: "Llenar campo link ubicacion" },
        { id: "filtro_tematico", mensaje: "Llenar campo filtro tematico" },
    ];

    for (const campo of campos) {
        if (document.getElementById(campo.id).value.trim() === "") {
            alert(campo.mensaje);
            return;
        }
    }

    lugarActual.nombre_lugar = document.getElementById("nombre_lugar").value
    lugarActual.ubicacion_deteccion = document.getElementById("ubifiltro").value
    lugarActual.informacion.nombre = document.getElementById("nombre_lugar").value
    lugarActual.informacion.ubicacion = document.getElementById("info_ubicacion").value
    lugarActual.informacion.historia = document.getElementById("info_historia").value
    lugarActual.informacion.datos_curiosos = document.getElementById("info_dato_curioso").value
    lugarActual.sitio_web = document.getElementById("sitio_lugar").value
    lugarActual.ubicacion = document.getElementById("ubicacion_lugar").value
    lugarActual.filtro_tematico = document.getElementById("filtro_tematico").value

}

function agregar_nuevo_lugar() {
    guardar_valores_json()
    lista_lugares.push(lugarActual);
    console.log(lugarActual)
    console.log(lista_lugares)
    sessionStorage.setItem("JSON_DATA", JSON.stringify(lista_lugares));
    AccionAtras()
}

function modificar_lugar() {
    guardar_valores_json()
    lista_lugares
    const indexLista = lista_lugares.findIndex(lugar => lugar.index === lugarActual.index);

    if (indexLista !== -1) {
        lista_lugares[indexLista] = lugarActual; // Reemplazar el JSON en la lista
        console.log(lista_lugares)
        sessionStorage.setItem("JSON_DATA", JSON.stringify(lista_lugares));
    } else {
        console.log("No se encontró el lugar con ese index.");
    }
    AccionAtras()
}

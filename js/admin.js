let opcion =""
let nombre = ""
let filtro_tematico = ""
let multimedia = ""
let informacion = ""
let sitio_web = ""
let ubicacion_mapa = ""


let jsonData = "";
window.onload = function () {
    validar_base_json();
};
function validar_base_json() {
    try {
        jsonData = sessionStorage.getItem("JSON_DATA");
        if (jsonData === null) {
            console.log("No hay JSON almacenado!");
        } else {
            console.log("HAY JSON ALMACENADO");
            //console.log(jsonData);
            document.getElementById("STATUS_JSON").style.backgroundColor = "green";

            let contador = 0;
            let lista_lugares = JSON.parse(jsonData);
            let option = document.createElement("option");
                option.value = -1; 
                option.textContent = "Seleccione un Lugar"; 
                document.getElementById("SELECT_LUGAR").appendChild(option);
            lista_lugares.forEach((marcador) => {
                let option = document.createElement("option");
                option.value = marcador.index; // El valor que tendrá la opción
                option.textContent = marcador.nombre_lugar; // El texto que se mostrará en el select
                // Agregar el option al select
                document.getElementById("SELECT_LUGAR").appendChild(option);
            });
            document.getElementById("SELECT_LUGAR").addEventListener("change", () => {
                let select = document.getElementById("SELECT_LUGAR");
                let selectedIndex = select.value; // Obtener el valor del select (index seleccionado)
                
                // Encontrar el objeto que corresponde al índice seleccionado
                selectedLugar = lista_lugares.find(marcador => marcador.index == selectedIndex);
        
                // Guardar la información en las variables
                if (selectedLugar) {
                    nombre = selectedLugar.nombre_lugar;
                    informacion = selectedLugar.informacion;
                    multimedia = selectedLugar.multimedia;
                    sitio_web = selectedLugar.sitio_web;
                    ubicacion_mapa = selectedLugar.ubicacion;
                    filtro_tematico = selectedLugar.filtro_tematico
                    console.log(nombre, informacion, multimedia, sitio_web, ubicacion_mapa, filtro_tematico)

                } else {
                    console.log("No se seleccionó ningún lugar válido.");
                }})




        }
    } catch (error) {
        console.log("ERROR AL OBTENER JSON");
        console.log(error);
    }
}

document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            jsonData = e.target.result;
            sessionData = JSON.parse(jsonData);

            console.log("EXITO AL CARGAR JSON");
            console.log(sessionData);
            document.getElementById("STATUS_JSON").style.backgroundColor = "green";

            sessionStorage.setItem("JSON_DATA", jsonData);
        } catch (error) {
            console.log("Error al cargar el JSON: " + error);
        }
    };
    reader.readAsText(file);
});

function guardarJson() {
    const jsonString = JSON.stringify(sessionData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "datos.json";
    a.click();
}


function AccionSiguiente() {
    alert("No Implementado")
}

function AccionModificar() {
    let select = document.getElementById("SELECT_LUGAR");
    let selectedIndex = select.value;
    console.log(selectedIndex)
    if(selectedIndex == -1){
        alert("Seleccione un lugar")
        return
    }
    document.getElementById("ADMIN_DIV").className = "oculto"
    document.getElementById("EDITAR_AGREGAR").classList.remove("oculto");
    document.getElementById("BOTON_ACCION_GUARDAR").className = "oculto"

    document.getElementById("nombre_lugar").value = nombre
    document.getElementById("info_ubicacion").value = informacion.ubicacion
    document.getElementById("info_historia").value = informacion.historia
    document.getElementById("info_dato_curioso").value = informacion.datos_curiosos
    document.getElementById("ubicacion_lugar").value = ubicacion_mapa
    document.getElementById("sitio_lugar").value = sitio_web
    document.getElementById("nombre_lugar").value = nombre
    document.getElementById("nombre_lugar").value = nombre
}

function AccionAgregar() {
    document.getElementById("ADMIN_DIV").className = "oculto"
    document.getElementById("EDITAR_AGREGAR").classList.remove("oculto");
    document.getElementById("BOTON_ACCION_MODIFICAR").className = "oculto"

    document.getElementById("nombre_lugar").value = ""
    document.getElementById("info_ubicacion").value = ""
    document.getElementById("info_historia").value = ""
    document.getElementById("info_dato_curioso").value = ""
    document.getElementById("ubicacion_lugar").value = ""
    document.getElementById("sitio_lugar").value = ""
    document.getElementById("nombre_lugar").value = ""
    document.getElementById("nombre_lugar").value = ""
}

function AccionAtras() {
    document.getElementById("ADMIN_DIV").classList.remove("oculto");
    document.getElementById("EDITAR_AGREGAR").className = "oculto"
    document.getElementById("BOTON_ACCION_MODIFICAR").className = "oculto"
}


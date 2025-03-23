
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
            console.log(jsonData);
            document.getElementById("STATUS_JSON").style.backgroundColor = "green";
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


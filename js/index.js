function abriremergente() {
    document.getElementById("miemergente").style.display = "flex";
}

function verificarPassword() {
    let usuario = document.getElementById("usuario_input").value;
    let password = document.getElementById("password_input").value;
    let UsuarioCorrecto = "admin"
    let contraseñaCorrecta = "1234";
    if (usuario === UsuarioCorrecto  && password === contraseñaCorrecta) {
        alert("Acceso permitido");
        document.getElementById("miemergente").style.display = "none";
        redirigir('Admin.html')
    } else {
        alert("Credenciales incorrectas");
    }
}

function cancelar() {
    document.getElementById("miemergente").style.display = "none";
}
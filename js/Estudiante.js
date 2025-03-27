
let jsonData = "";
window.onload = function () {
    validar_base_json();
};
// Para cada marcador en el JSON, generamos un contenido dinámico
let contador = 0;
function validar_base_json() {
    try {

        jsonData = sessionStorage.getItem("JSON_DATA");
        if (jsonData === null) {
            console.log("No hay JSON almacenado!");
        } else {
            console.log("HAY JSON ALMACENADO");
            //console.log(jsonData);
            let lista_lugares = JSON.parse(jsonData);

            lista_lugares.forEach((marcador) => {
                console.log(marcador.index)
                console.log(contador)
                // CREAR UNA ENTIDAD PARA ALMACENAR TODO EL CONTENIDO
                const contenido = document.createElement('a-entity');
                contenido.setAttribute('mindar-image-target', `targetIndex: ${marcador.index}`);

                // CUANDO DETECTA UNA IMAGEN
                contenido.addEventListener('targetFound', () => {
                    //CONTENIDO 
                    console.log(marcador.multimedia[0].length)
                    contenido.innerHTML = `
                        <a-plane id="boton_filtro" class="clickable" position="-0.66 0.5 0.2" width="0.2" height="0.1" 
                            material="src: ./img/boton_apagado.png; transparent: true; opacity: 0;">
                            <a-text value="Filtro tematico" color="white" position="0 0 0" width="0.5" align="center"></a-text>
                        </a-plane>
                        
                        <a-plane id="contentPlane" position="0 0 0" width="1" height="1" material="color: white; transparent: true; opacity: 0.5;"></a-plane>
                        
                        <a-entity position="0 -0.8 0.1" material="color: black">
                            <a-plane id="fondo_nav" class="clickable" position="0 1.3 0" width="1" height="0.1" 
                                material="color: white; opacity: 0;"></a-plane>

                            <a-plane id="multimediaButton" class="clickable" position="-0.35 1.25 0.1" width="0.2" height="0.1" 
                                material="src: ./img/boton_apagado.png; transparent: true; opacity: 0;">
                                <a-text id="multimediatext" value="Multimedia" color="white" position="0 0 0.0" width="0.5" align="center" opacity: 0;></a-text>
                            </a-plane>

                            <a-plane id="infoButton" class="clickable" position="-0.12 1.25 0.1" width="0.2" height="0.1" 
                                material="src: ./img/boton_apagado.png; transparent: true; opacity: 0;">
                                <a-text value="Informacion" color="white" position="0 0 0.0" width="0.5" align="center"></a-text>
                            </a-plane>

                            <a-plane id="sitioButton" class="clickable" position="0.12 1.25 0.1" width="0.2" height="0.1" 
                                material="src: ./img/boton_apagado.png; transparent: true; opacity: 0;">
                                <a-text value="Sitio Web" color="white" position="0 0 0.0" width="0.5" align="center"></a-text>
                            </a-plane>

                            <a-plane id="mapaButton" class="clickable" position="0.35 1.25 0.1" width="0.2" height="0.1" 
                                material="src: ./img/boton_apagado.png; transparent: true; opacity: 0;">
                                <a-text value="Mapa" color="white" position="0 0 0.0" width="0.5" align="center"></a-text>
                            </a-plane>
                        </a-entity>
                    `;

                    function showButton(id, delay) {
                        setTimeout(() => {
                            let element = document.querySelector(`#${id}`);
                            if (element) {
                                element.setAttribute("animation", "property: material.opacity; from: 0; to: 1; dur: 500; easing: easeOutQuad");
                            }
                        }, delay);
                    }
                    showButton("boton_filtro", 300);
                    showButton("fondo_nav", 600);
                    showButton("multimediaButton", 900);
                    showButton("multimediatext", 900);
                    showButton("infoButton", 1200);
                    showButton("sitioButton", 1500);
                    showButton("mapaButton", 1800);

                    setTimeout(() => {
                        const conte = document.querySelector("#contentPlane");
                        conte.innerHTML = `
                        <a-image id="imagenCarrusel" 
                            src="${marcador.multimedia[0][0].link}" 
                            position="0 0.02 0.1" 
                            width="0.7" 
                            height="0.3"
                            opacity="0"
                            animation="property: opacity; from: 0; to: 1; dur: 1000; easing: linear">
                        </a-image>
                        <a-text id="titulocarrusel" value="${marcador.nombre_lugar}" color="black" position="0 -0.35 0" width="1.5" align="center"
                        opacity="0" animation="property: opacity; from: 0; to: 1; dur: 1500; easing: linear"></a-text>
                    `;
                        function cambiarboton(botonId) {
                            const botones = ["multimediaButton", "infoButton", "sitioButton", "mapaButton"];
                            botones.forEach((id) => {
                                const boton = document.querySelector(`#${id}`);
                                if (id === botonId) {
                                    boton.setAttribute("material", "src", "./img/boton_encendido.png");
                                } else {
                                    boton.setAttribute("material", "src", "./img/boton_apagado.png");
                                }
                            });
                        }
                        const contentPlane = document.querySelector("#contentPlane");
                        document.getElementById(`multimediaButton`)?.addEventListener("click", () => {
                            cambiarboton("multimediaButton");
                            console.log(`Multimedia presionado en ${marcador.nombre_lugar}`);

                            function ver_contenido(tipo) {
                                let indexImagen = 0;
                                let visualizador = "";
                                let boton_tipo1 = "";
                                let boton_tipo2 = "";
                                let tiene_contenido = 0;
                                let botones_multimedia = "";

                                if (tipo === 1) {
                                    if (marcador.multimedia[0].length > 0) {
                                        tiene_contenido = 1;
                                        visualizador = `
                                            <!-- IMAGEN -->
                                            <a-image id="imagenCarrusel" src="${marcador.multimedia[0][0].link}" position="0 0.02 0.1" width="1" height="0.7" animation="property: scale; from: 0.5 0.5 0.5; to: 1 1 1; dur: 500; easing: easeOutQuad"></a-image>
                                            <a-text id="titulocarrusel" value="${marcador.multimedia[0][0].titulo}" color="black" position="0 -0.35 0" width="0.8" align="center"></a-text>`;
                                    } else {
                                        visualizador = `
                                            <!-- IMAGEN -->
                                            <a-image id="imagenCarrusel" src="./img/sin_contenido.png" position="0 0 0.1" width="1" height="0.7" animation="property: scale; from: 0.5 0.5 0.5; to: 1 1 1; dur: 500; easing: easeOutQuad"></a-image>`;
                                    }
                                    boton_tipo1 = "boton_encendido";
                                    boton_tipo2 = "boton_apagado";
                                } else {
                                    if (marcador.multimedia[1].length > 0) {
                                        tiene_contenido = 1;
                                        visualizador = `
                                            <!-- VIDEO -->
                                            <a-video id="imagenCarrusel" src="${marcador.multimedia[1][0].link}" position="0 0.02 0.1" width="1" height="0.7" crossorigin="anonymous" animation="property: scale; from: 0.5 0.5 0.5; to: 1 1 1; dur: 500; easing: easeOutQuad"></a-video>
                                            <a-text id="titulocarrusel" value="${marcador.multimedia[1][0].titulo}" color="black" position="0 -0.35 0" width="0.8" align="center"></a-text>`;
                                    } else {
                                        visualizador = `
                                            <!-- IMAGEN -->
                                            <a-image id="imagenCarrusel" src="./img/sin_contenido.png" position="0 0 0.1" width="1" height="0.7" animation="property: scale; from: 0.5 0.5 0.5; to: 1 1 1; dur: 500; easing: easeOutQuad"></a-image>`;
                                    }
                                    boton_tipo1 = "boton_apagado";
                                    boton_tipo2 = "boton_encendido";
                                }

                                if (tiene_contenido) {
                                    botones_multimedia = `
                                        <!-- BOTON ANTERIOR -->
                                        <a-plane id="prevButton" class="clickable" position="-0.6 0 0.2" width="0.15" height="0.15" material="src: ./img/prev.png; transparent: true;" animation="property: scale; from: 0.5 0.5 0.5; to: 1 1 1; dur: 500; easing: easeOutQuad"></a-plane>
                        
                                        <!-- BOTON SIGUIENTE -->
                                        <a-plane id="nextButton" class="clickable" position="0.6 0 0.2" width="0.15" height="0.15" material="src: ./img/next.png; transparent: true;" animation="property: scale; from: 0.5 0.5 0.5; to: 1 1 1; dur: 500; easing: easeOutQuad"></a-plane>`;
                                }

                                contentPlane.innerHTML = `
                                    ${visualizador}
                                    ${botones_multimedia}
                                    <!-- BOTON IMAGEN -->
                                    <a-plane id="ImagenButton" class="clickable" position="-0.2 -0.5 0.2" width="0.2" height="0.1" material="src: ./img/${boton_tipo1}.png; transparent: true;" animation="property: scale; from: 0.5 0.5 0.5; to: 1 1 1; dur: 500; easing: easeOutQuad">
                                        <a-text value="Imagen" color="white" position="0 0 0" width="0.8" align="center"></a-text>
                                    </a-plane>
                        
                                    <!-- BOTON VIDEO -->
                                    <a-plane id="VideoButton" class="clickable" position="0.2 -0.5 0.2" width="0.2" height="0.1" material="src: ./img/${boton_tipo2}.png; transparent: true;" animation="property: scale; from: 0.5 0.5 0.5; to: 1 1 1; dur: 500; easing: easeOutQuad">
                                        <a-text value="Video" color="white" position="0 0 0" width="0.8" align="center"></a-text>
                                    </a-plane>
                                `;

                                setTimeout(() => {
                                    const imgElement = document.getElementById(`imagenCarrusel`);
                                    const titulo_element = document.getElementById(`titulocarrusel`);
                                    const imagenButton = document.getElementById(`ImagenButton`);
                                    const videoButton = document.getElementById(`VideoButton`);
                                    if (tiene_contenido) {
                                        const prevButton = document.getElementById(`prevButton`);
                                        const nextButton = document.getElementById(`nextButton`);
                                        // BOTON ANTERIOR
                                        prevButton.addEventListener("click", () => {
                                            if (tipo === 1) {
                                                indexImagen = (indexImagen - 1 + marcador.multimedia.length) % marcador.multimedia[0].length;
                                                imgElement.setAttribute("src", marcador.multimedia[0][indexImagen].link);
                                                titulo_element.setAttribute("value", marcador.multimedia[0][indexImagen].titulo);
                                            } else {
                                                indexImagen = (indexImagen - 1 + marcador.multimedia.length) % marcador.multimedia[1].length;
                                                imgElement.setAttribute("src", marcador.multimedia[1][indexImagen].link);
                                                titulo_element.setAttribute("value", marcador.multimedia[1][indexImagen].titulo);
                                            }
                                        });
                                        // BOTON SIGUIENTE
                                        nextButton.addEventListener("click", () => {
                                            if (tipo === 1) {
                                                indexImagen = (indexImagen + 1) % marcador.multimedia[0].length;
                                                imgElement.setAttribute("src", marcador.multimedia[0][indexImagen].link);
                                                titulo_element.setAttribute("value", marcador.multimedia[0][indexImagen].titulo);
                                            } else {
                                                indexImagen = (indexImagen + 1) % marcador.multimedia[1].length;
                                                imgElement.setAttribute("src", marcador.multimedia[1][indexImagen].link);
                                                titulo_element.setAttribute("value", marcador.multimedia[1][indexImagen].titulo);
                                            }
                                        });
                                    }
                                    // BOTON VIDEO
                                    videoButton.addEventListener("click", () => {
                                        ver_contenido(2);
                                    });

                                    // BOTON IMAGEN
                                    imagenButton.addEventListener("click", () => {
                                        ver_contenido(1);
                                    });

                                }, 500);
                            }

                            ver_contenido(1);
                        });



                        document.getElementById(`infoButton`)?.addEventListener("click", () => {
                            cambiarboton("infoButton");
                            console.log(`Información presionada en ${marcador.nombre_lugar}`);
                            console.log(marcador.informacion.nombre, marcador.informacion.ubicacion);

                            const contentPlane = document.getElementById("contentPlane");

                            if (contentPlane) {
                                // Aplicar animación de escala para que el contenido aparezca
                                contentPlane.setAttribute('animation', 'property: scale; to: 0; dur: 500; easing: easeInOutQuad');

                                // Esperar a que la animación de escala termine
                                setTimeout(() => {
                                    // Cambiar el contenido de contentPlane
                                    contentPlane.innerHTML = `
                                        <a-plane id="contentPlane" position="0 0 0" width="1" height="1" material="color: white;"></a-plane>
                                        <a-image id="imagenCarrusel" src="${marcador.multimedia[0][0].link}" position="0.3 0.35 0.01" width="0.3" height="0.2"></a-image>
                                        <a-entity id="nombreInfo" position="-0.45 0.4 0.01">
                                            <a-text value="Nombre:" color="black" width="0.8" align="left" baseline="top" position="0 0 0" font="https://cdn.aframe.io/fonts/Exo2Bold.fnt"></a-text>
                                            <a-text value="${marcador.informacion.nombre}" color="black" width="1" align="left" baseline="top" position="0.15 0 0"></a-text>
                                        </a-entity>
                                        <a-entity id="ubicacionInfo" position="-0.45 0.3 0.01">
                                            <a-text value="Ubicacion:" color="black" width="0.8" align="left" baseline="top" position="0 0 0" font="https://cdn.aframe.io/fonts/Exo2Bold.fnt"></a-text>
                                            <a-text value="${marcador.informacion.ubicacion}" color="black" width="0.8" align="left" baseline="top" position="0.17 0 0"></a-text>
                                        </a-entity>
                                        <a-entity id="historiaInfo" position="-0.45 0.2 0.01">
                                            <a-text value="Historia:" color="black" width="0.8" align="left" baseline="top" position="0 0 0" font="https://cdn.aframe.io/fonts/Exo2Bold.fnt"></a-text>
                                            <a-text value="${marcador.informacion.historia}" 
                                                color="black" width="0.6" align="left" baseline="top" position="0.3 0 0" wrap-count="50"></a-text>
                                        </a-entity>
                                        <a-entity id="datosCuriososInfo" position="-0.45 -0.15 0.01">
                                            <a-text value="Datos Curiosos:" color="black" width="0.8" align="left" baseline="top" position="0 0 0" font="https://cdn.aframe.io/fonts/Exo2Bold.fnt"></a-text>
                                            <a-text value="${marcador.informacion.datos_curiosos}"
                                                color="black" width="0.6" align="left" baseline="top" position="0.3 0 0"></a-text>
                                        </a-entity>
                                    `;

                                    // Aplicar la animación de escala para hacer aparecer el nuevo contenido
                                    contentPlane.setAttribute('animation', 'property: scale; to: 1 1 1; dur: 500; easing: easeInOutQuad');
                                }, 500);  // Este timeout debe coincidir con la duración de la animación de desaparición
                            }
                        });


                        document.getElementById(`sitioButton`)?.addEventListener("click", () => {
                            cambiarboton("sitioButton");
                            //console.log(`Sitio Web presionado en ${marcador.nombre_lugar}`);
                            window.open(marcador.sitio_web, "_blank");
                        });

                        document.getElementById(`mapaButton`)?.addEventListener("click", () => {
                            cambiarboton("mapaButton");
                            //console.log(`Mapa presionado en ${marcador.nombre_lugar}`);
                            window.open(marcador.ubicacion, "_blank");
                        });

                        document.getElementById(`boton_filtro`)?.addEventListener("click", () => {
                            let imagen_json = marcador.filtro_tematico
                            sessionStorage.setItem("textura_personalizada", imagen_json)
                            console.log(imagen_json)
                            window.location.href = "filtro_tematico.html";
                        });
                    }, 500);
                });

                // CUANDO SE PIERDE EL MARCADOR
                contenido.addEventListener('targetLost', () => {
                    contenido.innerHTML = "";
                });

                // AGREGAR TODO EN PANTALLA
                document.querySelector('a-scene').appendChild(contenido);
                contador++;
            });
        }
    } catch (error) {
        console.log("ERROR AL OBTENER JSON");
        console.log(error);
    }
}
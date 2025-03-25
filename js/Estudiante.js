
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
                // CREAR UNA ENTIDAD PARA ALMACENAR TODO EL CONTENIDO
                const contenido = document.createElement('a-entity');
                contenido.setAttribute('mindar-image-target', `targetIndex: ${contador}`);

                // CUANDO DETECTA UNA IMAGEN
                contenido.addEventListener('targetFound', () => {
                    //CONTENIDO 
                    contenido.innerHTML = `
                        <a-plane id="boton_filtro" class="clickable" position="-2 1 0.3" width="0.4" height="0.2" material="src: ./img/boton_apagado.png; transparent: true;">
                            <a-text value="Filtro tematico" color="white" position="0 0 0" width="1.2" align="center"></a-text>
                        </a-plane>
                            
                        <a-plane id="contentPlane" position="0 0 0" width="3" height="2" material="color: white; transparent: true; opacity: 0.5;"></a-plane>
            
                        <a-entity position="0 -0.8 0.1" material="color: black">
                            <a-plane id="fondo_nav" class="clickable" position="0 1.7 0" width="3" height="0.2" material="color: white;"></a-plane>
                            
                            <a-plane id="multimediaButton" class="clickable" position="-1.1 1.7 0.1" width="0.4" height="0.2" material="src: ./img/boton_apagado.png; transparent: true;">
                                <a-text value="Multimedia" color="white" position="0 0 0" width="1.2" align="center"></a-text>
                            </a-plane>
            
                            <a-plane id="infoButton" class="clickable" position="-0.36 1.7 0.1" width="0.5" height="0.2" material="src: ./img/boton_apagado.png; transparent: true;">
                                <a-text value="Informacion" color="white" position="0 0 0" width="1.2" align="center"></a-text>
                            </a-plane>
            
                            <a-plane id="sitioButton" class="clickable" position="0.36 1.7 0.1" width="0.5" height="0.2" material="src: ./img/boton_apagado.png; transparent: true;">
                                <a-text value="Sitio Web" color="white" position="0 0 0" width="1.2" align="center"></a-text>
                            </a-plane>
            
                            <a-plane id="mapaButton" class="clickable" position="1.1 1.7 0.1" width="0.5" height="0.2" material="src: ./img/boton_apagado.png; transparent: true;">
                                <a-text value="Mapa" color="white" position="0 0 0" width="1.2" align="center"></a-text>
                            </a-plane>
                        </a-entity>
                    `;
                    // TIEMPO PARA ESTAR SEGURO DE QUE LOS ELEMENTOS ESTAN EN PANTALLA
                    setTimeout(() => {
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
                                let visualizador = ""
                                let boton_tipo1 = ""
                                let boton_tipo2 = ""
                                let tiene_contenido = 0
                                let botones_multimedia = ""
                                if (tipo === 1) {
                                    if (marcador.multimedia[0].length > 0) {
                                        tiene_contenido = 1
                                        visualizador = `
                                        <!-- IMAGEN -->
                                        <a-image id="imagenCarrusel" src="${marcador.multimedia[0][0].link}" position="0 0 0.1" width="2" height="1.5"></a-image>
                                        <a-text id="titulocarrusel" value="${marcador.multimedia[0][0].titulo}" color="black" position="0 -0.8 0" width="2" align="center"></a-text>`
                                    } else {
                                        visualizador = `
                                        <!-- IMAGEN -->
                                        <a-image id="imagenCarrusel" src="./img/sin_contenido.png" position="0 0 0.1" width="2" height="1.5"></a-image>`
                                    }
                                    boton_tipo1 = "boton_encendido"
                                    boton_tipo2 = "boton_apagado"
                                } else {
                                    if (marcador.multimedia[1].length > 0) {
                                        tiene_contenido = 1
                                        visualizador = `
                                        <!-- VIDEO -->
                                        <a-video id="imagenCarrusel" src="${marcador.multimedia[1][0].link}" position="0 0 0.1" width="2" height="1.5"crossorigin="anonymous"></a-video>
                                        <a-text id="titulocarrusel" value="${marcador.multimedia[1][0].titulo}" color="black" position="0 -0.8 0" width="2" align="center"></a-text>`
                                    } else {
                                        visualizador = `
                                        <!-- IMAGEN -->
                                        <a-image id="imagenCarrusel" src="./img/sin_contenido.png" position="0 0 0.1" width="2" height="1.5"></a-image>`
                                    }
                                    boton_tipo1 = "boton_apagado"
                                    boton_tipo2 = "boton_encendido"
                                }
                                if (tiene_contenido) {
                                    botones_multimedia = `
                                    <!-- BOTON ANTERIOR -->
                                    <a-plane id="prevButton" class="clickable" position="-1.2 0 0.2" width="0.3" height="0.3" material="src: ./img/prev.png;transparent: true;"></a-plane>
            
                                    <!-- BOTON SIGUIENTE -->
                                    <a-plane id="nextButton" class="clickable" position="1.2 0 0.2" width="0.3" height="0.3" material="src: ./img/next.png; transparent: true;"></a-plane> `
                                }
                                contentPlane.innerHTML = `
                                ${visualizador}
                                ${botones_multimedia}
                                <!-- BOTON IMAGEN -->
                                <a-plane id="ImagenButton" class="clickable" position="-0.6 -1 0.2" width="0.5" height="0.2" material="src: ./img/${boton_tipo1}.png; transparent: true;">
                                <a-text value="Imagen" color="white" position="0 0 0" width="1.2" align="center"></a-text>
                                </a-plane>
            
                                <!-- BOTON VIDEO -->
                                <a-plane id="VideoButton" class="clickable" position="0.6 -1 0.2" width="0.5" height="0.2" material="src: ./img/${boton_tipo2}.png; transparent: true;">
                                <a-text value="Video" color="white" position="0 0 0" width="1.2" align="center"></a-text>
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
                                        //BOTON SIGUIENTE
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
                                    //BOTON VIDEO
                                    videoButton.addEventListener("click", () => {
                                        ver_contenido(2)
                                    });

                                    //BOTON IMAGEN
                                    imagenButton.addEventListener("click", () => {
                                        ver_contenido(1)
                                    });

                                }, 500);
                            }
                            //console.log(marcador.multimedia[0].nombre);
                            ver_contenido(1)

                        });

                        document.getElementById(`infoButton`)?.addEventListener("click", () => {
                            cambiarboton("infoButton");
                            console.log(`Información presionada en ${marcador.nombre_lugar}`);
                            console.log(marcador.informacion.nombre, marcador.informacion.ubicacion)
                            contentPlane.innerHTML = `
                                <a-plane id="contentPlane" position="0 0 0" width="2.7" height="1.5" material="color: white;"></a-plane>
                                <a-entity id="titulo" position="0.6 0 0.2">
                                    <a-text value="${marcador.nombre_lugar}:" color="black" width="2" align="left" baseline="top" position="0 0 0" font="https://cdn.aframe.io/fonts/Exo2Bold.fnt"></a-text>
                                </a-entity>
                                <a-entity id="nombreInfo" position="-1.2 0.6 0.2">
                                    <a-text value="Nombre:" color="black" width="1.5" align="left" baseline="top" position="0 0 0" font="https://cdn.aframe.io/fonts/Exo2Bold.fnt"></a-text>
                                    <a-text value="${marcador.informacion.nombre}" color="black" width="1.5" align="left" baseline="top" position="0.3 0 0"></a-text>
                                </a-entity>
                                <a-entity id="ubicacionInfo" position="-1.2 0.6 0.2">
                                    <a-text value="Ubicacion:" color="black" width="1.5" align="left" baseline="top" position="0.9 0 0" font="https://cdn.aframe.io/fonts/Exo2Bold.fnt"></a-text>
                                    <a-text value="${marcador.informacion.ubicacion}" color="black" width="1.5" align="left" baseline="top" position="1.3 0 0"></a-text>
                                </a-entity>
                                <a-entity id="historiaInfo" position="-1.2 0.4 0.2">
                                    <a-text value="Historia:" color="black" width="1.5" align="left" baseline="top" position="0 0 0" font="https://cdn.aframe.io/fonts/Exo2Bold.fnt"></a-text>
                                    <a-text value="${marcador.informacion.historia}"
                                        color="black" width="1.4" align="left" baseline="top" position="0.3 0 0" wrap-count="50"></a-text>
                                </a-entity>
                                <a-entity id="datosCuriososInfo" position="-1.2 -0.2 0.2">
                                    <a-text value="Datos Curiosos:" color="black" width="1.5" align="left" baseline="top" position="-0.2 0 0" font="https://cdn.aframe.io/fonts/Exo2Bold.fnt"></a-text>
                                    <a-text value="${marcador.informacion.datos_curiosos}"
                                        color="black" width="1.4" align="left" baseline="top" position="0.3 0 0"></a-text>
                                </a-entity>
                            `;
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
                            let imagen_json = "./img/"+ marcador.filtro_tematico +".png"
                            sessionStorage.setItem("textura_personalizada",imagen_json )
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
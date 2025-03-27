import * as THREE from 'three';
import { MindARThree } from 'mindar-face-three';

document.addEventListener("DOMContentLoaded", function () {
    const boton_cambiar_camara = document.querySelector("#boton_cambiar_camara");
    //sessionStorage.setItem("textura_personalizada","./img/prueba.png" )
    let imagen_tematica = sessionStorage.getItem("textura_personalizada")
    if(imagen_tematica === "" || imagen_tematica === undefined || imagen_tematica===null){
        imagen_tematica = "./img/viejito.png"
    }
    console.log(imagen_tematica)
    // Inicializar MindAR
    const mindarThree = new MindARThree({
        container: document.querySelector("#container"),
    });
    const { renderer, scene, camera } = mindarThree;

    // Añadir iluminación
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1.3);
    scene.add(light);

    // Crear malla facial
    const faceMesh = mindarThree.addFaceMesh();
    const texture = new THREE.TextureLoader().load(imagen_tematica);
    
    faceMesh.material.map = texture;
    faceMesh.material.transparent = true;
    faceMesh.material.needsUpdate = true;
    scene.add(faceMesh);

    // Función para iniciar
    const start = async () => {
        await mindarThree.start();
        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    }
    start();

    boton_cambiar_camara.addEventListener('click', () => {
        mindarThree.switchCamera();
    });

    start();
});
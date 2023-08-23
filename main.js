import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.131.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.131.2/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();

const modelUrl = 'candyreal.glb'; // Assuming the .glb file is in the same directory as your HTML and JavaScript files

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

loader.load(
    modelUrl,
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        camera.position.z = 2;
        animate();
    },
    undefined,
    (error) => {
        console.error('Error loading GLB model:', error);
    }
);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}




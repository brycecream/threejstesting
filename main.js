import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.131.2/build/three.module.js';
import { GLTFLoader } from './path-to-three.js/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();
let model;

loader.load(
    'model for threes/scene.gltf', // Replace with the path to your model
    (gltf) => {
        model = gltf.scene;
        scene.add(model);

        // You might need to adjust the position and scale of the model
        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1);

        animate();
    },
    undefined,
    (error) => {
        console.error('Error loading GLTF model:', error);
    }
);

camera.position.z = 5;

const animate = () => {
    requestAnimationFrame(animate);

    if (model) {
        // Add animations or interactions here if needed
    }

    renderer.render(scene, camera);
};

animate();



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setClearColor(0xFFA5EF); // Set the background color to white


document.body.appendChild(renderer.domElement);

const loader = new THREE.GLTFLoader();

const modelUrl = 'model for threes/scene.gltf';

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

let model; // Declare model variable outside the load function

loader.load(
    modelUrl,
    (gltf) => {
        const originalModel = gltf.scene;
        const scale = 0.01; // Adjust the scale as needed

        // Compute the bounding box of the original model to determine its size
        const box = new THREE.Box3().setFromObject(originalModel);
        const size = box.getSize(new THREE.Vector3());

        // Create a grid of models
        const rows = 10; // Number of rows
        const cols = 10; // Number of columns
        const spacing = 1.5; // Spacing between models

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const model = originalModel.clone();
                model.scale.set(scale, scale, scale);
                model.position.set(
                    (j - (cols - 1) / 2) * (size.x * scale + spacing),
                    (i - (rows - 1) / 2) * (size.y * scale + spacing),
                    0
                );
                scene.add(model);
            }
        }

        // Set camera position
        camera.position.z = 5; // Adjust the camera position as needed

        // Start animation
        animate();
    },
    undefined,
    (error) => {
        console.error('Error loading GLB model:', error);
    }
);


function animate() {
    requestAnimationFrame(animate);

    scene.traverse((object) => {
        if (object.isMesh || object.isGroup) { // Apply rotation to meshes and groups
            object.rotation.x += 0.005;
            object.rotation.y += 0.005;
        }
    });

    renderer.render(scene, camera);
}









import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
const gui = new dat.GUI();

const scene = new THREE.Scene();


const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: "red" })
);
scene.add(box);

// Camera setup
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 8;
camera.position.x = 0;
camera.position.y = 1;
scene.add(camera);
const canvas = document.querySelector('#webcanvas');

// Render the scene
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setAnimationLoop(animation);

const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

// Handle resizing screen
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Handle animation
function animation(time) {
    control.update();
    renderer.render(scene, camera);
}
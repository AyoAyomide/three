import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import * as brain from 'brain.js';
const gui = new dat.GUI();

// const color = new THREE.Color(output).setHex(output);
const color = new THREE.Color('red');

const scene = new THREE.Scene();

const box = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color })
);
scene.add(box);

// set up variables for the terrain mesh
const size = 5;
const segments = 10;

// create a plane geometry and set its vertices using Perlin noise
const planeGeometry = new THREE.PlaneGeometry(size, size, segments, segments);

let group = new THREE.Group();

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let pos = 0;
let neg = 0;
for (let i = 0; i < 10; i++) {
    const mesh = new THREE.Mesh(planeGeometry, new THREE.MeshBasicMaterial({ color: getRandomColor() }));
    mesh.rotation.x = -Math.PI / 2 / 3;
    group.add(mesh);
    if (i % 2 == 0) {
        mesh.position.x = pos;
        pos += size;
        console.log('even', pos);
    }
    else {
        neg += size;
        mesh.position.x = -neg;
        console.log('odd', neg, 'even', -pos);
    }
}

scene.add(group);

// create a material and mesh for the terrain
// const mesh1 = new THREE.Mesh(planeGeometry, new THREE.MeshBasicMaterial({ color: 'blue', wireframe: true }));
// mesh1.rotation.x = -Math.PI/2 / 3;

// const mesh2 = new THREE.Mesh(planeGeometry, new THREE.MeshBasicMaterial({ color: 'green', wireframe: true }));
// mesh2.rotation.x = -Math.PI/2 /3;

// mesh2.position.x = size;

// add the mesh to the scene
// scene.add(mesh1);
// scene.add(mesh2);

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
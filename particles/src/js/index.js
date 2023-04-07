import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
const gui = new dat.GUI();

const loadTexture = (textureLoader, url) => {
    return textureLoader.load(new URL(url, import.meta.url).href);
}

// Load textures
const textureLoader = new THREE.TextureLoader();
const particleTexture = loadTexture(textureLoader, '../img/particles/9.png');


const scene = new THREE.Scene();

// const sphereParticleGeometry = new THREE.SphereGeometry(1, 32, 32);
// const sphereParticleMaterial = new THREE.PointsMaterial({
//     size: 0.1,
//     sizeAttenuation: true
// })

// const sphereParticlePoint = new THREE.Points(sphereParticleGeometry, sphareParticleMaterial);

// scene.add(sphereParticlePoint);

const customParticleGeometry = new THREE.BufferGeometry();
const customParticleTexture = new THREE.PointsMaterial({
    size: 0.2,
    sizeAttenuation: true,
    map: particleTexture,
    // color: "blue",
    alphaMap: particleTexture,
    transparent: true,
    alphaTest: 0.5,
    // depthTest: false,
    // depthWrite: false,
    // blending: THREE.AdditiveBlending
    vertexColors: true
});
const particleCount = 500;
const position = new Float32Array(particleCount * 3);
const color = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
    position[i] = (Math.random() - 0.5) * 5;
    color[i] = Math.random();
}

customParticleGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(position, 3)
);

customParticleGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(color, 3)
);

const customParticlePoint = new THREE.Points(
    customParticleGeometry,
    customParticleTexture
)

scene.add(customParticlePoint);

const sampleSphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshBasicMaterial({ color: 'white' })
);

// scene.add(sampleSphere);


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
// renderer.setClearColor("#fff");

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

const clock = new THREE.Clock();
// Handle animation
function animation(time) {
    control.update();

    // animate particles
    // customParticlePoint.rotation.y = clock.getElapsedTime() * 0.1;
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = customParticleGeometry.attributes.position.array[i3];
        customParticleGeometry.attributes.position.array[i3 + 1] = Math.sin(clock.getElapsedTime() + x);
    }

    customParticleGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}
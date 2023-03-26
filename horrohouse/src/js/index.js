import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
// import * as brain from 'brain.js';
const gui = new dat.GUI();

const loadTexture = (textureLoader, url) => {
    return textureLoader.load(new URL(url, import.meta.url).href);
}

// Three.js scene
const scene = new THREE.Scene();

// Load textures
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = loadTexture(textureLoader, '../textures/door/color.jpg');
const doorAlphaTexture = loadTexture(textureLoader, '../textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = loadTexture(textureLoader, '../textures/door/ambientOcclusion.jpg');
const doorHeightTexture = loadTexture(textureLoader, '../textures/door/height.jpg');
const doorMetalnessTexture = loadTexture(textureLoader, '../textures/door/metalness.jpg');
const doorNormalTexture = loadTexture(textureLoader, '../textures/door/normal.jpg');
const doorRoughnessTexture = loadTexture(textureLoader, '../textures/door/roughness.jpg');

const bricksColorTexture = loadTexture(textureLoader, '../textures/bricks/color.jpg');
const bricksAmbientOcclusionTexture = loadTexture(textureLoader, '../textures/bricks/ambientOcclusion.jpg');
const bricksNormalTexture = loadTexture(textureLoader, '../textures/bricks/normal.jpg');
const bricksRoughnessTexture = loadTexture(textureLoader, '../textures/bricks/roughness.jpg');

const grassColorTexture = loadTexture(textureLoader, '../textures/grass/color.jpg');
const grassAmbientOcclusionTexture = loadTexture(textureLoader, '../textures/grass/ambientOcclusion.jpg');
const grassNormalTexture = loadTexture(textureLoader, '../textures/grass/normal.jpg');
const grassRoughnessTexture = loadTexture(textureLoader, '../textures/grass/roughness.jpg');

// repeat texture
grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

// wrap texture S and T
grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;


// Three.js horror house group
const houseGroup = new THREE.Group();

// House graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

for (let i = 0; i < 100; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 6;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const y = 0.1 + Math.random() * 0.4;

    const grave = new THREE.Mesh(graveGeometry, graveMaterial);

    grave.position.set(x, y, z);

    grave.rotation.z = (Math.random() - 0.5) * 0.4;
    grave.rotation.y = (Math.random() - 0.5) * 0.4;

    houseGroup.add(grave);
}


// House bush
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.position.set(0.8, 0.2, 2.2);
bush1.scale.set(0.5, 0.5, 0.5);
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.position.set(1.4, 0.1, 2.1);
bush2.scale.set(0.25, 0.25, 0.25);
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.scale.set(0.25, 0.25, 0.25);
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.position.set(-1, 0.05, 2.6);
bush4.scale.set(0.4, 0.4, 0.4);


// Rooftop
const coneTop = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: "#2f3e46" })
);
coneTop.position.y = 3;
coneTop.rotation.y = Math.PI * 0.25;

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 100, 100),
    new THREE.MeshStandardMaterial({
        // wireframe: true,
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        metalnessMap: doorMetalnessTexture,
        normalMap: doorNormalTexture,
        roughnessMap: doorRoughnessTexture
    })
);
door.position.y = 1;
door.position.z = 2.01;
// doot light

const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
doorLight.position.set(0, 2.2, 2.7);
houseGroup.add(doorLight);


// Building walls
const wallsHeight = 2.5;
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, wallsHeight, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
);

walls.position.y = wallsHeight / 2;

// Horror ghost
const ghost1 = new THREE.PointLight("#ff00ff", 2, 3);
const ghost2 = new THREE.PointLight("#00ffff", 2, 3);
const ghost3 = new THREE.PointLight("#ffff00", 2, 3);


const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 1),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
)

floor.rotation.x = - Math.PI * 0.5;
floor.position.y = 0;

// Add objects to the group
houseGroup.add(bush1, bush2, bush3, bush4);
houseGroup.add(door);
houseGroup.add(coneTop);
houseGroup.add(walls);
houseGroup.add(ghost1, ghost2, ghost3);
houseGroup.add(floor);

// use fog
const fog = new THREE.Fog("#262837", 1, 15);
scene.fog = fog;

// Setup lights
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12);
const directionalLight = new THREE.DirectionalLight('#b9d5ff', 0.12);
directionalLight.position.set(0, 10, 10);

// Camera setup
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 8;
camera.position.x = 0;
camera.position.y = 1;

// Add object to scene
scene.add(houseGroup);
scene.add(ambientLight);
scene.add(directionalLight);
scene.add(camera);


const canvas = document.querySelector('#webcanvas');

// Render the scene
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");
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

const animateGhost = (ghost, ghostAngle, ghostRadius) => {
    ghost.position.x = Math.cos(ghostAngle) * ghostRadius;
    ghost.position.z = Math.sin(ghostAngle) * ghostRadius;
    ghost.position.y = Math.sin(ghostAngle * 3);
}

// Handle animation
function animation(time) {

    // Update ghost
    const ghostAngle = time * 0.001;
    const ghostRadius = 7;

    animateGhost(ghost1, ghostAngle, ghostRadius);
    animateGhost(ghost2, ghostAngle + Math.PI, ghostRadius);
    animateGhost(ghost3, ghostAngle + Math.PI * 0.5, ghostRadius);

    control.update();
    renderer.render(scene, camera);
}
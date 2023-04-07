import * as THREE from 'three';

// Room Group
const room = new THREE.Group();

// Room floor
const floorSize = { width: 4, length: 4 };

const tilesMaterial = new THREE.MeshBasicMaterial();
tilesMaterial.color = new THREE.Color("yellow");

const tilesMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(floorSize.width, floorSize.length, 1),
    tilesMaterial
);
const floorMesh = new THREE.Mesh(
    new THREE.BoxGeometry(floorSize.width, 0.1, floorSize.length),
    new THREE.MeshBasicMaterial({ color: "purple" })
);

tilesMesh.rotation.x = -Math.PI / 2;
tilesMesh.position.set(0, 0.07, 0);

// Room walls
const wallMaterial = new THREE.MeshBasicMaterial({ color: "red" });
wallMaterial.side = THREE.BackSide;

const wall1 = new THREE.Mesh(
    new THREE.BoxGeometry(floorSize.length, 2, 0.1),
    wallMaterial);
const wall2 = new THREE.Mesh(
    new THREE.BoxGeometry(floorSize.width, 2, 0.1),
    wallMaterial);

wall1.position.set(-floorSize.width / 2 + 0.05, 1.06, 0);
wall2.position.set(0, 1.06, -floorSize.length / 2 + 0.05);

wall1.rotation.y = Math.PI / 2;

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(floorSize.width, 2, floorSize.length),
    wallMaterial
);

walls.position.set(0, 1.06, 0);

room.add(walls);

// wall1, wall2,

// Room chair
const chairSize = { width: 1.5, height: 0.7 };
const chairGeometry = new THREE.BoxGeometry(chairSize.width, chairSize.height, 0.6);
const chairHolder1 = new THREE.Mesh(
    chairGeometry,
    new THREE.MeshBasicMaterial({ color: "blue" })
);

const chairHolder2 = new THREE.Mesh(
    chairGeometry,
    new THREE.MeshBasicMaterial({ color: "blue" })
);

chairHolder1.position.set(floorSize.width / 2 - 1, chairSize.height / 2, -floorSize.length / 2.5);
chairHolder2.position.set(-floorSize.width / 2.8, chairSize.height / 2, floorSize.length / 4);
chairHolder2.rotation.set(0, Math.PI / 2, 0);

// Room table
const tableSize = { width: 1.2, height: 0.3 };
const tableMaterial = new THREE.MeshBasicMaterial({ color: "green" });
const table = new THREE.Mesh(
    new THREE.BoxGeometry(tableSize.width, tableSize.height, tableSize.width),
    tableMaterial
);

table.position.set(floorSize.width / 6, tableSize.height / 2, floorSize.length / 6);

// Room bookshelf

const bookshelfSize = { width: 1.2, height: 1.5 };
const bookshelf = new THREE.Mesh(
    new THREE.BoxGeometry(bookshelfSize.width, bookshelfSize.height, 0.2),
    new THREE.MeshBasicMaterial({ color: "brown" })
);

bookshelf.position.set(-floorSize.width / 3.1, bookshelfSize.height / 2, -floorSize.length / 2.2);

// room.rotation.x = 2;
room.rotation.y = -0.5;
// Add item to room group
room.add(bookshelf, table, chairHolder1, chairHolder2, tilesMesh, floorMesh);

export { room };
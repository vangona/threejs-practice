import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js";
import { PerspectiveCamera, PointLight } from "https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js";

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
})


const RADIUS = 40
const geometry = new THREE.IcosahedronGeometry(RADIUS, 0);

const material = new THREE.MeshLambertMaterial({ color : "purple" })

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh)
mesh.position.z = -RADIUS * 10

const WIDTH = 500
const HEIGHT = 500

const FOV = 20
const ASPECT = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 10000

const camera = new PerspectiveCamera(
    FOV,
    ASPECT,
    NEAR,
    FAR
)

renderer.setSize(WIDTH, HEIGHT)

const container = document.querySelector('#three')
container.appendChild(renderer.domElement)

const pointLight = new PointLight(0xFFFFF, 1)

pointLight.position.x = 300
pointLight.position.y = 300
pointLight.position.z = 30

scene.add(pointLight)

const update = () => {
    const speed = Math.random() / 200
    mesh.rotation.x += speed
    mesh.rotation.y += speed
    mesh.rotation.z += speed
    renderer.render(scene, camera)
    requestAnimationFrame(update)
}

requestAnimationFrame(update)

const canvas = document.querySelector("#c")
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
})

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

renderer.setSize(WIDTH, HEIGHT)

const FOV = 20
const ASPECT = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 10000

const camera = new THREE.PerspectiveCamera(
    20,
    ASPECT,
    NEAR,
    FAR
)
camera.position.set(0, 10, 500);

const RADIUS = 40
const geometry = new THREE.IcosahedronGeometry(RADIUS, 0);

const material = new THREE.MeshLambertMaterial({ color : "purple" })

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

const ambientLight = new THREE.AmbientLight(0x404040, 3)
ambientLight.position.set(100, 100, 100)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 2)
pointLight.position.set(100, 100, 100)
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xffffff, 2)
pointLight.position.set(-100, -100, -100)
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight(0xffffff, 2)
pointLight.position.set(-100, -100, -100)
scene.add(pointLight3)

const controls = new THREE.OrbitControls(camera, canvas);
controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.PAN
}
controls.update()

const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper)

const gridHelper = new THREE.GridHelper(1000, 10);
scene.add(gridHelper)

const update = () => {
    const speed = Math.random() / 200
    mesh.rotation.x += speed
    mesh.rotation.y += speed
    mesh.rotation.z += speed
    requestAnimationFrame(update)
    controls.update()
    renderer.render(scene, camera)
}

requestAnimationFrame(update)

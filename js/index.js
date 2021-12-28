const textureLoader = new THREE.TextureLoader();
const mtlLoader = new THREE.MTLLoader();
const objLoader = new THREE.OBJLoader();
const path = '../models/';
const objFile = '10194_Onion-L3.obj'
const mtlFile = '10194_Onion-L3.mtl';

const canvas = document.querySelector("#c")
const scene = new THREE.Scene();

scene.background = '#c1c1c1';

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
})

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

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

const geometry = new THREE.BoxGeometry( 40, 30, 40 );
const material = new THREE.MeshBasicMaterial({color: '#c1c1c1'});
const cube = new THREE.Mesh(geometry, material);
cube.translateY(15);
scene.add( cube ); 

mtlLoader.setPath(path);
mtlLoader.setMaterialOptions({side: THREE.DoubleSide})
.load(mtlFile, function(mtl) {
    mtl.preload();

    objLoader.setPath(path);
    objLoader.setMaterials(mtl);

    objLoader.load(objFile, function(obj) {
        obj.traverse( child => {
            if (child.material) child.material = new THREE.MeshBasicMaterial({
                map: textureLoader.load('../models/Yellow OnionC.jpg', undefined, undefined, function(err) {
                    console.log(err);
                }),
            });
        });
        
        obj.rotation.x = 10;
        obj.translateY(-34);
        obj.translateZ(25);
        scene.add( obj );
    }, undefined, function ( error ) {
        console.error( error );
    });
});

// const ambientLight = new THREE.AmbientLight(0x404040, 3)
// ambientLight.position.set(100, 100, 100)
// scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 2)
pointLight.position.set(50, 50, 50)
scene.add(pointLight)

// const pointLight2 = new THREE.PointLight(0xffffff, 2)
// pointLight.position.set(-100, -100, -100)
// scene.add(pointLight2)

// const pointLight3 = new THREE.PointLight(0xffffff, 2)
// pointLight.position.set(-100, -100, -100)
// scene.add(pointLight3)

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
    // obj.rotation.x += speed
    // obj.rotation.y += speed
    // obj.rotation.z += speed
    requestAnimationFrame(update)
    controls.update()
    renderer.render(scene, camera)
}

requestAnimationFrame(update)

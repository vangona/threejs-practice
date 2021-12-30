const textureLoader = new THREE.TextureLoader();
const mtlLoader = new THREE.MTLLoader();
const objLoader = new THREE.OBJLoader();
const path = '../models/';
const objFile = '10194_Onion-L3.obj'
const mtlFile = '10194_Onion-L3.mtl';

const canvas = document.querySelector("#c")
const scene = new THREE.Scene();
scene.background = new THREE.Color('black');

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
camera.position.set(200, 300, 300);


// 원뿔
const cylinderGeometry = new THREE.CylinderGeometry(30, 20, 30, 90);
const cylinderMaterial = new THREE.MeshLambertMaterial({
    map: textureLoader.load('../models/marble.jpg', undefined, undefined, function(err) {
    console.log(err);
}),
});
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.rotateOnAxis
cylinder.rotateX(Math.PI);
cylinder.translateY(-15);
scene.add( cylinder ); 


// 종이
const planeGeometry = new THREE.PlaneGeometry( 50, 80, 50);
const planeMaterial = new THREE.MeshLambertMaterial({
                map: textureLoader.load('../models/onion.png', undefined, undefined, function(err) {
                    console.log(err);
                }),
            });
const paper = new THREE.Mesh(planeGeometry, planeMaterial);
paper.translateY(50);
paper.translateZ(70);
paper.rotateX(50);
scene.add(paper);

// 양파
mtlLoader.setPath(path);
mtlLoader.setMaterialOptions({side: THREE.DoubleSide})
.load(mtlFile, function(mtl) {
    mtl.preload();

    objLoader.setPath(path);
    objLoader.setMaterials(mtl);

    objLoader.load(objFile, function(obj) {
        obj.traverse( child => {
            if (child.material) child.material = new THREE.MeshLambertMaterial({
                map: textureLoader.load('../models/Yellow OnionC.jpg', undefined, undefined, function(err) {
                    console.log(err);
                }),
            });
        });
        
        obj.rotation.x = 10;
        obj.translateY(-40);
        obj.translateZ(28);
        scene.add( obj );

        const update = () => {
            const speed = Math.random() / 200
            obj.rotation.x += speed
            obj.rotation.y += speed
            obj.rotation.z += speed
            requestAnimationFrame(update)
            controls.update()
            renderer.render(scene, camera)
        }
        
        requestAnimationFrame(update)
    }, undefined, function ( error ) {
        console.error( error );
    });
});


//빛

const directLight = new THREE.DirectionalLight(0xffffff, 1);
directLight.castShadow = true;
directLight.position.set(0, 10, 100);
scene.add(directLight);

// const ambientLight = new THREE.AmbientLight('#000000', 10)
// ambientLight.position.set(100, 100, 100)
// scene.add(ambientLight)

const pointLight = new THREE.SpotLight(0xffffff, 1)
pointLight.castShadow = true;
pointLight.position.set(20, 120, -20)
scene.add(pointLight)

// const pointLight2 = new THREE.PointLight(0xffffff, 2)
// pointLight.position.set(-100, -100, -100)
// scene.add(pointLight2)

// const pointLight3 = new THREE.PointLight(0xffffff, 2)
// pointLight.position.set(-100, -100, -100)
// scene.add(pointLight3)

// 컨트롤
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

// const update = () => {
//     const speed = Math.random() / 200
//     requestAnimationFrame(update)
//     controls.update()
//     renderer.render(scene, camera)
// }

// requestAnimationFrame(update)

function onPaperClick(e) {
    e.preventDefault();

    console.log(camera.position);
}
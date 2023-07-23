let scene, camera, renderer, paraglider;
let varioSound;
let isMouseOverCanvas = false;

init();
animate();

// Add mousemove and mouseenter event listeners outside the animate function
window.addEventListener('mousemove', onMouseMove, false);
document.getElementById('canvas').addEventListener('mouseenter', onMouseEnterCanvas, false);
document.getElementById('canvas').addEventListener('mouseleave', onMouseLeaveCanvas, false);

function init() {
    // Create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0067ff);

    // Create the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5); // Adjusted camera position to view the paraglider properly

    // Create the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a paraglider-like object
    const paragliderGeometry = new THREE.PlaneGeometry(2, 2); // Larger plane for a bigger paraglider
    const paragliderMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }); // Invisible material
    paraglider = new THREE.Mesh(paragliderGeometry, paragliderMaterial);
    scene.add(paraglider);

    // Load the glider image
    const gliderTexture = new THREE.TextureLoader().load('glider.svg');
    const gliderMaterial = new THREE.MeshBasicMaterial({ map: gliderTexture, transparent: true });
    const gliderMesh = new THREE.Mesh(paragliderGeometry, gliderMaterial);
    gliderMesh.scale.set(0.5, 0.5, 0.5); // Adjust the scale to make the glider larger
    paraglider.add(gliderMesh);

    // Load the audio file
    varioSound = new Howl({ src: ['vario.mp3'] });

    // Add window resize listener
    window.addEventListener('resize', onWindowResize, false);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate the paraglider object
    paraglider.rotation.x += 0.01;
    paraglider.rotation.y += 0.02;

    if (isMouseOverCanvas && !varioSound.playing()) {
        varioSound.play();
    }

    renderer.render(scene, camera);
}

function onMouseMove(event) {
    // Get the mouse position in normalized device coordinates (-1 to +1)
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Move the paraglider based on mouse position
    paraglider.position.x = mouseX * 2;
    paraglider.position.y = mouseY * 2;

    // Rotate the paraglider object based on mouse position
    paraglider.rotation.x = mouseY / 5;
    paraglider.rotation.y = mouseX / 5;
}

function onMouseEnterCanvas() {
    isMouseOverCanvas = true;
}

function onMouseLeaveCanvas() {
    isMouseOverCanvas = false;
    varioSound.stop();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

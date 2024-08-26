const uploadImageInput = document.getElementById('upload-image');
const openCameraButton = document.getElementById('open-camera');
const captureImageButton = document.getElementById('capture-image');
const detectButton = document.getElementById('detect-button');
const cameraContainer = document.getElementById('camera-container');
const videoElement = document.getElementById('video');
const imageContainer = document.getElementById('image-container');
const imageElement = document.getElementById('image');

uploadImageInput.addEventListener('change', (e) => {
    const file = uploadImageInput.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        imageElement.src = event.target.result;
        imageContainer.style.display = 'block';
    };
    reader.readAsDataURL(file);
});

openCameraButton.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
            videoElement.srcObject = stream;
            videoElement.play();
            cameraContainer.style.display = 'block';
            openCameraButton.style.display = 'none';
            captureImageButton.style.display = 'block';
        })
        .catch((error) => {
            console.error('Error accessing camera:', error);
        });
});

captureImageButton.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL();
    imageElement.src = imageData;
    imageContainer.style.display = 'block';
    cameraContainer.style.display = 'none';
    captureImageButton.style.display = 'none';
    openCameraButton.style.display = 'block';
});

detectButton.addEventListener('click', () => {
    // Add your detection logic here
    console.log('Detect button clicked!');
});
import Timerclock from './cronometro.js';

//Crónometro
let timerInit = new Timerclock('timerGuifo', 'capturar', 'listoCaptura', 'repetirSubir')
let secondsTimer = 0;

const crearGif = document.getElementById('crearGif');
const srcObjetc = document.getElementById('srcObjetc');
const comenzarCaptura = document.querySelector('.comenzarCaptura');
const progressBarContainer = document.getElementById('progressBarContainer');
const repetirSubir = document.getElementById('repetirSubir');
const listoCaptura = document.getElementById('listoCaptura');
const barraTexto = document.getElementById('barraTexto');

let video = document.getElementById('videoObj');
let imgSrc = document.getElementById('imgSrc');

srcObjetc.style.display = "none";
timerInit.timer.style.visibility = 'visible';
listoCaptura.style.display = 'none';
repetirSubir.style.display = 'none';
imgSrc.style.display = 'none';

let recorder = null;
let gifBlob = null;
let gifRecord = null;
let videoBlob = null;


class Button {
    constructor(id, listener) {   
        this.id = document.getElementById(`${id}`);
        this.listener = this.id.addEventListener('click', listener); 
    }

    buttonSelect = (buttonStatus) => {
        try {
            this.id.disabled = buttonStatus;

        } catch (err) {
            console.log(err)
        }
    }

}

let captureCamera = async (accessCamera) => {
    try {
        let camera = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                height: { max: 429 },
                width : { max: 746 }  
            }
        });
        
        accessCamera(camera);
    }
    catch(err) {    
        console.log(err.message)
        if(err) {
            video.style.display = 'none';
            console.log(err)
            return;
        }
    }
}

//métodos para cada estado de la cámara

let testCamera = () => {
    if(crearGif.style.display = 'block'){
        setTimeout(()=>{
            barraTexto.innerText = "Un Chequeo Antes de Empezar"
            video.style.display = 'block';
            crearGif.style.display = 'none';
            srcObjetc.style.display = 'block';
            timerInit.timer.style.visibility = 'hidden';
            repetirSubir.style.display = 'none';
            comenzarCaptura.style.display = 'flex';
            progressBarContainer.style.visibility = 'hidden';
            listoCaptura.style.display = 'none';
            timerInit.stoping();
            timerInit.reseting();

            let bars = document.getElementsByClassName('bar');
            if(bars[0].classList.contains('barColor')){
                for(let bar of bars){
                    bar.classList.remove('barColor')
                }
            }  
            
        },100)
    }
    captureCamera( camera => {       
        video.srcObject = camera;
        video.autoplay = true;
    });
}

let startRecord  = () => {
    captureCamera( camera => { 
            video.srcObject = camera;
            imgSrc.srcObject = camera;
            video.autoplay = true;

            recorder = RecordRTC(camera, {
                type: 'video',
                quality: 10,
            });

            gifRecord = RecordRTC(camera, {
                type: 'gif',
                quality: 10,
                frameRate: 1
            })

            gifRecord.startRecording();
            recorder.startRecording();
            // release camera on stopRecording
            recorder.camera = camera; 

            repetirSubir.style.display = 'none';
            listoCaptura.style.display = 'flex';
            listoCaptura.classList.add('listoCaptura');
            comenzarCaptura.style.display = 'none';

            timerInit.timer.style.visibility = 'visible';

            barraTexto.innerText = "Capturando Tu Guifo"
    });

};



let stopRecordingCallback =  () => {
    
    video.src = video.srcObject = null;
    video.src = URL.createObjectURL(recorder.getBlob());

    imgSrc.src = URL.createObjectURL(gifRecord.getBlob());

    videoBlob =  recorder.getBlob();
    gifBlob =  gifRecord.getBlob();

    recorder.camera.stop();

    video.autoplay = false;
    progressBarContainer.style.visibility = 'visible';
    listoCaptura.style.display = 'none';
    repetirSubir.style.display = 'flex';

    barraTexto.innerText = "Vista Previa";

}


let stopRecord = () => { 
    timerInit.stoping();
    gifRecord.stopRecording();
    recorder.stopRecording(stopRecordingCallback);
};


let playRecord = () => {
    try{
        video.autoplay = true;
        video.loop = true;
        video.play();

        setTimeout(move, 100)
        

    } catch (err) {
        console.log(err.message);
    }
}


let deleteRecord = async () => {
    try {

        await recorder.reset();
        await recorder.destroy();
        gifRecord.reset();
        gifRecord.destroy();

        gifRecord = null;
        recorder = null;
        video.src = "";
        imgSrc.src = "";

        if(crearGif.style.display = 'none'){
            setTimeout(()=>{
                video.style.display = 'block';
                crearGif.style.display = 'none';
                srcObjetc.style.display = 'block';
                timerInit.timer.style.visibility = 'hidden';
                repetirSubir.style.display = 'none';
                comenzarCaptura.style.display = 'flex';
                progressBarContainer.style.visibility = 'hidden';
            },500)
        }
        testCamera();

    } catch (err) {
        console.log(err.message)
    }
    
}

for(let i = 0; i < 17; i++){
    let progressBar = document.getElementById('progressBar');
    let bar = document.createElement('div');
    bar.classList.add('bar');
    progressBar.appendChild(bar);
    
}


let move = () => {  
    secondsTimer = parseInt(timerInit.s * 10);
    let interval = setInterval(frame, secondsTimer); 
    let progress = 1;

    let bars = document.getElementsByClassName('bar');
    if(bars[0].classList.contains('barColor')){
        for(let bar of bars){
            bar.classList.remove('barColor')
        }
    }

    if(bars[16].classList.contains('barColor')){
        video.pause();
    }

    function frame() {
        
        if (progress >= 100) {
            clearInterval(interval);
            progress = 1
            video.loop = false;
            video.autoplay = false;
            
        } else {            
            progress++;        
            let count = Math.floor(progress / (100 / bars.length));
			count > bars.length - 1 ? (count = bars.length - 1) : null;
            bars[count].classList.add("barColor");
            
            
        }
    }
}

let close = () => {

    try {
        clearTracks();

        srcObjetc.style.display = "none";
        crearGif.style.display = "block";

        timerInit.stoping();
        timerInit.reseting();

        gifRecord = null;
        imgSrc.srcObject = ''
        imgSrc.src = "";

        recorder = null;
        video.src = "";


    } catch (err) {
        console.log(err.message)
    }
}



let upload = () => {
    const APIKEY = "1gchfU6E5SK40hPSSKXsFAKZZYljRhxa";
    const formulario = new FormData();
    formulario.append("file",gifBlob,"myGif.gif");

    fetch(`https://upload.giphy.com/v1/gifs?api_key=${APIKEY}`, {       
        method: "POST",
        body: formulario,
    })
    .then(response => {
        if (response.status === 200) {
            console.log('Gif subido!');
            return response.json();
        } else {
            console.log('error en la subida')
        }
    })

    .then(data => {
        fetch(
            `https://api.giphy.com/v1/gifs/${data.data.id}?&api_key=xBWsI1LWcGLChS6L9d5ucODsG0BfkNEx`
        )
            .then(response => {
                return response.json();
            })
            .then( res => {
                console.log('segundo fetch')
                console.log(res.data.id);
            })
            .catch(err => {
                console.log(err)
            })
    })

    .catch(err => {
        console.log(err)
    })
}

let clearTracks = () => {
    if(video.srcObject){
        let tracks = video.srcObject.getTracks();
        tracks.forEach(track => {track.stop()})

    } else if(recorder.camera) {
        let tracks = recorder.camera.getTracks();
        tracks.forEach(track => {track.stop()})
    }
}


let buttonStart = new Button('comenzarButton', testCamera);
let buttonCapturar = new Button('capturar', startRecord);
let buttonStop = new Button('listo', stopRecord);
let buttonDelete = new Button('repetirSubir', deleteRecord);
let forwardButton = new Button('forward', playRecord);
let closeButton = new Button('cruzChequeo', close);
let uploadedButton = new Button('subir', upload)

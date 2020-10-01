
import Timerclock from './cronometro.js';

//Crónometro
let timerInit = new Timerclock('timerGuifo', 'capturar', 'listoCaptura', 'repetirSubir')
let secondsTimer = 0;
let minutTimer = 0;


const crearGif = document.getElementById('crearGif');
const srcObjetc = document.getElementById('srcObjetc');
const comenzarCaptura = document.querySelector('.comenzarCaptura');
const progressBarContainer = document.getElementById('progressBarContainer');
const repetirSubir = document.getElementById('repetirSubir');
const listoCaptura = document.getElementById('listoCaptura');



srcObjetc.style.display = "none";
timerInit.timer.style.visibility = 'visible';
listoCaptura.style.display = 'none';
repetirSubir.style.display = 'none';

let recorder; // globally accessible
let video = document.getElementById('videoObj');

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

    buttonInnerText = text => {
        this.id.innerText = text;
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
            video.style.display = 'block';
            crearGif.style.display = 'none';
            srcObjetc.style.display = 'block';
            timerInit.timer.style.visibility = 'hidden';
            repetirSubir.style.display = 'none';
            comenzarCaptura.style.display = 'flex';
            progressBarContainer.style.visibility = 'hidden';
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
        recorder = RecordRTC(camera, {
            type: 'video'
        });
    });
}

let startRecord  =  () => {
    captureCamera( camera => { 
            video.srcObject = camera;
            video.autoplay = true;

            recorder = RecordRTC(camera, {
                type: 'video'
            });
            recorder.startRecording();
            // release camera on stopRecording
            recorder.camera = camera; 
            repetirSubir.style.display = 'none';
            listoCaptura.style.display = 'flex';
            listoCaptura.classList.add('listoCaptura');
            comenzarCaptura.style.display = 'none';

            timerInit.timer.style.visibility = 'visible';
            //timerInit.starting();
    });
    
    
};

let stopRecordingCallback = () => {
    
    video.src = video.srcObject = null;
    video.src = URL.createObjectURL(recorder.getBlob());
    recorder.camera.stop();
    video.autoplay = false;
    progressBarContainer.style.visibility = 'visible';
    listoCaptura.style.display = 'none';
    repetirSubir.style.display = 'flex';
}


let stopRecord = () => { 
    timerInit.stoping();
    recorder.stopRecording(stopRecordingCallback);
};


let playRecord = () => {
    try{
        video.play();
        video.loop = true;
        move();

    } catch (err) {
        console.log(err.message);
    }
}


let deleteRecord = () => {
    try {
        recorder.reset();
        recorder.destroy();
        recorder = null;
        video.src = "";

        if(crearGif.style.display = 'block'){
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

function move() {
    secondsTimer = parseInt(timerInit.s + 30);
    minutTimer = parseInt(timerInit.m + 30);
    
    let progress = 1;
    let interval = setInterval(frame, secondsTimer || frame, minutTimer);
    console.log(interval);
    
    let bars = document.getElementsByClassName('bar');
    if(bars[0].classList.contains('barColor')){
        for(let bar of bars){
            bar.classList.remove('barColor')
        }
    }   

    function frame() {
        if (progress >= 100) {
            clearInterval(interval);
            progress = 0
            video.loop = false;
            video.autoplay = false;
            
        } else {
            progress++;          
            let counter = Math.floor(progress / (100 / bars.length));
			counter > bars.length - 1 ? (counter = bars.length - 1) : null;
			bars[counter].classList.add("barColor");
        }
    }
}



let buttonStart = new Button('comenzarButton', testCamera);
let buttonCapturar = new Button('capturar', startRecord);
let buttonStop = new Button('listo', stopRecord);
let buttonDelete = new Button('repetirSubir', deleteRecord);
let forwardButton = new Button('forward', playRecord);

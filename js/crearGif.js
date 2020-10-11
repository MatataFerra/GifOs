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
const containerSubiendoGif = document.getElementById('containerSubiendoGif');
const videoObjContainer = document.getElementById('videoObjContainer');
const cancelarSubida = document.getElementById('cancelarSubida');
const textSubiendoGuifo = document.getElementById('textSubiendoGuifo');

//Para cancelar subida de gif
const controller = new AbortController()
const signal = controller.signal;

let video = document.getElementById('videoObj');
let imgSrc = document.getElementById('imgSrc');

srcObjetc.style.display = "none";
timerInit.timer.style.visibility = 'visible';
listoCaptura.style.display = 'none';
repetirSubir.style.display = 'none';
imgSrc.style.display = 'none';
cancelarSubida.style.display = 'none';

let recorder = null;
let gifBlob = null;
let gifRecord = null;
let videoBlob = null;


class Button {
    constructor(id, listener) {   
        this.id = document.getElementById(`${id}`);
        this.listener = this.id.addEventListener('click', listener); 
    }

    removeListener = (listener) => {
        this.id.removeEventListener('click', listener)
    }

    addListener = (listener) => {
        this.id.addEventListener('click', listener)
    }

}

class Progress {
    constructor(id){
        this.id = document.getElementById(id)
        this.limit = 0;
    }

    static loopProgressBar = (id, limit) => {
        
            for(let i = 0; i < limit; i++){
                let progressBar = document.getElementById(id);
                let bar = document.createElement('div');
                bar.classList.add('bar');
                progressBar.appendChild(bar);
            }

    }

    static reduceProgressBar = (id, limit) => {
        let progressBar = document.getElementById(id);
        let bars = document.getElementsByClassName('bar')
            if(bars.length > limit && bars.parentNode == progressBar){
                debugger;
                for(let i = 0; i < bars.length; i++) {
                    debugger;
                    progressBar.removeChild(bars[i])
                }
            }

            if(bars[0].classList.contains('barColor')){
                for(let bar of bars){
                    bar.classList.remove('barColor')
                }
            }
    }

    static clearColorProgress = () => {
        let bars = document.getElementsByClassName('bar')
        if(bars[0].classList.contains('barColor')){
            for(let bar of bars){
                bar.classList.remove('barColor')
            }
        }
    }

    static eliminateAll = (id) => {
        let progressBar = document.getElementById(id);

        while(progressBar.hasChildNodes()){
            progressBar.lastChild.remove();
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
            containerSubiendoGif.style.display = 'none';
            cancelarSubida.style.display = 'none'
            videoObjContainer.style.display = 'block';
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
            cancelarSubida.style.display = 'none';

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
    comenzarCaptura.style.display = 'none';
    barraTexto.innerText = "Vista Previa";

}


let stopRecord = () => {
    Progress.loopProgressBar('progressBar', 17)
    Progress.reduceProgressBar('progressBar', 17)
    timerInit.stoping();
    gifRecord.stopRecording();
    recorder.stopRecording(stopRecordingCallback);
};


let playRecord = () => {
    try{
        video.autoplay = true;
        video.loop = true;
        video.play();

        setTimeout(move(forwardButton, playRecord, 16), 100)
        

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
        srcObjetc.style.display = 'block';
        timerInit.timer.style.visibility = 'hidden';
        repetirSubir.style.display = 'none';
        progressBarContainer.style.visibility = 'hidden';

        if(crearGif.style.display = 'none'){
            setTimeout(()=>{
                video.style.display = 'block';
                crearGif.style.display = 'none';

            },500)
        }
        testCamera();

    } catch (err) {
        console.log(err.message)
    }
    
}


let move = (buttonClass, listener, numberOfElements) => {
    buttonClass.removeListener(listener)
    secondsTimer = parseInt(timerInit.s * 20);
    
    let interval = setInterval(frame, secondsTimer); 
    let progress = 1;
    let bars = document.getElementsByClassName('bar');

    Progress.reduceProgressBar('progressBar', 17)

    if(bars[numberOfElements].classList.contains('barColor')){
        video.pause();      
    }

    function frame() {     
        if (progress >= 100) {
            clearInterval(interval);
            progress = 0
            video.loop = false;
            video.autoplay = false;
            buttonClass.addListener(listener)
            
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
    
    textSubiendoGuifo.innerText = 'Estamos subiendo tu guifo…';
    textSubiendoGuifo.classList.remove('textSubiendoGuifo');
    barraTexto.innerText = 'Subiendo Guifo...'
    containerSubiendoGif.style.display = 'flex';
    videoObjContainer.style.display = 'none';
    comenzarCaptura.style.display = 'none';
    cancelarSubida.style.display = 'block';
    timerInit.timer.style.visibility = 'hidden';
    repetirSubir.style.display = 'none';
    progressBarContainer.style.visibility = 'hidden';

    abortingButton.removeListener(close);
    abortingButton.addListener(aborting);

    Progress.eliminateAll('progressBar');
    Progress.loopProgressBar('uploadProgressBar', 23);
    progressUpload(23);

    const formulario = new FormData();
    formulario.append("file",gifBlob,"myGif.gif");


    //ABAJO Código que funciona, para subir los gif, para test se comentó

    fetch(`https://upload.giphy.com/v1/gifs?api_key=${APIKEY}`, {       
        method: "POST",
        body: formulario,
        signal: signal
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
                
                console.log('console del res')
                console.log(res)
                console.log('console del data')
                console.log(res.data);
                console.log('console del id')
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
let interval = null;

let progressUpload = (numberOfElements) => {

    secondsTimer = parseInt(timerInit.s*20);

    let progress = 1;
    let bars = document.getElementsByClassName('bar');
    Progress.reduceProgressBar('uploadProgressBar', numberOfElements)
    
    interval = setInterval(frame, secondsTimer); 
    function frame() {  
 
        if (progress >= 300) {
            //interval = setInterval(frame, secondsTimer);
            //clearInterval(interval);
            Progress.clearColorProgress();
            progress = 1
        } else if (progress > 66 && progress < 99) {
            progress++;        
            let count = Math.floor(progress / (150 / bars.length));
			count > bars.length - 1 ? (count = bars.length - 1) : null;
            bars[count].classList.add("barColor");
        } else if (progress < 65) {
            progress++;        
            let count = Math.floor(progress / (130 / bars.length));
			count > bars.length - 1 ? (count = bars.length - 1) : null;
            bars[count].classList.add("barColor");
        } else {            
            progress++;        
            let count = Math.floor(progress / (300 / bars.length));
			count > bars.length - 1 ? (count = bars.length - 1) : null;
            bars[count].classList.add("barColor");
            
            
        }
    }
}

let aborting = ()=>{ 
    textSubiendoGuifo.innerText = 'Operación cancelada';
    textSubiendoGuifo.classList.add('textSubiendoGuifo');
    controller.abort();
    clearInterval(interval);
    console.warn('Subida cancelada por el usuario...');
    abortingButton.removeListener(aborting);
    abortingButton.addListener(close);
}

//Creación de botones
let buttonStart = new Button('comenzarButton', testCamera);
let buttonCapturar = new Button('capturar', startRecord);
let buttonStop = new Button('listo', stopRecord);
let buttonDelete = new Button('repetir', deleteRecord);
let forwardButton = new Button('forward', playRecord);
let closeButton = new Button('cruzChequeo', close);
let uploadedButton = new Button('subir', upload);
let abortingButton = new Button('cancelarSubida', aborting);

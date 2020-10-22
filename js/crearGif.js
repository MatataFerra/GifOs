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
const finishUpload = document.getElementById('finishUpload');

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
finishUpload.style.display = 'none';

let recorder = null;
let gifBlob = null;
let gifRecord = null;
let videoBlob = null;
let interval = null;
let intervalUpload = null;
let idFetch = '';
let link = '';
let gifArray = [];



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
        this.id = document.getElementById(id);
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
                for(let i = 0; i < bars.length; i++) {
                    progressBar.removeChild(bars[i])
                }
            }
            if(document.body.classList.contains('darkThemeBody')){

                if(bars[0].classList.contains('barColorDark')){
                    for(let bar of bars){
                        bar.classList.remove('barColorDark')
                    }
                }

            } else {

                if(bars[0].classList.contains('barColor')){
                    for(let bar of bars){
                        bar.classList.remove('barColor')
                    }
                }
            }
    }

    static clearColorProgress = () => {

        if(document.body.classList.contains('darkThemeBody')) {

            let bars = document.getElementsByClassName('bar')
            if(bars[0].classList.contains('barColorDark')){
                for(let bar of bars){
                    bar.classList.remove('barColorDark')
                }
            }

        } else {

            let bars = document.getElementsByClassName('bar')
            if(bars[0].classList.contains('barColor')){
                for(let bar of bars){
                    bar.classList.remove('barColor')
                }
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

            closeButtonTwo.addListener(close)
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
    Progress.loopProgressBar('progressBar', 17);
    Progress.reduceProgressBar('progressBar', 17);
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

        Progress.eliminateAll('uploadProgressBar');
        Progress.eliminateAll('progressBar');

        secondsTimer = 0;

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
// Fin de acciones de la cámara

//Barra de carga cuando se presiona play
let move = (buttonClass, listener, numberOfElements) => {
    buttonClass.removeListener(listener)
    secondsTimer = parseInt(timerInit.s * 20);
    
    let interval = setInterval(frame, secondsTimer); 
    let progress = 1;
    let bars = document.getElementsByClassName('bar');

    Progress.reduceProgressBar('progressBar', 17)
    if(document.body.classList.contains('darkThemeBody')){
        if(bars[numberOfElements].classList.contains('barColorDark')){
            video.pause();      
        }
    } else {

        if(bars[numberOfElements].classList.contains('barColor')){
            video.pause();      
        }
    }

    function frame() {     
        if (progress >= 100) {
            clearInterval(interval);
            progress = 0
            video.loop = false;
            video.autoplay = false;
            buttonClass.addListener(listener)
            
        } else if(document.body.classList.contains('darkThemeBody')){         
            progress++;        
            let count = Math.floor(progress / (100 / bars.length));
			count > bars.length - 1 ? (count = bars.length - 1) : null;
            bars[count].classList.add("barColorDark");

        } else {
            progress++;        
            let count = Math.floor(progress / (100 / bars.length));
			count > bars.length - 1 ? (count = bars.length - 1) : null;
            bars[count].classList.add("barColor");
        }
    }
}

//Función a la hora de cerrar la ventana
let close = () => {
    try {
        clearTracks();

        Progress.eliminateAll('uploadProgressBar');
        Progress.eliminateAll('progressBar');

        srcObjetc.style.display = "none";
        crearGif.style.display = "block";

        timerInit.stoping();
        timerInit.reseting();

        secondsTimer = 0;

        gifRecord = null;
        imgSrc.srcObject = ''
        imgSrc.src = "";

        recorder = null;
        video.src = "";

    } catch (err) {
        console.log(err.message)
    }
}

//Subir el gif a la API
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

    closeButtonTwo.removeListener(close)

    Progress.eliminateAll('progressBar');
    Progress.loopProgressBar('uploadProgressBar', 23);
    Progress.reduceProgressBar('uploadProgressBar', 23);
    progressUpload(23);

    const formulario = new FormData();
    formulario.append("file",gifBlob,"myGif.gif");


    fetch(`https://upload.giphy.com/v1/gifs?api_key=${APIKEY}`, {       
        method: "POST",
        body: formulario,
        signal: signal
    })
    .then(response => {
        if (response.status === 200) {
            alertMsgPopUp('Gif Subido');
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
                finishUpload.style.display = 'block';
                srcObjetc.style.display = 'none';
                clearInterval(intervalUpload);

                idFetch = res.data.id;
                const gifUploaded = document.getElementById('gifUploaded');
                link = res.data.images.original.url;
                gifUploaded.src = link;

                saveLocalStorage();

            })
            .catch(err => {
                console.log(err)
            })
    })

    .catch(err => {
        console.log(err)
    })
}

//Limpiar de tracks y apagar la cámara
let clearTracks = () => {
    if(video.srcObject){
        let tracks = video.srcObject.getTracks();
        tracks.forEach(track => {track.stop()})

    } else if(recorder.camera) {
        let tracks = recorder.camera.getTracks();
        tracks.forEach(track => {track.stop()})
    }
}

//Barra de carga de subida
let progressUpload = (numberOfElements) => {

    secondsTimer = parseInt(timerInit.s*20);

    let progress = 1;
    let bars = document.getElementsByClassName('bar');
    Progress.reduceProgressBar('uploadProgressBar', numberOfElements)
    
    intervalUpload = setInterval(frame, secondsTimer); 
    function frame() {  
 
        if (progress >= 300) {

            Progress.clearColorProgress();
            progress = 1
        } else if(document.body.classList.contains('darkThemeBody')) {
            if (progress > 66 && progress < 99) {
                progress++;        
                let count = Math.floor(progress / (150 / bars.length));
                count > bars.length - 1 ? (count = bars.length - 1) : null;
                bars[count].classList.add("barColorDark");
            } else if (progress < 65) {
                progress++;        
                let count = Math.floor(progress / (130 / bars.length));
                count > bars.length - 1 ? (count = bars.length - 1) : null;
                bars[count].classList.add("barColorDark");
            } else {            
                progress++;        
                let count = Math.floor(progress / (300 / bars.length));
                count > bars.length - 1 ? (count = bars.length - 1) : null;
                bars[count].classList.add("barColorDark");
                
                
            }
        } else {
            if (progress > 66 && progress < 99) {
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
}

//Abortar fetch de la API

let aborting = ()=>{ 
    textSubiendoGuifo.innerText = 'Operación cancelada';
    textSubiendoGuifo.classList.add('textSubiendoGuifo');
    controller.abort();
    clearInterval(intervalUpload);
    alertMsgPopUp('Cancelaste la subida');
    console.warn('Subida cancelada por el usuario...');
    abortingButton.removeListener(aborting);
    abortingButton.addListener(close);
}

//Pantalla de gif subido
let doneFinish = () => {
    finishUpload.style.display = 'none';
    srcObjetc.style.display = 'none';
    crearGif.style.display = 'block';

    Progress.eliminateAll('uploadProgressBar');

    //saveLocalStorage()

    let linkStorage = link;

    const containerGifCreated = document.getElementById('containerGifCreated');
    let imgUp = document.createElement('img');
    imgUp.classList.add('imgUp')
    imgUp.src = linkStorage;
    containerGifCreated.appendChild(imgUp)
    
    const conteinerIfNoneGif = document.getElementById('conteinerIfNoneGif')
    conteinerIfNoneGif.style.display = 'none'

    

}

//Salvar en el local

let saveLocalStorage = () =>{
    let linkStorage = link;
    gifArray.push(linkStorage)
    let gifArrayString = JSON.stringify(gifArray);
    localStorage.setItem('gifCreate', gifArrayString)
}

//Carga del Local Storage
function loadStorage ()  {
    if(localStorage.gifCreate){
        let loadLinkArray = JSON.parse(localStorage.getItem('gifCreate'));
        gifArray = loadLinkArray;
        const containerGifCreated = document.getElementById('containerGifCreated');
        gifArray.forEach( gif => {
            let imgUp = document.createElement('img');
            imgUp.classList.add('imgUp');
            imgUp.src = gif;
            containerGifCreated.appendChild(imgUp)
        })
    }
}

//Comprobar si hay elementos en el LS
if(localStorage.gifCreate) {
    loadStorage();
} else {
    if(gifArray.length == 0){
        const conteinerIfNoneGif = document.getElementById('conteinerIfNoneGif');
        conteinerIfNoneGif.style.display = 'block';
    }
}

//Función para bajarse el Gif creado
let downloadCreatedGif = async () => {
    const fetchedGif = fetch(`https://media.giphy.com/media/${idFetch}/giphy.gif`);
    const blobGif = (await fetchedGif).blob();
    const urlGif = URL.createObjectURL(await blobGif);
    alertMsgPopUp('Descargando gif a tu compu');
    console.log('Descargando gif a su computadora...')
    const gifDownload = document.createElement("a");
    gifDownload.href = urlGif;
    gifDownload.download = "your-Gif.gif";
    gifDownload.style = 'display: "none"';
    document.body.appendChild(gifDownload);
    gifDownload.click();
    document.body.removeChild(gifDownload);
}

//Función para copiarse el gif
let copyLinkOfGif = () => {
    let linkToCopy = document.createElement("input");

    linkToCopy.value = `https://giphy.com/gifs/${idFetch}`;
    document.body.appendChild(linkToCopy);
    linkToCopy.select();
    document.execCommand("copy");
    console.log('link copiado!');
    alertMsgPopUp('Link Copiado!');
    document.body.removeChild(linkToCopy);
}


//Mensaje de alerta al hacer una acción
let alertMsgPopUp = (mensajeUsuario) => {
    //debugger;
    let alertMsg = document.createElement('section');
    alertMsg.classList.add('alertMsg');
    alertMsg.innerHTML = `
        <div class="barraAlertMsg">
        <p>Mesaje para el Usuario</p>
        <img src="./assets/button3.svg" alt="cruz" id="cruzAlert" class="cruzChequeo">
        </div>
        <div class="containerAlertMsg">
        <img src="./assets/attention.png" alt="" class="attentionImg">
        <p class="randomText" id="">${mensajeUsuario}</p>
        </div>`
    
    
    document.body.appendChild(alertMsg);

    let blurrElements = [];
    let navBar = document.querySelector('.navBar');
    let misGuifos = document.querySelector('.misGuifos');

    
    blurrElements.push(navBar, misGuifos, crearGif, srcObjetc, finishUpload)
    
    for(let elem of blurrElements){
        elem.classList.add('blurryBackground');
    }
    setTimeout(()=>{
        let cruzAlert = document.getElementById('cruzAlert')
        cruzAlert.addEventListener('click', closeAlertMsgPopUp)   
    }, 100)
    closeButton.removeListener(close);
}

let closeAlertMsgPopUp = () =>{
    
    let alertMsg = document.querySelector('.alertMsg');
    alertMsg.classList.remove('alertMsg');

    let blurrElements = [];
    let navBar = document.querySelector('.navBar');
    let misGuifos = document.querySelector('.misGuifos');
    
    blurrElements.push(navBar, misGuifos, crearGif, srcObjetc, finishUpload)
    
    for(let elem of blurrElements){
        elem.classList.remove('blurryBackground');
    }

//    setTimeout(()=>{
    let cruzAlert = document.getElementById('cruzAlert')
    cruzAlert.removeEventListener('click', closeAlertMsgPopUp)   
//    }, 100)
    
    closeButton.addListener(close);

    alertMsg.innerHTML = ``
}



//Creación de botones
let buttonStart = new Button('comenzarButton', testCamera);
let buttonCapturar = new Button('capturar', startRecord);
let buttonStop = new Button('listo', stopRecord);
let buttonDelete = new Button('repetir', deleteRecord);
let forwardButton = new Button('forward', playRecord);
let closeButton = new Button('cruzChequeo', close);
let closeButtonTwo = new Button('cruzChequeoDos', close);
let uploadedButton = new Button('subir', upload);
let abortingButton = new Button('cancelarSubida', aborting);
let downloadButton = new Button('descargarEnlace', downloadCreatedGif);
let copyLinkButton = new Button('copiarEnlace', copyLinkOfGif);
let finishUpButton = new Button('listoUpload', doneFinish);
let ifNoneGifButton = new Button('ifNoneGif', testCamera);



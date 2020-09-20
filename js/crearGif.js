let comenzarButton = document.getElementById('comenzarButton');
let crearGif = document.getElementById('crearGif')

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
                height: { max: 480 },
                width : { max: 854 }     
            }
        });        
        accessCamera(camera);
    }
    catch(err) {    
        console.log(err.message)
        if(err) {
            video.style.display = 'none';
            buttonDelete.buttonSelect(false);
            console.log(err)
            return;
        }
    }
}

let stopRecordingCallback = () => {
    video.src = video.srcObject = null;
    video.src = URL.createObjectURL(recorder.getBlob());
    recorder.camera.stop();
}


let startRecord  = () => {
    captureCamera( camera => {
            video.style.display = 'block';
            video.srcObject = camera;
            recorder = RecordRTC(camera, {
                type: 'video'
            });
            recorder.startRecording();
            // release camera on stopRecording
            recorder.camera = camera; 
            
            buttonStop.buttonSelect(false);
            buttonPause.buttonSelect(false);
            buttonDelete.buttonSelect(true);
            buttonResume.buttonSelect(true);
            buttonStart.buttonInnerText('Start')
    });
    
    
};


let stopRecord = () => {
    recorder.stopRecording(stopRecordingCallback);

    buttonStart.buttonSelect(false)
    buttonStop.buttonSelect(true);
    buttonPause.buttonSelect(true);
    buttonResume.buttonSelect(true);
    buttonDelete.buttonSelect(false);

    buttonStart.buttonInnerText('Reiniciar')
};

let pauseRecord = () => {
    try {
        recorder.pauseRecording();
        buttonResume.buttonSelect(false);
        buttonPause.buttonSelect(true);

    } catch (err) {
        console.log(err.message);
    }
}

let resumeRecord = () => {
    try {
        recorder.resumeRecording();
        buttonPause.buttonSelect(false);
        buttonResume.buttonSelect(true);

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
        video.style.display = 'none';
        buttonDelete.buttonSelect(true);
        buttonStop.buttonSelect(true)
        buttonStart.buttonInnerText('Start')

    } catch (err) {
        console.log(err.message)
    }
    
}

let buttonStart = new Button('start', startRecord)
let buttonStop = new Button('stop', stopRecord)
let buttonResume = new Button('resume', resumeRecord)
let buttonDelete = new Button('delete', deleteRecord)
let buttonPause = new Button('pause', pauseRecord)

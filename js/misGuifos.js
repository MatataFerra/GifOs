
let gifsLoad = []

let loadStorage = () => {

    if(localStorage.gifCreate){
        const containerGifCreated = document.getElementById('containerGifCreated');
        let loadLinkArray = JSON.parse(localStorage.getItem('gifCreate'));
        gifsLoad = loadLinkArray

        gifsLoad.forEach( gif => {
            let imgUp = document.createElement('img');
            imgUp.classList.add('imgUp');
            imgUp.src = gif;
            containerGifCreated.appendChild(imgUp)
        })
        
    }
}

if(localStorage.gifCreate) {
    loadStorage();
} else {
    if(gifsLoad.length == 0){
        const conteinerIfNoneGif = document.getElementById('conteinerIfNoneGif');
        conteinerIfNoneGif.style.display = 'block';
    }
}

let loadStorage = () => {
    if(localStorage.gifCreate){
        let loadLinkArray = JSON.parse(localStorage.getItem('gifCreate'));
        console.log(loadLinkArray)
            const containerGifCreated = document.getElementById('containerGifCreated');
            loadLinkArray.forEach( gif => {
                let imgUp = document.createElement('img');
                imgUp.classList.add('imgUp');
                imgUp.src = gif;
                containerGifCreated.appendChild(imgUp)
            })
        
    }
}

if(localStorage.gifCreate) {
    loadStorage();
}
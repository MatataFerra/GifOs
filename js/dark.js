
let arrayBackgroundYLetrasDark = [];
let arrayButtonDark = [];
let arrayBoxDark = [];
let arrayThemeSelect = [];
let arrayWhiteWords = [];
let saveTheme;
let themeClick = 'dayTheme';
//Logo y Body
const darkThemeBody = document.getElementById("darkThemeBody");
const crearGifBody = document.getElementById('crearGifBody');
let logo = document.querySelector(".logoPNG");

//Barras
let tittleBgBar = document.getElementById("tittleBar");
let bgSearchBar = document.getElementById("styleBar");
let gifResultsFrames = document.getElementsByClassName("gifResultsFrame");
let trendFootImgs = document.getElementsByClassName("trendFootImg");

//Botones
const createGif = document.getElementById("createGif");
const chooseTheme = document.getElementById("chooseTheme");
const borderLine = document.querySelector(".border");
const myGifDarker = document.querySelector(".myGifDarker");
const blueButtonSearch = document.getElementsByClassName('blueButtonDone');
const blueButtonApi = document.getElementsByClassName('blueButton');


//ID para Cambiar de Temas
const darkTheme = document.getElementById("darkTheme");
const dayTheme = document.getElementById("dayTheme");
const themeContainer = document.getElementById("themeContainer");
//Variable para cambiar de tema están dentro de Dark y Day Theme del HTML
let theme = document.querySelectorAll(".theme");



if(document.body.id === "darkThemeBody") {
  //Push
  arrayThemeSelect.push(dayTheme, darkTheme);
  arrayBackgroundYLetrasDark.push(tittleBgBar, bgSearchBar);
  arrayButtonDark.push(createGif, chooseTheme);
  arrayWhiteWords.push(myGifDarker, borderLine);
  arrayBoxDark.push(searchBox, buttonSearch, displayBoxSearch, themeContainer);

  //Comprobando si ya está guardado el theme
  if(localStorage.themeSave) {
    
    let loadDataTheme = localStorage.getItem('themeSave');
    themeClick = document.getElementById(`${loadDataTheme}`);
    themeSwith();

  }
  
  //Si no está guardado de acuerdo al botón que se aprete ejecuta la función
  for (let changetheme of theme) {
    changetheme.addEventListener("click", darkThemeON);
  }

  function darkThemeON(e) {
    e.preventDefault();
    themeClick = e.target;
    //Local Storage
    if(themeClick === dayTheme) {
      saveTheme = themeClick.id;
      localStorage.setItem('themeSave', saveTheme);
    } else if (themeClick === darkTheme) {
      saveTheme = themeClick.id;
      localStorage.setItem('themeSave', saveTheme);
    }
    //FIN Local Storage

    themeSwith();
  }

  if(themeClick) {
    saveTheme = themeClick.id;
  }
}

if(document.body.id === "crearGifBody") {
  if(localStorage.themeSave) {
    let loadDataTheme = localStorage.getItem('themeSave');
    themeClick = JSON.stringify(loadDataTheme);
    themeSwithCreateGif();
  }
  
} 

if(document.body.id === "misGifos") {
  if(localStorage.themeSave) {
    let loadDataTheme = localStorage.getItem('themeSave');
    themeClick = JSON.stringify(loadDataTheme);
    themeSwithMisGifos();
  }
  
} 

function themeSwith() {

  if (themeClick === darkTheme) {
    darkThemeBody.classList.add("darkThemeBody");

    setTimeout(()=>{
      for (let elem of gifResultsFrames) {
        elem.classList.add("backgroundYLetrasDark");
      }
      
      for (let elem of trendFootImgs) {
        elem.classList.add("backgroundYLetrasDark");
      }

      for (let elem of blueButtonApi) {
        elem.classList.add('blueButtonDark');
      }
    },1000)


    for (let elem of arrayBackgroundYLetrasDark ) {
      elem.classList.add("backgroundYLetrasDark");
    }

    for (let elem of arrayButtonDark) {
      elem.classList.add("buttonDark");
    }

    for (let elem of arrayBoxDark) {
      elem.classList.add("boxDark");
    }

    for(let elem of arrayThemeSelect) {
      elem.classList.add('themeSelect');
    }

    for (let elem of blueButtonSearch) {
      elem.classList.add('blueButtonDark');
    }

    searchWord.classList.add('searchWordDark');
    myGifDarker.classList.add('textDark');
    myGif.classList.add('myGifHoverDark');
    borderLine.classList.add('borderDark');
    
    logo.src = "./assets/gifOF_logo_dark.png";
    lupaImg.src = './assets/Combined_Shape.svg';
    
  }

  //-----DAY THEME-----//

  if (themeClick === dayTheme) {

    darkThemeBody.classList.remove("darkThemeBody");

    for (let elem of gifResultsFrames) {
      elem.classList.remove("backgroundYLetrasDark");
    }

    for (let elem of trendFootImgs) {
      elem.classList.remove("backgroundYLetrasDark");
    }

    for (let elem of arrayBackgroundYLetrasDark ) {
      elem.classList.remove("backgroundYLetrasDark");
    }

    for (let elem of arrayButtonDark) {
      elem.classList.remove("buttonDark");
    }

    for (let elem of arrayBoxDark) {
      elem.classList.remove("boxDark");
    }

    for(let elem of arrayThemeSelect) {
      elem.classList.remove('themeSelect');
    }

    for (let elem of blueButtonSearch) {
      elem.classList.remove('blueButtonDark');
    }

    for (let elem of blueButtonApi) {
      elem.classList.remove('blueButtonDark');
    }

    searchWord.classList.remove('searchWordDark');
    myGifDarker.classList.remove('textDark');
    myGif.classList.remove('myGifHoverDark');
    borderLine.classList.remove('borderDark');
    
    logo.setAttribute("src", "./assets/gifOF_logo.png");

  }

  
}

//Dark en crearGif

function themeSwithCreateGif () {
  let arrayListoButton = [];
  let arrayWhiteButtons = [];
  let arrayRepetirYSubir = [];
  let arrayBars = [];

  const barraCrearGif = document.querySelector('.barraCrearGif');
  const crearGif = document.getElementById('crearGif');
  const cancelarButton = document.getElementById('cancelarButton');
  const comenzarButton = document.getElementById('comenzarButton');
  const barraChequearGif = document.querySelector('.barraChequearGif')
  const srcObjetc = document.getElementById('srcObjetc');

  const comenzarCaptura = document.querySelector('.comenzarCaptura')
  const listoCaptura = document.getElementById('listoCaptura');
  const forward = document.getElementById('forward');
  const barColor = document.getElementsByClassName('barColor');
  const repetir = document.getElementById('repetir');
  const subir = document.getElementById('subir');

  const progressBar = document.getElementById('progressBar');
  const uploadProgressBar = document.getElementById('uploadProgressBar')

  arrayBackgroundYLetrasDark.push(tittleBgBar, barraCrearGif, barraChequearGif);
  arrayBoxDark.push(crearGif, srcObjetc)
  arrayButtonDark.push(comenzarCaptura, forward);
  arrayListoButton.push(listoCaptura);
  arrayWhiteButtons.push(cancelarButton);
  arrayRepetirYSubir.push(repetir, subir);
  arrayBars.push(progressBar, uploadProgressBar)

  if (JSON.parse(themeClick) === "darkTheme") {
    crearGifBody.classList.add("darkThemeBody");
    logo.src = "./assets/gifOF_logo_dark.png";
    alignText.classList.add('alignTextDark')
    
    comenzarButton.classList.add('comenzarGifDark')

    for (let elem of arrayBackgroundYLetrasDark) {
      elem.classList.add("backgroundYLetrasDark");
    }

    for (let elem of arrayBoxDark) {
      elem.classList.add("boxDark");
    }

    for (let elem of arrayButtonDark) {
      elem.classList.add('buttonDarkCrearGif');
    }

    for (let elem of arrayListoButton) {
      elem.classList.add('listoCapturaDark')
    }

    for(let elem of arrayWhiteButtons){
      elem.classList.add('cancelarGifDark');
    }

    for(let elem of arrayRepetirYSubir){
      elem.classList.add('repetirYSubirDark');
    }

    for(let elem of arrayBars){
      elem.classList.add('progressBarDark');
    }

    setTimeout(()=>{
      for (let elem of barColor){
        elem.classList.add('barColorDark')
      }
    },100)
    
  } 
  
  if (JSON.parse(themeClick) === "dayTheme") {
    crearGifBody.classList.remove("darkThemeBody");
    logo.src = "./assets/gifOF_logo.png";
    alignText.classList.remove('alignTextDark')

    cancelarButton.classList.remove('cancelarGifDark');
    comenzarButton.classList.remove('comenzarGifDark')

    for (let elem of arrayBackgroundYLetrasDark) {
      elem.classList.remove("backgroundYLetrasDark");
    }

    for(let elem of arrayBars){
      elem.classList.remove('progressBarDark');
    }
  }
}

function themeSwithMisGifos (){
  const misGifos = document.body;
  arrayBackgroundYLetrasDark.push(tittleBgBar)
  const alignText = document.querySelector('#alignText');
  if (JSON.parse(themeClick) === "darkTheme"){
    misGifos.classList.add("darkThemeBody");
    logo.src = "./assets/gifOF_logo_dark.png";
    alignText.classList.add('alignTextDark')

    for (let elem of arrayBackgroundYLetrasDark) {
      elem.classList.add("backgroundYLetrasDark");
    }

  }

  if (JSON.parse(themeClick) === "dayTheme") {
    misGifos.classList.remove("darkThemeBody");
    logo.src = "./assets/gifOF_logo.png";
    alignText.classList.remove('alignTextDark')

    for (let elem of arrayBackgroundYLetrasDark) {
      elem.classList.remove("backgroundYLetrasDark");
    }
  }
}

//-------------------------------FIN Dark Theme--------------------------------------//




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

    if(charsetSearch.length && themeClick === dayTheme) {
      buttonSearch.classList.replace('buttonHoverColorDark', 'buttonHoverColor')
    }

    if(charsetSearch.length && themeClick === darkTheme) {
      buttonSearch.classList.replace('buttonHoverColor', 'buttonHoverColorDark');
      buttonSearch.classList.remove('boxDark');
    }

  }

  if(themeClick) {
    saveTheme = themeClick.id;
    console.log(saveTheme)
  }
}

if(document.body.id === "crearGifBody") {
  if(localStorage.themeSave) {
    let loadDataTheme = localStorage.getItem('themeSave');
    themeClick = JSON.stringify(loadDataTheme);
    themeSwithCreateGif();
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

    for (let elem of blueButtonApi) {
      elem.classList.add('blueButtonDark');
    }

    searchWord.classList.add('searchWordDark');
    myGifDarker.classList.add('textDark');
    myGif.classList.add('myGifHoverDark');
    borderLine.classList.add('borderDark');
    
    logo.setAttribute("src", "./assets/gifOF_logo_dark.png");
    
    inputSearch.addEventListener("keyup", () => {

      buttonSearch.classList.remove('buttonHoverColor');
      buttonSearch.classList.replace(
        "boxDark",
        "buttonHoverColorDark"
      );

      if(charsetSearch.length == 0) {
        buttonSearch.classList.replace(
          "buttonHoverColorDark",
          "boxDark"
        );

        buttonSearch.classList.add('buttonSearch')
      }
    });
    
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
    
    inputSearch.addEventListener("keyup", () => {
      buttonSearch.classList.add('buttonHoverColor');
      buttonSearch.classList.replace(
        "buttonHoverColorDark",
        "boxDark"
      );

      
    });

  }

  
}



function themeSwithCreateGif () {
  console.log('ya en la funcion')
  const barraCrearGif = document.querySelector('.barraCrearGif');
  const crearGif = document.getElementById('crearGif');
  const cancelarButton = document.getElementById('cancelarButton');
  const comenzarButton = document.getElementById('comenzarButton');
  arrayBackgroundYLetrasDark.push(tittleBgBar, barraCrearGif);
  arrayBoxDark.push(crearGif)

  if (JSON.parse(themeClick) === "darkTheme") {
    crearGifBody.classList.add("darkThemeBody");
    logo.src = "./assets/gifOF_logo_dark.png";
    console.log('stamos en dark')
    cancelarButton.classList.add('cancelarGifDark');
    comenzarButton.classList.add('comenzarGifDark')

    for (let elem of arrayBackgroundYLetrasDark) {
      elem.classList.add("backgroundYLetrasDark");
    }

    for (let elem of arrayBoxDark) {
      elem.classList.add("boxDark");
    }
    
  } 
  
  if (JSON.parse(themeClick) === "dayTheme") {
    crearGifBody.classList.remove("darkThemeBody");
    console.log('está ingresando a DAY')
    logo.src = "./assets/gifOF_logo.png";

    cancelarButton.classList.remove('cancelarGifDark');
    comenzarButton.classList.remove('comenzarGifDark')

    for (let elem of arrayBackgroundYLetrasDark) {
      elem.classList.remove("backgroundYLetrasDark");
    }
  }
}



//-------------------------------FIN Dark Theme--------------------------------------//

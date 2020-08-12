//-------------------------------VARIABLES GLOBALES-------------------------------///
let arrow = document.getElementById("arrowFunction");
let cambiarContenidoInput = document.getElementById("search");
let buttonSearch = document.getElementById("buttonSearch");
let inputSearch = document.getElementById("search");
let searchBox = document.querySelector(".searchBox");
let searchMenu = document.querySelector(".displayBoxSearch");
let searchContainer = document.querySelector(".searchContainer");
let charsetSearch = "";
//IDs del main
let sugerencias = document.getElementById("sugerencias");
let tendencias = document.getElementById("tendencias");
let apiResults = document.getElementById("APIResults");
//ID para Cambiar de Temas
let darkTheme = document.getElementById("darkTheme");
let dayTheme = document.getElementById("dayTheme");
let themeContainer = document.getElementById("themeContainer");
//Variable para cambiar de tema están dentro de Dark y Day Theme del HTML
let theme = document.querySelectorAll(".theme");
//-------------------------------FIN VARIABLES GLOBALES-------------------------------///
//Cambiar placeholder//

cambiarContenidoInput.setAttribute(
  "placeholder",
  "Busca gifs, hashtags, temas, busca lo que quieras…"
);

//-------------------------------Desplegar botón con temas--------------------------------------//

arrow.addEventListener("click", checkClickOfArrow);

function checkClickOfArrow(e) {
  e.preventDefault();
  e.stopPropagation();
  if (themeContainer.style.visibility == "visible") {
    themeContainer.style.visibility = "hidden";
  } else {
    themeContainer.style.visibility = "visible";
  }
}

document.addEventListener("click", function (e) {
  let clic = e.target;
  if (themeContainer.style.visibility == "visible" && clic != themeContainer) {
    themeContainer.style.visibility = "hidden";
  }
});
//-------------------------------FIN Desplegar botón con temas--------------------------------------//
//------------------------------Search Button--------------------------------------//

inputSearch.addEventListener("keyup", () => {
  charsetSearch = inputSearch.value.trim();
  console.log("en el keyUP son: " + charsetSearch);
  let searchWord = document.querySelector(".searchWord");
  buttonSearch.classList.replace("buttonSearch", "buttonHoverColor");
  searchWord.classList.add("searchWordHover");
  searchMenu.style.display = "block";
  sugerencias.style.display = "none";
  tendencias.style.display = "none";
});



document.addEventListener("click", () => {
  
  charsetSearch = "";
  console.log("en el 2do evento son: " + charsetSearch);
  let searchWord = document.querySelector(".searchWord");
  buttonSearch.classList.replace("buttonHoverColor", "buttonSearch");
  searchWord.classList.remove("searchWordHover");
  searchMenu.style.display = "none";
  setTimeout(() => {
    sugerencias.style.display = "block";
    tendencias.style.display = "block";
  }, 100);
  
  
});

//----Extrayendo la palabra ingresada en el input---//

//----Solicitando a la API que busque la palabra---//

buttonSearch.addEventListener("click", getSearchResults);

let APIKEY = "1gchfU6E5SK40hPSSKXsFAKZZYljRhxa";

function getSearchResults() {
  const found = fetch(
    "http://api.giphy.com/v1/gifs/search?q=" +
      charsetSearch +
      "&api_key=" +
      APIKEY +
      "&limit=100"
  )
    .then((response) => {
      return response.json();
    })
    .then((respuesta) => {
      apiResults.style.display="block"
      let containerApi = document.getElementById("containerApi");
      console.log(respuesta.data);

      while (containerApi.hasChildNodes()) {
        containerApi.lastChild.remove();
      }
      setTimeout(loopImg, 100);

      function loopImg(){
        for (let finalGif of respuesta.data) {
          let gifapi = document.createElement("img");
          gifapi.classList.add("apiGif");
          gifapi.src = finalGif.images.original.url;
          containerApi.appendChild(gifapi);
        }

        let gifapi = document.getElementsByClassName('apiGif');
      for(i = 5; i <= gifapi.length; i++){
        if(i % 2 != 0){
          gifapi[i].classList.add("apiGif-1");
        } 
      }
      }
      

      
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

  return found;
}

//----FIN Solicitando a la API que busque la palabra---//
//-----------------API Trend--------------//
function apiTrend() {
  let random = [
    "riquelme",
    "today",
    "trend",
    "trending",
    "hoy",
    "funny",
    "hilarious",
    "trending-gifs",
    "most-popular",
    "star-wars",
    "dog-style",
    "donlad-trump",
    "simpsons",
  ];
  let randomNumber = Math.floor(Math.random() * random.length);
  let randomWord = random[randomNumber];
  let qAPI = randomWord;
  const found = fetch(
    "http://api.giphy.com/v1/gifs/search?q=" +
      qAPI +
      "&api_key=" +
      APIKEY +
      "&limit=4"
  )
    .then((response) => {
      return response.json();
    })
    .then((respuesta) => {
      console.log(respuesta);
      let sugGif = document.getElementById("sugGif");

      for (let finalGif of respuesta.data) {
        let gifContainer = document.createElement("div");
        let gifResultsFrame = document.createElement("div");
        let gifResults = document.createElement("div");
        let gifImg = document.createElement("img");
        let btnClose = document.createElement("img");
        let gifTitleAPIContainer = document.createElement("span");
        let blueButton = document.createElement("a");
        let viewMore = document.createElement("span");
        viewMore.innerText = "Ver Mas...";

        gifContainer.classList.add("gifContainer");
        gifResults.classList.add("gifResults");
        gifResultsFrame.classList.add("gifResultsFrame");
        gifImg.classList.add("imgGif");
        btnClose.src = "./assets/button close.svg";
        btnClose.classList.add("btnClose");
        gifTitleAPIContainer.classList.add("spanText");
        blueButton.classList.add("blueButton");
        viewMore.classList.add("viewMore");

        let gifUrlApi = finalGif.url;
        blueButton.href = gifUrlApi;
        blueButton.target = "_blank";

        let gifTitleAPI = finalGif.title;
        gifTitleAPIContainer.innerText = gifTitleAPI;

        if (gifTitleAPI.trim() === "") {
          gifTitleAPIContainer.innerText = "Gif name not found";
        }

        gifImg.src = finalGif.images.original.url;
        blueButton.appendChild(viewMore);
        gifResults.appendChild(gifImg);
        gifResults.appendChild(blueButton);
        gifResultsFrame.appendChild(gifTitleAPIContainer);
        gifResultsFrame.appendChild(btnClose);
        gifContainer.appendChild(gifResultsFrame);
        gifContainer.appendChild(gifResults);
        sugGif.appendChild(gifContainer);
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

  return found;
}

apiTrend();

//-----------------FIN API Trend--------------//

//------------------------------FIN Search Button--------------------------------------//
//-------------------------------Dark Theme--------------------------------------//

for (let changetheme of theme) {
  changetheme.addEventListener("click", darkThemeON);
}

function darkThemeON(e) {
  document.getElementById("darkThemeBody");
  e.preventDefault();
  let themeClick = e.target;
  console.log(themeClick);
  //Barras
  let tittleBgBar = document.getElementById("tittleBar");
  let bgSearchBar = document.getElementById("styleBar");
  //Botones
  let createGif = document.getElementById("createGif");
  let chooseTheme = document.getElementById("chooseTheme");
  let borderLine = document.querySelector(".border");
  let myGif = document.querySelector(".myGifDarker");
  let myGifBox = document.getElementById("myGif");
  //Buscar
  let searchBox = document.getElementById("searchBox");
  let searchWord = document.querySelector(".searchWord");
  let logo = document.querySelector(".logoPNG");
  let buttonSearch = document.getElementById("buttonSearch");
  //Caja de búsqueda en display none
  let displayBoxSearch = document.getElementById("displayBoxSearch");

  if (themeClick === darkTheme) {
    document.body.classList.add("darkThemeBody");
    createGif.classList.replace("createGif", "createGifDark");
    chooseTheme.classList.replace("chooseTheme", "chooseThemeDark");
    tittleBgBar.classList.replace("tittleBar", "tittleBarDark");
    bgSearchBar.classList.replace("styleBar", "styleBarDark");
    searchBox.classList.replace("searchBox", "searchBoxDark");
    buttonSearch.classList.replace("buttonSearch", "buttonSearchDark");
    darkTheme.classList.replace("darkTheme", "darkThemeDark");
    dayTheme.classList.replace("dayTheme", "dayThemeDark");
    themeContainer.classList.replace("themeContainer", "themeContainerDark");
    myGifBox.classList.replace("myGif", "myGifDark");
    searchWord.style.color = "#8F8F8F";
    logo.setAttribute("src", "./assets/gifOF_logo_dark.png");
    displayBoxSearch.classList.replace(
      "displayBoxSearch",
      "displayBoxSearchDark"
    );
    borderLine.style.visibility = "hidden";
    myGif.style.color = "#fff";

    inputSearch.addEventListener("click", () => {
      buttonSearch.classList.replace(
        "buttonSearchDark",
        "buttonHoverColorDark"
      );
    });

    searchContainer.addEventListener("mouseleave", () => {
      buttonSearch.classList.replace(
        "buttonHoverColorDark",
        "buttonSearchDark"
      );
    });
  }

  if (themeClick === dayTheme) {
    document.body.classList.remove("darkThemeBody");
    createGif.classList.replace("createGifDark", "createGif");
    chooseTheme.classList.replace("chooseThemeDark", "chooseTheme");
    tittleBgBar.classList.replace("tittleBarDark", "tittleBar");
    bgSearchBar.classList.replace("styleBarDark", "styleBar");
    searchBox.classList.replace("searchBoxDark", "searchBox");
    buttonSearch.classList.replace("buttonSearchDark", "buttonSearch");
    darkTheme.classList.replace("darkThemeDark", "darkTheme");
    dayTheme.classList.replace("dayThemeDark", "dayTheme");
    themeContainer.classList.replace("themeContainerDark", "themeContainer");
    myGifBox.classList.replace("myGifDark", "myGif");
    searchWord.style.color = "#8F8F8F";
    logo.setAttribute("src", "./assets/gifOF_logo.png");
    displayBoxSearch.classList.replace(
      "displayBoxSearchDark",
      "displayBoxSearch"
    );
    borderLine.style.visibility = "visible";
    myGif.style.color = "#110038";
  }
}

//-------------------------------FIN Dark Theme--------------------------------------//

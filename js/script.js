//-------------------------------VARIABLES GLOBALES-------------------------------///

const APIKEY = "1gchfU6E5SK40hPSSKXsFAKZZYljRhxa";
//const APIKEY = process.env.APIKEY;

const arrow = document.getElementById("arrowFunction");
const buttonSearch = document.getElementById("buttonSearch");
const inputSearch = document.getElementById("search");
const searchBox = document.getElementById("searchBox");
const displayBoxSearch = document.getElementById("displayBoxSearch");
const searchContainer = document.querySelector(".searchContainer");
const searchWord = document.querySelector(".searchWord");
let charsetSearch = "";
//IDs del main
const sugerencias = document.getElementById("sugerencias");
const tendencias = document.getElementById("tendencias");
const apiResults = document.getElementById("APIResults");


//Globales para búsquedas realizadas LocalStorage
const searchsDone = document.getElementById('searchsDone')
let alertMsg = document.getElementById('alertMsg')
let searchArray = []

//-------------------------------FIN VARIABLES GLOBALES-------------------------------///

//crear link
const myGif = document.getElementById('myGif')

//localStorage
loadData();

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

//--Haciendo que el input guarde la palabra a buscar--//
inputSearch.addEventListener("keyup", () => {
  charsetSearch = inputSearch.value.trim();
  buttonSearch.classList.replace("buttonSearch", "buttonHoverColor");
  searchWord.classList.add("searchWordHover");
  displayBoxSearch.style.display = "block";

  //Agrega ejemplos de búsqueda, al hacer click debería buscarlos
  while (displayBoxSearch.hasChildNodes()) {
    displayBoxSearch.lastChild.remove();
  }

  setTimeout(()=>{

    if(charsetSearch.length > 1) {
      sugSearch ()
    }
  },1000)

  if(charsetSearch.length === 0){
    buttonSearch.classList.replace("buttonHoverColor", "buttonSearch");
    searchWord.classList.remove("searchWordHover");
  }

  if((buttonSearch.classList.contains('buttonHoverColor') || buttonSearch.classList.contains('buttonHoverColorDark')) &&  charsetSearch != ""){
    buttonSearch.addEventListener("click", getSearchResults);
  } else {
    buttonSearch.removeEventListener("click", getSearchResults);
    displayBoxSearch.style.display = "none";
    
  }
});

//-- FIN Haciendo que el input guarde la palabra a buscar--//

//--creacndo sugerencias de búsquedas--//

function sugSearch () {
  const found = fetch(
    `https://api.giphy.com/v1/tags/related/${charsetSearch}?`+
      "&api_key=" +
      APIKEY
  )
    .then((response) => {
      return response.json();
    })
    .then((respuesta) => {

      while (displayBoxSearch.hasChildNodes()) {
        displayBoxSearch.lastChild.remove();
      }

        for(let i = 0; i < 5 ;i++){
          let boxResults = document.createElement("div");
          boxResults.classList.add('boxResults')
          boxResults.innerText = respuesta.data[i].name
          displayBoxSearch.appendChild(boxResults);
          boxResults.addEventListener("click", ()=>{
            inputSearch.value = respuesta.data[i].name
            charsetSearch = respuesta.data[i].name
            getSearchResults()
          })
        }
      
  })

  .catch((error) => {
    console.log(error);
    return error;
  });

  return found
}
//--FIN creacndo sugerencias de búsquedas--//


//--Guardar palabra y crear botón--//

function createButtonsFromArray () {

  if(alertMsg.style.display == "block"){
    alertMsg.innerText = ""
    alertMsg.style.display = "none"
  }
  if(searchArray.includes(charsetSearch)){
    return;
  } else {
    searchArray.push(charsetSearch);
  }
  

  let blueButtonDone = document.createElement('div')
  blueButtonDone.classList.add("blueButtonDone");
  if(document.body.classList.contains('darkThemeBody')){
    blueButtonDone.classList.add("blueButtonDark");
  }
  let viewMoreDone = document.createElement('div')
  viewMoreDone.classList.add('viewMoreDone');
  viewMoreDone.innerText = charsetSearch;
  blueButtonDone.appendChild(viewMoreDone)
  searchsDone.appendChild(blueButtonDone)

  
  let saveData = JSON.stringify(searchArray);
  localStorage.setItem('searchArrayData', saveData);
} 
function loadData() {

  if(localStorage.searchArrayData){
    
    let loadDataArray = JSON.parse(localStorage.getItem('searchArrayData'));
    searchArray = loadDataArray
    searchArray.forEach( createButton =>{
      let blueButtonDone = document.createElement('div')
      blueButtonDone.classList.add("blueButtonDone");
      let viewMoreDone = document.createElement('div')
      viewMoreDone.classList.add('viewMoreDone');
      viewMoreDone.innerText = createButton;
      blueButtonDone.appendChild(viewMoreDone)
      searchsDone.appendChild(blueButtonDone)
    })
    

    if(searchArray.length > 25){
      let num = searchArray.length;
      searchArray.splice(0, num)
      while(searchsDone.hasChildNodes()){
        searchsDone.lastChild.remove()
      }
      localStorage.clear()
        alertMsg.style.display = "block";
        alertMsg.innerText = "Superaste el número de búsquedas en tu historial, lo reiniciamos para ahorrarte espacio en tu compu :)";
    }
  }

}
//--FIN Guardar palabra y crear botón--//
let textOnButton = document.getElementsByClassName('viewMoreDone')

searchsDone.addEventListener('click', (e)=>{
  buttonClick = e.target
  charsetSearch = buttonClick.innerText
  inputSearch.value = buttonClick.innerText
  getSearchResults()
})

//----Solicitando a la API que busque la palabra---//


function getSearchResults() {
  createButtonsFromArray ()
  sugerencias.style.display = "none";
  tendencias.style.display = "none";
  displayBoxSearch.style.display = "none"
  apiResults.style.display="block"
  
  const found = fetch(
    "https://api.giphy.com/v1/gifs/search?q=" +
      charsetSearch +
      "&api_key=" +
      APIKEY +
      "&limit=10"
  )
    .then((response) => {
      return response.json();
    })
    .then((respuesta) => {
      let containerApi = document.getElementById("containerApi");

      while (containerApi.hasChildNodes()) {
        containerApi.lastChild.remove();
      }

      setTimeout(loopImg, 100)
      function loopImg(){
        for (let finalGif of respuesta.data) {
          let gifapi = document.createElement("img");
          gifapi.classList.add("apiGif");
          gifapi.setAttribute('loading', 'lazy')
          gifapi.src = finalGif.images.original.url;
          containerApi.appendChild(gifapi);
        }

        let gifapi = document.getElementsByClassName('apiGif');
        for(i = 5; i < gifapi.length; i++){
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
//-----------------API sug--------------//
function apiSug() {
  let random = [
    "riquelme",
    "most-popular",
    "star-wars",
    "dog-style",
    "donlad-trump",
    "simpsons",
    "IT",
    "COVID-19",
    "snoop-dog",
    "Lollapalooza",
    "Jimmy Fallon",
    "Among us"
  ];
  let randomNumber = Math.floor(Math.random() * random.length);
  let randomWord = random[randomNumber];
  let qAPI = randomWord;
  const found = fetch(
    "https://api.giphy.com/v1/gifs/search?q=" +
      qAPI +
      "&api_key=" +
      APIKEY +
      "&limit=4"
  )
    .then((response) => {
      return response.json();
    })
    .then((respuesta) => {
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

apiSug();

//-----------------FIN API sug--------------//
//---------------------------API Trend-------------------------//

function apiTrend() {
  let limit = 25;
  const found = fetch(
    "https://api.giphy.com/v1/gifs/trending?" +
      "&api_key=" +
      APIKEY +
      "&limit="+ 
      limit
  )
    .then((response) => {
      return response.json();
    })
    .then((respuesta) => {

      let trendGif = document.getElementById("trendGifs");
      trendGif.classList.add('trendGifs');    
      loopImg()

      function loopImg(){
        for (let finalGif of respuesta.data) {
          let apiTrendImg = document.createElement("img");
          let trendFootImg = document.createElement('div');
          let trendConteiner = document.createElement('div')

          trendConteiner.classList.add('trendConteiner')
          trendFootImg.classList.add('trendFootImg');
          apiTrendImg.classList.add("apiTrend");

          apiTrendImg.setAttribute('loading', 'lazy')

          apiTrendImg.src = finalGif.images.original.url;
          
          let trendTitle = finalGif.title.split(" ");
          let hashtag = "";

          trendTitle.forEach(word => {
            hashtag += `#${word} `;
          });
          trendFootImg.innerText = hashtag;

          trendConteiner.appendChild(trendFootImg)
          trendConteiner.appendChild(apiTrendImg);
          trendGif.appendChild(trendConteiner)

        }

        //Creando Grids
        let trendConteiner = document.getElementsByClassName('trendConteiner');
        for(let i = 3; i < trendConteiner.length; i++){
          if(i % 2 != 0){
            trendConteiner[i].classList.add("apiGif-1");
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

apiTrend()
//-----------------FIN API Trend--------------//
//------------------------------FIN Search Button--------------------------------------//


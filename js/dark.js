//-------------------------------Dark Theme--------------------------------------//

for (let changetheme of theme) {
  changetheme.addEventListener("click", darkThemeON);
}

function darkThemeON(e) {
  document.getElementById("darkThemeBody");
  e.preventDefault();
  let themeClick = e.target;
  //Barras
  let tittleBgBar = document.getElementById("tittleBar");
  let bgSearchBar = document.getElementById("styleBar");
  let gifResultsFrames = document.getElementsByClassName("gifResultsFrame");
  let trendFootImgs = document.getElementsByClassName("trendFootImg");

  //Botones
  let createGif = document.getElementById("createGif");
  let chooseTheme = document.getElementById("chooseTheme");
  let borderLine = document.querySelector(".border");
  let myGif = document.querySelector(".myGifDarker");
  let myGifBox = document.getElementById("myGif");
  //Buscar
  let searchBox = document.getElementById("searchBox");

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

    for (let auxClass of gifResultsFrames) {
      auxClass.classList.add("darkBack");
    }

    for (let auxClass of trendFootImgs) {
      auxClass.classList.add("darkBack");
    }

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

    if (buttonSearch.classList.contains("buttonHoverColor")) {
      buttonSearch.classList.replace(
        "buttonHoverColor",
        "buttonHoverColorDark"
      );
    }

    borderLine.style.visibility = "hidden";
    myGif.style.color = "#fff";

    inputSearch.addEventListener("keyup", () => {
      buttonSearch.classList.replace(
        "buttonSearchDark",
        "buttonHoverColorDark"
      );
    });
  }


  if (themeClick === dayTheme) {
    
    document.body.classList.remove("darkThemeBody");
    createGif.classList.replace("createGifDark", "createGif");
    chooseTheme.classList.replace("chooseThemeDark", "chooseTheme");
    tittleBgBar.classList.replace("tittleBarDark", "tittleBar");
    bgSearchBar.classList.replace("styleBarDark", "styleBar");
    for (let auxClass of gifResultsFrames) {
        auxClass.classList.remove("darkBack");
      }
  
      for (let auxClass of trendFootImgs) {
        auxClass.classList.remove("darkBack");
      }


    searchBox.classList.replace("searchBoxDark", "searchBox");
    buttonSearch.classList.replace("buttonSearchDark", "buttonSearch");
    darkTheme.classList.replace("darkThemeDark", "darkTheme");
    dayTheme.classList.replace("dayThemeDark", "dayTheme");
    themeContainer.classList.replace("themeContainerDark", "themeContainer");
    buttonSearch.classList.replace("buttonHoverColorDark", "buttonHoverColor");
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

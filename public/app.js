var id = 0;

const makeRequest = function (url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

const requestComplete = function () {
  if (this.status !== 200) return;
  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);
  populateList(beers);
}

const requestIndividual = function () {
  if (this.status !== 200) return;
  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);
  populateInfo(beers);
}

const requestDrop = function () {
  if (this.status !== 200) return;
  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);
  populateDrop(beers);
}

const clearContent = function(node){
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

const handleButtonClick = function () {
  creatDrop();
  id = this.id;
  var beers = document.getElementById("beers");
  clearContent(beers);
  const url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestIndividual);
}

const handleSelectChange = function () {
  var select = document.getElementById("select");
  id = select.value;
  const url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestIndividual);
}

var handleKeyPress = function () {
  let search = this.value;
  let url = "https://api.punkapi.com/v2/beers?beer_name=" + search;
  makeRequest(url, requestComplete);
}

const ingredients = function (beer) {
  let div = document.getElementById("beers");
  let malt = beer.ingredients.malt;
  let hops = beer.ingredients.hops;
  let yeast = beer.ingredients.yeast;
  return populateIngredients(malt, hops, yeast);
}

const creatDrop = function () {
  const url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestDrop);
}

const createDropItem = function (beer) {
  let option = document.createElement("option");
  option.innerText = beer.name;
  option.value = beer.id;
  return option;
}

const createListItem = function (beer) {
  let div = document.getElementById("beers");
  let beerDiv = document.createElement("div");
  beerDiv.classList.add("beer");
  let img = document.createElement("img");
  img.setAttribute("src", beer.image_url);
  img.setAttribute("alt", beer.name);
  let textDiv = document.createElement("div");
  textDiv.classList.add("text");
  let h3Name = document.createElement("h3");
  h3Name.innerText = beer.name;
  let h6Tagline = document.createElement("h6");
  h6Tagline.innerText = beer.tagline;
  let button = document.createElement("button");
  button.id = beer.id;
  button.innerText = "Details";
  button.addEventListener("click", handleButtonClick);

  beerDiv.appendChild(img);
  textDiv.appendChild(h3Name);
  textDiv.appendChild(h6Tagline);
  textDiv.appendChild(button);
  beerDiv.appendChild(textDiv);

  div.appendChild(beerDiv);
}

const createItem = function (beer) {
  let div = document.getElementById("beers");
  let beerDiv = document.createElement("div");
  beerDiv.classList.add("beer");
  let img = document.createElement("img");
  img.classList.add("individual");
  img.setAttribute("src", beer.image_url);
  img.setAttribute("alt", beer.name);
  let textDiv = document.createElement("div");
  textDiv.classList.add("text");
  let h3Name = document.createElement("h3");
  h3Name.innerText = beer.name;
  let h6Tagline = document.createElement("h6");
  h6Tagline.innerText = beer.tagline;
  let pBlurb = document.createElement("p");
  pBlurb.innerText = beer.description;

  beerDiv.appendChild(img);
  textDiv.appendChild(h3Name);
  textDiv.appendChild(h6Tagline);
  textDiv.appendChild(pBlurb);
  beerDiv.appendChild(textDiv);

  let newDiv = ingredients(beer);
  beerDiv.appendChild(newDiv);
  div.appendChild(beerDiv);

}

const populateList = function (beers) {
  let div = document.getElementById("beers");
  clearContent(div);
  let counter = 0;
  beers.forEach(function (beer) {
    createListItem(beer);
  })
}

const populateInfo = function (beers) {
  let div = document.getElementById("beers");
  clearContent(div);
  intId = parseInt(id);
  beers.forEach(function (beer) {
    if (beer.id === intId) {
      createItem(beer);
    }
  });
}

const populateIngredients = function (malt, hops, yeast) {
  let ingredientsDiv = document.createElement("div");
  ingredientsDiv.classList.add("ingredients");
  let h6Ingredients = document.createElement("h6");
  h6Ingredients.innerText = "Ingredients";
  ingredientsDiv.appendChild(h6Ingredients);

  let ulMalt = document.createElement("ul");
  let thMalt = document.createElement("th");
  thMalt.innerText = "Malts";
  ulMalt.appendChild(thMalt);
  for (let iMalt of malt) {
    let liMalt = document.createElement("li");
    liMalt.innerText = iMalt.name;
    ulMalt.appendChild(liMalt);
  }
  ingredientsDiv.appendChild(ulMalt);

  let ulHop = document.createElement("ul");
  let thHop = document.createElement("th");
  thHop.innerText = "Hops";
  ulHop.appendChild(thHop);
  for (let iHop of hops) {
    let liHop = document.createElement("li");
    liHop.innerText = iHop.name;
    ulHop.appendChild(liHop);
  }
  ingredientsDiv.appendChild(ulHop);

  let ulYeast = document.createElement("ul");
  let thYeast = document.createElement("th");
  thYeast.innerText = "Yeast";
  ulYeast.appendChild(thYeast);
  let liYeast = document.createElement("li");
  liYeast.innerText = yeast.name;
  ulYeast.appendChild(liYeast);
  ingredientsDiv.appendChild(ulYeast);

  return ingredientsDiv;
}

const populateDrop = function (beers) {
  let select = document.getElementById("select");
  clearContent(select);
  select.style.display = "block";
  let arrow = document.querySelector(".select_arrow")
  arrow.style.display = "inline";
  var input = document.querySelector("input");
  input.style.display = "none";
  select.addEventListener("change", handleSelectChange);
  beers.forEach(function (beer) {
    let option = createDropItem(beer);
    select.appendChild(option);
  })
}

var app = function(){
  const url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete);
  let select = document.getElementById("select");
  select.style.display = "none";
  let arrow = document.querySelector(".select_arrow")
  arrow.style.display = "none";
  var input = document.querySelector("input");
  input.addEventListener("keyup", handleKeyPress);
}

window.addEventListener('load', app);

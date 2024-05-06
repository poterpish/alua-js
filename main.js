const input = document.getElementById("input-box");
const button = document.getElementById("submit-button");
const showContainer = document.getElementById("show-container");
const listContainer = document.querySelector(".list");
const comicsContainer = document.getElementById("comics-container");
const container = document.getElementById("container");
const characters = document.getElementById("characters");
const comics = document.getElementById("comics");
const series = document.getElementById("series");
const searchDiv = document.querySelector(".search-div");

const serverUrl = "http://gateway.marvel.com";

const apiKey = "866c329d6f9d27a7cef87f62c7994983";

function displayWords(value) {
    input.value = value;
    removeElements();
}

function removeElements() {
    listContainer.innerHTML = "";
}

input.addEventListener("keyup", async () => {
    removeElements();
        if (input.value.length < 4) {
            return false;
    }
 
    const url = `${serverUrl}/v1/public/characters?apikey=${apiKey}&nameStartsWith=${input.value}`;

    const response = await fetch(url);
    const jsonData = await response.json();

    jsonData.data["results"].forEach((result) => {
        let name = result.name;
        let div = document.createElement("div");

        div.style.cursor = "pointer";
        div.classList.add("autocomplete-items");
        div.setAttribute("onclick", "displayWords('" + name + "')");
        
        let word = "<b>" + name.substr(0, input.value.length) + "</b>";
        word += name.substr(input.value.length);
        div.innerHTML = `<p class="item">${word}</p>`;
        listContainer.appendChild(div);
    });
});
button.addEventListener("click", (getRsult = async () => {



    if (input.value.trim().length < 1) {
      alert("Input cannot be blank");
    }
    showContainer.innerHTML = "";
    const url = `${serverUrl}/v1/public/characters?apikey=${apiKey}&name=${input.value}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data['results'].forEach((element) => {
    showContainer.innerHTML = `<div class="card-container">
        <div class="character-image">
            <img src="${
            element.thumbnail["path"] + "." + element.thumbnail["extension"]
            }"/></div>
        <div class="name-desc"> 
        <div class="character-name">${element.name}</div>
        <div class="character-description">${element.description}</div>
            <br>
            <button class="button" id="show-comics"> Show comics </button>
            </div>
        
        </div>`;
        
        const showComics = document.getElementById("show-comics");
        showComics.addEventListener("click", async () => {
            comicsContainer.innerHTML = "";
            const url = `${serverUrl}/v1/public/characters/${element.id}/comics?apikey=${apiKey}`;
        
            const response = await fetch(url);
            const jsonData = await response.json();
        
            jsonData.data['results'].forEach((element) => {
                let comicsElem = document.createElement('div');
                comicsElem.classList.add('comics-card');
        
                let img = document.createElement('img');
                img.classList.add('comics-img');
                img.src = `${element.thumbnail["path"] + "." + element.thumbnail["extension"]}`;
                img.alt = "";
        
                let title = document.createElement('h4');
                title.classList.add('comics-title');
                title.textContent = `${element.title}`;
        
                let desc = document.createElement('p');
                desc.classList.add('comics-desc');
                desc.textContent = `${element.description }`;

                comicsElem.appendChild(img);
                comicsElem.appendChild(title);
                comicsElem.appendChild(desc);
        
                comicsContainer.appendChild(comicsElem);
            });

        });
    });
  })

  
);

const characterDiv = document.querySelector(".charactersDiv")

characters.addEventListener("click", showCharacters = async () => {
    searchDiv.style.display = "none";
    characterDiv.innerHTML = "";
    const url = `${serverUrl}/v1/public/characters?apikey=${apiKey}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    
    jsonData.data['results'].forEach((element) => {
        let characElem = document.createElement('div');
            characElem.classList.add('charac-card');
    
            let img = document.createElement('img');
            img.classList.add('charac-img');
            img.src = `${element.thumbnail["path"] + "." + element.thumbnail["extension"]}`;
            img.alt = "";
    
            let title = document.createElement('h4');
            title.classList.add('charac-name');
            title.textContent = `${element.name}`;
    
            let desc = document.createElement('p');
            desc.classList.add('charac-desc');
            desc.textContent = `${element.description }`;
            characElem.appendChild(img);
            characElem.appendChild(title);
            characElem.appendChild(desc);
        
            characterDiv.appendChild(characElem);
    });
});

const comicsDiv = document.querySelector(".comicsDiv")

comics.addEventListener("click", showComics = async () => {
    searchDiv.style.display = "none";
    comicsDiv.innerHTML = "";
    const url = `${serverUrl}/v1/public/comics?apikey=${apiKey}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    
    jsonData.data['results'].forEach((element) => {
        let comicsElem = document.createElement('div');
            comicsElem.classList.add('charac-card');
    
            let img = document.createElement('img');
            img.classList.add('charac-img');
            img.src = `${element.thumbnail["path"] + "." + element.thumbnail["extension"]}`;
            img.alt = "";
    
            let title = document.createElement('h4');
            title.classList.add('charac-name');
            title.textContent = `${element.title}`;
    
            let desc = document.createElement('p');
            desc.classList.add('charac-desc');
            desc.textContent = `${element.description }`;
            comicsElem.appendChild(img);
            comicsElem.appendChild(title);
            comicsElem.appendChild(desc);
        
            characterDiv.appendChild(comicsElem);
    });
});

const seriesDiv = document.querySelector(".seriesDiv");

series.addEventListener("click", showSeries = async () => {
    searchDiv.style.display = "none";
    seriesDiv.innerHTML = "";
    const url = `${serverUrl}/v1/public/series?apikey=${apiKey}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    
    jsonData.data['results'].forEach((element) => {
        let seriesElem = document.createElement('div');
            seriesElem.classList.add('series-card');
    
            let title = document.createElement('h4');
            title.classList.add('series-name');
            title.textContent = `${element.title}`;
    
            let desc = document.createElement('p');
            desc.classList.add('series-desc');
            desc.textContent = `${element.description }`;
            seriesElem.appendChild(title);
            seriesElem.appendChild(desc);
        
            characterDiv.appendChild(seriesElem);
    });
});

window.onload = () => {
  getRsult();
};

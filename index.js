const API = "https://rickandmortyapi.com/api";

let characters = `${API}/character/`
const container = document.querySelector('#container')

const buscar = document.querySelector('#buscar');
const inputBuscar = document.querySelector('#inputBuscar')
const atras = document.querySelector("#atras")
const siguiente = document.querySelector("#siguiente")

const filters = document.querySelectorAll(".btn-check")
let items;

const dibujarCards = (results) => {
    let cardAcumuladas = ""

    for(i=0; i < results.length; i++)
    {
        let card = `
        <div class="col-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-3 sobre">
            <div class="card  bg-dark bg-opacity-10 text-light text-center" style="width: 18rem;">
                <img src="${results[i].image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${results[i].name}</h5>
                    <p class="card-text ">
                    <br>
                    Gender:  ${results[i].gender}
                    <br>
                    Status:  ${results[i].status}
                    <br>    
                    Species:  ${results[i].species}
                    <br>
                    Dimension:  ${results[i].origin.name}</p>
                </div>
            </div>
        </div>
        `

        console.log(characters)
        cardAcumuladas += card;
    }

    container.innerHTML = cardAcumuladas;
}


const buscarAction = () => {
    characters = `${API}/character/?name=${inputBuscar.value}`
    cargarDatos();
}

buscar.addEventListener('click', buscarAction)

siguiente.addEventListener('click', () => {
    if(items.info.next)
    {
        siguiente.disabled = true;
        characters = items.info.next;
        cargarDatos();
    }
    
});

atras.addEventListener('click', () => {

    if(items.info.prev)
    {
        characters = items.info.prev;
        cargarDatos();
    }
    
})

const addFilterCharacter = (value, origin) => {
    let queryString = "";
    switch(origin)
    {
        case "status":
            queryString = `status=${value}`
        break;
        case "species":
            queryString = `species=${value}`
        break;
        case "gender":
            queryString = `gender=${value}`
        break;
    }
    
    if(characters.includes('?'))
    {
        characters = characters.concat(`&${queryString}`)
    }else{
        characters =  characters.concat(`?${queryString}`)
    }
    
    cargarDatos();
}

filters.forEach(item => item.addEventListener('click', (event) => {
    addFilterCharacter(event.target.labels[0].textContent, event.target.name);
}))


const cargarDatos = () => {
    window.fetch(characters)
    .then((response) => response.json())
    .then((responseJson) => {
        dibujarCards(responseJson.results)
        items = responseJson;
        siguiente.disabled = false;
    })
    .catch(error => { 
        container.innerHTML = "No se encontro nada en su FILTRO"
    })
}

cargarDatos();


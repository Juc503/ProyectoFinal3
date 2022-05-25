// 2. Obtener el element raiz HTML
const ulElement = document.querySelector('#contacts-ul');
const searchElement = document.querySelector('.input');
let contacts = []

// 3. Poder obtener la informacion de una fuente de datos (API)
const main = () => {
    // fetch('http://hp-api.herokuapp.com/api/characters/students')
    fetch('./api/characters.json')
        .then(response => response.json())
        .then(data => normalizeData(data))
        .then(contacts => contacts.forEach(renderCardContact))
        // .then(contacts => {
        //     let i = 0;
        //     while(i < contacts.length) {
        //         renderCardContact(contacts[i]);
        //         i++;
        //     }
        // })
};

// 4. Normalizar los datos => Selector
const normalizeData = (data) => {
    data.forEach(element => {
        const { name, image, gender,patronus,ancestry, house} = element;
        const contact = {
            text: name,
            photo: image,
            gender: gender,
            ancestry: ancestry,
            patronus:patronus,
            house: house
        };
        contacts.push(contact);
    });
    return contacts;
};


// 5. Crear una funcion que rendere (pinte) la informacion de cada tarjeta de contacto
const renderCardContact = (element) => {

    const li = document.createElement('li');
    const cardDiv = document.createElement('div');
    const photoDiv = document.createElement('div');
    const imgDiv = document.createElement('div');
    const img = document.createElement('img');
    const texDiv = document.createElement('div');
    
    texDiv.classList.add('name');
    cardDiv.classList.add('cardContainer')
    photoDiv.classList.add('card');
    imgDiv.classList.add('front');
    img.classList.add( 'photo')
    

    
    let photo = ''
    if (element?.photo) {
        photo = element.photo;
    } else {
        photo = 'data:https://i.pinimg.com/474x/4d/16/d3/4d16d3346cc4415f0984fa7d9b70fc51.jpg';}
    
    img.setAttribute('src', photo);

    texDiv.classList.add('text');
    texDiv.innerHTML = element.text;

    ulElement.appendChild(li);
    li.appendChild(cardDiv);
    photoDiv.appendChild(imgDiv);
    imgDiv.appendChild(img);
    cardDiv.appendChild(photoDiv);
    cardDiv.appendChild(texDiv);
    




    const flipCard = document.createElement("div");
    flipCard.classList.add("back");
    const datos = document.createElement("p");
    datos.innerHTML="Ancestry: " + element.ancestry;
    const datop = document.createElement("p");
    datop.innerHTML="Patronus: " +element.patronus;
    flipCard.innerHTML="House: " + element.house;

    photoDiv.appendChild(flipCard);
    flipCard.appendChild(datos);
    flipCard.appendChild(datop);
    

};

const cleanView = () => {
    ulElement.innerHTML = '';
};

searchElement.addEventListener('keyup', (event) => {
    const inputText = event?.target?.value.toLocaleLowerCase() || '';
    cleanView();
    // const contactsFiltered = searchingWithFor(inputText);
    const contactsFiltered = searchingWithFilter(inputText);
    contactsFiltered.forEach(renderCardContact);
});



const searchingWithFilter = (searchingText) => {
    const contactsFiltered = contacts.filter(contact => {
        const name = contact.text;
        return (name.toLocaleLowerCase()).includes(searchingText)
    });
    return contactsFiltered;
};





const selectGender = document.querySelector("#optionGender")

selectGender.addEventListener('change', (event) => {
const typeG = event?.target?.value || '';

const HPGender = contacts.filter((element)=>{
    const optionG= (element.gender)
    return optionG.includes(typeG)
})
cleanView();
HPGender.forEach(renderCardContact);

})

const selectAncestry = document.querySelector("#optionAncestry")

selectAncestry.addEventListener('change', (event) => {
const typeA = event?.target?.value || '';

const HPAncestry = contacts.filter((element)=>{
    const optionA= (element.ancestry)
    return optionA.includes(typeA)
})
cleanView();
HPAncestry.forEach(renderCardContact);

})

const col1 = document.getElementById("Col1")
const col2 = document.getElementById("Col2")



const selectHouse = document.querySelector("#optionHouse")

selectHouse.addEventListener('change', (event) => {
const typeH = event?.target?.value || '';

const HPHouse = contacts.filter((element)=>{
    const optionH= (element.house).toLocaleLowerCase();

    if(typeH === "gryffindor"){
        col1.setAttribute("id","Gryffindor");
        col1.classList.remove("none");
        col2.setAttribute("id","Gryffindor");
        col2.classList.remove("none");
    }
    else if(typeH === "slytherin"){

        col1.setAttribute("id","Slytherin");
        col1.classList.remove("none");
        col2.setAttribute("id","Slytherin");
        col2.classList.remove("none");
    }
    else if(typeH === "hufflepuff"){
        col1.setAttribute("id","Hufflepuff");
        col1.classList.remove("none");
        col2.setAttribute("id","Hufflepuff");
        col2.classList.remove("none");
    }
    else if(typeH=== "ravenclaw"){
        col1.setAttribute("id","Ravenclaw");
        col1.classList.remove("none");
        col2.setAttribute("id","Ravenclaw");
        col2.classList.remove("none");
    }
    else if(typeH=== "house")
    { col1.classList.add("none");
    col2.classList.add("none");}
   
    
    return optionH.includes(typeH)
    
    
})
cleanView();
HPHouse.forEach(renderCardContact);

})




// Lanza la aplicacion
main();
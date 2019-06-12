const BASE_URL = 'http://localhost:3000/monsters';
const LIMIT_URL = '/?_limit=50&_page='
let page = 1;

//DOM ELEMS
const monContainer = document.querySelector('#monster-container');
const fwdBtn = document.querySelector('#forward');
const bckBtn = document.querySelector('#back');
const createMon = document.querySelector('#create-monster')
const monForm = document.querySelector('#monster-form')

init(page)
createMon.appendChild(createForm())

//RENDER METHODS
function renderMonster(monster) {
    const monDisplay = document.createElement('div');
    monDisplay.dataset.id = `${monster.id}`
    monDisplay.innerHTML = `
    <h2>${monster.name}</h2>
    <h4>Age: ${monster.age}</h4>
    <p>${monster.description}</p>
    `
    return monDisplay;
}

function createForm() {
    const form = document.createElement('form');
    form.id = 'monster-form';
    form.innerHTML = `
    <input id='name' placeholder='name...'>
    <input id='age' placeholder='age...'>
    <input id='description' placeholder='description...'>
    <button>Create</button>
    `
    return form;
}

//EVENT LISTENERS
fwdBtn.addEventListener('click', (e) => {
    monContainer.innerHTML = ''
    init(++page)
})

bckBtn.addEventListener('click', (e) =>{
    monContainer.innerHTML = ''
    init(--page)
})

createMon.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = e.target[0].value;
    let age = e.target[1].value;
    let description = e.target[2].value;
    fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            age,
            description
        })
    })
    .then(res => res.json())
    .then(monster =>{
        console.log('new monster:', monster);
        renderMonster(monster);
        monContainer.prepend(renderMonster(monster));
        document.querySelector('#monster-form').reset();
    })
})

//INITIALIZE
function init(page) {
    fetch(`${BASE_URL}${LIMIT_URL}${page}`)
    .then(res => res.json())
    .then(monstersData => {
        renderMonsters(monstersData);
    })
};

function renderMonsters(monsters) {
    monsters.forEach(monster => {
        monContainer.appendChild(renderMonster(monster))
    })
}

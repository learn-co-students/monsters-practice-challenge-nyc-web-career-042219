const makeMonsterLi = (name, age, description) => {
  const orderList = document.getElementById('monster-list');
  orderList.innerHTML += `<li><p>Name: ${name}</p><p>Age: ${age}</p><p>Desc: ${description}</p></li>`;
  return orderList;
};

const postMonster = (monster) => {
  const post = fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(monster),
  }).then(res => res.json()).then(response => response);
  return post;
};

const getFiftyMonsters = (page = 1) => {
  const apiCall = fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`).then(res => res.json()).then((data) => {
    data.forEach((element) => {
      makeMonsterLi(element.name, element.age, element.description);
    });
  });
  return apiCall;
};

const clearMonsterList = () => {
  document.getElementById('monster-list').innerHTML = '';
};

const formDiv = document.getElementById('create-monster');

formDiv.addEventListener('submit', (e) => {
  e.preventDefault();
  const monster = {
    name: e.target[0].value,
    age: e.target[1].value,
    description: e.target[2].value,
  };
  postMonster(monster);
});

let page = 1;

document.addEventListener('click', (e) => {
  if (e.target.id === 'forward') {
    page += 1;
    clearMonsterList();
    getFiftyMonsters(page);
  } else if (e.target.id === 'back') {
    page -= 1;
    clearMonsterList();
    getFiftyMonsters(page);
  }
});

getFiftyMonsters(page);

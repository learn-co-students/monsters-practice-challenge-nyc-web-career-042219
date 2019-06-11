window.addEventListener('DOMContentLoaded', (event) => {
  const monsterUrl = 'http://localhost:3000/monsters'
  let _limit =50
  let _page =1
  let forward = document.querySelector('#forward')
  let backward = document.querySelector('#back')
  const monsterContainer = document.querySelector('#monster-container')



  fetch (monsterUrl + `?_limit=${_limit}&_page=${_page}`)
  .then (r => r.json())
  .then (monsters => {
    monsters.forEach(e => {
      monsterContainer.innerHTML += `
      <h1>Name: ${e.name}</h1>
      <p>Age: ${e.age}<p>
      <p>Description: ${e.description}<p>
      `
    } )
  });

  let createMonster = document.querySelector('#monster-form')
  createMonster.addEventListener('submit', e => {
    e.preventDefault()
    let name = e.target[0].value
    let age = e.target[1].value
    let description = e.target[2].value
    fetch(monsterUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
      name,
      age,
      description
    })
  })})


  forward.addEventListener('click', e =>{
    _page += 1
    monsterContainer.innerHTML = ""

    fetch (monsterUrl + `?_limit=${_limit}&_page=${_page}`)
    .then (r => r.json())
    .then (monsters => {
      monsters.forEach(e => {
        monsterContainer.innerHTML += `
        <h1>Name: ${e.name}</h1>
        <p>Age: ${e.age}<p>
        <p>Description: ${e.description}<p>
        `
      } )
    });
  })


  backward.addEventListener('click', e =>{
    _page -= 1 
    monsterContainer.innerHTML = ""

    fetch (monsterUrl + `?_limit=${_limit}&_page=${_page}`)
    .then (r => r.json())
    .then (monsters => {
      monsters.forEach(e => {
        monsterContainer.innerHTML += `
        <h1>Name: ${e.name}</h1>
        <p>Age: ${e.age}<p>
        <p>Description: ${e.description}<p>
        `
      } )
    });
  })

});

//
// fetch(`http://localhost:3000/books/${selectedBookId}`, {
//       method: 'PATCH',
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         "users": selectedBook.users
//       })
//     })

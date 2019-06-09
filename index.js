document.addEventListener("DOMContentLoaded", () => {
  console.log(
    "%c I am loaded!, thank you Won",
    "font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)"
  );
  let page = 1
  fetchMonsters(page)





function fetchMonsters(pageNum){
  fetch(`http://localhost:3000/monsters/??_limit=50&_page=${pageNum}`)
  .then(r=>r.json())
  .then(mons=>{
    mons.forEach(mon=> {
    document.querySelector("#monster-container").appendChild(createMonsterInfo(mon))
    })
  })
}


function createMonsterInfo(mon){
  const tr = document.createElement('li')
  tr.innerHTML = `
      <ul>Name -${mon.name}</ul>
      <ul>Age - ${mon.age}</ul>
      <ul>Description - ${mon.description}</ul>

    `
    return tr
 }


 function newMonsterYo(e){

   const name = e.target.parentElement.querySelector("#monster-name").value
   const description = e.target.parentElement.querySelector("#monster-description").value
   const age = e.target.parentElement.querySelector("#monster-age").value

   fetch('http://localhost:3000/monsters', {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       "Accept": "application/json"
     },
     body: JSON.stringify({
                 name,
                 age,
                 description
     })
   })
   .then(r=>r.json())
   .then(mon=>{
     document.querySelector("#monster-container").appendChild(createMonsterInfo(mon))
  })
 }

  document.querySelector("body").addEventListener("click", e=>{
    e.preventDefault()
    let eventId =  e.target.id

    switch(eventId) {
      case "forward":
      console.log(e.target.id)
      pageChange(eventId)
      break;
      case "back":
      console.log(e.target.id)
      pageChange(eventId)
        break;
      case "yo new monster":
      newMonsterYo(e)
      break
    }
  })



  function pageChange(eventId){
    if (eventId === "forward")
    freshAFpage()
    page++
    fetchMonsters(page)
     if (eventId === "back")
     freshAFpage()
     page--
     fetchMonsters(page)

  }

  function freshAFpage(){
    asdf = document.querySelector("#monster-container")
    while (asdf.firstChild){
    asdf.removeChild(asdf.firstChild)}
  }

})

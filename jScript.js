
let arts = document.querySelectorAll('article');
let people = [...arts];

let apply = (index, src, name, email, location) => {
  for(i = index; i < people.length; i++){
    people[i].children[0].src = src;
    people[i].children[1].innerHTML = name;
    people[i].children[2].innerHTML = email;
    people[i].children[3].innerHTML = location;
  }
}

fetch('https://randomuser.me/api/?results=12')
.then(res => res.json())
.then(res => {
 let results = res.results;
 for(x in results){
   let img = results[x].picture.large;
   let name = `${results[x].name.first} ${results[x].name.last}`;
   let email = results[x].email;
   let loc = results[x].location.city;
   apply(x, img, name, email, loc)
 }
})


// create and append all dynamic elements
let arts = document.querySelectorAll('article');
let people = [...arts];
let input = document.querySelector('input');
let section = document.querySelector('section');
let modalBG = document.createElement('section');
let bg = document.createElement('article');
let modalImg = document.createElement('img');
let modalName = document.createElement('h2');
let mEmail = document.createElement('p');
let mCity = document.createElement('p');
let mPhoneNumber = document.createElement('p');
let mAddress = document.createElement('p');
let mBirthday = document.createElement('p');
let close = document.createElement('span');
modalBG.appendChild(bg);
bg.appendChild(close);
bg.appendChild(modalImg);
bg.appendChild(modalName);
bg.appendChild(mEmail);
bg.appendChild(mCity);
bg.appendChild(mPhoneNumber);
bg.appendChild(mAddress);
bg.appendChild(mBirthday);

let img;
let name;
let email;
let loc;
let date;
let dateFormat;

// the function responsible for the changing the imgages in the modal window
let imgChange = (fn, a, b) => {
  let change = b;
  document.addEventListener('keydown', (e) => {
    if(modalBG.className === 'modalBackGround'){
      if(e.key === 'ArrowRight'){
        if(change < 11){
          change++;
          fn(a, change)
        }
      }
     else if(e.key === 'ArrowLeft'){
       if(change > 0){
         change--;
          fn(a, change)
        }
      }
    }
  })
}

// the modal function will create and append the modal window
let modal = (a,x) => {
  date = a[x].dob.date;
  dateFormat = new Date(date);
  section.appendChild(modalBG);
  modalBG.appendChild(bg);
  modalBG.className = 'modalBackGround';
  bg.className = 'modal';
  close.innerHTML = 'X';
  modalImg.src = a[x].picture.large;
  modalName.innerHTML = `${a[x].name.first} ${a[x].name.last}`;
  mEmail.innerHTML = a[x].email;
  mCity.innerHTML = a[x].location.city;
  mPhoneNumber.innerHTML = a[x].phone;
  mAddress.innerHTML = `${a[x].location.street}, ${a[x].location.state}, ${a[x].location.postcode}`;
  mBirthday.innerHTML = `Birthday: ${dateFormat.getMonth()}/${dateFormat.getDate()}/${dateFormat.getFullYear()}`;
}

// apply function takes the index from the for-in loop and the properties for from the api and inserts it into the article elements
let apply = (index, img, name, email, loc) => {
  for(i = index; i < people.length; i++){
    people[i].children[0].src = img;
    people[i].children[1].innerHTML = name;
    people[i].children[2].innerHTML = email;
    people[i].children[3].innerHTML = loc;
  }
}

// fetch the random users from the api
fetch('https://randomuser.me/api/?results=12')
.then(res => res.json())
.then(res => {
 let results = res.results;

// loop through the results object and pass the values to the apply function
 for(x in results){
   img = results[x].picture.large;
   name = `${results[x].name.first} ${results[x].name.last}`;
   email = results[x].email;
   loc = results[x].location.city;
   apply(x, img, name, email, loc)
 }

// adds a click event to the article elements and opens the modal window
 people.forEach((c,i) => {
   c.addEventListener('click', () => {
       modal(results, i);
       modalBG.style.display = '';
       imgChange(modal, results, i);
   })
 })

// functionality for the modal close button
 close.addEventListener('click', () => {
   bg.className = '';
   modalBG.className = '';
   modalBG.style.display = 'none';
 })

})
.catch((error) => console.log('request failed', error))

// event for the search functionality
input.addEventListener('keyup', (e) => {
  let search = e.target.value;
  people.map(c => {
    if(c.children[1].innerHTML.indexOf(search) >= 0){
      c.style.display = 'block'
    } else{
      c.style.display = 'none'
    }
  })
})

modalBG.insertAdjacentHTML('beforeend', `<span style='color: white; padding: 2% 0 0 0'>feel free to use the left and right arrow keys to select different profiles</span>`)

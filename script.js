const myLibrary = []


function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.markRead = function() {
   if (this.read == 1) {
    this.read = 0
   }
   else 
   { this.read = 1}
  }
}

function showInput(e) {
  e.preventDefault();
  const output_info = document.getElementById("myform");
  const data = [...output_info.querySelectorAll("input:not([type=submit]), select")].map((item) => item.cloneNode(true));
  const booko = new Book(data[0].value, data[1].value, data[2].value, data[3].value)
  console.log("read status from form: " + data[3].value)
  myLibrary.push(booko)
  main.innerHTML = ""
  displayBooks()

  }


function handleClick(cb) {
    cb.value = cb.checked ? 1 : 0;
    console.log(cb.value);
  }  


function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
const button = document.querySelector(".openForm")
button.addEventListener('click', openForm)
const main = document.querySelector(".main")



function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
  
    const card = document.createElement('div');
    card.setAttribute('id', `card-${i}`)
    card.className = "card"
    const innercont = document.createElement("div")
    const par1 = document.createElement("p")
    par1.innerText = "Author: " + myLibrary[i].author;
    const par2 = document.createElement("p")
    par2.innerText = "Title: " + myLibrary[i].title;
    const par3 = document.createElement("p")
    par3.innerText = "Number of Pages: " + myLibrary[i].pages;
    const par4 = document.createElement("p");
    par4.setAttribute('id', `p-${i}`)
    innercont.append(par1, par2, par3, par4) 
  
    if (myLibrary[i].read == 1) {
        par4.innerText = "Read: Yes" }
    else {
        par4.innerText = "Read: No"
        const button = document.createElement("button");
        button.textContent = "Mark as read"
        button.setAttribute('id', `read-${i}`)
        button.setAttribute('class', `read`)
        button.addEventListener('click', (e) => markRead(e))
        card.appendChild(button)
    }
   
   
    const butto = document.createElement("button");
    butto.setAttribute('id', `button-${i}`)
    butto.setAttribute('class', `remove`)
    butto.textContent = "Remove"
    
    butto.addEventListener('click', (e) => removeBook(e.srcElement.id)) 
    card.append(innercont, butto); 
    
    main.appendChild(card)
  
  

  }
}

function removeBook (bookID) 

{ const ref = bookID.slice(7, bookID.length)
  console.log("this is book ID sliced: " + ref)
  myLibrary.splice(ref)
  const cardId = `card-${ref}` 
  const card = document.getElementById(cardId)
  card.remove()

}



function markRead(e) {

const id = e.srcElement.id.slice(5, e.srcElement.id.length)
console.log("read status before " + myLibrary[id].read)
myLibrary[id].markRead()
console.log("read status after " + myLibrary[id].read)
const readButton = document.getElementById(`read-${id}`)
const par = document.getElementById(`p-${id}`)
readButton.remove()
par.innerText = "Read: Yes"
}
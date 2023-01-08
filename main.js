/**
 * Author:    Manish Das
 * Created:   08.01.2023
 **/

//This project is only to practice dom manipulation and event handling
let input = '';
const incompleteToDo = JSON.parse(localStorage.getItem('incompleteToDo')) || []; //if localStroage is empty make an empty array
const completeToDo = JSON.parse(localStorage.getItem('completeToDo')) || []; 

//Input Event handler
document.querySelector('#input').addEventListener('input', (event) => {
    input = event.target.value;
})

//Add-Task Button Click handler
document.querySelector('.add-task-btn').addEventListener('click', () => {
    let pElement = document.createElement('p') //created p tag
    pElement.innerHTML += `<label class="cmplt-cbox"><input type="checkbox" />${input}</label>`; //wrap around label
    document.querySelector('.incomplete-task').append(pElement) //append inside parent element
    incompleteToDo.push({name: input}) //push the object with key and value into array 
    localStorage.setItem('incompleteToDo', JSON.stringify(incompleteToDo)); //setItem into localStorage
})

//Complete Task
let checkBoxParent = document.querySelector('.incomplete-task');
checkBoxParent.addEventListener('click', (e) => {
    if(e.target.getAttribute('type')==='checkbox') //if user Click on checkbox 
    {
    targetElement = e.target.parentElement.parentElement //grandparent
    nodeText = targetElement.textContent; //storing textContent of element before removing
    targetElement.remove() //remove from dom

    let pElement = document.createElement('p')
    pElement.innerText = nodeText;
    pElement.innerHTML += `<button type="submit" class="delete-btn">Delete</button>`;
    document.querySelector('.complete-task').append(pElement) //by deafult add new node at the end

    completeToDo.push({name: nodeText}) //push into completeToDo array
    localStorage.setItem('completeToDo', JSON.stringify(completeToDo)); //setItem into browsers local storeage

    //remove from completeToDo 
    let arr = incompleteToDo.filter((e)=>(
        e.name !== nodeText //return rest of the item except nodeText
    ))

    localStorage.setItem('incompleteToDo',JSON.stringify(arr))  //then update the result into localStorage incompleteToDo
    }
})


//append the elements into completeToDo Area
completeToDo.forEach((element) => {
    nodeText = element.name;
    let pElement = document.createElement('p')
    pElement.innerText = nodeText;
    pElement.innerHTML += `<button type="submit" class="delete-btn">Delete</button>`;
    document.querySelector('.complete-task').append(pElement) //by deafult add new node at the end
});


//append the elements into incompleteToDo Area
incompleteToDo.forEach((element) => {
    let pElement = document.createElement('p')
    pElement.innerHTML += `<label class="cmplt-cbox"><input type="checkbox" />${element.name}</label>`;
    document.querySelector('.incomplete-task').append(pElement)
});


//Delete Items
let completeTaskParent = document.querySelector('.complete-task'); //adding eventlistener to whole div so that dynamically created nodes also have eventlistener
completeTaskParent.addEventListener('click',(e)=>{
    if(e.target.textContent === 'Delete') //only trigger when click on delete button
    {
        let item = e.target.parentElement.textContent.split('Delete')[0]
        targetElementx = e.target.parentElement.remove()
        let arr = completeToDo.filter((e)=>(
            e.name !== item
        ))
       localStorage.setItem('completeToDo',JSON.stringify(arr))
    }
})






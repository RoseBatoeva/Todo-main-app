// 'use strict';

const input = document.querySelector('input'),
      btnAllItems = document.querySelector('#all-items'),
      btnActiveItems = document.querySelector('#active-items'),
      btnCompletedItems = document.querySelector('#completed-items');

// function addNewTodo() {

//     input.addEventListener('keydown', (e) => {

//         let todo = document.createElement('div');
//         todo.className = 'todo';
//         todo.innerHTML = `${input.value}`;
        
//         let circle = document.createElement('div');
//         circle.className = 'emptyCircle';
//         todo.prepend(circle);
    
//         let iconCheck = document.createElement('img');
//         iconCheck.src = "img/icon-check.svg";
//         iconCheck.alt = "icon-check";
//         iconCheck.className = 'icon-check hidden';
//         circle.append(iconCheck);
    
//         let img = document.createElement('img');
//         img.src = "img/icon-cross.svg";
//         img.alt = 'icon-cross';
//         img.className = 'close-button hidden';
//         todo.append(img);

//         if (e.key === "Enter") {
//             if (input.value == '') {
//                 alert('Create a new todo (:');
//             } else {
//                 document.querySelector('.todo-list__items').append(todo);
//                 input.value = '';
//             }
//         }

//         todo.addEventListener('mouseover', ()=> {
//             img.classList.remove('hidden');
//         });
    
//         todo.addEventListener('mouseout', ()=> {
//             img.classList.add('hidden');
//         });
    
//         img.addEventListener('click', (e) => {
//             e.target.parentElement.remove();
//         });

        // circle.addEventListener('click', () =>{
        //     todo.classList.toggle('checked');
        //     circle.classList.toggle('checked-circle');
        //     iconCheck.classList.toggle('hidden');
        // });

//         btnActiveItems.addEventListener('click', () => {
//             if (!todo.classList.contains('checked')) {
                
//             }


//         });

//     });
// }

// addNewTodo();



class Todo {
    constructor (title) {
        this.title = title;
        this.checked = false;
    }
    
    render () {
        const todo = document.createElement('div');

        todo.innerHTML = `
        <div class="todo">
            <div class="emptyCircle">
                <img src="img/icon-check.svg" alt="icon-check" class="icon-check hidden">
            </div>
            ${this.title}
            <img src="img/icon-cross.svg" alt="icon-cross" class="close-button hidden">
        </div>`;
        
        return todo;
    }
}

const newTodo1 = new Todo ("Thomas");
const newTodo2 = new Todo ("Rose");

let todoArray = [];

todoArray.push(newTodo1);
todoArray.push(newTodo2);

function addNewTodo() {

    input.addEventListener('keydown', (e) => {

        if (e.key === "Enter") {
            if (input.value == '') {
                alert('Create a new todo (:');
            } else {
                document.querySelector('.todo-list__items').append(todo);
                    input.value = '';
            }
    }
});




































const itemTitle = document.querySelector('.todo-list__title'),
      listOfItems = document.querySelector('.todo-list__items'),
      btnFilterAllItems = document.querySelector('.todo-list__filter--all'),
      btnFilterActive = document.querySelector('.todo-list__filter--active'), 
      btnFilterCompleted = document.querySelector('.todo-list__filter--completed'),
      btnClearCompleted = document.querySelector('.todo-list__filter--clear-completed'),
      btnToggleTheme = document.querySelector('.header__btn-theme'),
      counterContent = document.querySelector('.counter');

let todos = listOfItems.children;
let counter = 0;

class Todo {
    constructor (title) {
        this.title = title;
    }
    
    render () {
        const todo = document.createElement('div');
        todo.className = 'todo-list__todo';
        todo.innerHTML = `
            <div class="emptyCircle"></div>          
            <div class = 'todo-list__todo-content'>${this.title}</div>
            <img src="img/icon-cross.svg" alt="icon-cross" class="todo-list__todo-delete-btn hidden">
        `;
        
        return todo;
    }
}

//Create a new element-todo.
function createTodo() {
    const newDiv = new Todo (itemTitle.value);
    const newTodo = newDiv.render(); 
    
    listOfItems.append(newTodo);

    itemTitle.value = '';
    return newTodo;
}

//Add new created element to the list if click on "Enter";
function addTodo() {
    itemTitle.addEventListener('keydown', (e) => {
        if (e.key == "Enter") {
            if (itemTitle.value !== '') {
                createTodo();

                // //Drag and drop
                // dragAndDrop();

                //Counter
                counter = counter + 1;
                counterContent.textContent = counter;
            } else {
                alert('Please write a new todo');
            }
        }
    });
}

addTodo();

//Add hovering to a close button

function toggleCloseButton() {
    listOfItems.addEventListener('mouseover', (e) => {
        if(e.target.classList.contains('todo-list__todo')) {
            e.target.lastElementChild.classList.remove('hidden');
        }
    });
    
    listOfItems.addEventListener('mouseout', (e) => {
        if(e.target.classList.contains('todo-list__todo')) {
            e.target.lastElementChild.classList.add('hidden');
        }
    });
}

toggleCloseButton();

//Toggle to checked classes if click on checkmark 

function checkTodo() {
    listOfItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('emptyCircle')) {
            e.target.classList.toggle('checked-circle');
            e.target.parentElement.classList.toggle('checked');

                //Counter 
                if (e.target.className == 'emptyCircle checked-circle') {
                    counter = counter - 1;
                    counterContent.textContent = counter;
                } else if (e.target.className == 'emptyCircle') {
                    counter = counter + 1;
                    counterContent.textContent = counter;
                }
        }; 
    });
}

checkTodo();

//Delete item if click on close button

function deleteTodo() {
    listOfItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('todo-list__todo-delete-btn')) {
            e.target.parentElement.remove();

            //Counter
            if (e.target.parentElement.className == 'todo-list__todo') {
                counter = counter - 1;
                counterContent.textContent = counter; 
            }
        }
    });
}

deleteTodo();

//Filter

btnFilterAllItems.addEventListener('click', () => {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].classList.contains('todo-list__todo')) {
            todos[i].style.display="flex";
        }
    }
});

function filter(styleFirst,styleSecond) {
    for (let i = 0; i < todos.length; i++) {
        if (!todos[i].classList.contains('checked')) {
            todos[i].style.display = styleFirst;
        } else if (todos[i].classList.contains('checked')) {
            todos[i].style.display = styleSecond;
        }
    }
}

btnFilterActive.addEventListener('click', () => {
    filter("flex", "none");
});

btnFilterCompleted.addEventListener('click', () => {
    filter('none', "flex");
});

//Button "clear completed"

function clearCompleted() {
    btnClearCompleted.addEventListener('click', () => {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].classList.contains('checked')) {
                todos[i].remove();
            }
        }
    });  
}

clearCompleted();

//Toggle dark mode

if(!localStorage.theme) localStorage.theme ='lightMode'
document.body.className = localStorage.theme;
btnToggleTheme.firstElementChild.src = document.body.classList.contains('darkTheme') ? 'img/icon-sun.svg' : 'img/icon-moon.svg';

btnToggleTheme.onclick = () => {
    document.body.classList.toggle('darkTheme');
    btnToggleTheme.firstElementChild.src = document.body.classList.contains('darkTheme') ? 'img/icon-sun.svg' : 'img/icon-moon.svg';

    localStorage.theme = document.body.className || 'lightMode';
};

//Drag and drop

// function dragAndDrop() {

//     //1. Let's allow dragging of elements
//     for (let i = 0; i < todos.length; i++) {
//         todos[i].draggable = true;
//     }
    
//     // 2. Adding an event to the starting and end of the drag
//     for (let i = 0; i < todos.length; i++) {
//         todos[i].addEventListener(`dragstart`, (e) => {
//             e.target.classList.add(`selected`);
//         })
//     }
    
//     for (let i = 0; i < todos.length; i++) {
//         todos[i].addEventListener(`dragend`, (e) => {
//             e.target.classList.remove(`elected`);
//         })
//     }
//     // 3.Implementing the drag and drop logic
// }


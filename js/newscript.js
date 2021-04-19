const input = document.querySelector('input');

class Todo {
    constructor (title) {
        this.title = title;
    }
    
    render () {
        const todo = document.createElement('div');
        todo.className = 'todo';
        todo.innerHTML = `
            <div class="emptyCircle">
                <img src="img/icon-check.svg" alt="icon-check" class="check-button hidden">
            </div>          
                <div>${this.title}</div>
                <img src="img/icon-cross.svg" alt="icon-cross" class="close-button hidden">
        `;
        
        return todo;
    }
}

//Create a new element-todo.
function createTodo() {
    const newDiv = new Todo (input.value);
    const newTodo = newDiv.render(); 
    
    document.querySelector(".todo-list__items").append(newTodo);

    input.value = '';
    return newTodo;
}

//Add new created element to the list if click on "Enter";
function addTodo() {
    input.addEventListener('keydown', (e) => {
        if (e.key == "Enter") {
            if (input.value !== '') {
                createTodo();
            } else {
                alert('Please write a new todo');
            }
        }
    });
}

addTodo();

//Add hovering to a close button

const listTodo = document.querySelector('.todo-list__items');

function toggleCloseButton() {
    listTodo.addEventListener('mouseover', (e) => {
        if(e.target.classList.contains('todo')) {
            e.target.lastElementChild.classList.remove('hidden');
        }
    });
    
    listTodo.addEventListener('mouseout', (e) => {
        if(e.target.classList.contains('todo')) {
            e.target.lastElementChild.classList.add('hidden');
        }
    });
}

toggleCloseButton();

//Toggle checked classes if click on checkmark 

function checkTodo() {
    listTodo.addEventListener('click', (e) => {
        if(e.target.classList.contains('emptyCircle')) {
            e.target.classList.toggle('checked-circle');
            e.target.firstElementChild.classList.toggle('hidden');
            e.target.parentElement.classList.toggle('checked');
        }; 
    });
}

checkTodo();

//Delete item if click on close button

function deleteTodo() {
    listTodo.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-button')) {
            e.target.parentElement.remove();
        }
    });
}

deleteTodo();

//Filter

const allItemsBtn = document.querySelector('#all-items'),
      activeItemsBtn = document.querySelector('#active-items'), //doesnt have checked class
      completedItemsBtn = document.querySelector('#completed-items'); // has checked class

let todos = listTodo.children;

allItemsBtn.addEventListener('click', () => {
    for (let i=0; i<todos.length; i++) {
        if (todos[i].classList.contains('todo')) {
            todos[i].style.display="flex";
        }
    }
});

function filter(styleFirst,styleSecond) {
    for (let i=0; i<todos.length; i++) {
        if (!todos[i].classList.contains('checked')) {
            todos[i].style.display = styleFirst;
        } else if (todos[i].classList.contains('checked')) {
            todos[i].style.display = styleSecond;
        }
    }
}

activeItemsBtn.addEventListener('click', () => {
    filter("flex", "none");
});

completedItemsBtn.addEventListener('click', () => {
    filter('none', "flex");
});



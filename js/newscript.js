const input = document.querySelector('input');

class Todo {
    constructor (title) {
        this.title = title;
    }
    
    render () {
        const todo = document.createElement('div');

        todo.innerHTML = `
        <div class="todo">
            <div class="emptyCircle">
                <img src="img/icon-check.svg" alt="icon-check" class="check-button hidden">
            </div>          
                <div>${this.title}</div>
                <img src="img/icon-cross.svg" alt="icon-cross" class="close-button hidden">
        </div>`;
        
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
        if(e.target.className == 'todo') {
            e.target.lastElementChild.classList.remove('hidden');
        }
    });
    
    listTodo.addEventListener('mouseout', (e) => {
        if(e.target.className == 'todo') {
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
            e.target.nextElementSibling.classList.toggle('checked');
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
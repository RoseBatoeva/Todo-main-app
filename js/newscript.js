const input = document.querySelector('input');

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
                <img src="img/icon-check.svg" alt="icon-check" id ="check-button" class="hidden">
            </div>
            <div>${this.title}</div>
            <img src="img/icon-cross.svg" alt="icon-cross" id ="cross-button" class="hidden">
        </div>`;
        
        return todo;
    }
}

//Create a new element-todo.
function createTodo() {
    const newDiv = new Todo (input.value);
    const newTodo = newDiv.render(); 
    console.log(newTodo);
    
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


//Toggle checked classes if ckeci on checkmark 

listTodo.addEventListener('click', (e) => {
    if(e.target.classList.contains('emptyCircle')) {
        e.target.classList.toggle('checked-circle');
        e.target.firstElementChild.classList.toggle('hidden');
        e.target.nextElementSibling.classList.toggle('checked');
    }; 
});

//Delete item if click on close button

// listTodo.addEventListener('click', (e) => {
//     if (e.target.nextElementSibling.classList.contains('close-button')) {
//         e.target.parentElement.remove();
//     }
// });
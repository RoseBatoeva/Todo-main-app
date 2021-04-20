const input = document.querySelector('input'),
      listTodo = document.querySelector('.todo-list__items'),
      allItemsBtn = document.querySelector('#all-items'),
      activeItemsBtn = document.querySelector('#active-items'), 
      completedItemsBtn = document.querySelector('#completed-items'),
      clearCompletedBtn = document.querySelector('.todo-list__clear-completed'),
      counterText = document.querySelector('#counter');

let todos = listTodo.children;
let counter = 0;

class Todo {
    constructor (title) {
        this.title = title;
    }
    
    render () {
        const todo = document.createElement('div');
        todo.className = 'todo';
        todo.innerHTML = `
            <div class="emptyCircle"></div>          
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
                
                //Counter   
                counter = counter + 1;
                counterText.textContent = counter;
            } else {
                alert('Please write a new todo');
            }
        }
    });
}

addTodo();

//Add hovering to a close button

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

//Toggle to checked classes if click on checkmark 

function checkTodo() {
    listTodo.addEventListener('click', (e) => {
        if (e.target.classList.contains('emptyCircle')) {
            e.target.classList.toggle('checked-circle');
            e.target.parentElement.classList.toggle('checked');
        }; 
        // Counter
        if (e.target.parentElement.classList.contains('checked')){
            counter = counter - 1;
            counterText.textContent = counter;
            console.log('-1');
        } else if (e.target.parentElement.classList.contains('todo') && !e.target.parentElement.classList.contains('checked')) {
            counter = counter + 1;
            counterText.textContent = counter;
            console.log('+1');
        }
    });
}

checkTodo();

//Delete item if click on close button

function deleteTodo() {
    listTodo.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-button') && !e.target.parentElement.classList.contains('checked')) {
            e.target.parentElement.remove();

            console.log('deleted unchecked todo');
            
            counterText.textContent = counter - 1;
            
        } else if (e.target.classList.contains('close-button') && e.target.parentElement.classList.contains('checked')) {
            e.target.parentElement.remove();
            console.log('deleted checked todo');
        }
    });
}

deleteTodo();

//Filter

allItemsBtn.addEventListener('click', () => {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].classList.contains('todo')) {
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

activeItemsBtn.addEventListener('click', () => {
    filter("flex", "none");
});

completedItemsBtn.addEventListener('click', () => {
    filter('none', "flex");
});

//Button "clear completed"

function clearCompleted() {
    clearCompletedBtn.addEventListener('click', () => {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].classList.contains('checked')) {
                todos[i].remove();

                let c = 0;
                c++;
                console.log(c);
                
                // Counter
                // counter = counter - c;
                // counterText.textContent = counter;
            }
        }
    });  
}

clearCompleted();








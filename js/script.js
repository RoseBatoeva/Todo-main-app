const itemTitle = document.querySelector('.todo-list__title'),
      listOfItems = document.querySelector('.todo-list__items');
let todos = listOfItems.children;

function filter(styleFirst,styleSecond) {
    for (let i = 0; i < todos.length; i++) {
        if (!todos[i].classList.contains('checked')) {
            todos[i].style.display = styleFirst;
        } else if (todos[i].classList.contains('checked')) {
            todos[i].style.display = styleSecond;
        }
    }
}

class TodoListItem {
    constructor (title) {
        this.title = title;
        this.btnFilterAllItems = document.querySelector('.todo-list__filter--all');
        this.btnFilterActive = document.querySelector('.todo-list__filter--active'); 
        this.btnFilterCompleted = document.querySelector('.todo-list__filter--completed');
        this.btnClearCompleted = document.querySelector('.todo-list__filter--clear-completed');
        this.btnToggleTheme = document.querySelector('.btn-toggle-theme');
        this.counterContent = document.querySelector('.counter');
        this.counter = 0;
    }

    render() {       
        this.title.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                let newItem = document.createElement('div');
                newItem.className = 'todo-list__todo ';
                newItem.innerHTML = `
                    <div class="emptyCircle"></div>          
                    <div class = 'todo-list__todo-content'>${this.title.value}</div>
                    <img src="img/icon-cross.svg" alt="icon-cross" class="todo-list__todo-delete-btn hidden">
                `;

                if (this.title.value !== '') {
                    listOfItems.append(newItem);
                    this.title.value = '';

                    //Counter
                    this.counter = this.counter + 1;
                    this.counterContent.textContent = this.counter;
                } else {
                    alert('Please write a new todo');
                }
            }
        });
    }

    toggleCloseButton() {
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

    checkmarkTodo() {
        listOfItems.addEventListener('click', (e) => {
            if (e.target.classList.contains('emptyCircle')) {
                e.target.classList.toggle('checked-circle');
                e.target.parentElement.classList.toggle('checked');

                //Counter 
                if (e.target.className == 'emptyCircle checked-circle') {
                    this.counter = this.counter - 1;
                    this.counterContent.textContent = this.counter;
                } else if (e.target.className == 'emptyCircle') {
                    this.counter = this.counter + 1;
                    this.counterContent.textContent = this.counter;
                }
            }
        });
    }

    deleteTodo() {
        listOfItems.addEventListener('click', (e) => {
            if (e.target.classList.contains('todo-list__todo-delete-btn')) {
                e.target.parentElement.remove();
    
                //Counter
                if (!e.target.parentElement.classList.contains('checked')) {
                    this.counter = this.counter - 1;
                    this.counterContent.textContent = this.counter; 
                }
            }
        });
    }

    filterItems() {
        this.btnFilterAllItems.addEventListener('click', () => {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].classList.contains('todo-list__todo')) {
                    todos[i].style.display="flex";
                }
            }
        });
        
        this.btnFilterActive.addEventListener('click', () => {
            filter("flex", "none");
        });
        
        this.btnFilterCompleted.addEventListener('click', () => {
            filter('none', "flex");
        });
      
        this.btnClearCompleted.addEventListener('click', () => {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].classList.contains('checked')) {
                todos[i].remove();
                }
            }
        });   
    }

    toggleDarkMode() {
        if(!localStorage.theme) localStorage.theme ='lightMode';
        document.body.className = localStorage.theme;
        this.btnToggleTheme.firstElementChild.src = document.body.classList.contains('darkTheme') ? 'img/icon-sun.svg' : 'img/icon-moon.svg';

        this.btnToggleTheme.onclick = () => {
            document.body.classList.toggle('darkTheme');
            this.btnToggleTheme.firstElementChild.src = document.body.classList.contains('darkTheme') ? 'img/icon-sun.svg' : 'img/icon-moon.svg';

            localStorage.theme = document.body.className || 'lightMode';
        };
    }
}

const todo = new TodoListItem(itemTitle);
todo.render();
todo.toggleCloseButton();
todo.checkmarkTodo();
todo.deleteTodo();
todo.filterItems();
todo.toggleDarkMode();

//Drag and drop

function dragAndDrop() {

    //1. Let's allow dragging of elements
    for (let i = 0; i < todos.length; i++) {
        todos[i].draggable = true;
    }
    
    // 2. Adding an event to the starting and end of the drag
    for (let i = 0; i < todos.length; i++) {
        todos[i].addEventListener(`dragstart`, (e) => {
            e.target.classList.add(`selected`);
        })
    }
    
    for (let i = 0; i < todos.length; i++) {
        todos[i].addEventListener(`dragend`, (e) => {
            e.target.classList.remove(`elected`);
        })
    }

    // 3.Implementing the drag and drop logic
}


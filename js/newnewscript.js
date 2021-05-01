const itemTitle = document.querySelector('.todo-list__title'),
      listOfItems = document.querySelector('.todo-list__items'),
      btnFilterAllItems = document.querySelector('.todo-list__filter--all'),
      btnFilterActive = document.querySelector('.todo-list__filter--active'), 
      btnFilterCompleted = document.querySelector('.todo-list__filter--completed'),
      btnClearCompleted = document.querySelector('.todo-list__filter--clear-completed'),
      btnToggleTheme = document.querySelector('.btn-toggle-theme'),
      counterContent = document.querySelector('.counter');

let todos = listOfItems.children;
let counter = 0;

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
                    counter = counter + 1;
                    counterContent.textContent = counter;
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
                    counter = counter - 1;
                    counterContent.textContent = counter;
                } else if (e.target.className == 'emptyCircle') {
                    counter = counter + 1;
                    counterContent.textContent = counter;
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
                    counter = counter - 1;
                    counterContent.textContent = counter; 
                }
            }
        });
    }

    filterItems() {
        btnFilterAllItems.addEventListener('click', () => {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].classList.contains('todo-list__todo')) {
                    todos[i].style.display="flex";
                }
            }
        });
        
        btnFilterActive.addEventListener('click', () => {
            filter("flex", "none");
        });
        
        btnFilterCompleted.addEventListener('click', () => {
            filter('none', "flex");
        });

      
        btnClearCompleted.addEventListener('click', () => {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].classList.contains('checked')) {
                todos[i].remove();
                }
            }
        });  
        
    }
}

const todo = new TodoListItem(itemTitle);
todo.render();
todo.toggleCloseButton();
todo.checkmarkTodo();
todo.deleteTodo();
todo.filterItems();

//Toggle dark mode

if(!localStorage.theme) localStorage.theme ='lightMode'
document.body.className = localStorage.theme;
btnToggleTheme.firstElementChild.src = document.body.classList.contains('darkTheme') ? 'img/icon-sun.svg' : 'img/icon-moon.svg';

btnToggleTheme.onclick = () => {
    document.body.classList.toggle('darkTheme');
    btnToggleTheme.firstElementChild.src = document.body.classList.contains('darkTheme') ? 'img/icon-sun.svg' : 'img/icon-moon.svg';

    localStorage.theme = document.body.className || 'lightMode';
};
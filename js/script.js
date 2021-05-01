function filter(styleFirst,styleSecond,arr) {
    for (let i = 0; i < arr.length; i++) {
        if (!arr[i].classList.contains('checked')) {
            arr[i].style.display = styleFirst;
        } else if (arr[i].classList.contains('checked')) {
            arr[i].style.display = styleSecond;
        }
    }
}

class TodoListItem {
    constructor (title) {
        this.title = title; 
        this.listOfItems = document.querySelector('.todo-list__items');
        this.btnFilterAllItems = document.querySelector('.todo-list__filter--all');
        this.btnFilterActive = document.querySelector('.todo-list__filter--active'); 
        this.btnFilterCompleted = document.querySelector('.todo-list__filter--completed');
        this.btnClearCompleted = document.querySelector('.todo-list__filter--clear-completed');
        this.btnToggleTheme = document.querySelector('.btn-toggle-theme');
        this.counterContent = document.querySelector('.counter');
        this.counter = 0;
        this.todos = this.listOfItems.children;
    }

    render() {       
        this.title.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                let newItem = document.createElement('div');
                newItem.className = 'todo-list__todo';
                newItem.innerHTML = `
                    <div class="emptyCircle"></div>          
                    <div class = 'todo-list__todo-content'>${this.title.value}</div>
                    <img src="img/icon-cross.svg" alt="icon-cross" class="todo-list__todo-delete-btn hidden">
                `;

                //Drag and drop
                newItem.draggable = true;

                if (this.title.value !== '') {
                    this.listOfItems.append(newItem);
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
        this.listOfItems.addEventListener('mouseover', (e) => {
            if(e.target.classList.contains('todo-list__todo')) {
                e.target.lastElementChild.classList.remove('hidden');
            }
        });
    
        this.listOfItems.addEventListener('mouseout', (e) => {
            if(e.target.classList.contains('todo-list__todo')) {
                e.target.lastElementChild.classList.add('hidden');
            }
        });
    }

    checkmarkTodo() {
        this.listOfItems.addEventListener('click', (e) => {
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
        this.listOfItems.addEventListener('click', (e) => {
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
            for (let i = 0; i < this.todos.length; i++) {
                if (this.todos[i].classList.contains('todo-list__todo')) {
                    this.todos[i].style.display="flex";
                }
            }
        });
        
        this.btnFilterActive.addEventListener('click', () => {
            filter("flex", "none", this.todos);
        });
        
        this.btnFilterCompleted.addEventListener('click', () => {
            filter('none', "flex", this.todos);
        });
      
        this.btnClearCompleted.addEventListener('click', () => {
            for (let i = 0; i < this.todos.length; i++) {
                if (this.todos[i].classList.contains('checked')) {
                this.todos[i].remove();
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

    dragAndDrop() {
        //Adding an event to the beginning and end of the drag
        this.listOfItems.addEventListener(`dragstart`, (e) => {
            e.target.classList.add(`selected`);
        });
          
        this.listOfItems.addEventListener(`dragend`, (e) => {
            e.target.classList.remove(`selected`);
        });

        //Implementing the drag and drop logic
        this.listOfItems.addEventListener(`dragover`, (e) => {
            // Разрешаем сбрасывать элементы в эту область
            e.preventDefault();
          
            // Находим перемещаемый элемент
            const activeElement = this.listOfItems.querySelector(`.selected`);
            // Находим элемент, над которым в данный момент находится курсор
            const currentElement = e.target;
            // Проверяем, что событие сработало:
            // 1. не на том элементе, который мы перемещаем,
            // 2. именно на элементе списка
            const isMoveable = activeElement !== currentElement &&
              currentElement.classList.contains(`todo-list__todo`);
          
            // Если нет, прерываем выполнение функции
            if (!isMoveable) {
              return;
            }
          
            // Находим элемент, перед которым будем вставлять
            const nextElement = (currentElement === activeElement.nextElementSibling) ?
                currentElement.nextElementSibling :
                currentElement;
          
            // Вставляем activeElement перед nextElement
            this.listOfItems.insertBefore(activeElement, nextElement);
          });
    }
}

const itemTitle = document.querySelector('.todo-list__title');
const todo = new TodoListItem(itemTitle);
todo.render();
todo.toggleCloseButton();
todo.checkmarkTodo();
todo.deleteTodo();
todo.filterItems();
todo.toggleDarkMode();
todo.dragAndDrop();




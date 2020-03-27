document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /*
        Проблема: Если 2 елемента имеют одно имя, то в готовый списак перемещаются оба(localStorage)
    */

    const headerInput = document.querySelector('.header-input'),
        todo = document.getElementById('todo'); //список - в работе

    //создание элемената
    const createList = (text, position) => {
        const todoListItem = position.querySelectorAll('li')[0];
        //li elem
        const newItem = document.createElement('li');
        newItem.classList.add('todo-item');
        newItem.textContent = text;
        position.insertBefore(newItem, todoListItem);

        //btn del and check
        const todoBtn = document.createElement('div'),
            todoRemove = document.createElement('button'),
            todoComplete = document.createElement('button');

        todoBtn.classList.add('todo-buttons');
        todoRemove.classList.add('todo-remove');
        todoComplete.classList.add('todo-complete');

        newItem.append(todoBtn);
        todoBtn.append(todoRemove);
        todoBtn.append(todoComplete);
    };

    //добавление элемента
    const addListStorage = () => {
        createList(headerInput.value, todo);

        let arrListName = [],
            storageList = localStorage.getItem('todo');

        if (localStorage.todo) {
            arrListName.push(storageList);
            arrListName.push(headerInput.value);
        } else arrListName.push(headerInput.value);
        localStorage.setItem('todo', arrListName);
    };

    //удаление элемента
    const removeListStorage = (target) => {

        let newArr = [],
            newArrCompleted = [];
        const todoStorage = localStorage.getItem('todo').split(','),
            completedList = localStorage.getItem('todoCompleted').split(',');

        if (target.closest('ul').id === 'todo') {

            todoStorage.forEach((item) => {
                if (item !== target.closest('li').textContent) { newArr.push(item); }
            });
            localStorage.setItem('todo', newArr);

        } else if (target.closest('ul').id === 'completed') {
            completedList.forEach((item) => {
                if (item !== target.closest('li').textContent) { newArrCompleted.push(item); }
            });
            localStorage.setItem('todoCompleted', newArrCompleted);
        }

        target.closest('li').remove();

    };

    //готовность элемента
    const completeList = (target) => {
        const completedList = document.getElementById('completed'),
            completedListItem = completedList.querySelectorAll('li')[0];

        completedList.insertBefore(target.closest('li'), completedListItem);

        let newTodoList = [],
            newTodoCompletedList = [];
        const todoStorage = localStorage.getItem('todo').split(',');


        const todoCompleted = localStorage.getItem('todoCompleted');
        if (localStorage.todoCompleted) { newTodoCompletedList.push(todoCompleted); }


        todoStorage.forEach((item) => {
            if (item !== target.closest('li').textContent) { newTodoList.push(item); }
            else newTodoCompletedList.push(item)
        });

        localStorage.setItem('todo', newTodoList);
        localStorage.setItem('todoCompleted', newTodoCompletedList);

    };

    //правки - перенос элемента в первоначальное состояние
    const resetList = (target) => {
        const todo = document.getElementById('todo'),
            todoList = todo.querySelectorAll('li')[0];


        todo.insertBefore(target.closest('li'), todoList);


        let newTodoList = [],
            newTodoCompletedList = [],
            todoStorage = localStorage.getItem('todo').split(','),
            todoCompletedStorage = localStorage.getItem('todoCompleted').split(',');

        if (localStorage.todo) { newTodoList.push(todoStorage) }

        todoCompletedStorage.forEach((item) => {
            if (item !== target.closest('li').textContent) { newTodoCompletedList.push(item)}
            else newTodoList.push(item)
        });


        localStorage.setItem('todo', newTodoList);
        localStorage.setItem('todoCompleted', newTodoCompletedList);

    };

    //загрузка данных на страницу
    const loadListStorage = () => {
        if (localStorage.getItem('todo')) {
            const todoStorage = localStorage.getItem('todo').split(','),
                list = document.getElementById('todo');
            todoStorage.forEach(item => createList(item, list));
        }

        if (localStorage.getItem('todoCompleted')) {
            const todoStorageCompleted = localStorage.getItem('todoCompleted').split(','),
                list = document.getElementById('completed');
            todoStorageCompleted.forEach(item => createList(item, list));
        }
    };
    loadListStorage();


    //события
    document.addEventListener('click', (e) =>{
        e.preventDefault();
        const target = e.target;

        if (target.matches('#add')) { addListStorage() }
        if (target.matches('.todo-remove')) { removeListStorage(target) }

        if (target.matches('.todo-complete') && (target.closest('ul').id === 'todo')) { completeList(target) }
        else if (target.matches('.todo-complete') && (target.closest('ul').id === 'completed')) { resetList(target) }
    });
});
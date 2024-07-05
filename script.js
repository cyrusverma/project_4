document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('todo-list');
    
    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    const saveTasks = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    const renderTasks = () => {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
          <span>${task.text}</span>
          <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        `;
        taskList.appendChild(li);
  
        li.querySelector('.complete').addEventListener('click', () => {
          tasks[index].completed = !tasks[index].completed;
          saveTasks();
          renderTasks();
        });
  
        li.querySelector('.edit').addEventListener('click', () => {
          const newText = prompt('Edit your task', task.text);
          if (newText) {
            tasks[index].text = newText;
            saveTasks();
            renderTasks();
          }
        });
  
        li.querySelector('.delete').addEventListener('click', () => {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
        });
      });
    };
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newTask = taskInput.value.trim();
      if (newTask) {
        tasks.push({ text: newTask, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
      }
    });
  
    renderTasks();
  });
  
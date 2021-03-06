const tasklist = document.querySelector('.tasklist');
const newTaskForm = tasklist.querySelector('form');


const generateUnique = length =>
	Math.random().toString(36).substring(2, 2 + length);

const makeTask = value => {
	const id = generateUnique(5);
	const taskContainer = tasklist.querySelector('.tasks');
	const task = document.createElement('li');
	task.classList.add('task');

	task.innerHTML = DOMPurify.sanitize(`
    <input type="checkbox" class="vh" id="task-${id}" name="task-${id}">
    <label for="task-${id}">
      <svg viewBox="0 0 20 15">
        <title>Done</title>
        <path d="M0 8l2-2 5 5L18 0l2 2L7 15z" fill="currentColor" fill-rule="nonzero" />
      </svg>
    </label>
    <div>${value}</div>
    <button class="task__trash">
      <svg viewBox="0 0 16 20">
        <title>Trash</title>
        <path d="M4 2l2-2h4l2 2h4v2H0V2h4zM1 6h14l-1 14H2L1 6zm5 2v10h1V8H6zm3 0v10h1V8H9z" fill="currentColor" fill-rule="nonzero" />
      </svg>
    </button>
	`);
	taskContainer.appendChild(task);

	taskContainer.addEventListener('click', event => {
		const { target } = event;
		if (!target.matches('button')) return;

		const task = target.parentElement;
		taskContainer.removeChild(task);
	});


};

newTaskForm.addEventListener('submit', event => {
	event.preventDefault();
	const form = event.target;
	const input = form.elements.add;
	const task = input.value.trim();

	if (!task) return;

	makeTask(task);
	input.value = '';
	input.focus();

});
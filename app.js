// Получение элементов HTML
const form = document.getElementById("form");
const noteInput = document.getElementById("note");
const notesList = document.getElementById("notes");

// Обработчик отправки формы
form.addEventListener("submit", (e) => {
	e.preventDefault(); // Предотвращение отправки по умолчанию
	const note = noteInput.value;
	if (note) {
		const noteElement = document.createElement("div"); // Создание элемента заметки
		noteElement.classList.add("note");
		noteElement.innerHTML = `
		<p>${note}</p>
		<button class='delete button button_delete'>&#10006;</button>
		`;
		notesList.appendChild(noteElement); // Добавление заметки в список

		// Сохранение заметки в localStorage
		const notes = JSON.parse(localStorage.getItem("notes")) || [];
		notes.push(note);
		localStorage.setItem("notes", JSON.stringify(notes));

		noteInput.value = ""; // Очистка поля для ввода заметки
	}
});

// Обработчик удаления заметки
notesList.addEventListener("click", (e) => {
	if (e.target.classList.contains("delete")) {
		const noteElement = e.target.parentElement;
		const noteText = noteElement.querySelector("p").textContent;

		// Удаление заметки из списка
		noteElement.remove();

		// Удаление заметки из localStorage
		const notes = JSON.parse(localStorage.getItem("notes")) || [];
		const index = notes.indexOf(noteText);
		if (index > -1) {
			notes.splice(index, 1);
		}
		localStorage.setItem("notes", JSON.stringify(notes));
	}
});

// Восстановление заметок из localStorage при загрузке страницы
const notes = JSON.parse(localStorage.getItem("notes")) || [];
notes.forEach((note) => {
	const noteElement = document.createElement("div");
	noteElement.classList.add("note");
	noteElement.innerHTML = `
		<p>${note}</p>
		<button class='delete button button_delete'>&#10006;</button>
		`;
	notesList.appendChild(noteElement);
});
// Добавление заметки при нажатии на Enter
// noteInput.addEventListener("keydown", (e) => {
// 	if (e.key === "Enter") {
// 		e.preventDefault();
// 	}
// });

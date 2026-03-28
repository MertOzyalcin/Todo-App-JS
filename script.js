// header-meta GET Time Zone
const headerMeta = document.querySelector(".header-meta");

// ------------- TAKING DATE --------------
// Taking Local Time with Temporal()
const localTime = Temporal.Now.zonedDateTimeISO();

const dayNum = localTime.day;
const monthNum = localTime.month;
const yearNum = localTime.year;

// Convert monthName and dayName to string
const monthName = localTime.toLocaleString(undefined, { month: 'long'});
const dayName = localTime.toLocaleString(undefined, { weekday: 'long'});

// Appear on user's screen
headerMeta.innerHTML = `${dayName} · ${dayNum} ${monthName} ${yearNum}`;

// -------------- CREATING NEW TODO -------------------
const inputValue = document.querySelector(".add-input");
const timeValue = document.querySelector(".add-time");
const subjectValue = document.querySelector(".add-select.subject");
const priorityValue = document.querySelector(".add-select.priority");
const addButton = document.querySelector(".add-btn");
let count = 0; // ID Counter

// Taking Values

addButton.addEventListener("click", () => {
    // Taking Values
    const text = inputValue.value;
    const time = timeValue.value;
    const subject = subjectValue.value;
    const priority = priorityValue.value;
    const numTime = parseFloat(time);

    const id = `t${count++}`
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = id;
    input.className = "todo-check";

    const label = document.createElement("label");
    label.htmlFor = id;
    label.className = "todo-item";
    label.innerHTML = `
          <span class="priority priority-${priority}"></span>
      <span class="box"></span>
      <span class="body">
        <span class="task-text">${text}</span>
        <span class="task-meta">
          <span class="tag">${subject}</span>
          <span class="time">${time}</span>
        </span>
      </span>
      <span class="actions">
        <button class="btn-action btn-edit">edit</button>
        <button class="btn-action btn-delete">del</button>
      </span>
    `;

    const todoList = document.querySelectorAll(".todo-list");

    if (numTime < 13.00 ) {
        todoList[0].appendChild(input);
        todoList[0].appendChild(label);
    }
    else if (numTime < 18.00) {
        todoList[1].appendChild(input);
        todoList[1].appendChild(label);
    }
    else {
        todoList[2].appendChild(input);
        todoList[2].appendChild(label); 
    }
});
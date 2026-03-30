// header-meta GET Time Zone
const headerMeta = document.querySelector(".header-meta");
const statMonth = document.querySelectorAll(".stat-value");

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
statMonth[2].innerHTML = `${monthName}`;

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
    updateFooter();
    updateProgress();
});

// -------- DELETE & EDİT & SAVE ---------
document.addEventListener("click", (event) => {
  // DELETE
  if (event.target.matches(".btn-action.btn-delete")) {
    const label = event.target.closest(".todo-item");
    const input = label.previousElementSibling;

    label.remove();
    input.remove();
    updateProgress();
  }
  
// EDIT
  if (event.target.matches(".btn-action.btn-edit")) {
    const label = event.target.closest(".todo-item");
    const listText = label.querySelector(".task-text");
    const priority = label.querySelector(".priority");
    const tag = label.querySelector(".tag");
    const time = label.querySelector(".time");

    label.innerHTML = `
      <div class="add-section">
        <input type="text" class="add-input" placeholder="Task name..." contenteditable="true" value="${listText.textContent}">
        <div class="add-row">
          <select class="add-select subject">
            <option value="Work" ${tag.textContent === "Work" ? "selected" : ""}>Work</option>
            <option value="Personal" ${tag.textContent === "Personal" ? "selected" : ""}>Personal</option>
            <option value="Health" ${tag.textContent === "Health" ? "selected" : ""}>Health</option>
            <option value="Home" ${tag.textContent === "Home" ? "selected" : ""}>Home</option>
          </select>
          <input type="time" class="add-time" value="${time.textContent}"/>
          <select class="add-select priority-select">
            <option value="high" ${priority.classList.contains("priority-high") ? "selected" : ""}>● High</option>
            <option value="mid" ${priority.classList.contains("priority-mid") ? "selected" : ""}>● Mid</option>
            <option value="low" ${priority.classList.contains("priority-low") ? "selected" : ""}>● Low</option>
          </select>
          <button class="btn-action btn-save">save</button>
        </div>
      </div>  
    `
    updateFooter();
  }

  // SAVE
  if (event.target.matches(".btn-action.btn-save")) {
    const label = event.target.closest(".todo-item");
    const input = label.previousElementSibling;
    const listText = label.querySelector(".add-input").value;
    const priority = label.querySelector(".priority-select").value; 
    const tag = label.querySelector(".add-select.subject").value;
    const time = label.querySelector(".add-time").value;
    const timeNum = parseFloat(time);

    label.innerHTML = `
      <span class="priority priority-${priority}"></span>
      <span class="box"></span>
      <span class="body">
        <span class="task-text">${listText}</span>
        <span class="task-meta">
          <span class="tag">${tag}</span>
          <span class="time">${time}</span>
        </span>
      </span>
      <span class="actions">
        <button class="btn-action btn-edit">edit</button>
        <button class="btn-action btn-delete">del</button>
      </span>
    `;

    const todoLists = document.querySelectorAll(".todo-list");
    if (timeNum < 13.00 ) {
      todoLists[0].appendChild(input);
      todoLists[0].appendChild(label);
    }
    else if (timeNum < 18.00) {
      todoLists[1].appendChild(input);
      todoLists[1].appendChild(label);
    }
    else {
      todoLists[2].appendChild(input);
      todoLists[2].appendChild(label); 
    }

    updateFooter();
  }
});

// ----------- PROGRESS BAR -------------
const progressFill = document.querySelector(".progress-fill");

function updateProgress() {
  const total = document.querySelectorAll(".todo-check").length;
  const checked = document.querySelectorAll(".todo-check:checked").length;
  const perc = (checked / total) * 100;
  progressFill.style.width = perc + "%";

  if (total === 0) {
    progressFill.style.width = "0%";
  }
}

document.addEventListener("change", (event) => {
  if (event.target.matches(".todo-check")) {
    updateProgress();
  }
});

// -------- FOOTER VALUES ----------
function updateFooter() {
  const totalTODOS = document.querySelectorAll(".todo-check").length;
  const highPriority = document.querySelectorAll(".priority-high").length;
  
  document.querySelectorAll(".stat-value")[0].innerHTML = totalTODOS;
  document.querySelectorAll(".stat-value")[1].innerHTML = highPriority;
}

let toDoData = localStorage.getItem('toDoData') ? JSON.parse(localStorage.getItem('toDoData')) :  [];
let completedData = localStorage.getItem('completedData') ? JSON.parse(localStorage.getItem('completedData')) :  [];

console.log(toDoData, 1, completedData);

const createToDOList = (data, ul, flag) => {
  if (flag) {
    ul.innerHTML = '';
  }
  toDo.innerHTML = `ToDo (${data.length})`;
  data.forEach((el) => {
    if (document.getElementById(el.id)) return;
    const li = `<li class="list-group-item d-flex w-100 mb-2" id="${el.id}" style="background: ${el.color};">
                    <div class="w-100 mr-2">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">${el.title}</h5>
                            <div>
                                <small class="mr-2">${el.priority} priority</small>
                                <small>${el.time}</small>
                            </div>

                        </div>
                        <p class="mb-1 w-100">${el.text}</p>
                    </div>
                    <div class="dropdown m-2 dropleft">
                        <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
                        </button>
                        <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                            <button type="button" class="btn btn-success w-100" onclick="toCompleted(${el.id})">Complete</button>
                            <button type="button" class="btn btn-info w-100 my-2" onclick="editLi(${el.id})">Edit</button>
                            <button type="button" class="btn btn-danger w-100" onclick="deleteLi(${el.id})">Delete</button>
                        </div>
                    </div>
                </li>`;
    ul.insertAdjacentHTML('beforeend', li);
  });
}

const createCompletedList = (data, ul, flag) => {
  if (flag) {
    ul.innerHTML = '';
  }
  completed.innerHTML = `Completed (${data.length})`;
  data.forEach((el) => {
    if (document.getElementById(el.id)) return;
    const li = `<li class="list-group-item d-flex w-100 mb-2" id="${el.id}" style="background: ${el.color};">
                    <div class="w-100 mr-2">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">${el.title}</h5>
                            <div>
                                <small class="mr-2">${el.priority} priority</small>
                                <small>${el.time}</small>
                            </div>

                        </div>
                        <p class="mb-1 w-100">${el.text}</p>
                    </div>
                    <div class="dropdown m-2 dropleft">
                        <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
                        </button>
                        <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                            <button type="button" class="btn btn-danger w-100" onclick="deleteLi(${el.id})">Delete</button>
                        </div>
                    </div>
                </li>`;
    ul.insertAdjacentHTML('beforeend', li);
  });
}

const toDoList = document.getElementById('currentTasks');
const completedList = document.getElementById('completedTasks');

const toCompleted = (id) => {
  const index = toDoData.findIndex(elem => elem.id == id);
  completedData.push(toDoData[index]);
  document.getElementById(toDoData[index].id).remove();
  toDoData.splice(index, 1);
  createToDOList(toDoData, toDoList, false);
  createCompletedList(completedData, completedList, false);
}

const editLi = (id) => {
  const elem = document.getElementById(id);
  const index = toDoData.findIndex(elem => elem.id == id);
  elem.innerHTML = `<div class="edit-elem" id="id${id}">
        <input type="text" name="title" value="${toDoData[index].title}">
        <div class="col-sm-10">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="editRadio${id}" id="Low2${id}" value="Low" required="">
                <label class="form-check-label" for="Low2${id}">
                    Low
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="editRadio${id}" id="Medium2${id}" value="Medium">
                <label class="form-check-label" for="Medium2${id}">
                    Medium
                </label>
            </div>
            <div class="form-check disabled">
                <input class="form-check-input" type="radio" name="editRadio${id}" id="High2${id}" value="High">
                <label class="form-check-label" for="High2${id}">
                    High
                </label>
            </div>
        </div>
        <input type="text" name="text" value="${toDoData[index].text}">
        <input type="color" name="color" value="${toDoData[index].color}">
        <button onclick="saveElem(${index}, ${id})" type="button" name="Save" class="btn btn-success w-100" style="margin-top: 20px;">Save</button>
      </div>`;
}

const saveElem = (index, id) => {
  const elem = document.getElementById(id);
  if (!document.querySelector(`#id${id} input[name=editRadio${id}]:checked`)) return;
  toDoData[index].title = document.querySelector(`#id${id} input[name="title"]`).value;
  toDoData[index].text = document.querySelector(`#id${id} input[name="text"]`).value;
  toDoData[index].priority = document.querySelector(`#id${id} input[name=editRadio${id}]:checked`).value;
  toDoData[index].color = document.querySelector(`#id${id} input[name="color"]`).value;
  elem.setAttribute('style', `background: ${toDoData[index].color}`);
  elem.innerHTML = `
                  <div class="w-100 mr-2">
                      <div class="d-flex w-100 justify-content-between">
                          <h5 class="mb-1">${toDoData[index].title}</h5>
                          <div>
                              <small class="mr-2">${toDoData[index].priority} priority</small>
                              <small>${toDoData[index].time}</small>
                          </div>

                      </div>
                      <p class="mb-1 w-100">${toDoData[index].text}</p>
                  </div>
                  <div class="dropdown m-2 dropleft">
                      <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
                      </button>
                      <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                          <button type="button" class="btn btn-success w-100" onclick="toCompleted(${toDoData[index].id})">Complete</button>
                          <button type="button" class="btn btn-info w-100 my-2" onclick="editLi(${toDoData[index].id})">Edit</button>
                          <button type="button" class="btn btn-danger w-100" onclick="deleteLi(${toDoData[index].id})">Delete</button>
                      </div>
                  </div>
              `;
}

const deleteLi = (id) => {
  let index = toDoData.findIndex(elem => elem.id == id);
  if (index !== -1) {
    document.getElementById(toDoData[index].id).remove();
    toDoData.splice(index, 1);
    toDo.innerHTML = `ToDo (${toDoData.length})`;
    return;
  }
  index = completedData.findIndex(elem => elem.id == id);
  if (index !== -1) {
  document.getElementById(completedData[index].id).remove();
  completedData.splice(index, 1);
  }
  completed.innerHTML = `Completed (${completedData.length})`;
}

window.onload = function() {
  let currentThemeSrc = localStorage.getItem('currentThemeSrc') ? localStorage.getItem('currentThemeSrc') : 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';

  const addTaskBtn = document.getElementById('add-task');
  const inputTitle = document.getElementById('inputTitle');
  const inputText = document.getElementById('inputText');
  const sortFromNewBtn = document.getElementById('sort-btn-1');
  const sortFromOldBtn = document.getElementById('sort-btn-2');
  const inputColor = document.getElementById('color-input');
  const styleTheme = document.getElementById('styleTheme');
  const lightTheme = document.getElementsByClassName('light-theme')[0];
  const darkTheme = document.getElementsByClassName('dark-theme')[0];
  const toDo = document.getElementById('toDo');
  const completed = document.getElementById('completed');
  const timeOptions = { hour: '2-digit', minute: '2-digit', month: 'long', day: 'numeric', hour12: false, year: 'numeric' };

  createToDOList(toDoData, toDoList, false);
  createCompletedList(completedData, completedList, false);
  styleTheme.setAttribute('href', currentThemeSrc);

  lightTheme.addEventListener('click', () => {
    currentThemeSrc = 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
    styleTheme.setAttribute('href', currentThemeSrc);
  });

  darkTheme.addEventListener('click', () => {
    currentThemeSrc = './style.css';
    styleTheme.setAttribute('href', currentThemeSrc);
  });

  sortFromNewBtn.addEventListener('click', () => {
    [toDoData, completedData].forEach((e) => {
      e.sort((a, b) => {
        if (a.id < b.id) return 1;
        if (a.id === b.id) return 0;
        return -1;
      });
    });
    createToDOList(toDoData, toDoList, true);
    createCompletedList(completedData, completedList, true);
  });

  sortFromOldBtn.addEventListener('click', () => {
    [toDoData, completedData].forEach((e) => {
      e.sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id === b.id) return 0;
        return 1;
      });
    });
    createToDOList(toDoData, toDoList, true);
    createCompletedList(completedData, completedList, true);
  });

  addTaskBtn.addEventListener('click', () => {
      if (!document.querySelector('input[name=gridRadios]:checked')) return;
      const inputPriorityValue = document.querySelector('input[name=gridRadios]:checked').value;
      const date = new Date();
      const date2 = Date.now();
      toDoData.push({
        title: inputTitle.value,
        priority: inputPriorityValue,
        time: date.toLocaleString('en', timeOptions),
        text: inputText.value,
        id: date2.toString(),
        color: inputColor.value,
      });
      inputTitle.value = '';
      inputText.value = '';

      createToDOList(toDoData, toDoList, false);
  });


  window.addEventListener('beforeunload', () => {
    toDoData = JSON.stringify(toDoData);
    completedData = JSON.stringify(completedData);
    localStorage.setItem('currentThemeSrc', currentThemeSrc);
    localStorage.setItem('toDoData', toDoData);
    localStorage.setItem('completedData', completedData);
  });
}

let title_task = document.getElementById("title-task");
let forma_task = document.getElementById("forma-task");
let datetime_task = document.getElementById("datetime-task");
let task_detail = document.getElementById("task-detail");
let task_detail_dialog = document.getElementById("task-detail-dialog");
let list_container = document.getElementById("list-container");
let save_btn = document.getElementById("save-btn");
let close_dialog = document.getElementById("close-dialog");
let task_time = document.getElementById("task-time");
let tasks = [];

const get_data_localstorage = () => {
  tasks = [];
  if (localStorage.getItem("tasks") != null) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
};

const set_data_localstorage = () => {
  if (title_task.value && forma_task.value && datetime_task.value) {
    let data = {
      id: tasks.length + 1,
      title: title_task.value,
      forma: forma_task.value,
      datetime: datetime_task.value,
      complete: false,
    };
    tasks.push(data);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    print_tasks();

    title_task.value = " ";
    forma_task.value = " ";
    
  } else {
    alert("Complete todos los campos");
  }
};

const print_tasks = () => {
  get_data_localstorage();
  list_container.innerHTML = "";
  tasks.forEach((e) => {
    list_container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="item">
            <div class="right">
                   <p>${e.title}</p>
            </div>
            <div class="left">
              <img id="detail-${
                e.id
              }" class="detail-btn" src="img/eye.svg" alt="" />
              <img id="edit-${
                e.id
              }" class="edit-btn" src="img/edit.svg" alt="" />
              <img id="delete-${
                e.id
              }" class="delete-btn" src="img/delete.svg" alt="" />
            </div>
          </div>
        
        `
    );
  });
};

const change_complete_state = (event) => {
  let res = tasks.find((e) => "check-" + e.id == event.target.id);
  if (res) {
    res.complete = !res.complete;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};

const view_data = (id_detail) => {
  let res = tasks.find((e) => "detail-" + e.id == id_detail);
  if (res) {
    let task_detail_container = document.getElementById("task-detail");
    task_detail_container.innerHTML = "";

    task_detail_container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="contenedor">
        <img src="img/circulo.png" /style= "background-color:#${res.datetime} ;">
        <div  "class="texto-encima"><p class="task-detail__title">${res.title}</p></div>
        </div>
       

    `
    );
  }
};



const delete_data_by_id = (id) => {
  let res_index = tasks.findIndex((e) => "delete-" + e.id == id);
  tasks.splice(res_index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  print_tasks();
};

save_btn.addEventListener("click", () => {
  set_data_localstorage();
});

list_container.addEventListener("change", (event) => {
  change_complete_state(event);
});
list_container.addEventListener("click", (event) => {
  if (event.target.matches(".detail-btn")) {
    task_detail_dialog.showModal();
    view_data(event.target.id);
  } else if (event.target.matches(".edit-btn")) {
    task_detail_dialog.showModal();
    generate_form(event.target.id);
  } else if (event.target.matches(".delete-btn")) {
    delete_data_by_id(event.target.id);
  }
});
close_dialog.addEventListener("click", () => {
  task_detail_dialog.close();
});
print_tasks();

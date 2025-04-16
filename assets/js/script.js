const form = document.querySelector("form");
const input = document.querySelector("input");
const tbody = document.querySelector("tbody");
let newname = null;
const update = document.querySelector("#update");
const submit = document.querySelector("#submit");

update.style.display = "none";

// insert code 

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    name: input.value,
  };

  const names = JSON.parse(localStorage.getItem("names")) || [];
  //   names.push(data);
  if (newname == null) {
    names.push(data);
    
  } else {
    names[newname] = data;
    newname = null;
    location.reload();
  }

  localStorage.setItem("names", JSON.stringify(names));
  input.value = "";
  show();
  location.reload();
});
// show code 
function show() {
  const names = JSON.parse(localStorage.getItem("names")) || [];

  let result = "";
  names.map((name, index) => {
    result += `
             <tr>
                 <td>${index + 1}</td>
                 <td>${name.name}</td>
                 <td>
                 <button class="btn btn-warning me-4" onclick="edit(${index})">edit</button>
                 <button class="btn btn-danger ms-4" onclick="del(${index})">delete</button>
                 </td>
             </tr>
            `;
    tbody.innerHTML = result;
  });
}
show();
// delete code 
function del(id) {
  const names = JSON.parse(localStorage.getItem("names")) || [];

  names.splice(id, 1);
  localStorage.setItem("names", JSON.stringify(names));
  location.reload();
}
// edit code 
function edit(id) {
  const names = JSON.parse(localStorage.getItem("names")) || [];
  input.value = names[id].name;

  newname = id;
  update.style.display = "block";
  submit.style.display = "none";
}

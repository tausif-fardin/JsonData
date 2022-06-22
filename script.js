
/* Auto increment id value */
let ai_initial = 0;
let selectedRow = null;
let myModal2 = new bootstrap.Modal(document.getElementById("editModal"));

function idU() {
    return ai_initial += 1;
};

let data = [
    {
        id: idU(),
        first_name: "Juanita",
        last_name: "Churchlow",
        email: "jchurchlow0@mysql.com",
        gender: "Female"
    },
    {
        id: idU(),
        first_name: "Odie",
        last_name: "Gheorghie",
        email: "ogheorghie1@bing.com",
        gender: "Male"
    },
    {
        id: idU(),
        first_name: "Irwin",
        last_name: "Guye",
        email: "iguye2@mac.com",
        gender: "Male"
    },
    {
        id: idU(),
        first_name: "Dacy",
        last_name: "Facher",
        email: "dfacher3@ucsd.edu",
        gender: "Female"
    },
    {
        id: idU(),
        first_name: "Brenn",
        last_name: "Hancill",
        email: "bhancill4@slideshare.net",
        gender: "Female"
    },
]


/* Print data in table */
let table = document.getElementById('user_table');

tableRefresh();
function tableRefresh() {
    table.innerHTML = '';
    // console.log(data);
    data.map((data) => {
        let row = `<tr>
                <td class="col-2 col-xs-2 col-md-2">${data.id}</td>
                <td class="col-2 col-xs-2 col-md-2">${data.first_name}</td>
                <td class="col-2 col-xs-2 col-md-2">${data.last_name}</td>
                <td class="col-2 col-xs-2 col-md-2">${data.email}</td>
                <td class="col-2 col-xs-2 col-md-2">${data.gender}</td>
                <td class="col-2 col-xs-2 col-md-2"><button type="button" class="btn btn-primary m-3" data-bs-toggle="modal" data-bs-target="#exampleModal"
                id="#edit" onclick="showEditModal(${data.id})">Edit</button>
                <button class="btn btn-primary m-3" onClick="onDelete(this)">Delete</button></td>          
                </tr>`
        table.innerHTML += row;
    })
}


/* Insert into data */

function onFormSubmit() {
    let newData = [];
    newData["id"] = document.getElementById("id").value = idU();
    newData["first_name"] = document.getElementById("firstname").value;
    newData["last_name"] = document.getElementById("lastname").value;
    newData["email"] = document.getElementById("email").value;
    newData["gender"] = document.getElementById("gender").value;
    data.push(newData);
    myModal.hide();
    tableRefresh();
}

function onEditSubmit(id) {
    console.log(id);
    //data["id"] = document.getElementById("id").value;
    data[id - 1].first_name = document.getElementById("firstnameEdit").value;
    data[id - 1].last_name = document.getElementById("lastnameEdit").value;
    data[id - 1].email = document.getElementById("emailEdit").value;
    data[id - 1].gender = document.getElementById("genderEdit").value;
    myModal2.hide();
    tableRefresh();

}

function resetForm() {
    document.getElementById("id").value = idU();
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("gender").value = "";
    selectedRow = null;
}
/* Delete row */
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("user_table").deleteRow(row.rowIndex);
        resetForm();
    }
}
/* Show reg modal on click */
let myModal = new bootstrap.Modal(document.getElementById("regModal"));
function showRegModal() {
    myModal.show();
}

/* Show update modal on click */
function showEditModal(id) {
    console.log(id);
    document.getElementById("idEdit").value = data[id - 1].id;
    document.getElementById("firstnameEdit").value = data[id - 1].first_name;
    document.getElementById("lastnameEdit").value = data[id - 1].last_name;
    document.getElementById("emailEdit").value = data[id - 1].email;
    document.getElementById("genderEdit").value = data[id - 1].gender;
    document.getElementById("updateuser").setAttribute("onSubmit", `event.preventDefault();onEditSubmit(${id});`);
    myModal2.show();
}

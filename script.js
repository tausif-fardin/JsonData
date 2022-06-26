
/* Auto increment id value */
// let ai_initial = 0;
let myModal = new bootstrap.Modal(document.getElementById("regModal"));
let myModal2 = new bootstrap.Modal(document.getElementById("editModal"));
let toaster = new bootstrap.Toast(document.getElementById("regToast"),);

let data = [
    {
        id: 1,
        first_name: "Juanita",
        last_name: "Churchlow",
        email: "jchurchlow0@mysql.com",
        gender: "Female",

    },
    {
        id: 2,
        first_name: "Odie",
        last_name: "Gheorghie",
        email: "ogheorghie1@bing.com",
        gender: "Male"
    },
    {
        id: 3,
        first_name: "Irwin",
        last_name: "Guye",
        email: "iguye2@mac.com",
        gender: "Male"
    },
    {
        id: 4,
        first_name: "Dacy",
        last_name: "Facher",
        email: "dfacher3@ucsd.edu",
        gender: "Female"
    },
    {
        id: 5,
        first_name: "Brenn",
        last_name: "Hancill",
        email: "bhancill4@slideshare.net",
        gender: "Female"
    },
]


/* Print data in table */
let table = document.getElementById('user_table1');

tableRefresh();
function tableRefresh() {
    table.innerHTML = '';
    data.map((d) => {
        let row = `<tr style="text-align:center">
                <td class="col-1 col-xs-1 col-md-1">${d.id}</td>
                <td class="col-2 col-xs-2 col-md-2">${d.first_name}</td>
                <td class="col-2 col-xs-2 col-md-2">${d.last_name}</td>
                <td class="col-2 col-xs-2 col-md-2">${d.email}</td>
                <td class="col-2 col-xs-2 col-md-2">${d.gender}</td>
                <td class="col-2 col-xs-2 col-md-2"><button type="button" class="btn btn-info" style="border:none;" data-bs-toggle="modal" data-bs-target="#exampleModal"
                id="#edit" onclick="showEditModal(${d.id})"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" style="border:none;" id="btnDelete" onClick="onDelete(${d.id})"><i class="bi bi-trash"></i></button></td>          
                </tr>`
        table.innerHTML += row;
    });
}
/* Insert into data */

function onFormSubmit() {
    let newData = [];
    newData["id"] = document.getElementById("id").value = data[data.length - 1].id + 1;
    newData["first_name"] = document.getElementById("firstname").value;
    newData["last_name"] = document.getElementById("lastname").value;
    newData["email"] = document.getElementById("email").value;
    newData["gender"] = document.querySelector('input[name = gender]:checked').value;
    data.push(newData);
    myModal.hide();
    tableRefresh();
    document.getElementById("toastoast").style.color = "green";
    document.getElementById("toastoast").innerHTML = 'Registered Successfully';
    toaster.show();
}

function onEditSubmit(id) {
    //data["id"] = document.getElementById("id").value;
    data[id - 1].first_name = document.getElementById("firstnameEdit").value;
    data[id - 1].last_name = document.getElementById("lastnameEdit").value;
    data[id - 1].email = document.getElementById("emailEdit").value;
    data[id - 1].gender = document.querySelector('input[name = genderEdit]:checked').value;
    myModal2.hide();
    tableRefresh();
    document.getElementById("toastoast").style.color = "green";
    document.getElementById("toastoast").innerHTML = 'Updated Successfully';
    toaster.show();
    document.querySelector('input[name="genderEdit"]:checked').checked = false;
}

/* Reset form data */
function resetForm() {
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("gender").value = "";
}

/* Delete row */
function onDelete(id) {
    if (confirm('Are you sure to delete this record ?')) {
        var index = data.findIndex(function (o) {
            return o.id === id;
        })
        data.splice(index, 1);
        document.getElementById("user_table").deleteRow(index + 1);
    }
    document.getElementById("toastoast").style.color = "red";
    document.getElementById("toastoast").innerHTML = 'Deleted Successfully';
    toaster.show();
}
/* Show reg modal on click */
function showRegModal() {
    myModal.show();
}

/* Show update modal on click */
function showEditModal(id) {
    document.getElementById("idEdit").value = data[id - 1].id;
    document.getElementById("firstnameEdit").value = data[id - 1].first_name;
    document.getElementById("lastnameEdit").value = data[id - 1].last_name;
    document.getElementById("emailEdit").value = data[id - 1].email;
    // document.querySelector('input[name = genderEdit]').value = data[id - 1].gender;
    document.getElementById("updateuser").setAttribute("onSubmit", `event.preventDefault();onEditSubmit(${id});`);
    myModal2.show();
}
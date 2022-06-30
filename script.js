
/* Auto increment id value */
// let ai_initial = 0;
let myModal = new bootstrap.Modal(document.getElementById("regModal"));
let myModal2 = new bootstrap.Modal(document.getElementById("editModal"));
let toaster = new bootstrap.Toast(document.getElementById("regToast"));

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
        first_name: "Bacy",
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
    {
        id: 6,
        first_name: "Juanita",
        last_name: "Churchlow",
        email: "jchurchlow0@mysql.com",
        gender: "Female",

    },
    {
        id: 7,
        first_name: "Odie",
        last_name: "Gheorghie",
        email: "ogheorghie1@bing.com",
        gender: "Male"
    },
    {
        id: 8,
        first_name: "Irwin",
        last_name: "Guye",
        email: "iguye2@mac.com",
        gender: "Male"
    },
    {
        id: 9,
        first_name: "Bacy",
        last_name: "Facher",
        email: "dfacher3@ucsd.edu",
        gender: "Female"
    },
    {
        id: 10,
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
    data.map((d, k) => {
        let row = `<tr style="text-align:center">   
                <td class="col-1 col-xs-1 col-md-1"><div>
                <span>${d.id}</span></div></td>
                <td class="col-2 col-xs-2 col-md-2">${d.first_name}</td>
                <td class="col-2 col-xs-2 col-md-2">${d.last_name}</td>
                <td class="col-2 col-xs-2 col-md-2">${d.email}</td>
                <td class="col-2 col-xs-2 col-md-2">${d.gender}</td>
                <td class="col-2 col-xs-2 col-md-2"><button type="button" class="btn btn-info" style="border:none;" data-bs-toggle="modal" data-bs-target="#exampleModal"
                id="#edit" onclick="showEditModal(${d.id})"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" style="border:none;" id="btnDelete" onClick="onDelete(${d.id},this)"><i class="bi bi-trash"></i></button>
                
                <button ${k == data.length - 1 ? "disabled" : ""} id="arrowDown" class="btn btn-warning" onclick="goDown(this,${k});"><i class="bi bi-chevron-compact-down" style="font-weight: bold;"></i></button>

                <button ${k == 0 ? "disabled" : ""} id="arrowUp" class="btn btn-primary" onclick="goUp(this,${k})"><i class="bi bi-lg bi-chevron-compact-up" style="font-weight: bold;"></i></button></td>

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
    changePage(Math.ceil(data.length / 5));
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
    changePage(1);
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
function onDelete(id, o) {
    if (confirm('Are you sure to delete this record ?')) {
        var index = data.findIndex(function (o) {
            return o.id === id;
        })
        data.splice(index, 1);
        var p = o.parentNode.parentNode;
        p.parentNode.removeChild(p);

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
    let gValue = data[id - 1].gender;
    if (gValue === "Male") {
        document.getElementById("inlineRadio11").checked = true;
    } else if (gValue === "Female") {
        document.getElementById("inlineRadio22").checked = true;
    } else if (gValue === "Others") {
        document.getElementById("inlineRadio33").checked = true;
    }
    //document.querySelectorAll('input[value="${data[id - 1].gender}"]:checked')
    //document.getElementById("genderEdit").checked = data[id - 1].gender;
    document.getElementById("updateuser").setAttribute("onSubmit", `event.preventDefault();onEditSubmit(${id});`);
    myModal2.show();
}

th = document.getElementsByTagName('th');
th[0].addEventListener('click', function () {
    if (data[0].id > data[1].id) {
        data = data.sort((a, b) => a.id - b.id);
    } else {
        data = data.sort((a, b) => b.id - a.id);
    }
    console.log(data);
    changePage(1);
});

th[1].addEventListener('click', function () {

    if (data[0].first_name < data[1].first_name) {
        data = data.sort((a, b) => a.first_name.localeCompare(b.first_name));
        data.reverse();
    } else {
        data = data.sort((a, b) => a.first_name.localeCompare(b.first_name));
    }

    console.log(data);
    changePage(1);

});

th[2].addEventListener('click', function () {
    if (data[0].last_name < data[1].last_name) {
        data = data.sort((a, b) => a.last_name.localeCompare(b.last_name));
        data.reverse();
    } else {
        data = data.sort((a, b) => a.last_name.localeCompare(b.last_name));
    }

    console.log(data);
    changePage(1);

});

th[3].addEventListener('click', function () {
    if (data[0].email < data[1].email) {
        data = data.sort((a, b) => a.email.localeCompare(b.email));
        data.reverse();
    } else {
        data = data.sort((a, b) => a.email.localeCompare(b.email));
    }

    console.log(data);
    changePage(1);

});

function goUp(x, indexId) {
    let temp = 0;
    temp = data[indexId];
    data[indexId] = data[indexId - 1];
    data[indexId - 1] = temp;

    changePage(Math.ceil(indexId / 5));
    console.log(data);
}

function goDown(x, indexId) {
    let temp = 0;
    console.log(indexId);
    temp = data[indexId];
    data[indexId] = data[indexId + 1];
    data[indexId + 1] = temp;
    document.getElementById('arrowDown').onclick = true;

    changePage(Math.ceil(indexId / 5));
    console.log(data);
}

function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.querySelector("#name-search");
    filter = input.value.toUpperCase();
    table = document.querySelector("#user_table1");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            console.log(txtValue);
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
    /* GIt commit */
}
/*  Adding pagination */
// selecting required element


//creating an array for adding numbers in a page
var current_page = 1;
var records_per_page = 5;

function prevPage() {
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage() {
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}
let btn_next = document.getElementById("next");
let btn_prev = document.getElementById("previous");
function changePage(page) {

    var listing_table = document.getElementById("user_table1");
    var page_span = document.getElementById("page");

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = '';

    for (var i = (page - 1) * records_per_page; i < (page * records_per_page) && i < data.length; i++) {
        console.log(data[i]);
        let row = `<tr style="text-align:center">   
                <td class="col-1 col-xs-1 col-md-1"><div>
                <span>${data[i].id}</span></div></td>
                <td class="col-2 col-xs-2 col-md-2">${data[i].first_name}</td>
                <td class="col-2 col-xs-2 col-md-2">${data[i].last_name}</td>
                <td class="col-2 col-xs-2 col-md-2">${data[i].email}</td>
                <td class="col-2 col-xs-2 col-md-2">${data[i].gender}</td>
                <td class="col-2 col-xs-2 col-md-2"><button type="button" class="btn btn-info" style="border:none;" data-bs-toggle="modal" data-bs-target="#exampleModal"
                id="#edit" onclick="showEditModal(${data[i].id})"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" style="border:none;" id="btnDelete" onClick="onDelete(${data[i].id},this)"><i class="bi bi-trash"></i></button>
                
                <button ${i == data.length - 1 ? "disabled" : ""} id="arrowDown" class="btn btn-warning" onclick="goDown(this,${i});"><i class="bi bi-chevron-compact-down" style="font-weight: bold;"></i></button>

                <button ${i == 0 ? "disabled" : ""} id="arrowUp" class="btn btn-primary" onclick="goUp(this,${i})"><i class="bi bi-lg bi-chevron-compact-up" style="font-weight: bold;"></i></button></td>

                </tr>`
        listing_table.innerHTML += row;

    }
    page_span.innerHTML = page;

    if (page == 1) {
        btn_prev.disabled = true;
    } else {
        btn_prev.disabled = false;
    }

    if (page == numPages()) {
        btn_next.disabled = true;
    } else {
        btn_next.disabled = false;
    }
}

function numPages() {
    return Math.ceil(data.length / records_per_page);
}

window.onload = function () {
    changePage(1);
};

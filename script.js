let ai_initial = 0;

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
    }
]

let table = document.getElementById('customer_table');
data.map((data) => {
    let row = `<tr>
            <td class="col-2 col-xs-2 col-md-2">${data.id}</td>
            <td class="col-2 col-xs-2 col-md-2">${data.first_name}</td>
            <td class="col-2 col-xs-2 col-md-2">${data.last_name}</td>
            <td class="col-2 col-xs-2 col-md-2">${data.email}</td>
            <td class="col-2 col-xs-2 col-md-2">${data.gender}</td>
            <td class="col-2 col-xs-2 col-md-2"><button class="btn btn-primary m-3" id="btnEdit" onClick=onEdit(this)">Edit</button>
            <button class="btn btn-primary m-3" onClick="onDelete(this)">Delete</button></td>          
            </tr>`
    table.innerHTML += row;
});

var selectedRow = null

function onFormSubmit() {
    let formData = readFormData();
    if (selectedRow == null)
        insertNewRecord(formData);
    else
        updateRecord(formData);
    resetForm();
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    var modal = document.getElementById("myModal2");
    modal.style.display = "none";

}
//var formData = {};
function readFormData() {
    data["id"] = document.getElementById("id").value;
    data["firstname"] = document.getElementById("firstname").value;
    data["lastname"] = document.getElementById("lastname").value;
    data["email"] = document.getElementById("email").value;
    data["gender"] = document.getElementById("gender").value;
    return data;
}

function insertNewRecord(data) {
    var table = document.getElementById("customer_table").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.id;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.firstname;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.lastname;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.email;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = data.gender;
    cell5 = newRow.insertCell(5);
    cell5.innerHTML = `<button class="btn btn-primary m-3" id="btnEdit" onClick="onEdit(this)">Edit</button>
    <button class="btn btn-primary m-3" onClick="onDelete(this)">Delete</button>`;
}

function resetForm() {
    document.getElementById("id").value = idU();
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("gender").value = "";
    selectedRow = null;
}

function onEdit(td) {
    console.log("fired");
    selectedRow = td.parentElement.parentElement;
    document.getElementById("id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("firstname").value = selectedRow.cells[1].innerHTML;
    document.getElementById("lastname").value = selectedRow.cells[2].innerHTML;
    document.getElementById("email").value = selectedRow.cells[3].innerHTML;
    document.getElementById("gender").value = selectedRow.cells[4].innerHTML;
}

function updateRecord(data) {
    selectedRow.cells[0].innerHTML = data.id;
    selectedRow.cells[1].innerHTML = data.firstname;
    selectedRow.cells[2].innerHTML = data.lastname;
    selectedRow.cells[3].innerHTML = data.email;
    selectedRow.cells[4].innerHTML = data.gender;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("customer_table").deleteRow(row.rowIndex);
        resetForm();
    }
}
openModal();
function openModal() {
    // Get the modal
    let modal = document.getElementById("myModal");
    data.id = document.getElementById('id').value = idU();

    // Get the button that opens the modal
    let btn = document.getElementById("btnAdd");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }
    // var btn1 = document.getElementById("btnEdit");
    // btn1.onclick = function () {
    //     modal.style.display = "block";
    //     onEdit(this);
    // }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
openModal2();

function openModal2() {
    let modal = document.getElementById("myModal2");
    let btn2 = document.getElementById('btnEdit');
    let span = document.getElementsByClassName("close2")[0];

    btn2.onclick = () => {
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
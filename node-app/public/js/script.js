
let myModal = new bootstrap.Modal(document.getElementById("regModal"));
let myModal2 = new bootstrap.Modal(document.getElementById("editModal"));
let toaster = new bootstrap.Toast(document.getElementById("regToast"),);
let regForm = document.querySelector("#adduser");
let editForm = document.querySelector("#updateuser");
window.showEditModal = showEditModal;
window.onDelete = onDelete;
window.goUp = goUp;
window.goDown = goDown;




let dataLength = 0;

/* Print data in table */
let table = document.getElementById('user_table1');

async function tableRefresh() {
    const response = await fetch('http://localhost:3000/users');
    const data = await response.json();
    console.log(data.length); // This is only accessible inside the function
    return data; // allows for .then and await to function
}

let data = await tableRefresh();

dataLength = data.length;

console.log(dataLength);

// tableRefresh();
// function tableRefresh() {
//     table.innerHTML = '';
//     fetch('http://localhost:3000/users')
//         .then((response) => {
//             return response.json();
//         })
//         .then((data) => {
//             dataLength = data.length;
//             console.log(dataLength);
//             // data.map((d, k) => {
//             //     let row = `<tr style="text-align:center">   
//             //             <td class="col-1 col-xs-1 col-md-1"><div>
//             //             <span>${d.id}</span></div></td>
//             //             <td class="col-2 col-xs-2 col-md-2">${d.first_name}</td>
//             //             <td class="col-2 col-xs-2 col-md-2">${d.last_name}</td>
//             //             <td class="col-2 col-xs-2 col-md-2">${d.email}</td>
//             //             <td class="col-2 col-xs-2 col-md-2">${d.gender}</td>
//             //             <td class="col-2 col-xs-2 col-md-2"><button type="button" class="btn btn-info" style="border:none;" data-bs-toggle="modal" data-bs-target="#exampleModal"
//             //             id="#edit" onclick="showEditModal(${d.id})"><i class="bi bi-pencil-square"></i></button>
//             //             <button class="btn btn-danger" style="border:none;" id="btnDelete" onClick="onDelete(${d.id},this)"><i class="bi bi-trash"></i></button>             
//             //             <button ${k == data.length - 1 ? "disabled" : ""} id="arrowDown" class="btn btn-warning" onclick="goDown(this,${k});"><i class="bi bi-chevron-compact-down" style="font-weight: bold;"></i></button>
//             //             <button ${k == 0 ? "disabled" : ""} id="arrowUp" class="btn btn-primary" onclick="goUp(this,${k})"><i class="bi bi-lg bi-chevron-compact-up" style="font-weight: bold;"></i></button></td>
//             //             </tr>`
//             //     table.innerHTML += row;
//             // })
//         })
//         .catch(function (err) {
//             console.log("Unable to fetch -", err);
//         });
// }

/* Insert into data */

// add user
regForm.addEventListener("submit", (e) => {

    e.preventDefault();
    const first_name = document.getElementById("firstname").value;
    const last_name = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const gender = document.querySelector('input[name = gender]:checked').value;
    const user = { first_name, last_name, email, gender };
    try {
        const response = fetch('http://localhost:3000/users/addUser', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.status === 200) {

            resetForm(current_page);
        }
    } catch (error) {
        console.log(error);
    }
    myModal.hide();
    renderPage(current_page);
})

//-------------------------------
//Show edit modal on click edit button
function showEditModal(id) {
    console.log(id);
    console.log(data[id]);
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
    myModal2.show();
}

//Update user data
editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("idEdit").value;
    const first_name = document.getElementById("firstnameEdit").value;
    const last_name = document.getElementById("lastnameEdit").value;
    const email = document.getElementById("emailEdit").value;
    const gender = document.querySelector('input[name = genderEdit]:checked').value;
    const user = { first_name, last_name, email, gender };
    try {
        const response = fetch(`http://localhost:3000/users/updateUser/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.status === 200) {

            resetForm(current_page);
        }
    } catch (error) {
        console.log(error);
    }
    myModal2.hide();
    renderPage(current_page);
})

/* Reset form data */
function resetForm() {
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("gender").value = "";
}

/* Delete row */
function onDelete(id, o) {
    console.log(id);
    if (confirm('Are you sure to delete this record ?')) {
        try {
            const response = fetch(`http://localhost:3000/users/deleteUser/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                },
            });

            if (response.status === 200) {
                var p = o.parentNode.parentNode;
                p.parentNode.removeChild(p);
            }
        } catch (error) {
            console.log(error);
        }
    }
    console.log(data);
    document.getElementById("toastoast").style.color = "red";
    document.getElementById("toastoast").innerHTML = 'Deleted Successfully';
    renderPage(current_page);
    toaster.show();
}

let btn_add = document.getElementById("add");
btn_add.addEventListener("click", function () {
    myModal.show();
})

/* Show update modal on click */


let th = document.getElementsByTagName('th');
th[0].addEventListener('click', function () {
    if (data[0].id > data[1].id) {
        data = data.sort((a, b) => a.id - b.id);
    } else {
        data = data.sort((a, b) => b.id - a.id);
    }
    renderPage(current_page);
});

th[1].addEventListener('click', function () {

    if (data[0].first_name < data[1].first_name) {
        data = data.sort((a, b) => a.first_name.localeCompare(b.first_name));
        data.reverse();
    } else {
        data = data.sort((a, b) => a.first_name.localeCompare(b.first_name));
    }
    renderPage(current_page);
});

th[2].addEventListener('click', function () {
    if (data[0].last_name < data[1].last_name) {
        data = data.sort((a, b) => a.last_name.localeCompare(b.last_name));
        data.reverse();
    } else {
        data = data.sort((a, b) => a.last_name.localeCompare(b.last_name));
    }
    renderPage(current_page);
});

th[3].addEventListener('click', function () {
    if (data[0].email < data[1].email) {
        data = data.sort((a, b) => a.email.localeCompare(b.email));
        data.reverse();
    } else {
        data = data.sort((a, b) => a.email.localeCompare(b.email));
    }
    renderPage(current_page);
});

function goUp(x, indexId) {
    let temp = 0;
    temp = data[indexId];
    data[indexId] = data[indexId - 1];
    data[indexId - 1] = temp;
    renderPage(current_page);
}

function goDown(x, indexId) {
    let temp = 0;
    console.log(indexId);
    temp = data[indexId];
    data[indexId] = data[indexId + 1];
    data[indexId + 1] = temp;
    document.getElementById('arrowDown').onclick = true;
    renderPage(current_page);
}

function search() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.querySelector("#name-search");
    filter = input.value.toUpperCase();
    table = document.querySelector("#user_table");
    tr = table.getElementsByTagName("tr");

    for (let k = 0; k < data.length; k++) {
        if (filter == data[k].first_name.toUpperCase() || filter == data[k].last_name || filter == data[k].email || filter == data[k].gender) {
            let cPage = Math.ceil(data.indexOf(data[k]) / 3) + 1;
            console.log(cPage);
            renderPage(cPage);
            break;
        }
    }
    let count = 0;
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (let j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (filter.length > 2) {
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        count++;
                        tr[i].style.display = "";
                        break;
                    } else {
                        tr[i].style.display = "none";
                    }
                }

            }
        }
    }
    document.getElementById('rowcount').innerHTML = `${count} rows found.`;

}
/* Pagination */

const PAGE_SIZE = 3;
const MAX_PAGE_NUMBER = Math.floor(dataLength / PAGE_SIZE);
console.log(MAX_PAGE_NUMBER);
let listing_table = document.getElementById("user_table1");


const updateButtons = page_number => {
    const buttons = [...document.querySelectorAll(".page-number")];
    buttons.forEach(btn => btn.textContent = "-");

    for (let i = 0; i < buttons.length && i + page_number <= MAX_PAGE_NUMBER; i++) {
        buttons[i].textContent = i + page_number + 1;
    }
};

function appendRow(newData) {
    var row = '';
    newData.forEach((data, k) => {
        row += `<tr style="text-align:center">   
        <td class="col-1 col-xs-1 col-md-1"><div>
        <span>${data.id}</span></div></td>
        <td class="col-2 col-xs-2 col-md-2">${data.first_name}</td>
        <td class="col-2 col-xs-2 col-md-2">${data.last_name}</td>
        <td class="col-2 col-xs-2 col-md-2">${data.email}</td>
        <td class="col-2 col-xs-2 col-md-2">${data.gender}</td>
        <td class="col-2 col-xs-2 col-md-2"><button type="button" class="btn btn-info" style="border:none;" data-bs-toggle="modal" data-bs-target="#exampleModal"
        id="#edit" onclick="showEditModal(${data.id})"><i class="bi bi-pencil-square"></i></button>
        <button class="btn btn-danger" style="border:none;" id="btnDelete" onClick="onDelete(${data.id},this)"><i class="bi bi-trash"></i></button>

        <button ${k == data.length - 1 ? "disabled" : ""} id="arrowDown" class="btn btn-warning" onclick="goDown(this,${k});"><i class="bi bi-chevron-compact-down" style="font-weight: bold;"></i></button>

        <button ${k == 0 ? "disabled" : ""} id="arrowUp" class="btn btn-primary" onclick="goUp(this,${k})"><i class="bi bi-lg bi-chevron-compact-up" style="font-weight: bold;"></i></button></td>

        </tr>`;
    });
    listing_table.innerHTML += row;
}


async function getIncludedRows(page_number) {
    const result = await tableRefresh();
    const start = page_number * PAGE_SIZE;
    const end = (page_number + 1) * PAGE_SIZE;
    console.log(result);
    return result.slice(start, end);

}
const renderPage = page_number => {
    listing_table.innerHTML = "";
    var newData = [];
    getIncludedRows(page_number).then(data => {
        data.forEach(row => {
            newData.push(row);
        })
    }).then(() => {
        appendRow(newData);
        updateButtons(page_number);
    })
};

let current_page = 0;
const setPage = new_page => {
    current_page = new_page;
    renderPage(current_page);
};

document.querySelectorAll(".page-number").forEach(button => {
    button.addEventListener("click", () => {
        if (button.textContent === "-") return;
        setPage(button.textContent - 1); // -1 because page numbers have +1
    });
});

document.querySelector("#next").addEventListener("click", () => {
    setPage(Math.min(current_page + 1, MAX_PAGE_NUMBER));
});

document.querySelector("#previous").addEventListener("click", () => {
    setPage(Math.max(current_page - 1, 0));
});

renderPage(current_page);

// function CountRows() {
//     var totalRowCount = 0;
//     var rowCount = 0;
//     var table = document.getElementById("user_table");
//     var rows = table.getElementsByTagName("tr")
//     for (var i = 0; i < rows.length; i++) {
//         totalRowCount++;
//         if (rows[i].getElementsByTagName("td").length > 0) {
//             rowCount++;
//         }
//     }
//     var message = "Total Row Count: " + totalRowCount;
//     message += "\nRow Count: " + rowCount;
//     console.log(message);
// }
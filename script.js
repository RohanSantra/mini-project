import config from './config.js';


/*
-------------------------------------------------------------------------------------------------------
All functions and their use :
1. createTableRow(students)     -   For creating table data
2. addStudents()                -   For making api call and passing student data to createTableRow()
3. editStudent()                -   For editing student data
4. deleteStudent()              -   For deleting student data
5. handleFormSubmit()           -   For handling form submit
------------------------------------------------------------------------------------------------------
*/

// For creating table data
function createTableRow(students) {
    const tableBody = document.getElementById('student-table-body');

    // Clear previous rows
    tableBody.innerHTML = '';

    // For adding row 
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td><input type="text" value="${student.rollNo}" disabled /></td>
                <td><input type="text" value="${student.firstName}" disabled /></td>
                <td><input type="text" value="${student.lastName}" disabled /></td>
                <td><input type="text" value="${student.city}" disabled /></td>
                <td>
                <button class="edit-btn" data-id="${student.$id}">Edit</button>
                <button class="save-btn" data-id="${student.$id}" style="display:none">Save</button>
                <button class="delete-btn" data-id="${student.$id}">Delete</button>
                </td>
            `;
        tableBody.appendChild(row);
    });
}

async function addStudents() {
    try {
        const result = await config.getStudentDetails();
        const students = result.documents;

        // Creating table rowa
        createTableRow(students)

        // console.log('Student data rendered successfully.');
    } catch (error) {
        console.error('Failed to load student data:', error);
    }

    editStudent();
    deleteStudent();
}


// For editing student data
function editStudent() {
    // When click on edit btn
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            const inputs = row.querySelectorAll('input');
            inputs.forEach(input => {
                input.disabled = false
                input.setAttribute("class", "active");
            });

            row.querySelector('.edit-btn').style.display = 'none';
            row.querySelector('.save-btn').style.display = 'inline-block';
        })
    })

    // When click on save btn
    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const studentId = e.target.dataset.id;
            const row = e.target.closest('tr');
            const inputs = row.querySelectorAll('input');

            const updatedStudentData = {
                rollNo: Number(inputs[0].value),
                firstName: String(inputs[1].value),
                lastName: String(inputs[2].value),
                city: String(inputs[3].value)
            };
            // console.log(updatedStudentData)


            try {
                await config.updateStudentDetails(studentId, updatedStudentData);
                addStudents();
            } catch (error) {
                console.error('Failed to update Student data :', error);
            }
        })
    })
}

// for deleting student details
function deleteStudent() {
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const studentId = e.target.dataset.id;
            // console.log(studentId)
            try {
                await config.deleteStudentDetails(studentId)
                // console.log("Students details deleted successfully")
                // window.location.reload();
                addStudents();
            } catch (error) {
                console.log("Failed to delete Student Details :", error)
            }
        });
    });

}


//For handling form submit
function handleFormSubmit() {
    const form = document.querySelector('#studentForm');
    const rollnoInput = document.querySelector('#rollNo');
    const firstNameInput = document.querySelector('#firstName');
    const lastNameInput = document.querySelector('#lastName');
    const cityInput = document.querySelector('#city');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            rollNo: Number(rollnoInput.value),
            firstName: String(firstNameInput.value),
            lastName: String(lastNameInput.value),
            city: String(cityInput.value)
        };

        try {
            const result = await config.AddStudentDetails(data);
            // console.log('Student added:', result);

            // Reloading to see data
            // window.location.reload();

            addStudents();
        } catch (error) {
            console.error('Failed to add student:', error);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    addStudents();
    handleFormSubmit();
});

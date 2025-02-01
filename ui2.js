function addDetailRow() {
    let table = document.getElementById("details-table");
    let rowCount = table.rows.length + 1;
    let randomNumber = Math.floor(Math.random() * 100); 
    let minutes = getMinutesFromRNI(randomNumber);

    let newRow = table.insertRow();
    newRow.innerHTML = `<td>${rowCount}</td><td>${randomNumber}</td><td>${minutes} min</td>`;
}

function getMinutesFromRNI(rni) {
    return rni < 40 ? 15 : rni < 70 ? 30 : rni < 90 ? 45 : 60;
}

function addSimulationRow() {
    let table = document.getElementById("simulation-table");
    let newRow = table.insertRow();
    newRow.innerHTML = `
        <td>New</td>
        <td>0</td>
        <td>0.0</td>
        <td>0.00</td>
        <td class="rni-range">0-0</td>
        <td>
            <div class="action-buttons">
                <button class="btn btn-delete">Delete</button>
                <button class="btn btn-edit">Edit</button>
            </div>
        </td>`;
}

// Add delete functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-delete')) {
        let row = e.target.closest('tr');
        row.parentNode.removeChild(row);
    }
});

// Add edit functionality
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-edit')) {
        let row = e.target.closest('tr');
        let labelCell = row.cells[0];
        let minutesCell = row.cells[1];
        let probabilityCell = row.cells[2]; // Assuming probability is in the third column
        let editButton = e.target;

        if (editButton.textContent === "Edit") {
            // Convert text to input fields
            let labelText = labelCell.textContent;
            let minutesText = minutesCell.textContent;
            let probabilityText = probabilityCell.textContent;

            labelCell.innerHTML = `<input type="text" value="${labelText}" class="edit-label">`;
            minutesCell.innerHTML = `<input type="number" value="${minutesText}" class="edit-minutes">`;
            probabilityCell.innerHTML = `<input type="number" step="0.01" value="${probabilityText}" class="edit-probability">`;

            editButton.textContent = "Save";
        } else {
            // Save the edited values
            let newLabel = row.querySelector('.edit-label').value;
            let newMinutes = row.querySelector('.edit-minutes').value;
            let newProbability = row.querySelector('.edit-probability').value;

            labelCell.textContent = newLabel;
            minutesCell.textContent = newMinutes;
            probabilityCell.textContent = newProbability;

            editButton.textContent = "Edit";
        }
    }
});

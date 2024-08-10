document.addEventListener('DOMContentLoaded', function() {
    const sidebarOpen = document.getElementById('sidebar-open');
    const sidebarClose = document.getElementById('sidebar-close');
    const lockIcon = document.getElementById('lock-icon');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const mainContent = document.getElementById('main-content');
    const sidebarFaculty = document.getElementById('sidebar-faculty');

    sidebarOpen.addEventListener('click', () => sidebar.classList.remove('close'));
    sidebarClose.addEventListener('click', () => sidebar.classList.add('close'));
    lockIcon.addEventListener('click', () => sidebar.classList.toggle('close'));

    function loadFacultyPage() {
        mainContent.innerHTML = `
            <h2>Faculty Management</h2>
            <div class="add-faculty">
                <input type="text" id="faculty-name" placeholder="Faculty Name">
                <input type="text" id="faculty-id" placeholder="Faculty ID">
                <button onclick="addFaculty()">Add Faculty</button>
            </div>
            <table id="faculty-table">
                <thead>
                    <tr>
                        <th>Faculty Name</th>
                        <th>Faculty ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Faculty data will be inserted here -->
                </tbody>
            </table>
        `;
    }

    function loadPage(pageTitle, columns, inputPlaceholders) {
        mainContent.innerHTML = `
            <h2>${pageTitle} Management</h2>
            <div class="add-item">
                ${inputPlaceholders.map(placeholder => `<input type="text" placeholder="${placeholder}">`).join('')}
                <button onclick="addItem('${pageTitle.toLowerCase()}')">Add ${pageTitle}</button>
            </div>
            <table id="${pageTitle.toLowerCase()}-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        ${columns.map(col => `<th>${col}</th>`).join('')}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Data will be inserted here -->
                </tbody>
            </table>
        `;
    }

    sidebarFaculty.addEventListener('click', (e) => {
        e.preventDefault();
        loadFacultyPage();
        navLinks.forEach(link => link.classList.remove('active'));
        document.getElementById('nav-faculty').classList.add('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');

            switch(e.target.id) {
                case 'nav-faculty':
                    loadFacultyPage();
                    break;
                case 'nav-department':
                    loadPage('Department', ['Department Name'], ['Department Name']);
                    break;
                case 'nav-semester':
                    loadPage('Semester', ['Year', 'Semester'], ['Year', 'Semester']);
                    break;
                case 'nav-subject':
                    loadPage('Subject', ['Subject Name', 'Subject Code'], ['Subject Name', 'Subject Code']);
                    break;
                case 'nav-venue':
                    loadPage('Venue', ['Venue Name'], ['Venue Name']);
                    break;
                default:
                    mainContent.innerHTML = `<h2>${e.target.textContent} Page</h2>`;
            }
        });
    });

    // Initial load
    loadFacultyPage();
    document.getElementById('nav-faculty').classList.add('active');
});

function addFaculty() {
    const name = document.getElementById('faculty-name').value;
    const id = document.getElementById('faculty-id').value;
    if (name && id) {
        const table = document.getElementById('faculty-table').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${id}</td>
            <td><button class="delete-btn" onclick="deleteFaculty(this)">Delete</button></td>
        `;
        document.getElementById('faculty-name').value = '';
        document.getElementById('faculty-id').value = '';
    }
}

function deleteFaculty(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function addItem(type) {
    const inputs = document.querySelectorAll('.add-item input');
    const values = Array.from(inputs).map(input => input.value);
    
    if (values.every(value => value.trim() !== '')) {
        const table = document.getElementById(`${type}-table`).getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        const rowCount = table.rows.length;
        
        newRow.innerHTML = `
            <td>${rowCount}</td>
            ${values.map(value => `<td>${value}</td>`).join('')}
            <td><button class="delete-btn" onclick="deleteItem(this)">Delete</button></td>
        `;
        
        inputs.forEach(input => input.value = '');
    }
}

function deleteItem(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateRowNumbers(row.parentNode);
}

function updateRowNumbers(tbody) {
    const rows = tbody.rows;
    for (let i = 0; i < rows.length; i++) {
        rows[i].cells[0].textContent = i + 1;
    }
}
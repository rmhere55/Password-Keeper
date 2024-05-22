document.addEventListener('DOMContentLoaded', () => {
    let passwords = JSON.parse(localStorage.getItem('passwords')) || [];

    const passwordForm = document.getElementById('passwordForm');
    const passwordList = document.getElementById('passwordList');
    const searchInput = document.getElementById('search');

    const displayPasswords = (passwordsToDisplay) => {
        passwordList.innerHTML = '';

        passwordsToDisplay.forEach((password, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${password.email}</td>
                <td>********</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="editPassword(${index})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deletePassword(${index})">Delete</button>
                </td>
            `;
            passwordList.appendChild(row);
        });
    };

    const addPassword = (email, password) => {
        passwords.push({ email, password });
        localStorage.setItem('passwords', JSON.stringify(passwords));
        displayPasswords(passwords);
    };

    const updatePassword = (index, email, password) => {
        passwords[index] = { email, password };
        localStorage.setItem('passwords', JSON.stringify(passwords));
        displayPasswords(passwords);
    };

    const deletePassword = (index) => {
        passwords.splice(index, 1);
        localStorage.setItem('passwords', JSON.stringify(passwords));
        displayPasswords(passwords);
    };

    window.editPassword = (index) => {
        const password = passwords[index];
        document.getElementById('email').value = password.email;
        document.getElementById('password').value = password.password;
        passwordForm.dataset.index = index;
    };

    window.deletePassword = (index) => {
        if (confirm('Are you sure you want to delete this password?')) {
            deletePassword(index);
        }
    };

    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const index = passwordForm.dataset.index;

        if (index !== undefined) {
            updatePassword(index, email, password);
            delete passwordForm.dataset.index;
        } else {
            addPassword(email, password);
        }

        passwordForm.reset();
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredPasswords = passwords.filter(password => password.email.toLowerCase().includes(searchTerm));
        displayPasswords(filteredPasswords);
    });

    displayPasswords(passwords);
});

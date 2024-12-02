// Function to load users from localStorage and display them in the table
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.status}</td>
            <td>
                <button onclick="toggleUserStatus(${index})">${user.status === 'Active' ? 'Khóa' : 'Mở khóa'}</button>
                <button onclick="deleteUser(${index})">Xóa</button>
                <button onclick="showAddUserPopup(${index})">Sửa</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

// Function to toggle (lock/unlock) a user status
function toggleUserStatus(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users[index].status = users[index].status === 'Active' ? 'Locked' : 'Active';
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}

// Function to delete a user
function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}




// Function to show a popup for adding or editing a user
function showAddUserPopup(index = null) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isEditing = index !== null;

    const user = isEditing ? users[index] : { username: '', name: '', email: '' };

    let username, name, email;

    // Validate and prompt for username
    do {
        username = prompt('Nhập tên đăng nhập:', user.username);
        if (!username) {
            alert('Tên đăng nhập không được để trống!');
        } else if (!isEditing && users.some(user => user.username === username)) {
            alert('Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.');
            username = null; // Reset để buộc nhập lại
        }
    } while (!username);

    // Validate and prompt for name
    do {
        name = prompt('Nhập họ và tên:', user.name);
        const nameRegex = /^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$/;
        if (!name) {
            alert('Họ và tên không được để trống!');
        } else if (!nameRegex.test(name)) {
            alert('Họ và tên không hợp lệ. Vui lòng không chứa số hoặc ký tự đặc biệt.');
            name = null; // Reset để buộc nhập lại
        }
    } while (!name);

    // Validate and prompt for email
    do {
        email = prompt('Nhập email:', user.email);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            alert('Email không được để trống!');
        } else if (!emailRegex.test(email)) {
            alert('Email không hợp lệ. Vui lòng nhập lại.');
            email = null; // Reset để buộc nhập lại
        } else if (!isEditing && users.some(user => user.email === email)) {
            alert('Email đã tồn tại. Vui lòng sử dụng email khác.');
            email = null; // Reset để buộc nhập lại
        }
    } while (!email);

    // Set status to 'Active' by default
    const status = 'Active';

    const newUser = { username, name, email, status };

    if (isEditing) {
        users[index] = newUser; // Update existing user
    } else {
        users.push(newUser); // Add new user
    }

    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}

// Initial load of users when the page is loaded
document.addEventListener('DOMContentLoaded', loadUsers);


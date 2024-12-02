// Function to load users from localStorage and display them in the table
function loadUsers() {
    // Get users data from localStorage (if any)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Get the table body where user data will be displayed
    const userTableBody = document.getElementById('userTableBody');
    
    // Clear existing table rows (if any)
    userTableBody.innerHTML = '';
    
    // Loop through the users and add them to the table
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
            </td>
        `;
        
        userTableBody.appendChild(row);
    });
}

// Function to toggle (lock/unlock) a user status
function toggleUserStatus(index) {
    // Get current users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const user = users[index];
    
    // Toggle user status (Active <-> Locked)
    if (user.status === 'Active') {
        user.status = 'Locked'; // Lock the user
    } else {
        user.status = 'Active'; // Unlock the user
    }
    
    // Save the updated users array to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Reload users to update the table
    loadUsers();
}

// Function to delete a user
function deleteUser(index) {
    // Get current users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Remove the user at the specified index
    users.splice(index, 1);
    
    // Save the updated users array to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Reload users to update the table
    loadUsers();
}

// Initial load of users when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
});

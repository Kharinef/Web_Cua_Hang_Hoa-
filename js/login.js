// Hiển thị popup đăng nhập
function showLoginPopup() {
    document.getElementById('loginPopup').style.display = 'flex';
    closeSignupPopup(); // Đóng popup đăng ký nếu đang mở
}

// Đóng popup đăng nhập
function closePopup() {
    document.getElementById('loginPopup').style.display = 'none';
}
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const users = JSON.parse(localStorage.getItem('users')) || []; // Lấy danh sách người dùng từ localStorage

    const account = users.find(user => user.username === username && user.password === password);
if (account) {
    alert('Đăng nhập thành công!');
    localStorage.setItem('userInfo', JSON.stringify(account)); // Lưu thông tin người dùng vào localStorage
    console.log(localStorage.getItem('userInfo')); // Kiểm tra xem thông tin đã lưu chưa
    document.cookie = 'userLoggedIn=true; path=/'; // Đánh dấu trạng thái đã đăng nhập
    closePopup();
    window.location.href = '/Mainpage.html'; // Chuyển đến trang chính
} else {
    alert('Tên đăng nhập hoặc mật khẩu không đúng!');
}

});

// Hiển thị popup đăng ký
function showSignupPopup() {
    document.getElementById('signupPopup').style.display = 'flex';
    closePopup(); // Đóng popup đăng nhập nếu đang mở
}

// Đóng popup đăng ký
function closeSignupPopup() {
    document.getElementById('signupPopup').style.display = 'none';
}

function saveAccountData() {
const name = document.getElementById('name').value;
const username = document.getElementById('username').value;
const email = document.getElementById('email').value;
const phone = document.getElementById('phone').value;
const password = document.getElementById('password').value;
const confirmPassword = document.getElementById('confirmPassword').value;
const passwordError = document.getElementById('passwordError');

// Kiểm tra tên khách hàng (không chứa số)
const nameRegex = /^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$/;
if (!nameRegex.test(name)) {
alert("Tên khách hàng không được chứa số.");
return false;
}

// Kiểm tra số điện thoại (bắt đầu bằng số 0 và có 10 số)
const phoneRegex = /^0\d{9}$/;
if (!phoneRegex.test(phone)) {
alert("Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số.");
return false;
}

// Kiểm tra mật khẩu có ít nhất 1 ký tự đặc biệt và 1 chữ cái in hoa
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
if (!passwordRegex.test(password)) {
passwordError.textContent = 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt và 1 chữ cái in hoa.';
return false;
}

// Kiểm tra mật khẩu nhập lại có trùng với mật khẩu
if (password !== confirmPassword) {
passwordError.textContent = 'Mật khẩu nhập lại không khớp.';
return false;
}

// Xóa thông báo lỗi nếu hợp lệ
passwordError.textContent = '';

// Lưu thông tin tài khoản vào localStorage
const userAccount = {
name: name,
username: username,
email: email,
phone: phone,
password: password
};

// Lấy danh sách người dùng từ localStorage (nếu có)
let users = JSON.parse(localStorage.getItem('users')) || [];

// Kiểm tra xem tên đăng nhập đã tồn tại chưa
if (users.some(user => user.username === username)) {
alert("Tên đăng nhập đã tồn tại.");
return false;
}

users.push(userAccount); localStorage.setItem('users', JSON.stringify(users)); // Lưu thông tin người dùng hiện tại vào localStorage 
localStorage.setItem('userInfo', JSON.stringify(userAccount)); 
alert("Đăng ký thành công"); // Chuyển hướng hoặc thực hiện hành động tiếp theo 
window.location.href = '/mainpage.html'; 
return false; // Ngăn chặn form gửi lại và tải lại trang 
}

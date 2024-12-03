window.onload = function() {
    displayCart();
    displayPaymentHistory(); // Hiển thị lịch sử thanh toán khi tải trang
};

// Function to display the cart
function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || []; // Get cart from localStorage
    const cartTbody = document.getElementById("cart-tbody");
    const totalPriceElement = document.getElementById("totalPrice");

    // Clear existing content in cart table
    cartTbody.innerHTML = '';

    // Initialize total price
    let totalPrice = 0;

    // Loop through each product in the cart and add it to the table
    cart.forEach((product, index) => {
        const row = document.createElement("tr");

        // Create table cells for each product attribute
        const imgCell = document.createElement("td");
        const nameCell = document.createElement("td");
        const priceCell = document.createElement("td");
        const qtyCell = document.createElement("td");
        const actionCell = document.createElement("td");

        // Set the content for each cell
        imgCell.innerHTML = `<img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;">`;
        nameCell.innerText = product.name;
        priceCell.innerText = `${product.price} VND`;
        qtyCell.innerText = product.quantity;

        // Action to remove item from cart
        const removeButton = document.createElement("button");
        removeButton.innerText = "Xóa";
        removeButton.onclick = function() {
            removeFromCart(index);
        };
        actionCell.appendChild(removeButton);

        // Append cells to row
        row.appendChild(imgCell);
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(qtyCell);
        row.appendChild(actionCell);

        // Add the row to the table body
        cartTbody.appendChild(row);

        // Update total price
        totalPrice += parseInt(product.price) * parseInt(product.quantity);
    });

    // Update the total price in the cart summary
    totalPriceElement.innerText = totalPrice.toLocaleString() + " VND";
}

// Function to remove an item from the cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
    displayCart(); // Refresh the cart display
}

// Function to handle checkout (for now, just an alert)
function payAll() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalPrice = document.getElementById("totalPrice").innerText;

    if (confirm("Bạn có chắc chắn muốn thanh toán?")) {
        // Create payment details
        const paymentDetails = {
            date: new Date().toLocaleString(),
            totalAmount: totalPrice,
            products: cart.map(product => product.name).join(', '),
        };

        // Save the payment history
        savePaymentHistory(paymentDetails);

        // Implement your payment process here
        alert("Thanh toán thành công!");

        localStorage.removeItem("cart"); // Clear the cart after payment
        displayCart(); // Refresh the cart display
    }
}

// Function to delete all items from the cart
function deleteAll() {
    if (confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?")) {
        localStorage.removeItem("cart"); // Clear the cart in localStorage
        displayCart(); // Refresh the cart display
    }
}

// Function to save payment history to localStorage
function savePaymentHistory(paymentDetails) {
    let paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
    paymentHistory.push(paymentDetails);
    localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));
}

// Function to display payment history
function displayPaymentHistory() {
    const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
    const paymentHistoryContainer = document.getElementById('payment-history');

    if (paymentHistory.length > 0) {
        paymentHistoryContainer.innerHTML = '<ul style="list-style-type: none; padding: 0; margin: 0;">';
        paymentHistory.forEach(payment => {
            paymentHistoryContainer.innerHTML += `
                <li style="list-style-type: none; border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
                    <strong>Ngày:</strong> ${payment.date} <br>
                    <strong>Sản phẩm:</strong> ${payment.products} <br>
                    <strong>Số tiền:</strong> ${payment.totalAmount}
                </li>
            `;
        });
        paymentHistoryContainer.innerHTML += '</ul>';
    } else {
        paymentHistoryContainer.innerHTML = 'Không có lịch sử thanh toán.';
    }
}

// Function to handle adding product to cart
function addToCart() {
    // Get product details
    const productName = document.querySelector(".product-info .title").textContent;
    const productPrice = document.querySelector(".product-info .price").textContent;
    const productImage = document.querySelector(".carousel-item.active img").src;
    const productQuantity = document.getElementById("qty").value;

    // Clean price text (remove extra VND and commas)
    const cleanedPrice = productPrice.replace(' VND', '').replace(',', '').trim();

    // Create product object
    const product = {
        name: productName,
        price: cleanedPrice, // Store the price as a number (remove 'VND' and commas)
        image: productImage,
        quantity: productQuantity
    };

    // Check if cart exists in localStorage, otherwise create it
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add product to cart
    cart.push(product);

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Display a confirmation message
    alert("Đã thêm sản phẩm vào giỏ hàng!");
}

// Attach the addToCart function to the "Đặt hoa" button
document.getElementById("add-to-cart").addEventListener("click", addToCart);

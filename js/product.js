
// <>Tăng số lượng
document.querySelector(".qtyplus").addEventListener("click", function () {
  var qtyInput = document.getElementById("qty");
  var currentValue = parseInt(qtyInput.value);
  if (currentValue < 20) {
    qtyInput.value = currentValue + 1; // Tăng số lượng
  }
});

// Giảm số lượng
document.querySelector(".qtyminus").addEventListener("click", function () {
  var qtyInput = document.getElementById("qty");
  var currentValue = parseInt(qtyInput.value);
  if (currentValue > 1) {
    qtyInput.value = currentValue - 1; // Giảm số lượng
  }
});



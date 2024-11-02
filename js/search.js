const data = [
    { name: "Hoa tặng sinh nhật mẹ", url: "/products/hoa-sinh-nhat-me.html" },
    { name: "Hoa tặng sinh nhật bạn", url: "/products/hoa-sinh-nhat-ban.html" },
    { name: "Hoa tặng người yêu", url: "/products/hoa-sinh-nhat-nguoi-yeu.html" },
    { name: "Hoa sinh nhật sang trọng", url: "/products/hoa-sang-trong.html" },
    { name: "Hoa sinh nhật giá rẻ", url: "/products/hoa-gia-re.html" }
];
function showSuggestions() {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    const suggestionsContainer = document.getElementById("suggestions");
    suggestionsContainer.innerHTML = "";
    if (query) {
        const suggestions = data.filter(item => item.name.toLowerCase().includes(query));
        if (suggestions.length > 0) {
            suggestions.forEach(item => {
                const suggestionItem = document.createElement("div");
                suggestionItem.classList.add("suggestion-item");
                suggestionItem.innerHTML = `<a href="${item.url}" target="_blank">${item.name}</a>`;
                suggestionsContainer.appendChild(suggestionItem);
            });
            suggestionsContainer.style.display = "block"; 
        } else {
            suggestionsContainer.style.display = "none";
        }
    } else {
        suggestionsContainer.style.display = "none";
    }
}
document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-container")) {
        document.getElementById("suggestions").style.display = "none";
    }
});

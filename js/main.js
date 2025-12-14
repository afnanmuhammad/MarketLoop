// Load Header
fetch("/components/header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header").innerHTML = data;
    });

// Load Footer
fetch("/components/footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });


// allCategory pages


fetch("/pages/allCategory.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("allCategory").innerHTML = data;
    });

// Search Button Redirection
document.addEventListener('click', function (e) {
    // Check if clicked element is the search button or a child of it
    const searchBtn = e.target.closest('.search-button');
    if (searchBtn) {
        window.location.href = '/pages/product-list.html';
    }
});

// View Switcher (Grid/List) - Only if on product list page
const productListContainer = document.querySelector('.product-list-container');
if (productListContainer) {
    const gridBtn = document.querySelector('.view-switcher button:first-child');
    const listBtn = document.querySelector('.view-switcher button:last-child');

    if (gridBtn && listBtn) {
        gridBtn.addEventListener('click', () => {
            productListContainer.classList.add('grid-3-col');
            productListContainer.classList.remove('list-view');
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
        });

        listBtn.addEventListener('click', () => {
            productListContainer.classList.remove('grid-3-col');
            productListContainer.classList.add('list-view');
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
        });
    }
}

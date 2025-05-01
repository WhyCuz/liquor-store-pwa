document.addEventListener("DOMContentLoaded", () => {
    const itemName = document.getElementById("itemName");
    const itemDescription = document.getElementById("itemDescription");
    const itemPrice = document.getElementById("itemPrice");
    const itemImage = document.getElementById("itemImage");
    const addItemBtn = document.getElementById("addItem");
    const itemList = document.getElementById("itemList");
    const searchBar = document.getElementById("searchBar");

    let items = JSON.parse(localStorage.getItem("items")) || [];

    function renderItems() {
        itemList.innerHTML = "";
        items.forEach((item, index) => {
            const itemCard = document.createElement("div");
            itemCard.classList.add("item-card");
            itemCard.innerHTML = `
                <img src="${item.image}" class="item-image" alt="${item.name}">
                <div class="item-details">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-description">${item.description}</p>
                    <p class="item-price">$${item.price}</p>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            itemList.appendChild(itemCard);
        });
        attachDeleteListeners();
    }

    function attachDeleteListeners() {
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                items.splice(index, 1);
                localStorage.setItem("items", JSON.stringify(items));
                renderItems();
            });
        });
    }

    addItemBtn.addEventListener("click", () => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const newItem = {
                name: itemName.value,
                description: itemDescription.value,
                price: itemPrice.value,
                image: e.target.result
            };
            items.push(newItem);
            localStorage.setItem("items", JSON.stringify(items));
            renderItems();
            itemName.value = "";
            itemDescription.value = "";
            itemPrice.value = "";
            itemImage.value = "";
        };
        if (itemImage.files[0]) {
            reader.readAsDataURL(itemImage.files[0]);
        }
    });

    searchBar.addEventListener("input", (e) => {
        const searchValue = e.target.value.toLowerCase();
        document.querySelectorAll(".item-card").forEach(card => {
            const name = card.querySelector(".item-name").textContent.toLowerCase();
            if (name.includes(searchValue)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    renderItems();
});

// Selecting elements
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#cart-close");

// Event listeners for opening and closing the cart
cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners to all remove buttons
  let removeButtons = document.querySelectorAll(".cart-remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });

  // Add event listeners to all quantity input fields
  let quantityInputs = document.querySelectorAll(".cart-quantity");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", quantityChanged);
  });

  // Add event listeners to all add to cart buttons
  let addToCartButtons = document.querySelectorAll(".add-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCartClicked);
  });

  //Add event listeners to buy products button

  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", BuyButtonClicked);
});

// Function to handle the click event when the buy button is clickedfunction BuyButtonClicked() {
function BuyButtonClicked() {
  alert("Your Order is Placed");

  // Select the cart content element
  let cartContent = document.querySelector(".cart-content");

  // Remove all child nodes from the cart content
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }

  updateTotal();
}

// Function to handle click event when an item is added to the cart
function addToCartClicked(event) {
  // Get the clicked button element
  let button = event.target;

  // Find the closest ancestor element with the class "product-box", which represents the product being added to the cart
  let shopProduct = button.closest(".product-box");

  // Find the element with the class "product-title" within the product box and get its text content, which represents the title of the product
  let title = shopProduct.querySelector(".product-title").innerText;

  // Find the element with the class "price" within the product box and get its text content, which represents the price of the product
  let price = shopProduct.querySelector(".price").innerText;

  // Find the element with the class "product-img" within the product box and get its source, which represents the image of the product
  let productImg = shopProduct.querySelector(".product-img").src;

  // Call the function to add the product to the cart with the obtained details
  addProductTocart(title, price, productImg);

  // Update the total price of the cart
  updateTotal();
}

function addProductTocart(title, price, productImg) {
  // Check if the product is already in the cart
  let cartTitles = document.querySelectorAll(".cart-product-title");
  for (let i = 0; i < cartTitles.length; i++) {
    if (cartTitles[i].innerText === title) {
      alert("This item is already in the cart");
      return; // Exit the function if the item is already in the cart
    }
  }

  // Create a new cart box element
  let cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");

  // Construct the inner HTML content for the cart box
  let cartBoxContent = `
        <img src="${productImg}" alt class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">
                ${title}
          </div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!-- Remove Cart -->
        <i class='bx bxs-trash-alt cart-remove'></i>
  `;

  // Set the inner HTML content for the cart box
  cartBox.innerHTML = cartBoxContent;

  // Append the cart box to the cart content
  let cartContent = document.querySelector(".cart-content");
  cartContent.appendChild(cartBox);

  // Add event listeners to the newly added remove button and quantity input field
  cartBox
    .querySelector(".cart-remove")
    .addEventListener("click", removeCartItem);
  cartBox
    .querySelector(".cart-quantity")
    .addEventListener("change", quantityChanged);
}

// Function to handle quantity changes
function quantityChanged(event) {
  var input = event.target;
  // Check if the input value is a valid number and greater than 0
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1; // If not, set the value to 1
  }
  updateTotal(); // Update total after changing quantity
}

// Function to remove items from the cart
function removeCartItem(event) {
  let button = event.target;
  let cartItem = button.closest(".cart-box"); // Adjusted to select the parent of the parent element
  cartItem.remove();
  updateTotal(); // Update total after removing item
}

// Function to update the total price/**

function updateTotal() {
  // Select all cart boxes (items)
  let cartBoxes = document.querySelectorAll(".cart-box");
  let total = 0;

  // Loop through each cart box (item)
  cartBoxes.forEach(function (cartBox) {
    // Get the price element within the current cart box
    let priceElement = cartBox.querySelector(".cart-price");
    // Get the quantity element within the current cart box
    let quantityElement = cartBox.querySelector(".cart-quantity");
    // Extract the price value from the price element and remove '$'
    let price = parseFloat(priceElement.textContent.replace("$", ""));
    // Get the quantity value
    let quantity = parseInt(quantityElement.value);
    // Calculate subtotal for the current item (price * quantity)
    let subtotal = price * quantity;
    // Add the subtotal to the total
    total += subtotal;
    total = Math.round(total * 100) / 100;
  });

  // Update the total price displayed on the page
  document.querySelector(".total-price").textContent = "$" + total.toFixed(2);
}

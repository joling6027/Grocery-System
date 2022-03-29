const categoryItem = document.querySelector(".category-item");
// const categoryItemArr = Array.from(document.querySelectorAll('.category-item'));
const categoryItemArr = Array.from(document.querySelectorAll(".category-item"));
const categoryItemNames = Array.from(
  document.querySelectorAll(".category-item a")
);
const modalHeader = document.querySelector(".modal");
const subCatItemArr = Array.from(document.querySelectorAll(".sub-cat-item"));
const orderNum = document.querySelector(".orderNum");
let count = 0;
let randomOrderNum = 0;

function generateOrderNum() {
  let random = Math.floor(1000 + Math.random() * 9000);
  // console.log(random)
  randomOrderNum = `#${random}`;
  orderNum.innerHTML = randomOrderNum;
}

//click on each category will show the pop up to see sub-category
categoryItemArr.forEach((item) => {
  // console.log(item);
  item.addEventListener("click", popUp);
});

//function for pop-up
//It will populate the data from inventoryDB database for sub-category
function popUp(event) {
  event.preventDefault();
  document.querySelector(".modal").style.visibility = "visible";
  let divModal = document.querySelector(".modal");

  if (divModal.hasChildNodes && divModal.firstChild.className == "modal-name") {
    divModal.removeChild(divModal.firstChild);
  }
  // console.log(this);
  // console.log(divModal.children);
  // console.log(divModal.childNodes);

  // console.log(event);
  // console.log(event.target.innerText);
  // console.log(this);
  // console.log(this.innerText);

  modalHeader.insertAdjacentHTML(
    `afterbegin`,
    `<h2 class="modal-name">${this.innerText}</h2>`
  );

  subCatItemArr.forEach((item) => {
    console.log(item.firstElementChild.className);
  });
  switch (divModal.firstChild.innerHTML) {
    case "Fruits &amp; Vegetables":
      subCatItemArr.forEach((item)=> {
        item.style.display = "grid";
        if(!(item.firstElementChild.className == "Fruits_and_Vegetables")){
          item.style.display = "none";
        }
      })
      break;
    case "Dairy &amp; Eggs":
      subCatItemArr.forEach((item)=> {
        item.style.display = "grid";
        if(!(item.firstElementChild.className == "Dairy_and_eggs")){
          item.style.display = "none";
        }
      })
      break;
    case "Bakery":
      subCatItemArr.forEach((item)=> {
        item.style.display = "grid";
        if(!(item.firstElementChild.className == "Bakery")){
          item.style.display = "none";
        }
      })
      break;
    case "Meat &amp; Seafood":
      subCatItemArr.forEach((item)=> {
        item.style.display = "grid";
        if(!(item.firstElementChild.className == "Meat_and_Seafood")){
          item.style.display = "none";
        }
      })
      break;
    case "Snacks &amp; Cookies":
      subCatItemArr.forEach((item)=> {
        item.style.display = "grid";
        if(!(item.firstElementChild.className == "Snacks_and_Cookies")){
          item.style.display = "none";
        }
      })
      break;
    case "Beverages":
      subCatItemArr.forEach((item)=> {
        item.style.display = "grid";
        if(!(item.firstElementChild.className == "Beverages")){
          item.style.display = "none";
        }
      })
      break;
    case "Frozen Food":
      
      break;
    case "Prepared Food":
      
      break;
    case "Pantry":
      
      break;
    case "Pet care":
      
      break;
    case "Floral &amp; Garden":
      
      break;
    case "International":
      
      break;
    case "Baby Care":
      
      break;
    case "Home":
      
      break;
    case "Health &amp; Beauty":
      
      break;
    case "Cleaning":
      
      break;
  }
}

// console.log(categoryItemArr);
// categoryItemNames.map(ele=>{
//   console.log(ele.innerText);
// })

subCatItemArr.forEach((item) => {
  item.addEventListener("click", addToCart);
});

//when sub-cat-item is selected
let sele = 0;
let itemPriceDouble = 0;
let tax = 0;
let total = 0;

//Add items from category to order
function addToCart() {
  // console.log(this.children[3].innerHTML);
  let itemName = this.children[1].innerText;
  let itemPrice = this.children[3].innerHTML;
  // itemPrice = itemPrice.slice(1, 5);
  let itemPriceParse = parseFloat(itemPrice);
  console.log(itemPriceParse);
  // count += 1;
  // if(count <= 10){
  //   document.querySelector('.selected-items').innerHTML += `${this.children[0].innerText}\n ${this.children[1].innerText} + `;
  // document.querySelector('.num-of-items-selected').innerHTML = `Number of items selected: ${count}`;
  // }else{
  //   document.querySelector('.selected-items').innerHTML = "";
  //   document.querySelector('.num-of-items-selected').innerHTML = `Selected item over limitaiton`;
  //   count = 0;
  // }

  const item = `<div class="purchased">
                  <span class="iName">${itemName}</span>&nbsp
                  <span class="iPrice">$${itemPriceParse}</span>
                  <button class="del">DEL</button>
                  <hr class="item-hr">
                  
              </div>`;

  // <div class="purchased-num">
  //     <button class="minus">-</button>
  //     <p class="quantity">1</p>
  //     <button class="plus">+</button>
  // </div>
  // console.log(document.querySelector('.order-details').children[1]);
  document
    .querySelector(".order-details")
    .children[1].insertAdjacentHTML(`afterend`, `${item}`);
  sele += 1;
  itemPriceDouble += itemPriceParse;
  tax += itemPriceParse * 0.05;
  total = itemPriceDouble + tax;

  document.querySelector("#selected-num").innerHTML = sele;
  document.querySelector("#subtotal").innerHTML = itemPriceDouble.toFixed(2);
  document.querySelector("#tax").innerHTML = tax.toFixed(2);
  document.querySelector("#total").innerHTML = total.toFixed(2);
  document.querySelector(".modal").style.visibility = "hidden";
}

document.addEventListener("click", function (e) {
  if (e.target && e.target.className == "del") {
    console.log(e.target.parentElement);
    price = parseFloat(
      e.target.parentElement.children[1].innerHTML.slice(1, 5)
    );
    console.log(price);
    sele = sele - 1;
    document.querySelector("#selected-num").innerHTML = sele;
    console.log(`prev sub: ${itemPriceDouble.toFixed(2)}`);
    itemPriceDouble = itemPriceDouble - price;
    // document.querySelector('#subtotal').innerHTML = `${itemPriceDouble.toFixed(2) - price.toFixed(2)}`;
    document.querySelector("#subtotal").innerHTML = `${itemPriceDouble.toFixed(2)}`;
    tax = itemPriceDouble * 0.05;
    document.querySelector("#tax").innerHTML = `${tax.toFixed(2)}`;
    total = itemPriceDouble + tax;
    document.querySelector("#total").innerHTML = `${total.toFixed(2)}`;
    e.target.parentElement.remove();

    // printing variables
    // console.log(`itemPriceDouble: ${itemPriceDouble}`);
  }
});

document
  .querySelector(".modal-close-btn")
  .addEventListener("click", function () {
    document.querySelector(".modal").style.visibility = "hidden";
  });

// document.querySelector('.ok').addEventListener('click',function(){
//   document.querySelector('.modal').style.visibility = "hidden";
// })

// document.querySelector('.delete').addEventListener('click',()=>{
//   document.querySelector('.selected-items').innerHTML = "";
//   count = 0;
//   document.querySelector('.num-of-items-selected').innerHTML = `Number of items selected: ${count}`;
// })

// let quantity = document.querySelector(".quantity").innerHTML;
// let quantityNum = Number(document.querySelector(".quantity").innerHTML);

// const quantityArr = Array.from(document.querySelectorAll(".quantity"));
// const plusArr = Array.from(document.querySelectorAll(".plus"));
// console.log(quantityArr);
// quantityArr.forEach((qty) => {
//   document.querySelector.addEventListener('click',()=>{
//     quantityNum += 1;
//     qty = `${quantityNum}`;
//     qty.innerHTML = quantityNum;
//     console.log(quantityNum);
// })
//   console.log("quantity add/deduct function not yet been done");
// });

document.querySelector('#pay').addEventListener('click',(e)=>{
  e.preventDefault();
  document.querySelector('.modal-pay').style.visibility = "visible";

  const cartItems = document.querySelectorAll('.cart-items');
  // const cartItemsArr = Array.from(cartItems);
  // cartItemsArr.forEach(item => {
  //   if(item) item.remove();
  // })

  const iName = document.querySelectorAll('.iName');
  const iNameArr = Array.from(iName);

  let countItem = 0;
  iNameArr.forEach(iName => {
    // console.log(iName.innerHTML);
    countItem++;
    // document.querySelector('.items-in-cart').insertAdjacentHTML(`afterend`,
    // `<input type="text" class="cart-items" name="purchaseditem${countItem}" id="purchaseditem${countItem}" value="${iName.innerHTML}" disabled>`)
    
  })
  // console.log("name: " + iNameArr[0].innerHTML);
  console.log(document.querySelector('#purchaseditem1'));
  document.querySelector('#purchaseditem1').value = iNameArr[0].innerHTML;

  let grandTotal = document.querySelector("#total").innerHTML;
  // console.log(`Now total: ${total}`);
  document.querySelector('#grandtotal').value = grandTotal;
})

document.querySelector("#pay-button-cancel").addEventListener('click',()=>{
  document.querySelector('.modal-pay').style.visibility = "hidden";
})
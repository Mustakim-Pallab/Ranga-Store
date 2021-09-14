const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
    document.getElementById("searchbox").value='';
    
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const price=product.price;
    const rating=product.rating;
    const rate=rating.rate;
    const numberOfPeopleRate=rating.count;
    const totalRating=5;
    const percentageRating=((rate/totalRating)*100);
    const roundRatingPercentage=`${Math.round(percentageRating/10)*10}%`;
    
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h5 >${product.title}</h3>
      <p>Category: ${product.category} 
      
        <div class="star-rating">
          <div class="star-rating-inner" id="${product.id}">


          </div>
        </div>
        <span>
        (${rate})
        
        </span>
        <h5> <span class="people-count"> ${numberOfPeopleRate} </span> People rated this </h5><br>
      

      <h2>Price: $ ${price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
    document.getElementById(`${product.id}`).style.width=roundRatingPercentage;
    
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = (total.toFixed(2));

};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText =(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", (priceConverted * 0.3).toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
  }
};


//grandTotal update function
const updateTotal = () => {
   const grandTotal =getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};



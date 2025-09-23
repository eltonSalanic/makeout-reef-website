const apiUrl = "https://api.bigcartel.com/makeoutreef/products.json";
const storeUrl = "https://makeoutreef.bigcartel.com/";

async function getData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

async function renderProducts() {
  //get products and imageUrl
  const products = await getData();

  //for every product, add it to the div;
  const productsDisplayContainer = document.getElementById("merch-display-container");
  for (let i = 0; i < products.length; i++) {
    const productContainer = document.createElement("a"); //create div for a product
    productContainer.setAttribute("href", (storeUrl + "product/" + products[i].permalink));
    productContainer.setAttribute("class", "product-container"); //set product div's class to product-container
    const imageUrl = products[i].images[0].url; //get image for product
    const imageElementToAdd = document.createElement("img"); //create image element
    imageElementToAdd.setAttribute("src", imageUrl); //put image url into img element
    productContainer.appendChild(imageElementToAdd); //put image in div
    productsDisplayContainer.appendChild(productContainer); //append product-container into merch-displaycontainer;
  }
  //products grabbed atp
  //Render products onto page

  /*const imageElement = document.createElement("img");
  imageElement.setAttribute("src", imageUrl);
  productsContainer.appendChild(
    imageElement
  );*/
}

renderProducts();


//var elem = document.createElement("img");
//elem.setAttribute("src", "images/hydrangeas.jpg");

document.body.addEventListener('mousedown', () => {
  document.body.classList.add('cursor-clicked');
});

document.body.addEventListener('mouseup', () => {
  document.body.classList.remove('cursor-clicked');
});
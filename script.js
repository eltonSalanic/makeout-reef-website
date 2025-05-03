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
  //const imageUrl = products[0].images[0].url;

  //for every product, add it to the div;
  const productsContainer = document.getElementById("products");
  for (let i = 0; i < products.length; i++) {
    console.log("loop " + i);
    const imageUrl = products[i].images[0].url; //get image for product
    const imageElementToAdd = document.createElement("img"); //create image
    imageElementToAdd.setAttribute("src", imageUrl); //set shit
    imageElementToAdd.setAttribute("class", "productImage");
    productsContainer.appendChild(imageElementToAdd); //add to div
  }
  //products grabbed atp
  //Render products onto page

  /*const imageElement = document.createElement("img");
  imageElement.setAttribute("src", imageUrl);
  productsContainer.appendChild(
    imageElement
  );*/
}

/*renderProducts();*/


//var elem = document.createElement("img");
//elem.setAttribute("src", "images/hydrangeas.jpg");

document.body.addEventListener('mousedown', () => {
  document.body.classList.add('cursor-clicked');
});

document.body.addEventListener('mouseup', () => {
  document.body.classList.remove('cursor-clicked');
});
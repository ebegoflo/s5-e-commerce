// Electrodimesticos
// https://api.mercadolibre.com/categories/MLM1575
// Deportes
// https://api.mercadolibre.com/categories/MLM1276
// Gadgets
// `https://api.mercadolibre.com/sites/MLM/search?q=gadgets
// Foto
// https://api.mercadolibre.com/categories/MLM168281
//MLM1039"
// Celulares
// https://api.mercadolibre.com/categories/MLM1055
// Juguetes
// `https://api.mercadolibre.com/sites/MLM/search?q=juguetes
// Consolas y videojuegos
// https://api.mercadolibre.com/categories/MLM1144
localStorage.clear();

// Imagenes y links a las secciones
const request = (section, number) => {
  fetch(`https://api.mercadolibre.com/categories/${section}`)
    .then(function(response) {
      response.json().then(
        function(data) {
          let template1 = ``;
          let cont = ``;
          document.getElementById(`name${number}`).innerText = data.name;
          document.getElementById(`div${number}`).setAttribute('style', `background-image:url(${data.picture})`);
          data.children_categories.forEach(function(obj, index) {
            cont = `cont${number}`
            cont = document.getElementById(cont);
            template1 +=
              `<p>${obj.name}</p>`
            cont.innerHTML = template1;
          });
        })
    });
}

//Imágenes
request("MLM1575", 0);
request("MLM1276", 1);
request("MLM1055", 2);
request("MLM1144", 3);
request("MLM1276", 4);
request("MLM1575", 5);
request("MLM1574", 6);
request("MLM1384", 7);
request("MLM1000", 8);

$('.thumbnail').hover(
  function() {
    $(this).find('.caption').slideDown(250); //.fadeIn(250)
  },
  function() {
    $(this).find('.caption').slideUp(250); //.fadeOut(205)
  }
);
// Fin código página inicial
// Funciones de busqueda
var home = document.getElementById('principal');
var resutlsSearch = document.getElementById('result-search');
document.getElementById("search-product").addEventListener("submit", enter);
document.getElementById('show-home').addEventListener('click', show)

function enter(e) {

  e.preventDefault();
  var search = ($('#search').val());
  fetch(`https://api.mercadolibre.com/sites/MLM/search?q=${search}`)
    .then(function(response) {
      response.json().then(
        function(result) {
          products(result);
        }
      );
    });
  home.classList.remove('show');
  home.classList.add('hidden');
  resutlsSearch.classList.remove('hidden');
  resutlsSearch.classList.add('show');
}
//

const products = result => {
  result.results.forEach((product, index) => {

    if (index < 22 && index > 9) {

      //Agregando titulos
      $nameProductIndex = document.getElementById(`name${index}`); //select elemento contenedor de titulo
      let nameResult = result.results[index].title; //título
      $nameProductIndex.innerText = nameResult; //asignar a elemento el titulo

      // Agregando los precios
      $priceProductIndex = document.getElementById(`price${index}`); //select elemento contenedor de precio
      let priceResult = result.results[index].price; //precio
      $priceProductIndex.innerText = (`$${priceResult}`);

      //Agregando fotos
      $imgProductIndex = document.getElementById(`img${index}`); //select elemento contenedor de imágen
      let photoResult = result.results[index].thumbnail; //Imágen

      $imgProductIndex.src = `${photoResult}`;

      //Agregando clases a los botones
      $btnIndex = document.querySelectorAll('a.btn-primary');

      // Se recorre el arreglo obtenido para asignarles el id del producto
      $btnIndex.forEach(function(array, index) {
        array.setAttribute("id", result.results[index].id);
        array.classList.add("add-cart");
      });

    }
  })
}


//Evento para regresar al home
function show(e) {
  e.preventDefault();
  home.classList.remove('hidden');
  home.classList.add('show');
  resutlsSearch.classList.remove('show');
  resutlsSearch.classList.add('hidden');

}

// Funcionalidad Carrito
// Variables
const cart = document.getElementById('cart');
const productsCont = document.getElementById('result-search'); //Contenedor de productos
const cartList = document.querySelector('#cart-list tbody');
const quitCartBtn = document.getElementById('quit-cart');
// Listeners
eventListeners();

function eventListeners() {
  // Agrega al carrito de compras
  productsCont.addEventListener('click', addCart);
  // Elimina del carrito
  cart.addEventListener('click', quitCart);
  // Vaciar el carrito
  quitCartBtn.addEventListener('click', emptyCart);
  // Obtener el LocalStorage
  document.addEventListener('DOMContentLoaded', readLocalStorage);
}
// Funciones

// Obteniendo el total
let totalValue = 0;
// Obteniendo el valor del contador
let counter = document.getElementById("counterItems");
let counterNum = parseInt(counter.innerText);
// Obteniendo el elemento del total
let sumVal = document.getElementById("total-amount");

// Función que añade el curso al carrito
function addCart(e) {
  e.preventDefault();
  if (e.target.classList.contains('add-cart')) {
    const item = e.target.parentElement.parentElement.parentElement; //Entramos a la card (imagen, texto y botones)
    // Función que obtiene la información del producto
    productInformation(item);
    console.log(item);
    let priceVal = item.querySelector('div.info-results h2').innerHTML;
    let price = priceVal.substr(1, priceVal.length);
    price = parseInt(price);
    addition(price);
  }
  increaseCount();
}

function productInformation(item) {
  const productData = {
    image: item.querySelector('a img').src,
    tittle: item.querySelector('div h5').textContent,
    price: item.querySelector('div h2').textContent,
    id: item.querySelector('div p a.btn-primary').getAttribute('id')
  }
  paintInCart(productData);
}
// Pinta los productos en el Carrito

function paintInCart(productData) {
  const row = document.createElement('tr');
  row.innerHTML = `
          <td>
               <img src="${productData.image}" width=100>
          </td>
          <td>${productData.tittle}</td>
          <td class= "price">${productData.price}</td>
          <td>
            <a href="#" class="quit-item" data-id="${productData.id}">X</a>
          </td>
       `;
  cartList.appendChild(row);
  saveProductLocalStorage(productData);
}
// Elimina del carrito
function quitCart(e) {
  e.preventDefault();
  let item,
    itemId;
  if (e.target.classList.contains('quit-item')) {
    e.target.parentElement.parentElement.remove();
    item = e.target.parentElement.parentElement;
    itemId = item.querySelector('a').getAttribute('id');
    itemPElement= item.querySelector('td.price');

    itemPValString = itemPElement.innerHTML.substr(1,itemPElement.innerHTML.length);
    itemP = parseInt(itemPValString);

  }
  removeProductsLocalStorage(itemId,itemP);
  decreaseCount(itemP);
}

function emptyCart() {
  while (cartList.firstChild) {
    cartList.removeChild(cartList.firstChild);
  }
  // Vaciar Local Storage
  emptyLocalStorage();
  cleanCount();
  return false;
}

// Almacena productos Local Storage
function saveProductLocalStorage(productData) {
  let items;
  items = getProductsLocalStorage();
  // guarda los items seleccionados en el localStorage
  items.push(productData);
  localStorage.setItem('items', JSON.stringify(items));
}
// Comprueba elementos en Local Storage
function getProductsLocalStorage() {
  let itemsLS;
  if (localStorage.getItem('items') === null) {
    itemsLS = [];
  } else {
    itemsLS = JSON.parse(localStorage.getItem('items'));
  }
  return itemsLS;
}
// Imprime los elementos del Local Storage en el carrito
function readLocalStorage() {
  let itemsLS;
  itemsLS = getProductsLocalStorage();
  itemsLS.forEach(function(item) {
    // constrir el template
    const row = document.createElement('tr');
    row.innerHTML = `
               <td>
                    <img src="${item.image}" width=100>
               </td>
               <td>${item.tittle}</td>
               <td>${item.price}</td>
               <td>
                    <a href="#" class="quit-item" data-id="${item.id}">x</a>
               </td>
          `;
    cartList.appendChild(row);
  });
}
// Elimina por el ID en Local Storage
function removeProductsLocalStorage(itemId) {
  let itemsLS;
  // Obtenemos el arreglo de elementos

  itemsLS = getProductsLocalStorage();
  // Iteramos comparando el ID del curso borrado con los del LS
  itemsLS.forEach(function(itemsLS, index) {
    if (itemsLS.id === itemId) {
      itemsLS.splice(index, 1);
    }
  });
  // Añadimos el arreglo actual a storage
  localStorage.setItem('items', JSON.stringify(itemsLS));
}
// Elimina todos del Local Storage
function emptyLocalStorage() {
  localStorage.clear();
}

function addition (price){
  totalValue += price;
  sumVal.innerHTML = totalValue;
  localStorage.setItem('total', totalValue) ;
  payPal(totalValue);
  console.log(totalValue);
}

function increaseCount (){
  counterNum = counterNum + 1;
  counter.innerText = counterNum.toString();
}

function decreaseCount (itemP){
  counterNum = counterNum - 1;
  counter.innerText = counterNum.toString();
  // Obtiene el valor del total del carrito y le resta el precio
  let value = parseInt(sumVal.innerHTML);
  totalValue = value - itemP;
  sumVal.innerText = totalValue;
  // Almacena el resultado en el LS
  localStorage.setItem('total', totalValue) ;
}

function cleanCount (){
  counterNum = 0;
  counter.innerText = counterNum.toString();
  sumVal.innerText = 0 ;
  totalValue = 0;
  localStorage.setItem('total', totalValue) ;
}

/*---------- Initialize Firebase ----------*/
var config = {
  apiKey: "AIzaSyC0C9kN3EUeCjcttEwxrDz3R6AUKnVn6_Q",
  authDomain: "ecommerce-be047.firebaseapp.com",
  databaseURL: "https://ecommerce-be047.firebaseio.com",
  projectId: "ecommerce-be047",
  storageBucket: "",
  messagingSenderId: "224014778274"
};
firebase.initializeApp(config);
document.getElementById("login-google").addEventListener("click",loginGoogle);


// Login con Google

function loginGoogle(e) {
  e.preventDefault();
  var provider = new firebase.auth.GoogleAuthProvider();
  authentication(provider);
}

  function authentication(provider){
    firebase.auth().signInWithPopup(provider).then(function(result) {
      let name =result.additionalUserInfo.profile.name;
      let photo = result.user.photoURL;
      paintUser(name,photo);
      document.getElementById("search-product").classList.add("show");
      document.getElementById("search-product").classList.remove("hidden");
      document.getElementById("login-google").classList.add("hidden");
      document.getElementById("login-google").classList.remove("show");
      // document.getElementById("login-google").classList.remove("hidden");

    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }


function paintUser(name, photo) {
  document.getElementById("user-name").textContent = name;
  document.getElementById("user-photo").src = `${photo}`;
}

let categories = document.querySelectorAll(".category");

categories.forEach(element => {
  element.addEventListener("click", showCategory);
});

function showCategory() {
  let categoryClicked = this.innerText; //da el id del li elegido
  /*ocultar home y mostrar buscador*/
  var home = document.getElementById('principal');
  var resutlsSearch = document.getElementById('result-search');
  home.classList.remove('show');
  home.classList.add('hidden');
  resutlsSearch.classList.remove('hidden');
  resutlsSearch.classList.add('show');
  /*terminar ocultar esto se puede refactorizar*/
  paintCategory(categoryClicked);
}

function paintCategory(categoryClicked){
  fetch(`https://api.mercadolibre.com/sites/MLM/search?q=${categoryClicked}`)
    .then(function(response) {
        response.json().then(
          function(result){
            products(result);
          }
        );
    });
}
// funcion PayPal

function payPal(totalValue) {
  // Render the PayPal button

    paypal.Button.render({

        // Set your environment

        env: 'sandbox', // sandbox | production

        // Specify the style of the button

        style: {
            label: 'checkout',
            size:  'small',    // small | medium | large | responsive
            shape: 'pill',     // pill | rect
            color: 'gold'      // gold | blue | silver | black
        },

        // PayPal Client IDs - replace with your own
        // Create a PayPal app: https://developer.paypal.com/developer/applications/create

        client: {
            sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
            production: 'AXogq8X2C5u1kEiDR8P8KHsbQfS3YgiyxFd1Ovvjenv8nD-10pOhb4M9xOc_G6T1Adc3HKsdg5iEw1S9'
        },
        commit: true,

        payment: function(data, actions) {
            return actions.payment.create({
                payment: {
                    transactions: [
                        {
                            amount: { total: totalValue, currency: 'MXN' }
                        }
                    ]
                }
            });
        },

        onAuthorize: function(data, actions) {
            return actions.payment.execute().then(function() {
                window.alert('Payment Complete!');
            });
        }

    }, '#paypal-button-container');
}

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

// Imagenes y links a las secciones
const request = (section, number) =>{
  fetch(`https://api.mercadolibre.com/categories/${section}`)
    .then(function(response) {
        response.json().then(
          function(data){
            let template1 = ``;
            let cont = ``;
            console.log(data);
            document.getElementById(`name${number}`).innerText = data.name;
            console.log(`url("${data.picture}")`);
            document.getElementById(`div${number}`).setAttribute('style', `background-image:url(${data.picture})`);
            // document.getElementById(`img${number}`).setAttribute('src', `${data.picture}`);

            console.log(data.picture);
            data.children_categories.forEach(function(obj, index){
              console.log(obj.name);
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
request("MLM1575",0);
request("MLM1276",1);
request("MLM1055",2);
request("MLM1144",3);
request("MLM1276",4);
request("MLM1575",5);
request("MLM1574",6);
request("MLM1384",7);
request("MLM1000",8);

$('.thumbnail').hover(
        function(){
            $(this).find('.caption').slideDown(250); //.fadeIn(250)
        },
        function(){
            $(this).find('.caption').slideUp(250); //.fadeOut(205)
        }
    );
// Fin código página inicial
// Funciones de busqueda
var home = document.getElementById('principal');
var resutlsSearch = document.getElementById('result-search');
document.getElementById("search-product").addEventListener("submit", enter);
document.getElementById('show-home').addEventListener('click', show)

function enter (e){

  e.preventDefault();
  var search=($('#search').val());
  fetch(`https://api.mercadolibre.com/sites/MLM/search?q=${search}`)
    .then(function(response) {
        response.json().then(
          function(result){
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
  //console.log(result.results[0]);

  result.results.forEach((product, index) => {

    if(index < 22&&index>9){

      //Agregando titulos
      $nameProductIndex=document.getElementById(`name${index}`);//select elemento contenedor de titulo
      let nameResult=result.results[index].title;//título
      $nameProductIndex.innerText=nameResult;//asignar a elemento el titulo

      // Agregando los precios
      $priceProductIndex=document.getElementById(`price${index}`); //select elemento contenedor de precio
      let priceResult=result.results[index].price;//precio
      $priceProductIndex.innerText=(`$${priceResult}`);

      //Agregando fotos
      $imgProductIndex=document.getElementById(`img${index}`);//select elemento contenedor de imágen
      let photoResult=result.results[index].thumbnail;//Imágen

      $imgProductIndex.src=`${photoResult}`;

      console.log(result.results[index]);

      //Agregando clases a los botones
      $btnIndex = document.querySelectorAll('a.btn-primary');
    console.log($btnIndex);
    // Se recorre el arreglo obtenido para asignarles el id del producto
    $btnIndex.forEach(function(array, index){
      console.log(array);
      console.log(index);
      console.log(result.results[index].id);
      array.setAttribute("id",result.results[index].id);
      array.classList.add("add-cart");
      console.log(array);
    });

    }
  })
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

function loginGoogle(e){
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    authentication(provider);
  }

  function authentication(provider){
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;

    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
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
  // Función que añade el curso al carrito
  function addCart(e) {
    console.log(e);
       e.preventDefault();
       if(e.target.classList.contains('add-cart')) {
            const item = e.target.parentElement.parentElement.parentElement;//Eentramos a la card (imagen, texto y botones)
            console.log(item);
            // Función que obtiene la información del producto
            productInformation(item);
       }
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
          <td>${productData.price}</td>
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
       if(e.target.classList.contains('quit-item') ) {
            e.target.parentElement.parentElement.remove();
            item = e.target.parentElement.parentElement;
            itemId = item.querySelector('a').getAttribute('id');
       }
       removeProductsLocalStorage(itemId);
  }
  function emptyCart() {
       while(cartList.firstChild) {
            cartList.removeChild(cartList.firstChild);
       }
       // Vaciar Local Storage
       emptyLocalStorage();
       return false;
  }
  // Almacena productos Local Storage
  function saveProductLocalStorage(productData) {
      let items;
      items = getProductsLocalStorage();
      // guarda los items seleccionados en el localStorage
      items.push(productData);
       localStorage.setItem('items', JSON.stringify(items) );
  }
  // Comprueba elementos en Local Storage
  function getProductsLocalStorage() {
       let itemsLS;
       if(localStorage.getItem('items') === null) {
            itemsLS = [];
       } else {
            itemsLS = JSON.parse( localStorage.getItem('items') );
       }
       return itemsLS;
  }
  // Imprime los elementos del Local Storage en el carrito
  function readLocalStorage() {
      let itemsLS;
      itemsLS = getProductsLocalStorage();
      itemsLS.forEach(function(item){
          // constrir el template
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>
                    <img src="${item.image}" width=100>
               </td>
               <td>${item.tittle}</td>
               <td>${item.price}</td>
               <td>
                    <a href="#" class="quit-item" data-id="${item.id}">X</a>
               </td>
          `;
          cartList.appendChild(row);
      });
  }
  // Elimina por el ID en Local Storage
  function removeProductsLocalStorage(itemId) {
      let itemsLS;
      // Obtenemos el arreglo de cursos
      itemsLS = getProductsLocalStorage();
      // Iteramos comparando el ID del curso borrado con los del LS
      itemsLS.forEach(function(itemsLS, index) {
          if(itemsLS.id === itemId) {
              itemsLS.splice(index, 1);
          }
      });
      // Añadimos el arreglo actual a storage
      localStorage.setItem('items', JSON.stringify(itemsLS) );
  }
  // Elimina todos del Local Storage
  function emptyLocalStorage() {
      localStorage.clear();
  }

/---------- Initialize Firebase ----------/
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

function loginGoogle(e){
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    authentication(provider);
  }

  function authentication(provider){
    firebase.auth().signInWithPopup(provider).then(function(result) {
      let name =result.additionalUserInfo.profile.name;
      let photo = result.user.photoURL;
      paintUser(name,photo);

    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }

  function paintUser(name, photo){
  console.log(name, photo);
  document.getElementById("user-name").textContent = name;
  document.getElementById("user-photo").src= `${photo}`;
}

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

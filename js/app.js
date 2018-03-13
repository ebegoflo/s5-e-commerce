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
document.getElementById("search-product").addEventListener("submit", enter);


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
}
//

const products = result => {
  //console.log(result.results[0]);

  result.results.forEach((product, index) => {

    if(index < 22 && index > 9){

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

      /*function leerArticulo(articuloAdd) {
           // const infoCurso = {
           //      imagen: curso.querySelector('img').src,
           //      titulo: curso.querySelector('h4').textContent,
           //      precio: curso.querySelector('.precio span').textContent,
           // }
           //
           // insertarCarrito(infoCurso);
           console.log($imgProductIndex);

      }*/

    }
  })
}

const articulos = document.getElementById('lista-articulos');
articulos.addEventListener('click', comprarArticulos);
// Función que agrega carrito
let productsInCart =[];
function comprarArticulos(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if(e.target.classList.contains('comprar')) {
        let btnProduct = e.target;
        let idProduct = btnProduct.getAttribute('data-id'); //trae el valor del data
        productsInCart.push(idProduct);
        /*  const articuloAdd = e.target.parentElement.parentElement;
          console.log(articuloAdd);
          // Enviamos el curso seleccionado para tomar sus datos
          leerArticulo(articuloAdd);*/
     }
}

document.getElementById("checkout-cart").addEventListener("click", checkoutProducts);

function checkoutProducts() {

  productsInCart.forEach(element => {
    console.log(productsInCart);
  })
}

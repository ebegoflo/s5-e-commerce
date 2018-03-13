
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


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

    if(index < 9){

      //Agregando titulos
      $nameProductIndex=document.getElementById(`name${index}`);//select elemento contenedor de titulo
      let nameResult=result.results[index].title;//título
      $nameProductIndex.innerText=nameResult;//asignar a elemento el titulo
      
      // Agregando los precios
      $priceProductIndex=document.getElementById(`price${index}`); //select elemento contenedor de precio
      let priceResult=result.results[index].price;//precio
      $priceProductIndex.innerText=(`$${priceResult}`);
    }
  })
}


var formSearch= document.getElementById("form-search");
formSearch.addEventListener("submit",enter);
// console.log(formSearch);

function enter (e){
  e.preventDefault();
  var search=($('#search').val());
  fetch(`https://api.mercadolibre.com/sites/MLM/search?q=${search}`)
    .then(function(response) {
        response.json().then(
          function(result){
            // console.log(result);
            products(result)
          // console.log(result);
          }
        );
    });
}
//

const products =result=> {
  console.log(result.results[0]);

  result.results.forEach((product, index) => {
    // console.log(product);
    // console.log(index);
    if(index<9){
    // console.log(product);//Trae el arreglo
    // console.log(index);//Trae el índice
    $name = `name${index}`;//Contiene los ID
    // Agregando los Nombres
    $nameProductIndex=`$nameProductIndex${index}`;
    $nameProductIndex=document.getElementById($name);
    let nameResult=result.results[index].title;//Contiene cada título
    $nameProductIndex.innerText=nameResult;
    // Agregando los precios
    $price= `price${index}`;
    $priceProductIndex=`$priceProductIndex${index}`;
    $priceProductIndex=document.getElementById($price);
    let priceResult=result.results[index].price;//Contiene cada título
    $priceProductIndex.innerText=priceResult;

    }
      })

}

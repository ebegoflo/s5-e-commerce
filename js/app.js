// require('../../js/carousel.js') //Para que  el carrusel funcione
// $('.carousel').carousel();
//

  function search(search) {
    fetch(`https://api.mercadolibre.com/sites/${siteSelected}/search?q=${search}`)
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



var siteSelected = 'MLM';//Pais=México
var categorie = '';

// Función de busqueda
$('#btn-search').on('click', function(event) {//El evento se detona al dar enter
    search($('#search').val());
});




const products =result=> {

  result.results.forEach((product, index) => {
    if(index<9){
    // console.log(product);//Trae el arreglo
    // console.log(index);//Trae el índice
    $name = `name${index}`;//Contiene los ID
    // console.log($name);
    $nameProductIndex=`$nameProductIndex${index}`;
    $nameProductIndex=document.getElementById($name);
    let nameResult=result.results[index].title;//Contiene cada título
    $nameProductIndex.innerText=nameResult;
    }
      })

}

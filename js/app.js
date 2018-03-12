const apiload = () => { //funcion expression (hoisting le afecta)
    fetch(`https://api.mercadolibre.com/sites/MLM/search?category=MLM1132`, {method: 'GET'})//da por default get, si queremos otro añadimos asi {}
        .then(function(response){
            //console.log(response); //asi no te lo da en json
            response.json().then(function(result){
                console.log(result);
                
             //   paintMovies(result.results);
            })
        })
        .catch(function(err){
            console.log(err);
        });
};
apiload();

require('../../js/carousel.js') //Para que  el carrusel funcione
$('.carousel').carousel();


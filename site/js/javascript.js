/*Cargar Productos*/
$(document).ready(function(){
    loadData()
});

function loadData(){
    $.ajax({
        url: 'https://rifer.com.co/pruebafiles/arreglos_florales_json.php',
        success: function(result){
            feedContent(result.featured, "#featured", "f");
            feedContent(result.new, "#new", "n");
            feedContent(result.popular, "#popular", "p");
        },
        error: function(xhr){
            alert("Ocurrió un error: "+ xhr.status + "" + xhr.statusText)
        }
    });
}

function feedContent(dataJson, index, item){
    var content_html = "";
    for (let i=0; i<dataJson.length; i++){
        content_html += itemTemplate(i, dataJson[i], item);
    }
    $(index).html(content_html);
}

function itemTemplate(i, dataItem, item){
    return `
        <div class="product-item" id="${item}-${i}" onmouseover="animateScale('#${item}-${i}', 1.1)" onmouseout="animateScale('#${item}-${i}', 1)">
            <span class="name">${dataItem.name}</span>
            <img class="productImg" src="${dataItem.pic}" title="${dataItem.name}" alt="${dataItem.description}" onclick="openDialogImg()">
            <div class="mix">
                <span class="price">$${dataItem.price}</span>
                <button class="order-btn" onclick="addToCart()">Order Now</button>
            </div>
        </div>`;
}
/*Animaciones*/
function animateScale(obj, scale){
    anime({
        targets:obj,
        scale: scale,
        duration: 1000
    });
}

/*Añadir al Carro de Compras*/
let cart=0;

function addToCart(){
    cart+=1;
    document.getElementById("cart").innerHTML="cart("+cart+")";
    alert("Product Added to Cart!")
}


/*Dialog*/

function dialogProduct(){
    $( function() {
        $( "#dialog" ).dialog({
            width: 500,
            height: 600,
            modal: true 
        });
      } );
}
function openDialogImg(){
    $('body').on('click', '.productImg', function(event){
        event.preventDefault();
        let image=$(this).attr('src');
        let dialogHtml= `<div id="dialog" title="">
                            <div id="productImg"> 
                                <img id="dialogImg" src="${image}" width="100%" height="100%" ></img>
                            </div>
                        </div>`;
        $("#dialog").html(dialogHtml);
        dialogProduct();
    });
    
}

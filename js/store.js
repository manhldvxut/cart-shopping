if(document.readyState == 'loading'){
	document.addEventListener('DOMContentLoaded', ready)
} else{
	ready()
}
function ready(){
	// remove button
	var removeCartItemButton = document.getElementsByClassName('btn-danger')
	console.log(removeCartItemButton)

	// xoa button
	/*for(var i = 0; i <removeCartItemButton.length; i++ ){
		var button = removeCartItemButton[i]
		button.addEventListener('click', removeCartItem)
	}*/

	// chinh sua input khong bi am
	var quantityInputs = document.getElementsByClassName('cart-quantity-input')
	for(var i = 0; i <quantityInputs.length; i++ ){
		var input = quantityInputs[i]
		input.addEventListener('change', quantityChanged)
	}

	// add cart
	var addToCartButton = document.getElementsByClassName('shop-item-button')
	for(var i = 0; i<addToCartButton.length; i ++){
		var button = addToCartButton[i]
		button.addEventListener('click', addItemToCart)

	}
	$('.shop-item-button').click(function(){
		//UpDownPlus()

		loadvalue()

		//$('#rec_mode').find('option').not(':nth-child(n+ 5)').remove();

	})

	

	// test

	
	loadvalue()
	UpDownPlus()
		
	
}
function UpDownPlus(){
	// tang giam 
	$('.button').each(function(){
		$(this).on("click", function() {

	    var $button = $(this);
	    var oldValue = $button.parent().find("input.cart-quantity-input").val();

	    if ($button.text() == "+") {
	  	  var newVal = parseFloat(oldValue) + 1;
	  	} else {
		   // Don't allow decrementing below zero
	      if (oldValue > 0) {
	        var newVal = parseFloat(oldValue) - 1;
		    } else {
		        newVal = 0;
		      }
		  }

	    	$button.parent().find("input.cart-quantity-input").val(newVal);
	    	updateCartTotal()

	  	});
	})
}

function loadvalue(){
	$('.cart-items .cart-row').each(function(index){
		var mapRenderValue = $(this).find('.map-render').length
		var showValue = $(this).find('.show-value').length

		if(mapRenderValue > 0){
			$(this).find('.map-render').addClass('map-render_' + index)
		}

		if(showValue > 0){
			$(this).find('.show-value').addClass('show-value_' + index)
		}

		var options =
		[
			{
			    "text"  : "選択してください。",
			    "value" : "0",
			    "selected" : true
			},
			{
			    "text"  : "本",
			    "value" : "1000"
			},
			{
			    "text"     : "車",
			    "value"    : "2000",
			    
			},
			{
			    "text"  : "自転車",
			    "value" : "5000"
			}
		];

		var selectBox = document.getElementsByClassName('map-render_' + index)[0];
		var renderShowValue = document.getElementsByClassName('show-value_' + index)[0];
		
		// render select option
		for(var i = 0, l = options.length; i < l; i++){
		  var option = options[i];
		  selectBox.options.add( new Option(option.text, option.value, option.selected) );
		}
		
		$(this).on('change', function() {
		    var value = $('option:selected', this).val().replace(/Value\s/, '');
		    $(renderShowValue).text(value)
		    console.log(value)
		    updateCartTotal()
		});

		
	})
}
// xoa button

// them so luong hang khong bi am
function quantityChanged(event){
	var input = event.target
	if(isNaN(input.value) || input.value <= 0){
		input.value = 1
	}
	updateCartTotal()
}
// add cart item


function addItemToCart(){
	var cartRow = document.createElement('div')
	cartRow.classList.add('cart-row')
	var cartItems = document.getElementsByClassName('cart-items')[0]
	var cartItemsName = document.getElementsByClassName('cart-item-title')
	var cartRowContents = `
		<div class="row">
            <div class="col-4">
                <div class="cart-item cart-column">
                    <select id="rec_mode" class="map-render"></select>
                </div>
            </div>
            <div class="col-4">
                <span class="cart-price cart-column show-value show-value_0" id="show_only">0</span>
            </div>
            <div class="col-4">
                
                <div class="cart-quantity cart-column">
                    <div class="d-flex">
                        <div class="dec button">-</div>
                        <input class="cart-quantity-input" type="number" value="1">
                        <div class="inc button">+</div>
                        <button class="btn btn-danger" type="button">× 削除</button>
                    </div>
                </div>
                
            </div>
        </div>
	`
	cartRow.innerHTML = cartRowContents

	cartItems.append(cartRow)
	// xoa nut remove
	//cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
	// thay doi so luong
	cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

// thay doi gia tien khi xoa button
function updateCartTotal(){
	var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
	for(var i = 0; i< cartRows.length; i++){
		var cartRow = cartRows[i]
		var priceElement = cartRow.getElementsByClassName('cart-price')[0]
		var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
		var price = parseFloat(priceElement.innerText.replace('$', ''))
		var quantity = quantityElement.value
		total = total + (price * quantity)
	}
	total = Math.round(total * 100) / 100 // lam tron gia tri
	document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}


if(document.readyState == 'loading'){
	document.addEventListener('DOMContentLoaded', ready)
} else{
	ready()
}
function ready(){


	// chinh sua input khong bi am
	var quantityInputs = document.getElementsByClassName('cart-quantity-input')
	for(var i = 0; i <quantityInputs.length; i++ ){
		var input = quantityInputs[i]
		input.addEventListener('change', quantityChanged)
	}
	// show value

	var renderShowValue = document.getElementsByClassName('show-value')[0];
	for(var i = 0; i < renderShowValue.length; i ++){
		var input = renderShowValue[i]
		console.log(input)
	}

	// loop dropdowns
	$('.cart-items .cart-row').each(function(){
		var thisRemove = $(this);
		console.log(thisRemove)
		var renderShowValue = $(this).find('.cart-price')
		$(this).on('change', function() {
		    var value = $('option:selected', this).val().replace(/Value\s/, '');
		    $(renderShowValue).text(value)
		    //console.log(value)
		    updateCartTotal()
		});
		var btn = $(this).find('.btn-danger')
		var removeCart = $(this).find('.cart-row')
		//console.log(removeCart)
		$(btn).on('click',function(e){
			$(renderShowValue).text(0)
			updateCartTotal()
			thisRemove.remove()
			return;
		})
	})
	
	
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

// them so luong hang khong bi am
function quantityChanged(event){
	var input = event.target
	if(isNaN(input.value) || input.value <= 0){
		input.value = 1
	}
	updateCartTotal()
}
// add cart item

function pushcartItem(){
	setTimeout(() => {
		document.getElementById("pushCart\\").innerHTML += 
              `<div class="cart-row">
				<div class="row">
					<div class="col-4">
						<div class="cart-item cart-column">
							<select id="rec_mode" class="map-render map-render_0"><option value="0" selected="">選択してください。</option><option value="1000">本</option><option value="2000">車</option><option value="5000">自転車</option></select>
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
								<button class="btn btn-danger" type="button" value="1">× 削除</button>
							</div>
						</div>
						
					</div>
				</div>
			</div>
`;
	}, 3000);
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


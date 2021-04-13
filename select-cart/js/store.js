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
	for(var i = 0; i <removeCartItemButton.length; i++ ){
		var button = removeCartItemButton[i]
		button.addEventListener('click', removeCartItem)
	}
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
		button.addEventListener('click', addToCartClicked)
	}

	//purchase
	//document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)


	// tang giam 
	$(".button").on("click", function() {

    var $button = $(this);
    var oldValue = $button.parent().find("input").val();

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

    	$button.parent().find("input").val(newVal);

  	});

  	// select option

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

		var selectBox = document.getElementById('rec_mode');
		
		for(var i = 0, l = options.length; i < l; i++){
		  var option = options[i];
		  selectBox.options.add( new Option(option.text, option.value, option.selected) );
		}

		selectBox.addEventListener('change', function(){
			$('#show_only').val(this.value);
		})


}

// xoa button
function removeCartItem(){
	var buttonClicked = event.target
	buttonClicked.parentElement.parentElement.remove()
	//updateCartTotal()
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
function addToCartClicked(){
	var button = event.target
	var shopItem = button.parentElement.parentElement
	var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
	var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
	var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
	console.log(title, price, imageSrc)
	addItemToCart(title, price, imageSrc)
	updateCartTotal()
}

function addItemToCart(title, price, imageSrc){
	var cartRow = document.createElement('div')
	cartRow.classList.add('cart-row')
	var cartItems = document.getElementsByClassName('cart-items')[0]
	var cartItemsName = document.getElementsByClassName('cart-item-title')
	for(var i =0; i < cartItemsName.length; i ++){
		if(cartItemsName[i].innerText == title){
			alert('Ban da chon san pham nay')
			return
		}
	}
	var cartRowContents = `
	<div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
	cartRow.innerHTML = cartRowContents
	cartItems.append(cartRow)
	// xoa nut remove
	cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
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

// Nut purchase
function purchaseClicked(){
	alert('Cam on ban da mua hang')
	var cartItems = document.getElementsByClassName('cart-items')[0]
	while(cartItems.hasChildNodes()){
		cartItems.removeChild(cartItems.firstChild)
	}
	updateCartTotal()

}


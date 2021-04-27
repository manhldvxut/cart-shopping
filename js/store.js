if(document.readyState == 'loading'){
	document.addEventListener('DOMContentLoaded', ready)
} else{
	ready()
}
// add cart



function ready(){
	loopcartItem()
	buttonPlMi()

	// chinh sua input khong bi am
	var quantityInputs = document.getElementsByClassName('cart-quantity-input')
	for(var i = 0; i <quantityInputs.length; i++ ){
		var input = quantityInputs[i]
		input.addEventListener('change', quantityChanged)
	}
	// show value


	// add other cart

	$("#addMore").click(function(e) {
        var newSelect = $("#addCart").clone();
        $(newSelect).find('#show_only').text(0)
        $(newSelect).find('.cart-quantity-input').val(1)
        $("#select-wrapper").append(newSelect);
	    loopcartItem()
		buttonPlMi()
    });
		
	
}

// button plus and minus
function buttonPlMi(){
	$('.button').each(function(){
		$(this).bind("click", function() {

	    var $button = $(this)
	    var oldValue = $button.parent().find("input.cart-quantity-input").val();

	    if ($button.text() == "+") {
	  	  var newVal = parseFloat(oldValue) + 1;
	  	} else {
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
// loop item
function loopcartItem(){
	$('.cart-items .cart-row').each(function(){
		var thisRemove = $(this);

		var renderShowValue = $(this).find('.cart-price')
		$(this).on('change', function() {

			//value
		    var value = $('option:selected', this).val().replace(/Value\s/, '');

		    //push value
		    $(renderShowValue).text(value)

		    // update price
		    updateCartTotal()
		});

		var btn = $(this).find('.btn-danger')
		var removeCart = $(this).find('.cart-row')

		$(btn).bind('click',function(e){
			$(renderShowValue).text(0)
			updateCartTotal()

			// first line not remove
			var btnNum = $('.btn-danger').length
			if(btnNum > 1){
				thisRemove.remove()
			}
			
			return;
		})
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



/*

$(function() {

	$(".cart-items .cart-row").each(function(index){
	
        // Size selection
		if (localStorage.getItem('row_'+index+'_size')) {
			$(this).find('.map-render option').prop('selected', false).eq(localStorage.getItem('row_'+index+'_size')).prop('selected', true);
            console.log("Row#"+index+" get-size: "+localStorage.getItem('row_'+index+'_size'));
		}

		$(this).find(".map-render").on('change', function() {
			localStorage.setItem('row_'+index+'_size', $(this).find('option:selected').index());
            console.log("Row#"+index+" set size: "+$(this).find('option:selected').index());
		});
	});
});*/





$(function() {
	$('.slick').slick({
	    dots: false,
	    infinite: true,
		touchThreshold : 100,
	    speed: 300,
	    slidesToShow: 3,
	    slidesToScroll: 3,
		centerMode: true,
		nextArrow: '<button class="slick-next"><i class="fas fa-chevron-right"></i></button>',
		prevArrow: '<button class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
	    responsive: [{
	            breakpoint: 1024,
	            settings: {
	                slidesToShow: 4,
	                slidesToScroll: 4,
	            }
	        },
	        {
	            breakpoint: 600,
	            settings: {
	                slidesToShow: 2,
	                slidesToScroll: 2
	            }
	        },
	        {
	            breakpoint: 480,
	            settings: {
	                slidesToShow: 1,
	                slidesToScroll: 1
	            }
	        }
	    ]
	});
})




let carts = document.querySelectorAll('.add-cart');

let products = [
		{
			name:'THE AUTHENTICITY PROJECT',
			tag: 'fiction1',
			price: 46,
			inCart:0
		},
		
		{
			name:'KIM JI YOUNG, BORN 1982',
			tag: 'fiction2',
			price: 45,
			inCart:0
		},
		{
			name:'WRITERS & LOVERS',
			tag: 'fiction3',
			price: 59,
			inCart:0
		},
		{
			name:'DOUBLE AGENT',
			tag: 'fiction4',
			price: 46,
			inCart:0
		},
		
	];

    for(let i=0; i< carts.length; i++) {
        carts[i].addEventListener('click', () => {
            cartNumbers(products[i]);
            totalCost(products[i]);
        });
    }

    function getOrderInfo(){
        name = document.getElementById('name').value;
        phone = document.getElementById('phone').value;
        address = document.getElementById('address').value;

        let total =localStorage.getItem('total');
        let cartItems = localStorage.getItem('productsInCart');

        document.getElementById('summaryBtn').innerHTML = "Order Summary for " + localStorage.getItem('name');
        document.getElementById('summary_name').innerHTML = "Name " + localStorage.getItem('name');
        document.getElementById('summary_phone').innerHTML = "Contact " + localStorage.getItem('phone');
        document.getElementById('summary_address').innerHTML = "Address " + localStorage.getItem('address');
        


        let grandtotal = total.replace('$','');
        grandtotal = grandtotal.replace(',','');

        let finalPrice = 0
        let fee = 0;
        if(cartItems.length >= 5 && cartItems.length <= 10){
            finalPrice = Number(0.95) * parseFloat(grandtotal);
            if(finalPrice > 100){
                fee = 0;
            }else{
                fee = 10;
            }
            document.getElementsByClassName('basketTotalTitle')[0].innerHTML = "Discount 5%";
        }
        else if(cartItems.length > 10){
            finalPrice = Number(0.85) * parseFloat(grandtotal);
            if(finalPrice > 100){
                fee = 0;
            }else{
                fee = 10;
            }
            document.getElementsByClassName('basketTotalTitle')[0].innerHTML = "Basket Total:" + total + " <br> Discount: 15% <br> Postage: $" + fee + "<br>";
        }
        else{
            finalPrice= parseFloat(grandtotal);
            if(finalPrice > 100){
                fee = 0;
            }else{
                fee = 10;
            }
            document.getElementsByClassName('basketTotalTitle')[0].innerHTML = "Discount 0%";
        }

        document.getElementById('total').innerHTML = "Final Price: $" + finalPrice;
    }
    
    document.getElementById("submitBtn").addEventListener("click", function(event){
        event.preventDefault();
        let name = document.getElementById('name').value;
        let phone = document.getElementById('phone').value;
        let address = document.getElementById('address').value;
        let total = document.getElementById('total').innerHTML;
        localStorage.setItem("name", name);
        localStorage.setItem("phone", phone);
        localStorage.setItem("address", address);
        localStorage.setItem("total", total);

        Swal.fire({
            title: 'Order Successfull!',
            text: 'You will redirected to order summary page',
            icon: 'success',
            confirmButtonText: 'Next'
        }).then((result)=>{
            if (result.isConfirmed) {
                window.location.href = "orderSummary.html";
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    });
    
    function onLoadCartNumbers() {
        let productNumbers = localStorage.getItem('cartNumbers');
        if( productNumbers ) {
            document.querySelector('.cart span').textContent = productNumbers;
        }
    }
    
    function cartNumbers(product, action) {
        let productNumbers = localStorage.getItem('cartNumbers');
        productNumbers = parseInt(productNumbers);
    
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
    
        if( action ) {
            localStorage.setItem("cartNumbers", productNumbers - 1);
            document.querySelector('.cart span').textContent = productNumbers - 1;
            console.log("action running");
        } else if( productNumbers ) {
            localStorage.setItem("cartNumbers", productNumbers + 1);
            document.querySelector('.cart span').textContent = productNumbers + 1;
        } else {
            localStorage.setItem("cartNumbers", 1);
            document.querySelector('.cart span').textContent = 1;
        }
        setItems(product);
    }
    
    function setItems(product) {
        // let productNumbers = localStorage.getItem('cartNumbers');
        // productNumbers = parseInt(productNumbers);
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
    
        if(cartItems != null) {
            let currentProduct = product.tag;
        
            if( cartItems[currentProduct] == undefined ) {
                cartItems = {
                    ...cartItems,
                    [currentProduct]: product
                }
            } 
            cartItems[currentProduct].inCart += 1;
    
        } else {
            product.inCart = 1;
            cartItems = { 
                [product.tag]: product
            };
        }
    
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    }
    
    function totalCost( product, action ) {
        let cart = localStorage.getItem("totalCost");
    
        if( action) {
            cart = parseInt(cart);
    
            localStorage.setItem("totalCost", cart - product.price);
        } else if(cart != null) {
            
            cart = parseInt(cart);
            localStorage.setItem("totalCost", cart + product.price);
        
        } else {
            localStorage.setItem("totalCost", product.price);
        }
    }
    
    function displayCart() {
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
    
        let cart = localStorage.getItem("totalCost");
        cart = parseInt(cart);
    
        let productContainer = document.querySelector('.products');
        
        if( cartItems && productContainer ) {
            productContainer.innerHTML = '';
            Object.values(cartItems).map( (item, index) => {
                productContainer.innerHTML += 
                `<div class="product"><ion-icon name="close-circle"></ion-icon><img src="images/${item.tag}.jpg" />
                    <span class="sm-hide">${item.name}</span>
                </div>
                <div class="price sm-hide">$${item.price}.00</div>
                <div class="quantity">
                    <ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
                        <span>${item.inCart}</span>
                    <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>   
                </div>
                <div class="total">$${item.inCart * item.price}.00</div>`;
            });
    
            productContainer.innerHTML += `
                <div class="basketTotalContainer">
                    <h4 class="basketTotalTitle">Basket Total</h4>
                    <h4 id="total" class="basketTotal">$${cart}.00</h4>
                </div>`
    
            deleteButtons();
            manageQuantity();
        }
    }
    
    function manageQuantity() {
        let decreaseButtons = document.querySelectorAll('.decrease');
        let increaseButtons = document.querySelectorAll('.increase');
        let currentQuantity = 0;
        let currentProduct = '';
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
    
        for(let i=0; i < increaseButtons.length; i++) {

            decreaseButtons[i].addEventListener('click', () => {
                console.log(cartItems);
                currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
                console.log(currentQuantity);
                currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
                console.log(currentProduct);
    
                if( cartItems[currentProduct].inCart > 1 ) {
                    cartItems[currentProduct].inCart -= 1;
                    cartNumbers(cartItems[currentProduct], "decrease");
                    totalCost(cartItems[currentProduct], "decrease");
                    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                    displayCart();
                }
            });
    
            increaseButtons[i].addEventListener('click', () => {
                currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
                console.log(currentQuantity);
                currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
                console.log(currentProduct);
                // let cartItems = localStorage.getItem('productsInCart');
                console.log(cartItems);
                cartItems[currentProduct].inCart += 1;
                cartNumbers(cartItems[currentProduct]);
                totalCost(cartItems[currentProduct]);
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            });
        }
    }
    
    function deleteButtons() {
        let deleteButtons = document.querySelectorAll('.product ion-icon');
        let productNumbers = localStorage.getItem('cartNumbers');
        let cartCost = localStorage.getItem("totalCost");
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        let productName;
        console.log(cartItems);
    
        for(let i=0; i < deleteButtons.length; i++) {
            deleteButtons[i].addEventListener('click', () => {
                productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
                console.log(productNumbers);
                localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
                localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));
    
                delete cartItems[productName];
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    
                displayCart();
                onLoadCartNumbers();
            })
        }
    }
    
    onLoadCartNumbers();
    displayCart();
    
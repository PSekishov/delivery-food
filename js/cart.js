const cart = () => {

    const buttonCart = document.getElementById('cart-button');
    const modalCart = document.querySelector('.modal-cart');
    const close = modalCart.querySelector('.close');
    const modalBody = modalCart.querySelector('.modal-body');
    const buttonSend = modalCart.querySelector('.button-primary');
    const clearCart = modalCart.querySelector('.clear-cart'); 
    let modalPricetag = modalCart.querySelector('.modal-pricetag');

    /********** FUNCTIONS ***********/

    const resetCart = () => {
        modalBody.innerHTML = '';
        localStorage.removeItem('cart');
        modalCart.classList.remove('is-open');
    };

    const toPay = () => {
           
        let total = 0;
        modalPricetag.textContent = total;

        const cartArray = JSON.parse(localStorage.getItem('cart'));

        total = cartArray.reduce(function(sum, key) {
            return sum + (key.price * key.count);
        }, 0);

        modalPricetag.textContent = total;
        
    };

    const incrementCount = (id)=> {

        const cartArray = JSON.parse(localStorage.getItem('cart'));

        cartArray.map((item)=> {
            if(item.id === id){
                item.count++;
            }
            return item;
        });

        localStorage.setItem('cart', JSON.stringify(cartArray));
        toPay();
        renderItems(cartArray);
    };

    const decrementCount = (id)=> {
        
        const cartArray = JSON.parse(localStorage.getItem('cart'));

        cartArray.map((item)=> {
            if(item.id === id){
                item.count = item.count > 0 ? item.count -1 : 0;
                /*if(item.count > 0){
                    item.count--;
                } else {
                    item.count = 0;
                } */                              
            }
            return item;
        });

        localStorage.setItem('cart', JSON.stringify(cartArray));
        toPay();
        renderItems(cartArray);
    };

    const renderItems = (data) => {

        modalBody.innerHTML = '';

        data.forEach(({name, price, id, count}) => {
           
            const cartElem = document.createElement('div');
            cartElem.classList.add('food-row');
            // console.log(cartElem);
            cartElem.innerHTML = `               
                <span class="food-name">${name}</span>
                <strong class="food-price">${price} ₽</strong>
                <div class="food-counter">
                    <button class="counter-button btn-dec" data-index="${id}">-</button>
                    <span class="counter">${count}</span>
                    <button class="counter-button btn-inc" data-index="${id}">+</button>
                 </div>               
            `;          

            /*cartElem.querySelector('.btn-dec').addEventListener('click', ()=> {
                decrementCount(id);
            });
            cartElem.querySelector('.btn-inc').addEventListener('click', ()=> {
                incrementCount(id);
            } );*/

            

            modalBody.append(cartElem);
            
        });
       
    };


    modalBody.addEventListener('click', (e)=> {
        e.preventDefault();
    
        if(e.target.classList.contains('btn-inc')){
            incrementCount(e.target.dataset.index)
        } else if(e.target.classList.contains('btn-dec')){
            decrementCount(e.target.dataset.index)
        }
    });

    buttonSend.addEventListener('click', ()=> {

        const cartArray = localStorage.getItem('cart');

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: cartArray
        })
        .then(response => {
            if(response.ok){
                swal("Заказ успешно отправлен!", "", "success");
                resetCart();
            } else if (!response.ok){
                swal("Произошла ошибка при отправке заявки!", "", "error");
            }
        })
        .catch(e => {
            console.error(e);
        });

    });

    clearCart.addEventListener('click', ()=> {
        resetCart();
    });
    
    buttonCart.addEventListener('click', ()=> {
        // console.log(JSON.parse(localStorage.getItem('cart'))); 
        if(JSON.parse(localStorage.getItem('cart'))){
            renderItems(JSON.parse(localStorage.getItem('cart')));
            
        };
        modalCart.classList.add('is-open');
        toPay();
    });

    close.addEventListener('click', ()=> {
        modalCart.classList.remove('is-open');   
    });

};

cart();

// - В модальном окне корзины есть кнопка Отмена. 
//   По клику на нее реализовать очистку корзины и закрытие модального окна.
// clear-cart
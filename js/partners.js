const renderItems = (data) => {
  
    data.forEach((item) =>{

        const restoran = {
            image: item.image,
            kitchen: item.kitchen, 
            name: item.name,
            price: item.price,
            products: item.products,
            stars: item. stars,
            time_of_delivery: item.time_of_delivery,
        };
       
        console.log(restoran);

        for(item in restoran){
            // console.log(item);
            // if(item === 'products'){
                console.log(restoran[item]);
            // } 
        }

    });    

};

fetch('https://restorans-97e29-default-rtdb.firebaseio.com/db/partners.json')
    .then((response) => response.json())
    .then((data) => {
        renderItems(data);
    })
    .catch((error) => {
        console.log(error)
    });

// fetch('https://restorans-97e29-default-rtdb.firebaseio.com/db/partners.json')
//     .then((response) => response.json())
//     .then((data) => {
//         renderItems(data);
//     })
//     .catch((error) => {
//         console.log(error)
//     });    
   
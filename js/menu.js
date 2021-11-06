const restoran = 'pizza-plus';

const renderItems = (data) => {
    
    data.forEach((item) =>{

        const product = {
            id: item.id,
            name: item.name,
            description: item.description,        
            price: item.price,
            image: item.image,
        };

        console.log(product);

        for(item in product){
            // console.log(item);
            // if(item === 'name'){
                console.log(product[item]);
            // } 
        }


    });
};

fetch(`./db/${restoran}.json`)
    .then((response) => response.json())
    .then((data) => {
        renderItems(data);
    })
    .catch((error) => {
        console.log(error)
    }); 
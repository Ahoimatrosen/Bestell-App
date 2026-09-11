function renderOrderOptions() {
    const orderOptionsSectionRef = document.getElementById("order_options_section");
    orderOptionsSectionRef.innerHTML = "";
    for (let indexOrderOptions = 0; indexOrderOptions < orderOptions.length; indexOrderOptions++) {
        const orderOptionsBannerTitle = orderOptions[indexOrderOptions].bannerTitle;
        const oderOptionsBannerImage = orderOptions[indexOrderOptions].bannerImage;
        orderOptionsSectionRef.innerHTML += getOrderOptionsSectionTemplate(orderOptionsBannerTitle, oderOptionsBannerImage, indexOrderOptions);
        const orderOptionsRef = document.getElementById("order_options" + indexOrderOptions);
        orderOptionsRef.innerHTML = "";
        const orderOptionItems = orderOptions[indexOrderOptions].items;
        for (let indexOrderOption = 0; indexOrderOption < orderOptionItems.length; indexOrderOption++) {
            const orderOptionItemName = orderOptionItems[indexOrderOption].name;
            const orderOptionItemIngredients = orderOptionItems[indexOrderOption].ingredients;
            const orderOptionItemImage = orderOptionItems[indexOrderOption].image;
            const orderOptionItemPrice = orderOptionItems[indexOrderOption].price.toFixed(2).replace(".", ",");
            orderOptionsRef.innerHTML += getOrderOptionsTemplate(
                orderOptionItemName,
                orderOptionItemIngredients,
                orderOptionItemImage,
                orderOptionItemPrice,
                indexOrderOptions,
                indexOrderOption,
            );
        }
    }
}

function renderBasketItems() {
    const orderBasketRef = document.getElementById("order_basket_items");
    orderBasketRef.innerHTML = "";
    for (let indexBasket = 0; indexBasket < basketItems.length; indexBasket++) {
        const basketItem = basketItems[indexBasket];
        const basketItemName = basketItem.name;
        const basketItemPrice = basketItem.price.toFixed(2).replace(".", ",");
        let basketItemAmount = basketItem.amount;
        let basketItemTotalPrice = basketItem.price * basketItem.amount;
        let formattedBasketItemTotalPrice = basketItemTotalPrice.toFixed(2).replace(".", ",");
        orderBasketRef.innerHTML += getOrderBasketItemTemplate(
            basketItemName,
            basketItemPrice,
            basketItemAmount,
            indexBasket,
            formattedBasketItemTotalPrice,
        );
    }
}

function changeButtonAppearance(indexOrderOptions, indexOrderOption) {
    const orderItemButtonRef = document.getElementById("order_item_button" + indexOrderOptions + indexOrderOption);
    const orderItemName = orderOptions[indexOrderOptions].items[indexOrderOption].name;
    let itemAmount = 0;
    for (let index = 0; index < basketItems.length; index++) {
        if (basketItems[index].name == orderItemName) {
            itemAmount = basketItems[index].amount;
            break;
        }
    }
    if (itemAmount > 0) {
        orderItemButtonRef.classList.add("clicked");
        orderItemButtonRef.innerHTML = "Added" + " " + itemAmount;
    } else if (itemAmount === 0) {
        orderItemButtonRef.classList.remove("clicked");
        orderItemButtonRef.innerHTML = "Add to Basket";
    }
}

function addToBasket(indexOrderOptions, indexOrderOption) {
    const orderItemName = orderOptions[indexOrderOptions].items[indexOrderOption].name;
    const orderItemPrice = orderOptions[indexOrderOptions].items[indexOrderOption].price;
    let isFound = false;
    for (let index = 0; index < basketItems.length; index++) {
        if (basketItems[index].name == orderItemName) {
            basketItems[index].amount++;
            isFound = true;
        }
    }
    if (!isFound) {
        basketItems.push({
            name: orderItemName,
            price: orderItemPrice,
            amount: 1,
            indexOrderOptions: indexOrderOptions,
            indexOrderOption: indexOrderOption,
        });
    }
    changeButtonAppearance(indexOrderOptions, indexOrderOption);
    renderBasketItems();
}

function decreaseAmount(indexBasket) {
    const basketIndexOrderOptions = basketItems[indexBasket].indexOrderOptions;
    const basketIndexOrderOption = basketItems[indexBasket].indexOrderOption;
    basketItems[indexBasket].amount--;
    if (basketItems[indexBasket].amount === 0) {
        basketItems.splice(indexBasket, 1);
    }
    changeButtonAppearance(basketIndexOrderOptions, basketIndexOrderOption);
    renderBasketItems();
}

function increaseAmount(indexBasket) {
    const basketIndexOrderOptions = basketItems[indexBasket].indexOrderOptions;
    const basketIndexOrderOption = basketItems[indexBasket].indexOrderOption;
    basketItems[indexBasket].amount++;
    changeButtonAppearance(basketIndexOrderOptions, basketIndexOrderOption);
    renderBasketItems();
}

function deleteFromBasket(indexBasket) {
    const basketIndexOrderOptions = basketItems[indexBasket].indexOrderOptions;
    const basketIndexOrderOption = basketItems[indexBasket].indexOrderOption;
    basketItems.splice(indexBasket, 1);
    changeButtonAppearance(basketIndexOrderOptions, basketIndexOrderOption);
    renderBasketItems();
}

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
        orderBasketRef.innerHTML += getOrderBasketItemTemplate(basketItemName, basketItemPrice, basketItemAmount, indexBasket);
    }
}

function changeButtonAppearance(indexOrderOptions, indexOrderOption) {
    const orderItemButtonRef = document.getElementById("order_item_button" + indexOrderOptions + indexOrderOption);
    orderItemButtonRef.classList.add("clicked");
    if (orderItemButtonRef.classList.contains("clicked")) {
        orderItemButtonRef.innerHTML = "Added";
    }
}

function addToBasket(indexOrderOptions, indexOrderOption) {
    changeButtonAppearance(indexOrderOptions, indexOrderOption);
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
        basketItems.push({ name: orderItemName, price: orderItemPrice, amount: 1 });
    }

    renderBasketItems();
}

function deleteFromBasket(indexBasket) {
    basketItems[indexBasket].amount--;
    if (basketItems[indexBasket].amount == 0) {
        basketItems.splice(indexBasket, 1);
    }
    renderBasketItems();
}

function increaseAmount(indexBasket) {
    basketItems[indexBasket].amount++;
    renderBasketItems();
}

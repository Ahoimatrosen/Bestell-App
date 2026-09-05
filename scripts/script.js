function renderOrderOptions() {
    let orderOptionsSectionRef = document.getElementById("order_options_section");
    orderOptionsSectionRef.innerHTML = "";
    for (let indexOrderOptions = 0; indexOrderOptions < orderOptions.length; indexOrderOptions++) {
        const orderOptionsBannerTitle = orderOptions[indexOrderOptions].bannerTitle;
        const oderOptionsBannerImage = orderOptions[indexOrderOptions].bannerImage;
        orderOptionsSectionRef.innerHTML += getOrderOptionsSectionTemplate(orderOptionsBannerTitle, oderOptionsBannerImage, indexOrderOptions);
        let orderOptionsRef = document.getElementById("order_options" + indexOrderOptions);
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

function changeButtonAppearance(indexOrderOptions, indexOrderOption) {
    const orderItemButtonRef = document.getElementById("order_item_button" + indexOrderOptions + indexOrderOption);
    orderItemButtonRef.classList.add("clicked");
    if (orderItemButtonRef.classList.contains("clicked")) {
        orderItemButtonRef.innerText = "Added 1";
    }
    renderBasketItems();
}

function addToBasket(indexOrderOptions, indexOrderOption) {
    changeButtonAppearance(indexOrderOptions, indexOrderOption);
}

function renderBasketItems() {
    const orderBasketRef = document.getElementById("order_basket_items");
    orderBasketRef.innerHTML = "";
    for (let indexBasket = 0; indexBasket < basketItems.length; indexBasket++) {
        const basketItem = basketItems[indexBasket];
        const basketItemAmount = basketItem.orderOptionAmount;
        const basketItemName = basketItem.orderOptionName;
        const basketItemPrice = basketItem.orderOptionPrice;
        orderBasketRef.innerHTML += getOrderBasketItemTemplate(basketItemAmount, basketItemName, basketItemPrice);
    }
}

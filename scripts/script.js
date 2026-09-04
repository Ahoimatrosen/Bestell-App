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

function addToBasket(indexOrderOptions, indexOrderOption) {
    const orderItemButtonRef = document.getElementById("order_item_button" + indexOrderOptions + indexOrderOption);

    let orderOptionAmount = orderOptions[indexOrderOptions].items[indexOrderOption].amount;

    let orderOptionName = orderOptions[indexOrderOptions].items[indexOrderOption].name;

    let orderOptionPrice = orderOptions[indexOrderOptions].items[indexOrderOption].price;

    let indexInBasket = basketItems.findIndex((item) => item.orderOptionName === orderOptionName);

    orderItemButtonRef.classList.toggle("clicked");

    if (orderItemButtonRef.classList.contains("clicked")) {
        orderItemButtonRef.innerText = "Added 1";
        orderOptionAmount++;
        basketItems.push({ orderOptionAmount, orderOptionName, orderOptionPrice });
    } else {
        orderItemButtonRef.innerText = "Add to basket";
        orderOptionAmount--;
        basketItems.splice(indexInBasket, 1);
    }
    renderBasketItems();
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

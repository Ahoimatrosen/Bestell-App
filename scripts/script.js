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
    renderBasket();
}

function addToBasket(indexOrderOptions, indexOrderOption) {
    const orderItemButtonRef = document.getElementById("order_item_button" + indexOrderOptions + indexOrderOption);
    let orderOptionAmount = orderOptions[indexOrderOptions].items[indexOrderOption].amount;
    orderItemButtonRef.classList.toggle("clicked");
    if (orderItemButtonRef.classList.contains("clicked")) {
        orderItemButtonRef.innerText = "Added 1";
        orderOptionAmount = 1;
    } else {
        orderItemButtonRef.innerText = "Add to basket";
        orderOptionAmount = 0;
    }

    // oderBasketRef = document.getElementById("order_Basket");
}

//todo: die buttons müssen beim anclicken ihr styling wechseln
//todo: die buttons müssen beim anclicken ein item in den basket hinzufügen
//todo: der basket muss rechts sein aber sticky, damit er immer zu sehen ist
//todo: die gesamte seite responsive werden: zu kleineren Bildschirmen UND zu größeren Bildschirmen
//todo: die preise im basket müssen zusammengerechnet werden
//todo: beim bestellen muss ein dialog aufploppen, der angibt, dass man bestellt hat
//todo: der dialog muss gestyled und gebaut werden

function renderBasket() {
    orderBasketRef = document.getElementById("order_basket_items");
    for (let indexBasket = 0; indexBasket < basketItems.length; indexBasket++) {
        orderBasketRef.innerHTML += getOrderBasketItemTemplate(indexBasket);
    }
}

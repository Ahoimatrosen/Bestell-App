function renderOrderOptions() {
    let orderOptionsSectionRef = document.getElementById("orderOptionsSection");

    orderOptionsSectionRef.innerHTML = "";

    for (let indexOrderOptions = 0; indexOrderOptions < orderOptions.length; indexOrderOptions++) {
        const orderOptionsBannerTitle = orderOptions[indexOrderOptions].bannerTitle;

        const oderOptionsBannerImage = orderOptions[indexOrderOptions].bannerImage;

        orderOptionsSectionRef.innerHTML += getOrderOptionsSectionTemplate(orderOptionsBannerTitle, oderOptionsBannerImage, indexOrderOptions);

        let orderOptionsRef = document.getElementById("orderOptions" + indexOrderOptions);

        //todo aus irgendeinem Grund wird orderOptionsRef = null gesetzt, ich vermute, dass es an der Renderreihenfolge liegt
        orderOptionsRef.innerHTML = "";

        const orderOptionItems = orderOptions[indexOrderOptions].items;

        for (let indexOrderOption = 0; indexOrderOption < orderOptionItems.length; indexOrderOption++) {
            const orderOptionItemName = orderOptionItems[indexOrderOption].name;
            const orderOptionItemIngredients = orderOptionItems[indexOrderOption].ingredients;
            const orderOptionItemImage = orderOptionItems[indexOrderOption].image;
            const orderOptionItemPrice = orderOptionItems[indexOrderOption].price;

            orderOptionsRef.innerHTML += getOrderOptionsTemplate(
                orderOptionItemName,
                orderOptionItemIngredients,
                orderOptionItemImage,
                orderOptionItemPrice,
            );
        }
    }
}

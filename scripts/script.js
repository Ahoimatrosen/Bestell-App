//todo: styling in css anpassen: die bilder sind nicht mehr wie vorher und der button ist zu groß und an der falschen stelle und die blöcke sind komisch aufgeteilt
//todo: preis muss zwei stellen nach dem komma  und "€" anzeigen
//todo:

function renderOrderOptions() {
    let orderOptionsSectionRef = document.getElementById("orderOptionsSection");

    orderOptionsSectionRef.innerHTML = "";

    for (let indexOrderOptions = 0; indexOrderOptions < orderOptions.length; indexOrderOptions++) {
        const orderOptionsBannerTitle = orderOptions[indexOrderOptions].bannerTitle;

        const oderOptionsBannerImage = orderOptions[indexOrderOptions].bannerImage;

        orderOptionsSectionRef.innerHTML += getOrderOptionsSectionTemplate(orderOptionsBannerTitle, oderOptionsBannerImage, indexOrderOptions);

        let orderOptionsRef = document.getElementById("orderOptions" + indexOrderOptions);

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
            );
        }
    }
}

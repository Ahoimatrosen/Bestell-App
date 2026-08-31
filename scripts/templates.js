function getOrderOptionsSectionTemplate(orderOptionsBannerTitle, orderOptionsBannerImage, indexOrderOptions) {
    return `
    <article>
        <div class="title_banner">
            <div>
                <img class="title_banner_img" src="${orderOptionsBannerImage}" alt="Burger-Icon" />
                <h2 class="title_banner_title">${orderOptionsBannerTitle}</h2>
            </div>
        </div>
        <div id="orderOptions${indexOrderOptions}" class="content"></div>
    </article>
    `;
}

function getOrderOptionsTemplate(orderOptionItemName, orderOptionItemIngredients, orderOptionItemImage, orderOptionItemPrice) {
    return `
        <article class="order_item">
            <img class="order_item_img" src="${orderOptionItemImage}" alt="order-img" />
            <div class="order_item_description">
                <h2 class="order_item_title">${orderOptionItemName}</h2>
                <p class="order_item_ingredients">${orderOptionItemIngredients}</p>
            /div>
            <div class="order_item_order_container">
                <h2 class="order_item_price">${orderOptionItemPrice}</h2>
                <button class="order_item_button">Add to basket</button>
            </div>
        </article>
        `;
}

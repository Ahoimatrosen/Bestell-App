function getOrderOptionsSectionTemplate(orderOptionsBannerTitle, orderOptionsBannerImage, indexOrderOptions) {
    return `
    <article>
        <div class="title_banner">
            <div>
                <img class="title_banner_img" src="${orderOptionsBannerImage}" alt="Burger-Icon" />
                <h2 class="title_banner_title">${orderOptionsBannerTitle}</h2>
            </div>
        </div>
        <div id="order_options${indexOrderOptions}" class="content"></div>
    </article>
    `;
}

function getOrderOptionsTemplate(
    orderOptionItemName,
    orderOptionItemIngredients,
    orderOptionItemImage,
    orderOptionItemPrice,
    indexOrderOptions,
    indexOrderOption,
) {
    return `
        <article class="order_item">
            <img class="order_item_img" src="${orderOptionItemImage}" alt="order-img" />
            <div class="order_item_text">
                <div class="order_item_description">
                    <h2 class="order_item_title">${orderOptionItemName}</h2>
                    <p class="order_item_ingredients">${orderOptionItemIngredients}</p>
                </div>
                <div class="order_item_order_container">
                    <h2 class="order_item_price">${orderOptionItemPrice} €</h2>
                    <button id="order_item_button${indexOrderOptions}${indexOrderOption}" onclick="addToBasket(${indexOrderOptions},${indexOrderOption})" class="order_item_button">Add to basket</button>
                </div>
            </div>
        </article>
        `;
}

function getOrderBasketItemTemplate(basketItemAmount, basketItemName, basketItemPrice) {
    return `
    <div class="basket_item">
        <h3 class="basket_item_title">${basketItemAmount}x ${basketItemName}</h3>
        <footer class="basket_item_footer">
        <div class="basket_item_footer_buttons">
                <button class="basket_button">
                    <img class="no_padding" src="./assets/icons/delete-icon-small.png" alt="delete-icon" />
                    </button>
                    1
                <button class="basket_item_button">+</button>
            </div>
            <h4>${basketItemPrice}€</h4>
        </footer>
    </div>
    `;
}

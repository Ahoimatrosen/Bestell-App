function getOrderOptionsSectionTemplate(orderOptionsBannerTitle, orderOptionsBannerImage, indexOrderOptions) {
    return `
    <article>
    <div class="title_banner">
            <div>
                <img class="title_banner_img" src="${orderOptionsBannerImage}" alt="Burger-Icon" />
                <h2 class="title_banner_title">${orderOptionsBannerTitle}</h2>
            </div>
        </div>
        <div id="order_options${indexOrderOptions}" class="order_option_container"></div>
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

function getOrderBasketItemTemplate(basketItemName, basketItemPrice, basketItemAmount, indexBasket, formattedBasketItemTotalPrice) {
    if (basketItemAmount === 1) {
        return `
    <div id="basket_item${indexBasket}" class="basket_item">
        <h3 class="basket_item_title">${basketItemAmount}x ${basketItemName}</h3>
        <footer class="basket_item_footer">
            <div class="basket_item_footer_buttons">
                <button onclick="deleteFromBasket(${indexBasket})" class="basket_item_button">
                    <img src="./assets/icons/delete-icon-small.png" alt="delete-icon" />
                </button>
                ${basketItemAmount}
                <button onclick="increaseAmount(${indexBasket})" class="basket_item_button">+</button>
            </div>
            <h4>${basketItemPrice}€</h4>
        </footer>
    </div>
    `;
    } else if (basketItemAmount > 1) {
        return `
<div id="basket_item${indexBasket}" class="basket_item">
            <header class="basket_item_header">
                <h3 class="basket_item_title">${basketItemAmount}x ${basketItemName}</h3>
                <button onclick="deleteFromBasket(${indexBasket})">
                    <img class="no_padding basket_delete_button" src="./assets/icons/delete-icon-small.png" alt="delete-icon" />
                </button>
            </header>
            <footer class="basket_item_footer">
                <div class="basket_item_footer_buttons">
                    <button onclick="decreaseAmount(${indexBasket})" class="">-</button>
                    ${basketItemAmount}
                    <button onclick="increaseAmount(${indexBasket})" class="basket_item_button">+</button>
                </div>
                <h4>${formattedBasketItemTotalPrice}€</h4>
            </footer>
        </div>
        `;
    }
}

function getEmptyBasketTemplate() {
    return `
            <div class="basket_preview">
                <p>Nothing here yet. Go ahead and choose something delicious!</p>
                <img src="./assets/img/basket-big.png" alt="basket" />
            </div>
            `;
}

function getBasketCheckoutTemplate(formattedBasketSubTotal, deliveryFee, formattedBasketTotal) {
    return `
        <table class="basket_checkout_table">
            <tr>
                <th>Subtotal</th>
                <td>${formattedBasketSubTotal}</td>
            </tr>
            <tr>
                <th>Delivery Fee</th>
                <td>${deliveryFee}€</td>
            </tr>
        </table>
        <div class="basket_item_table_seperator"></div>
        <table class="basket_total_table">
            <tr>
                <th>Total</th>
                <td>${formattedBasketTotal}€</td>
            </tr>
        </table>
        <button class="basket_buy_button" onclick="checkOut()">Buy now (${formattedBasketTotal}€)</button>
    `;
}

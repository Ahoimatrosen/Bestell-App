function renderOrderOptionSections() {
    const orderOptionsSectionRef = document.getElementById("order_options_section");
    orderOptionsSectionRef.innerHTML = "";
    for (let indexOrderOptions = 0; indexOrderOptions < orderOptions.length; indexOrderOptions++) {
        const orderOptionsBannerTitle = orderOptions[indexOrderOptions].bannerTitle;
        const oderOptionsBannerImage = orderOptions[indexOrderOptions].bannerImage;
        orderOptionsSectionRef.innerHTML += getOrderOptionsSectionTemplate(orderOptionsBannerTitle, oderOptionsBannerImage, indexOrderOptions);
        renderOrderOptions(indexOrderOptions);
    }
}

function renderOrderOptions(indexOrderOptions) {
    const orderOptionsRef = document.getElementById("order_options" + indexOrderOptions);
    const orderOptionItems = orderOptions[indexOrderOptions].items;
    for (let indexOrderOption = 0; indexOrderOption < orderOptionItems.length; indexOrderOption++) {
        const orderOptionItemName = orderOptionItems[indexOrderOption].name;
        const orderOptionItemIngredients = orderOptionItems[indexOrderOption].ingredients;
        const orderOptionItemImage = orderOptionItems[indexOrderOption].image;
        const orderOptionItemPrice = orderOptionItems[indexOrderOption].price.toFixed(2).replace(".", ",");
        const orderOptionItemImageAlt = orderOptionItems[indexOrderOption].imageAlt;
        orderOptionsRef.innerHTML += getOrderOptionsTemplate(
            orderOptionItemName,
            orderOptionItemIngredients,
            orderOptionItemImage,
            orderOptionItemPrice,
            indexOrderOptions,
            indexOrderOption,
            orderOptionItemImageAlt,
        );
    }
}

function renderBasket() {
    const orderBasketRef = document.getElementById("order_basket_items");
    const basketCheckoutRef = document.getElementById("basket_checkout_table");
    if (basketItems.length === 0) {
        renderEmptyBasket(orderBasketRef, basketCheckoutRef);
    } else {
        renderFilledBasket(orderBasketRef, basketCheckoutRef);
    }
}

function renderEmptyBasket(orderBasketRef, basketCheckoutRef) {
    orderBasketRef.innerHTML = getEmptyBasketTemplate();
    basketCheckoutRef.innerHTML = "";
}

function renderFilledBasket(orderBasketRef, basketCheckoutRef) {
    orderBasketRef.innerHTML = "";
    const basketTotals = calculateBasketTotals();
    renderBasketItems(orderBasketRef);

    basketCheckoutRef.innerHTML = getBasketCheckoutTemplate(basketTotals.basketSubTotal, basketTotals.deliveryFee, basketTotals.basketTotal);
}

function renderBasketItems(orderBasketRef) {
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

function calculateBasketTotals() {
    let basketSubTotal = 0;
    const deliveryFee = 4.99;
    for (let indexTotalPrice = 0; indexTotalPrice < basketItems.length; indexTotalPrice++) {
        basketSubTotal += basketItems[indexTotalPrice].price * basketItems[indexTotalPrice].amount;
    }
    const basketTotal = basketSubTotal + deliveryFee;
    return {
        basketSubTotal: basketSubTotal.toFixed(2).replace(".", ","),
        deliveryFee: deliveryFee.toFixed(2).replace(".", ","),
        basketTotal: basketTotal.toFixed(2).replace(".", ","),
    };
}

function changeButtonAppearance(indexOrderOptions, indexOrderOption) {
    const orderItemName = orderOptions[indexOrderOptions].items[indexOrderOption].name;
    const orderItemButtonTextRef = document.getElementById("order_item_button_text" + indexOrderOptions + indexOrderOption);
    let itemAmount = 0;
    for (let index = 0; index < basketItems.length; index++) {
        if (basketItems[index].name == orderItemName) {
            itemAmount = basketItems[index].amount;
            break;
        }
    }
    if (itemAmount > 0) {
        orderItemButtonTextRef.classList.add("clicked");
        setTimeout(() => {
            orderItemButtonTextRef.innerHTML = "Added" + " " + itemAmount;
        }, 100);
    } else if (itemAmount === 0) {
        orderItemButtonTextRef.classList.remove("clicked");
        orderItemButtonTextRef.innerHTML = "Add to Basket";
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
    renderBasket();
}

function decreaseAmount(indexBasket) {
    const basketIndexOrderOptions = basketItems[indexBasket].indexOrderOptions;
    const basketIndexOrderOption = basketItems[indexBasket].indexOrderOption;
    basketItems[indexBasket].amount--;
    if (basketItems[indexBasket].amount === 0) {
        basketItems.splice(indexBasket, 1);
    }
    changeButtonAppearance(basketIndexOrderOptions, basketIndexOrderOption);
    renderBasket();
}

function increaseAmount(indexBasket) {
    const basketIndexOrderOptions = basketItems[indexBasket].indexOrderOptions;
    const basketIndexOrderOption = basketItems[indexBasket].indexOrderOption;
    basketItems[indexBasket].amount++;
    changeButtonAppearance(basketIndexOrderOptions, basketIndexOrderOption);
    renderBasket();
}

function deleteFromBasket(indexBasket) {
    const basketIndexOrderOptions = basketItems[indexBasket].indexOrderOptions;
    const basketIndexOrderOption = basketItems[indexBasket].indexOrderOption;
    basketItems.splice(indexBasket, 1);
    changeButtonAppearance(basketIndexOrderOptions, basketIndexOrderOption);
    renderBasket();
}

function showCheckoutDialog() {
    const checkoutDialogRef = document.getElementById("checkout_dialog");
    checkoutDialogRef.showModal();
}

function closeCheckoutDialog() {
    const checkoutDialogRef = document.getElementById("checkout_dialog");
    checkoutDialogRef.close();
}

function checkOut() {
    showCheckoutDialog();
    closeBasketOnMobile();
    setTimeout(() => {
        basketItems = [];
        closeCheckoutDialog();
        renderBasket();
        renderOrderOptionSections();
    }, 2500);
}

function toggleBasketOnMobile() {
    const basketRef = document.getElementById("basket");
    basketRef.classList.toggle("open");
}

function openBasketOnMobile() {
    const basketRef = document.getElementById("basket");
    basketRef.classList.add("is-animating");
    basketRef.classList.add("open");
}

function closeBasketOnMobile() {
    const basketRef = document.getElementById("basket");
    basketRef.classList.add("is-animating");
    basketRef.classList.remove("open");
    setTimeout(() => {
        basketRef.classList.remove("is-animating");
    }, 250);
}

function hideMobileNavbar() {
    document.getElementById("mobileNavbar").classList.add("d_none");
}

function showMobileNavbar() {
    document.getElementById("mobileNavbar").classList.remove("d_none");
}

// stopping transition from triggering while window resizing
let resizeTimer;
window.addEventListener("resize", () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400);
});

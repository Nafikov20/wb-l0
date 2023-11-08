

const modalOpenButtons = document.querySelectorAll('[data-modal]'),
    modalCloseButtons = document.querySelectorAll('.close-modal'),
    dialogs = document.querySelectorAll('dialog'),
    btnAddressPoint = document.querySelector('#address-point'),
    btnAddressCourier = document.querySelector('#address-courier'),
    shipAddressPoint = document.querySelector('.ship-address__wrapper-point'),
    shipAddressCourier = document.querySelector('.ship-address__wrapper-courier'),
    shippingDeleteButtons = document.querySelectorAll('.btn__delete'),
    shipForm = document.querySelector('.ship-dialog__form'),
    paymentForm = document.querySelector('.payment-dialog__form');

// модальное окно
function showModal(event) {
    const button = event.currentTarget;
    const modalID = button.dataset.modal;
    const modal = document.getElementById(modalID);

    if (modal) {
        modal.showModal();
    }
}

function hideModal(event) {
    const button = event.currentTarget;
    const modal = button.closest('dialog');

    if (modal) {
        modal.close();
    }
}

function deleteShipAddress(event) {
    const item = event.target.closest('.ship-address__courier, .ship-address__point');
    const input = item.querySelector('input');
    const isCurrentItem = input.checked;
    const siblingItem = item.nextElementSibling || item.previousElementSibling;

    if (siblingItem && !isCurrentItem) {
        item.remove();
    }
}

shippingDeleteButtons.forEach(button => button.addEventListener('click', deleteShipAddress))
modalOpenButtons.forEach(button => button.onclick = showModal);
modalCloseButtons.forEach(button => button.onclick = hideModal);

dialogs.forEach(dialog => {
    const dialogWrapper = dialog.querySelector('.dialog__wrapper');
    dialogWrapper.addEventListener('click', (e) => e.stopPropagation());
    dialog.addEventListener('click', hideModal);
});

// переключение адресов в модальном окне
btnAddressPoint.addEventListener('click', (e) => {
    e.stopPropagation();
    shipAddressPoint.classList.remove('ship-address__hidden');
    shipAddressCourier.classList.add('ship-address__hidden');
    btnAddressCourier.classList.remove('dailog__ship-btn-active');
    btnAddressPoint.classList.add('dailog__ship-btn-active');
})
btnAddressCourier.addEventListener('click', (e) => {
    e.stopPropagation();
    shipAddressCourier.classList.remove('ship-address__hidden');
    shipAddressPoint.classList.add('ship-address__hidden');
    btnAddressCourier.classList.add('dailog__ship-btn-active');
    btnAddressPoint.classList.remove('dailog__ship-btn-active');
})

function changeShipAddress(e) {
    e.preventDefault();

    const dialog = e.target.closest('dialog');
    const itemID = e.target.querySelector('input:checked').id;
    const newType = e.target.querySelector('input:checked').dataset.type;
    const textEditTitle = document.querySelector('.delivery__items-grid-rigth p');
    const textEditSubtitle = document.querySelector('.delivery__items-grid-rigth span span');

    if (newType === 'courier')
        {
            switch (itemID){
                case 'courier-1':
                    textEditTitle.textContent = 'Бишкек, улица Табышалиева, 57';
                    textEditSubtitle.textContent = '1';
                    break;
                case 'courier-2':
                    textEditTitle.textContent = 'Бишкек, улица Жукеева-Пудовкина, 77/1';
                    textEditSubtitle.textContent = '2';
                    break;
                case 'courier-3':
                    textEditTitle.textContent = 'Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1';
                    textEditSubtitle.textContent = '3';
                    break;
            }
        }
    else
        {
            switch (itemID){
                case 'point-1':
                    textEditTitle.textContent = 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1';
                    textEditSubtitle.textContent = '4';
                    break;
                case 'point-2':
                    textEditTitle.textContent = 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1';
                    textEditSubtitle.textContent = '5';
                    break;
                case 'point-3':
                    textEditTitle.textContent = 'г. Бишкек, улица Табышалиева, д. 57';
                    textEditSubtitle.textContent = '6';
                    break;
            }
        }
    dialog.close();
}
shipForm.addEventListener('submit', changeShipAddress);

function changePayment(e) {
    e.preventDefault();

    const dialog = e.target.closest('dialog');
    const itemID = e.target.querySelector('input:checked').id;
    const paymentCardImg = document.querySelectorAll('.payment-edit__logo');
    const paymentCardDate = document.querySelector('.payment-edit__num-date');
    switch (itemID){
        case 'card-1':
            paymentCardImg[0].innerHTML = '<img src="./assets/icons/mir.svg" alt="">';
            paymentCardImg[1].innerHTML = '<img src="./assets/icons/mir.svg" alt="">';
            paymentCardDate.textContent = '04/24';
            break;
        case 'card-2':
            paymentCardImg[0].innerHTML = '<img src="./assets/icons/visa.svg" alt="">';
            paymentCardImg[1].innerHTML = '<img src="./assets/icons/visa.svg" alt="">';
            paymentCardDate.textContent = '11/23';
            break;
        case 'card-3':
            paymentCardImg[0].innerHTML = '<img src="./assets/icons/mastercard.svg" alt="">';
            paymentCardImg[1].innerHTML = '<img src="./assets/icons/mastercard.svg" alt="">';
            paymentCardDate.textContent = '01/30';
            break;
        case 'card-4':
            paymentCardImg[0].innerHTML = '<img src="./assets/icons/maestro.svg" alt="">';
            paymentCardImg[1].innerHTML = '<img src="./assets/icons/maestro.svg" alt="">';
            paymentCardDate.textContent = '10/27';
            break;
    }

    dialog.close();
}
paymentForm.addEventListener('submit', changePayment);


const hideAccordionButtons = document.querySelectorAll('.cart__accordion-btn');
hideAccordionButtons.forEach(button => {
    const productsBlock = button.closest('.cart__accordion').nextElementSibling;
    button.addEventListener('click', () => hideProductsList(button, productsBlock))
});

function hideProductsList(button, elementToHide) {

    // const label = button.closest('.cart__accordion').querySelector('label');
    // const countBlock = button.closest('.cart__accordion').querySelector('.cart__controls-items-count');

    const imgRotate = button.closest('.cart__accordion').querySelector('img');

    imgRotate.classList.toggle('active-img')
    elementToHide.classList.toggle('accordion-hidd');

}

//изменение количества товара

const productCounters = document.querySelectorAll('.products__item-count');
productCounters.forEach((counter) => {
    const input = counter.querySelector('input.products__item-count-input');
    const minusButton = counter.querySelector('.products__item-count-minus');
    const plusButton = counter.querySelector('.products__item-count-plus');


    input.oninput = handleCountInput;
    minusButton.onclick = decreaseCount;
    plusButton.onclick = increaseCount;
})

function handleCountInput(event) {
    const input = event.target;
    const maxValueLength = +input.getAttribute('maxlength') || 3;
    const inputValue = input.value;

    const cleanValue = inputValue.replace(/\D/g, '');
    input.value = cleanValue.slice(0, maxValueLength);
}

function changeCount(event, increment) {
    const input = event.target.closest('.products__item-count').querySelector('.products__item-count-input');
    const currentValue = +input.value;
    const minValue = +input.getAttribute('min') || 1;
    const maxValue = 205;
    const maxValueLength = +input.getAttribute('maxlength') || 3;

    const newValue = increment ? currentValue + 1 : currentValue - 1;
    if (newValue >= minValue && newValue.toString().length <= maxValueLength && newValue <= maxValue) {
        input.value = newValue;
        totalQuantity = increment ? totalQuantity + 1 : totalQuantity - 1; // Обновление общего количества товаров
        const productID = input.closest('.products__items').dataset.id;
        updatePrice(productID, newValue);
    }
}

function increaseCount(event) {
    changeCount(event, true);
}

// Функция для уменьшения количества товара
function decreaseCount(event) {
    changeCount(event, false);
}


// Обновление цен на товар на странице
function updatePrice(product, newValue) {
    const productElement = document.querySelector(`.products__items[data-id='${product}']`);
    const discountedPriceElement = productElement.querySelector('.products__item-price-new h5');
    const quantityElement = productElement.querySelector('.products__item-count-input');

    switch (product) {
        case "1":
            discountedPriceElement.textContent = formatNumber(newValue * 522);
            break;
        case "2":
            discountedPriceElement.textContent = formatNumber(newValue * 10500);
            break;
        case "3":
            discountedPriceElement.textContent = formatNumber(newValue * 247);
            break;
    }

    function formatNumber(number, spaceCharacter = ' ') {
        return number.toString().replace(/\s/g, spaceCharacter);
    }

    // Обновление количества товара
    quantityElement.value = newValue;

    // Обновление общего количества товаров
    calculateTotalQuantity();
    calculateTotal();
}

// Выбор товара

const products = document.querySelectorAll('.products__items');
const selectAllButton = document.querySelector('#all-products');

selectAllButton.addEventListener('change', () => {
    const isCheckedAll = selectAllButton.checked;
    products.forEach(product => {
        const productInput = product.querySelector('.custom-checkbox input');
        productInput.checked = isCheckedAll;
    });

    // Вызов функции calculateTotal для обновления данных
    calculateTotalQuantity();
    calculateTotal();
});

products.forEach(product => {
    const productInput = product.querySelector('.custom-checkbox input');
    productInput.addEventListener('change', () => {
        selectAllButton.checked = Array.from(products).some(product => {
            const productInput = product.querySelector('.custom-checkbox input');
            return productInput.checked;
        });

        // Вызов функции calculateTotal для обновления данных
        calculateTotal();
        calculateTotalQuantity();
    });
});

function calculateTotal() {
    let totalSum = 0;

    products.forEach(product => {
        const productCheckbox = product.querySelector('.custom-checkbox input');
        const productPrice = parseFloat(product.querySelector('.products__item-price-new h5').innerText);

        if (productCheckbox.checked) {
            totalSum += productPrice;
        }
    });
   const totalPrice = document.querySelector('.cart-total__price-result-sum')
    totalPrice.textContent = totalSum;

}
// Функция для изменения окончания слова "товар"
function getDeclension(quantity) {
    const cases = [2, 0, 1, 1, 1, 2];
    const titles = ['товар', 'товара', 'товаров'];

    const index = (quantity % 100 > 4 && quantity % 100 < 20) ? 2 : cases[(quantity % 10 < 5) ? quantity % 10 : 5];

    return titles[index];
}

// Функция для вычисления общего количества товаров
let totalQuantity = 0;
function calculateTotalQuantity() {
    totalQuantity = 0;

    document.querySelectorAll('.products__item-count-input').forEach(input => {
        totalQuantity += +input.value;
    });

    // Обновление отображения общего количества товаров на странице
    const declension = getDeclension(totalQuantity);
    document.querySelector('.total-quantity').textContent = `${totalQuantity} ${declension}`;
}
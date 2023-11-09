

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

const productsSelect = document.querySelectorAll('.products__items');
const selectAllButton = document.querySelector('#all-products');

selectAllButton.addEventListener('change', () => {
    const isCheckedAll = selectAllButton.checked;
    productsSelect.forEach(product => {
        const productInput = product.querySelector('.custom-checkbox input');
        productInput.checked = isCheckedAll;
    });

    // Вызов функции calculateTotal для обновления данных
    calculateTotalQuantity();
    calculateTotal();
});

productsSelect.forEach(product => {
    const productInput = product.querySelector('.custom-checkbox input');
    productInput.addEventListener('change', () => {
        selectAllButton.checked = Array.from(productsSelect).every(product => {
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

    productsSelect.forEach(product => {
        const productCheckbox = product.querySelector('.custom-checkbox input');
        const productPrice = parseFloat(product.querySelector('.products__item-price-new h5').innerText);

        if (productCheckbox.checked) {
            totalSum += productPrice;
        }
    });

    const totalPriceElement = document.querySelector('.cart-total__price-result-sum');
    totalPriceElement.textContent = totalSum;

    const totalPayCheckbox = document.querySelector('#total-pay');
    const totalPayBtn = document.querySelector('.cart-total__order-btn');
    const hiddTitleTotalPay = document.querySelector('.cart-total__pay-subtitle');

    if (totalPayCheckbox.checked) {
        totalPayBtn.textContent = `Отплатить ${totalSum} сум`;
    } else {
        totalPayBtn.textContent = 'Заказать';
    }

    hiddTitleTotalPay.style.display = totalPayCheckbox.checked ? 'none' : 'block';
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

    productsSelect.forEach(product => {
        const productCheckbox = product.querySelector('.custom-checkbox input');
        const productQuantity = +product.querySelector('.products__item-count-input').value;

        if (productCheckbox.checked) {
            totalQuantity += productQuantity;
        }
    });

    // Обновление отображения общего количества товаров на странице
    const declension = getDeclension(totalQuantity);
    document.querySelector('.total-quantity').textContent = `${totalQuantity} ${declension}`;
}

function deleteProduct(event) {
    const productElement = event.target.closest('.products__items');
    const productID = productElement.dataset.id;

    if (productID) {
        updatePrice(productID, 0)
    }
    productElement.remove();
}

// Удаление товаров
const deleteButtons = document.querySelectorAll('.btn__delete-product');
deleteButtons.forEach(button => button.addEventListener('click', deleteProduct))

const missingItemsDeleteButtons = document.querySelectorAll('.btn__delete-missing');

missingItemsDeleteButtons.forEach(button => {
    button.addEventListener('click', deleteMissingProduct);
});

function deleteMissingProduct(event) {
    const missingItemElement = event.target.closest('.missing__items');
    missingItemElement.remove();

    // Обновление количества отсутствующих товаров
    const missingItemsCount = document.querySelectorAll('.missing__items').length;
    updateMissingItemsCount(missingItemsCount);
}

function updateMissingItemsCount(count) {
    const missingCountProductElement = document.querySelector('.missing__count-product');
    missingCountProductElement.textContent = `Отсутствуют · ${count} товар${getCorrectEnding(count)}`;
}

function getCorrectEnding(count) {
    if (count === 1) {
        return '';
    } else if (count >= 2 && count <= 4) {
        return 'a';
    } else {
        return 'ов';
    }
}
// Изменение кнопки при нажатии на чекбокс заказа
const totalPayCheckbox = document.querySelector('#total-pay');
const hiddTitleTotalPay = document.querySelector('.cart-total__pay-subtitle');
const totalPayBtn = document.querySelector('.cart-total__order-btn');
totalPayCheckbox.addEventListener('change', () => {
    calculateTotal();
});


//включение кнопки "нравиться"
const favoritBtns = document.querySelectorAll('.btn__favorite');
favoritBtns.forEach((favorit) => {
    favorit.addEventListener('click', () => {
        favorit.classList.toggle('active-favorit');
    })
})






//Валидация формы
const form = document.querySelector('.recipient__items form');
const inputs = form.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('input', function (event) {
        const inputValue = event.target.value;
        const inputType = input.id;

        const validationRules = {
            name: /^[a-zA-Zа-яА-ЯЁё\s-]+$/,
            surname: /^[a-zA-Zа-яА-ЯЁё\s-]+$/,
            email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            tel: /^\+\d\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/,
            inn: /^\d{12}$/
        };

        if (inputType === 'tel') {
            handleTelInputChange(input);
            validateRussianPhoneNumber(inputValue, input);
        } else {
            validateInput(inputValue, inputType, validationRules, input);
        }

        updatePlaceholder(input);
    });
});

function handleTelInputChange(input) {
    const inputValue = input.value.replace(/\D/g, '');
    let formattedValue = formatTelNumber(inputValue);
    input.value = formattedValue;
}

function formatTelNumber(number) {
    let formattedValue = '';
    let currentPos = 1;

    for (let i = 0; i < number.length; i++) {
        if (currentPos === 1) {
            formattedValue += '+';
        } else if (currentPos === 2 || currentPos === 5 || currentPos === 8 || currentPos === 10) {
            formattedValue += ' ';
        }
        formattedValue += number[i];
        currentPos++;
    }

    return formattedValue;
}

function validateInput(value, type, rules, input) {
    const regex = rules[type];

    if (!regex.test(value)) {
        input.setCustomValidity(getErrorMessage(type));
        showWarning(input);
    } else {
        input.setCustomValidity('');
        hideWarning(input);
    }
}

function validateRussianPhoneNumber(value, input) {
    const russianPhoneRegex = /^\+\d\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/;

    if (!russianPhoneRegex.test(value)) {
        input.setCustomValidity(getErrorMessage('tel'));
        showWarning(input);
    } else {
        input.setCustomValidity('');
        hideWarning(input);
    }
}

function getErrorMessage(inputType) {
    const errorMessages = {
        name: 'Укажите имя',
        surname: 'Укажите фамилию',
        email: 'Проверьте адрес электронной почты',
        tel: 'Формат: +7 (XXX) XXX-XX-XX',
        inn: 'Введите корректный ИНН (12 цифр)'
    };

    return errorMessages[inputType];
}

function showWarning(input) {
    const warningSpan = input.parentElement.querySelector('.input__warning');
    warningSpan.textContent = getErrorMessage(input.id);
    warningSpan.style.color = 'red';
}

function hideWarning(input) {
    const warningSpan = input.parentElement.querySelector('.input__warning');
    warningSpan.textContent = '';
}

function updatePlaceholder(input) {
    const label = input.parentElement;
    const placeholder = label.querySelector('.input__placeholder');

    if (input.value !== '') {
        placeholder.classList.add('active-placeholder');
    } else {
        placeholder.classList.remove('active-placeholder');
    }
}


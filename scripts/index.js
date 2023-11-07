

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
    const paymentCardImg = document.querySelector('.payment-edit__logo');
    const paymentCardDate = document.querySelector('.payment-edit__num-date');
console.log(paymentCardDate)
    switch (itemID){
        case 'card-1':
            paymentCardImg.innerHTML = '<img src="./assets/icons/mir.svg" alt="">'
            paymentCardDate.textContent = '04/24';
            break;
        case 'card-2':
            paymentCardImg.innerHTML = '<img src="./assets/icons/visa.svg" alt="">'
            paymentCardDate.textContent = '11/23';
            break;
        case 'card-3':
            paymentCardImg.innerHTML = '<img src="./assets/icons/mastercard.svg" alt="">'
            paymentCardDate.textContent = '01/30';
            break;
        case 'card-4':
            paymentCardImg.innerHTML = '<img src="./assets/icons/maestro.svg" alt="">'
            paymentCardDate.textContent = '10/27';
            break;
    }

    dialog.close();
}
paymentForm.addEventListener('submit', changePayment)
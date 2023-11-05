
// test code
document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('#payment-method-modal');
    const close = document.querySelector('#close-payment-modal');
    const btnAddressPoint = document.querySelector('#address-point');
    const btnAddressCourier = document.querySelector('#address-courier');
    const shipAddressPoint = document.querySelector('.ship-address__wrapper-point');
    const shipAddressCourier = document.querySelector('.ship-address__wrapper-courier');

    openModalBtn[0].addEventListener('click', () => {
        modal.showModal()
    })

    close.addEventListener('click', () => {
        modal.close();
    })
    document.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
    btnAddressPoint.addEventListener('click', (e) => {
        e.stopPropagation();
        shipAddressPoint.classList.add('ship-address__hidden');
        shipAddressCourier.classList.remove('ship-address__hidden');
        btnAddressCourier.classList.remove('dailog__ship-btn-active');
        btnAddressPoint.classList.add('dailog__ship-btn-active');
    })
    btnAddressCourier.addEventListener('click', (e) => {
        e.stopPropagation();
        shipAddressCourier.classList.add('ship-address__hidden');
        shipAddressPoint.classList.remove('ship-address__hidden');
        btnAddressCourier.classList.add('dailog__ship-btn-active');
        btnAddressPoint.classList.remove('dailog__ship-btn-active');
    })
});



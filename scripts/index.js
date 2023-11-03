
// test code
document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('#payment-method-modal');
    const close = document.querySelector('#close-payment-modal');

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
});



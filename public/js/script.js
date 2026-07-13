(() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    })

    const taxToggler = document.getElementById('flexSwitchCheckDefault')
    if (taxToggler) {
        const taxRates = document.querySelectorAll('.tax-rate')
        taxToggler.addEventListener('click', () => {
            taxRates.forEach(tax => {
                tax.style.display = tax.style.display === 'inline' ? 'none' : 'inline'
            })
        })
    }

    const categoryLinks = document.querySelectorAll('.category-link')
    categoryLinks.forEach(link => {
        const categoryElement = link.querySelector('.category')
        if (categoryElement) {
            const category = categoryElement.getAttribute('data-category')
            if (category) {
                link.href = `/listings/filter/${encodeURIComponent(category)}`
            }
        }
    })
})()

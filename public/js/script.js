(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// tax toggler fucntionality
let taxToggler = document.getElementById('flexSwitchCheckDefault')
let taxRate = document.getElementsByClassName("tax-rate")
taxToggler.addEventListener("click", () => {
  for (let tax of taxRate) {
    if (tax.style.display != "inline") {
      tax.style.display = "inline"
    }
    else {
      tax.style.display = "none"
    }
  }
})

// category filter tracker
let anchor = document.querySelectorAll('.category-link')
    anchor.forEach(a => {
        a.addEventListener("click", () => {
            let category = a.querySelector(".category");
            category = category.getAttribute("data-category")
            a.href = `/listings/filter/${category}`
        })
    })
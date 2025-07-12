// TODO:
//  - modal opening and closing

const overlay = document.querySelector('.overlay')
const burger = document.querySelector('.burger-menu')
const text_inputs = document.querySelectorAll('.pledge-amount')
const modal_pledge = document.querySelector('.modal-pledge')
const rect = modal_pledge.getBoundingClientRect()

text_inputs.forEach(input => 
    input.addEventListener('click', () => 
        input.querySelector('input[type="text"]').focus()
    )
)

console.log(rect.width)
// TODO:
//  + modal opening and closing
//  - have the modal scroll to the pledge position

const overlay = document.querySelector('.overlay')
const pledges_modal = document.querySelector('.modal-pledges')
const confirm_modal = document.querySelector('.modal-completed')
const burger = document.querySelector('.burger-menu')
const no_reward_button = document.querySelector('.back-this-project')
const confirm_buttons = document.querySelectorAll('.confirm-pledge')
const reward_buttons = document.querySelectorAll('.select-reward')
const text_inputs = document.querySelectorAll('.pledge-amount')
const radio_inputs = document.querySelectorAll('.select-pledge')
const pledges = document.querySelectorAll('.modal-pledge')
const close_pledges_modal = document.querySelector('.close-modal')
const close_confirm_modal = document.querySelector('.modal-completed-button')

// get modal_pledge width
const modal_pledge = document.querySelector('.modal-pledge')
const rect = modal_pledge.getBoundingClientRect()

no_reward_button.addEventListener('click', () => {
    pledges_modal.style.display = 'block'
    overlay.style.display = 'block'
    radio_inputs[0].checked = true
})

reward_buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        let top = pledges[index+1].offsetTop
        // top = top.top
        pledges_modal.style.display = 'block'
        overlay.style.display = 'block'
        window.scrollTo({ top: top, behavior: 'smooth' })
        radio_inputs[index+1].checked = true
        console.log(top)
        // console.log(pledges[index+1])
    })
})

close_pledges_modal.addEventListener('click', () => {
    pledges_modal.style.display = 'none'
    overlay.style.display = 'none'
})

close_confirm_modal.addEventListener('click', () => {
    confirm_modal.style.display = 'none'
    overlay.style.display = 'none'
})

confirm_buttons.forEach((button, index) => 
    button.addEventListener('click', () => {
        pledges_modal.style.display = 'none'
        confirm_modal.style.display = 'block'
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })
)

// focus input regardless of where its container is clicked
text_inputs.forEach(input => 
    input.addEventListener('click', () => 
        input.querySelector('input[type="text"]').focus()
    )
)

// console.log(rect.width)
// TODO:
//  + modal opening and closing
//  - have the modal scroll to the pledge position
//  - refactor to use classList.toggle as much as possible

const overlay = document.querySelector('.overlay')
const header = document.querySelector('header')
const pledges_modal = document.querySelector('.modal-pledges')
const confirm_modal = document.querySelector('.modal-completed')
const close_menu = document.querySelector('.close-menu')
const no_reward_button = document.querySelector('.back-this-project')
const confirm_buttons = document.querySelectorAll('.confirm-pledge')
const reward_buttons = document.querySelectorAll('.select-reward')
const text_inputs = document.querySelectorAll('.pledge-amount')
const radio_inputs = document.querySelectorAll('.select-pledge')
const pledges = document.querySelectorAll('.modal-pledge')
const close_pledges_modal = document.querySelector('.close-modal')
const close_confirm_modal = document.querySelector('.modal-completed-button')
const media_query = window.matchMedia('(min-width: 800px)')

// get modal_pledge width
const modal_pledge = document.querySelector('.modal-pledge')
const rect = modal_pledge.getBoundingClientRect()

// burger menu logic
const burger = document.querySelector('.burger-menu')
const header_links = document.querySelector('.links')

media_query.addEventListener('change', () => {
    if (media_query.matches) {
        burger.classList.toggle('visible')
        header_links.classList.add('visible')
        // header_links.style.display = 'flex'
    } 
    // else {
    //     burger.classList.remove('visible')
    //     header_links.classList.remove('visible')
    // }
})

burger.addEventListener('click', () => {
    header_links.classList.add('visible')
    burger.classList.toggle('visible')
    close_menu.classList.add('visible')
    // overlay.style.display = 'block'
    // overlay.style.zIndex = -1
    header.zIndex = 1
})

close_menu.addEventListener('click', () => {
    header_links.classList.remove('visible')
    burger.classList.toggle('visible')
    close_menu.classList.remove('visible')
    overlay.style.display = 'none'
})

// modals logic
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

// focus text input regardless of where its container is clicked
text_inputs.forEach(input => 
    input.addEventListener('click', () => 
        input.querySelector('input[type="text"]').focus()
    )
)

// changes radio input border color when hovering on the reward type
const pledge_headings = document.querySelectorAll('.pledge-heading')
pledge_headings.forEach(heading => {
    const input = heading.querySelector('.select-pledge')
    const text = heading.querySelector('.reward-type')

    text.addEventListener('mouseover', () => {
        input.style.borderColor = 'hsl(176, 72%, 28%)'
    })

    text.addEventListener('mouseout', () => {
        input.style.borderColor = 'hsl(0, 0%, 90%)'
    })

    text.addEventListener('click', () => {
        input.checked = true
    })
})
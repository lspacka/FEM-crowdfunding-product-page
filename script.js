// TODO:
//  + modal opening and closing
//  - have the modal scroll to the pledge position

const overlay = document.querySelector('.overlay')
const header = document.querySelector('header')
const header_flair = document.querySelector('.header-flair')
const pledges_modal = document.querySelector('.modal-pledges')
const confirm_modal = document.querySelector('.modal-completed')
const no_reward_button = document.querySelector('.back-this-project')
const confirm_buttons = document.querySelectorAll('.confirm-pledge')
const reward_buttons = document.querySelectorAll('.select-reward')
const text_inputs = document.querySelectorAll('.pledge-amount')
const radio_inputs = document.querySelectorAll('.select-pledge')
const close_pledges_modal = document.querySelector('.close-modal')
const close_confirm_modal = document.querySelector('.modal-completed-button')
const media_query = window.matchMedia('(min-width: 800px)')

// get modal_pledge width
const modal_pledge = document.querySelector('.modal-pledge')
const rect = modal_pledge.getBoundingClientRect()

// pledge logic
const pledges = document.querySelectorAll('.active-pledge')
const rewards_left = document.querySelectorAll('.active-quantity')
const total_collected = document.querySelector('.total-collected')
const total_backers = document.querySelector('.total-backers')
const progress_bar = document.querySelector('.progress-bar')

console.log(pledges)
pledges.forEach((pledge, index) => {
    const input = pledge.querySelector('input')
    const input_border = pledge.querySelector('.pledge-amount')
    const confirm_pledge = pledge.querySelector('.active-confirm')
    const input_error = pledge.querySelector('.input-error')
    const minimums = [25, 75]
    const reward_quantity = rewards_left[index]

    confirm_pledge.addEventListener('click', () => {
        val = Number(input.value)
        if (Number.isNaN(val)) {
            input_error.style.display = 'block'
            input_border.classList.add('error')
            input_error.textContent = "Please enter a Numeric Value"
            
        } else {
            if (val && val<minimums[index]) {
                input_error.style.display = 'block'
                input_border.classList.add('error')
                input_error.textContent = `Please pledge a minimum of \$${minimums[index]}`
            } else {
                // add input value to total collected
                // total_backers++
                // decrement reward_quantity
                // calc input percentage - divide by 100000 and then mult by 100
                // increment progress bar by percentage

                input_border.classList.remove('error')
                pledges_modal.style.display = 'none'
                confirm_modal.style.display = 'block'
                header_flair.style.zIndex = 0;
                input_error.style.display = 'none'
                console.log(val*2)
            }
        }
    })
})

// burger menu logic
const burger_button = document.querySelector('.burger-menu')
const close_menu = document.querySelector('.close-menu')
const header_links = document.querySelector('.links')

function handleViewportChange(event) {
    if (event.matches) {
        header_links.classList.remove('visible')
        overlay.style.display = 'none'
        burger_button.style.display = 'none'
        close_menu.classList.remove('visible')
    } else {
        burger_button.style.display = 'block'
    }
}

media_query.addEventListener('change', handleViewportChange)
handleViewportChange(media_query)

burger_button.addEventListener('click', () => {
    header_links.classList.add('visible')
    close_menu.classList.add('visible')
    burger_button.style.display = 'none'
    overlay.style.display = 'block'
    header_flair.style.zIndex = 1
})

close_menu.addEventListener('click', () => {
    header_links.classList.remove('visible')
    burger_button.style.display = 'block'
    close_menu.classList.remove('visible')
    overlay.style.display = 'none'
})

// modals logic
no_reward_button.addEventListener('click', () => {
    pledges_modal.style.display = 'block'
    overlay.style.display = 'block'
    header_flair.style.zIndex = 0;
    radio_inputs[0].checked = true
})

// tryna move the viewport to the appropiate pledge
reward_buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        let top = pledges[index].offsetTop
        // top = top.top
        pledges_modal.style.display = 'block'
        header_flair.style.zIndex = 0;
        overlay.style.display = 'block'
        // window.scrollTo({ top: top, behavior: 'smooth' })
        radio_inputs[index+1].checked = true     // OJO CUIDAO!
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

// confirm_buttons.forEach((button, index) => 
//     button.addEventListener('click', () => {
//         pledges_modal.style.display = 'none'
//         confirm_modal.style.display = 'block'
//         header_flair.style.zIndex = 0;
//         window.scrollTo({ top: 0, behavior: 'smooth' })
//     })
// )

// focus text input regardless of where its container is clicked
text_inputs.forEach(input => 
    input.addEventListener('click', () => 
        input.querySelector('input[type="text"]').focus()
    )
)

// changes radio input border color when hovering on the neighbor text (.reward-type)
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
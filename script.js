// TODO:
//  + modal opening and closing
//  + have the modal scroll to the pledge position
//  + clean input after pledging
//  - disable hovering fx on disabled reward
//  - improve auto-scroll
//  - refactor

const overlay = document.querySelector('.overlay')
const header = document.querySelector('header')
const header_flair = document.querySelector('.header-flair')
const pledges_modal = document.querySelector('.modal-pledges')
const confirm_modal = document.querySelector('.modal-completed')
const back_this_project = document.querySelector('.back-this-project')
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
const rewards_number = document.querySelectorAll('.reward-number')
const rewards_left = document.querySelectorAll('.active-quantity')
const total_backers = document.querySelector('.total-backers')
const progress_bar_container = document.querySelector('.progress-container')
const progress_bar = document.querySelector('.progress-bar')
const total_collected = document.querySelector('.total-collected')
const goal_value = 100000
const minimums = [25, 75]
// these are for clearing all inputs and error messages after confirming the pledge:
const inputs = document.querySelectorAll('.text-input')
const input_borders = document.querySelectorAll('.pledge-amount')
const input_errors = document.querySelectorAll('.input-error')
console.log('inputs: ', inputs.length)

pledges.forEach((pledge, index) => {
    const input = pledge.querySelector('input')
    const input_border = pledge.querySelector('.pledge-amount')
    const confirm_pledge = pledge.querySelector('.active-confirm')
    const input_error = pledge.querySelector('.input-error')
    const reward_quantity = rewards_left[index]
    const reward_number = rewards_number[index]

    confirm_pledge.addEventListener('click', () => {
        val = Number(input.value)
        if (Number.isNaN(val)) {
            input_error.style.display = 'block'
            input_border.classList.add('error')
            input_error.textContent = "Please enter a Numeric Value"            
        } else {
            if (!val || val<minimums[index]) {
                input_error.style.display = 'block'
                input_border.classList.add('error')
                input_error.textContent = `Pledge a minimum of \$${minimums[index]} to continue`
            } else {
                // add input value to total collected
                const input_text = input.value
                const input_value = parseFloat(input_text)
                const total_text = total_collected.textContent
                const numstr1 = total_text.replace(/[^0-9.]/g, "")
                let total_value = parseFloat(numstr1)

                total_value += input_value
                total_collected.textContent = `\$${total_value.toLocaleString("en-US")}`
                
                // update progress bar
                let percentage = (total_value/goal_value) * 100
                progress_bar.style.width = percentage + "%"

                // increment total backers number
                const backers_text = total_backers.textContent
                const numstr2 = backers_text.replace(/[^0-9.]/g, "")
                
                backers_value = parseFloat(numstr2)
                backers_value++
                total_backers.textContent = backers_value.toLocaleString("en-US")

                // decrement reward_quantity
                const reward_quantity_text = reward_quantity.textContent
                let reward_value = parseInt(reward_quantity_text)

                reward_value--
                reward_quantity.textContent = reward_value
                reward_number.textContent = reward_value

                // clear all inputs and error states:
                input_borders.forEach(item => { item.classList.remove('error') })
                input_errors.forEach(item => { item.style.display = 'none' })
                inputs.forEach((item, index2) => {
                    item.value = ''
                    item.placeholder = minimums[index2]
                })

                pledges_modal.style.display = 'none'
                confirm_modal.style.display = 'block'
                header_flair.style.zIndex = 0;
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
const no_reward_confirm = document.querySelector('.no-reward-button')
const open_pledge_modal_buttons = document.querySelectorAll('.open-pledge-modal')

open_pledge_modal_buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const target_id = button.id.replace("open-", "")
        const target_section = document.getElementById(target_id)

        pledges_modal.style.display = 'block'
        overlay.style.display = 'block'
        header_flair.style.zIndex = 0;
        radio_inputs[index].checked = true
        
        // auto-scrolls to the appropiate reward
        requestAnimationFrame(() => {
            target_section.scrollIntoView({ behavior: "smooth", block: "start" })

            if (index != 0) {
                setTimeout(() => {
                    window.scrollBy({ top: -20, behavior: "smooth" });
                }, 300);
            } 
        })
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

no_reward_confirm.addEventListener('click', () => {
    const backers_text = total_backers.textContent
    const numstr2 = backers_text.replace(/[^0-9.]/g, "")

    backers_value = parseFloat(numstr2)
    backers_value++
    total_backers.textContent = backers_value.toLocaleString("en-US")

    pledges_modal.style.display = 'none'
    confirm_modal.style.display = 'block'
    header_flair.style.zIndex = 0;
    input_error.style.display = 'none'
})

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
const buttons = document.querySelectorAll("button")

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', async () => {
        const id = buttons[i].dataset.id
        const response = await fetch('/' + id, {
            method: 'DELETE',
        })
        if (response.ok) {
            setTimeout(() => {
                window.location.reload()
            }, 100) 
        } else {
            console.error("???????????????")
        }
    })
}
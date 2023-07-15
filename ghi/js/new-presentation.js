window.addEventListener('DOMContentLoaded', async () => {
    const successAlert = document.getElementById("success-message");
    const createdForm = document.getElementById("create-presentation-form");


    let url = 'http://localhost:8000/api/conferences/'

    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('An error occurred')
        } else {
            const data = await response.json()

            const selectTag = document.getElementById('conference')
            for (let conference of data.conferences) {
                const option = document.createElement('option')
                option.value = conference.id
                option.innerHTML = conference.name
                selectTag.appendChild(option)
            }
            const formTag = document.getElementById('create-presentation-form')
            formTag.addEventListener('submit', async event => {
                event.preventDefault()
                const formData = new FormData(formTag)
                const json = JSON.stringify(Object.fromEntries(formData))
                const conferenceId = selectTag.options[selectTag.selectedIndex].value;
                console.log(conferenceId);
                const presentationURL = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`;
                const fetchConfig = {
                    method: 'POST',
                    body: json,
                    headers: {
                        'Content-Type': 'application/json',
                    },

                }
                const response = await fetch(presentationURL, fetchConfig);
                if (response.ok) {
                    formTag.reset()
                    const newPresentation = await response.json()

                    successAlert.classList.remove('d-none');
                    createdForm.classList.add('d-none');
                    
                    console.log(newPresentation)
                }
            })
        }
    } catch (e) {
        console.error(e)
    }
})

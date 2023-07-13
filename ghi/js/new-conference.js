
// calling a RESTful API get the data back, then loop through it.
// And for each state in it, it'll create an option element that 
// has a value of the abbreviation and the text of the name.

// We need to add an event listener for when the DOM loads.
window.addEventListener('DOMContentLoaded', async () => {

    //Declare a variable that will hold the URL for the API that we just created.
    // const url = 'http://localhost:8000/api/states/';
    const url = 'http://localhost:8000/api/locations/';

    // Let's fetch the URL. Don't forget the await keyword so that we get the response, not the Promise.
    const response = await fetch(url);

    //If the response is okay, then let's get the data using the .json method. Don't forget to await that, too.
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      // Get the select tag element by its id 'state'
      const selectTag = document.getElementById('location');
      for (let location of data.locations) {
         // Create an 'option' element
         const option = document.createElement('option');
        // Set the '.value' property of the option element to the
        // state's abbreviation
        // option.value = state.abbreviation;
        option.value = location.id;

        // Set the '.innerHTML' property of the option element to
        // the state's name
        // option.innerHTML = state.name;
        option.innerHTML = location.id;

        // Append the option element as a child of the select tag
        selectTag.appendChild(option);

        
        }

    const formTag = document.getElementById('create-location-form');
    formTag.addEventListener('submit', async event => {
    event.preventDefault();
    
    const formData = new FormData(formTag);
    const json = JSON.stringify(Object.fromEntries(formData));
    
    const conferencesUrl = 'http://localhost:8000/api/conferences/';
 
    const fetchConfig = {
    method: "post",
    body: json,
    headers: {
        'Content-Type': 'application/json',
    },
    };
    const response = await fetch(conferencesUrl, fetchConfig);
    if (response.ok) {
    formTag.reset();
    const newConference = await response.json();
    
}

  });

    }
  });



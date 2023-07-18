import React, { useEffect, useState } from 'react';

function ConferenceForm() {
    const [states, setStates] = useState([]);
    const [name, setName] = useState('');
    const [starts, setStarts] = useState('');
    const [ends, setEnds] = useState('');
    const [description, setDescription] = useState('');
    const [max_presentations, setPresentations] = useState('');
    const [max_attendees, setAttendees] = useState('');
    const [location, setLocation] = useState('');


    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
        
      }

    const handleStartsChange = (event) => {
        const value = event.target.value;
        setStarts(value);
        
      };
      
      const handleEndsChange = (event) => {
        const value = event.target.value;
        setEnds(value);
        
      };
      
      const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
        
      };
      

      
      const handlePresentationsChange = (event) => {
        const value = event.target.value;
        setPresentations(value);
      };
      
      const handleAttendeesChange = (event) => {
        const value = event.target.value;
        setAttendees(value);
      };
      
      const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
        
        
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = {};
    
        data.name = name;
        data.starts = starts;
        data.ends = ends;
        data.description = description;
        data.max_presentations = max_presentations;
        data.max_attendees = max_attendees;
        data.location = location;

        console.log(data);
    
        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
      
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
          const newLocation = await response.json();
          console.log(newLocation);
    
        setName('');
        setStarts('');
        setEnds('');
        setStates([]);
        setDescription('');
        setPresentations('');
        setAttendees('');
        setLocation('');

        }
        
    
      }

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/';
    
        const response = await fetch(url);
    
        if (response.ok) {
          const data = await response.json();
          setStates(data.locations);
          console.log(data.locations)
          
          // const selectTag = document.getElementById('state');
          // for (let state of data.states) {
          //   const option = document.createElement('option');
          //   option.value = state.abbreviation;
          //   option.innerHTML = state.name;
          //   selectTag.appendChild(option);
          // }
        }
      }

    useEffect(()  => { 
        fetchData();
      }, []);
    return(
    <form onSubmit={handleSubmit} id="create-location-form">
                <div className="form-floating mb-3">
                  <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleStartsChange} value={starts} placeholder="starts" required type="date" name="starts" id="starts" className="form-control"/>
                  <label htmlFor="start_date">Start Date</label>
                </div>
                <div className="form-floating mb-3">
                <input onChange={handleEndsChange} value={ends} placeholder="ends" required type="date" name="ends" id="ends" className="form-control"/>
                  <label htmlFor="end_date">End Date</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea onChange={handleDescriptionChange} value={description} placeholder="description" required name="description" id="description" className="form-control"></textarea>
                  <label htmlFor="description">Description</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handlePresentationsChange} value={max_presentations} placeholder="max_presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control"/>
                  <label htmlFor="max_presentations">Max Presentations</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleAttendeesChange} value={max_attendees} placeholder="max_attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control"/>
                  <label htmlFor="max_attendees">Maximum Attendees</label>
                </div>
                <div className="mb-3">
                  <select  onChange={handleLocationChange} value={location} required name="location" id="location" className="form-select">
                    <option value="">Choose a location</option>
                            {states.map((state) => {
                                    return (
                                        <option key={location.id} value={state.id}>
                                            {state.id}
                                        </option>
                                    );
                                })}
  
                  </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
        );
}
export default ConferenceForm;
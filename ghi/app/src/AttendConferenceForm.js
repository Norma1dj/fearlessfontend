import React, { useEffect, useState } from 'react';

function AttendConferenceForm() {
    const [states, setStates] = useState([]);
    const [conference, setConference] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');



    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
        
      }
      

    const handleConferenceChange = (event) => {
        const value = event.target.value;
        setConference(value);
        
      };


      
      const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        
      };
      
  

      const handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = {};
    
        data.name = name;
        data.email = email;
        data.conference = conference;
      

        console.log(data);
    
        const conferenceUrl = 'http://localhost:8001/api/attendees/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
      
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
          const newConference = await response.json();
          console.log(newConference);
    
        setConference('');
        setName('');
        setEmail('');
        setStates([]);
        

        }
        
    
      }

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences/';
    
        const response = await fetch(url);
    
        if (response.ok) {
          const data = await response.json();
          setStates(data.conferences);
          console.log(data.conferences)
          
          
        }
    }

    useEffect(()  => { 
        fetchData();
      }, []);

    return(
      <div className="container">
    <div className="my-5">
      <div className="row">
        <div className="col col-sm-auto">
          <img width="300" className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg"/>
        </div>
        <div className="col">
          <div className="card shadow">
            <div className="card-body"></div>
        <form onSubmit={handleSubmit} id="create-attendee-form">
                <h1 className="card-title">It's Conference Time!</h1>
                <p className="mb-3">
                  Please choose which conference
                  you'd like to attend.
                </p>
               
                <div className="mb-3">
                  <select onChange={handleConferenceChange} value={conference} name="conference" id="conference" className="form-select" required>
                    <option value="">Choose a conference</option>
                    {states.map((state) => {
                                    return (
                                        <option key={state.id} value={state.href}>
                                            {state.name}
                                        </option>
                                    );
                                })}
                  </select>
                </div>
                <p className="mb-3">
                  Now, tell us about yourself.
                </p>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleNameChange} value={name} required placeholder="Your full name" type="text" id="name" name="name" className="form-control"/>
                      <label htmlFor="name">Your full name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleEmailChange} value={email} required placeholder="Your email address" type="email" id="email" name="email" className="form-control"/>
                      <label htmlFor="email">Your email address</label>
                    </div>
                  </div>
                </div>
                <button className="btn btn-lg btn-primary">I'm going!</button>
              </form>
              <div className="alert alert-success d-none mb-0" id="success-message">
                Congratulations! You're all signed up!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  

    
        );
}

export default AttendConferenceForm;


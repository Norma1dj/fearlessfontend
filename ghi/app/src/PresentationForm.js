import React, { useEffect, useState } from 'react';

function PresentationForm() {
    const [states, setStates] = useState([]);
   
    const [presenter_name, setName] = useState('');
    const [presenter_email, setEmail] = useState('');
    const [company_name, setCompany] = useState('');
    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [conference, setConference] = useState('');

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
      };
      
      const handleEmailsChange = (event) => {
        const value = event.target.value;
        setEmail(value);
      };
      
      const handleCompanyChange = (event) => {
        const value = event.target.value;
        setCompany(value);
      };
      
      const handleTitleChange = (event) => {
        const value = event.target.value;
        setTitle(value);
      };
      
      const handleSynopsisChange = (event) => {
        const value = event.target.value;
        setSynopsis(value);
      };
      
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
    
        data.presenter_name = presenter_name;
        data.presenter_email = presenter_email;
        data.conference = conference;
        data.company_name = company_name;
        data.title = title;
        data.synopsis = synopsis;
      

        console.log(data);
    
        const presentationUrl = `http://localhost:8000${conference}presentations/`;
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
      
        const response = await fetch(presentationUrl, fetchConfig);
        if (response.ok) {
          const newPresentation = await response.json();
          console.log(newPresentation);
    
        setConference('');
        setName('');
        setEmail('');
        setCompany('');
        setTitle('');
        setSynopsis('');
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


    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new presentation</h1>
                        <form onSubmit={handleSubmit} id="create-presentation-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleNameChange} value={presenter_name} placeholder="presenter_name" required type="text" id="presenter_name"
                                    name="presenter_name" className="form-control"/>
                                <label htmlFor="presenter_name">Presenter Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleEmailsChange} value={presenter_email} placeholder="presenter_email" required type="text" id="presenter_email"
                                    name="presenter_email" className="form-control"/>
                                <label htmlFor="presenter_email">Presenter email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleCompanyChange} value={company_name} placeholder="company_name" required type="text" id="company_name"
                                    name="company_name" className="form-control"/>
                                <label htmlFor="company_name">Company Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleTitleChange} value={title} placeholder="title" required type="text" id="title" name="title"
                                    className="form-control"/>
                                <label htmlFor="title">Title</label>
                            </div>
                            <div className="form-floating mb-3">
                                <textarea onChange={handleSynopsisChange} value={synopsis} placeholder="synopsis" required name="synopsis" id="synopsis"
                                    className="form-control"></textarea>
                                <label htmlFor="synopsis">Synopsis</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleConferenceChange} required value={conference} id="conference" name="conference" className="form-select">
                                    <option value="">Choose a conference</option>
                                    {states.map((state) => {
                                    return (
                                        <option key={state.id} value={state.href}>
                                            {state.id}
                                        </option>
                                    );
                                })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                        <div className="alert alert-success d-none mb-0" id="success-message">
                            Your presention has been successfully submitted!
                          </div>
                    </div>
                </div>
            </div>
        </div>
      );



}

export default PresentationForm;

import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from  './ConferenceForm';
import AttendConferenceForm from './AttendConferenceForm';
import PresentationForm from './PresentationForm';
import MainPage from './MainPage';
import { BrowserRouter, Route, Routes} from "react-router-dom";


function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    
    <BrowserRouter>
      <Nav />
      <div className="container">
      <Routes>
            <Route index path="home" element={<MainPage />} />
            <Route path="conferences/new" element={<ConferenceForm />} />
            <Route path="presentantions/new" element={<PresentationForm />} />
            <Route path="attendees/new" element={<AttendConferenceForm />} />
            <Route path="locations/new" element={<LocationForm />} />
            <Route path="attendees" element={<AttendeesList attendees={props.attendees} />} />
      </Routes>
      </div>
      </BrowserRouter>
    
  );
}

export default App;
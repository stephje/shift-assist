import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Volunteers from './containers/Volunteers';
import VolunteerRegstration from './components/volunteerRegistration';

function App() {
  return (
    <div>
      <Header/>
      <VolunteerRegstration/>
      <Footer/>
    </div>
  );
}

export default App;

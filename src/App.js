import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';

//import About from './pages/About';
import CreateEvent from './pages/CreateEvent';
import Services from './pages/Services';
import Contact from './pages/Contact';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const App = () => {
  const [liveData, setLiveData] = useState('');
  const [upcomingEvent, setUpcomingEvent] = useState({
    marriageDate: '2025-01-01',
    marriageTime: '00:38',
    brideName: 'Seetha',
    groomName: 'Rama',
  });
  const apiBaseUrl = process.env.REACT_APP_URL;
  // get api

  // Memoize getLiveUrl to prevent re-renders unless apiBaseUrl changes
  const getLiveUrl = useCallback(async () => {
    try {
      const LiveData = await axios.get(`${apiBaseUrl}/api/youtube/liveItems`);
      console.log({ LiveData });
      if (LiveData.status === 200) {
        setLiveData({
          videoId: LiveData.data.id,
          videoUrlId: LiveData.data.videos[0].youTubeUrl,
        });
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Axios error:', error.message);
      }
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    getLiveUrl();
  }, [getLiveUrl]);

  const updateEvent = (evtData) => {
    setUpcomingEvent(evtData);
  };

  const updateLive = async (data) => {
    // setLiveData({ youtubeData: data });

    let youTubeUrl = data.videoId;
    console.log(data);
    const updateLiveEvent = await axios.put(
      ` ${apiBaseUrl}/api/youtube/LiveVideo/66ec11f46afb40635d95f00c`,
      { youTubeUrl },
    );
    if (updateLiveEvent.status === 200) {
      setLiveData((prev) => ({ ...prev, videoUrlId: youTubeUrl }));
    }
    console.log(updateLiveEvent);
  };

  return (
    <div className="font-sans">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home upcomingEvent={upcomingEvent} liveData={liveData} />} />
          <Route
            path="/creteEvent"
            element={<CreateEvent updateEvent={updateEvent} updateLive={updateLive} />}
          />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
};
export default App;

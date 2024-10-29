import LoginCard from '../components/LoginCard';
import CreateEventForm from '../components/CreateEventForm';
import EventsCard from '../components/EventsCard';
import AddLiveForm from '../components/forms/AddLiveForm';
import { useEffect, useState } from 'react';
import { USER_API } from '../services/api';
import axios from 'axios';

const CreateEvent = (props) => {
  const { updateEvent, updateLive } = props;
  // const userSet = { name: 'krishna', password: '12345' };
  // localStorage.setItem('userSet', JSON.stringify(userSet));
  const [isLogin, setIsLogin] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {}, []);

  const onLiveSubmit = (data) => {
    updateLive(data);
    //console.log('in CreateEvent Page:', data);
  };

  const addEvent = (evtData) => {
    setEvents([...events, evtData]);
    updateEvent(evtData);
  };

  const onLiveEvent = () => {
    setIsLive(true);
  };

  const CheckIsLogin = async (user) => {
    try {
      const LoginApi = await axios.post(`${USER_API}/login`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let loginData = LoginApi;
      console.log({ loginData });
      console.log(LoginApi.data);
      if (LoginApi.statusText === 'OK' || LoginApi.status === 200) {
        setIsLogin(true);
      }

      // let getUser = localStorage.getItem('userSet');
      // getUser = JSON.parse(getUser);
      // if (getUser.name === user.name && getUser.password === user.password) {
      //   // create some login success message
      //   setIsLogin(true);
      // } else {
      //   setIsLogin(false);
      // }
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error.message);
    }
  };

  const onAddEvent = () => {
    setIsLive(false);
  };
  const onLogoutButton = () => {
    setIsLogin(false);
  };

  return (
    <div className="mt-10">
      {!isLogin && <LoginCard CheckIsLogin={CheckIsLogin} />}
      {isLogin && (
        <div>
          <div className="flex justify-evenly ">
            <button
              className="px-6 py-3 border-2 border-blue-500 text-blue-500 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition duration-300"
              onClick={onLiveEvent}
            >
              Add Live
            </button>
            <button
              className="px-6 py-3 border-2 border-blue-500 text-blue-500 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition duration-300"
              onClick={onAddEvent}
            >
              Add Event
            </button>
            {isLogin && (
              <button
                className="px-6 py-3 border-2 border-blue-500 text-blue-500 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition duration-300"
                onClick={onLogoutButton}
              >
                Logout
              </button>
            )}
          </div>

          <div className="m-10">
            {!isLive && <CreateEventForm addEvent={addEvent} />}
            {isLive && <AddLiveForm onLiveSubmit={onLiveSubmit} />}
            <EventsCard events={events} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEvent;

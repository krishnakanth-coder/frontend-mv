import CardCarousel from '../components/CardCarousel';
import YoutubeCard from '../components/YoutubeCard';
import CountdownTimer from '../components/CountdownTime';
import FamilyCard from '../components/homeComp/FamilyCard';
//import HomeProleCarouser from '../components/homeComp/HomeProleCarouser';

const Home = (props) => {
  const { upcomingEvent, liveData } = props;
  const { marriageDate, marriageTime } = upcomingEvent;

  const targetDateTime = `${marriageDate}T${marriageTime}`;
  const now = new Date();
  const targetDate = new Date(targetDateTime);

  const getLiveInfo = Math.floor((targetDate - now) / (1000 * 60 * 60 * 24)) <= 2;
  console.log({ getLiveInfo });

  return (
    <>
      {/* Main Section */}
      <div className="flex flex-col lg:flex-row container mx-auto  p-4 w-full min-h[90vh] ">
        {/* Youtube Card */}
        <div className=" w-full lg:w-3/5  h-[50vh] md:h-[70vh]  rounded-lg shadow-md flex flex-col">
          <YoutubeCard liveData={liveData} />
        </div>
        {/*=============== event is coming soon=============== */}
        {/* Countdown Timer and Profile Carousel */}
        {!getLiveInfo && (
          <div className="lg:flex flex-col w-full lg:w-2/5 h-full  mt-2 lg:ml-4 lg:mt-0 lg:justify-between">
            <div className="flex-1 bg-white lg:mb-4 rounded-lg shadow-md ">
              <CountdownTimer upcomingEvent={upcomingEvent} />
            </div>
            <div className="flex-1 bg-white rounded-lg shadow-md ">
              {/* <HomeProleCarouser /> */}
              <FamilyCard />
            </div>
          </div>
        )}
        {getLiveInfo && <div>marriage planning</div>}
      </div>

      {/* Card Carousel */}
      <div className="container  mx-auto w-full  p-4">
        <CardCarousel />
      </div>
    </>
  );
};

export default Home;

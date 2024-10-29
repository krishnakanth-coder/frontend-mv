import Loader from './loader/Loader';

const YoutubeCard = (props) => {
  const { liveData } = props;
  let videoId = liveData ? liveData.videoUrlId : '';

  if (!videoId) {
    return <Loader />;
  }

  const youtubeSrc = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="flex-1 bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      <div className="relative w-full h-full">
        <iframe
          className="w-full h-full"
          src={youtubeSrc}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Live Stream"
        ></iframe>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-white">Live on YouTube</h2>
      </div>
    </div>
  );
};

export default YoutubeCard;

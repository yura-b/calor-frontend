interface Props {
  videoId: string;
}

const Video: React.FC<Props> = ({ videoId }) => {
  return (
    <div className={'relative pb-[56.25%]'}>
      <iframe
        className="w-full h-full absolute top-0 left-0"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Our Manufacture"
      />
    </div>
  );
};

export default Video;

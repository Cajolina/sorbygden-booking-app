import heroVideo from "../assets/videos/hero-video-3.mp4";

import "../styling/Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="main-container">
        <video
          id="hero-video"
          className="hero-video"
          width="100%"
          autoPlay
          muted
          loop
          controls={false}
          onContextMenu={() => false}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div>
          <h2 className="om-text">OM SÖRBYGDEN</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;

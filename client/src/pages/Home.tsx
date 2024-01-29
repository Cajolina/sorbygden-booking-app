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
        <div className="homeAbout">
          <h2 className="om-text">OM SÖRBYGDEN</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni
            saepe repellat atque illo voluptatibus, consectetur minima, rerum
            voluptatem sed tempora, quasi quibusdam! Quam cupiditate earum
            soluta dignissimos dicta iusto aliquid!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;

import { Carousel } from "antd";
import image1 from "../assets/images/CarouselImages/sor-1.jpg";
import image2 from "../assets/images/CarouselImages/sor-2.jpg";
import image3 from "../assets/images/CarouselImages/sor-5.jpg";
import image4 from "../assets/images/CarouselImages/sor-7.jpg";
import image5 from "../assets/images/CarouselImages/sor-8.jpg";
import image6 from "../assets/images/CarouselImages/sor-9.jpg";
import image7 from "../assets/images/CarouselImages/sor-10.jpg";

function Explore() {
  const contentStyle: React.CSSProperties = {
    height: "700px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="imageTitleContainer">
      <h1 className="page-title-green">Upplev</h1>
      <Carousel autoplay>
        <div>
          <img
            style={{
              ...contentStyle,
              objectFit: "cover",
              width: "100%",
            }}
            src={image1}
            alt="Slide 1"
          />
        </div>
        <div>
          <img
            style={{
              ...contentStyle,
              objectFit: "cover",
              width: "100%",
            }}
            src={image2}
            alt="Slide 2"
          />
        </div>
        <div>
          <img
            style={{
              ...contentStyle,
              objectFit: "cover",
              width: "100%",
            }}
            src={image3}
            alt="Slide 3"
          />
        </div>
        <div>
          <img
            style={{
              ...contentStyle,
              objectFit: "cover",
              width: "100%",
            }}
            src={image4}
            alt="Slide 4"
          />
        </div>
        <div>
          <img
            style={{
              ...contentStyle,
              objectFit: "cover",
              width: "100%",
            }}
            src={image5}
            alt="Slide 5"
          />
        </div>

        <div>
          <img
            style={{
              ...contentStyle,
              objectFit: "cover",
              width: "100%",
            }}
            src={image6}
            alt="Slide 6"
          />
        </div>
        <div>
          <img
            style={{
              ...contentStyle,
              objectFit: "cover",
              width: "100%",
            }}
            src={image7}
            alt="Slide 7"
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Explore;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sliderItems } from "../../data";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import classes from "./Slider.module.css";

const Slider = () => {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = sliderItems;

  const shopNowHandler = () => {
    navigate("/mens", { replace: true });
  };

  const goToPrevious = () => {
    const isFirstSlide = slideIndex === 0;
    const index = isFirstSlide ? slides.length - 1 : slideIndex - 1;
    setSlideIndex(index);
  };
  const goToNext = () => {
    const isLastSlide = slideIndex === slides.length - 1;
    const index = isLastSlide ? 0 : slideIndex + 1;
    setSlideIndex(index);
  };

  return (
    <div className={classes.container}>
      <div
        className={`${classes.arrows} ${classes.arrowLeft}`}
        onClick={goToPrevious}
      >
        <AiOutlineArrowLeft size={20} />
      </div>
      <div className={classes.slides}>
        {slides.map((slide, i) => (
          <div
            className={i === slideIndex ? classes.slide : "hidden"}
            style={{ background: slide.background }}
            key={slide.id}
          >
            <figure className={classes.imgContainer}>
              <img src={slide.img} alt="Converse Shoes" />
            </figure>
            <div
              className={classes.infoContainer}
              style={{ color: slide.textColor }}
            >
              <h1>{slide.title}</h1>
              <p>
                {slide.desc1}
                <br />
                {slide.desc2}
              </p>

              <button
                type="button"
                className="custom-button"
                style={{ background: slide.textColor }}
                onClick={shopNowHandler}
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        className={`${classes.arrows} ${classes.arrowRight}`}
        onClick={goToNext}
      >
        <AiOutlineArrowRight size={20} />
      </div>
    </div>
  );
};

export default Slider;

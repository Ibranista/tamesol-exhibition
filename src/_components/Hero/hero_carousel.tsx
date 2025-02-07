'use client';
import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { NextButton, PrevButton, usePrevNextButtons } from '../Buttons/EmblaArrowButtons';
import { DotButton, useDotButton } from '../Buttons/Embla_Dot_Buttons';
import '../../_styles/carousel.css';
import HeroSection from '.';
type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  return (
    <section className="embla bg-orange-200 h-full">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div
              className="relative embla__slide h-screen max-md:h-auto bg-top-header-bg bg-cover bg-no-repeat pt-32 px-14"
              key={index}
            >
              {/* overlay cover */}
              <div className="absolute inset-0 bg-brand-gradient-var4 opacity-80"></div>
              <HeroSection />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls grid max-md:hidden">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;

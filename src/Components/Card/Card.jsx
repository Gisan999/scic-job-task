/* eslint-disable react/prop-types */
import Aos from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';
const Card = ({name, title}) => {
    useEffect(() => {
        Aos.init();
      }, [])
    return (
        <div>
             <div data-aos="flip-right" className="e-card playing ">
                <div data-aos="fade-up" className="image"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="infotop px-3">
             <h2 data-aos="fade-up" className="pb-3 text-2xl italic">    {name}</h2>
                 <hr/>
                 <hr/>
                  <div data-aos="flip-down" className="name text-justify">{title}</div>
                </div>
              </div>
        </div>
    );
};

export default Card;
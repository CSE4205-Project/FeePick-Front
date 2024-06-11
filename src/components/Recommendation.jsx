import './Recommendation.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdSubway, IoMdCart, IoIosBook, IoIosHeadset, IoMdMedkit, IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { IoAirplane, IoInformationCircleSharp, IoCard } from "react-icons/io5";
import { BiCoffeeTogo } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";

const Recommendation = () => {
    const [currentContent, setCurrentContent] = useState(0);

    const navigate = useNavigate();

    // 이전 버튼 클릭 핸들러
    const handlePrevClick = () => {
        setCurrentContent((prevIndex) => (prevIndex === 0 ? contents.length - 1 : prevIndex - 1));
    };

    // 다음 버튼 클릭 핸들러
    const handleNextClick = () => {
        setCurrentContent((prevIndex) => (prevIndex === contents.length - 1 ? 0 : prevIndex + 1));
    };

    const handleMoreInfo = () => {
        setClickCounts((prevClickCounts) => ({
            ...prevClickCounts,
            [currentResult.benefit.name]: (prevClickCounts[currentResult.benefit.name] || 0) + 1,
        }));
        navigate(`/detailPage?name=${currentResult.benefit.name}`);
    };

    const handleRedirection = () => {
        if (currentResult.benefit && currentResult.benefit.url) {
            window.location.href = currentResult.benefit.url;
          }
    };

    const currentResult = result[currentIndex];

    return (
        <div className="whole-container">
            <div className="left" onClick={handlePrevClick}>
                <button className="arrow"><IoIosArrowDropleftCircle /></button>
            </div>
            <div className="middle">
                <div className="recommended">
                    <div className="card">
                        <img src={`/img/${currentResult.benefit.description.image}`} alt={currentResult.benefit.name}/>
                    </div>
                    <div className="features">
                        <h2>
                            <span className="h2-num">Best {currentResult + 1}.</span> 
                            <span className="h2-title">{currentResult.benefit.name}</span>
                        </h2>
                        {currentResult.benefit.benefits.map((benefit, index) => (
                            <p key={index}>{benefit}</p>
                        ))}
                        <div className="buttons">
                            <button className="more-info" onClick={handleMoreInfo}>
                                더 알아보기<FaArrowRight className="go"/>
                            </button>
                            <button className="redirection" onClick={handleRedirection}>
                                신청하러 가기<FaArrowRight className="go"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right" onClick={handleNextClick}>
                <button className="arrow"><IoIosArrowDroprightCircle /></button>
            </div>
        </div>
    );
}

export default Recommendation;
import './Recommendation.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdSubway, IoMdCart, IoIosBook, IoIosHeadset, IoMdMedkit, IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { IoAirplane, IoInformationCircleSharp, IoCard } from "react-icons/io5";
import { BiCoffeeTogo } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";

const Recommendation = () => {
    // 컨텐츠와 현재 보여지는 컨텐츠의 인덱스를 관리하는 상태
    const [currentContent, setCurrentContent] = useState(0);
    const contents = [
        {
            number: 1,
            title: '기후동행카드',
            paragraphs: [<IoMdSubway />, <IoMdCart />, <BiCoffeeTogo />],
            image: 'example1.png'
        },
        {
            number: 2,
            title: '신한 알뜰교통카드',
            paragraphs: [<IoMdSubway />, <IoIosBook />, <IoIosHeadset />],
            image: 'example2.png'
        },
        {
            number: 3,
            title: '',
            paragraphs: [<IoMdSubway />, <IoAirplane />, <IoMdMedkit />],
            image: 'image3.jpg'
        }
    ];

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
        navigate("/detailPage");
    };

    const handleRedirection = () => {
        navigate("https://www.shinhancard.com/pconts/html/card/apply/credit/1188458_2207.html");
    };

    return (
        <div className="whole-container">
            <div className="left" onClick={handlePrevClick}>
                <button className="arrow"><IoIosArrowDropleftCircle /></button>
            </div>
            <div className="middle">
                <div className="recommended">
                    <div className="card">
                        <img src={`/img/${contents[currentContent].image}`} alt={contents[currentContent].title}/>
                    </div>
                    <div className="features">
                    <h2>
                        <span className="h2-num">Best {contents[currentContent].number}.</span> 
                        <span className="h2-title">{contents[currentContent].title}</span>
                    </h2>
                    {contents[currentContent].paragraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
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
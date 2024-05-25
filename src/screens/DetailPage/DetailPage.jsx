import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import "./DetailPage.css";
import cardsData from '../ListPage/cards.json';

export const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);

  const handleRedirection = () => {
    window.location.href = card.redirection;
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const cardName = searchParams.get('name');
    const cardCompany = searchParams.get('company');

    const foundCard = cardsData.find(c => c.name === cardName && c.company === cardCompany);
    setCard(foundCard);
  }, [location.search]);

  if (!card) {
    return null; // card가 null일 때는 렌더링하지 않음
  }

  return (
    <div className="detail-page">
        <Header />
        <div className="detail-container">
          <div className="left">
          <img src={card.image} alt={card.name} />
          </div>
          <div className="right">
            <h2>{card.name}</h2>
            <ul>
              {card.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
        <button className="redirection" onClick={handleRedirection}>
          신청하러 가기 →
        </button>
        <hr className="line1"/>
        <h4>연회비</h4>
        <hr />
        <div>
          {card.annualFee}
        </div>
        <hr className="line1"/>
        <h4>유의사항</h4>
        <div className="notes">
          {card.notes}
        </div>
        <hr />
        <h4>부가정보</h4>
        <div className="additionalInfo">
          {card.additionalInfo}
        </div>
    </div>
  );
};

export default DetailPage;
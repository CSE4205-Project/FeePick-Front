import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import "./DetailPage.css";
import config from '../../../config';

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.serverUrl}/benefit/list`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
        const data = await response.json();
        const decodedData = Object.values(data).map(card => ({
          name: card.name,
          url: card.url,
          ...card.description,
        }));
        setCards(decodedData);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const cardName = searchParams.get('name');
    const foundCard = cards.find(c => c.name === cardName);
    setCard(foundCard);
  }, [location.search, cards]);

  const handleRedirection = () => {
    if (card && card.url) {
      window.location.href = card.url;
    }
  };
  

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-page">
      <Header />
      <div className="detail-container">
        <div className="left">
          <img src={`img/${card.image}`} alt={card.name} onError={(e) => e.target.src = 'img/default.png'} />
        </div>
        <div className="right">
          <h2>{card.name}</h2>
          <ul>
            {card.benefits && card.benefits.map((benefit, index) => (
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
      <div className="annualFeeTableContainer">
        <table className="annualFeeTable">
          <thead>
            <tr>
              <th>브랜드</th>
              <th>연회비</th>
            </tr>
          </thead>
          <tbody>
            {card.annualFee && card.annualFee.map((fee, index) => (
              <tr key={index}>
                {fee.map((item, subIndex) => (
                  <td key={subIndex}>{item}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr className="line1"/>
      <h4>유의사항</h4>
      <div className="notes">
        {card.notes}
      </div>
      <hr />
      <h4>부가정보</h4>
      <div className="additionalInfo">
        <ul>
          {card.additionalInfo && card.additionalInfo.map((info, index) => (
            <li className="info-container" key={index}>
              <h5>{info[0]} ></h5>
              <ol>
                {info.slice(1).map((item, subIndex) => (
                  <li className="info" key={subIndex}>{item}</li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailPage;


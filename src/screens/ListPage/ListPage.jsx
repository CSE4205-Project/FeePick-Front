import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import CheckBox from '../../components/CheckBox';
import './ListPage.css';
import config from '../../../config';

const ListPage = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(3);
  const [filters, setFilters] = useState({
    government: true,
    localGovernment: true,
    cardCompany: true,
    specifiedAmount: true,
    discount: true,
    refund: true,
    checkCard: true,
    creditCard: true,
    other: true
  });
  const [clickCounts, setClickCounts] = useState({});
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    fetch(`${config.serverUrl}/benefit/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const decodedData = Object.values(data).map(card => ({
          name: card.name,
          ...card.description,
        }));
        setCards(decodedData);
      })
      .catch((error) => console.error('Error fetching cards:', error));
  }, []);

  useEffect(() => {
    filterCards(cards, filters);
  }, [cards, filters]);

  const filterCards = (cards, filters) => {
    const filtered = cards.filter((card) => {
      const matchesSubject = (
        (filters.government && card.subject === "정부") ||
        (filters.localGovernment && card.subject === "지자체") ||
        (filters.cardCompany && card.subject === "카드사")
      );

      const matchesBenefitType = (
        (filters.specifiedAmount && card.benefitType === "지정금액") ||
        (filters.discount && card.benefitType === "할인") ||
        (filters.refund && card.benefitType === "환급")
      );

      const matchesCardType = (
        (filters.checkCard && card.cardType === "체크카드") ||
        (filters.creditCard && card.cardType === "신용카드") ||
        (filters.other && card.cardType === "기타")
      );

      return matchesSubject && matchesBenefitType && matchesCardType;
    });

    setFilteredCards(filtered);
  };

  const handleFilterChange = (filterKey) => {
    const updatedFilters = {
      ...filters,
      [filterKey]: !filters[filterKey],
    };
    setFilters(updatedFilters);
    filterCards(cards, updatedFilters);
  };

  const handleLoadMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 3);
  };

  const handleCardClick = (card) => {
    setClickCounts((prevClickCounts) => ({
      ...prevClickCounts,
      [card.name]: (prevClickCounts[card.name] || 0) + 1,
    }));
    navigate(`/detailPage?name=${card.name}`);
  };

  return (
    <div className="listing-page">
      <Header />
      <div className="checkbox-container">
        <div className="left">
          <div className="left-line">주체</div>
          <div className="left-line">혜택유형</div>
          <div className="left-line">카드종류</div>
        </div>
        <div className="right">
          <div className="line">
            <CheckBox
              label="정부"
              isChecked={filters.government}
              onChange={() => handleFilterChange('government')}
            />
            <CheckBox
              label="지자체"
              isChecked={filters.localGovernment}
              onChange={() => handleFilterChange('localGovernment')}
            />
            <CheckBox
              label="카드사"
              isChecked={filters.cardCompany}
              onChange={() => handleFilterChange('cardCompany')}
            />
          </div>
          <div className="line">
            <CheckBox
              label="지정금액"
              isChecked={filters.specifiedAmount}
              onChange={() => handleFilterChange('specifiedAmount')}
            />
            <CheckBox
              label="할인"
              isChecked={filters.discount}
              onChange={() => handleFilterChange('discount')}
            />
            <CheckBox
              label="환급"
              isChecked={filters.refund}
              onChange={() => handleFilterChange('refund')}
            />
          </div>
          <div className="line">
            <CheckBox
              label="체크카드"
              isChecked={filters.checkCard}
              onChange={() => handleFilterChange('checkCard')}
            />
            <CheckBox
              label="신용카드"
              isChecked={filters.creditCard}
              onChange={() => handleFilterChange('creditCard')}
            />
            <CheckBox
              label="기타"
              isChecked={filters.other}
              onChange={() => handleFilterChange('other')}
            />
          </div>
        </div>
      </div>
      <div className="list">
        <div className="overlap-group">
          {filteredCards.slice(0, visibleCards).map((card) => (
            <div key={card.name} className="rectangle" onClick={() => handleCardClick(card)}>
              <img src={card.image} alt={" "} />
              <div className="card-info">
                <div className="card-company">
                  <div className="frame">
                    <div className="text-wrapper-2">{card.hashtags[0]}</div>
                  </div>
                </div>
                <div className="text-wrapper">{card.name}</div>
                <div className="features">{card.benefits.join(' | ')}</div>
                <div className="hashtags">
                  <div className="text-wrapper-3">#{card.hashtags.join(' #')}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {visibleCards < filteredCards.length && (
        <div className="load-more" onClick={handleLoadMore}>
          Load More
        </div>
      )}
    </div>
  );
};

export default ListPage;




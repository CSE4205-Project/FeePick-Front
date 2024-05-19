import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import CheckBox from '../../components/CheckBox';
import './ListPage.css';
import cardsData from './cards.json';

function ListPage() {
  const history = useHistory();
  const [cards, setCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState(3); // 초기에 보여지는 카드 수
  const [filters, setFilters] = useState({
    government: true,
    localGovernment: true,
    cardCompany: true,
    otherCategory: true,
    specifiedAmount: true,
    discount: true,
    refund: true
  });

  const [clickCounts, setClickCounts] = useState({});
  
  useEffect(() => {
    setCards(cardsData);
  }, []);

  const handleFilterChange = (filterKey) => {
    setFilters({
      ...filters,
      [filterKey]: !filters[filterKey]
    });
  };

  const filteredCards = cards.filter((card) => {
    return (
      (filters.government) ||
      (filters.localGovernment) ||
      (filters.cardCompany) ||
      (filters.otherCategory) ||
      (filters.specifiedAmount) ||
      (filters.discount) ||
      (filters.refund)
    );
  });

  const handleLoadMore = () => {
    setVisibleCards(prevVisibleCards => prevVisibleCards + 3); // 한 번에 3개씩 추가
  };

  const handleCardClick = (card) => {
    setClickCounts(prevClickCounts => ({
      ...prevClickCounts,
      [card.name]: (prevClickCounts[card.name] || 0) + 1
    }));
    history.push(`/detailPage?name=${card.name}&company=${card.company}`);
  };

  return (
    <div className="listing-page">
      <Header />
      <div className="checkbox-container">
        <div className="left">
          <div className="left-line">주체</div>
          <div className="left-line">혜택유형</div>
        </div>
        <div className="right">
          <div className="line">
            <CheckBox label="정부" isChecked={filters.government} onChange={() => handleFilterChange('government')} />
            <CheckBox label="지자체" isChecked={filters.localGovernment} onChange={() => handleFilterChange('localGovernment')} />
            <CheckBox label="카드사" isChecked={filters.cardCompany} onChange={() => handleFilterChange('cardCompany')} />
            <CheckBox label="기타" isChecked={filters.otherCategory} onChange={() => handleFilterChange('otherCategory')} />
          </div>
          <div className="line">
            <CheckBox label="지정금액" isChecked={filters.specifiedAmount} onChange={() => handleFilterChange('specifiedAmount')} />
            <CheckBox label="할인" isChecked={filters.discount} onChange={() => handleFilterChange('discount')} />
            <CheckBox label="환급" isChecked={filters.refund} onChange={() => handleFilterChange('refund')} />
          </div>
        </div>
      </div>
      <div className="list">
        <div className="overlap-group">
          {filteredCards.slice(0, visibleCards).map((card) => (
            <div key={card.name} className="rectangle" onClick={() => handleCardClick(card)}>
              <img src={card.image} alt={card.name} />
              <div className="card-info">
                <div className="card-company"><div className="frame"><div className="text-wrapper-2">{card.company}</div></div></div>
                <div className="text-wrapper">{card.name}</div>
                <div className="features">{card.benefits.join(' | ')}</div>
                <div className="hashtags"><div className="text-wrapper-3">#{card.hashtags.join(' #')}</div></div>
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
}

export default ListPage;

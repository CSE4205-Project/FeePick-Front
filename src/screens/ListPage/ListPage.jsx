import React, { useState } from 'react';
import Header from '../../components/Header';
import CheckBox from '../../components/CheckBox';
import './ListPage.css';

function ListPage() {
  const [government, setGovernment] = useState(true);
  const [localGovernment, setLocalGovernment] = useState(true);
  const [cardCompany, setCardCompany] = useState(true);
  const [otherCategory, setOtherCategory] = useState(true);
  const [specifiedAmount, setSpecifiedAmount] = useState(true);
  const [discount, setDiscount] = useState(true);
  const [refund, setRefund] = useState(true);

  const checkedItems = [];
  if (government) checkedItems.push("정부");
  if (localGovernment) checkedItems.push("지자체");
  if (cardCompany) checkedItems.push("카드사");
  if (otherCategory) checkedItems.push("기타");
  if (specifiedAmount) checkedItems.push("지정금액");
  if (discount) checkedItems.push("할인");
  if (refund) checkedItems.push("환급");

  return (
    <div>
      <Header />
      <div className="checkbox-container">
        <div className="left">
          <div className="left-line">주체</div>
          <div className="left-line">혜택유형</div>
        </div>
        <div className="right">
          <div className="line">
            <CheckBox label="정부" isChecked={government} onChange={() => setGovernment(!government)} />
            <CheckBox label="지자체" isChecked={localGovernment} onChange={() => setLocalGovernment(!localGovernment)} />
            <CheckBox label="카드사" isChecked={cardCompany} onChange={() => setCardCompany(!cardCompany)} />
            <CheckBox label="기타" isChecked={otherCategory} onChange={() => setOtherCategory(!otherCategory)} />
          </div>
          <div className="line">
            <CheckBox label="지정금액" isChecked={specifiedAmount} onChange={() => setSpecifiedAmount(!specifiedAmount)} />
            <CheckBox label="할인" isChecked={discount} onChange={() => setDiscount(!discount)} />
            <CheckBox label="환급" isChecked={refund} onChange={() => setRefund(!refund)} />
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>
  );
}

export default ListPage;

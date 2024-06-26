import './UserInfoForm.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import DaumPost from './DaumPost';

const cities = {
    "서울특별시": ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
    "경기도": ["가평군", "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양주시", "양평군", "여주시", "연천군", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시"],
    "인천광역시": ["강화군", "계양구", "미추홀구", "남동구", "동구", "부평구", "서구", "연수구", "옹진군", "중구"],
};

const UserInfoForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        age: 0,
        gender: "",
        residence1: "",
        residence2: "",
        location: [{ departure: "", destination: "", frequency: 0 }],
        specialCase: false
    });

    const navigate = useNavigate();

    const handleCityChange = (e) => {
        setFormData({
            ...formData,
            residence1: e.target.value,
            residence2: '' 
        });
    };

    const handleAddressChange = (index, field, address) => {
        const newLocation = [...formData.location];
        newLocation[index] = { ...newLocation[index], [field]: address };
        setFormData({
            ...formData,
            location: newLocation
        });
    };

    const handleChange = (e, index, field) => {
        const { value } = e.target;
        const newLocation = [...formData.location];
        newLocation[index] = { ...newLocation[index], [field]: field === 'frequency' ? Number(value) : value };
        setFormData({
            ...formData,
            location: newLocation
        });
    };

    const handleAddLocation = () => {
        setFormData({
            ...formData,
            location: [...formData.location, { departure: "", destination: "", frequency: 0 }]
        });
    };

    const handleRemoveLocation = (index) => {
        const newLocation = [...formData.location];
        newLocation.splice(index, 1);
        setFormData({
            ...formData,
            location: newLocation
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch(`${config.serverUrl}/user/data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                onSubmit(result);
                navigate("/calPage", { state: { result } });
            } else {
                console.error('Server error:', response.statusText);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <div className="container">
            <div className="comments">
                <h2>Plz fill out the form!</h2>
            </div>
            <form onSubmit={handleSubmit} className="userInfo">
                <div>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        placeholder="나이"
                        onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    />
                </div>
                <div>
                    <select
                        id="gender"
                        name="gender"
                        placeholder="성별"
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                        <option value="">성별</option>
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                        <option value="other">선택하지 않음</option>
                    </select>
                </div>
                <div>
                    <h3>거주지역</h3>
                    <select
                        id="residence1"
                        name="residence1"
                        value={formData.residence1}
                        onChange={handleCityChange}
                    >
                        <option value=""></option>
                        {Object.keys(cities).map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    <select
                        id="residence2"
                        name="residence2"
                        value={formData.residence2}
                        onChange={(e) => setFormData({ ...formData, residence2: e.target.value })}
                        disabled={!formData.residence1}
                    >
                        <option value=""></option>
                        {formData.residence1 && cities[formData.residence1].map(district => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                </div>
                <div className="pattern-container">
                    <div className="pattern-title">
                        <h3 className="title1">사용패턴</h3>
                        <h3 className="title2">사용횟수</h3>
                    </div>
                    {formData.location.map((location, index) => (
                        <div key={index} className="pattern">
                            <div className="pattern1">
                                <div className="pattern-location">
                                    <DaumPost setAddress={(address) => handleAddressChange(index, 'departure', address)} label="출발지 >"/>
                                    <DaumPost setAddress={(address) => handleAddressChange(index, 'destination', address)} label="도착지 >"/>
                                </div>
                            </div>
                            <div className="pattern2">
                                <div className="frequency">
                                    <div className="frequency-text">주</div>
                                    <input
                                        className="frequency-number"
                                        type="number"
                                        id={`frequency-${index}`}
                                        name="frequency"
                                        placeholder=" "
                                        onChange={(e) => handleChange(e, index, 'frequency')}
                                    />
                                    <div className="frequency-text">회</div>
                                </div>
                            </div>
                            <div className="pattern3">
                                <button type="button" className="minus" onClick={() => handleRemoveLocation(index)}>-</button>
                            </div>
                        </div>
                    ))}
                    <p>
                        <button type="button" className="plus" onClick={handleAddLocation}>+</button>
                    </p>
                </div>
                <button className="submit" type="submit">혜택 계산하러 가기 →</button>
            </form>
        </div>
    );
};

export default UserInfoForm;




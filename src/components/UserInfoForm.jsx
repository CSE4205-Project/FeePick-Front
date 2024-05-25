import './UserInfoForm.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserInfoForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        residence1: '',
        residence2: '',
        locations: [{ departure: '', destination: '', frequency: '' }]
    });

    const navigate = useNavigate();

    const handleChange = (e, index, field) => {
        const { value } = e.target;
        const newLocations = [...formData.locations];
        newLocations[index] = { ...newLocations[index], [field]: value };
        setFormData({
            ...formData,
            locations: newLocations
        });
    };

    const handleAddLocation = () => {
        setFormData({
            ...formData,
            locations: [...formData.locations, { departure: '', destination: '', frequency: '' }]
        });
    };

    const handleRemoveLocation = (index) => {
        const newLocations = [...formData.locations];
        newLocations.splice(index, 1);
        setFormData({
            ...formData,
            locations: newLocations
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        navigate("/calPage");
    };

    return (
        <div className="container">
            <div className="comments">
                <h2>Fill out the form!</h2>
                <p>comments for detail</p>
            </div>
            <form onSubmit={handleSubmit} className="userInfo">
                <div>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        placeholder="나이"
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                </div>
                <div>
                    <select
                        id="gender"
                        name="gender"
                        placeholder="성별"
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                        <option value="">성별을 선택해주세요</option>
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                        <option value="other">선택하지 않음</option>
                    </select>
                </div>
                <div>
                    <h3>거주지역</h3>
                    <input
                        type="text"
                        id="residence1"
                        name="residence1"
                        placeholder="시"
                        onChange={(e) => setFormData({ ...formData, residence1: e.target.value })}
                    />
                    <input
                        type="text"
                        id="residence2"
                        name="residence2"
                        placeholder="군/구"
                        onChange={(e) => setFormData({ ...formData, residence2: e.target.value })}
                    />
                </div>
                <div className="pattern-container">
                    {formData.locations.map((location, index) => (
                        <div key={index} className="pattern">
                            <div className="pattern1">
                                <h3>사용패턴</h3>
                                <div className="pattern-location">
                                    <input
                                        type="text"
                                        id={`departure-${index}`}
                                        name="departure"
                                        placeholder="출발지"
                                        onChange={(e) => handleChange(e, index, 'departure')}
                                    />
                                    <input
                                        type="text"
                                        id={`destination-${index}`}
                                        name="destination"
                                        placeholder="도착지"
                                        onChange={(e) => handleChange(e, index, 'destination')}
                                    />
                                </div>
                            </div>
                            <div className="pattern2">
                                <h3>사용횟수</h3>
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
                            <button type="button" className="minus" onClick={() => handleRemoveLocation(index)}>-</button>
                        </div>
                    ))}
                    <button type="button" className="plus" onClick={handleAddLocation}>+</button>
                </div>
                <button className="submit" type="submit">혜택 계산하러 가기 →</button>
            </form>
        </div>
    );
};

export default UserInfoForm;



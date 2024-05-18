import React from 'react';
import Header from '../../components/Header';
import UserInfoForm from '../../components/UserInfoForm';
import "./MainPage.css";

const MainPage = () => {
    const handleSubmit = (formData) => {
        // 사용자 정보 처리하는 로직 구현
        console.log('Submitted data:', formData);
    };
    return (
        <div>
            <Header />
            <UserInfoForm onSubmit={handleSubmit} />
        </div>
    );
};

export default MainPage;

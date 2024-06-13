import React, { useState, useEffect } from 'react';
import './DaumPost.css';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const DaumPost = ({ setAddress, label }) => {
    const [inputValue, setInputValue] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const postcodeScriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const open = useDaumPostcodePopup(postcodeScriptUrl);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setAddress(fullAddress);
        setInputValue(fullAddress); // Set the input value to the full address
    };

    const handleClick = () => {
        open({ onComplete: handleComplete }).catch((error) => {
            console.error("Failed to load Daum Postcode API script:", error);
        });
    };

    const getDisplayValue = () => {
        if (isMobile) {
            return inputValue ? inputValue[0] : '>';
        } else {
            return inputValue || label;
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={getDisplayValue()} 
                placeholder={label} 
                readOnly 
                onClick={handleClick}
                className="find_address_button"
            />
        </div>
    );
};

export default DaumPost;




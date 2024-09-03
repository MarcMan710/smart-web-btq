// frontend/src/components/Button.js
import React from 'react';

const Button = ({ children, onClick, type = 'button', styleType = 'primary' }) => {
    return (
        <button className={`btn btn-${styleType}`} onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default Button;

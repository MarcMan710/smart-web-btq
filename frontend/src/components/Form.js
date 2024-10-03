// frontend/src/components/Form.js
import React from 'react';

const Form = ({ children, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            {children}
        </form>
    );
};

export default Form;

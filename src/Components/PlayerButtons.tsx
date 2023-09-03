import React from 'react';

interface ButtonProps {
    onClick: () => void;
    text?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
    return (
        <button className={`game-button ${text}-button`} onClick={onClick}>
            {text}
        </button>
    );
};

export const MoreButton: React.FC<ButtonProps> = ({ onClick }) => {
    return <Button onClick={onClick} text="More" />;
};

export const LessButton: React.FC<ButtonProps> = ({ onClick }) => {
    return <Button onClick={onClick} text="Less" />;
};

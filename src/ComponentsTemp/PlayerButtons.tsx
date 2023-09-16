import React from 'react';
import styles from '../Style.module.scss'

interface ButtonProps {
    onClick: () => void;
    buttonText?: string;
    buttonClass?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, buttonText, buttonClass }) => {
    return (
        <button className={buttonClass} onClick={onClick}>
            {buttonText}
        </button>
    );
};

export const RestartButton: React.FC<ButtonProps> = ({ onClick }) => {
    return <Button onClick={onClick} buttonText="Restart" buttonClass={styles.game_button_restart_menu} />;
}

export const MoreButton: React.FC<ButtonProps> = ({ onClick }) => {
    return <Button onClick={onClick} buttonText="More" buttonClass={styles.game_button_more} />;
};

export const LessButton: React.FC<ButtonProps> = ({ onClick }) => {
    return <Button onClick={onClick} buttonText="Less" buttonClass={styles.game_button_less} />;
};

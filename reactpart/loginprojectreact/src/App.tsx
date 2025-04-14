import React, { useState, useEffect } from 'react';
import UserCredentials from './types/MainStructures';
import AdditionalComponent from './Components/AdditionalComponent';
import LoginComponent from './Components/LoginComponents';
import FooterComponent from './Components/FooterComponent';

const correctTuple: UserCredentials = {
    phone: '+12345678901',
    email: 'Semyon@Volkov.com',
    password: '123456',
};

const secretTuple: UserCredentials = {
    phone: '+12345678902',
    email: 'Secret@redir.haha',
    password: 'nichegoneproizoshlo',
};

const everythingFromInfra = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const inputEmailPhone = document.getElementById('email') as HTMLInputElement;
        const inputPassword = document.getElementById('password') as HTMLInputElement;
        const showButton = document.querySelector(
            '.show-element',
        ) as HTMLButtonElement;
        const loginForm = document.getElementById('login-form') as HTMLFormElement;
        const keepSignedIn = document.getElementById(
            'keep-signed-in',
        ) as HTMLInputElement;
        const appleButton = document.querySelector(
            '.apple-button',
        ) as HTMLButtonElement;


        function validateForm(event: Event): void {
            const emailOrPhone: string = inputEmailPhone.value.trim();
            const password: string = inputPassword.value.trim();
            let isValid: boolean = true;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\+\d{11}$/;

            if (!emailOrPhone) {
                alert('Пожалуйста, введите email или номер телефона.');
                isValid = false;
            } else if (
                !(emailRegex.test(emailOrPhone) || phoneRegex.test(emailOrPhone))
            ) {
                alert('Введите корректный email или номер телефона.');
                isValid = false;
            }

            if (!password) {
                alert('Введите пароль.');
                isValid = false;
            } else if (password.length < 6) {
                alert('Пароль должен содержать минимум 6 символов.');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
                return;
            }

            if (
                (emailOrPhone === correctTuple.email ||
                    emailOrPhone === correctTuple.phone) &&
                password === correctTuple.password
            ) {
                alert('Введено правильно');
                if (keepSignedIn.checked) {
                    localStorage.setItem('emailOrPhone', emailOrPhone);
                    localStorage.setItem('password', password);
                }
            } else if (
                (emailOrPhone === secretTuple.email ||
                    emailOrPhone === secretTuple.phone) &&
                password === secretTuple.password
            ) {
                alert('Секретные данные, перенаправляем...');
                if (keepSignedIn.checked) {
                    localStorage.setItem('emailOrPhone', emailOrPhone);
                    localStorage.setItem('password', password);
                }
                setTimeout(() => {
                    window.location.href = 'https://www.youtube.com/watch?v=d5PvwXOq6JQ';
                }, 500);
                event.preventDefault();
            } else {
                alert('Введено неправильно');
                event.preventDefault();
            }
        }
    });
}

const App = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [keepSignedIn, setKeepSignedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [maxLength, setMaxLength] = useState(100);

    useEffect(() => {
        const SavedEmailOrPhone = localStorage.getItem('emailOrPhone');
        const SavedPassword = localStorage.getItem('password');

        if (SavedEmailOrPhone) {
            setEmailOrPhone(SavedEmailOrPhone);
        }
        if (SavedEmailOrPhone) {
            setPassword(SavedPassword || '');
        }
    }, []);

    const handleEmailOrPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;

        setEmailOrPhone(value);

        if (value.startsWith('+')) {
            setMaxLength(12);
        }
        else {
            setMaxLength(100);
        }
    }
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleKeepSignedInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeepSignedIn(e.target.checked);
    };

    const handleAppleButton = () => {

        setIsLoading(true);
        setTimeout(() => {
            const SavedEmailOrPhone = localStorage.getItem('emailOrPhone');
            const SavedPassword = localStorage.getItem('password');

            if (SavedEmailOrPhone) {
                setEmailOrPhone(SavedEmailOrPhone);
            }
            if (SavedEmailOrPhone) {
                setPassword(SavedPassword || '');
            }
        }, 1000);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+\d{11}$/;

        if (!emailOrPhone) {
            alert('Пожалуйста, введите email или номер телефона.');
        } else if (
            !(emailRegex.test(emailOrPhone) || phoneRegex.test(emailOrPhone))
        ) {
            alert('Введите корректный email или номер телефона.');
        }

        if (!password) {
            alert('Введите пароль.');
        } else if (password.length < 6) {
            alert('Пароль должен содержать минимум 6 символов.');
        }

        if (
            (emailOrPhone === correctTuple.email ||
                emailOrPhone === correctTuple.phone) &&
            password === correctTuple.password
        ) {
            alert('Введено правильно');
            if (keepSignedIn) {
                localStorage.setItem('emailOrPhone', emailOrPhone);
                localStorage.setItem('password', password);
            }
        } else if (
            (emailOrPhone === secretTuple.email ||
                emailOrPhone === secretTuple.phone) &&
            password === secretTuple.password
        ) {
            alert('Секретные данные, перенаправляем...');
            if (keepSignedIn) {
                localStorage.setItem('emailOrPhone', emailOrPhone);
                localStorage.setItem('password', password);
            }
            setTimeout(() => {
                window.location.href = 'https://www.youtube.com/watch?v=d5PvwXOq6JQ';
            }, 500);
        } else {
            alert('Введено неправильно');
        }
    }


    return (
        <div className="centered-container">
            <AdditionalComponent />
            <LoginComponent
                emailOrPhone={emailOrPhone}
                password={password}
                passwordVisible={passwordVisible}
                keepSignedIn={keepSignedIn}
                isLoading={isLoading}
                maxLength={maxLength}
                onEmailOrPhoneChange={handleEmailOrPhoneChange}
                onPasswordChange={handlePasswordChange}
                onKeepSignedInChange={handleKeepSignedInChange}
                onTogglePasswordVisibility={togglePasswordVisibility}
                onAppleButtonClick={handleAppleButton}
                onSubmit={handleSubmit}
            />
            <FooterComponent />
        </div>
    );
}

export default App;
import React from 'react';
import HeaderComponent from './HeaderComponent';

interface LoginComponentProps {
    emailOrPhone: string;
    password: string;
    passwordVisible: boolean;
    keepSignedIn: boolean;
    isLoading: boolean;
    maxLength: number;
    onEmailOrPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeepSignedInChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTogglePasswordVisibility: () => void;
    onAppleButtonClick: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({
    emailOrPhone,
    password,
    passwordVisible,
    keepSignedIn,
    isLoading,
    maxLength,
    onEmailOrPhoneChange,
    onPasswordChange,
    onKeepSignedInChange,
    onTogglePasswordVisibility,
    onAppleButtonClick,
    onSubmit,
}) => {
    return (
        <div className="main-container">
            <HeaderComponent />
            <form id="login-form" onSubmit={onSubmit}>
                <div className="input-container">
                    <label htmlFor="email">Email or Phone</label>
                    <input
                        className="log-element"
                        type="text"
                        id="email"
                        placeholder="Email or Phone"
                        required
                        value={emailOrPhone}
                        onChange={onEmailOrPhoneChange}
                        maxLength={maxLength}
                    />

                    <label htmlFor="password">Password</label>
                    <div className="password-wrapper">
                        <input
                            className="log-element"
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={onPasswordChange}
                        />
                        <button
                            type="button"
                            className="show-element"
                            aria-label="Show password"
                            aria-controls="password"
                            onClick={onTogglePasswordVisibility}
                        >
                            {passwordVisible ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                <div className="checkbox-container">
                    <input
                        className="checkbox-element"
                        type="checkbox"
                        id="keep-signed-in"
                        checked={keepSignedIn}
                        onChange={onKeepSignedInChange}
                    />
                    <label htmlFor="keep-signed-in">Keep me signed in</label>
                </div>

                <a href="forgot-password" className="forgot-element">Forgot password?</a>

                <div className="buttons">
                    <button type="submit" className="primary-button">Sign in</button>
                    <div className="line-element">or</div>
                    <button
                        type="button"
                        className="apple-button"
                        onClick={onAppleButtonClick}
                        disabled={isLoading}
                    >
                        <img src="./steam.png" alt="Steam logo" width="20" height="20" />
                        <span className="apple-text">Sign in with Steam</span>
                        {isLoading && <div className="spinner" aria-hidden="true"></div>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginComponent;
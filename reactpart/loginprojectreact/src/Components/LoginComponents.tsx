import React from 'react'
import HeaderComponent from './HeaderComponent';

const LoginComponent = () => {
    return (
        <div className="main-container">
            <HeaderComponent />
            <form id="login-form">
                <div className="input-container">
                    <label htmlFor="email">Email or Phone</label>
                    <input className="log-element" type="text" id="email" placeholder="Email or Phone" required />

                    <label htmlFor="password">Password</label>
                    <div className="password-wrapper">
                        <input className="log-element" type="password" id="password" placeholder="Password" required />
                        <button type="button" className="show-element" aria-label="Show password" aria-controls="password">
                            Show
                        </button>
                    </div>
                </div>

                <div className="checkbox-container">
                    <input className="checkbox-element" type="checkbox" id="keep-signed-in" />
                    <label htmlFor="keep-signed-in">Keep me signed in</label>
                </div>

                <a href="forgot-password" className="forgot-element">Forgot password?</a>

                <div className="buttons">
                    <button type="submit" className="primary-button">Sign in</button>
                    <div className="line-element">or</div>
                    <button type="button" className="apple-button">
                        <img src="https://img.icons8.com/ios11/512/mac-os.png" alt="Apple logo" width="20" height="20" />
                        <span className="apple-text">Sign in with Apple</span>
                        <div className="spinner" aria-hidden="true"></div>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginComponent;
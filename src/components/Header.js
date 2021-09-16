import React from 'react';
import logo from '../images/logo.svg'
import {Switch, Link, Route } from 'react-router-dom';

function Header({ email, handleLogout }) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип"></img>
            <div className="header__auth">
            <Switch>
                <Route exact path="/">
                        <Link to="sign-in" className="header__style">{email}</Link>
                        <button onClick={handleLogout} className="header__button">Выйти</button>
                </Route>
                <Route path="/sign-up">
                    <Link className="header__style" to="sign-in">Войти</Link>
                </Route>
                <Route path="/sign-in">
                    <Link className="header__style" to="sign-up">Регистрация</Link>
                </Route>
            </Switch>
            </div>
        </header>
    );
}

export default Header;



'use client';

import React from 'react';
import './Header.css';

type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
  onSignIn: () => void;
  onSignOut: () => void;
  onSignUp: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onSignIn, onSignOut, onSignUp }) => {
  return (
    <header className="header">
      <div className="header__title">Opxs</div>
      <div className="header__buttons">
        {user ? (
          <span>Welcome, {user.name}</span>
        ) : (
          <>
            <button className="header__button">Sign in</button>
            <button className="header__button">Sign up</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

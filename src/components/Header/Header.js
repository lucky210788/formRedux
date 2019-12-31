import React from 'react';
import './Header.scss';
import {NavLink} from "react-router-dom";
import Button from '../UI/Button/Button';

const Header = ({onLogOut}) => {
  return (
    <header className="page-header">
      <nav className="menu">
        <NavLink exact to='/'>Home</NavLink>
        <NavLink to='/contacts'>Contacts</NavLink>
        <NavLink to='/posts'>Posts</NavLink>
      </nav>
      <Button
        className={'btn-main btn-exit'}
        onClick={onLogOut}
      >Exit
      </Button>
    </header>
  );
};

export default Header;
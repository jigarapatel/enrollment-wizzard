import React from 'react';
import { Link } from 'react-router-dom';
import { footer } from '../styles/main.scss';
import Routes from '../routes';

const App = () =>
    <div>
        { Routes }
        <footer className={footer}>
            <Link to="/">Landing</Link>
            <Link to="/StandardView">Standard View</Link>
            <Link to="/premium">Premium</Link>
        </footer>
    </div>;

export default App;

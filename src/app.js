import React from 'react';
import ReactDOM from 'react-dom';
import MemoryGame from './components/MemoryGame';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import 'normalize.css/normalize.css';
import './styles/styles.css';

const jsx = (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={MemoryGame}></Route>
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(jsx, document.getElementById("app"));
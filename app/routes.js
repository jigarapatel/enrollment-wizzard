import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import StandardView from './components/StandardView';

export default (
	<Switch>
		<Route exact path="/" component={Landing} />
		<Route path="/standardView" component={StandardView} />
	</Switch>
);

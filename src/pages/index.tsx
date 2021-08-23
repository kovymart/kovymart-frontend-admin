import React from "react";
import { Route, Switch } from "react-router-dom";
import { Detail } from "./Detail/Detail";
import { Home } from "./Home/Home";
import { Add } from "./Add&Update/Add";
import { Update } from "./Add&Update/Update";

export const Pages = () => {
	return (
		<>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/update/:id">
					<Update />
				</Route>
				<Route path="/add">
					<Add />
				</Route>
				<Route path="/detail/:id">
					<Detail />
				</Route>
				<Route exact path="/">
					<Home />
				</Route>
			</Switch>
		</>
	);
};

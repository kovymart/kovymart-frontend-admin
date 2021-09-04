import { Route, Switch } from "react-router-dom"
import { Detail } from "./Detail/Detail"
import { Home } from "./Home/Home"
import { Add } from "./Add&Update/Add"
import { Update } from "./Add&Update/Update"
import Category from "./Category/Category"
import AddCategory from "./Category/AddCategory"
import UpdateCategory from "./Category/UpdateCategory"
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
				<Route path="/category">
					<Category />
				</Route>
				<Route path="/addcategory">
					<AddCategory />
				</Route>
				<Route path="/updatecategory/:id">
					<UpdateCategory />
				</Route>
				<Route path="/detail/:id">
					<Detail />
				</Route>
				<Route exact path="/">
					<Home />
				</Route>
			</Switch>
		</>
	)
}

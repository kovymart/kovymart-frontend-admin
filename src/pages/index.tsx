import { Route, Switch } from "react-router-dom"
import Category from "./Category/Category"
import AddCategory from "./Category/AddCategory"
import UpdateCategory from "./Category/UpdateCategory"
import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'
import Home from './Home/Home'

export const Pages = () => {
	return (
		<>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/signin">
					<SignIn />
				</Route>
				<Route exact path="/signup">
					<SignUp />
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
				<Route exact path="/">
					<Home />
				</Route>
			</Switch>
		</>
	)
}

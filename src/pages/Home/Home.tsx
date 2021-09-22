import { useEffect } from "react";
import { useHistory } from "react-router";
import { checkAuth } from '../../helpers/auth';

function Home() {
	const history = useHistory();
	useEffect(() => {
		if (checkAuth()) {
			history.push('/product');
		}
		else history.push('/signin');
	});
	return (
		<>
		</>
	);
};

export default Home;
import { useEffect } from "react";
import { useHistory } from "react-router";

function Home() {
	const history = useHistory();
	useEffect(() => {
		history.push('/product');
	});
	return (
		<>
		</>
	);
};

export default Home;
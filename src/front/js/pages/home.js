import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<Link to ={'/signup'}>SignUp</Link>
			<br></br>
			<Link to ={'/login'}>Login</Link>
			<br></br>
			<Link to ={'/private'}>profile</Link>
		</div>
	);
};

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUserLoggedIn } from "../Slices/userSlice";

const useGetUser = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.userLoggedIn);

	useEffect(() => {
		if (!user) {
			const user = JSON.parse(localStorage.getItem("user"));
			dispatch(setUserLoggedIn(user));
		}
	}, [, dispatch]);
};

export default useGetUser;

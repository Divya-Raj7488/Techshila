import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getInventory } from "../Slices/inventorySlice";

const useGetManagerInventory = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.userLoggedIn);

	console.log("-===");
	useEffect(() => {
		if (user?.email) {
			dispatch(getInventory({ email: user.email }));
		}
	}, [user]);
};

export default useGetManagerInventory;

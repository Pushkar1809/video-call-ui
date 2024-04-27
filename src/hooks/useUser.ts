import { getUniqueUser } from "@/lib/data";
import { User } from "@/lib/types";
import { useState } from "react";

export const useUser = () => {
	const [activeUsers, setActiveUsers] = useState<User[]>([]);
	const [inactiveUsers, setInactiveUsers] = useState<User[]>([]);
  const [lastIndex, setlastIndex] = useState<number>(-1);

	// Add new user to active list
	const addNewUser = () => {
    setlastIndex((prevIndex: number) => {
      const newUser = getUniqueUser(prevIndex + 1);
      setActiveUsers([...activeUsers, newUser]);
      return prevIndex + 1;
    });
	};

	// Get user with id
	const getUserById = (id: number) => {
		return [...activeUsers, ...inactiveUsers].filter(
			(user: User) => user.id === id,
		)[0];
	};

	// Moves inactive user in lobby to active in call
	const addInactiveUser = (id: number) => {
		const user = inactiveUsers.filter((u: User) => u.id === id)[0];
		if (!user) {
			return;
		} // TODO: User try catch to get error message for toast
		setInactiveUsers(inactiveUsers.filter((u: User) => u.id !== id));
		setActiveUsers([...activeUsers, user]);
	};

	// Remove user form active list
	const removeUser = (id: number) => {
    console.log(activeUsers);
		const removedUser = activeUsers.filter((user: User) => user.id === id)[0];
		if (!removedUser) {
			return;
		} // TODO: User try catch to get error message for toast
		setActiveUsers((prev: User[]) =>
			prev.filter((user: User) => user.id !== id),
		);
		setInactiveUsers([...inactiveUsers, removedUser]);
	};

	return {
		activeUsers,
		inactiveUsers,
		removeUser,
		addNewUser,
		getUserById,
		addInactiveUser,
	};
}
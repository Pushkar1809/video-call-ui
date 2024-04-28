import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import { FaPlus, FaTimes } from "react-icons/fa";

interface Props {
  user: User;
	remove: (id: number) => void;
	add: (id: number) => void;
  variant: "in-call" | "in-lobby";
}

const UserTile = ({user, variant, add, remove}: Props) => {
	const { id, firstName, lastName, pfp } = user;
  return (
		<div className="w-full flex justify-between items-center bg-white/0 hover:bg-white/5 px-3 py-2 transition-all ease-in-out duration-200 rounded-lg">
			<div className="flex gap-3 items-center">
				<Avatar className="w-8 h-8">
					<AvatarImage src={pfp} alt={firstName} />
					{firstName && lastName && (
						<AvatarFallback>
							{firstName[0]}
							{lastName[0]}
						</AvatarFallback>
					)}
				</Avatar>
				<p>
					{firstName} {lastName}
				</p>
			</div>
			<div className="flex justify-center items-center gap-2">
				{variant === "in-call" && (
					<Button
						onClick={() => remove(id)}
						className="aspect-square h-7 rounded-lg text-red-500 p-1 border border-white/20 bg-white/0 hover:bg-red-300/30 transition-all ease-in-out duration-200">
						<FaTimes />
					</Button>
				)}
				{variant === "in-lobby" && (
					<Button
						onClick={() => add(id)}
						className="aspect-square h-7 rounded-lg text-green-500 p-2 border border-white/20 bg-white/0 hover:bg-green-300/30 transition-all ease-in-out duration-200">
						<FaPlus />
					</Button>
				)}
			</div>
		</div>
	);
}

export default UserTile;
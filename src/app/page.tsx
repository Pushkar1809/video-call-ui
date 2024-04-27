"use client";
import { Button } from '@/components/ui/button';
import { useMemo, useState } from 'react';
import {
	FaVideo,
	FaVideoSlash,
	FaMicrophone,
	FaMicrophoneSlash,
	FaTimes,
	FaUser,
} from "react-icons/fa";
import { GiDiplodocus } from "react-icons/gi";
import VideoTile from '../components/VideoTile';
import UserTile from '../components/UserTile';
import { User } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/hooks/useUser';

export default function Home() {
	const { activeUsers, inactiveUsers, addNewUser, removeUser, addInactiveUser } = useUser();
	const [ isAllVideoOn, setIsAllVideoOn ] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const cols = useMemo(() => Math.ceil(Math.sqrt(activeUsers.length)), [activeUsers])
  return (
		<main className="flex h-screen flex-col items-center p-5 gap-5 overflow-hidden">
			<div
				style={{
					maxHeight: "calc(100% - 3.5rem)",
				}}
				className="flex flex-1 w-full items-center transition-all ease-in-out duration-200">
				{/* Video Grid */}
				<div className="gap-3 w-full p-5 flex flex-wrap items-center justify-center transition-all ease-in-out duration-200 mt-[-0.5rem]">
					{activeUsers.length > 0 ? (
						activeUsers.slice(0, 48).map((user: User) => (
							<VideoTile cols={cols} index={user.id} isOn={isAllVideoOn} key={user.id} />
						))
					) : (
						<div className="flex flex-col justify-center items-center gap-3">
							<GiDiplodocus size={50} />
							<p className="font-semibold text-2xl">Call is vacant!</p>
							<Button
								className="bg-white/10 text-green-500 w-full rounded-lg p-2 hover:bg-green-300/10 transition-all ease-in-out duration-200"
								onClick={() => addNewUser()}>
								Add New Participant
							</Button>
						</div>
					)}
				</div>
				{/* sidebar */}
				<div
					style={{
						marginRight: sidebarOpen ? 0 : "calc(-100% - 32px)",
						marginLeft: "20px",
						height: "calc(100vh - 5rem)",
					}}
					className="flex flex-col gap-5 w-[40ch] border border-white/20 bg-white/10 drop-shadow-xl rounded-xl p-3 transition-all ease-in-out duration-200 overflow-hidden">
					<Button
						className="bg-white/10 text-green-500 w-full rounded-lg p-2 hover:bg-green-300/10 transition-all ease-in-out duration-200"
						onClick={() => addNewUser()}>
						Add New Participant
					</Button>
					<Button
						className="bg-white/10 text-white w-full rounded-lg p-2 hover:bg-blue-300/10 transition-all ease-in-out duration-200"
						onClick={() => setIsAllVideoOn(!isAllVideoOn)}>
						{isAllVideoOn ? "Turn off all videos" : "Turn on all videos"}
					</Button>
					<Separator className="rounded-full opacity-20" />
					<div>
						<h2 className="font-semibold text-sm">
							In Call ({activeUsers.length})
						</h2>
						<div className="my-3 flex-1 max-h-[40vh] overflow-y-scroll">
							{activeUsers.map((user: User) => (
								<UserTile
									user={user}
									remove={(id: number) => removeUser(id)}
									add={(id: number) => addInactiveUser(id)}
									key={user.id}
									variant="in-call"
								/>
							))}
						</div>
					</div>
					<Separator className="rounded-full opacity-20" />
					<div>
						<h2 className="font-semibold text-sm">
							In Lobby ({inactiveUsers.length})
						</h2>
						<div className="my-3 flex-1 max-h-[65vh] overflow-y-scroll">
							{inactiveUsers.map((user: User) => (
								<UserTile
									user={user}
									remove={(id: number) => removeUser(id)}
									add={(id: number) => addInactiveUser(id)}
									key={user.id}
									variant="in-lobby"
								/>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Options */}
			<div className="flex justify-between items-center w-full px-8 py-2 border border-black rounded-xl">
				<div className="font-bold text-xl flex items-center gap-2 w-4/12">
					Video Call Grid
					<FaVideo size={30} className="text-blue-500" />
				</div>
				<div className="flex justify-center items-center gap-3 w-4/12">
					<Button className="aspect-square h-10 rounded-xl bg-white/20 text-white p-3">
						<FaVideo size={25} />
					</Button>
					<Button className="aspect-square h-10 rounded-xl bg-white/20 text-white p-3">
						<FaMicrophone size={20} />
					</Button>
					<Button className="aspect-square h-10 rounded-xl bg-white/20 p-3 text-red-500">
						<FaTimes size={30} />
					</Button>
				</div>
				<div className="w-4/12 flex justify-end items-center">
					<Button
						className="h-10 rounded-xl bg-white/20 text-white flex justify-center items-center gap-2 p-3"
						onClick={() => setSidebarOpen(!sidebarOpen)}>
						<FaUser size={20} />
						{activeUsers.length}
					</Button>
				</div>
			</div>
		</main>
	);
}

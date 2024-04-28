"use client";
import { Button } from '@/components/ui/button';
import { useMemo, useRef, useState } from 'react';
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function Home() {
	const { activeUsers, inactiveUsers, addNewUser, removeUser, addInactiveUser } = useUser();
	const [ isAllVideoOn, setIsAllVideoOn ] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
	const [ar, setAr] = useState<"1/1" | "4/3" | "16/9">("16/9");
	const [isDummyVideoOn, setIsDummyVideoOn] = useState<boolean>(true);
	const [isDummyAudioOn, setIsDummyAudioOn] = useState<boolean>(true);
	const videoSpaceRef = useRef<HTMLDivElement>(null);
	const maxCells = useMemo(() => {
		if (!videoSpaceRef.current) return 49;
		const { clientHeight, clientWidth } = videoSpaceRef.current;
		const maxRows = Math.floor(
			clientHeight / (ar === "1/1" ? 160 : ar === "4/3" ? 120 : 90),
		);
		const maxCols = Math.floor(clientWidth / 160);
		return Math.min(maxRows * maxCols, activeUsers.length, 49);
	}, [activeUsers.length, ar]);
	const cols = useMemo(() => Math.ceil(Math.sqrt(maxCells)), [maxCells]);
  return (
		<main className="flex h-screen flex-col items-center p-5 gap-5 overflow-hidden">
			<div className="flex flex-1 w-full items-center transition-all ease-in-out duration-200 overflow-hidden">
				{/* Video Grid */}
				<div
					ref={videoSpaceRef}
					style={{
						maxWidth: sidebarOpen ? "calc(100vw - 35ch)" : "100vw",
						height: "calc(100vh - 6rem)",
						alignContent: "center",
					}}
					className="gap-1 w-full p-5 flex flex-wrap items-center justify-center place-items-center transition-all ease-in-out duration-200 mt-[-0.5rem]">
					{activeUsers.length > 0 ? (
						activeUsers
							.slice(0, 49)
							.map((user: User) => (
								<VideoTile
									cols={cols}
									rows={Math.ceil(maxCells / cols)}
									index={user.id}
									isOn={isAllVideoOn}
									aspectRatio={ar}
									key={user.id}
								/>
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
						width: "35ch",
						marginRight: sidebarOpen ? 0 : "calc(-35ch - 2.5rem)",
						height: "calc(100vh - 6rem)",
					}}
					className="flex flex-col gap-3 w-[35ch] border border-white/20 bg-white/10 drop-shadow-xl rounded-xl p-3 transition-all ease-in-out duration-200 overflow-hidden">
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
						<div className="my-3 flex-1 h-[35vh] overflow-y-scroll">
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
						<div className="my-3 flex-1 h-[30vh] overflow-y-scroll">
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
			<div className="flex justify-between items-center w-full border border-black rounded-xl h-[2rem]">
				<div className="font-bold text-xl flex items-center gap-2 w-4/12">
					Video Call Grid
					<FaVideo size={30} className="text-blue-500" />
				</div>
				<div className="flex justify-center items-center gap-2 w-4/12">
					<Button
						style={{
							color: !isDummyVideoOn ? "#EF4444" : "#FFFFFF",
						}}
						onClick={() => setIsDummyVideoOn(!isDummyVideoOn)}
						className="aspect-square h-10 rounded-lg border border-white/20 text-white p-3 bg-white/0 hover:bg-white/20 transition-all ease-in-out duration-200">
						{isDummyVideoOn ? (
							<FaVideo size={25} />
						) : (
							<FaVideoSlash size={30} />
						)}
					</Button>
					<Button
						style={{
							color: !isDummyAudioOn ? "#EF4444" : "#FFFFFF",
						}}
						onClick={() => setIsDummyAudioOn(!isDummyAudioOn)}
						className="aspect-square h-10 rounded-lg border border-white/20 text-white p-3 bg-white/0 hover:bg-white/20 transition-all ease-in-out duration-200">
						{isDummyAudioOn ? (
							<FaMicrophone size={15} />
						) : (
							<FaMicrophoneSlash size={30} />
						)}
					</Button>
					<Button
						disabled
						className="aspect-square h-10 rounded-lg cursor-wait border border-white/20 p-3 bg-white/0 hover:bg-red-300/20 transition-all ease-in-out duration-200 text-red-500 disabled:opacity-90 disabled:cursor-not-allowed">
						<FaTimes size={30} />
					</Button>
				</div>
				<div className="w-4/12 flex justify-end items-center gap-2">
					<div>
						<ToggleGroup
							type="single"
							className="border border-white/20 rounded-lg"
							value={ar}
							onValueChange={(val: "1/1" | "4/3" | "16/9") => {
								setAr(!!val ? val : "16/9");
								console.log(val, typeof val);
							}}>
							<ToggleGroupItem
								value="1/1"
								aria-label="Toggle 1/1"
								className="hover:bg-white/20 hover:text-white">
								1:1
							</ToggleGroupItem>
							<ToggleGroupItem
								value="4/3"
								aria-label="Toggle 4/3"
								className="hover:bg-white/20 hover:text-white">
								4:3
							</ToggleGroupItem>
							<ToggleGroupItem
								value="16/9"
								aria-label="Toggle 16/9"
								className="hover:bg-white/20 hover:text-white">
								16:9
							</ToggleGroupItem>
						</ToggleGroup>
					</div>
					<Button
						style={{
							backgroundColor: sidebarOpen ? "white" : "transparent",
							color: sidebarOpen ? "black" : "white",
						}}
						className="h-10 rounded-lg text-white flex justify-center border border-white/20 items-center gap-2 p-3 bg-white/0 hover:bg-white/20 transition-all ease-in-out duration-200"
						onClick={() => setSidebarOpen(!sidebarOpen)}>
						<FaUser size={20} />
						{activeUsers.length}
					</Button>
				</div>
			</div>
		</main>
	);
}

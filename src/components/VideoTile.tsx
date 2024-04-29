import { useMemo, useState } from "react";
import Video from "next-video";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { getUniqueUser } from "@/lib/data";

import {
	FaMicrophone,
	FaMicrophoneSlash,
	FaVideo,
	FaVideoSlash,
} from "react-icons/fa";

interface Props {
	index: number;
	rows: number;
	cols: number;
	isOn: boolean;
	aspectRatio: "1/1" | "4/3" | "16/9";
}

const VideoTile = ({ index, rows, cols, isOn, aspectRatio }: Props) => {
	const { firstName, lastName, video, pfp } = useMemo(
		() => getUniqueUser(index),
		[index],
	);
	const [isVideoOn, setIsVideoOn] = useState<boolean>(false);
	const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);
	return (
		<div
			style={{
				width: cols >= rows ? `calc(${100 / cols}% - 12px)` : "auto",
				height: rows > cols ? `calc(${95 / rows}vh - 12px)` : "auto",
				maxHeight: `calc(${90 / rows}vh - 12px)`,
				outline: isVideoMuted ? "none" : "2px solid #81DD6A",
				aspectRatio,
			}}
			className={`flex justify-center items-center relative bg-white/20 border border-white/20 rounded-xl transition-all ease-in-out duration-200 min-w-[15ch]`}>
			{isVideoOn || isOn ? (
				<Video
					src={video}
					loop
					autoPlay
					controls={false}
					muted={isVideoMuted}
				/>
			) : (
				// eslint-disable-next-line @next/next/no-img-element
				<Avatar>
					<AvatarImage src={pfp} alt={firstName} />
					<AvatarFallback>
						{firstName[0]}
						{lastName[0]}
					</AvatarFallback>
				</Avatar>
			)}
			<div className="absolute flex justify-between items-center bg-gradient-to-t from-black/60 to-black/0 p-2 bottom-0 left-0 w-full rounded-b-xl">
				<p className="text-sm font-semibold">
					{firstName} {cols < 5 ? lastName : `${lastName[0]}.`}
				</p>
				<div className="flex justify-center items-center gap-1">
					<Button
						style={{
							color: isVideoOn || isOn ? "#FFFFFF" : "#EF4444",
						}}
						onClick={() => setIsVideoOn((prev) => !prev)}
						className="w-7 h-7 rounded-lg text-white p-1 border border-white/10 bg-transparent">
						{isVideoOn || isOn ? (
							<FaVideo size={25} />
						) : (
							<FaVideoSlash size={25} />
						)}
					</Button>
					{(isVideoOn || isOn) && (
						<Button
							style={{
								color: isVideoMuted ? "#EF4444" : "#FFFFFF",
							}}
							onClick={() => setIsVideoMuted((prev) => !prev)}
							className="w-7 h-7 rounded-lg text-white p-1 border border-white/10 bg-transparent">
							{isVideoMuted ? (
								<FaMicrophoneSlash size={24} />
							) : (
								<FaMicrophone size={20} />
							)}
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default VideoTile;

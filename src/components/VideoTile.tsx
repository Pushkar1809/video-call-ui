import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUniqueUser } from "@/lib/data";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa";

const VideoTile = ({index, cols}: {index: number, cols: number}) => {
  const {firstName, lastName, video, pfp} = useMemo(() => getUniqueUser(index), [index]);
  const [isVideoOn, setIsVideoOn] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);
  return (
		<div
			style={{
				width: `calc(${100 / cols}% - 12px)`,
				borderColor: isVideoMuted ? "rgba(255, 255, 255, 0.2)" : "#81DD6A",
				borderWidth: isVideoMuted ? 1 : 2,
			}}
			className="flex justify-center items-center relative aspect-video bg-white/20 border border-white/20 rounded-xl min-w-[15ch] transition-all ease-in-out duration-200">
			{isVideoOn ? (
				<video autoPlay loop muted={isVideoMuted} className="rounded-xl">
					<source src={video} type="video/mp4" />
				</video>
			) : (
				// eslint-disable-next-line @next/next/no-img-element
				<Avatar>
					<AvatarImage src={pfp} alt={firstName}/>
					<AvatarFallback>{firstName[0]}{lastName[0]}</AvatarFallback>
				</Avatar>
			)}
			<div className="absolute flex justify-between items-center bg-gradient-to-t from-black/60 to-black/0 py-2 px-4 bottom-0 left-0 w-full rounded-b-xl">
				<p className="text-sm font-semibold">
					{firstName} {cols < 5 ? lastName : `${lastName[0]}.`}
				</p>
				<div className="flex justify-center items-center gap-2">
					<Button
						style={{
							backgroundColor: isVideoOn
								? "rgba(255, 255, 255, 0.2)"
								: "#EF4444",
						}}
						onClick={() => setIsVideoOn((prev) => !prev)}
						className="aspect-square h-8 rounded-lg bg-slate-200 text-white p-2 border border-slate-700">
						{isVideoOn ? <FaVideo size={25} /> : <FaVideoSlash size={25} />}
					</Button>
					<Button
						style={{
							backgroundColor: isVideoMuted
								? "#EF4444"
								: "rgba(255, 255, 255, 0.2)",
						}}
						onClick={() => setIsVideoMuted((prev) => !prev)}
						className="aspect-square h-8 rounded-lg bg-white/40 text-white p-2 border border-slate-700">
						{isVideoMuted ? (
							<FaMicrophoneSlash size={24} />
						) : (
							<FaMicrophone size={20} />
						)}
					</Button>
				</div>
			</div>
		</div>
	);};

export default VideoTile;
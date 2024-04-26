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

export default function Home() {
  const [boxes, setBoxes] = useState<number>(1);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const streams = useMemo(() => {
    return Array.apply(null, Array(boxes)).map(function (y, i) {
			return i;
		});
  }, [boxes]);
  const cols = useMemo(() => Math.ceil(Math.sqrt(boxes)), [boxes])
  return (
		<main className="flex h-screen flex-col items-center p-5 gap-5 overflow-hidden">
			<div
				style={{
					maxHeight: "calc(100% - 5rem)",
				}}
				className="flex flex-1 w-full items-center transition-all ease-in-out duration-200">
				{/* Video Grid */}
				<div
					className="gap-3 w-full p-5 flex flex-wrap items-center justify-center transition-all ease-in-out duration-200 mt-[-0.5rem]">
					{streams.map((i) => (
						<div
							key={i}
							style={{ width: `calc(${100 / cols}% - 12px)` }}
							className="block aspect-video bg-slate-500 rounded-xl"
						/>
					))}
				</div>
				{/* sidebar */}
				<div
					style={{
						marginRight: sidebarOpen ? 0 : "calc(-100% - 32px)",
						marginLeft: "20px",
					}}
					className="flex flex-col gap-5 w-[40ch] border border-black bg-slate-100 drop-shadow-xl rounded-xl p-3 transition-all ease-in-out duration-200 h-full">
					<div className="flex justify-between items-center gap-3">
						<button
							className="bg-red-500 text-white text-2xl rounded-xl p-1 w-10 h-10"
							onClick={() => setBoxes((prev) => (prev > 0 ? prev - 1 : prev))}>
							-
						</button>
						<p className="font-mono text-2xl flex items-center gap-1 bg-slate-200 flex-1 p-1 rounded-xl justify-center">
							<FaUser size={20} />
							{boxes}
						</p>
						<button
							className="bg-green-500 text-white text-2xl rounded-xl p-1 w-10 h-10"
							onClick={() =>
								setBoxes((prev) => (prev < 100 ? prev + 1 : prev))
							}>
							+
						</button>
					</div>
				</div>
			</div>

			{/* Bottom Options */}
			<div className="flex justify-between items-center w-full px-8 py-2 border border-black rounded-xl">
				<div>Call Information</div>
				<div className="flex justify-center items-center gap-3">
					<Button className="aspect-square h-10 rounded-xl bg-slate-200 text-black p-3 border border-slate-700">
						<FaVideo size={25} />
					</Button>
					<Button className="aspect-square h-10 rounded-xl bg-red-600 text-white p-3 border border-red-800">
						<FaTimes size={30} />
					</Button>
					<Button className="aspect-square h-10 rounded-xl bg-slate-200 text-black p-3 border border-slate-700">
						<FaMicrophone size={20} />
					</Button>
				</div>
				<Button
					className="h-10 rounded-xl bg-slate-200 text-black flex justify-center items-center gap-2 p-3 border border-slate-700"
					onClick={() => setSidebarOpen(!sidebarOpen)}>
					<FaUser size={20} />
					{boxes}
				</Button>
			</div>
		</main>
	);
}

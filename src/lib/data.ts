import sample1 from "/videos/sample1.mp4";
import sample2 from "/videos/sample2.mp4";
import sample3 from "/videos/sample3.mp4";
import sample4 from "/videos/sample4.mp4";
import sample5 from "/videos/sample5.mp4";

export const getUniqueUser = (index: number) => {
	const data = {
		firstNames: [
			"John",
			"Jane",
			"Alice",
			"Bob",
			"Eve",
			"Charlie",
			"David",
			"Emily",
			"Fiona",
			"George",
			"Hannah",
			"Ivy",
			"Jack",
			"Kate",
			"Liam",
			"Megan",
			"Nathan",
			"Olivia",
			"Peter",
			"Rachel",
			"Sam",
			"Tina",
			"Victor",
			"Wendy",
			"Xander",
			"Yvonne",
			"Zoe",
		],
		lastNames: [
			"Smith",
			"Johnson",
			"Williams",
			"Jones",
			"Brown",
			"Davis",
			"Miller",
			"Wilson",
			"Moore",
			"Taylor",
			"Anderson",
			"Thomas",
			"Jackson",
			"White",
			"Harris",
			"Martin",
			"Thompson",
			"Garcia",
			"Martinez",
			"Robinson",
			"Clark",
			"Rodriguez",
			"Lewis",
			"Lee",
			"Walker",
			"Hall",
			"Allen",
			"Young",
			"Hernandez",
		],
	};
	const sampleVideoStream = [
		sample1,
		sample2,
		sample3,
		sample4,
		sample5
	];

	const firstName = data.firstNames[index % data.firstNames.length];
	const lastName =
		data.lastNames[
			Math.floor(index / data.firstNames.length) % data.lastNames.length
		];
	return {
    id: index,
		firstName,
		lastName,
		video: sampleVideoStream[index % sampleVideoStream.length],
		pfp: `https://source.unsplash.com/200x200/?profile,person,avatar&sig=${index}`,
	};
};

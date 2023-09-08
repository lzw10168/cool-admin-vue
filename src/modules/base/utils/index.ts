export function revisePath(path: string) {
	if (!path) {
		return "";
	}

	return path[0] == "/" ? path : `/${path}`;
}

export function createLink(url: string, id?: string) {
	const link = document.createElement("link");
	link.href = url;
	link.type = "text/css";
	link.rel = "stylesheet";
	if (id) {
		link.id = id;
	}

	setTimeout(() => {
		document.getElementsByTagName("head").item(0)?.appendChild(link);
	}, 0);
}

export const listFormatOptions = (list) => {
	return list.map((item) => {
		return {
			label: item.title,
			value: item.id
		};
	});
};

export const getTimeList = (filter) => {
	const arr = [
		{
			value: "1",
			label: "17:00"
		},
		{
			value: "2",
			label: "17:30"
		},
		{
			value: "3",
			label: "18:00"
		},
		{
			value: "4",
			label: "18:30"
		},
		{
			value: "5",
			label: "19:00"
		},
		{
			value: "6",
			label: "19:30"
		},
		{
			value: "7",
			label: "20:00"
		},
		{
			value: "8",
			label: "20:30"
		}
	];
	if (!filter) {
		return arr;
	}

	// 查询当前时间, 之前的时间不可选
	const now = new Date();
	const hour = now.getHours();
	const minute = now.getMinutes();
	const nowTime = hour * 60 + minute;
	const list = arr.filter((item) => {
		const time = parseInt(item.value);
		return time * 30 + 1020 > nowTime;
	});
	return list;
};

export const TIME_MAP = {
	1: "17:00",
	2: "17:30",
	3: "18:00",
	4: "18:30",
	5: "19:00",
	6: "19:30",
	7: "20:00",
	8: "20:30"
};

export function sleep(time: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(1);
		}, time);
	});
}

<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert"> </cl-upsert>
		<!-- <add-info /> -->
	</cl-crud>
</template>

<script lang="ts" name="reservations-info" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { onActivated, onMounted, reactive } from "vue";
import { getTimeList, listFormatOptions, sleep } from "/$/base/utils";
import { useCool } from "/@/cool";
const statusOptions = [
	{ label: "Reserved", value: 1 },
	{ label: "Completed", value: 2 },
	{ label: "Cancelled", value: -1 }
];

const { service } = useCool();
const userList = reactive<any>({ value: [] });
const restaurant = reactive<any>({ value: [] });
const tableDisabled = reactive<any>({ value: true });
const menuDisabled = reactive<any>({ value: true });

onActivated(async () => {
	userList.value = await getUserList();
	restaurant.value = await getRestaurantList();
});
const getUserList = async () => {
	const data = await service.user.info.list();
	return data.map((user) => {
		return {
			label: user.nickName + "    " + user.email,
			value: user.id
		};
	});
};
const getRestaurantList = async () => {
	const data = await service.restaurant.info.list();
	return listFormatOptions(data);
};
const getTablesStatus = async ({ restaurantId, reservationDate, reservationTime }) => {
	const data = await service.table.info.getTablesStatus({
		restaurantId,
		date: reservationDate,
		time: reservationTime
	});
	return listFormatOptions(data);
};
const getRestaurantMenu = async (restaurantId) => {
	const data = await service.restaurant.info.getRestaurantMenu({ restaurantId });
	return listFormatOptions(data);
};

const handleResChange = (val: any) => {
	setValue("restaurantId", val);
	setValue("menu", []);
	setValue("tableId", "");
	handleChange();
};
const handleDateChange = (val: any) => {
	setValue("reservationDate", val);
	setValue("tableId", "");
	handleChange();
};
const handleTimeChange = (val: any) => {
	setValue("reservationTime", val);
	setValue("tableId", "");
	handleChange();
};
const setValue = (key, val) => {
	Upsert.value?.setForm(key, val);
};
const handleChange = () => {
	const { reservationDate, reservationTime, restaurantId } = Upsert.value?.getForm();
	if (reservationDate && reservationTime && restaurantId) {
		getTablesStatus({ restaurantId, reservationDate, reservationTime }).then((data) => {
			Upsert.value?.setOptions("tableId", data);
			Upsert.value?.setProps("tableId", {
				disabled: false
			});
		});
	} else {
		Upsert.value?.setProps("tableId", {
			disabled: true
		});
	}
	if (restaurantId) {
		getRestaurantMenu(restaurantId).then((data) => {
			Upsert.value?.setOptions("menu", data);
			Upsert.value?.setProps("menu", {
				disabled: false
			});
		});
	} else {
		Upsert.value?.setProps("menu", {
			disabled: true
		});
	}
};
// cl-upsert
const Upsert = useUpsert({
	onSubmit(data, { next, done, close }) {
		data.menu = data.menu && data.menu.join();
		next(data);
	},
	onOpen() {
		Upsert.value?.setOptions("userId", userList.value);
		Upsert.value?.setOptions("restaurantId", restaurant.value);
	},
	onOpened(data) {
		const { menu } = data;
		if (typeof menu === "string" && menu) {
			data.menu = menu.split(",").map((item) => Number(item));
		}

		handleChange();
	},
	items: [
		{
			prop: "status",
			required: true,
			label: "Status",
			component: {
				name: "el-select",
				options: statusOptions
			}
		},
		{
			prop: "userId",
			label: "User",
			required: true,
			component: { name: "el-select", options: [] }
		},
		{
			prop: "restaurantId",
			label: "Restaurant",
			required: true,
			component: {
				name: "el-select",
				options: [],
				props: {
					onChange: handleResChange
				}
			}
		},

		{
			prop: "reservationDate",
			label: "Date",
			required: true,
			component: {
				name: "el-date-picker",
				props: {
					// type: "date",
					valueFormat: "YYYY-MM-DD",
					onChange: handleDateChange,
					disabledDate: (time) => {
						// 只能预约今天,或者之后的
						return time.getTime() < Date.now() - 8.64e7;
					}
				}
			}
		},
		{
			prop: "reservationTime",
			label: "Time",
			required: true,
			component: {
				name: "el-select",
				options: getTimeList(true),
				props: {
					onChange: handleTimeChange
				}
			}
		},
		{
			prop: "tableId",
			label: "Table",
			required: true,
			component: {
				name: "el-select",
				options: [],
				props: {
					disabled: tableDisabled.value,
					placeholder: "Please select Restaurant & Date & Time first"
				}
			}
		},
		{
			prop: "menu",
			label: "Menu",
			component: {
				name: "el-select",
				options: [],
				props: {
					multiple: true,
					placeholder: "Please select Restaurant first",
					disabled: menuDisabled.value
				}
			}
		},
		{
			prop: "numberOfGuests",
			label: "Guests",
			required: true,
			component: { name: "el-input-number", props: { min: 0, max: 15 } }
		},
		// remark
		{
			prop: "remark",
			label: "Remark",
			component: { name: "el-input", props: { type: "textarea" } }
		}
	]
});
// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ prop: "id", label: "ID" },
		{ prop: "userEmail", label: "UserEmail" },
		{ prop: "restaurantTitle", label: "RestaurantTitle" },
		{ prop: "tableTitle", label: "TableTitle" },
		{
			prop: "reservationDate",
			label: "Date",
			component: { name: "cl-date-text", props: { format: "YYYY-MM-DD" } }
		},
		{ prop: "reservationTime", label: "Time", dict: getTimeList(false) },
		{ prop: "numberOfGuests", label: "Guests" },
		{ prop: "remark", label: "Remark" },
		{
			prop: "status",
			label: "Status",
			dict: [
				{
					label: "Reserved",
					value: 1,
					type: "danger"
				},
				{
					label: "Completed",
					value: 2,
					type: "success"
				},
				{
					label: "Cancelled",
					value: 3,
					type: "warning"
				}
			]
		},
		{
			prop: "menu",
			label: "Menu"
		},
		{ prop: "createTime", label: "创建时间", sortable: "desc", width: 160 },
		// { prop: "updateTime", label: "更新时间", sortable: "custom", width: 160 },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.reservations.info
	},
	(app) => {
		app.refresh();
	}
);
</script>

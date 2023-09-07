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
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" name="restaurant-info" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { onMounted, reactive } from "vue";
import { listFormatOptions } from "/$/base/utils";
import { useCool } from "/@/cool";

const { service } = useCool();
const goodList = reactive<any>({ value: [] });
const tableList = reactive<any>({ value: [] });

onMounted(async () => {
	goodList.value = await getGoodList();
	tableList.value = await getAllTableList();
});
const getGoodList = async () => {
	const res = await service.goods.goods.page();
	res.list = listFormatOptions(res.list);
	return res.list;
};
const getAllTableList = async () => {
	const res = await service.table.info.page();
	res.list = listFormatOptions(res.list);
	return res.list;
};

const getCanChoseTableList = async (restaurantId) => {
	const res = await service.table.info.getCanChoseTable({ restaurantId });
	res.list = listFormatOptions(res.list);
	return res.list;
};
const handleOnSubmit = (data, { next, done, close }) => {
	data.openTime = data.openTime && data.openTime.join();
	data.table = data.table && data.table.join();
	data.menu = data.menu && data.menu.join();
	next(data);
};

// cl-upsert
const Upsert = useUpsert({
	onSubmit: handleOnSubmit,
	async onOpened(data) {
		const { openTime, table, menu } = data;
		if (typeof openTime === "string" && openTime) {
			data.openTime = openTime.split(",");
		}
		if (typeof table === "string" && table) {
			data.table = table.split(",");
		}
		if (typeof menu === "string" && menu) {
			data.menu = menu.split(",");
		}
		const canChoseTableList = await getCanChoseTableList(data.id);
		Upsert.value?.setOptions("menu", goodList.value);
		Upsert.value?.setOptions("table", canChoseTableList);
	},
	items: [
		{
			prop: "status",
			label: "Status",
			component: { name: "cl-switch" }
		},
		{ prop: "title", label: "Title", required: true, component: { name: "el-input" } },
		{ prop: "description", required: true, label: "Desc", component: { name: "el-input" } },
		{ prop: "mainImage", required: true, label: "Main", component: { name: "cl-upload" } },
		{
			prop: "exampleImages",
			label: "Sample",
			component: { name: "cl-upload", props: { multiple: true } }
		},
		// {
		// 	prop: "openDay",
		// 	label: "Open Day",
		// 	required: true,
		// 	component: {
		// 		name: "el-select",
		// 		options: [
		// 			{
		// 				value: "1",
		// 				label: "Monday"
		// 			},
		// 			{
		// 				value: "2",
		// 				label: "Tuesday"
		// 			},
		// 			{
		// 				value: "3",
		// 				label: "Wednesday"
		// 			},
		// 			{
		// 				value: "4",
		// 				label: "Thursday"
		// 			},
		// 			{
		// 				value: "5",
		// 				label: "Friday"
		// 			},
		// 			{
		// 				value: "6",
		// 				label: "Saturday"
		// 			},
		// 			{
		// 				value: "7",
		// 				label: "Sunday"
		// 			}
		// 		],
		// 		props: {
		// 			multiple: true
		// 		}
		// 	}
		// },
		{
			prop: "openTime",
			label: "Open Time",
			required: true,
			component: {
				name: "el-select",
				options: [
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
				],
				props: {
					multiple: true
				}
			}
		},
		{ prop: "location", label: "Location", required: true, component: { name: "el-input" } },
		// { prop: "longitude", label: "Longitude", required: true, component: { name: "el-input" } },
		// { prop: "latitude", label: "Latitude", required: true, component: { name: "el-input" } },
		{
			prop: "phone",
			label: "Phone",
			// required: true,
			component: { name: "el-input" },
			rules: {
				required: true
			}
		},
		{
			prop: "averagePrice",
			label: "Average",
			required: true,
			hook: { bind: ["number"] },
			component: { name: "el-input-number", props: { min: 0 } }
		},
		{
			prop: "score",
			required: true,
			label: "Score",
			hook: { bind: ["number"] },
			component: { name: "el-input-number", props: { min: 0, max: 5 } }
		},
		{
			prop: "menu",
			label: "Menu",
			component: {
				name: "el-select",
				options: [],
				props: {
					multiple: true
				}
			}
		},
		{
			prop: "table",
			label: "Table",
			component: {
				name: "el-select",
				options: [],
				props: {
					multiple: true
				}
			}
		}
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ prop: "id", label: "ID" },
		{ prop: "title", label: "Title" },
		{ prop: "description", label: "Desc" },
		{ prop: "mainImage", label: "Main", component: { name: "cl-image", props: { size: 60 } } },
		// {
		// 	prop: "exampleImages",
		// 	label: "Sample",
		// 	component: { name: "cl-image", props: { size: 60 } }
		// },
		{
			prop: "openTime",
			label: "Open Time"
		},
		{ prop: "location", label: "Location" },
		// { prop: "longitude", label: "Longitude" },
		// { prop: "latitude", label: "Latitude" },
		{ prop: "phone", label: "Phone" },
		{ prop: "averagePrice", label: "Average" },
		// { prop: "score", label: "Score" },
		{ prop: "status", label: "Status", component: { name: "cl-switch" } },
		// { prop: "menu", label: "Menu" },
		// { prop: "tables", label: "Tables" },
		{ prop: "createTime", label: "创建时间", sortable: "desc", width: 160 },
		{ prop: "updateTime", label: "更新时间", sortable: "custom", width: 160 },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.restaurant.info
	},
	(app) => {
		app.refresh();
	}
);
</script>

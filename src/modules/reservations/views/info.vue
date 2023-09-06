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

<script lang="ts" name="reservations-info" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert
const Upsert = useUpsert({
	items: [
		{ prop: "userId", label: "UserID", component: { name: "el-input" } },
		{ prop: "restaurantId", label: "RestaurantID", component: { name: "el-input" } },
		{ prop: "tableId", label: "TableID", component: { name: "el-input" } },
		{
			prop: "reservationDate",
			label: "ReservationDate",
			component: {
				name: "el-date-picker",
				props: { type: "date", valueFormat: "YYYY-MM-DD" }
			}
		},
		{
			prop: "reservationTime",
			label: "ReservationTime",
			component: {
				name: "el-date-picker",
				props: { type: "datetime", valueFormat: "YYYY-MM-DD HH:mm:ss" }
			}
		},
		{ prop: "numberOfGuests", label: "NumberOfGuests", component: { name: "el-input" } },
		{ prop: "status", label: "状态", component: { name: "cl-switch" }, required: true }
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ prop: "id", label: "ID" },
		{ prop: "userId", label: "UserID" },
		{ prop: "restaurantId", label: "RestaurantID" },
		{ prop: "tableId", label: "TableID" },
		{
			prop: "reservationDate",
			label: "ReservationDate",
			component: { name: "cl-date-text", props: { format: "YYYY-MM-DD" } }
		},
		{ prop: "reservationTime", label: "ReservationTime" },
		{ prop: "numberOfGuests", label: "NumberOfGuests" },
		{ prop: "status", label: "状态", component: { name: "cl-switch" } },
		{ prop: "createTime", label: "创建时间", sortable: "desc", width: 160 },
		{ prop: "updateTime", label: "更新时间", sortable: "custom", width: 160 },
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

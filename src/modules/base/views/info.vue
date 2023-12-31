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
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert
const Upsert = useUpsert({
	items: [
		{ prop: "title", label: "Title", required: true, component: { name: "el-input" } },
		{ prop: "description", label: "Desc", component: { name: "el-input" } },
		{ prop: "mainImage", label: "Main", component: { name: "cl-upload" } },
		{
			prop: "exampleImages",
			label: "Sample",
			component: { name: "cl-upload", props: { multiple: true } }
		},
		{
			prop: "openTime",
			label: "Open",
			component: {
				name: "el-date-picker",
				props: { type: "datetime", valueFormat: "YYYY-MM-DD HH:mm:ss" }
			}
		},
		{ prop: "location", label: "Location", component: { name: "el-input" } },
		{ prop: "longitude", label: "Longitude", component: { name: "el-input" } },
		{ prop: "latitude", label: "Latitude", component: { name: "el-input" } },
		{ prop: "phone", label: "Phone", component: { name: "el-input" } },
		{
			prop: "averagePrice",
			label: "Average",
			hook: { bind: ["number"] },
			component: { name: "el-input-number", props: { min: 0 } }
		},
		{ prop: "score", label: "Score", component: { name: "el-input" } },
		{ prop: "status", label: "状态", component: { name: "cl-switch" }, required: true },
		{ prop: "menu", label: "Menu", component: { name: "el-input" } },
		{ prop: "tables", label: "Tables", component: { name: "el-input" } }
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
		{
			prop: "exampleImages",
			label: "Sample",
			component: { name: "cl-image", props: { size: 60 } }
		},
		{ prop: "openTime", label: "Open" },
		{ prop: "location", label: "Location" },
		{ prop: "longitude", label: "Longitude" },
		{ prop: "latitude", label: "Latitude" },
		{ prop: "phone", label: "Phone" },
		{ prop: "averagePrice", label: "Average" },
		{ prop: "score", label: "Score" },
		{ prop: "status", label: "状态", component: { name: "cl-switch" } },
		{ prop: "menu", label: "Menu" },
		{ prop: "tables", label: "Tables" },
		{ prop: "createTime", label: "创建时间", sortable: "desc", width: 160 },
		{ prop: "updateTime", label: "更新时间", sortable: "custom", width: 160 },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.base.restaurant.info
	},
	(app) => {
		app.refresh();
	}
);
</script>

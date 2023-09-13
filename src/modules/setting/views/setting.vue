<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- Refresh按钮 -->
			<cl-refresh-btn />
			<!-- Add按钮 -->
			<!-- <cl-add-btn /> -->
			<!-- Delete按钮 -->
			<!-- <cl-multi-delete-btn /> -->
			<cl-flex1 />
			<!-- KeywordSearch -->
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

		<!-- Add、Edit -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" name="setting-setting" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			prop: "silver_level",
			label: "SilverL",
			required: true,
			component: { name: "el-input-number", props: { min: 0 } }
		},
		{
			prop: "golden_level",
			label: "GoldenL",
			required: true,
			component: { name: "el-input-number", props: { min: 0 } }
		},
		{
			prop: "diamond_level",
			label: "DiamondL",
			required: true,
			component: { name: "el-input-number", props: { min: 0 } }
		}
	]
});

// cl-table
const Table = useTable({
	columns: [
		{
			prop: "silver_level",
			label: "SilverLevel"
		},
		{
			prop: "golden_level",
			label: "GoldenLevel"
		},
		{
			prop: "diamond_level",
			label: "DiamondLevel"
		},
		{ type: "op", buttons: ["edit"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.setting.setting
	},
	(app) => {
		app.refresh();
	}
);
</script>

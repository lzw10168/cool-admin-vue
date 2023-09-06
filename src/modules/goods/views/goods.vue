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
			<cl-table ref="Table"> </cl-table>
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 新增、编辑 -->
		<cl-upsert
			:dialog="{
				title: 'Edit'
			}"
			ref="Upsert"
		/>
	</cl-crud>
</template>

<script lang="tsx" name="goods-goods" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { ElButton } from "element-plus";
const { service } = useCool();

// cl-upsert
const Upsert = useUpsert({
	items: [
		{ prop: "title", label: "Title", required: true, component: { name: "el-input" } },
		{
			prop: "price",
			label: "Price",
			hook: { bind: ["number"] },
			component: { name: "el-input-number", props: { min: 0 } },
			required: true
		},
		{ prop: "description", label: "Desc", component: { name: "el-input" } },
		{ prop: "mainImage", label: "Main", component: { name: "cl-upload" } },
		{
			prop: "exampleImages",
			label: "Sample",
			component: { name: "cl-upload", props: { multiple: true } }
		},
		{
			prop: "stock",
			label: "Stock",
			hook: { bind: ["number"] },
			component: { name: "el-input-number", props: { min: 0 } },
			required: true
		},
		{
			prop: "status",
			label: "status",
			component: { name: "cl-switch" },
			required: true
		}
		// {
		// 	prop: "status1",
		// 	label: "status1",
		// 	component: <ElButton>121212</ElButton>,
		// 	required: true
		// }
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ prop: "id", label: "ID" },
		{ prop: "title", label: "Title" },
		{ prop: "price", label: "Price" },
		{ prop: "description", label: "Desc" },
		{ prop: "mainImage", label: "Main", component: { name: "cl-image", props: { size: 60 } } },
		{
			prop: "exampleImages",
			label: "Sample",
			component: { name: "cl-image", props: { size: 60 } }
		},
		{ prop: "stock", label: "Stock" },
		{ prop: "status", label: "状态", component: { name: "cl-switch" } },
		{ prop: "createTime", label: "创建时间", sortable: "desc", width: 160 },
		{ prop: "updateTime", label: "更新时间", sortable: "custom", width: 160 },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.goods.goods
	},
	(app) => {
		app.refresh();
	}
);
</script>

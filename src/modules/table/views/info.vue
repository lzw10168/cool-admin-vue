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

<script lang="ts" name="table-info" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";

const { service } = useCool();

// cl-upsert
const Upsert = useUpsert({
	items: [
		{ prop: "title", label: "Title", required: true, component: { name: "el-input" } },
		{ prop: "description", label: "Desc", component: { name: "el-input" } },
		{
			prop: "capacity",
			label: "Capacity",
			required: true,
			component: { name: "el-input-number", props: { min: 0 } }
		},
		{ prop: "restaurantId", label: "Restaurant", component: { name: "el-input" } }
	]
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ prop: "id", label: "ID" },
		{ prop: "title", label: "Title" },
		{ prop: "description", label: "Desc" },
		{ prop: "capacity", label: "Capacity" },
		{ prop: "restaurantId", label: "Restaurant" },
		{ prop: "createTime", label: "创建时间", sortable: "desc", width: 160 },
		{ prop: "updateTime", label: "更新时间", sortable: "custom", width: 160 },
		{ type: "op", buttons: ["edit", "delete"] }
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.table.info
	},
	(app) => {
		app.refresh();
	}
);
</script>

<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<!-- 新增按钮 -->
			<cl-add-btn>Add</cl-add-btn>
			<!-- 登录方式 -->
			<!-- <cl-filter label="登录方式">
				<cl-select :options="options.loginType" prop="loginType" style="width: 120px" />
			</cl-filter> -->
			<!-- 性别 -->
			<cl-filter label="Gender">
				<cl-select :options="options.gender" prop="gender" style="width: 120px" />
			</cl-filter>
			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key placeholder="Search Email, Nickname, Phone" />
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

<script lang="ts" name="user-list" setup>
import { useCrud, useTable, useUpsert } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { reactive } from "vue";

const { service } = useCool();

// 数据选项
const options = reactive({
	gender: [
		{
			label: "unknown",
			value: 0,
			type: "info"
		},
		{
			label: "Male",
			value: 1,
			type: "success"
		},
		{
			label: "Female",
			value: 2,
			type: "danger"
		}
	],
	status: [
		{
			label: "Enable",
			value: 1
		},
		{
			label: "Disable",
			value: 0
		}
	]
});

// cl-table
const Table = useTable({
	columns: [
		{
			type: "selection",
			width: 60
		},
		{
			label: "Email",
			prop: "email",
			minWidth: 150
		},
		{
			label: "NickName",
			prop: "nickName",
			minWidth: 150
		},
		{
			label: "Avatar",
			prop: "avatarUrl",
			minWidth: 100,
			component: {
				name: "cl-avatar"
			}
		},
		{
			label: "Phone",
			prop: "phone",
			minWidth: 120
		},
		{
			label: "Gender",
			prop: "gender",
			dict: options.gender,
			minWidth: 100
		},
		{
			// 成单量
			label: "OrderCount",
			prop: "orderCount",
			minWidth: 100
		},
		{
			label: "Status",
			prop: "status",
			minWidth: 100,
			component: {
				name: "cl-switch"
			}
		},
		{
			label: "CreateTime",
			prop: "createTime",
			sortable: "desc",
			minWidth: 150
		},
		{
			label: "Op",
			type: "op",
			buttons: ["edit", "delete"]
		}
	]
});

// cl-upsert
const Upsert = useUpsert({
	dialog: {
		width: "600px"
	},
	items: [
		{
			prop: "avatarUrl",
			label: "Avatar",
			component: { name: "cl-upload" }
		},
		{
			prop: "email",
			label: "Email",
			component: { name: "el-input" },
			required: true
		},
		{
			prop: "password",
			label: "Password",
			component: { name: "el-input" },
			required: true
		},
		{
			prop: "nickName",
			label: "NickName",
			component: { name: "el-input" },
			required: true
		},
		{
			prop: "phone",
			label: "Phone",
			component: {
				name: "el-input",
				props: {
					maxlength: 11
				}
			}
		},
		{
			prop: "gender",
			label: "Gender",
			value: 1,
			component: {
				name: "el-radio-group",
				options: options.gender
			}
		},
		{
			prop: "status",
			label: "Status",
			value: 1,
			component: {
				name: "el-radio-group",
				options: options.status
			}
		}
	]
});

// cl-crud
const Crud = useCrud(
	{
		service: service.user.info
	},
	(app) => {
		app.refresh();
	}
);
</script>

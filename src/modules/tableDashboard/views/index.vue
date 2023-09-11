<template>
	<div class="table-dashboard">
		<el-form
			ref="ruleFormRef"
			:inline="true"
			:rules="rules"
			:model="formInline"
			class="demo-form-inline"
		>
			<el-form-item label="Restaurant" prop="restaurantId">
				<el-select v-model="formInline.restaurantId" placeholder="Select Restaurant">
					<el-option
						v-for="item in restaurant.value"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					/>
				</el-select>
			</el-form-item>
			<el-form-item label="Date" prop="date">
				<el-date-picker
					v-model="formInline.date"
					valueFormat="YYYY-MM-DD"
					placeholder="Pick a day"
					:disabledDate="
						(time) => {
							// 只能预约今天,或者之后的
							return time.getTime() < Date.now() - 8.64e7;
						}
					"
				/>
			</el-form-item>
			<el-form-item label="Time" prop="time">
				<el-select v-model="formInline.time" placeholder="Select Time">
					<el-option
						v-for="item in timeList"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					/>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit(ruleFormRef)">Query</el-button>
			</el-form-item>
		</el-form>
		<div class="dashboard-content">
			<!-- <div class="dashboard-content-tit"></div> -->
			<div class="dashboard-content_table" v-if="tableList.value.length">
				<TableItem
					v-for="item in tableList.value"
					:disabled="item.disabled"
					:title="item.title"
					:capacity="item.capacity"
					:key="item.id"
				/>
			</div>
			<el-empty description="No Data - Please click the query button" v-else />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { FormInstance, FormRules } from "element-plus";
import { onActivated, onMounted, reactive, ref } from "vue";
import { getTimeList, listFormatOptions } from "/$/base/utils";
import TableItem from "../TableItem.vue";
import { ElLoading } from "element-plus";
import { useCool } from "/@/cool";
const { service } = useCool();
const restaurant = reactive<any>({ value: [] });
const tableList = reactive<any>({
	value: []
});
const ruleFormRef = ref();
const timeList = getTimeList(false);
const loading = reactive({ value: false });
const formInline = reactive({
	restaurantId: "",
	time: "",
	date: ""
});

onMounted(async () => {
	restaurant.value = await getRestaurantList();
});
onActivated(async () => {
	restaurant.value = await getRestaurantList();
});
const rules = reactive({
	restaurantId: { required: true },
	time: { required: true },
	date: { required: true }
});
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
	return data;
};
const onSubmit = async (formEl: FormInstance | undefined, fields) => {
	if (!formEl) return;
	await formEl.validate((valid) => {
		if (valid) {
			const { restaurantId, date, time } = formInline;
			const loading = ElLoading.service();
			getTablesStatus({ restaurantId, reservationDate: date, reservationTime: time })
				.then((res) => {
					console.log("res: ", res);
					tableList.value = res;
				})
				.finally(() => {
					loading.close();
				});
		} else {
			console.log("error submit!", fields);
		}
	});
};
</script>

<style lang="scss" scoped>
.table-dashboard {
	padding: 12px;
}
.dashboard-content {
	min-height: 400px;
}
.demo-form-inline .el-input {
	--el-input-width: 220px;
}
.dashboard-content_table {
	display: flex;
}
</style>

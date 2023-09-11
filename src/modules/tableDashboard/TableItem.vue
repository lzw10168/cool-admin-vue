<template>
	<div class="table-item">
		<div class="item_bg">
			<img :src="tableBg" alt="" />
		</div>
		<div
			class="header"
			:class="{
				disabled: disabled
			}"
		>
			{{ title }}
		</div>
		<div
			class="footer"
			:class="{
				disabled: disabled
			}"
		>
			{{ disabled ? "被预约" : "可预约" }}
		</div>
		<div class="center">G-{{ capacity }}</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import tableBg from "./tableIcon.jpg";
export default defineComponent({
	props: {
		disabled: Boolean,
		title: String,
		capacity: Number
	},
	setup() {
		return {
			tableBg
		};
	}
});
</script>

<style scoped lang="scss">
.table-item {
	position: relative;
	padding: 12px;
	border-radius: 8px;
	width: 120px;
	height: 120px;
	border: 2px solid #325dcc;
	background-color: #fff;
	overflow: hidden;
	margin: 0 12px 12px 0;
	.item_bg {
		width: 100%;
		height: 100%;
		border-radius: 8px;
		padding: 6px;
		border: 1px dashed #f3f3f3;
		box-sizing: border-box;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.center {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-weight: bold;
		font-size: 14px;
		color: #000;
	}
	.header {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 12px;
		color: #fff;
		background-color: rgba(50, 93, 204, 0.9);
	}
	.footer {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 12px;
		color: #fff;
		background-color: rgba(50, 93, 204, 0.9);
	}
	.disabled {
		background-color: rgba(235, 235, 235, 0.9);
		color: #666;
	}
}
</style>

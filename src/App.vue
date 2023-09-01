<template>
	<el-config-provider :locale="En">
		<router-view />
	</el-config-provider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from "element-plus";
import En from "element-plus/lib/locale/lang/en";
</script>

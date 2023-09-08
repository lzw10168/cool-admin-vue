import { Plugin } from "vite";
/* @ts-ignore */
import path from "path";
/* @ts-ignore */
import fs from "fs";

const translateMap = {
	新增: "Add",
	删除: "Delete",
	编辑: "Edit",
	查询: "Query",
	请填写: "Please enter",
	操作: "Op",
	搜索: "Search",
	刷新: "Refresh",
	关键字: "Keyword",
	后退: "Back",
	首页: "Home",
	更新时间: "Update Time",
	创建时间: "Create Time",
	状态: "Status",
	不能为空: "-Can not be empty ",
	选择图片: "Select Image ",
	请选择: "Please Select ",
	暂无数据: "No Data "
};

function TranslatePlugin(): Plugin {
	return {
		name: "vite:translate",
		transform(code, id, opt) {
			for (const key in translateMap) {
				code = code.replace(new RegExp(key, "g"), translateMap[key]);
			}
			return code;
		}
	};
}
export default TranslatePlugin;

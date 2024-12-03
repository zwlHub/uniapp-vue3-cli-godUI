import {
	createSSRApp
} from "vue";
import App from "./App.vue";
// 解决控制台警告信息。源于chrome被动监听器
import 'default-passive-events'
import pinia from './store/index.js'
import uviewPlus from 'uview-plus'
import "./static/iconfont.css";
import './api/mock.js'
import 'uno.css'
export function createApp() {
	const app = createSSRApp(App);
	app.use(uviewPlus)
	app.use(pinia)
	return {
		app,
		pinia
	};
}

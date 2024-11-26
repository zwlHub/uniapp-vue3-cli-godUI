import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import pinia from './store/index.js'
import uviewPlus from 'uview-plus'
import "./static/iconfont.css";
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

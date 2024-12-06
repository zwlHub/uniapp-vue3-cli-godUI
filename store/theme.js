import {defineStore} from "pinia";
import themes from "@/common/theme/theme.js";
// 第一个参数是应用程序中 store 的唯一 id
export const useThemeStore = defineStore("theme", {
    state: () => {
        return {
            theme: 'light',
            themeColor: themes['light'].themeColor, // 主题颜色
            btnBgColor: themes['light'].btnBgColor, //按钮背景颜色
            btnTextColor: themes['light'].btnTextColor, // 按钮字体颜色
            pageColor: themes['light'].pageColor, // 背景颜色
            tabBar: themes['light'].tabBar,
            navBar: themes['light'].navBar,
            tabBarColor: themes['light'].tabBarColor, //自定义tabbar颜色
            tabBarSelectedColor: themes['light'].tabBarSelectedColor,
            navBarBgColor: themes['light'].navBarBgColor, //自定义导航栏背景
            navBarTextColor: themes['light'].navBarTextColor, //自定义导航栏字体颜色
        };
    },
    actions: {
        setTheme(theme) {
            this.theme = theme;
            this.themeColor = themes[theme].themeColor
            this.btnBgColor = themes[theme].btnBgColor
            this.btnTextColor = themes[theme].btnTextColor
            this.pageColor = themes[theme].pageColor
            this.tabBar = themes[theme].tabBar
            this.navBar = themes[theme].navBar
            this.tabBarColor =  themes[theme].tabBarColor
            this.tabBarSelectedColor = themes[theme].tabBarSelectedColor
            this.navBarBgColor = themes[theme].navBarBgColor
            this.navBarTextColor = themes[theme].navBarTextColor
        },
        // 设置tabBar和navBar 设置原生导航和tabbar主题
        setNavigationBarColorHandler() {
            uni.setNavigationBarColor(this.navBar)
            const tabBarPages = ['pages/home/home', 'pages/extend/extend', 'pages/template/template' ] //  TabBar 页面路径
            // 判断当前页面是否是 TabBar 页面
            const currentPages = getCurrentPages()
            const currentPage = currentPages[currentPages.length - 1]
            if (tabBarPages.includes(currentPage.route)) {
                uni.setTabBarStyle(this.tabBar)
            }

        }
    },
    persist: true
});

// 定义导航栏 与 tabbar 主题色
const themes = {
    light:{
        navBar:{
            frontColor: '#000',
            backgroundColor: '#FFF',
            animation: {
                duration: 0,
                timingFunc: 'easeIn'
            }
        },
        tabBar:{
            backgroundColor:'#FFF',
            color:'#000',
            selectedColor:'#4A88FB',
            borderStyle:'white'
        },
        themeColor: '#FFF', // 主题颜色
        btnBgColor: '#f8f8f8', //按钮背景颜色
        btnTextColor: '#000', // 按钮字体颜色
        pageColor: '#FFF', // 背景颜色
        tabBarColor: '#000', //自定义tabbar颜色
        tabBarSelectedColor: '#4A88FB',//自定义tabbar选中颜色
        navBarBgColor: '#FFF', //自定义导航栏背景
        navBarTextColor: '#000', //自定义导航栏字体颜色
    },
    dark:{
        navBar:{
            frontColor:"#FFF",
            backgroundColor:'#000',
            animation: {
                duration: 0,
                timingFunc: 'easeIn'
            }
        },
        tabBar:{
            backgroundColor:'#000',
            color:'#FFF',
            selectedColor:'#4A88FB',
            borderStyle:'black'
        },
        themeColor: '#000',
        btnBgColor: '#FFF', //按钮背景颜色
        btnTextColor: '#000', // 按钮字体颜色
        pageColor: '#000', // 背景颜色
        tabBarColor: '#FFF', //自定义tabbar颜色
        tabBarSelectedColor: '#4A88FB',//自定义tabbar选中颜色
        navBarBgColor: '#000', //自定义导航栏背景
        navBarTextColor: '#FFF', //自定义导航栏字体颜色
    },
    blue:{
        navBar:{
            frontColor: '#000',
            backgroundColor: 'rgba(0,0,0,0)',
            animation: {
                duration: 0,
                timingFunc: 'easeIn'
            }
        },
        tabBar:{
            backgroundColor:'#FFF',
            color:'#333',
            selectedColor:'#4A88FB',
            borderStyle:'white'
        },
        themeColor: '#6C9CFF', // 主题颜色
        btnBgColor: 'linear-gradient( 105deg, #6C9CFF 0%, #3273FF 100%)', //按钮背景颜色
        btnTextColor: '#FFF', // 按钮字体颜色
        pageColor: '#F7F9FF', // 背景颜色
        tabBarColor: '#333', //自定义tabbar颜色
        tabBarSelectedColor: '#4A88FB',//自定义tabbar选中颜色
        navBarBgColor: 'rgba(0,0,0,0)', //自定义导航栏背景
        navBarTextColor: '#000', //自定义导航栏字体颜色
    },
    red:{
        navBar:{
            frontColor: '#000',
            backgroundColor: 'rgba(0,0,0,0)',
            animation: {
                duration: 0,
                timingFunc: 'easeIn'
            }
        },
        tabBar:{
            backgroundColor:'#FFF',
            color:'#333',
            selectedColor:'#FA2121',
            borderStyle:'white'
        },
        themeColor: '#FA2121', // 主题颜色
        btnBgColor: 'linear-gradient( 105deg, #FC6465 0%, #E80A0A 100%)', //按钮背景颜色
        btnTextColor: '#FFF', // 按钮字体颜色
        pageColor: '#FCF9F9', // 背景颜色
        tabBarColor: '#333', //自定义tabbar颜色
        tabBarSelectedColor: '#FA2121',//自定义tabbar选中颜色
        navBarBgColor: 'rgba(0,0,0,0)', //自定义导航栏背景
        navBarTextColor: '#000', //自定义导航栏字体颜色
    }
}
export default themes; 
<!--  -->
<template>
    <!-- 页面容器布局 -->
    <el-container class="home-container">
        <!-- 页面头部 -->
        <el-header>
            <div>
                <!-- 头像 -->
                <img
                    src="../assets/logo.png"
                    style="width: 50px; height: 50px"
                />
                <span>黑马商城后台管理系统</span>
            </div>
            <!-- 退出登录按钮 -->
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <!-- 页面侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <!-- 折叠标志 -->
                <div class="menu_collapse" @click="isCollapse = !isCollapse">|||</div>
                <!-- 菜单导航 -->
                <el-menu
                    class="el-menu-vertical-demo"
                    unique-opened
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#333744"
                    text-color="#fff"
                    active-text-color="#409EFF"
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    router
                    :default-active="this.$route.path"
                >
                    <!-- 一级菜单 
                        开启路由模式，会将index作为访问路径
                        menuList中的项，它的path值，并不是以 / 开头的
                    -->
                    <el-submenu :index="'/' + menu1.path" v-for="menu1 in menuList" :key="menu1.id">
                        <!-- 一级菜单模板区 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="menuIconDict[menu1.id]"></i>
                            <!-- 文本 -->
                            <span>{{menu1.authName}}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/' + menu2.path" v-for="menu2 in menu1.children" :key="menu2.id">
                            <!-- 图标 -->
                            <i class="el-icon-menu"></i>
                            <!-- 文本 -->
                            <span>{{menu2.authName}}</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 页面主体区域 -->
            <el-main>
               <!-- Main -->
               <!-- 路由占位符 -->
               <router-view></router-view> 
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            /* 左侧菜单列表 */
            menuList: [],
            /* 一级菜单对应的图标，不想改数据库，反正只有五个一级菜单，写死 */
            menuIconDict: {
                '125': 'iconfont icon-yonghuguanli',
                '103': 'iconfont icon-quanxianguanli',
                '101': 'iconfont icon-shangpinguanli',
                '102': 'iconfont icon-dingdanguanli',
                '145': 'iconfont icon-shujutongji',
            },
            /* 是否折叠左侧菜单 */
            isCollapse: false
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        /* 退出登录按钮点击事件 */
        logout() {
            /* 清空jwt令牌 */
            window.sessionStorage.clear();
            /* 重新跳转到登录页面 */
            this.$router.push("/login");
        },
        /* 获取所有菜单 */
        async getMenuList() {
            const {data:res} = await this.$http.get('/menus');
            console.log(res)
            if (res.meta.status != "200") {
                return this.$message.error(res.meta.msg)
            } else {
                this.menuList = res.data
            }
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        /* 获取菜单列表 */
        this.getMenuList()
    },
};
</script>
<style lang='less' scoped>
/* @import url(); 引入公共css类 */

.home-container {
    height: 100%;
}
/* 侧边栏背景 */
.el-aside {
    background-color: #333744;
    /* 去除原有边框，二级菜单比有边界线突出 */
    .el-menu {
        border-right: none;
    }
}
/* 标题栏样式 */
.el-header {
    background-color: #24242c;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;
    color: white;
    font-size: 20px;
    > div {
        display: flex;
        align-items: center;
        span {
            margin-left: 15px;
        }
    }
}
/* 主体区域背景 */
.el-main {
    background-color: #eaedf1;
}
/* 图标和文字间距 */
.iconfont {
    margin-right: 10px;
}
/* 菜单折叠标志的样式 */
.menu_collapse {
    background-color: #4a5064;
    text-align: center;
    letter-spacing: 0.2em;
    font-size: 10px;
    line-height: 24px;
    color: #eeee;
    cursor: pointer;
}
</style>
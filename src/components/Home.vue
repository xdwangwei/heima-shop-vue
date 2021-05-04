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
            <el-aside width="200px">Aside</el-aside>
            <!-- 页面主体区域 -->
            <el-main>Main</el-main>
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
        return {};
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
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
/* @import url(); 引入公共css类 */

.home-container {
    height: 100%;
}

.el-aside {
    background-color: #333744;
}

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

.el-main {
    background-color: #eaedf1;
}
</style>
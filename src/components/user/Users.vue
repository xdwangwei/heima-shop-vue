<!--  -->
<template>
    <div class="">
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 用户列表操作 -->
        <!-- 卡片视图 -->
        <el-card class="box-card">
            <!-- 搜索和新增 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容">
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">新增</el-button>
                </el-col>
            </el-row>

            <!-- 表格 -->
            <el-table :data="userList" stripe style="width: 100%" border>
                <!-- 索引列 -->
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="username" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
                <el-table-column prop="roleName" label="角色"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.mg_state"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="roleName" label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="编辑用户信息"
                            placement="top"
                            :enterable="false"
                        >
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                            ></el-button>
                        </el-tooltip>
                        <!-- 删除按钮 -->
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="删除当前用户"
                            placement="top"
                            :enterable="false"
                        >
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                            ></el-button>
                        </el-tooltip>
                        <!-- 分配权限按钮 -->
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="用户角色分配"
                            :enterable="false"
                            placement="top"
                        >
                            <el-button
                                type="warning"
                                icon="el-icon-setting"
                                size="mini"
                            ></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
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
            /* 用户列表 */
            userList: [],
            /* 获取列表时的参数 */
            queryInfo: {
                query: "",
                pagenum: 1,
                pagesize: 4,
            },
            /* 总记录数 */
            total: 0,
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        /* 获取用户列表 */
        async getUserList() {
            const { data: res } = await this.$http.get("/users", {
                params: this.queryInfo,
            });
            console.log(res);
            if (res.meta.status != "200") {
                return this.$message.error(res.meta.msg);
            } else {
                this.userList = res.data.users;
                this.total = res.data.total;
            }
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        /* 获取用户列表 */
        this.getUserList();
    },
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
</style>
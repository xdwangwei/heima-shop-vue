<!--  -->
<template>
    <div class="">
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 权限列表操作 -->
        <!-- 卡片视图 -->
        <el-card class="box-card">

            <!-- 表格 -->
            <el-table :data="rightsList" stripe style="width: 100%" border>
                <!-- 索引列 -->
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="authName" label="权限名称" width="180">
                </el-table-column>
                <el-table-column prop="path" label="路径"></el-table-column>
                <el-table-column label="权限等级" prop="level">
                    <template slot-scope="scope">
                        <el-tag  type="primary" v-if="scope.row.level == 0">一级</el-tag>
                        <el-tag type="success" v-else-if="scope.row.level == 1">二级</el-tag>
                        <el-tag type="warning" v-else-if="scope.row.level == 2">三级</el-tag>
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
            /* 权限列表 */
            rightsList: [],
        };
    },
    //方法集合
    methods: {
        /* 获取权限列表 */
        async getRightsList() {
            const { data: res } = await this.$http.get("/rights/list");
            console.log(res);
            if (res.meta.status != "200") {
                return this.$message.error(res.meta.msg);
            } else {
                /* 权限列表数据 */
                this.rightsList = res.data;
            }
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        /* 获取权限列表 */
        this.getRightsList();
    },
};
</script>
<style lang='less' scoped>
/* @import url(); 引入公共css类 */
</style>
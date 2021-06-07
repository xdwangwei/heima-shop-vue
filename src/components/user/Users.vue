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
                    <el-input
                        placeholder="请输入内容"
                        v-model="queryInfo.query"
                        clearable
                        @clear="getUserList"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="getUserListByKeyword"
                        ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button
                        type="primary"
                        @click="addUserDialogVisible = true"
                        >新增</el-button
                    >
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
                            @change="changeUserState(scope.row)"
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
                                @click="editUserInfo(scope.row.id)"
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
                                @click="deleteUser(scope.row.id)"
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
            <!-- 分页导航 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[4, 10, 20, 50]"
                :page-size="4"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </el-card>
        <!-- 添加用户对话框 -->
        <el-dialog
            title="增加用户"
            :visible.sync="addUserDialogVisible"
            width="50%"
            :close-on-click-modal="false"
            @closed="handleAddFormClose"
        >
            <el-form
                :model="addUserForm"
                :rules="userFormRules"
                ref="addUserFormRef"
                label-width="100px"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addUserForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="addUserForm.password"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addUserForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="addUserForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addUserDialogVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 用户编辑对话框 -->
        <el-dialog
            title="修改用户信息"
            :visible.sync="editUserDialogVisible"
            width="50%"
            :close-on-click-modal="false"
            @closed="handleEditFormClose"
        >
            <el-form
                :model="editUserForm"
                :rules="userFormRules"
                ref="editUserFormRef"
                label-width="100px"
            >
                <el-form-item label="用户名">
                    <el-input
                        v-model="editUserForm.username"
                        disabled
                    ></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editUserForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="editUserForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editUserDialogVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="editUserSubmit"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        /* 自定义校验规则 */
        var checkEmail = (rule, val, callback) => {
            const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (regEmail.test(val)) {
                callback();
            } else {
                callback(new Error("请输入合法邮箱！"));
            }
        };
        var checkMobile = (rule, val, callback) => {
            const regMobile = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
            if (regMobile.test(val)) {
                callback();
            } else {
                callback(new Error("请输入合法手机号码！"));
            }
        };
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
            /* 控制添加用户对话框显示与隐藏 */
            addUserDialogVisible: false,
            /* 控制修改用户对话框显示与隐藏 */
            editUserDialogVisible: false,
            /* 添加用户表单的数据绑定 */
            addUserForm: {
                username: "",
                password: "",
                email: "",
                mobile: "",
            },
            /* 修改用户信息的表单数据绑定 */
            editUserForm: {
                id: -1,
                username: "",
                email: "",
                mobile: "",
            },
            /* 用户信息表单校验规则 */
            userFormRules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                    {
                        min: 4,
                        max: 10,
                        message: "长度在 4 到 10 个字符",
                        trigger: "blur",
                    },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 6,
                        max: 16,
                        message: "长度在 6 到 16 个字符",
                        trigger: "blur",
                    },
                ],
                email: [
                    { required: true, message: "请输入邮箱", trigger: "blur" },
                    { validator: checkEmail, trigger: "blur" },
                ],
                mobile: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur",
                    },
                    { validator: checkMobile, trigger: "blur" },
                ],
            },
        };
    },
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
                /* 用户列表数据 */
                this.userList = res.data.users;
                /* 总记录数 */
                this.total = res.data.total;
            }
        },
        /* 改变页面记录数 */
        handleSizeChange(newSize) {
            this.queryInfo.pagenum = 1;
            this.queryInfo.pagesize = newSize;
            /* 重新获取数据 */
            this.getUserList();
        },
        /* 选择去xx页,或点击新页码 */
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage;
            this.getUserList();
        },
        /* 关键词查询 */
        getUserListByKeyword() {
            this.queryInfo.pagenum = 1;
            this.getUserList();
        },
        /* 改变用户启用状态 */
        async changeUserState(user) {
            const { data: res } = await this.$http.put(
                `/users/${user.id}/state/${user.mg_state}`
            );
            if (res.meta.status !== "200") {
                user.mg_state = !user.mg_state;
                return this.$message.error("更新用户状态失败！");
            }
            this.$message.success("更新用户状态成功！");
        },
        /* 添加用户对话框关闭时，重置表单 */
        handleAddFormClose() {
            this.$refs.addUserFormRef.resetFields();
        },
        /* 添加用户 */
        addUser() {
            this.$refs.addUserFormRef.validate(async (valid) => {
                console.log(valid);
                if (!valid) return;
                /* 发送请求 */
                /* 从返回值(Promise)中结构出data字段值，重命名为res */
                let { data: res } = await this.$http.post(
                    "/users",
                    this.$qs.stringify(this.addUserForm)
                );
                if (res.meta.status !== "201") {
                    return this.$message.error(res.meta.msg);
                }
                /* 添加成功 */
                this.$message.success("添加新用户成功");
                // 隐藏对话框
                this.addUserDialogVisible = false;
                /* 重新获取用户列表 */
                this.getUserList();
            });
        },
        /* 删除某个用户 */
        deleteUser(id) {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async () => {
                    /* 从返回值(Promise)中结构出data字段值，重命名为res */
                    const { data: res } = await this.$http.delete("/users/" + id);
                    if (res.meta.status !== "200") {
                        return this.$message.error(res.meta.msg);
                    }
                    /* 重新获取用户列表 */
                    this.getUserList();
                    /* 删除成功 */
                    this.$message.success("删除用户成功");
                }).catch(() => {
                    this.$message.info('已取消删除');          
                });
        },
        /* 点击修改用户信息图标 */
        async editUserInfo(id) {
            const { data: res } = await this.$http.get("/users/" + id);
            if (res.meta.status != "200") {
                return this.$message.error("获取用户信息失败");
            }
            this.editUserForm = res.data;
            /* 显示修改对话框 */
            this.editUserDialogVisible = true;
        },
        /* 修改用户对话框关闭时，重置表单 */
        handleEditFormClose() {
            this.$refs.editUserFormRef.resetFields();
        },
        /* 用户信息修改对话框提交 */
        editUserSubmit() {
            console.log(this.editUserForm);
            this.$refs.editUserFormRef.validate(async (valid) => {
                console.log(valid);
                if (!valid) return;
                /* 发送请求 */
                /* 从返回值(Promise)中结构出data字段值，重命名为res */
                let { data: res } = await this.$http.put(
                    "/users/" + this.editUserForm.id,
                    this.$qs.stringify({
                        email: this.editUserForm.email,
                        mobile: this.editUserForm.mobile,
                    })
                );
                if (res.meta.status !== "200") {
                    return this.$message.error(res.meta.msg);
                }
                // 隐藏对话框
                this.editUserDialogVisible = false;
                /* 重新获取用户列表 */
                this.getUserList();
                /* 修改成功 */
                this.$message.success("修改用户信息成功！");
            });
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
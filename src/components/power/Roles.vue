<!--  -->
<template>
    <div class="">
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 角色列表操作 -->
        <!-- 卡片视图 -->
        <el-card class="box-card">
            <!-- 新增 -->
            <el-button type="primary" @click="addRoleDialogVisible = true">
                新增
            </el-button>

            <!-- 表格 -->
            <el-table :data="rolesList" stripe style="width: 100%" border>
                <!-- 索引列 -->
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="roleName" label="角色名称" width="180">
                </el-table-column>
                <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 编辑按钮 -->
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="编辑角色信息"
                            placement="top"
                            :enterable="false"
                        >
                            <el-button
                                type="primary"
                                icon="el-icon-edit"
                                size="mini"
                                @click="editRoleInfo(scope.row.roleId)"
                            ></el-button>
                        </el-tooltip>
                        <!-- 删除按钮 -->
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="删除当前角色"
                            placement="top"
                            :enterable="false"
                        >
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                size="mini"
                                @click="deleteRole(scope.row.roleId)"
                            ></el-button>
                        </el-tooltip>
                        <!-- 分配权限按钮 -->
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="角色权限分配"
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
        <!-- 添加角色对话框 -->
        <el-dialog
            title="增加角色"
            :visible.sync="addRoleDialogVisible"
            width="50%"
            :close-on-click-modal="false"
            @closed="handleAddFormClose"
        >
            <el-form
                :model="addRoleForm"
                :rules="roleFormRules"
                ref="addRoleFormRef"
                label-width="100px"
            >
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addRoleForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="addRoleForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addRoleDialogVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="addRole">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 用户编辑对话框 -->
        <el-dialog
            title="修改角色信息"
            :visible.sync="editRoleDialogVisible"
            width="50%"
            :close-on-click-modal="false"
            @closed="handleEditFormClose"
        >
            <el-form
                :model="editRoleForm"
                :rules="roleFormRules"
                ref="editRoleFormRef"
                label-width="100px"
            >
                <el-form-item label="角色名称">
                    <el-input
                        v-model="editRoleForm.roleName"
                        disabled
                    ></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="editRoleForm.roleDesc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editRoleDialogVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="editRoleSubmit"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            /* 角色列表 */
            rolesList: [],

            /* 控制添加角色对话框显示与隐藏 */
            addRoleDialogVisible: false,
            /* 控制修改角色对话框显示与隐藏 */
            editRoleDialogVisible: false,
            /* 添加角色表单的数据绑定 */
            addRoleForm: {
                roleName: "",
                roleDesc: ""
            },
            /* 修改角色信息的表单数据绑定 */
            editRoleForm: {
                roleId: -1,
                roleName: "",
                roleDesc: ""
            },
            /* 角色信息表单校验规则 */
            roleFormRules: {
                roleName: [
                    {
                        required: true,
                        message: "请输入角色名称",
                        trigger: "blur",
                    }
                ],
                roleDesc: [
                    { required: true, message: "请输入角色描述", trigger: "blur" }
                ],
            },
        };
    },
    //方法集合
    methods: {
        /* 获取角色列表 */
        async getRolesList() {
            const { data: res } = await this.$http.get("/roles");
            console.log(res);
            if (res.meta.status != "200") {
                return this.$message.error(res.meta.msg);
            } else {
                /* 角色列表数据 */
                this.rolesList = res.data;
            }
        },
        /* 添加角色对话框关闭时，重置表单 */
        handleAddFormClose() {
            this.$refs.addRoleFormRef.resetFields();
        },
        /* 添加角色 */
        addRole() {
            this.$refs.addRoleFormRef.validate(async (valid) => {
                console.log(valid);
                if (!valid) return;
                /* 发送请求 */
                /* 从返回值(Promise)中结构出data字段值，重命名为res */
                let { data: res } = await this.$http.post(
                    "/roles",
                    this.$qs.stringify(this.addRoleForm)
                );
                if (res.meta.status !== "201") {
                    return this.$message.error(res.meta.msg);
                }
                /* 添加成功 */
                this.$message.success("添加新角色成功");
                // 隐藏对话框
                this.addRoleDialogVisible = false;
                /* 重新获取用户列表 */
                this.getRolesList();
            });
        },
        /* 删除某个角色 */
        deleteRole(id) {
            this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    /* 从返回值(Promise)中结构出data字段值，重命名为res */
                    const { data: res } = await this.$http.delete(
                        "/roles/" + id
                    );
                    if (res.meta.status !== "200") {
                        return this.$message.error(res.meta.msg);
                    }
                    /* 重新获取用户列表 */
                    this.getRolesList();
                    /* 删除成功 */
                    this.$message.success("删除角色成功");
                })
                .catch(() => {
                    this.$message.info("已取消删除");
                });
        },
        /* 点击修改角色信息图标 */
        async editRoleInfo(id) {
            const { data: res } = await this.$http.get("/roles/" + id);
            if (res.meta.status != "200") {
                return this.$message.error("获取角色信息失败");
            }
            this.editRoleForm = res.data;
            /* 显示修改对话框 */
            this.editRoleDialogVisible = true;
        },
        /* 修改角色对话框关闭时，重置表单 */
        handleEditFormClose() {
            this.$refs.editRoleFormRef.resetFields();
        },
        /* 角色信息修改对话框提交 */
        editRolesSubmit() {
            console.log(this.roleFormRules);
            this.$refs.roleFormRulesRef.validate(async (valid) => {
                console.log(valid);
                if (!valid) return;
                /* 发送请求 */
                /* 从返回值(Promise)中结构出data字段值，重命名为res */
                let { data: res } = await this.$http.put(
                    "/roles/" + this.editRoleForm.id,
                    this.$qs.stringify({
                        email: this.roleFormRules.email,
                        mobile: this.roleFormRules.mobile,
                    })
                );
                if (res.meta.status !== "200") {
                    return this.$message.error(res.meta.msg);
                }
                // 隐藏对话框
                this.editRoleDialogVisible = false;
                /* 重新获取用户列表 */
                this.getRolesList();
                /* 修改成功 */
                this.$message.success("修改角色信息成功！");
            });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        /* 获取权限列表 */
        this.getRolesList();
    }
};
</script>
<style lang='less' scoped>
/* @import url(); 引入公共css类 */
</style>
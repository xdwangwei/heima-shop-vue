<!--  -->
<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="" />
            </div>
            <!-- 登录表单区域 -->
            <el-form
                :model="loginForm"
                :rules="rules"
                ref="loginFormRef"
                label-width="0px"
                class="login_form"
            >
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input
                        v-model="loginForm.username"
                        prefix-icon="iconfont icon-yonghu"
                    ></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input
                        v-model="loginForm.password"
                        prefix-icon="iconfont icon-suo"
                        type="password"
                    ></el-input>
                </el-form-item>
                <!-- 登录和重置 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="submitForm"
                        >登录</el-button
                    >
                    <el-button type="info" @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
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
            loginForm: {
                username: "admin",
                password: "123456",
            },
            rules: {
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
            },
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        /* 提交登录请求 */
        submitForm() {
            this.$refs.loginFormRef.validate(async (valid) => {
                /* 表单校验失败 */
                if (!valid) {
                    console.log("error submit!!");
                    return false;
                } else {
                    /* 从返回值(Promise)中结构出data字段值，重命名为res */
                    let { data: res } = await this.$http.post(
                        "/login",
                        this.$qs.stringify(this.loginForm)
                    );
                    if (res.meta.status != "200") {
                        return this.$message.error(res.meta.msg);
                    }
                    /* 登录成功 */
                    this.$message.success("登录成功");
                    /* 保存服务端返回的jwt令牌 */
                    window.sessionStorage.setItem("token", res.data.token);
                    /* 跳转到主页 */
                    this.$router.push("/home");
                }
            });
        },
        /* 重置表单 */
        resetForm() {
            this.$refs.loginFormRef.resetFields();
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
/* @import url(); 引入公共css类 */
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}
.login_box {
    width: 450px;
    height: 300px;
    background-color: #ffff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    /* 头像区域 */
    .avatar_box {
        width: 130px;
        height: 130px;
        border: 1px solid #eeee;
        border-radius: 50%;
        background-color: #ffff;
        box-shadow: 0 0 10px #eeee;
        padding: 10px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eeee;
        }
    }
}
/* 登录和重置按钮 */
.btns {
    display: flex;
    justify-content: flex-end;
}
/* 登录表单位置 */
.login_form {
    position: absolute;
    width: 100%;
    padding: 0 20px;
    bottom: 0;
    box-sizing: border-box;
}
</style>
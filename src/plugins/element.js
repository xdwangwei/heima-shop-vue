import Vue from 'vue'
import { 
    Button, 
    Input, 
    Form, 
    FormItem, 
    Message, 
    Container, 
    Header, 
    Aside, 
    Main, 
    Menu, MenuItem, Submenu, 
    Breadcrumb, BreadcrumbItem,
    Table, TableColumn,
    Card,
    Row, Col,
    Switch,
    Tooltip,
    Pagination,
    Dialog,
    MessageBox } from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

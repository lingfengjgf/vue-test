// 1.注册svg-icon组件
import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon';

Vue.component('svg-icon',SvgIcon);

// 2.自动加载svg目录下所有图标
const req = require.context('./svg', false, /\.svg$/);

req.keys().map(req);
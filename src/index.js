import { initMixin } from './core/init';
function Vue(options) {
    this._init(options); // new Vue({}) 将new里的配置直接传入_init
}
// 在Vue添加原型方法 _init
initMixin(Vue);

export default Vue
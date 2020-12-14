import { initState } from "./state";

// 将当前实例传入 进行方法扩展 插件写法
export function initMixin(Vue){
    Vue.prototype._init = function(options){
        const vm = this; // vm=new Vue() 
        vm.$options = options; // 可以在vm上直接拿到用户new Vue(options) 里的options对象
        
        // 初始化状态
        initState(vm);
    }
}
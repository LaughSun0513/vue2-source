import { observe } from "../observer/index.js";

// 初始化状态 vue中很多状态 data props methods watch computed
export function initState(vm) {
	console.log("01 init state", vm);
    const { props, methods, data, computed, watch } = vm.$options;
    // 初始化data
	if (data) {
		initData(vm);
    }
    // 初始化props
	if (props) {
		initProps(vm);
    }
    // 初始化methods
	if (methods) {
		initMethods(vm);
    }
    // 初始化computed
	if (computed) {
		initComputed(vm);
    }
    // 初始化watch
	if (watch) {
		initWatch(vm);
	}
}

/** 数据响应式原理
 *  new Vue({
 *    data(){
 *      return {}
 *    }
 *
 *    data: {}
 * })
 */
function initData(vm) {
	let data = vm.$options.data;
    // case1 data是方法直接调用 data.call(vm)就是执行data(){}这个方法获得结果对象
    // case2 否则直接用对象
    // 骚操作: 在实例vm上挂一个_data就可以拿到data(){}的返回值
	data = vm._data = typeof data === "function" ? data.call(vm) : data; 
    
   /**
    * 数据劫持方案 利用Object.defineProperty
    * 数组 单独处理
    */
	observe(data);
}
function initProps(vm) {}
function initMethods(vm) {}
function initComputed(vm) {}
function initWatch(vm) {}

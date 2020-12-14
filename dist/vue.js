(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

	/**
	 *  new Vue({
	 *      data(){
	 *          return {} 对这个对象进行观测
	 *      }
	 *  })
	 */
	class Observer {
	  constructor(value) {
	    // console.log("02 Observer obj", value);
	    this.walk(value);
	  }

	  walk(obj) {
	    // case1: 对单纯的对象加上 get/set  {a:1}
	    // case2: 对多层对象加上 get/set
	    let keys = Object.keys(obj);
	    keys.forEach(key => {
	      defineReactive(obj, key, obj[key]);
	    });
	  }

	}

	function defineReactive(obj, key, value) {
	  // 如果value仍然是object类型，继续递归加get/set
	  observe(value);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,

	    get() {
	      console.log('你在取值操作', key); // console.dir({ atype: "get 获取值", key });

	      return value;
	    },

	    set(newValue) {
	      console.log('你在设置值操作', key, value, newValue); // console.dir({ atype: "set 设置值", value, newValue });

	      if (value === newValue) return;
	      observe(newValue); // 用户将值改为对象类型，对新赋值的对象再进行递归观测

	      value = newValue; // 不允许使用 obj[key] = value 赋值，造成死循环
	    }

	  });
	} // data 必须是个对象才Object.defineProperty


	function observe(data) {
	  // 只对对象进行观测 基本类型和null不观测
	  if (typeof data !== "object" && data !== null) {
	    return;
	  }

	  return new Observer(data);
	}

	function initState(vm) {
	  console.log("01 init state", vm);
	  const {
	    props,
	    methods,
	    data,
	    computed,
	    watch
	  } = vm.$options; // 初始化data

	  if (data) {
	    initData(vm);
	  } // 初始化props
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
	  let data = vm.$options.data; // case1 data是方法直接调用 data.call(vm)就是执行data(){}这个方法获得结果对象
	  // case2 否则直接用对象
	  // 骚操作: 在实例vm上挂一个_data就可以拿到data(){}的返回值

	  data = vm._data = typeof data === "function" ? data.call(vm) : data;
	  /**
	   * 数据劫持方案 利用Object.defineProperty
	   * 数组 单独处理
	   */

	  observe(data);
	}

	function initMixin(Vue) {
	  Vue.prototype._init = function (options) {
	    const vm = this; // vm=new Vue() 

	    vm.$options = options; // 可以在vm上直接拿到用户new Vue(options) 里的options对象
	    // 初始化状态

	    initState(vm);
	  };
	}

	function Vue(options) {
	  this._init(options); // new Vue({}) 将new里的配置直接传入_init

	} // 在Vue添加原型方法 _init


	initMixin(Vue);

	return Vue;

})));
//# sourceMappingURL=vue.js.map

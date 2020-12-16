import { newArrayMethods } from "./array";
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
		// 骚操作: 为了让数组新方法里面拥有observeArray，给实例定义私有属性，挂到实例上，并且指向自己, __ob__就是当前实例
		Object.defineProperty(value,'__ob__',{
			enumerable:false, // 不可枚举
			configurable:false,
			value: this
		});
		if (Array.isArray(value)) {
			// 对数组方法进行劫持 不对数组索引进行劫持
			// 劫持到数组方法操作之后 加自己的逻辑 AOP切面编程
			// push pop shift unshift sort reverse splice slice
			// 将数组的原型链先指向新方法的原型对象，最后还是会指向数组的原型对象
			// [1,2,3].__proto__  = newArrayMethods.prototype
			value.__proto__ = newArrayMethods;  // Object.setPrototypeOf(value, newArrayMethods); // 等价
			this.observeArray(value);
		} else {
			this.walk(value);
		}
	}
	walk(obj) {
		// case1: 对单纯的对象加上 get/set  {a:1}
		// case2: 对多层对象加上 get/set
		let keys = Object.keys(obj);
		keys.forEach((key) => {
			defineReactive(obj, key, obj[key]);
		});
	}
	observeArray(array){
		array.forEach(item=>{
			observe(item);
		})
	}
}
function defineReactive(obj, key, value) {
	// 如果value仍然是object类型，继续递归加get/set
	observe(value);
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get() {
			console.log("你在取值操作", key);
			// console.dir({ atype: "get 获取值", key });
			return value;
		},
		set(newValue) {
			console.log("你在设置值操作", key, value, newValue);
			// console.dir({ atype: "set 设置值", value, newValue });
			if (value === newValue) return;
			observe(newValue); // 用户将值改为对象类型，对新赋值的对象再进行递归观测
			value = newValue; // 不允许使用 obj[key] = value 赋值，造成死循环
		},
	});
}

// data 必须是个对象才Object.defineProperty
export function observe(data) {
	// 只对对象进行观测 基本类型和null不观测
	if (typeof data !== "object" && data !== null) {
		return;
	}
	if(data.__ob__){
		return data;
	}
	return new Observer(data);
}

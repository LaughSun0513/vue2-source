let oldArrayMethods = Array.prototype;

export const newArrayMethods = Object.create(oldArrayMethods);
// 会改变原数组的方法
let methods = ["push", "pop", "shift", "unshift", "reverse", "sort", "splice"];

// 切面编程
methods.forEach((method) => {
	newArrayMethods[method] = function (...args) {
        // this 就是 value
        console.log('数组方法被调用了，这里是拦截信息的方法');
        const res = oldArrayMethods[method].apply(this, args);
        let ob = this.__ob__;
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args; // 数组追加方法 内容如果是对象继续劫持
                break;
            case 'splice':
                inserted = args.slice(2); // arr.splice(0,1,{a:2}) 劫持第三个参数
                break;
            default:
                break;
        }
        if(inserted){
            ob.observeArray(inserted);
        }
        return res;
	};
});

(function(window,document,undefined){
	var Easing={
		//以下修改自  jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
		easeInQuad: function (t) {
			return t*t;
		},
		easeOutQuad: function (t) {
			return -t*(t-2);
		},
		easeInOutQuad: function (t) {
			if ((t*=2) < 1) return .5*t*t;
			return -0.5 * ((--t)*(t-2) - 1);
		},
		easeInCubic: function (t) {
	        return t*t*t;
		},
		easeOutCubic: function (t) {
			return (t-=1)*t*t + 1;
		},
		easeInOutCubic: function (t) {
			if ((t*=2) < 1) return .5*t*t*t;
			return .5*((t-=2)*t*t + 2);
		},
		easeInQuart: function (t) {
			return t*t*t*t;
		},
		easeOutQuart: function (t) {
			return -(t-=1)*t*t*t + 1;
		},
		easeInOutQuart: function (t) {
			if ((t*=2) < 1) return .5*t*t*t*t;
			return -0.5 * ((t-=2)*t*t*t - 2);
		},
		easeInQuint: function (t) {
			return t*t*t*t*t;
		},
		easeOutQuint: function (t) {
			return (t-=1)*t*t*t*t + 1;
		},
		easeInOutQuint: function (t) {
			if ((t*=2) < 1) return .5*t*t*t*t*t;
			return .5*((t-=2)*t*t*t*t + 2);
		},
		easeInSine: function (t) {
			return 1-Math.cos(t * (Math.PI/2));
		},
		easeOutSine: function (t) {
			return Math.sin(t * (Math.PI/2));
		},
		easeInOutSine: function (t) {
			return -0.5 * (Math.cos(Math.PI*t) - 1);
		},
		easeInExpo: function (t) {
			return (t==0) ? 0 : Math.pow(2, 10 * (t - 1));
		},
		easeOutExpo: function (t) {
			return (t==1) ? 1 : (-Math.pow(2, -10 * t) + 1);
		},
		easeInOutExpo: function (t) {
			if (t==0) return 0;
			if (t==1) return 1;
			if ((t*=2) < 1) return .5 * Math.pow(2, 10 * (t - 1));
			return .5 * (-Math.pow(2, -10 * --t) + 2);
		},
		easeInCirc: function (t) {
			return -1 * (Math.sqrt(1 - t*t) - 1);
		},
		easeOutCirc: function (t) {
			return Math.sqrt(1 - (t-=1)*t);
		},
		easeInOutCirc: function (t) {
			if ((t*=2) < 1) return -0.5 * (Math.sqrt(1 - t*t) - 1);
			return 0.5 * (Math.sqrt(1 - (t-=2)*t) + 1);
		},
		easeInBack: function (t) {
			if (s == undefined) s = 1.70158;
			return t*t*((s+1)*t - s);
		},
		easeOutBack: function (t) {
			if (s == undefined) s = 1.70158;
			var a=(t-=1)*t*((s+1)*t + s) + 1;
			return a;
		},
		easeInOutBack: function (t) {
			if (s == undefined) s = 1.70158; 
			if ((t*=2) < 1) return 0.5*(t*t*(((s*=(1.525))+1)*t - s));
			return 0.5*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2);
		},
		easeInBounce: function (t) {
			return -1*this.easeOutBounce(1-t);
		},
		easeOutBounce: function (t) {
			var a;
			if (t < (1/2.75)) {
				a= 7.5625*t*t;
			} else if (t < (2/2.75)) {
				a= (7.5625*(t-=(1.5/2.75))*t + .75);
			} else if (t < (2.5/2.75)) {
				a= (7.5625*(t-=(2.25/2.75))*t + .9375) ;
			} else {
				a= (7.5625*(t-=(2.625/2.75))*t + .984375);
			}
			return a;
		},
		easeInOutBounce: function (t) {
			if (t < 1/2) return this.easeInBounce(2*t) * .5;
			return this.easeInBounce(2*t-1) * .5 + .5;
		}
	};

	//贝塞尔轨迹 根据传入的array长度确定为 array.length-1 阶曲线
	//array[0]为 起始点 ，array[array.length-1] 为 终点，其他的都是控制点坐标
	function besierline(t,array){
		var n=array.length-1;
		var sum=0; 
		if(n>0){
			for (var i=0;i<=n;i++){
				sum+=(factNum(n)/(factNum(n-i)*factNum(i))*array[i]*powerNum(1-t,n-i)*powerNum(t,i));
			}
		}
		return sum;
	}
	//求阶乘
	function factNum(val){
		var fact=1;
		for(var i=1;i<=val;i++){
			fact*=i;
		}
		return fact;
	}
	//求幂  //快速求幂 x^y
	function powerNum(dx,dy) {
		var r = 1;
		while (dy != 0) {
			var b = dy & 1; //取最末尾的一位数,也可以判断奇偶数，奇数：1，偶数：0
			if (b) {//如果最末尾的数是1,储存有效值
				r *= dx;
			}
			dx *= dx; //这里即完成了x^(2^(n-1)*i)的计算
			dy >>= 1; //右位移去掉末尾1位,也可以看成是除以2取整数
		}
		return r;
	}

	//CSS cubic-bezier JS实现
	//cubic-bezier 为3介贝塞尔曲线 
	//@param t : 时间参数 0~1;
	Easing.cubic_bezier=function(t,x0,y0,x1,y1){
        var dx=[0,x0,x1,1],
        	dy=[0,y0,y1,1];
        //X轴向为平滑时间轴，Y轴向为需要的计算结果
        var dt=besierline(t,dx);
        return besierline(t,dy);
    };
    //提供一个多介贝塞尔曲线
    Easing.besierline=besierline;
    
    window.Easing = Easing;
})(window,document,undefined);
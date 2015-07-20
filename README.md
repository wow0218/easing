# easing实现方法
鉴于Canvas中的缓动动画需要，以及大量需要JS实现的分步动画需要。修改出来的一个版本。

#第一部分
    easeInQuad，easeOutQuad等修改自  jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
    
#第二部分
    CSS中cubic-bezier JS实现
    Easing.cubic_bezier=function(t,x0,y0,x1,y1){
        var dx=[0,x0,x1,1],
            dy=[0,y0,y1,1];
            //X轴向为平滑时间轴，Y轴向为需要的计算结果
        var dt=besierline(t,dx);
        return besierline(t,dy);
    };
    
#第三部分 多介贝塞尔曲线

# 参数，返回值
    @param t ：0~1之间的平滑移动浮点小数，0为动画开始点，1为动画结束点
    @return ：根据 t 计算后的浮点数。
  

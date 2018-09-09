(function () {
    let utils=(function () {

        function getCss(ele,attr){
            let value = window.getComputedStyle(ele)[attr];

            var reg = /^-?(\d|[1-9]\d+)(\.\d+)?(px|pt|em|rem|%)?$/i;
            if(reg.test(value)){
                value =parseFloat(value)
            }
            return value
        }

        function setCss(ele, attr, value) {
            var reg = /^width|height|fontSize|left|right|top|bottom|(margin|padding)(left|top|right|bottom)?$/i;
            if (reg.test(attr) && !isNaN(value)) {
                ele.style[attr] = value + 'px';
            }
            ele.style[attr] = value;


        }


        function setGroupCss(ele,obj={}){
            if(Object.prototype.toString.call(obj)==='[object Object]'){
                for(var key in obj){

                    if(obj.hasOwnProperty(key)){
                        setCss(ele,key,obj[key])
                    }
                }
            }
        }

        function css(...arg){
            if(arg.length===3){

                setCss(...arg)
            }else if(arg.length===2){
                if(arg[1] instanceof Object){
                    setGroupCss(...arg)
                }else{
                    return getCss(...arg)
                }
            }
        }


        return{css:css}
    })();


    //匀速直线运动
    let linear=function (time,duration,change,begin){
        return time/duration*change+begin;
    };
    function animate(ele,target={},duration,callBack) {
        if(typeof duration=='function'){
            callBack=duration;
            duration=2000;

        }
        let begin={},change={},time=0;
        for(var key in target){
            begin[key]=utils.css(ele,key);
            change[key]=target[key]-begin[key];
        }
        clearInterval(ele.timer);
        ele.timer=setInterval(()=>{
            time+=17;
            if(time>=duration){
                clearInterval(ele.timer);
                utils.css(ele,target);
                callBack&&callBack.call(ele);
                return;
            }
            for(var key in change){
                var cur=linear(time,duration,change[key],begin[key]);
                utils.css(ele,key,cur);
            }

        },17)

    };
    window.animate=animate;
    window.utils=utils;

})();
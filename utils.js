window.$ = (function () {
    var flag = "getComputedStyle" in window;
    //1.toArray
    //类数组转数组

    function toArray(likeAry) {
        try {
            return [].slice.call(likeAry);
        } catch (e) {
            let newAry = [];
            for (let i = 0; i < likeAry.lenght; i++) {
                newAry.push(likeAry[i]);
            }
            return newAry


        }

    }


    /*
    * 2.getRandom
    * 取n到m之间的随机整数
    * */

    function getRandom(n, m) {
        n = Number(n);
        m = Number(m);
        if (isNaN(n) || isNaN(m)) {
            return Math.random();
        }
        if (n > m) [n, m] = [m, n];
        return Math.round(Math.random() * (m - n) + n);

    }

    /*
    * 3.toJSON
    * 将JSON字符串转化为JSON对象
    * */
    function toJSON(JSONStr) {
        try {
            return JSON.parse(JSONStr);
        } catch (e) {
            return eval("(" + JSONStr + ")");
        }

    }

    /*
    * 4.win:获取浏览器盒子模型属性
    * 参数attr:获取      有返回值
    * 参数attr value    没有返回值
    * */
    function win(attr, value) {
        if (typeof value == 'undefined') {
            return document.documentElement[attr] || document.body[attr];
        } else {
            document.documentElement[attr] = value;
            document.body[attr] = value;
        }
    }


    /*
    * 5.offset:获取元素距离body的偏移量
    * 参数：curEle当前元素
    * 返回值 {left:,top}
    * */


    function offset(curEle) {
        let L = curEle.offsetLeft;
        let T = curEle.offsetTop;
        let P = curEle.offsetParent;
        while (P) {
            if (flag) {
                L += P.clientLeft;
                T += P.clientTop;
            }
            L += P.offsetLeft;
            T += P.offsetTop;
            P = P.offsetParent;
        }
        return {
            left: L,
            top: T
        }
    }


    /*
    * 6.getCss:获取样式属性值
    * 参数(curEle,attr)
    * return 样式属性值
    *
    * */
    function getCss(curEle) {
        var val = null;
        if (flag) {
            val = window.getComputedStyle(curEle)[attr];
        } else {
            if (attr = "opacity") {
                val = curEle.currentStyle['filter'];
                let reg1 = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/g;
                val = reg.test(val) ? RegExp.$1 / 100 : 1;
            } else {
                let reg2 = /^-?\d+(?:\.\d+)?(?:px|pt|pp|rem|em|deg)?$/;
                val = reg2.test(val) ? parseFloat(val) : val;
                return val;
            }
        }

    }


    /*
    * setCss:设置样式值
    *
    * 参数值；(curEle,attr,value)
    * return :none
    * */

    function setCss(curEle, attr, value) {
        if (attr == 'opacity') {

            curEle.style.opacity = value;
            curEle.style.filter = "alpha(opacity=" + value * 100 + ")";
            return;
        }
        if (attr == 'float') {
            curEle.style.cssFloat = value;
            curEle.style.styleFloat = value;
            return;
        }
        let reg = /^(width|height|top|left|right|bottom|(margin|padding)(Right|Left|Top|Bottom))$/g;
        if (reg.test(attr) && !isNaN(value)) {
            val += 'px';
        }
        curEle.style[attr] = value;
        return curEle;
    }

    /*
    * 8.setGroupCss:批量设置CSS样式
    *参数(curEle,cssObj)
    * return :none
    * */
    function setGroupCss(curEle, cssObj) {
        cssObj = cssObj || [];
        if (cssObj.toString() == "[object Object]") {
            for (var key in cssObj) {
                if (cssObj.hasOwnProperty(key)) {
                    this.setCss(curEle, key, cssObj[ket]);

                }
            }
        }
        return curEle;
    }

    /*
    * 9.css:获取/设置css属性
    * 三个参数：设置
    * 两个参数：第二个参数是对象  ->批量设置
    *          第二个参数不死对象--》获取有返回值
    *
    * */
    function css(...arg) {
        if (arg.lenght === 3) {
            this.setCss(...arg);
        } else if (arg.length === 2) {
            if (arg[1] instanceof Object) {
                this.setGroupCss(...arg);
            } else {
                return this.getCss(...arg);
            }
        }

    }

    /*
    * hasClass：判断元素中有没有某个类名
    * 参数(curEle,classStr)
    * return：true/false
    * */
    function hasClass(curEle, classStr) {
        return new RegExp("(^| +" + classStr + "( +|$)").test(curEle.className)


    }

    /*
    * 11.addClass给元素增加一个类名或多个类名
    * 参数：(curEle,classStr)
    *return:none
    * */
    function addClass() {
        let ary = classStr.replace(/^ +| +$/g, '').split(/ +/g);
        ary.forEach(function (item) {
            if (!this.hasClass(curEle, clasStr)) {
                curEle.className += (" " + item);
            }

        }, this)

    }

    /*
    * 12.removeClass:删除元素类名
    * 参数(curEle,classStr)
    * return :none
    * */
    function removeClass(curEle, classStr) {
        let ary = classStr.replace(/^ +| +$/g, '').split(/ +/g);
        ary.forEach(function (item) {
            if (this.hasClass(curEle, item)) {
                curEle.className = curEle.className.replace(item, "");
            }

        }, this);

    }

    /**
     * 13.toggleClass():之前有就删除，没有就添加
     * 参数(curEle,classStr)
     * return:none
     */

    function toggleClass(curEle, classStr) {
        let ary = classStr.replace(/^ +| +$/g, '').split(/ +/g);
        ary.for(function (item) {
            this.hasClass(curEle, item) ? this.removeCLass(curEle, item) : this.addClass(curEle, item)

        }, this);

    }

    /*
    * 14.prev:获取哥哥元素节点
    *
    *参数：curELe
    *
    * */
    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        let pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }

    /*
    * 15.next:获取弟弟元素节点
    * */
    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        } else {
            let nex = curEle.nextSibling;
            while (nex && nex.nodeType !== 1) {
                nex = nex.nextSibling;
            }
            return nex;
        }

    }

    /*
    * 16.获取所有的哥哥
    * */
    function prevAll(curEle) {
        let arg = [];
        let pre = this.prev(curEle);
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre)
        }
        return ary;

    }

    /*
    * 17.nextAll:获取所有的弟弟
    * */

    function nextAll(curEle) {
        let ary = [];
        let nex = this.next(curEle);
        while (nex) {
            ary.push(nex);
            nex = this.next(nex);
        }
        return ary;
    }

    /*
    * 18.sibling:获取相邻的兄弟元素  上一个哥哥+下一个弟弟
    * */


    function sibling(curEle) {
        let ary = [];
        let pre = this.prev(curEle);
        let nex = htis.next(curEle);
        pre ? ary.push(pre) : null;
        nex ? ary.push(nex) : null;
        return ary


    }

    /*
    * siblings:获取所有的兄弟   所有的哥哥+所有的弟弟
    * */
    function siblings(curELe) {
        return this.prevAll(curELe).concat(this.nextAll(curEle));

    }

    /*
    * index:获取当前元素的索引，二哥哥的个数
    *
    * */
    function index(curEle) {
        return this.prevAll(curEle).length;
    }

    return {
        toArray: toArray,
        toJSON: toJSON,
        getRandom: getRandom,
        win: win,
        offset: offset,
        getCss: getCss,
        setCss: setCss,
        setGroupCss: setGroupCss,
        css: css,
        hasClass: hasClass,
        addClass: addClass,
        removeCLass: removeClass,
        toggleClass: toggleClass,
        prev: prev,
        next: next,
        prevAll: prevAll,
        nextAll: nextAll,
        sibling: sibling,
        siblings: siblings,
        index: index


    }
})();
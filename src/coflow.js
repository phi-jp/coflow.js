

;(function(global) {

    var $id = function(id) { return document.getElementById(id); };
    
    global.coflow = {
        gimmicks: [],

        comment: function(msg, param) {
            if (!this.coflowBody) {
                var coflowBody = this.coflowBody = document.createElement("div");
                coflowBody.style.left = "0px";
                coflowBody.style.top  = "0px";
                coflowBody.style.width = window.innerWidth + "px";
                coflowBody.style.height = window.innerHeight + "px";
                coflowBody.style.overflow = "hidden";
                coflowBody.style.position = "absolute";
                coflowBody.setAttribute("id", "coflow");
                document.body.appendChild(coflowBody);
            }

            for (var i=0,len=this.gimmicks.length; i<len; ++i) {
                var gimmick = this.gimmicks[i];

                if (gimmick.condition(msg)) {
                    gimmick.execute(msg, param);
                    break;
                }
            }
        },

        registerGimmick: function(gimmick) {
            gimmick.priority = gimmick.priority || 0;
            this.gimmicks.push(gimmick);
            this.gimmicks.sort(function(l, r) {
                return (l.priority < r.priority);
            });

            return this;
        },
    };
    
    /*
     * normal
     */
    global.coflow.registerGimmick({
        condition: function(msg) {
            return true;
        },
        execute: function(msg, param) {
            var parma = param || {};
            
            var elm = new coflow.Element(msg, "coflow-right-to-left");
            var x = window.innerWidth;
            var y = (Math.random()*window.innerHeight)|0;
            
            if (param.color) {
                elm.element.style.color = param.color;
            }
            
            elm.setPosition(x, y);
        },
        priority: -1,
    });

})(window);


;(function(global) {
    global.coflow.Element = function(msg, animation) {
        this.element = document.createElement("div");
        this.element.textContent = msg;
        this.element.classList.add("coflow-base");
        this.element.classList.add(animation || "coflow-right-to-left");
        coflow.coflowBody.appendChild(this.element);
        this.element.addEventListener("webkitAnimationEnd", function() {
            this.element.parentNode.removeChild(this.element);
        }.bind(this), false);
    };
    
    global.coflow.Element.prototype = {
        setPosition: function(x, y) {
            this.x = x;
            this.y = y;
            this.element.style.left = x + "px";
            this.element.style.top  = y + "px";
        }
    };

})(window);


;(function(global) {
    
    /*
     * 激震
     */
    global.coflow.registerGimmick({
        condition: function(msg) {
            return /激震/.test(msg);
        },
        execute: function(msg) {
            var elm = new coflow.Element(msg, "coflow-severe-earthquake");
            var x = window.innerWidth;
            var y = (Math.random()*window.innerHeight)|0;
            
            elm.setPosition(x, y);
        },
    });
    
    
    /*
     * ドン
     */
    global.coflow.registerGimmick({
        condition: function(msg) {
            return /ドン/.test(msg);
        },
        execute: function(msg) {
            var elm = new coflow.Element(msg, "coflow-done");
            var x = (Math.random()*(window.innerWidth-200))|0;
            var y = (Math.random()*(window.innerHeight-200))|0;
            
            elm.setPosition(x, y);
        },
    });
    
    /*
     * script タグ
     */
    global.coflow.registerGimmick({
        condition: function(msg) {
            return /<script>/.test(msg);
        },
        execute: function(msg) {
            var elm = new coflow.Element("script タグなんて書いちゃダメだぞ!");
            var x = window.innerWidth;
            var y = (Math.random()*window.innerHeight)|0;
            
            elm.setPosition(x, y);
        },
    });
    
    /*
     * color
     */
    global.coflow.registerGimmick({
        condition: function(msg) {
            return /(red|green|blue)/.test(msg);
        },
        execute: function(msg) {
            var elm = new coflow.Element(msg);
            var x = window.innerWidth;
            var y = (Math.random()*window.innerHeight)|0;
            
            var m = msg.match(/(red|green|blue)/);
            
            elm.element.style.color = m[0];
            
            elm.setPosition(x, y);
        },
    });


})(window);

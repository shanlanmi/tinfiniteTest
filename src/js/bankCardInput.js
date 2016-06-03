//===============> 数据接口 <===============
/*

1. 参数设置
  var bankIdTips = {
    // input 元素的 id
    node: "#bankId",

    // 检测到未输入的提示信息。
    isEmpty: "请填写银行卡号。",

    // 检测到输入错误位数的提示信息。
    isErrDigit: "银行卡号是12－19位数字。",
    
    // 检测到输入非银行卡的提示信息。
    isNotCard: "无法识别您的卡号，请填写正确的银行卡卡号。",

    // 是否显示同步输入提示。
    isTyping: true,

    // 检测银行卡号请求的 url
    requestUrl: 'checkUrl.php',

    // 检测银行卡号的请求参数
    requestId: 'bankId'
  };

2. 调用
  inputTipsTools(bankIdTips);
*/

//===============> 组件 <===============
(function () {
  "use strict";
  //require("style!css!../css/bankCardInput.css");
  require("../sass/bankCardInput.sass");
  var errorico = document.createElement('img');
  errorico.src = require("../img/errorico.png");
  var ico = document.createElement('img');
  ico.src = require("../img/ico.png");
  var safeico = document.createElement('img');
  safeico.src = require("../img/safeico.png");

  window.inputTipsTools = function(option) {
    // 选择器
    var $ = function(x){ return document.querySelector(x); };
    var $a = function(x){ return document.querySelectorAll(x); };
    //添加事件(兼容方式)
    function addEvent(dom,type,fn){
      //对于支持DOM2级事件处理程序addeventListener方法的浏览器
      if(dom.addEventListener){
        dom.addEventListener(type,fn,false);
      }else if(dom.attachEvent){
      //对于不支持addEventListener方法但支持attchEvent方法的浏览器	
        dom.attachEvent('on'+type,fn);
      }
      else{
      //对于不支持以上两种,但支持on+'事件名'的浏览器
        dom['on'+type]=fn;
      }
    }
    
    // input 表单对象
    var inputTips = {
      options: {
        node: null,
        isEmpty: null,
        isErrDigit: null,
        isNotCard: null,
        requestUrl: null,
        requestId: null
      },
      isDirty: false,
      isRgiht: false,

      // 表单验证
      judge: function(input) {
        input = input.replace(/\s*/g, '');
        if (input.length === 0) return 'empty';
        if (input.match(/^\d{12,19}$/) &&
        this.bankRequest(this.options.requestUrl, this.options.requestId, input)) {
          return 'right';
        } else if (input.match(/^\d*$/)) {
          return 'errDigit';
        } else {
          return 'notCard';
        }
      },

      // 提示信息
      tipsPanel: function(id, errText) {
        $(id).style.display = '';
        if (!errText) {
          $(id).className = $(id).className.replace(/inputTips-tips/, 'inputTips-legal');
          $(id).innerHTML = '';
        } else {
          if ($(id).className.match(/legal/)) {
            $(id).className = $(id).className.replace(/legal/, 'tips');
          }
          $(id).innerHTML = errText;
          $(this.options.node).style.borderColor = 'red';
        }
        var zoomId = '#inputTips-zoom-' + this.options.node.replace('#','');
        if ($(zoomId)) {
          $(zoomId).style.display = 'none';
        }
      },


      // 银行卡验证请求
      bankRequest: function(url, arg, vale) {
        // 这里是个异步求情, 暂时注释掉
        /*
        var xhttp = new XMLHttpRequest();
        if (!xhttp) {
          alert('Giving up :( Cannot create an XMLHTTP instance');
          return false;
        }
        xhttp.onreadystatechange = function() {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            return xhttp.responseText;
          }
        };
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(arg + '=' + bankId);
        */
        return true;
      },

      // 绑定事件
      allEvent: function() {
        var self = this;
        var tipsId = 'inputTips-tips-' + self.options.node.replace('#','');

        addEvent($(this.options.node), 'focus', function() {
          if (!self.isDirty) {
            var inserStr = "<div class='inputTips-tips' id='" + tipsId + "'></div>";
            $(self.options.node).insertAdjacentHTML('afterend', inserStr);
            $('#' + tipsId).style.display = 'none';
            var setLeft = $(self.options.node).offsetLeft + $(self.options.node).clientWidth + 10;
            var setTop = $(self.options.node).offsetTop;
            $('#' + tipsId).style.left = setLeft + 'px';
            $('#' + tipsId).style.top = setTop + 'px';
            self.isDirty = true;
          }
          $(self.options.node).style.borderColor = '';
          $('#' + tipsId).style.display = 'none';
          $('#' + tipsId).style.display = 'none';
        });

        addEvent($(this.options.node), 'focusout', function() {
          var inputJudge = self.judge($(self.options.node).value);
          switch (inputJudge) {
            case 'empty':
              self.tipsPanel('#' + tipsId, self.options.isEmpty);
              break;
            case 'right':
              self.tipsPanel('#' + tipsId, null);
              break;
            case 'errDigit':
              self.tipsPanel('#' + tipsId, self.options.isErrDigit);
              break;
            default: 
              self.tipsPanel('#' + tipsId, self.options.isNotCard);
              break;
          }
        });

        addEvent($(this.options.node), 'keyup', function() {
          if (!self.options.isTyping) return;
          var inputValue = $(self.options.node).value;
          var showValue = inputValue.replace(/\d.../g, "$& ");

          var zoomId = '#inputTips-zoom-' + self.options.node.replace('#','');
          if (!$(zoomId)) {
            var inserStr = "<div class='inputTips-zoom' id='" +
            zoomId.replace('#','') + "'></div>";
            $(self.options.node).insertAdjacentHTML('beforebegin', inserStr);
            var setLeft = $(self.options.node).offsetLeft;
            var setTop = $(self.options.node).offsetTop - $(self.options.node).clientHeight -
            getComputedStyle($(self.options.node)).paddingTop.replace('px','');
            $(zoomId).style.left = setLeft + 'px';
            $(zoomId).style.top = setTop + 'px';
          }
          $(zoomId).style.display = 'block';
          $(zoomId).innerHTML = showValue;
        });
      },
      
      // 流程管理
      init: function() {
        this.options = option;
        this.allEvent();
        if ($(this.options.node).classList) {
          $(this.options.node).classList.add("inputTips-input");
        } else {
          $(this.options.node).className += " inputTips-input";
        }
      }
    };
    inputTips.init();
  };
})();
	


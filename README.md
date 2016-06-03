## Tinfinite 前端初试题
### 硬性需求分析：
1. 一个银行卡号的输入组件。
1. 提示此表单为必填，focus 后未填，给出提示 "请填写银行卡号。"。
1. 输入时，输入信息绑定到提示信息上。
1. 提示信息按照银行卡号格式输出。
1. 输入完毕后，给出表单验证反馈。
  1. 若输入错误数据，给出提示 "银行卡号是12－19位数字。"。
  1. 若输入非纯数字，给出提示 "无法识别您的卡号，请填写正确的银行卡卡号。"。
  1. 若输入正确，显示正确提示。

### 弹性需求
1. ajax验证反馈。

### 使用方法
1. 在 html 页面引入组件
  ```HTML
  <script src="bankCardInput.js"></script>
  ```
1. 参数设置
  ```JavaScript
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
  ```

1. 调用
  ```JavaScript
  inputTipsTools(bankIdTips);
  ```

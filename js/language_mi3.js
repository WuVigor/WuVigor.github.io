// 完全修复的 language_mi3.js - 不依赖外部JSON文件加载
let i18n = 'zh-cn'; // 默认使用中文
let lang = {};

// 内置完整的中文语言包，不再依赖外部文件加载
const defaultLang = {
  "welcome": "欢迎使用Hello Kitty，请允许浏览器连接到你的设备",
  "welcomeMileVaro": "欢迎使用VARO SW, 请允许浏览器连接到你的设备",
  "welcomeSuoai": "欢迎使用狼蛛在线驱动系统，请允许浏览器连接到你的设备",
  "welcomeStoria": "欢迎使用Storia-set-up，请允许浏览器连接到你的设备",
  "welcomeMachenike": "欢迎使用MachenikeDriver，请允许浏览器连接到你的设备",
  "welcomeQwerty": "欢迎使用Qwerty，请允许浏览器连接到你的设备",
  "welcomeWraith": "欢迎使用Wraith，请允许浏览器连接到你的设备",
  "welcomeGaopan": "欢迎使用QMK，请允许浏览器连接到你的设备",
  "welcomeEssential": "欢迎使用Essential75 HE，请允许浏览器连接到你的设备",
  "allowBrowser": "允许浏览器访问",
  "connectAlert": "请将键盘切换到自定义档！",
  "connect": "连接设备",
  "allow": "允许",
  "update": "设置",
  "language": "语言：",
  "theme": "主题：",
  "firmware": "固件：",
  "firmwareCurrent": "当前版本：",
  "firmwareLast": "已是最新版本",
  "firmwareNew": "发现新版本：",
  "checkUpdate": "检查更新",
  "download": "下载",
  "downloading": "正在下载中，请稍等。。。",
  "downloadSuccess": "下载成功",
  "downloadFail": "下载失败",
  "profile": "配置文件",
  "default": "默认",
  "menu1": "自定义",
  "menu2": "灯光设置",
  "menu3": "其他设置",
  "menu4": "按键触发",
  "menu5": "高级按键",
  "menu6": "宏命令",
  "menu7": "SOCD",
  "layer1": "默认层",
  "layer2": "Fn层",
  "selectAll": "全选",
  "selectInvert": "反选",
  "deselectAll": "取消全选",
  "resetTrigger": "重置行程",
  "keyManu1": "改键",
  "keyManu2": "组合键",
  "keyManu3": "宏命令",
  "keyManu4": "高级按键",
  "labTip1": "请在上面键盘区域选择需要设置的按键，然后在右侧选择要更改的按键，或者选中下面的输入框直接点击键盘上的按键，最后点击【应用】按钮生效",
  "labTip2": "请在上面键盘区域选择需要设置的按键，然后在右侧选择要设置的宏命令，最后点击【应用】按钮生效",
  "labTip3": "请在上面键盘区域选择需要设置的按键，然后在右侧选择要设置的高级按键，最后点击【应用】按钮生效",
  "checkedTip": "点击鼠标右键取消选中所有按键",
  "tipDefault": "默认"
};

// 初始化语言函数 - 直接使用内置语言包
async function initLanguage() {
  try {
    console.log('直接使用内置中文语言包，不依赖外部文件加载');
    
    // 直接使用预定义的中文语言包
    lang = { 'zh-cn': defaultLang };
    console.log('语言初始化完成');
  } catch (error) {
    console.error('语言初始化时出错:', error);
    // 即使发生错误也确保lang对象有效
    lang = { 'zh-cn': defaultLang };
  }
  
  // 应用语言到DOM
  getI18nDom(document);
}

// 获取国际化文本
function getI18n(key) {
  if (lang[i18n] && lang[i18n][key]) {
    return lang[i18n][key];
  }
  // 如果找不到对应语言的文本，返回键名或默认文本
  return defaultLang[key] || key;
}

// 将国际化文本应用到DOM元素
function getI18nDom(element) {
  // 确保element是有效的DOM对象
  if (!element || typeof element !== 'object') return;
  
  // 检查元素本身是否有i18n属性（只有元素节点才有这个方法）
  if (element.nodeType === 1 && element.hasAttribute && element.hasAttribute('i18n')) {
    const key = element.getAttribute('i18n');
    element.textContent = getI18n(key);
  }
  
  // 递归处理子元素
  const children = element.childNodes;
  for (let i = 0; i < children.length; i++) {
    if (children[i].nodeType === 1) { // 元素节点
      getI18nDom(children[i]);
    }
  }
}

// 导出函数供其他模块使用
window.initLanguage = initLanguage;
window.getI18n = getI18n;
window.getI18nDom = getI18nDom;
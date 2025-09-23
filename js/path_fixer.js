/**
 * 路径修复器 - 解决Hello Kitty60键盘配置工具中的资源加载404错误
 * 重写全局fetch函数和图片加载，自动修正相对路径为绝对路径
 */
(function() {
    // 保存原始的fetch函数
    const originalFetch = window.fetch;
    
    // 定义需要修复的资源路径模式
    const resourcePatterns = [
        /^image\/.*\.png$/i,
        /^config\/.*\.json$/i,
        /^kitty\.png$/i,
        /^kt\.png$/i,
        /^ky1\.png$/i,
        /^ky2\.png$/i,
        /^miKitty\.png$/i
    ];
    
    // 重写fetch函数
    window.fetch = function(url, options) {
        // 检查URL是否需要修复
        if (typeof url === 'string' && isRelativeResourcePath(url)) {
            const fixedUrl = fixResourcePath(url);
            console.log(`修复fetch资源路径: ${url} -> ${fixedUrl}`);
            return originalFetch(fixedUrl, options);
        }
        
        // 对于不需要修复的请求，使用原始的fetch函数
        return originalFetch(url, options);
    };
    
    // 检查URL是否是需要修复的相对资源路径
    function isRelativeResourcePath(url) {
        // 跳过绝对URL和已经包含完整路径的URL
        if (url.startsWith('http://') || url.startsWith('https://') || 
            url.startsWith('/') || url.includes('Desktop/Hello%20Kitty60/')) {
            return false;
        }
        
        // 检查是否匹配我们定义的资源模式
        for (const pattern of resourcePatterns) {
            if (pattern.test(url)) {
                return true;
            }
        }
        
        return false;
    }
    
    // 修复资源路径，将相对路径转换为正确的绝对路径
    function fixResourcePath(url) {
        // 直接构建正确的资源路径
        if (url.startsWith('image/')) {
            // 处理image目录下的资源
            return `http://localhost:8080/Desktop/Hello%20Kitty60/${url}`;
        } else if (url.startsWith('config/')) {
            // 处理config目录下的资源
            return `http://localhost:8080/Desktop/Hello%20Kitty60/${url}`;
        } else {
            // 处理根目录下的资源
            return `http://localhost:8080/Desktop/Hello%20Kitty60/${url}`;
        }
    }
    
    // 重写Image对象的src属性设置，处理图片加载路径问题
    const originalImageSrc = Object.getOwnPropertyDescriptor(Image.prototype, 'src').set;
    Object.defineProperty(Image.prototype, 'src', {
        set: function(url) {
            if (typeof url === 'string' && isRelativeResourcePath(url)) {
                const fixedUrl = fixResourcePath(url);
                console.log(`修复图片资源路径: ${url} -> ${fixedUrl}`);
                originalImageSrc.call(this, fixedUrl);
            } else {
                originalImageSrc.call(this, url);
            }
        }
    });
    
    // 初始化日志
    console.log('路径修复器已加载 - 自动修复所有相对路径资源加载问题');
})();
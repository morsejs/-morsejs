;(function (window) {

var morse = {};

// 摩尔表生成
morse.data = maptable();

// 功能：摩斯编码
morse.encode = function (word, settings) {

	// 传参检索及初始默认值
	settings = retrieval(word, settings);

	// 返回编码值
	settings.word = getcode(settings.word, settings.key.entable, true);

	// 输出为数组或字符格式
	settings.word = settings.isArray == true ? settings.word : settings.word.join(settings.separator);

	return settings.word
}

// 功能：摩斯解码
morse.decode = function (word, settings) {

	// 传参检索及初始默认值
	settings = retrieval(word, settings);

	// 判断如果为字符强制转换为数组
	settings.word = isArray2(settings.word) == true ? settings.word : settings.word.split(settings.separator);

	// 返回解码值
	settings.word = getcode(settings.word, settings.key.detable, false).join("");

	return settings.word;
}

// 解码器－处理函数
function getcode (word, keymap, state) {

	// 定义存放值的数组
	var content = [];

	// word转换为数组
	word = state == true ? trim(word).toUpperCase().split("") : word;

	// 匹配编码值
	for (var key in word) {
		content.push(keymap[word[key]])
	}
	return content;
}


// 传参检索－处理函数
function retrieval (word, settings) {

	// 判断settings是否存在且word传入settings新象中
	if (typeof settings == 'object') {
		settings.word = word;
	} else {
		settings = {
			word: word,
			separator: settings
		}
	}

	// 设置默认参数
	var defaultSettings = {
		key: morse.data,
		separator: '/',
		isArray: false
	}

	// 扩展对象
	extend(defaultSettings, settings)

	return defaultSettings
}

// 对象扩展
function extend () {
	var options, name,
	i = 1,
	length = arguments.length,
	arger = arguments[0];

	// 循环传入对象
	for ( ; i < length; i++ ) {
		options = arguments[i];

		// 遍历传入对象属性
		for (name in options) {

			// 传入对象属性值未定义则结束此次循环
			if (typeof options[name] == 'undefined') {
				continue;
			}

			// 传入对象复制到被扩展对象中
			arger[name] = options[name];
		} 
	}
}

// 辅助处理函数
// console.log()简写
function log (val) {
	return console.log(val);
}

// 压缩空格
function trim (str) {
	return str.replace(/(^\s*)|(\s*$)/g, '');
}

// 判断数组
function isArray2 (source) 
{
	return '[object Array]' == Object.prototype.toString.call(source);
}

// 摩斯编码表生成函数
function maptable() {
	var data={entable:{A:".-",B:"-..",C:"-.-.",D:"-..",E:".",F:"..-.",G:"--.",H:"....",I:"..",J:".---",K:"-.-",L:".-..",M:"--",N:"-.",O:"---",P:".--.",Q:"--.-",R:".-.",S:"...",T:"-",U:"..-",V:"...-",W:".--",X:"-..-",Y:"-.--",Z:"--.."},detable:{}};

// 生成解码表
	var t;
	for (var i in data.entable) {
		t = data.entable[i];
		data.detable[t] = i;
	}
	return data;
}
window.morse = morse;
})(window)





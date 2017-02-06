// 自消失弹出框配置
toastr.options = {
  closeButton: true,
  debug: false,
  progressBar: true,
  positionClass: "toast-top-center",
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "3000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut"
}

// 绑定按键弹起事件
function bindKeyUp(obj, funcCallBack) {
	$(obj).on('keyup',function(e){
		if(e.keyCode === 13){
			funcCallBack();
		}
	});
}

// 获取性别编码
function getSex(sexstr) {
	if (sexstr.indexOf('男') != -1) {
		return 1;
	} else if (sexstr.indexOf('女') != -1) {
		return 2;
	} else {
		return 0;
	}
}

// 获取星座编码
function getConstellation(constr) {
	if (constr.indexOf('白羊') != -1) {
		return 0;
	} else if (constr.indexOf('金牛') != -1) {
		return 1;
	} else if (constr.indexOf('双子') != -1) {
		return 2;
	} else if (constr.indexOf('巨蟹') != -1) {
		return 3;
	} else if (constr.indexOf('狮子') != -1) {
		return 4;
	} else if (constr.indexOf('处女') != -1) {
		return 5;
	} else if (constr.indexOf('天秤') != -1) {
		return 6;
	} else if (constr.indexOf('天蝎') != -1) {
		return 7;
	} else if (constr.indexOf('射手') != -1) {
		return 8;
	} else if (constr.indexOf('摩羯') != -1) {
		return 9;
	} else if (constr.indexOf('水瓶') != -1) {
		return 10;
	} else if (constr.indexOf('双鱼') != -1) {
		return 11;
	} else {
		return 15;
	}
}

// 获取下拉多选列表(Select2)的值
function getSelect2Value(idstr, fields) {
	var vals = $(idstr).select2('data');
	if (vals == null) {
		return '';
	}
	
	var cols = new Array('id', 'type_desc');
	if (typeof(fields) != 'undefined' && $.isArray(fields)) {
		cols = fields;
	}
	var jsonstr = '';
	if ($.isArray(vals)) {
		jsonstr += '[';
		for (var i = 0; i < $(vals).length; i ++) {
			if (i != 0) {
				jsonstr += ',';
			}					
			jsonstr += '{';
			for (var j=0; j < $(cols).length; j++) {
				if (j != 0) {
					jsonstr += ',';
				}
				jsonstr += '"'+cols[j]+'\":';
				jsonstr += '"'+vals[i][cols[j]]+'"';
			}
			jsonstr += '}';
		}
		jsonstr += ']';	
	} else {	
		jsonstr += '{';
		for (var j=0; j < $(cols).length; j++) {
			if (j != 0) {
				jsonstr += ',';
			}
			jsonstr += '"'+cols[j]+'":';
			jsonstr += '"'+vals[cols[j]]+'"';
		}
		jsonstr += '}';
	}
	return jsonstr;
}

// 设置下拉多选列表(Select2)的值
function setSelect2Value(idstr, valstr) {
	if (valstr == null) {
		$(idstr).select2('data', vals).trigger('change');
		return false;
	}
	if (valstr == '' || typeof(valstr) == 'undefined') {
		return false;
	}
	var vals = JSON.parse(valstr);
	if (vals.type_desc != 'null' && vals.type_desc == '添加类型') {	
		return true;
	}
	$(idstr).select2('data', vals).trigger('change');
	return true;
}


// 检测手机号码
function checkMobile(mobile) {
	var regBox = {
        regEmail : /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,//邮箱
        regName : /^[a-z0-9_-]{3,16}$/,//用户名
        regMobile : /^0?1[3|4|5|7|8][0-9]\d{8}$/,//手机
        regTel : /^0[\d]{2,3}[\d]{7,8}$/
    }    
    return regBox.regMobile.test(mobile);
}

// 检测电话号码
function checkTel(tel) {
	var regBox = {
        regEmail : /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,//邮箱
        regName : /^[a-z0-9_-]{3,16}$/,//用户名
        regMobile : /^0?1[3|4|5|7|8][0-9]\d{8}$/,//手机
        regTel : /^0[\d]{2,3}[\d]{7,8}$/
    } 
    return regBox.regTel.test(tel);
}

// 检测Email
function checkEmail(email) {
	var regBox = {
        regEmail : /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,//邮箱
        regName : /^[a-z0-9_-]{3,16}$/,//用户名
        regMobile : /^0?1[3|4|5|7|8][0-9]\d{8}$/,//手机
        regTel : /^0[\d]{2,3}[\d]{7,8}$/
    } 
    return regBox.regEmail.test(email);
}

// 检测身份证号
/*
根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
    地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
    出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
    顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
    校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。

出生日期计算方法。
    15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
    2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
下面是正则表达式:
 出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
 身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i            
 15位校验规则 6位地址编码+6位出生日期+3位顺序号
 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位
 
 校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
                公式(1)中： 
                i----表示号码字符从由至左包括校验码在内的位置序号； 
                ai----表示第i位置上的号码字符值； 
                Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
                i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
                Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1

*/
//身份证号合法性验证 
//支持15位和18位身份证号
//支持地址编码、出生日期、校验位验证
function checkIDCard(code) { 
	var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
	var tip = "";
	var pass= true;
    
    code = strtoupper(code);
    	   strtoupper

	if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
		tip = "身份证号格式错误";
		pass = false;
	} else if(!city[code.substr(0,2)]){
		tip = "地址编码错误";
		pass = false;
	} else{
		//18位身份证需要验证最后一位校验位
		if(code.length == 18) {
			code = code.split('');
			//∑(ai×Wi)(mod 11)
			//加权因子610428198710203610
			var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
			//校验位
			var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
			var sum = 0;
			var ai = 0;
			var wi = 0;
			for (var i = 0; i < 17; i++)
			{
			    ai = code[i];
			    wi = factor[i];
			    sum += ai * wi;
			}
			var last = parity[sum % 11];
			if(parity[sum % 11] != code[17]){
			    tip = "校验位错误";
			    pass =false;
			}
		}
	}
	if(!pass) alert(tip);
	return pass;
}

var vcity={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",  
            21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",  
            33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",  
            42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",  
            51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",  
            63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"  
           };  
  
function checkCard(card) {
    //是否为空  
    if(card === '')  
    {  
        alert('请输入身份证号，身份证号不能为空');  
        return false;  
    }  
    
    card = card.toUpperCase();
    
    //校验长度，类型  
    if(isCardNo(card) === false)  
    {  
        alert('您输入的身份证号码长度不正确，请重新输入');
        return false;  
    }  
    //检查省份  
    if(checkProvince(card) === false)  
    {  
        alert('您输入的身份证号码不正确,请重新输入');
        return false;  
    }  
    //校验生日  
    if(checkBirthday(card) === false)  
    {  
        alert('您输入的身份证号码生日不正确,请重新输入');
        return false;  
    }  
    return true;
    
    //检验位的检测  
    if(checkParity(card) === false)  
    {  
        alert('您的身份证校验位不正确,请重新输入'); 
        return false;  
    }    
    return true;  
}
  
  
//检查号码是否符合规范，包括长度，类型  
function isCardNo(card) {  
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)|(^\d{18}$)/;  
    if(reg.test(card) === false) {  
        return false;  
    }    
    return true;  
}
  
//取身份证前两位,校验省份  
function checkProvince(card) {
    var province = card.substr(0,2);  
    if(vcity[province] == undefined)  
    {  
        return false;  
    }  
    return true;  
}
  
//检查生日是否正确  
function checkBirthday(card) {  
    var len = card.length;  
    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字  
    if(len == '15')  
    {  
        var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;   
        var arr_data = card.match(re_fifteen);  
        var year = arr_data[2];  
        var month = arr_data[3];  
        var day = arr_data[4];  
        var birthday = new Date('19'+year+'/'+month+'/'+day);  
        return verifyBirthday('19'+year,month,day,birthday);  
    }  
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X  
    if(len == '18')  
    {  
        var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;  
        var arr_data = card.match(re_eighteen);  
        var year = arr_data[2];  
        var month = arr_data[3];  
        var day = arr_data[4];  
        var birthday = new Date(year+'/'+month+'/'+day);  
        return verifyBirthday(year,month,day,birthday);  
    }  
    return false;  
}
  
//校验日期  
function verifyBirthday(year,month,day,birthday) {
    var now = new Date();  
    var now_year = now.getFullYear();  
    //年月日是否合理  
    if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day)  
    {  
        //判断年份的范围（3岁到100岁之间)  
        var time = now_year - year;  
        if(time >= 3 && time <= 100)  
        {  
            return true;  
        }  
        return false;  
    }  
    return false;  
}
  
//校验位的检测  
function checkParity(card) { 
    //15位转18位  
    card = changeFivteenToEighteen(card);  
    var len = card.length;  
    if(len == '18')  
    {  
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);   
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');   
        var cardTemp = 0, i, valnum;   
        for(i = 0; i < 17; i ++)   
        {   
            cardTemp += card.substr(i, 1) * arrInt[i];   
        }   
        valnum = arrCh[cardTemp % 11];   
        if (valnum == card.substr(17, 1))   
        {  
            return true;  
        }  
        return false;  
    }  
    return false;  
}
  
//15位转18位身份证号  
function changeFivteenToEighteen(card) { 
    if(card.length == '15')  
    {  
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);   
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');   
        var cardTemp = 0, i;     
        card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);  
        for(i = 0; i < 17; i ++)   
        {   
            cardTemp += card.substr(i, 1) * arrInt[i];   
        }   
        card += arrCh[cardTemp % 11];   
        return card;  
    }  
    return card;  
}
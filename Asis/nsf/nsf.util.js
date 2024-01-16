/**
 * ============================================================================
 * Nsf util plugin
 *
 * @requires jQuery v1.2.3 or later
 *
 * @author		jissfa
 * @version		1.0
 * @since		1.0
 *
 * History
 * 1.0	2009. 1. 20.	jissfa	Initial Version
 * ============================================================================
 */
// <![CDATA[
 

var NsfUtil = {
	isLoaded: true,
	method: {
		exist: function(method) {
			if (null == window[method]) return false;
			else return true;
		},
		invoke: function(method) {
			if (! NsfUtil.method.exist(method)) return;

			var args = new Array();
			for (i=1; i<arguments.length; i++) {
				args[i-1] = arguments[i];
			}
			return window[method].apply(null, args);
		}
	},
	blockUI: function(msg) {
		if (null == jQuery.blockUI) return;

		jQuery.blockUI({message: msg});
	},
	unblockUI: function() {
		if (null == jQuery.blockUI) return;

		jQuery.unblockUI();
	},
	block: function(msg, obj) {
		if (null == obj) return;

		jQuery(obj).block({message: msg});
	},
	unblock: function(obj) {
		if (null == obj) return;

		jQuery(obj).unblock();
	},
	field: {
		clear: function(obj) {
			jQuery(obj).find(":text, textarea, select").val("");
		},
		serializeJSON: function(obj, rename) {
			if (null == rename) rename = {};

//			var ser = jQuery(obj).find(":text, :hidden, select, :checkbox, :radio").serializeArray();
			var ser = jQuery(obj).find(".nsf-param:not(:checkbox):not(.nsf-number)").serializeArray();
//			alert(JSON.stringify(ser));
			var param = "{"
			for (var i=0; i<ser.length; i++) {
				//alert(ser[i].name + " : " + ser[i].value);
				if (null == rename[ser[i].name]) {
					param = param
						  + "\"" + ser[i].name + "\": " + JSON.stringify(ser[i].value) + ",";
//					+ "\"" + ser[i].name + "\": " + JSON.stringify(ser[i].value) + ",";
				} else {
					param = param
						  + "\"" + rename[ser[i].name] + "\": " + JSON.stringify(ser[i].value) + ",";
				}
			}
			jQuery(obj).find(".nsf-param:disabled:not(:checkbox):not(.nsf-number)").each( function() {
				if (null == rename[jQuery(this).attr("name")]) {
					param = param
						  + "\"" + jQuery(this).attr("name") + "\": " + JSON.stringify(jQuery(this).val()) + ",";
				} else {
					param = param
						  + "\"" + rename[jQuery(this).attr("name")] + "\": " + JSON.stringify(jQuery(this).val()) + ",";
				}
			});
			// number값이 소수점과 함께 넘어가면서 entity에 값이 0으로 셋팅되는 현상 수정 by min 2013-06-07
			jQuery(obj).find(".nsf-number").each( function() {
				param = param + "\"" + jQuery(this).attr("name") + "\": " + JSON.stringify(jQuery(this).val().toString().replace(/,/gi, "")) + ",";
			});

			jQuery(obj).find(".nsf-param[type=checkbox]").each( function() {
				if ("radio" == jQuery(this).attr("type")) return true;

				if (jQuery(this).is(":checked")) {
					if (null == rename[jQuery(this).attr("name")]) {
						param = param
							  + "\"" + jQuery(this).attr("name") + "\": \"Y\",";
					} else {
						param = param
							  + "\"" + rename[jQuery(this).attr("name")] + "\": \"Y\",";
					}
				} else {
					if (null == rename[jQuery(this).attr("name")]) {
						param = param
							  + "\"" + jQuery(this).attr("name") + "\": \"\",";
					} else {
						param = param
							  + "\"" + rename[jQuery(this).attr("name")] + "\": \"\",";
					}
				}
			});

			param = param.substring(0, param.length - 1)
				  + "}";
//			alert(param);
			return param;
		},
		serialize: function(obj) {
			return jQuery(obj).serialize();
		},
		copy: function(data, form) {
			for (key in data) {
				jQuery(form + " #" + key).val(data[key]);
			}
		},
		reset: function(obj) {
			jQuery(obj).find(":text, textarea").each( function() {
				if (jQuery(this).hasClass("nsf-status-lck")) {
					jQuery(this).attr("readonly", true);
				} else {
					jQuery(this).attr("readonly", false);
				}
			});
			jQuery(obj).find("select, :button, input[type=radio], input[type=checkbox]").each( function() {
				if (jQuery(this).hasClass("nsf-status-lck")) {
					jQuery(this).attr("disabled", true);
				} else {
					jQuery(this).attr("disabled", false);
				}
			});
//			jQuery(obj).find(".nsf-resize").each( function() {
//				jQuery("#nsf-util").append("<span id=\"" + jQuery(this).attr("id") + "\"></span>");
//				jQuery("#nsf-util #" + jQuery(this).attr("id")).text(jQuery(this).val());
//				120 >= jQuery("#nsf-util #" + jQuery(this).attr("id")).width() ? jQuery(this).width(120) : jQuery(this).width(jQuery("#nsf-util #" + jQuery(this).attr("id")).width()+10);
//				jQuery("#nsf-util #" + jQuery(this).attr("id")).remove();
//			});
		},
		resize: function(obj) {
			jQuery("#nsf-util-resizer").text(jQuery(obj).val());
			jQuery(obj).width(jQuery("#nsf-util-resizer").width()+10);
		},
		validate: function(obj, msg) {
			if (null == msg) msg = "Field value is required!";

			var rtn = true;
			var items = "";
			jQuery(obj).find(".nsf-status-ess").each( function() {
				if ("" == jQuery(this).val()) {
					items = items + "," + jQuery(this).attr("title")
					if (rtn) jQuery(this).focus();
					rtn = false;
				}
			});

			if (! rtn) NsfMessage.alert(msg + " [" + items.substring(1, items.length) + "]");

			return rtn;
		}
	},
	select: {
		append: function(obj, code, text, def) {
			if (def)
				jQuery(obj).append(jQuery(document.createElement("option")).attr("value", code).attr("selected", true).text(text));
			else
				jQuery(obj).append(jQuery(document.createElement("option")).attr("value", code).text(text));
		},
		remove: function(obj) {
			jQuery(obj).children().remove();
		}
	},
	encode: {
		uri: {
			json: function(json) {
				if (jQuery.browser.msie && "7" == jQuery.browser.version.substring(0,1)) {
					var o = json;
					var t = {};
					for (var i in o) {
						o[i] = encodeURIComponent(o[i]);
					}
				}
				return json;
			}
		}
	},
	utf8: {
		// public method for url encoding
		encode : function (string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";

			for (var n = 0; n < string.length; n++) {

				var c = string.charCodeAt(n);

				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}

			}

			return utftext;
		},
		// public method for url decoding
		decode : function (utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;

			while ( i < utftext.length ) {

				c = utftext.charCodeAt(i);

				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				}
				else if((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i+1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}
				else {
					c2 = utftext.charCodeAt(i+1);
					c3 = utftext.charCodeAt(i+2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}

			}

			return string;
		}

	},
	string: {
		lPad: function(sOrgStr, sPaddingChar, iNum, fix) {
			if (sOrgStr == null || sPaddingChar == null || iNum == null) return "";

		 	var sReturn
		 	var sPaddingStr = "";

		 	for (var i=0; i < iNum; i++) {
		 		sPaddingStr += sPaddingChar;
		 	}

		 	if (fix) sReturn = (sPaddingStr + sOrgStr).substring((sPaddingStr + sOrgStr).length-iNum, (sPaddingStr + sOrgStr).length);
		 	else sReturn = (sPaddingStr + sOrgStr);

		 	return	sReturn;
		},
		rPad: function(sOrgStr, sPaddingChar, iNum, fix) {
			if (sOrgStr == null || sPaddingChar == null || iNum == null) return "";

		 	var sReturn
		 	var sPaddingStr = "";

		 	for (var i=0; i < iNum; i++) {
		 		sPaddingStr += sPaddingChar;
		 	}

		 	if (fix) sReturn = (sOrgStr + sPaddingStr).substring(0, iNum);
		 	else sReturn = (sOrgStr + sPaddingStr);

		 	if("" == sPaddingStr)
		 		sReturn = sReturn.replace(".","");

		 	return	sReturn;
		},
		replaceAll: function (inStr,tarStr,repStr ){
			  var result    = "";
			  var regExp = new RegExp(tarStr, "g");
			  var result   = inStr.replace(regExp,repStr);
			  return result;
		}
	},
	datepicker: {
		pos: function() {
			if ("IE6" == Station.browser() || "IE7" == Station.browser())
				jQuery("#ui-datepicker-div").css("z-index", jQuery(this).parents(".ui-dialog").css("z-index")+1);
			else
				jQuery(".ui-datepicker").css("z-index", jQuery(".ui-dialog").css("z-index")+1);
		}
	},
	format: {
		date: function(date, format) {
			var nDate = date.replace(/\/|\-/g, "");
			var nFormat = format.replace(/\/|\-/g, "");

			if (nDate.length != nFormat.length) //return "";
				nDate = nDate.substring(0,nFormat.length);

			var yS = nFormat.indexOf("y");
			var mS = nFormat.indexOf("M");
			var dS = nFormat.indexOf("d");

			var year = nDate.substr(yS, 4);
			var month = nDate.substr(mS, 2);
			var day = nDate.substr(dS, 2);

			format = format.replace("yyyy", year);
			format = format.replace("MM", month);
			format = format.replace("dd", day);

			return format;
		},
		dateCheck: function(fdate, tdate) {
			var checkVal = true;
			if(fdate > tdate){
				checkVal = false;
				NsfMessage.alert("시작일이 종료일보다 큽니다.");
			}
			return checkVal;
		},
		number: function(number, decimals, dec_point, thousands_sep) {
			if (null == number || "" == number) return "";
			number = number.replace(/,/gi,"");

			if (0 == number) return 0;

			if (0 < number.indexOf(".")) {
				if (3 >= number.substr(0, number.indexOf(".")).length) return number.substr(0, number.indexOf(".")+1) + NsfUtil.string.rPad(number.substr(number.indexOf(".")+1), "0", decimals, true);
			} else {
				if (3 >= number.length) return NsfUtil.string.rPad(number + ".", "0", decimals);
			}

			if (0 < number.indexOf(".")) {
				if (3 >= number.substr(0, number.indexOf(".")).length) return number.substr(0, number.indexOf(".")+1) + NsfUtil.string.rPad(number.substr(number.indexOf(".")+1), "0", decimals, true);
			} else {
				if (3 >= number.length) return NsfUtil.string.rPad(number + ".", "0", decimals);
			}

			dec_point = ".";
			thousands_sep = ",";
		    var n = number, prec = decimals, dec = dec_point, sep = thousands_sep;
		    n = !isFinite(+n) ? 0 : +n;
		    prec = !isFinite(+prec) ? 0 : Math.abs(prec);
		    sep = sep == undefined ? ',' : sep;

		    var s = n.toFixed(prec),
		        abs = Math.abs(n).toFixed(prec),
		        _, i;

		    if (abs >= 1000) {
		        _ = abs.split(/\D/);
		        i = _[0].length % 3 || 3;

		        _[0] = s.slice(0,i + (n < 0)) +
		            _[0].slice(i).replace(/(\d{3})/g, sep+'$1');

		        s = _.join(dec || '.');
		    } else {
		        s = abs.replace('.', dec_point);
		    }
		    return s;
		}
	},
	tag: {
		select: {
			appendXml: function(obj, xml) {
				jQuery(xml).find("row").each( function() {
					jQuery(obj).append(jQuery(document.createElement("option")).attr("value", jQuery(this).find("CD").text()).text(jQuery(this).find("CD_NM").text()));
				});
			},
			remove: function(obj) {
				jQuery(obj).children().remove();
			}
		},
		numeric: {
			keypress: function(e) {
				var exp = "0123456789";

				if (e.which == 8 || e.which == 9 || (33 <= e.which && e.which <= 40)) {
					// Operation Key Code
				} else {
					var ch = String.fromCharCode(e.which);
					var a = exp.indexOf(ch);
					if (a == -1) {
						e.preventDefault();
						return false;
					}
				}

				return true;
			}
		},
		number: {
			keypress: function(e) {
				var exp = "0123456789,.";

				if (e.which == 8 || e.which == 9 || (33 <= e.which && e.which <= 40) || e.which == 46) {
					// Operation Key Code
				} else {
					var ch = String.fromCharCode(e.which);
					var a = exp.indexOf(ch);
					if (a == -1) {
						e.preventDefault();
						return false;
					}
				}

				return true;
			}
		}
	}
}

//]]>
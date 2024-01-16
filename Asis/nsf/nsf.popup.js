/**
 * ============================================================================
 * Nsf popup plugin
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




var NsfPopup = {
	isLoaded: true,
	init: function(boolTm){
		var tm = "";
		var now = new Date();
		if(null != boolTm)
		{
			tm = tm + now.getSeconds() + now.getMilliseconds();
		}
		jQuery("body").append("<div id=\"div-dialog-"+tm+"\"  class=\"nsf-dialog-div\" style=\"display:; background-color:#fafafa\"><iframe id=\"frame-dialog-"+tm+"\" name=\"frame-dialog-"+tm+"\" width=\"100%\" height=\"100%\" frameborder=\"0\"></iframe></div>");

		jQuery("#div-dialog-"+tm).dialog({
			title: "Popup",
			autoOpen: false,
			modal: true,
			height: 500,
			width: 550,
			bgiframe: true,		//ie6에서 dialog위로 combo box 올라오는거 방지
			resizable: false,
			overlay: {
				opacity: 0.5,
				background: "black"
			},
			beforeClose: function() {
				jQuery("#frame-dialog-"+tm).attr("src", "");
			}
		});
		jQuery("#div-dialog-"+tm).css("padding", "0 0 0 0 !important");
		return tm;
	},
	modal: {
		open: function(uri, param, option) {
			if (! jQuery.browser.msie && null != jQuery.blockUI) jQuery.blockUI({message: ""});

			var url = uri;

			if (null != param && 0 < param.length) {
				for (var i=0; i<param.length; i++) {
					if (0 == i) {
						url = url + "?" + param[i].name + "=" + encodeURIComponent(param[i].value);
					} else {
						url = url + "&" + param[i].name + "=" + encodeURIComponent(param[i].value);
					}
				}
			}

			var feature = NsfPopup.modal.getFeature(option);

			var rtn = window.showModalDialog(url, window, feature);

			if (! jQuery.browser.msie && null != jQuery.blockUI) jQuery.unblockUI({});
			return rtn;
		},
		close: function(param) {
			if (null != param) window.returnValue = param;

			window.close();
		},
		getFeature: function(option) {
			var feature = "";
			if (null == option) {
				feature = "dialogWidth=500px;"
						+ "dialogHeight=300px;"
						+ "center=on;"
						+ "toolbar=no;"
						+ "menubar=no;"
						+ "location=no;"
						+ "help=no;"
						+ "status=no;"
						+ "statusbar=no;"
						+ "scroll=no;"
						+ "resizable=no;";
			} else {
				if (null == option.dialogWidth) {
					feature = feature + "dialogWidth=500px;";
				} else {
					feature = feature + "dialogWidth=" + option.dialogWidth + ";";
				}
				if (null == option.dialogHeight) {
					feature = feature + "dialogHeight=300px;";
				} else {
					feature = feature + "dialogHeight=" + option.dialogHeight + ";";
				}
				if (null == option.center) {
					feature = feature + "center=on;";
				} else {
					feature = feature + "center=" + option.center + ";";
				}
				if (null == option.toolbar) {
					feature = feature + "toolbar=no;";
				} else {
					feature = feature + "toolbar=" + option.toolbar + ";";
				}
				if (null == option.menubar) {
					feature = feature + "menubar=no;";
				} else {
					feature = feature + "menubar=" + option.menubar + ";";
				}
				if (null == option.location) {
					feature = feature + "location=no;";
				} else {
					feature = feature + "location=" + option.location + ";";
				}
				if (null == option.help) {
					feature = feature + "help=no;";
				} else {
					feature = feature + "help=" + option.help + ";";
				}
				if (null == option.status) {
					feature = feature + "status=no;";
				} else {
					feature = feature + "status=" + option.status + ";";
				}
				if (null == option.statusbar) {
					feature = feature + "statusbar=no;";
				} else {
					feature = feature + "statusbar=" + option.statusbar + ";";
				}
				if (null == option.scroll) {
					feature = feature + "scroll=no;";
				} else {
					feature = feature + "scroll=" + option.scroll + ";";
				}
				if (null == option.resizable) {
					feature = feature + "resizable=no;";
				} else {
					feature = feature + "resizable=" + option.resizable + ";";
				}
			}

			return feature;
		}
	},
	modeless: {
		open: function(uri, param, option) {
			if (! jQuery.browser.msie) {
				alert("Unsupported method in this browser");
				return;
			}

			var url = uri;

			if (null != param && 0 < param.length) {
				for (var i=0; i<param.length; i++) {
					if (0 == i) {
						url = url + "?" + param[i].name + "=" + encodeURIComponent(param[i].value);
					} else {
						url = url + "&" + param[i].name + "=" + encodeURIComponent(param[i].value);
					}
				}
			}

			var feature = NsfPopup.modal.getFeature(option);

			window.showModelessDialog(url, null, feature);
		},
		close: function() {
			widnow.close();
		}
	},
	modalOrigin: {
		open: function(uri, param, option) {
			var feature = NsfPopup.modal.getFeature(option);

			return window.showModalDialog(uri, param, feature);
		},
		close: function() {
			widnow.close();
		}
	},
	modelessOrigin: {
		open: function(uri, param, option) {
			if (! jQuery.browser.msie) {
				alert("Unsupported method in this browser");
				return;
			}

			var feature = NsfPopup.modal.getFeature(option);

			window.showModalessDialog(uri, param, feature);
		},
		close: function() {
			widnow.close();
		}
	},
	modalDialog: {
		open: function(uri, param, option, callback, boolTm) {
			var tm = NsfPopup.init(true);
			NsfRequest.http.doPost(uri, param, "frame-dialog-"+tm);

			if (null != option.title) jQuery("#div-dialog-" + tm).dialog("option", "title", option.title);
			if (null != option.dialogWidth) jQuery("#div-dialog-" + tm).dialog("option", "width", option.dialogWidth);

			//heigt는 1000px 에서 px를 인식못해서 임시로 변경 (by min)
			if (null != option.dialogHeight){
				var dHeigth = option.dialogHeight.replace("px", "");
				jQuery("#div-dialog-" + tm).dialog("option", "height", dHeigth);
			}

			// 팝업화면 사이즈조절가능
			jQuery("#div-dialog-" + tm).dialog("option", "resizable", true);
			jQuery("#div-dialog-" + tm).dialog("open");

			var isMobile = Nsf.isCheckMobile();
			if(isMobile == true) {
				jQuery('html, body').animate({
		            scrollTop: jQuery('#mobileMenu').css('top')
		        }, 800);

				setTimeout(function(){
					jQuery("#div-dialog-" + tm).dialog("option", "position", [0,0]);
					jQuery("#frame-dialog-"+tm).contents().find(".nsf-right").removeClass( "nsf-right" ).addClass("nsf-left" );
					jQuery("#frame-dialog-"+tm).contents().find("body").css({overflow:'auto'});
				}, 1000);
			}

			//jQuery("#div-dialog-" + tm).dialog("open");
			NsfPopup.modalDialog.callback = callback;
		},
		// rexpert에서 팝업 상단 제목줄이 숨는 경우가 발생하여 닫기 버튼 추가 후 버튼 제어 함수 추가함
		closeSelf: function(){
			parent.jQuery(".ui-dialog-content").dialog("close");
		},
		closeLogin: function(){
			parent.jQuery(".nsf-dialog-div").dialog("close");
		},
		close: function(rtn, id) {
			if(null != id){
				parent.jQuery("#"+id).dialog("close");
				parent.NsfPopup.modalDialog.callback(rtn);
				parent.jQuery("#"+id).remove();
			}
			else{
				parent.jQuery("#div-dialog-").dialog("close");
				parent.NsfPopup.modalDialog.callback(rtn);
			}
		},
		callback: null
	},
	modelessDialog: {
		open: function(uri, param, option) {
			alert("Unsupported method in this browser");
			return;

			var url = uri;

			if (null != param && 0 < param.length) {
				for (var i=0; i<param.length; i++) {
					if (0 == i) {
						url = url + "?" + param[i].name + "=" + encodeURIComponent(param[i].value);
					} else {
						url = url + "&" + param[i].name + "=" + encodeURIComponent(param[i].value);
					}
				}
			}

			jQuery("#frame-dialog-"+_tm).attr("src", url);

			if (null != option.title) jQuery("#div-dialog-"+tm).dialog("option", "title", option.title);
			if (null != option.width) jQuery("#div-dialog-"+tm).dialog("option", "width", option.width);
			if (null != option.height) jQuery("#div-dialog-"+tm).dialog("option", "height", option.height);

			jQuery("#div-dialog-"+tm).dialog("open");
		},
		close: function() {
			alert("Unsupported method in this browser");
			return;

			parent.jQuery("#div-dialog-"+tm).dialog("close");
		}
	},
	window: {
		open: function(uri, param, option) {
			var url = uri;

			if (null != param && 0 < param.length) {
				for (var i=0; i<param.length; i++) {
					if (0 == i) {
						url = url + "?" + param[i].name + "=" + encodeURIComponent(param[i].value);
					} else {
						url = url + "&" + param[i].name + "=" + encodeURIComponent(param[i].value);
					}
				}
			}

			var feature = "";
			if (null != option) {
				feature = "width=500px,"
						+ "height=300px,"
						+ "directories=no,"
						+ "location=no,"
						+ "menubar=no,"
						+ "resizable=yes,"
						+ "scrollbars=yes,"
						+ "status=no,"
						+ "titlebar=no,"
						+ "toolbar=no";
			} else {
				if (null == option.width) {
					feature = feature + "width=500px,";
				} else {
					feature = feature + "width=" + option.width + ",";
				}
				if (null == option.height) {
					feature = feature + "height=300px,";
				} else {
					feature = feature + "height=" + option.height + ";";
				}
				if (null == option.directories) {
					feature = feature + "directories=no,";
				} else {
					feature = feature + "directories=" + option.directories + ",";
				}
				if (null == option.location) {
					feature = feature + "location=no,";
				} else {
					feature = feature + "location=" + option.location + ",";
				}
				if (null == option.resizable) {
					feature = feature + "resizable=yes,";
				} else {
					feature = feature + "resizable=" + option.resizable + ",";
				}
				if (null == option.scrollbars) {
					feature = feature + "scrollbars=yes,";
				} else {
					feature = feature + "scrollbars=" + option.scrollbars + ",";
				}
				if (null == option.status) {
					feature = feature + "status=no,";
				} else {
					feature = feature + "status=" + option.status + ",";
				}
				if (null == option.titlebar) {
					feature = feature + "titlebar=no,";
				} else {
					feature = feature + "titlebar=" + option.titlebar + ",";
				}
				if (null == option.toolbar) {
					feature = feature + "toolbar=no,";
				} else {
					feature = feature + "toolbar=" + option.toolbar + ",";
				}
			}

			window.open(url, "", feature);
		},
		close: function() {
			window.close();
		}
	},
	login: function(success) {
		var params = [];
		NsfPopup.modalDialog.open(Nsf.contextRoot + "/webView/login?mode=Popup", params, {title: "로그인", width:500, height:230},
			function(data) {
				if (null != success) success(data);
			});
	},
	loginPopup: function(success) {
		var params = [{name:"mode", value:"popup"}];
		NsfPopup.modalDialog.open(Nsf.contextRoot + "/webView/wisen/fd/sys/control/LoginC", params, {title: "로그인", dialogWidth:"800px", dialogHeight:"460px"},
			function(data) {

//				if (null != success) success(data);
//				NsfPopup.modalDialog.close();
			});
	}
};

//]]>
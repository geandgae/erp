/**
 * ============================================================================
 * Nsf message plugin
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
jQuery('body').append("<div id=\"NsfMessage\" title=\"Error\" style=\"display: none;\"><p id=\"content\" style=\"overflow: auto; width: 495px; height: 290px;\"></p></div>");

jQuery('#NsfMessage').dialog({
	modal: true,
	autoOpen: false,
	show: 'blind',
	hide: 'blind',
	resizable: false,
	width: 500,
	buttons: { 
	}
});
const NsfMessage = {
	isLoaded: true, 
	/**
	 * Alert
	 * @param text
	 * @param option
	 * @returns {{}|$}
	 */
	alert : function(text, option) {
		let aSync = $.Deferred();
		let aOptions = {
			type : null,
			title : null,  
			input : null,
			validator : null,
			width : '',   
			select : '',
			focus : '',
			showIcon : true
		};
		let gOptions = $.extend(aOptions,option);
		gOptions.allowOutsideClick = true;
		if(gOptions.type === 'S') {gOptions.type = 'success'; gOptions.showIconType = 'success';}
		else if(gOptions.type === 'I') {gOptions.type = 'info'; gOptions.showIconType = 'info';}
		else if(gOptions.type === 'C') {gOptions.type = 'confirm'; gOptions.showIconType = 'warning'; gOptions.allowOutsideClick = false;}
		else if(gOptions.type === 'W') {gOptions.type = 'warning'; gOptions.showIconType = 'warning';}
		else if(gOptions.type === 'E') {gOptions.type = 'error'; gOptions.showIconType = 'error';}
		else {gOptions.type = 'info'; gOptions.showIconType = 'info';}
		gOptions.style = NsfMessage.AlertStyle(gOptions.type);

		gOptions.showConfirmButton = true;
		gOptions.width = (gOptions.width == '' ? '30rem' : gOptions.width);

		if(gOptions.type == 'confirm'){ gOptions.showCancelButton = true; }
		else{ gOptions.showCancelButton = false; }

		setTimeout(function() {
			Swal.fire({
			    icon : (gOptions.showIcon === true ? gOptions.showIconType : ''),
				title : gOptions.style.title,
				html : '<strong>' + text + '</strong>', 
				input       : gOptions.input,
				inputValidator : gOptions.validator,
				showCancelButton: gOptions.showCancelButton,
				allowOutsideClick : gOptions.allowOutsideClick,
				confirmButtonText : '확인',
				cancelButtonText : '취소', 
				showCloseButton : true,
				showConfirmButton : gOptions.showConfirmButton,
				width : gOptions.width,
				position : 'center',
				allowEnterKey : true,
				allowEscapeKey : true,
				buttonsStyling    : true,
				preConfirm : (gOptions.preConfirm == null ? null : gOptions.preConfirm),
				willOpen : function() { 
				},
				didClose : function(){ 
				}
			}).then(function(response) {
				if(gOptions.select != '') NsfMessage.focusSelect(gOptions.select);
				if(gOptions.focus != '') NsfMessage.$(gOptions.focus).focus();
				if(response.value) aSync.resolve(response.value);
				else aSync.resolve(false);
			})
		}, 100); 
		return aSync;
	},
	/**
	 * Alert Style
	 * @param type
	 * @returns {{color: string, cls: string, type: string, title: string}}
	 * @constructor
	 */
	AlertStyle : function(type){
		let viewData = null, rtnObj = {type:'',title:'',cls:'',color:''};
		if(type === 'success') viewData = new Array('success','성공｜Success');
		else if(type === 'info') viewData = new Array('success','알림｜Info');
		else if(type === 'confirm') viewData = new Array('success','확인｜Confirm');
		else if(type === 'warning') viewData = new Array('success','경고｜Warning');
		else if(type === 'error') viewData = new Array('success','오류｜Error');
		else viewData = new Array('','메세지｜Message');
		rtnObj.type = viewData[0];
		rtnObj.title = viewData[1];
		return rtnObj;
	}, 
	confirm: function(msg) {
		return NsfMessage.alert(msg, {type:"C"});
	},
	error: function(msg) {
		if ((/nsfj.mvc.exception.InvalidSessionException/).test(msg)) {
			NsfMessage.alert('This Serivce is required that login.\nPlease login.!!!!!');

			let url = window.parent.parent.location.href;

			if(url.indexOf('localhost') == -1 || url.indexOf('127.0.0.1') == -1){
				if(url.indexOf('?dev') < 0){
					NsfPopup.loginPopup();
				} else {
					let mainUrl = 'https://www.scienceplatform.or.kr/sitelogin/gj/login';
					window.parent.parent.parent.location.href = mainUrl;
				}
			}else{
				NsfPopup.loginPopup();
			}


		} else if ((/^{/).test(msg)) {
			NsfMessage.alert(JSON.parse(msg).exception, {type:'E'});
		} else {
			jQuery('#NsfMessage #content').html(msg);
			jQuery('#NsfMessage').dialog('open');
		}
	},
}

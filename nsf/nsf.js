if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () {};

var Nsf = {
	isLoaded: true,
	contextRoot: "/wisen.kepid",
	isPopup: false,
	width: 0,
	height: 0,
	minWidth: 500,
	minHeight: 100,
	offsetWidth: 21,
	offsetHeight: 40,
	render: function() {  
		jQuery(".nsf-btnbar button").wrap("<a href=\"#\" onclick=\"return false;\"><label></label></a>");

		// 화면 Resize
		jQuery(window).bind("resize", function() {
			var width = jQuery(window).width() - 1;
			var height = jQuery(window).height();
//			var height = jQuery(window).height() - 11;

			if (width == Nsf.width && height == Nsf.height) return;
			//if (width <= Nsf.width || height  <= Nsf.height) return;
			Nsf.width = width;
			Nsf.height = height;

			Nsf.resize();
		}).trigger("resize");

		jQuery(window).trigger("resize");
	},
	event: function() {
		// 버튼바에 있는 버튼의 Active 활성화
		jQuery(".nsf-btnbar button").hover(
		function(e) {
			if (jQuery(this).parent().is("label")) jQuery(this).parent().addClass("nsf-btnbar-a-label");
			if (jQuery(this).parent().parent().is("a")) jQuery(this).parent().parent().addClass("nsf-btnbar-a");
		},
		function(e) {
			if (jQuery(this).parent().is("label")) jQuery(this).parent().removeClass("nsf-btnbar-a-label");
			if (jQuery(this).parent().parent().is("a")) jQuery(this).parent().parent().removeClass("nsf-btnbar-a");
		});

		// 조회 조건 필드에서 엔터키 입력시 자동 조회
		if (NsfUtil.method.exist("fSearch")) {
			jQuery(".nsf-form-search :text, .nsf-form-search select").on("keypress", function(e) {
				if (13 == e.which){
					fSearch();

					return false;
				}
			});
		}

		// 팝업의 텍스트 선택시 이전값 저장(팝업 change event시 매칭값 없으면 이전값으로 복원)
		jQuery(":text").on("focus", function() {
			beforeValue = jQuery(this).val();
		});
	},
	resize: function() {
		var width = Nsf.width;
		var height = Nsf.height;

		var sectionWidth = Nsf.minWidth > width ? Nsf.minWidth : width;

		jQuery(".nsf-section, .nsf-section-resize").outerWidth(sectionWidth);

		if (NsfUtil.method.exist("fResizePage") || NsfUtil.method.exist("fResizePageHeight")) {
			var sectionHeight = 0;
			jQuery(".nsf-section:visible").each(function() {
				sectionHeight = sectionHeight + jQuery(this).outerHeight();
			});
			jQuery(".nsf-section-resize:visible").each(function() {
				if (null != jQuery(this).attr("additionHeight"))
					sectionHeight = sectionHeight + parseInt(jQuery(this).attr("additionHeight"));
			});
			var sectionCnt = jQuery(".nsf-section-resize:visible").length;
			if (0 < sectionCnt) {
				var sectionResize = (height - sectionHeight) / sectionCnt;
				sectionResize = 150 > sectionResize ? 150 : sectionResize;
				jQuery(".nsf-section-resize:visible").outerHeight(sectionResize);

				jQuery(".nsf-section-resize:visible").each(function() {
					if (null != jQuery(this).attr("additionHeight"))
						jQuery(this).height(sectionResize + parseInt(jQuery(this).attr("additionHeight")));
				});
			}
		} 
		Nsf.width = width;
		Nsf.height = height;

		if (NsfUtil.method.exist("fResizePage")) fResizePage();
		if (NsfUtil.method.exist("fResizePageWidth")) fResizePageWidth(width);
		if (NsfUtil.method.exist("fResizePageHeight")) fResizePageHeight(height);
	}, 
} 

jQuery(document).ready(function() { 

	if (NsfUtil.method.exist("fInitBefore")) fInitBefore();
	if (NsfUtil.method.exist("fInitPage")) fInitPage(); 

	Nsf.render();
	Nsf.event();

	if (NsfUtil.method.exist("fInitAfter")) fInitAfter();
});
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
	select: {
		append: function(obj, code, text, def) {
			if (def)
				jQuery(obj).append(jQuery(document.createElement("option")).attr("value", code).attr("selected", true).text(text));
			else
				jQuery(obj).append(jQuery(document.createElement("option")).attr("value", code).text(text));
			}, 
	},
	field: { 
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
	},
}

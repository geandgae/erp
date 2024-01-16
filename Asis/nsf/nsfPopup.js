/**
 * ============================================================================
 * Nsf plugin
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
		// 폼 엘리먼트 수동 이동 처리
//		jQuery(".nsf-form-search ul").sortable();
//		jQuery(".nsf-form ul").sortable();

		jQuery(".nsf-btnbar button").wrap("<a href=\"#\"><label></label></a>");

		// 화면 Resize
		jQuery(window).bind("resize", function() {
			var width = jQuery(window).width();
			var height = jQuery(window).height();
//			var height = jQuery(window).height() - 11;

			if (width == Nsf.width && height == Nsf.height) return;

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

		/*
		var hasScrollbar = jQuery("body").outerHeight() > jQuery(window).height();
		if (! hasScrollbar) {
			hasScrollbar = 400 > width ? true : false;
		}
		if (hasScrollbar) jQuery("body").css("overflow", "auto");
		else jQuery("body").css("overflow", "hidden");
		if (hasScrollbar) sectionWidth = sectionWidth - 16;
		*/
		Nsf.width = width;
		Nsf.height = height;

		if (NsfUtil.method.exist("fResizePage")) fResizePage();
		if (NsfUtil.method.exist("fResizePageWidth")) fResizePageWidth(width);
		if (NsfUtil.method.exist("fResizePageHeight")) fResizePageHeight(height);
	}
};

jQuery(document).ready(function() {
	jQuery("head").append("<script type=\"text/javascript\" src=\"" + Nsf.contextRoot + "/nsf/nsf.message.js\"></script>");
	jQuery("head").append("<script type=\"text/javascript\" src=\"" + Nsf.contextRoot + "/nsf/nsf.request.js\"></script>");
	jQuery("head").append("<script type=\"text/javascript\" src=\"" + Nsf.contextRoot + "/nsf/nsf.popup.js\"></script>");
	jQuery("head").append("<script type=\"text/javascript\" src=\"" + Nsf.contextRoot + "/nsf/nsf.util.js\"></script>");
	jQuery("head").append("<script type=\"text/javascript\" src=\"" + Nsf.contextRoot + "/nsf/nsf.util.jqgrid.js\"></script>");
	jQuery("head").append("<script type=\"text/javascript\" src=\"" + Nsf.contextRoot + "/nsf/nsf.info.js\"></script>");
	jQuery("head").append("<script type=\"text/javascript\" src=\"" + Nsf.contextRoot + "/nsf/json2.js\"></script>");
	jQuery("head").append("<script type=\"text/javascript\" src=\"" + Nsf.contextRoot + "/nsf/jquery.blockUI.js\"></script>");


	if (NsfUtil.method.exist("fInitBefore")) fInitBefore();
	if (NsfUtil.method.exist("fInitPage")) fInitPage();

	Nsf.render();
	Nsf.event();

	if (NsfUtil.method.exist("fInitAfter")) fInitAfter();
});

// ]]>

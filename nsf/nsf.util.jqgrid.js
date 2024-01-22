/**
 * ============================================================================
 * Nsf util for jqGrid plugin
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

var NsfUtiljqGrid = {
	isLoaded: true,
	getLastRowId: function(grid) {
		return jQuery(grid+">tbody>tr.jqgrow:last")[0].rowIndex;
	},
	getAllData: function(grid) {
		var rowdata = [];
		var ids = jQuery(grid).jqGrid("getDataIDs");
		for (var i=0; i<ids.length; i++) {
			rowdata[i] = jQuery(grid).getRowData(ids[i]);
		}
		return rowdata;
	},
	getCell: function(grid, rowId, name) {
		return jQuery(grid).jqGrid("getCell", rowId, name);
	},
	setCell: function(grid, rowId, name, value) {
		"" == value ? jQuery(grid).jqGrid("setCell", rowId, name, null) : jQuery(grid).jqGrid("setCell", rowId, name, value);
	},
	bind: function(grid, form) {
		jQuery(form + " .nsf-param").each(function() {
			jQuery(this).live("change", function() {
				var rowId = jQuery(grid).getGridParam("selrow");
				if ("" == NsfUtiljqGrid.getCell(grid, rowId, "editFlag")) NsfUtiljqGrid.setCell(grid, rowId, "editFlag", "U");

				NsfUtiljqGrid.setCell(grid, rowId, jQuery(this).attr("name"), jQuery(this).val());
			});
		});
	},
	hideRow: function(grid, rowId) {
		var rowdata = jQuery(grid).getRowData(rowId);
		if ("" == rowdata.editFlag) jQuery(grid).jqGrid("setCell", rowId, "editFlag", "D");
		if ("U" == rowdata.editFlag) jQuery(grid).jqGrid("setCell", rowId, "editFlag", "D");
		if ("C" == rowdata.editFlag) jQuery(grid).jqGrid("setCell", rowId, "editFlag", null);

		jQuery(grid + " #"+rowId).hide();
		jQuery(grid).jqGrid("resetSelection");
	},
	colIndex:function(grid,colname){
	    var colModel = grid.getGridParam("colModel");
	    for(var i=0;i<colModel.length;i++){
	        if(colModel[i].name == colname) return i;
	    }
	},
	firstColIndex:function(grid){
	    var colModel = grid.getGridParam("colModel");
	    for(var i=0;i<colModel.length;i++){
	        if(colModel[i].hidden == false && colModel[i].editable == true) return i;
	    }
	},
	nextRow:function(grid,selrow){
		var next = false;
		var lastrowid;
		var ids = grid.getDataIDs();
	    for(var i=0;i<ids.length;i++){
	    	if(next == true) return ids[i];
	    	if(ids[i] == selrow){
	    		if(i == ids.length - 1){
	    			return lastrowid;
	    		}
	    		else{
	                next = true;
	    		}
	    	}
	    	lastrowid = ids[i];
	    }
	},
	box: {
		id: function(grid) {
			var id = "#gbox_" + grid.replace("#", "");
			return id;
		},
		css: function(grid, name, value) {
			var box = NsfUtil.jqgrid.box.id(grid);
			if (null == value) return jQuery(box).css(name);

			jQuery(box).css(name, value);
		},
		show: function(grid, effect, option, callback) {
			jQuery(NsfUtil.jqgrid.box.id(grid)).show(effect, option, callback);
		},
		hide: function(grid, effect, option, callback) {
			jQuery(NsfUtil.jqgrid.box.id(grid)).hide(effect, option, callback);
		},
		hideTitle: function(grid) {
			jQuery(NsfUtil.jqgrid.box.id(grid)).find(".ui-jqgrid-titlebar").css("display", "none");
		}
	},
	form: {
		get: function(grid, form) {
			return jQuery(NsfUtil.jqgrid.box.id(grid)).find("#divClonePanel").find(form);
		},
		append: function(grid, obj) {
			var id = NsfUtil.jqgrid.box.id(grid);
			//jQuery(grid).find(".ui-jqgrid-hdiv").before(obj);
			if (! jQuery(id).find("#divClonePanel").is("*")) {
				//jQuery("<div id=\"divClonePanel\" class=\"ui-widget-content\"><input type=\"hidden\" id=\"crdFlag\"/></div>").insertAfter(jQuery(id).find(".ui-jqgrid-view"));
				//jQuery(id).find(".ui-jqgrid-hdiv").prepend("<div id=\"divClonePanel\" class=\"ui-widget-content\"><input type=\"hidden\" id=\"crdFlag\"/></div>");
				jQuery(id).append("<div id=\"divClonePanel\"></div>");
			}
			jQuery(id).find("#divClonePanel").append(obj);
		},
		toggle: function(grid, form, callback) {
			var id = NsfUtil.jqgrid.box.id(grid);

			if ("none" == jQuery(id).find(form).css("display")) {
				NsfUtil.jqgrid.resizeHeight(grid, jQuery(id).find(form).height());
				jQuery(id).find(form).show("blind", {}, function() {
					if (null != callback) callback();
				});

			} else {
				jQuery(id).find(form).hide("blind", {}, function() {
					NsfUtil.jqgrid.resizeHeight(grid);
					if (null != callback) callback();
				});
			}
		}
	},
	nav: {
		pager: {
			create: function(gridnav, event) {
				var data = "<td id=\"first\" class=\"ui-pg-button ui-corner-all ui-state-disabled\">"
						 + "<span class=\"ui-icon ui-icon-seek-first\"></span>"
						 + "</td>"
						 + "<td id=\"prev\" class=\"ui-pg-button ui-corner-all ui-state-disabled\">"
						 + "<span class=\"ui-icon ui-icon-seek-prev\"></span>"
						 + "</td>"
						 + "<td style=\"width: 4px;\" class=\"ui-pg-button ui-state-disabled\" style\"width:4px;\">"
						 + "<span class=\"ui-separator\"></span>"
						 + "</td>"
						 + "<td dir=\"ltr\">"
						 + "Page <input id=\"cur\" type=\"text\" role=\"textbox\" value=\"0\" maxlength=\"7\" size=\"2\" class=\"ui-pg-input ui-state-disabled\" readonly> / <span id=\"sp_1\">0</span>"
						 + "</td>"
						 + "<td style=\"width: 4px;\" class=\"ui-pg-button ui-state-disabled\" style\"width:4px;>"
						 + "<span class=\"ui-separator\"></span>"
						 + "</td>"
						 + "<td id=\"next\" class=\"ui-pg-button ui-corner-all ui-state-disabled\">"
						 + "<span class=\"ui-icon ui-icon-seek-next\"></span>"
						 + "</td>"
						 + "<td id=\"last\" class=\"ui-pg-button ui-corner-all ui-state-disabled\">"
						 + "<span class=\"ui-icon ui-icon-seek-end\"></span>"
						 + "</td>"
						 + "<td style=\"width: 4px;\" class=\"ui-pg-button ui-state-disabled\" style\"width:4px;>"
						 + "<span class=\"ui-separator\"></span>"
						 + "</td>"
						 + "<td dir=\"ltr\">"
						 + "Record <input id=\"rec\" type=\"text\" role=\"textbox\" value=\"30\" maxlength=\"7\" size=\"2\" class=\"ui-pg-input ui-state-disabled\" readonly> (0 is all)"
						 + "</td>"
						 + "<input type=\"hidden\" id=\"page\"/>"
						 + "<input type=\"hidden\" id=\"total\"/>"
						 + "<input type=\"hidden\" id=\"records\"/>";

				var root = jQuery(gridnav).find(gridnav + "_center").find("tr");
				jQuery(root).append(data);

				jQuery(root).find("td").mouseover(function() {
					if ("" == jQuery(this).attr("id")) return;
					if (jQuery(this).hasClass("ui-state-disabled")) return;

					jQuery(this).addClass("ui-state-hover").css("cursor", "pointer");
				}).mouseout(function() {
					if ("" == jQuery(this).attr("id")) return;
					if (jQuery(this).hasClass("ui-state-disabled")) return;

					jQuery(this).removeClass("ui-state-hover").css("cursor", "dafault");
				});

				jQuery(root).find(".ui-icon").click(function() {
					if (jQuery(this).parent().hasClass("ui-state-disabled")) return false;

					var id = jQuery(this).parent().attr("id");
					if ("first" == id) {
						jQuery(root).find("#cur").val(1);
						event(1);
					} else if ("prev" == id) {
						jQuery(root).find("#cur").val(parseInt(jQuery(root).find("#page").val())-1);
						event(parseInt(jQuery(root).find("#page").val()) - 1);
					} else if ("next" == id) {
						jQuery(root).find("#cur").val(parseInt(jQuery(root).find("#page").val())+1);
						event(parseInt(jQuery(root).find("#page").val()) + 1);
					} else if ("last" == id) {
						jQuery(root).find("#cur").val(parseInt(jQuery(root).find("#total").val()));
						event(parseInt(jQuery(root).find("#total").val()));
					}
				});

				jQuery(root).find("#cur").keypress(function(e) {
					return NsfEvent.number.keypress(e);
				});
				jQuery(root).find("#cur").change(function(e) {
					if (parseInt(jQuery(this).val()) > parseInt(jQuery(root).find("#total").val()) || parseInt(jQuery(this).val()) == 0) {
						jQuery(this).val(jQuery(root).find("#page").val());
						return;
					}
					event();
				});
				jQuery(root).find("#rec").keypress(function(e) {
					return NsfEvent.number.keypress(e);
				});
				jQuery(root).find("#rec").change(function(e) {
					if ("" == jQuery(this).val()) jQuery(this).val("0");
					event();
				});
			},
			refresh: function(gridnav, page, total, records) {
				var root = jQuery(gridnav).find(gridnav + "_center").find("tr");

				if (1 == page) {
					jQuery(root).find("#first").addClass("ui-state-disabled");
					jQuery(root).find("#prev").addClass("ui-state-disabled");
				} else {
					jQuery(root).find("#first").removeClass("ui-state-disabled");
					jQuery(root).find("#prev").removeClass("ui-state-disabled");
				}
				if (page == total) {
					jQuery(root).find("#next").addClass("ui-state-disabled");
					jQuery(root).find("#last").addClass("ui-state-disabled");
				} else {
					jQuery(root).find("#next").removeClass("ui-state-disabled");
					jQuery(root).find("#last").removeClass("ui-state-disabled");
				}
				if (0 == records) {
					jQuery(root).find("#first").addClass("ui-state-disabled");
					jQuery(root).find("#prev").addClass("ui-state-disabled");
					jQuery(root).find("#next").addClass("ui-state-disabled");
					jQuery(root).find("#last").addClass("ui-state-disabled");

					jQuery(root).find("#cur").val(page).addClass("ui-state-disabled").attr("readonly", true);
					jQuery(root).find("#rec").addClass("ui-state-disabled").attr("readonly", true);
				} else {
					jQuery(root).find("#cur").val(page).removeClass("ui-state-disabled").attr("readonly", false);
					jQuery(root).find("#rec").removeClass("ui-state-disabled").attr("readonly", false);
				}

				jQuery(root).find("#sp_1").text(total);

				jQuery(root).find("#page").val(page);
				jQuery(root).find("#total").val(total);
				jQuery(root).find("#records").val(records);
			},
			page: function(gridnav, value) {
				var root = jQuery(gridnav).find(gridnav + "_center").find("tr");

				if (null == value) return jQuery(root).find("#cur").val();

				jQuery(root).find("#cur").val(value);
			},
			record: function(gridnav, value) {
				var root = jQuery(gridnav).find(gridnav + "_center").find("tr");

				if (null == value) return jQuery(root).find("#rec").val();

				jQuery(root).find("#rec").val(value);
			}
		}
	},
	getForm: function(grid, form) {
		var gridId = NsfUtil.jqgrid.box.id(grid);
		return jQuery(gridId).find("#divClonePanel").find(form);
	},
	appendForm: function(gridId, obj) {
		var grid = NsfUtil.jqgrid.box.id(gridId);
		//jQuery(grid).find(".ui-jqgrid-hdiv").before(obj);
		if (! jQuery(grid).find("#divClonePanel").is("*")) {
			jQuery("<div id=\"divClonePanel\" class=\"ui-widget-content\"><input type=\"hidden\" id=\"crdFlag\"/></div>").insertAfter(jQuery(grid).find(".ui-jqgrid-view"));
		}
		jQuery(grid).find("#divClonePanel").append(obj);
	},
	toggleForm: function(gridId, form) {
		var grid = NsfUtil.jqgrid.box.id(gridId);

		if ("none" == jQuery(grid).find(form).css("display")) {
			jQuery(grid).find(form).css("display", "");
		} else {
			jQuery(grid).find(form).css("display", "none");
		}
	},
	toggleCRD: function(gridId, form, flag) {
		var grid = NsfUtil.jqgrid.box.id(gridId);

		var showFlag = false;

		if ("none" == jQuery(grid).find(form).css("display")) {
			if ("Q" == flag) {
				if (null == jQuery(gridId).getGridParam("selrow")) {
					alert("sel");
					return;
				}
			}

			showFlag = true;
		} else {
			if ("N" == flag) {
				if ("Q" == NsfUtil.jqgrid.crdFlag(gridId)) {
					showFlag = true;
				}
			} else {
				if ("N" == NsfUtil.jqgrid.crdFlag(gridId)) {
					showFlag = true;
				}
			}
		}

		NsfUtil.jqgrid.crdFlag(gridId, flag);
		if ("S" == flag) {
			NsfUtil.jqgrid.crdFlag(gridId, "Q");
		} else {
			if (showFlag) {
				NsfUtil.field.clear(jQuery(grid).find(form));
				jQuery(grid).find(form).css("display", "");
			} else jQuery(grid).find(form).css("display", "none");
		}

		return "none" == jQuery(grid).find(form).css("display") ? true : false;
	},
	crdFlag: function(grid, flag) {
		var box = NsfUtil.jqgrid.box.id(grid);

		if (null == flag) {
			return jQuery(box).find("#divClonePanel").find("#crdFlag").val();
		}

		jQuery(box).find("#divClonePanel").find("#crdFlag").val(flag);
	},
	width: function(grid, width) {
		var box = NsfUtil.jqgrid.box.id(grid);

		if (null == width) return jQuery(box).attr("gridWidth");

		jQuery(box).attr("gridWidth", width);
	},
	height: function(grid, height) {
		var box = NsfUtil.jqgrid.box.id(grid);

		if (null == height) return jQuery(box).attr("gridHeight");

		jQuery(box).attr("gridHeight", height);
	},
	resizeHeight: function(grid, offset) {
		var box = NsfUtil.jqgrid.box.id(grid);

		var height = NsfUtil.jqgrid.height(grid);
		if (null == offset)
			jQuery(grid).setGridHeight(height-jQuery(box).find("#divClonePanel").height());
		else
			jQuery(grid).setGridHeight(height-jQuery(box).find("#divClonePanel").height()-offset);
	},
	getExcelHeader: function(grid, ynHid) {
		if(null == grid) return false;
		// hidden 필드 값을 가져올것인지 여부
		// true - hidden 필드 가져옴, false - hidden 필드 가져오지 않음
		if(null == ynHid) ynHid = false;

		// 그리드의 멀티셀렉트 여부에 따라 가져오는 셀 위치가 달라짐
		var multiselect = grid.jqGrid('getGridParam','multiselect');

		// 그리드의 colNames를 배열값으로 가져옴
		var vColNames = grid.jqGrid('getGridParam','colNames');

		// 그리드의 colModel을 배열값으로 가져옴
		var vColModel = grid.jqGrid('getGridParam','colModel');

		var excelArr = new Array();

		var i=1;
		if(multiselect) i=3;

		// 필드 수만큼 배열에 필드명과 필드id 삽입
		for(i;i<Number(vColNames.length);i++){
//			alert(vColModel[i].index);
			if(!ynHid){
				if(false == vColModel[i].hidden)
					excelArr.push({excelName:vColNames[i], excelId:vColModel[i].index.toUpperCase()});
			}else{
				excelArr.push({excelName:vColNames[i], excelId:vColModel[i].index.toUpperCase()});
			}

		}

		return excelArr;
	},
	downloadExcel: function(gridID, filename, excludeColumns) {
		var mya = jQuery("#" + gridID).getDataIDs(); // Get All IDs
		var data = jQuery("#" + gridID).getRowData(mya[0]); // Get First row to get the
		var exCols = excludeColumns;

		var colNames = jQuery("#" + gridID).jqGrid("getGridParam", "colNames");
		var colModel = jQuery("#" + gridID).jqGrid("getGridParam", "colModel");
		var hiddenIdx = [];

		for (var k = 1; k < colModel.length; k++) {
			if(colModel[k].hidden == true){
				hiddenIdx.push(k);
			}
		}

		for (var k = 1; k < colModel.length; k++) {
			for (var y = 0; y < exCols.length; y++) {
				if(colModel[k].name == exCols[y]){
					hiddenIdx.push(k);
				}
			}
		}

		if(exCols != undefined){
			hiddenIdx = hiddenIdx.concat(exCols);
		}

		if (colNames.length == 0) {
			alert('No Data');
			return true;
		}

		// groupHeaders[y].numberOfColumns
		var html = "<table border=1>";

		var groupHeaders;
		var groupHeaderLen = 0;
		var groupHeaderStart = [];
		var groupHeaderNames = [];
		if(jQuery("#" + gridID).jqGrid("getGridParam", "groupHeader") != null) {
			groupHeaders = jQuery("#" + gridID).jqGrid("getGridParam", "groupHeader").groupHeaders;
			groupHeaderLen = groupHeaders.length;

			if(groupHeaderLen != 0){
				for (var y = 0; y < groupHeaderLen; y++) {
					for (var k = 1; k < colModel.length; k++) {
						if(jQuery.inArray(k, hiddenIdx) == -1){
							if(groupHeaders[y].startColumnName == colModel[k].name){
								groupHeaderStart.push(k);
								k = k + groupHeaders[y].numberOfColumns;
								break;
							}
						}
					}
				}
			}

			var gIdx = 0;
			html = html + "<tr>";
			for (var k = 1; k < colNames.length; k++) {
				if(jQuery.inArray(k, hiddenIdx) == -1){
					if(jQuery.inArray(k, groupHeaderStart) == -1){
						html = html + "<th rowspan=2>" + colNames[k] + "</th>";
						groupHeaderNames.push(colNames[k]);
					}else{
						html = html + "<th colspan="+ groupHeaders[gIdx].numberOfColumns +">" + groupHeaders[gIdx].titleText + "</th>";
						k = k + groupHeaders[gIdx].numberOfColumns -1;
						gIdx = gIdx + 1;
					}
				}
			}
			html = html + "</tr>"; // Output header with end of line
		}

		html = html + "<tr>";
		for (var k = 1; k < colNames.length; k++) {
			if(jQuery.inArray(k, hiddenIdx) == -1){
				if(jQuery.inArray(colNames[k], groupHeaderNames) == -1){
					html = html + "<th>" + colNames[k] + "</th>";
				}
			}
		}
		html = html + "</tr>"; // Output header with end of line

		for (var k = 1; k < colModel.length; k++) {
			if(jQuery.inArray(k, hiddenIdx) == -1){
				html = html + "<th>" + colModel[k].name + "</th>";
			}
		}
		html = html + "</tr>"; // Output header with end of line
		for (i = 0; i < mya.length; i++) {
			html = html + "<tr>";
			data = jQuery("#" + gridID).getRowData(mya[i]); // get each row
			for (var j = 1; j < colModel.length; j++) {
				if(jQuery.inArray(j, hiddenIdx) == -1){
					html = html + "<td>" + data[colModel[j].name] + "</td>"; // output each Row as
				}
			}
			html = html + "</tr>"; // output each row with end of line
		}
		html = html + "</table>"; // end of line at the end
		html = html.replace(/'/g, '&apos;');

		var frmExcel = document.createElement("form");
		frmExcel.id ="frmExcel";
		frmExcel.name ="frmExcel";
		frmExcel.action = Nsf.contextRoot + "/jsp/excel.jsp";
		frmExcel.method = "post";
		frmExcel.target ="_blank";

		var excelFileName = document.createElement("input");
		excelFileName.type = "hidden";
		excelFileName.id = "excelFileName";
	    excelFileName.name = "excelFileName";

	    var excelExportData = document.createElement("input");
	    excelExportData.type = "hidden";
	    excelExportData.id = "excelExportData";
	    excelExportData.name = "excelExportData";

	    frmExcel.appendChild(excelFileName);
	    frmExcel.appendChild(excelExportData);

	    document.body.appendChild(frmExcel);

	    document.getElementById("excelFileName").value = encodeURI(filename);
		document.getElementById("excelExportData").value = html;
		document.getElementById("frmExcel").submit();

	    jQuery( "#frmExcel" ).remove();

	}
}
//]]>

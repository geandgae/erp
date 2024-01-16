const NsfUtilSBGrid = {
    /**
     * SBGrid 기본 설명 및 paging 관련 기본 변수 처리
     */
    pageInfo : {
        captionHeight : 30, /* 열(컬럼)의 캡션 영역의 높이를 설정합니다. Number(default: 30px) : 50*/
        filterHeight :30, 	/* filterable 속성이 'row' 인 경우 filter가 표시될 행의 높이를 설정합니다. Number(default: 30px) : 50 */
        rowHeight : 22,		/* 데이터 영역에 위치한 행들의 기본 높이값을 설정합니다. Number(default: 30px) : 50 */
        maxRowHeight : 100, /* 모든 행들의 최대 높이값을 설정하는 속성입니다. - fixedRows 속성을 반드시 false로 설정해야 합니다. Number(default: 100px) : 200 */
        headerHeight : 30, 	/* header 행들의 기본 높이값을 설정합니다. Number(default: 30px) : 50 */
        footerHeight : 30,  /* footer 행들의 기본 높이값을 설정합니다. Number(default: 30px) : 50 */
        groupHeight : 30, 	/* group 행들의 높이값을 설정합니다. Number(default: 30px) : 50 */
        detailHeight : 60, 	/* detail 행들의 높이값을 설정합니다. Number(default: 60px) : 50 */
        maxDetailHeight : 300, /* detail 행들의 최대 높이값을 설정합니다. fixedRows 속성을 반드시 false로 설정해야 합니다. Number(default: 300px) : 50 */
        pageSize : 200,
        pageable : {
            pager :{ buttonCount : 5 ,numeric : true, previousNext : true }, // Object pager는  pagerBar 와 같이 사용
            pagerCombo : { listCount : 5 },
            pageSizes :  [20,30,50,100,200,500]
        }

    },
    /**
     * Grid 생성
     * @param dOptions
     * @param gOptions
     * @return {*|null}
     */
    create : function(dOptions, gOptions){
        let _gridTemp = {
            _dsConfig: {
                /** 그리드에 출력될 데이터를 지정합니다. */
                data : dOptions?.data === undefined ? null : dOptions.data,
                /** 데이터의 스키마를 정의한다. */
                schema : dOptions?.schema === undefined ? null : dOptions.schema,
                /**
                 * ajax Object
                 * [ select?: Function | Object ] 검색 결과를 얻기 위한 설정
                 * [ update?: Function | Object ] 변경될 데이터를 저장하기 위한 설정
                 * [ request?: Function ] 데이터를 요청하기 전에 request 정보를 변경한다
                 * [ response?: Function ] 반환된 데이터를 가공한다
                 * [ baseUrl?: string ] 기본 url을 설정한다
                 * [ url?: string ]
                 * [ dataType?: string ] - 'json'타입을 지원합니다
                 * [ loadType?: string ] - 'get'과 'post'의 두가지 입니다.
                 */
                ajax : dOptions?.ajax === undefined ? null : dOptions.ajax,
                /**
                 * 서버에서 페이징을 처리할지 지정 (default : false)
                 * - true : 서버에서 페이징 후 필요한 데이터만 반환
                 * - false : 클라이언트 데이터를 이용해서 페이징 (처음 로드시 모든 데이터를 가져와야 함)
                 */
                serverPaging : dOptions?.serverPaging === undefined ? false : dOptions.serverPaging,
                /** server-paging시 새로운 페이지로 이동할때 기본 페이지의 데이터를 삭제할지 여부. */
                cachePaging : dOptions?.cachePaging === undefined ? false : dOptions.cachePaging,
                /**
                 * 서버에서 소팅을 처리할지 지정 (default : false)
                 * - true : 서버에서 소팅 후 결과 데이터만 반환
                 * - false : 클라이언트 데이터를 이용해서 소팅 (처음 로드시 모든 데이터를 가져와야 함)
                 */
                serverSorting : dOptions?.serverSorting === undefined ? false : dOptions.serverSorting,
                /** 한 페이지에 보여질 행의 개수 */
                pageSize : dOptions?.pageSize === undefined ? NsfUtilSBGrid.pageSize : dOptions.pageSize,
                /** 데이터 로드 시 정렬의 조건을 설정 */
                orders : dOptions?.orders === undefined ? null : dOptions.orders,
                /** 데이터 로드시 필터링 조건을 설정 - filterable : true 설정 후 그리드 컬럼 필드의 filter 설정을 true로 설정해야 사용이 가능합니다. */
                filters : dOptions?.filters === undefined ? null : dOptions.filters,
                /** 집계함수를 설정 array : [{ field: 'string', require:'array ', func: 'function', nullAs : any, value:any, payload:'string', dataType:'string', payloadType:'string' }]*/
                aggregates : dOptions?.aggregates === undefined ? null : dOptions.aggregates,
                /** tree dataSourceConfig 및 columnConfig.tree에 대해 설정하여 트리그리드를 사용할 수 있습니다. dataSourceConfig & columnConfig.tree */
                tree : dOptions?.tree === undefined ? null : dOptions.tree,
            },

            gridConfig :{
                dataSource : this._dsConfig,
                container : gOptions?.container,
                /** Grid SIZE */
                width : gOptions?.width === undefined ? '100%' : gOptions.width, /* 그리드의 너비를 지정 */
                height : gOptions?.height === undefined ? '400px' : gOptions.height, /* 그리드의 높이를 지정 */
                /** SIZE */
                resizable : gOptions?.resize === undefined ? {
                    mode: 'column',
                    minWidth: 10,
                    maxWidth: 200,
                    autoFit: ['caption', 'data']
                } : gOptions.resize, /* resizable 설정 boolean(default:false) : true | false */
                fixedRows : gOptions?.fixedRows === undefined ? true : gOptions.fixedRows, /* 고정된 높이값을 사용할지 여부를 지정합니다. boolean(default:false) : true | false*/
                captionHeight : gOptions?.captionHeight === undefined ? NsfUtilSBGrid.pageInfo.captionHeight : gOptions.captionHeight, /* 열(컬럼)의 캡션 영역의 높이를 설정합니다. Number(default: 30px) : 50*/
                filterHeight : gOptions?.filterHeight === undefined ? NsfUtilSBGrid.pageInfo.filterHeight : gOptions.filterHeight, /* filterable 속성이 'row' 인 경우 filter가 표시될 행의 높이를 설정합니다. Number(default: 30px) : 50 */
                rowHeight : gOptions?.rowHeight === undefined ? NsfUtilSBGrid.pageInfo.rowHeight : gOptions.rowHeight, /* 데이터 영역에 위치한 행들의 기본 높이값을 설정합니다. Number(default: 30px) : 50 */
                maxRowHeight : gOptions?.maxRowHeight === undefined ? NsfUtilSBGrid.pageInfo.maxRowHeight : gOptions.maxRowHeight, /* 모든 행들의 최대 높이값을 설정하는 속성입니다. - fixedRows 속성을 반드시 false로 설정해야 합니다. Number(default: 100px) : 200 */
                headerHeight : gOptions?.headerHeight === undefined ? NsfUtilSBGrid.pageInfo.headerHeight : gOptions.headerHeight, /* header 행들의 기본 높이값을 설정합니다. Number(default: 30px) : 50 */
                footerHeight : gOptions?.footerHeight === undefined ? NsfUtilSBGrid.pageInfo.footerHeight : gOptions.footerHeight, /* footer 행들의 기본 높이값을 설정합니다. Number(default: 30px) : 50 */
                groupHeight : gOptions?.groupHeight === undefined ? NsfUtilSBGrid.pageInfo.groupHeight : gOptions.groupHeight, /* group 행들의 높이값을 설정합니다. Number(default: 30px) : 50 */
                detailHeight : gOptions?.detailHeight === undefined ? NsfUtilSBGrid.pageInfo.detailHeight : gOptions.detailHeight, /* detail 행들의 높이값을 설정합니다. Number(default: 60px) : 50 */
                maxDetailHeight : gOptions?.maxDetailHeight === undefined ? NsfUtilSBGrid.pageInfo.maxDetailHeight : gOptions.maxDetailHeight, /* detail 행들의 최대 높이값을 설정합니다. fixedRows 속성을 반드시 false로 설정해야 합니다. Number(default: 300px) : 50 */
                /** Moving */
                reorderable : gOptions?.maxDetailHeight === undefined ? { row:false, column:true } : gOptions.maxDetailHeight, /* row 및 column의 이동 옵션 설정 boolean(default:false) : true | false */
                freezable : gOptions?.freezable === undefined ? false : gOptions.freezable, /* 시작열(컬럼)과 끝열(컬럼)쪽을 원하는 만큼 틀고정 관련한 속성 설정입니다. reorderable 속성이 true으로 설정되어 있어야 사용할 수 있는 기능입니다. */
                /** Merge */
                mergeRow : gOptions?.mergeRow === undefined ? true : gOptions.mergeRow, /* 행 단위 병합 여부 boolean: true | false */
                mergeColumn : gOptions?.mergeColumn === undefined ? false : gOptions.mergeColumn, /* 열 단위 병합 여부 boolean: true | false */
                /** Rendering */
                virtualRow : gOptions?.virtualRow === undefined ? true : gOptions.virtualRow, /* row 갯수가 많을 경우 한번에 모든 row를 렌더링하지 않고 화면에 보이는 만큼만 렌더링 하는 기능 boolean(default : true) : true | false */
                virtualColumn : gOptions?.virtualColumn === undefined ? false : gOptions.virtualColumn, /* 컬럼 갯수가 많을 경우 한번에 모든 컬럼을 렌더링하지 않고 화면에 보이는 만큼만 렌더링하는 기능 boolean(default : false) : true | false */
                /** Edit */
                editable : gOptions?.editable === undefined ? false : gOptions.editable === true ?
                        {
                            mode : 'incell',                    // 'incell' || 'inline'
                            eventType : 'dblclick',              // 'mouseup' || 'dblclick'
                            immediateValidationCheck : true,    // validation체크 여부
                        }:gOptions.editable, /* 그리드 및 컬럼 편집모드 설정 boolean(default : false) : true | false */
                /** Select & Focus */
                navigatable : gOptions?.navigatable === undefined ? {
                    tabToNextCell:{edit:true},
                    enterToNext: { edit: true, dir: 'right' }
                } : gOptions.navigatable, /* 키보드로 포커스 이동 속성 boolean(default : false): true | false */
                selectable : gOptions?.selectable === undefined ? { rowSelect: true, columnSelect: true, cellSelect: 'cell', selectMode: 'multi' } : gOptions.selectable, /* 선택모드 설정 boolean: true | false */
                hover : gOptions?.hover === undefined || gOptions?.hover === false ? gOptions?.editable === false ? 'row' : 'cell'  : gOptions.hover, /* 마우스 호버시 표현 방법 string(default: cell): 'cell' | 'row */
                /** Paging */
                pageable : gOptions?.pageable === undefined ? null : gOptions.pageable, /* 그리드를 Paging 처리하여 하단 번호를 클릭하여 보다 쉽게 내용 확인을 할 수 있는 기능입니다. boolean(default: false) : true | false object : {buttonCount, numeric, previousNext}  NsfUtilSBGrid.pageInfo.pageable*/
                /** Copy & Paste */
                copyable: gOptions?.copyable === undefined ? { fill: true } : gOptions.copyable, /* copy & paset & drag복사 활성화 여부 boolean: true | false { fill: true }*/
                copyInsert : gOptions?.copyInsert === undefined ? true : gOptions.copyInsert, /* insertRow, appendRow, addRow 시 선택된 행의 데이터를 복사할 지 여부를 지정한다 boolean: true | false false : 비어있는 새 행을 추가한다 (default) true : 현재 선택된 행의 데이터를 복사하여 새로운 행을 추가한다*/
                skipPaste : gOptions?.skipPaste === undefined ? true : gOptions.skipPaste, /* skipPaste인 컬럼은 붙여넣기시 값 변경되지 여부 boolean: true | false */
                /** Column */
                /* 컬럼의 공통 설정을 추가합니다. 기본 style 적용 예정 */
                defaultColumn: gOptions?.defaultColumn === undefined ? {
                    captionCss: 'nsf-status-blue',
                    //rowCss:null,
                    //colCss:'nsf-status-ess',
                } : gOptions.defaultColumn,
                masterColumns:{ /* 공통으로 사용할 컬럼 정보를 지정합니다. 공통으로 사용할 컬럼 정보를 등록해두고, 기본값을 공통컬럼에 등록된 정보를 이용하는 방식입니다.*/
                    'fixed.status': { sortable:false },
                    'fixed.check': {
                        type: 'rowcheck', part: 'fixed', width: 25, captionCheck: true, align: 'center',
                        cellTemplate: '<span class="sbgrid-checkboxgroup"><span class="sbgrid-checkbox {{#if _checked_}}sbgrid-checked{{/if}}"></span></span>'
                    },
                },
                columns : gOptions.columns,
                /** Grouping API 문서참조 columnConfig.groups, columnConfig.groupTitle */
                groupable : gOptions?.groupable === undefined ? false : gOptions.groupable, /* 그룹핑 기능 활성화 boolean: true | false */
                groupAutoOpen : gOptions?.groupAutoOpen === undefined ? false : gOptions.groupAutoOpen, /* 그룹핑 될때 모든 노드를 자동으로 열린상태로 보이게 할지 여부 boolean: true | false */
                /** Sticky */
                showSticky : gOptions?.showSticky === undefined ? false : gOptions.showSticky, /* 스티키 컬럼의 적용 여부 설정 boolean(default : false) : true | false */
                stickyHeader : gOptions?.stickyHeader === undefined ? false : gOptions.stickyHeader, /* 그룹/트리 모드에서 현재 보이는 행의 header가 보이지 않을경우 상단에 표시 여부 boolean: true | false */
                stickyFooter : gOptions?.stickyFooter === undefined ? false : gOptions.stickyFooter, /* 그룹/트리 그리드 행의 footer가 보이지 않을경우 상단에 표시 여부를 설정합니다. boolean: true | false */
                stickyRow : gOptions?.stickyRow === undefined ? false : gOptions.stickyRow, /* sticky로 설정된 row가 현재 뷰에서 보이지 않을 경우 상단/하단에 표시할지 여부. boolean: true | false */
                stickyEdit : gOptions?.stickyEdit === undefined ? false : gOptions.stickyEdit, /* 편집중인 row에 대해서 sticky를 적용할지 여부. boolean: true | false */
                stickyInsert : gOptions?.stickyInsert === undefined ? false : gOptions.stickyInsert, /* 새로 추가된 row에 대해서 sticky를 적용할지 여부. boolean: true | false */
                stickyUpdate : gOptions?.stickyUpdate === undefined ? false : gOptions.stickyUpdate, /* 데이터가 변경된 row에 대해서 sticky를 적용 여부. boolean: true | false */
                stickyDelete : gOptions?.stickyDelete === undefined ? false : gOptions.stickyDelete, /* 삭제된 row에 대해서 sticky를 적용 여부. boolean: true | false */
                /** Sort 그리드 및 컬럼에 정렬방식을 지정 지정합니다. 컬럼에 sortable를 사용하기 위해서는 gridConfig에 먼저 설정을 해주셔야 합니다. */
                sortable : gOptions?.sortable === undefined ? true : gOptions.sortable,  /* 그리드 및 컬럼에 정렬방식을 지정 */
                multiSort : gOptions?.multiSort === undefined ? true : gOptions.multiSort,  /* 여러 컬럼을 동시에 sort 할수 있도록 지정 boolean(default : true) : true | false */
                /** Filtering gridConfig.columns.filter gridConfig.dataSource.filters */
                filterable : gOptions?.filterable === undefined ? false : gOptions.filterable, /* 그리드 필터링 활성화 여부 설정 boolean(default : false) : true | false */
                /** RowHeaders */
                rowHeaders : gOptions?.rowHeaders === undefined ? null : gOptions.rowHeaders, /* fixed-columns에 표시되는 컬럼의 순서를 조정 */
                showRowNo : gOptions?.showRowNo === undefined ? true : gOptions.showRowNo, /* 순번 컬럼의 적용 여부 설정 boolean(default : true) : true | false */
                showCheck : gOptions?.showCheck === undefined ? false : gOptions.showCheck, /* showCheck 속성은 그리드 설정에서 각 행(row)에 체크박스를 추가할지 여부를 결정하는 설정입니다. 이 속성을 사용하면 그리드의 각 행에 체크박스가 생성되며, 사용자는 이를 통해 특정 행을 선택하고 관련된 UI 처리를 수행할 수 있습니다. */
                showStatus : gOptions?.showStatus === undefined ? true : gOptions.showStatus, /* 상태 컬럼의 적용 여부 설정 boolean(default : false) : true | false */
                checkable : gOptions?.checkable === undefined ? false : gOptions.checkable, /* 체크 컬럼 적용 여부 설정 boolean(default : false) : true | false */
                /** Redo / Undo 변경된 데이터와 변경이전 데이터를 보관해야 되므로 메모리를 많이 차지할 수 있습니다 */
                undoable : gOptions?.checkable === undefined ? true : gOptions.checkable, /* undo / redo 기능을 사용할지 지정 boolean(default : false) : true | false */
                /** Style gridConfig.columns.captionCss, gridConfig.columns.placeHolderCss, gridConfig.columns.headerCss, gridConfig.columns.footerCss, gridConfig.columns.colCss */
                rowCss : gOptions?.rowCss === undefined ? null : gOptions.rowCss, /* 각 row마다 css-class를 지정하는 속성 string : '미리정의된 클래스' */
                /** Layout gridConfig.columns.captionLayout */
                panels : gOptions?.panels === undefined ? null : gOptions.panels, /* 그리드 메인 패널 종류와 위치를 지정 array (default) : ['title' , 'tool' , 'group' , 'scroll' , 'pager' , 'status'] */
                toolBar : gOptions?.toolBar === undefined ? null : gOptions.toolBar,  /* 툴바영역에 버튼을 등록 array : ['excel','search'] */
                titleBar : gOptions?.titleBar === undefined ? null : gOptions.titleBar,  /* 타이틀영역에 버튼을 등록 array : ['excel','#toolbar','search'] */
                groupBar : gOptions?.groupBar === undefined ? { left: ['group'], center: ['그룹영역'], right: ['search'] } : gOptions.groupBar,  /* 그룹영역에 버튼을 등록 array : ['excel','#toolbar','search'] */
                pagerBar : gOptions?.pagerBar === undefined ? null : gOptions.pagerBar,  /* 페이징영역에 버튼을 등록 array : ['excel','#toolbar','search']  { left: 'pager', center: 'pagerCombo', right: 'pageSizes' }*/
                statusBar : gOptions?.statusBar === undefined ? null : gOptions.statusBar,  /* status 영역 설정을 할 수 있습니다. array : ['excel'] */
                /** Template gridConfig.columns.cellTemplate, gridConfig.columns.captionTemplate */
                detailTemplate : gOptions?.detailTemplate === undefined ? null : gOptions.detailTemplate, /* detail 기능을 사용할 경우 detail 내용을 표시할 템플릿 string : '#templateId' */
                detailOverflow : gOptions?.detailOverflow === undefined ? null : gOptions.detailOverflow, /* detail-cell의 orderflow 스타일을 지정 string : 'hidden' | 'scroll' | 'auto' */
                detailInit : gOptions?.detailInit === undefined ? null : gOptions.detailInit, /* detail-row 가 만들어질때 초기화가 필요하면 함수를 등록 function : (context)=>{} */
                detailAutoOpen : gOptions?.detailAutoOpen === undefined ? false : gOptions.detailAutoOpen, /* detail이 지정되어 있을 경우, 현재 보이는 row에 대해서 detail을 자동으로 열린 상태로 보이게 할지 여부 설정 boolean(default :false) : true | false */
                /** Scroll */
                wheelDelta : gOptions?.wheelDelta === undefined ? 30 : gOptions.wheelDelta, /* 마우스 휠 스크롤 시, 스크롤 되는 양을 지정하는 속성입니다. Number(default: 30px) : 50 */
                /** ContextMenu (gridConfig/columnConfig).contextMenu,  (gridConfig/columnConfig).contextMenu, columnConfig.captionMenu*/
                contextMenu : gOptions?.contextMenu === undefined ? null : gOptions.contextMenu, /* 그리드 내에서 우클릭으로 컨텍스트 메뉴를 사용할 수 있으며, 환경에 알맞게 커스텀할 수 있습니다. boolean(default: false) : true | false array : 아래 옵션들 참고 */
                /** Command */
                canCommand : gOptions?.canCommand === undefined ? null : gOptions.canCommand, /* 특정 command의 실행 가능 여부를 확인합니다 function*/
                doCommand : gOptions?.doCommand === undefined ? null : gOptions.doCommand, /* command가 실행되면 조건에 따라 어떤 동작을 실행 canCommand에서 false를 return할 경우 doCommand는 동작하지 않습니다 function*/
                /** Extentions - excelExport, */
                excelExport : gOptions?.excelExport === undefined ? null : gOptions.excelExport, /* gridConfig에 설정하여 엑셀 다운로드를 할 수 있습니다 Object*/
                excelImport : gOptions?.excelImport === undefined ? null : gOptions.excelImport, /* gridConfig에 설정하여 엑셀 다운로드를 할 수 있습니다 Object*/
                // handlebarJS를 이용한 CSS선택자를 이용해서 구현하셔도 됩니다.
                emptyTemplate : '<div></div>',
                hideDeleted : gOptions?.hideDeleted === undefined ? false : gOptions.hideDeleted, /* gridConfig에 true // true : status가 delete인 row로 그리드에서 안보임*/

                dataDroppable : gOptions?.dataDroppable === undefined ? false : gOptions.dataDroppable, /* 그리드의 row를 이동하여 다른 Grid에 row를 추가할 수 있습니다. dataDraggable 옵션은 데이터를 전송하는 쪽의 그리드에 설정합니다. */
                dataDraggable : gOptions?.dataDraggable === undefined ? false : gOptions.dataDraggable,

                /** 20240106 버전업 추가 */
                directApplyEdit : gOptions?.directApplyEdit === undefined ? true : gOptions.directApplyEdit, /* 뷰모드에서 특정 컬럼에 대해서 편집가능하도록 설정합니다. 편집 즉시 실제 데이터에 적용됩니다. */
            },
        }
        if(_gridTemp._dsConfig.tree != null){
            //tree
            return null;
        } else {
            //grid set DataConfig
            _gridTemp.gridConfig.dataSource = _gridTemp._dsConfig;// DataSource
            let grid = SBGrid3.createGrid(_gridTemp.gridConfig);
            return grid;
        }
    },
    /**
     * Grid 가로 조정
     * @param grid
     * @param section
     * @param width
     */
    setWidth: function (grid, section ,width){
        if(grid != undefined){
            if(width !== undefined){
                SBGrid3.setSize(grid, width+"px", "");
            } else {
                if(typeof section === 'number' || typeof  section === 'string'){
                    SBGrid3.setSize(grid, section+"px", "");
                } else {
                    SBGrid3.setSize(grid, section.width()-Nsf.offsetWidth+"px", "");
                }
            }
        }
    },
    /**
     * Grid 높이 조정
     * @param grid
     * @param section
     * @param val
     */
    setHeight: function (grid, section, val){
        if(grid != undefined){
            if(val !== undefined){
                SBGrid3.setSize(ele, "", val+"px")
            } else {
                var height;
                if(typeof section === 'number' || typeof  section === 'string'){
                    height = section;
                } else {
                    height = section.height();
                    if(section.find('#grid .nsf-form-search').length> 0){
                        height = height - (section.find('#grid .nsf-form-search').is(':visible') ? section.find("#grid .nsf-form-search").outerHeight() : 0);
                    }
                    if(section.find('#grid .nsf-btnbar').length > 0){
                        height = height - section.find('#grid .nsf-btnbar').outerHeight();
                    }
                    if(section.find('#grid .nsf-mini-vertical').length > 0){
                        height = height - section.find('#grid .nsf-mini-vertical').outerHeight();
                    }

                    // } else if(grid === 'sbGridD1'){
                    //     height = jQuery('#sectionB2').height();
                    //     height = height - jQuery('#sectionB2 #grid .nsf-btnbar').outerHeight();
                    // } else if(grid === 'sbGridR1'){
                    //
                    // }
                    height = height - Nsf.offsetHeight;
                }

                SBGrid3.setSize(grid, '', height+'px')
            }
        }
    },
    /**
     * SBGrid Editable true / false
     * @param grid
     * @param value

    setGridEditable : function(grid, value){
        SBGrid3.editable(grid, value);
    },*/
    /**
     * add row
     * @param grid
     * @param rowData
     * 예제 : SBGrid3.addRow(sbGridM1, '', {});
     */
    addRow: function(grid, rowData){
        let allData = SBGrid3.getAllItems(grid);
        if(allData.length === 0){
            //ADD Row - empty grid 상태 첫번째 row add
            NsfUtilSBGrid.firstAddRow(grid, '', rowData);
        } else if(SBGrid3.getFocusedKey(grid) === undefined){
            //Insert Row - grid row no focus 상태 - 첫번째 row add
            NsfUtilSBGrid.insertRow(grid, SBGrid3.getRowByIndex(grid, 0).key, rowData);
        } else {
            //Append Row - grid row focus 상태 - 선택된 row 밑에 add
            NsfUtilSBGrid.appendRow(grid, SBGrid3.getFocusedKey(grid), rowData);
        }
    },
    /**
     * 빈 Grid add row
     * @param grid
     * @param key
     * @param rowData
     */
    firstAddRow : function(grid, key, rowData){
        SBGrid3.addRow(grid, key, rowData);
    },
    /**
     * 특정 row 상단에 add row
     * @param grid
     * @param key
     * @param rowData
     * 예제 : SBGrid3.insertRow(sbGridM1, SBGrid3.getFocusedKey(sbGridM1), {});
     */
    insertRow : function(grid, key, rowData){
        SBGrid3.insertRow(grid, key, rowData);
    },
    /**
     * 특정 row 하단에 add row
     * @param grid
     * @param key
     * @param rowData
     * 예제 : SBGrid3.appendRow(sbGridM1, SBGrid3.getFocusedKey(sbGridM1), {});
     */
    appendRow : function(grid, key, rowData){
        SBGrid3.appendRow(grid, key, rowData);
    },
    /**
     * 선택된 Row 또는 특정 Row Delete
     * @param grid
     * @param key
     */
    deleteRow: function(grid, key){
    	if(key === undefined || key === ''){
            SBGrid3.deleteRow(grid, SBGrid3.getFocusedKey(grid));
        } else {
            SBGrid3.deleteRow(grid, key);
        }
    },
    /**
     * Checkbox 선택 Row Delete
     * @param grid
     * @param key
     */
    deleteChkRows: function(grid, key){
    	if(key === undefined || key === ''){
            SBGrid3.deleteRows(grid, SBGrid3.getCheckedKeys(grid));
        } else {
            SBGrid3.deleteRows(grid, key);
        }
    },
    /**
     * Grid Cell 선택 체크
     * @param grid
     * @return {boolean}
     */
    isSelectedCell: function (grid){
        return SBGrid3.getValue(grid, SBGrid3.getFocusedKey(grid)) === undefined ? false : true;
    },
    /**
     * 특정 여러개 Row Delete
     * @param grid
     * @param keys

    deleteRows: function(grid, keys){
        if(keys === undefined || keys === ''){
            // 현재 Row 만 삭제
            SBGrid3.deleteRows(grid, SBGrid3.getFocusedKey(grid));
        } else {
            // 배열 형태 Rows 삭제
            SBGrid3.deleteRows(grid, keys);
        }
    },*/
    /**
     * column의 width를 caption,data의 width로 적용합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param column: [필수](object) 컬럼 객체
     * @param option: [필수](string[])옵션
     * @param ['data'] : 데이터 영역만 autoFit적용
     * @param ['caption']: 캡션 영역만 autoFit적용
     * @param [minWidth]: (number): 최소 너비
     * @param [maxWidth]: (number): 최대 너비

    autoFit: function (grid, column, option, minWidth, maxWidth){
        SBGrid3.autoFit(grid, column, ['data', 'caption'], 100, 300);
    },*/
    /**
     * 입력받은 데이터 개수 만큼 그리드 최하단에 다음 행을 추가하고, 입력받은 데이터를 추가된 행에 표시합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param rowData: [필수](object[]) 추가할 행 데이터 객체 배열

    bulkAppend : function (grid, rowData){
        SBGrid3.bulkAppend(grid, rowData);
    },*/
    /**
     * 기존 변경 내역을 삭제합니다.
     * @param grid: [필수](object) 그리드 객체

    clearSaveData: function (grid){
        SBGrid3.clearSaveData(grid);
    },*/
    /**
     * key에 해당하는 row의 특정컬럼을 편집모드로 변경합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param key: [필수](any) row key
     * @param column: [필수](object) 컬럼 객체
     * @param isEdit: (boolean) 편집 모드 여부
     */
    addRowColumnEditable : function (grid, column){
        SBGrid3.columnEditable(grid, SBGrid3.getFocusedKey(grid), column, true);
    },
    /**
     * key에 해당하는 row의 특정컬럼을 편집모드로 변경합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param key: [필수](any) row key
     * @param column: [필수](object) 컬럼 객체
     * @param isEdit: (boolean) 편집 모드 여부

    columnEditable : function (grid, key, column, isEdit){
        SBGrid3.columnEditable(grid, key, column, isEdit);
    },*/
    /**
     * column의 visible을 변경합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param column: [필수](object) 컬럼 객체
     * @param visible: (boolean)컬럼 표시 여부

    columnVisible: function (grid, column, visible){
        SBGrid3.columnVisible(grid, column, visible);
    },*/
    /**
     * 그리드에 로드된 데이터 중에서 조건에 맞는 RowItem을 반환합니다.
     * @param grid [필수](object) 그리드 객체
     * @param column [필수](String) Column 검색컬럼
     * @param value [필수](String) value 검색어
     * @returns {*[]}

    findRows: function(grid, column, value){
        let rtnRow = [];
        if(grid !== undefined && column !== undefined && column !== ''){
            rtnRow = SBGrid3.findRows(grid, function (data, row){return data[column] == value});
        }
        return rtnRow;
    },*/
    /**
     * Command를 발생시킵니다.
     * @param grid: [필수](object) 그리드 객체
     * @param command: [필수](object) 커맨드 객체
     * - command: (string)커맨드 이름
     * - data: (any)데이터

    fireCommand: function (grid, command){
        // grid config에 정의된 { command: 'insert', data: firecommandTestValue }
        SBGrid3.fireCommand(grid, command);
    },*/
    /**
     * 비동기로 Command를 발생시킵니다.
     * @param grid: [필수](object) 그리드 객체
     * @param command: [필수](object) 커맨드 객체
     * - command: (string)커맨드 이름
     * - data: (any)데이터

    fireCommandAsync : function (grid, command){
        // grid config에 정의된 { command: 'insert', data: firecommandTestValue }
        SBGrid3.fireCommandAsync(grid, command);
    },*/
    /**
     * 그리드에 로드된 모든 데이터를 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @return any[]: 로드된 그리드 데이터
     */
    getAllItems: function(grid){
        return SBGrid3.getAllItems(grid);
    },
    /**
     * 체크박스 Checked Rows Return.
     * @param {Object} grid - The grid object to retrieve rows from.
     * @param {number} column - The index of the column to match the value against.
     * @param {*} value - The value to match against the specified column.
     * @returns {Array} An array of rows that match the specified column value.
     */
    getCheckedRows : function (grid, column, value){
        let rtnRow;
        if(grid.config.showCheck && (column === undefined || value === undefined)){
            rtnRow = SBGrid3.getCheckedRows(grid);
        } else {
            rtnRow = SBGrid3.findRows(grid, function (data, row){return data[column] == value});
        }
        return rtnRow;
    },
    /**
     * column의 index로 컬럼 객체를 찾은 후 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param index: [필수](number) 열 인덱스

    getColumn: function (grid, index){
        return SBGrid3.getColumn(grid, index);
    },*/
    /**
     * field 명으로 컬럼 객체를 찾은 후 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param field: [필수](string) 컬럼 필드명
     * @return GridColumn[]: 컬럼 객체

    getColumnByField: function (grid, field){
        return SBGrid3.getColumnByField(grid, field);
    },*/
    /**
     * 그리드의 모든 컬럼을 반환합니다.
     * 여기서 반환되는 컬럼은 사용자가 지정한 컬럼만 해당됩니다. (좌측에 고정된 컬럼은 제외)
     * @param grid: [필수](object) 그리드 객체
     * @return GridColumn[]: 컬럼 객체 리스트

    getColumns: function (grid){
        return SBGrid3.getColumns(grid);
    },*/
    /**
     * 포커스된 행의 rowItem과 column을 반환합니다.
     * 포커스된 행이 없아면 undefined을 반환한다.
     * @param grid: [필수](object) 그리드 객체
     * @return object : 포커스된 컬럼과 rowItem객체
     * 			GridColumn: (object) 컬럼 객체
     * 			RowItem: (object) RowItem객체

    getFocused: function (grid){
        // 포커스된 컬럼 객체와 RowItem객체를 반환합니다.
        return SBGrid3.getFocused(grid);
    },*/
    /**
     * 포커스된 column 정보를 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @return GridColumn: 포커스된 컬럼 객체

    getFocusedColumn: function (grid){
        return SBGrid3.getFocusedColumn(grid);
    },*/
    /**
     * 포커스된 row의 key값을 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @return any: 포커스된 Row Item의 key

    getFocusedKey: function (grid){
        return SBGrid3.getFocusedKey(grid);
    },*/
    /**
     * 포커스된 row의 rowItem을 반환합니다.
     * @param grid
     * @return any: 포커스된 row의 rowItem을 반환합니다.

    getFocusedRow: function (grid){
        return SBGrid3.getFocusedRow(grid);
    },*/
    /**
     * 포커스된 row의 데이터를 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param field: (string) 컬럼 필드명
     * @return 두번째 파라미터 field의 여부에 따라 반환값이 달라집니다.
     * 			두번째 파라미터 O : 특정 cell의 데이터를 반환합니다.
     * 			두번째 파리미터 X : row 데이터를 반환합니다.

    getFocusedValue: function(grid, field){
        let rtnData;
        if(field != undefined){
            // 포커스된 row의 데이터를 반환합니다.
            rtnData = SBGrid3.getFocusedValue(grid);
            console.log('포커스된 Row 데이터 - ', rtnData); // { class : '매화반', ... }
        } else {
            // 포커스된 cell의 데이터를 반환합니다.
            rtnData = SBGrid3.getFocusedValue(grid, field);
            console.log('포커스된 Row 데이터 - ', rtnData); // 매화반
        }
        return rtnData;
    },*/
    /**
     * selector등을 이용해서 그리드 객체 반환합니다.
     * grid id 이용하여 그리드 객체 반환
     * @param gridId [필수](string) css 셀렉터
     * @return object: 그리드 객체

    getGrid: function (gridId){
        // id가 grid을 이용하여 그리드 객체 반환
        return SBGrid3.getGrid(gridId);
    },*/
    /**
     * 그리드의 pageSize를 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @return number: 페이지 사이즈

    getPageSize: function (grid){
        return SBGrid3.getPageSize(grid);
    },*/
    /**
     * radio button으로 선택된 row의 키를 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @return key: row item의 key

    getRadioKey: function (grid){
        return SBGrid3.getRadioKey(grid);
    },*/
    /**
     * radio button으로 선택된 row를 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param column
     * @param value
     * @return {*[]}

    getRadioRow: function (grid, column, value){
        // 라디오로 선택된 rowItem을 반환합니다.
        let rtnRow = [];
        if(column === undefined || value === undefined){
            rtnRow = SBGrid3.getRadioRow(grid);
        } else {
            rtnRow = SBGrid3.findRows(grid, function (data, row){return data[column] == value});
        }
        return rtnRow;
    },*/
    /**
     * 특정 key에 해당하는 row의 선택된 컬럼을 배열로 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param key: [필수](any) row key
     * @return GridColumn[]: 그리드 컬럼 객체

    getRangedColumns: function (grid, key){
        return SBGrid3.getRangedColumns(grid, key);
    },*/
    /**
     * range 모드에 의해 선택된 row들의 키값을 배열로 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @return any[]: 선택된 row들의 키

    getRangedKeys: function (grid){
        return SBGrid3.getRangedKeys(grid);
    },*/
    /**
     * range 모드에 의해 선택된 첫번째 row을 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @return RowItem: row item객체

    getRangedRow: function (grid){
        let rangedRow = SBGrid3.getRangedRows(grid);
        if(rangedRow.length > 0){
            return SBGrid3.getRangedRows(grid)[0].data;
        } else {
            return;
        }
    },*/
    /**
     * range 모드에 의해 선택된 row들을 배열로 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @return RowItem[]: row item객체

    getRangedRows: function (grid){
        return SBGrid3.getRangedRows(grid);
    },*/
    /**
     * key 에 해당하는 rowItem을 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param key: [필수](any) row key
     * @return RowItem: row item객체

    getRow: function (grid, key){
        return SBGrid3.getRow(grid, key);
    },*/
    /**
     * rowIndex에 해당하는 rowItem을 반환합니다.
     * 단, 그리드에 로드된 데이터만 반환하며, 로드되지 않은 경우 undefined를 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param rowIndex: [필수](number) 행 인덱스
     * @return RowItem: row item객체

    getRowByIndex: function (grid, rowIndex){
        return SBGrid3.getRowByIndex(grid, rowIndex);
    },*/
    /**
     * key에 해당하는 json 데이터를 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param key: [필수](any) row key
     * @return rowData: row의 데이터

    getRowData: function(grid, key){
        return SBGrid3.getRowData(grid, key);
    },*/
    /**
     * rowIndex에 해당하는 rowItem의 키값을 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param rowIndex: [필수](any) 행 인덱스
     * @return {Promise<*>} any: row item의 key

    getRowKey: async function (grid, rowIndex){
        return await SBGrid3.getRowKey(grid, rowIndex);
    },*/
    /**
     * rowIndex에 해당하는 rowItem을 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param rowIndex: [필수](any) 행 인덱스
     * @return {Promise<*>} RowItem: row item 객체

    getRow_Index: async function (grid, rowIndex){
        return await SBGrid3.getRow_Index(grid, rowIndex);
    },*/
    /**
     * row select 모드에 의해 선택된 row들의 key값을 배열로 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @return any[]: 선택한 row의 key 배열

    getSelectedKeys: function (grid){
        return SBGrid3.getSelectedKeys(grid);
    },*/
    /**
     * row select 모드에 의해 선택된 rowItem을 배열로 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @return RowItem[]: row item 배열

    getSelectedRows: function (grid){
        return SBGrid3.getSelectedRows(grid);
    },*/
    /**
     * 그리드 데이터를 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param key: [필수](any) row key
     * @param field: [필수](string) 컬럼 필드명
     * @return RowItem[]: row item 배열

    getValue: function (grid, key, field){
        return SBGrid3.getValue(grid, key, field);
    },*/
    /**
     * 좌측에 고정된 컬럼을 포함하여 모든 컬럼을 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @return GridColumn[]: 컬럼 객체 리스트

    getWholeColumns: function (grid){
        return SBGrid3.getWholeColumns(grid);
    },*/
    /**
     * 열려있는 detail을 닫습니다.
     * @param grid: [필수](object) 그리드 객체
     * @param key: [필수](any) row key

    hideDetail: async function(grid, key){
        await SBGrid3.getRowKey(grid, key);
    },*/
    /**
     * 개인화 저장 목록을 가져옵니다.
     * grid.config에서 personalization key 와 version 을 조합한 목록을 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @return string[] : 개인화 목록

    listPersonalization: function (grid){
        return SBGrid3.listPersonalization(grid);
    },*/
    /**
     * 포커스를 이동시킵니다.(BodyPanel만 대상이 됨)
     * SBGrid3 의 moveFocus 를 편리하게 Custom 했음.
     * @param grid: [필수](object) 그리드 객체
     * @param rowItem: [선택] row index
     * @param column: [선택] 컬럼 name
    */
    moveFocus: function (grid, rowItem, columnName){
        var column, row;
        if(columnName !== undefined && columnName !== ''){
            column =  SBGrid3.getColumnByField(grid, columnName);
            if(column === undefined || column.length == 0){
                NsfMessage.alert('move focus 할 수 없습니다. </br>Column 명을 확인해주세요.');
                return undefined;
            }
        } else {
            column = SBGrid3.getColumns(grid);
        }
        var all = SBGrid3.getAllItems(grid);
        if(rowItem !== undefined && rowItem !== ''){
            if(all.length > 0){
                row = all[rowItem]._key_;
            }
        } else {
            if(all.length > 0){
                row = all[0]._key_;
            }
        }
        SBGrid3.moveFocus(grid, row, column[0]);
    },
    /**
     * 변경된 config, 데이터를 버리고 원래 config로 새로 로드합니다.
     * @param grid

    rebuild: function (grid){
        SBGrid3.rebuild(grid);
    },*/
    /**
     * config, 데이터를 유지한 채, 그리드 화면을 갱신합니다.
     * @param grid: [필수](object) 그리드 객체

    refresh: function (grid){
        SBGrid3.refresh(grid);
    },*/
    /**
     * config는 유지한 채 그리드 데이터를 다시 로드합니다.
     * @param [필수](object) 그리드 객체
     * @param val true / false - 페이징유지여부

    reload: function (grid, val){
        if(val === undefined || val === '') val = true;
        SBGrid3.reload(grid, val);
    },
    nowPageReload: function(grid){
        SBGrid3.reload(grid, false);
    },*/
    /**
     * 원하는 컬럼을 삭제합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param index: [필수](number) 컬럼 인덱스

    removeColumn: function(grid, index){
        SBGrid3.removeColumn(grid, index);
    },*/
    /**
     * 개인화 목록에서 개인화 키를 제거합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param key: [필수](string) 개인화 키
     * @return boolean: 삭제 성공 여부

    removePersonalization: function (grid, key){
        return SBGrid3.removePersonalization(grid, key);
    },*/
    /**
     * 개인화에 적용된 데이터를 취소합니다.
     * @param grid: [필수](object) 그리드 객체
     * @return boolean: 초기화 성공 여부

    resetPersonalization: function (grid){
        return SBGrid3.resetPersonalization(grid);
    },*/
    /**
     * key에 해당하는 row를 편집모드로 변경합니다
     * @param grid: [필수](object) 그리드 객체
     * @param key: [필수](any) row key
     * @param isEdit: (boolean) 편집모드 활성화 여부

    rowEditable: function (grid, key, isEdit){
        SBGrid3.rowEditable(grid, key, isEdit);
    },*/
    /**
     * 그리드 기본 저장 함수를 호출합니다.
     * @param grid: [필수](object) 그리드 객체

    save: function (grid){
        SBGrid3.save(grid);
    },*/
    /**
     * SBGrid3.savePersonalization 메소드는 그리드의 개인화 적용 데이터를 저장하는 기능을 제공합니다. 이는 사용자의 그리드 레이아웃 설정, 필터링, 정렬 상태 등을 저장하여 재사용할 수 있게 합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param key: [선택](string) 개인화 데이터를 저장할 때 사용할 키. 지정하지 않으면 기본 키로 저장됩니다.
     * @return boolean: 저장 성공 여부를 boolean 값으로 반환합니다.
     *
     * SBGrid3.savePersonalization 메소드는 그리드의 현재 상태(컬럼의 순서, 너비, 가시성, 필터링, 정렬 등)를 저장합니다.
     * 저장된 개인화 데이터는 나중에 SBGrid3.setPersonalization 메소드를 통해 다시 불러올 수 있습니다.
     * 선택적으로 key 매개변수를 사용하여 다양한 개인화 설정을 구분하여 저장할 수 있습니다.
     * 메소드는 저장이 성공적으로 완료되었는지 여부를 boolean 값으로 반환합니다.
     *
     * 저장된 개인화 데이터는 사용자가 동일한 그리드 설정으로 작업을 재개할 때 유용하게 사용될 수 있습니다.
     * key 매개변수를 사용하여 다양한 사용자 또는 상황에 맞는 개인화 설정을 관리할 수 있습니다.

    savePersonalization: function (grid, key){
        return SBGrid3.savePersonalization(grid, key);
    },*/
    /**
     * SBGrid3.search 메소드는 그리드 내의 값을 검색하고, 검색 결과가 존재하는 셀 정보를 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param searchOpt: [필수](string | IGridSearch) 검색 옵션, 문자열일 경우 검색어
     * interface IGridSearch {
     *     search: string, [설명] : search: [string] 검색어
     *     ignoreCase?: boolean, [설명] : ignoreCase: [boolean] 대소문자 구분 무시 여부 (기본값: false)
     *     wholeWord?: boolean, [설명] : wholeWord: [boolean] 전체 단어 일치 여부 (기본값: false)
     *     backward?: boolean, [설명] : backward: [boolean] 이전 검색 여부 (기본값: false)
     * }
     * @param moveFocus: [boolean] 검색 결과가 존재하는 셀로 포커스 이동 여부 (기본값: false)
     *
     * @return {Promise<void>} IFindRow: [object] 검색 결과가 존재하는 셀 정보
     * interface IFindRow {
     *     rowIndex: number; [설명] : rowIndex: [number] 행 인덱스
     *     column: GridColumn; [설명] : column: [GridColumn] GridColumn 객체
     * }
     *
     * SBGrid3.search 메소드는 그리드 내에서 주어진 검색 옵션에 따라 값을 검색합니다.
     * 검색 옵션에는 검색어, 대소문자 구분, 전체 단어 일치, 검색 방향 등이 포함될 수 있습니다.
     * 검색 결과가 존재하는 경우, 해당 셀의 행 인덱스와 컬럼 정보를 포함하는 객체를 반환합니다.
     * moveFocus 매개변수를 true로 설정하면, 검색 결과가 있는 셀로 포커스를 자동으로 이동시킵니다.

    search: async function (grid, searchOpt, moveFocus){
        await SBGrid3.search(grid, searchOpt, moveFocus);
    },*/
    /**
     * dataSource 의 pageSize를 변경합니다.
     *
     * 예제에서의 초기 설정은 30으로, 페이지 이동 시 30개의 row 단위로 이동해,
     * 두번째 페이지의 첫째 데이터 row number 가 31인 것을 확인할 수 있습니다.
     * 변경 후 페이지 이동 시 입력한 숫자만큼 페이지가 이동한 것을 확인하실 수 있습니다.
     * 또 서버에서 데이터를 쪼개어 가져올 때에도 영향을 미칩니다.
     * pageSize 관련 자세한 설명은 ajax 외 data 관련 페이지를 참고합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param pageSize: [필수](number) 새로 설정할 페이지 크기

    setPageSize: function (grid, pageSize){
        SBGrid3.setPageSize(grid, pageSize);
    },*/
    /**
     * setPersonalization 메소드는 그리드의 개인화 설정을 변경하는 기능을 제공합니다. 이 메소드를 사용하여 사용자는 저장된 개인화 설정 중 하나를 선택하여 적용할 수 있습니다.
     * @param grid: [필수](object) 그리드 객체
     * @param changeKey: [필수](string) 적용할 개인화 설정의 키
     * @return boolean: 성공 여부를 나타내는 boolean 값. 설정 적용에 성공하면 true, 실패하면 false를 반환합니다.
     *
     * setPersonalization 메소드는 지정된 changeKey에 해당하는 개인화 설정을 그리드에 적용합니다.
     * 내부적으로 PersonalStorage 클래스의 인스턴스를 사용하여 지정된 키에 대한 개인화 설정을 불러오고 적용합니다.
     * 설정 적용에 성공하면 true를, 실패하면 false를 반환하여, 메소드의 실행 결과를 확인할 수 있습니다.
     * 이 메소드는 사용자가 그리드의 레이아웃, 필터링, 정렬 등의 개인화된 설정을 쉽게 관리하고 적용할 수 있도록 도와줍니다.

    setPersonalization: function (grid, changekey){
        return SBGrid3.setPersonalization(grid, changekey);
    },*/
    /**
     * 그리드 내에서 특정 행을 라디오 버튼으로 선택하기 위한 키를 설정합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param key: [필수](any) 라디오 버튼으로 선택할 행을 식별하는 키
     *
     * SBGrid3.setRadioKey 함수는 그리드에서 라디오 버튼으로 특정 행을 선택할 때 사용하는 키를 설정합니다.
     * showRadio 옵션이 true로 설정된 경우에만 이 기능을 사용할 수 있습니다.

    setRadioKey: function (grid, key){
        SBGrid3.setRadioKey(grid, key);
    },*/
    /**
     * setRowValue 메소드는 지정된 행 또는 모든 행의 특정 필드 값을 변경하는 기능을 제공합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param field: [필수](string) 변경할 필드의 이름
     * @param value: [필수](any) 변경할 값
     * @param rowIndex: (number) 변경할 특정 행의 번호. 지정되지 않으면 모든 행에 적용
     *
     * setRowValue 메소드는 grid 객체의 특정 행(rowIndex)의 지정된 필드(field)에 새로운 값을(value) 할당합니다.
     * rowIndex가 지정되지 않은 경우, 모든 행에 대해 해당 필드의 값을 변경합니다.
     * 이 메소드는 데이터 관리 및 동적 업데이트에 유용하며, 사용자 인터페이스와의 상호작용을 통해 데이터를 실시간으로 조정할 수 있습니다.

    setRowValue: function (grid, field, value, rowIndex){
        if(rowIndex === undefined){
            // 모든 행의 특정 필드 값을 변경
            SBGrid3.setRowValue(grid, field, value); // 모든 행의 'korean' 필드 값을 100으로 변경
        } else {
            // 특정 행의 특정 필드 값을 변경
            SBGrid3.setRowValue(grid, field, value, rowIndex); // rowIndex=5인 행의 'korean' 필드 값을 100으로 변경
        }
    },*/
    /**
     * SBGrid3.setSize 메소드는 그리드의 너비(width)와 높이(height)를 조정하고, 그리드를 새로고침(refresh)합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param width: [선택](string) 너비 정보. 값이 비어있으면 적용되지 않음.
     * @param height: [선택](string) 높이 정보. 값이 비어있으면 적용되지 않음.
     *
     * SBGrid3.setSize 메소드는 지정된 너비와 높이 값으로 그리드의 크기를 조정합니다.
     * 너비나 높이 값이 비어있는 경우, 해당 값은 변경되지 않고 기존 값이 유지됩니다.
     * 크기 조정 후, 그리드는 자동으로 새로고침되어 변경된 크기에 맞게 UI가 업데이트됩니다.
     * 이 메소드는 동적인 그리드 레이아웃 조정이 필요할 때 유용하게 사용될 수 있습니다.

    setSize: function(grid, width, height){
        // 그리드의 크기를 조정하는 예시
        // width: 80%, height: 80vh 로 변경
        //SBGrid3.setSize(grid, '80%', '80vh');

        // width는 그대로, height: 500px 로 변경
        //SBGrid3.setSize(grid, '', '500px');

        // width: 800px, height는 그대로 변경
        //SBGrid3.setSize(grid, '800px', '');
        SBGrid3.setSize(grid, width, height);
    },*/
    /**
     * 그리드의 특정 행에 데이터를 저장하는 메소드입니다.
     * @param grid: [필수](object) 그리드 객체
     * @param key: [필수](any) row-key, 특정 행을 식별하는 키
     * @param value: [필수](any) 저장할 값
     * @param field: [선택](string) 필드명이 지정되면 해당 필드에 값이 저장됩니다. 지정되지 않으면 데이터 객체 전체에 값이 저장됩니다.
     * Promise: 비동기적으로 데이터 저장 작업을 완료하고 결과를 반환합니다.
     *
     * !!!!! 아래와 같이 field 부분을 '' 로 부여하고 value 부분을 JSON 형태의 데이터를 부여하면 해당 컬럼의 값만 변경처리 된다. !!!!!!
     * 예제 : SBGrid3.setValue(sbGridM1, rowKey, {'noZip': data.cdZip, 'addrKor': data.addrZip }, '');

    setValue: function (grid, key, value, field){
        SBGrid3.setValue(grid, key, value, field);
    },*/
    /**
     * 여러 행(row)의 데이터를 한 번에 입력하는 기능을 제공합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param values: [필수](object[]) 입력할 데이터의 배열
     * setValuesData = [
     *   { key: '30534', field: 'class', value: '배신' }, [설명] : key: [any] 데이터를 입력할 행을 식별하는 키
     *   { key: '30742', field: 'class', value: '배신' }, [설명] : field: [string] 데이터를 입력할 필드의 이름
     *   { key: '51124', field: 'class', value: '배신' }, [설명] : value: [any] 입력할 값
     * ];
     *
     * SBGrid3.setValues(grid, values) 메소드는 그리드의 여러 행에 대해 특정 필드의 값을 일괄적으로 업데이트할 때 사용됩니다.
     * 이 메소드는 values 배열에 지정된 각 객체에 대해 해당하는 행(key)의 특정 필드(field)에 값을(value) 설정합니다.
     * 명시되지 않은 필드의 값은 기존 값을 유지합니다.
     * 이 기능은 대량의 데이터 업데이트가 필요할 때 효율적으로 사용할 수 있습니다.

    setValues: function (grid, values){
        SBGrid3.setValues(grid, values)
    },*/
    /**
     * 지정한 필드를 기준으로 그리드 데이터를 정렬합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param orders: [필수](string[] | { field: string, dir: ‘desc’ | ‘asc’ }[]) 정렬 규칙 배열
     * 					string[]: 각 필드에 대해 오름차순으로 정렬
     * 					{ field: string, dir: 'desc' | 'asc' }[]: 각 필드에 대해 지정된 방향(내림차순/오름차순)으로 정렬
     *
     * SBGrid3.sort() 메소드는 지정된 필드를 기준으로 그리드의 데이터를 정렬합니다.
     * 정렬 규칙은 문자열 배열 또는 객체 배열로 지정할 수 있으며, 객체 배열을 사용할 경우 각 필드에 대한 정렬 방향(내림차순/오름차순)을 명시할 수 있습니다.
     * 이 메소드는 데이터의 표시 순서를 변경하여 사용자에게 보다 효율적인 데이터 탐색 및 분석을 가능하게 합니다.
     *
     * 정렬을 수행하기 전에 그리드가 올바르게 초기화되고 데이터가 로드되었는지 확인하는 것이 중요합니다.
     * SBGrid3.sort(grid, [{ field: "korean", dir: "desc" }]); //국어 점수를 내림차순으로 정렬

    sort: function (grid, orders){
        SBGrid3.sort(grid, orders);
    },*/
    /**
     * 그리드의 데이터를 사용자 정의 정렬 함수를 이용하여 정렬합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param orders: [필수](function) 정렬 함수
     * 				매개변수
     * 					prevData: [any] 이전 행 데이터
     * 					nextData: [any] 다음 행 데이터
     * 				반환값: [number] 정렬 순서를 결정하는 숫자 (음수, 0, 양수)
     *
     * sortData 메소드는 그리드의 데이터를 사용자가 제공한 정렬 함수(orders)에 따라 정렬합니다.
     * 정렬 함수는 두 행의 데이터(prevData, nextData)를 비교하여 정렬 순서를 결정합니다.
     * 이 메소드는 그리드의 데이터 정렬을 동적으로 조정할 수 있게 하여, 사용자 인터페이스의 유연성을 증가시킵니다.
     * 예시에서는 ‘학번’ 컬럼을 기준으로 오름차순 정렬하는 버튼의 구현을 보여줍니다.
     *
     * SBGrid3.sortData(grid, (prevRow, nextRow) => {
     *         const prevNumber = Number(prevRow.data.number);
     *         const nextNumber = Number(nextRow.data.number);
     *         return prevNumber - nextNumber;
     * });

    sortData: function (grid, orders){
        SBGrid3.sortData(grid, orders);
    },*/
    /**
     *
     * @param grid: [필수](object) 그리드 객체
     * @param key: [필수](any) 상태를 토글할 행을 식별하는 키
     * @return {Promise<*>} Promise: 비동기적으로 처리되며, 토글 성공 여부를 boolean 값으로 반환합니다.
     *
     * SBGrid3.toggleRow(grid, key) 메소드는 트리 뷰나 그룹핑이 적용된 그리드에서 특정 행의 상태를 열림 또는 닫힘으로 전환합니다.
     * 이 메소드는 비동기적으로 작동하며, 토글 작업이 성공적으로 수행되었는지 여부를 Promise 형태로 반환합니다.
     * 사용자가 입력한 행 번호를 기반으로 해당 행의 상태를 토글하는 기능을 제공합니다.

    toggleRow: async function (grid, key){
        return await SBGrid3.toggleRow(grid, key);
    },*/
    /**
     * 선택한 행이 삭제되었다면, 이를 되돌리는 기능을 제공합니다. 즉, 삭제된 행을 복구합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param key: [필수](any) 복구할 행을 식별하는 키
     * @return {Promise<void>} Promise: 비동기 작업을 나타내는 Promise 객체. 작업 완료 시, 삭제된 행이 복구됩니다.
     *
     * SBGrid3.undeleteRow(grid, key) 메소드는 그리드에서 삭제된 특정 행을 복구하는 기능을 수행합니다.
     * 이 메소드는 비동기적으로 작동하며, 삭제 플래그를 제거하여 행을 다시 활성화합니다.
     * 내부적으로 UndeleteRowCommand 클래스를 사용하여 삭제된 행의 복구 명령을 처리합니다.
     * 복구 작업이 완료되면, 그리드는 해당 행을 다시 표시하게 됩니다.

    undeleteRow: async function (grid, key){
        // 선택한 행이 삭제되었다면, 이를 되돌린다.
        await SBGrid3.undeleteRow(grid, key);
    },*/
    /**
     *
     * @param grid: [필수](object) 그리드 객체
     * @param from: (RowItem) 유효성 검사를 시작할 행 (선택적, 기본값: undefined)
     * 				이 매개변수를 사용하면 지정된 행부터 그리드의 끝까지 유효성 검사를 수행합니다.
     * @return any[]: 유효성 검사에 실패한 행의 키들을 포함하는 배열

    validateGrid: function (grid, from){
        // 그리드 전체 데이터에 대한 유효성 검사 수행
        if(from === undefined){
            return SBGrid3.validateGrid(grid);
        } else {
            return SBGrid3.validateGrid(grid, from);
        }
    },*/
    /**
     * 특정 행의 데이터에 대해 설정된 유효성 검사 규칙을 적용하고, 검사에 실패한 컬럼들을 배열로 반환합니다.
     * @param grid: [필수](object) 그리드 객체
     * @param key: [필수](any) 유효성 검사를 수행할 특정 행을 식별하는 키
     * @return GridColumn[]: 유효성 검사에 실패한 컬럼의 배열

    validateRow: function (grid, key){
        // 특정 행에 대한 유효성 검사 수행
        return SBGrid3.validateRow(grid, key);
    },*/
    /**
     * grid의 client-data를 설정합니다.
     * 데이터 설정후 반드시 reload를 호출해야 설정한 데이터가 그리드에 표시됩니다.
     * @param grid: [필수](object) 그리드 객체
     * @param data: [필수](object[]) 그리드 데이터

    setClientData: function (grid, data){
        SBGrid3.setClientData(grid, data);
        // 변경한 데이터를 그리드에 표시하려면 SBGrid3.reload를 호출합니다.
        SBGrid3.reload(grid);
    },*/

    /**
     * Finds rows in a grid based on a specific column value.
     * @param {Object} grid - The grid object.
     * @param {string} column - The name of the column to search for.
     * @param {string} value - The value to search for in the specified column.
     * @returns {Array} - An array of rows that match the search criteria.

    getSearchRows : function(grid, column, value){
        let rtnRow = [];
        if(grid !== undefined && column !== undefined && column !== ''){
            rtnRow = SBGrid3.findRows(grid, function (data, row){return data[column] == value});
        }
        return rtnRow;
    },*/
    /**
     * AddRow KeyColumn editable
     * @param data
     * @return {boolean}
     */
    keyColumn: function(data) {
        return data._status_ === "I";
    },
    /**
     * SBGrid RowData status 체크
     * @param grid
     * @returns {boolean}
     */
    isChangeGrid: function(grid){
        let gridStatus = SBGrid3.getSaveData(grid);
        return !(gridStatus.inserted.length === 0 && gridStatus.updated.length === 0 && gridStatus.deleted.length === 0);
    },

    /**
     * 저장 Param 생성
     * @param grid
     * @param reqCol
     * @return {{data: *[]}|{column: *, name: *, rowIndex: *, rowKey: *}}
     */
    getSaveData : function(grid, reqCol) {
        let rtnArray = { data:[] };
        let gridStatus = SBGrid3.getSaveData(grid);
        if(!NsfUtilSBGrid.isChangeGrid(grid)){
            return rtnArray;
        }

        // 비어 있지 않은 배열만 선택하여 합치기
        let m1IstUpdDel = [];
        if(gridStatus.inserted.length > 0) { m1IstUpdDel = m1IstUpdDel.concat(gridStatus.inserted); }
        if(gridStatus.updated.length > 0) { m1IstUpdDel = m1IstUpdDel.concat(gridStatus.updated); }
        if(gridStatus.deleted.length > 0) { m1IstUpdDel = m1IstUpdDel.concat(gridStatus.deleted); }

        for(const element of m1IstUpdDel) {
            let rowData = element;
            if(reqCol !== undefined && reqCol.length > 0){
                if(rowData._status_ === 'I' || rowData._status_ === 'U'){
                    let rtnVal = NsfUtilSBGrid.saveDataChk(grid, rowData, reqCol);
                    if(typeof rtnVal === 'object') return rtnVal;
                }
            }
            // SBGrid3.getColumns 함수로 얻은 컬럼 정보
            var sbColumns = SBGrid3.getColumns(grid);
            NsfUtilSBGrid.compareAssignValue(rowData, sbColumns);
            if(rowData._status_ === 'I'){ rowData.editFlag = 'C'; }
            if(rowData._status_ === 'U'){ rowData.editFlag = 'U'; }
            if(rowData._status_ === 'D'){ rowData.editFlag = 'D';}
            delete rowData.dtInsert;
            delete rowData.dtUpdate;
            rtnArray.data.push(rowData);  // i번째 데이터를 배열에 담음
        }
        return rtnArray;
    },
    /**
     * 즉시삭제 Param 생성
     * @param grid
     * @param reqCol
     * @return {{data: *[]}|{column: *, name: *, rowIndex: *, rowKey: *}}

    getDeleteRowData : function(data) {
        let rtnArray = [];
        if(data === undefined){
            return '';
        }
        let rowData = data;
        rowData.editFlag = 'D';
        delete rowData.dtInsert;
        delete rowData.dtUpdate;
        rtnArray.push(rowData);  // i번째 데이터를 배열에 담음
        return rtnArray;
    },*/
    compareAssignValue: function(obj, columns) {
        $.each(columns, function(index, key) {
            // 만약 obj에 sbGridColumns의 키가 없다면 빈 문자열 할당
            if (!(key.field in obj)) {
                if(key.field !== undefined && key.field !== '_status_' && key.field !== '_key_'){
                    if(key.field === 'number') { obj[key.field] = 0; }
                    else { obj[key.field] = ''; }
                }

            }
        });
    },
    /**
     * 필수 Column Check
     * @param grid
     * @param rowdata
     * @param reqCol
     * @return {{column: *, name, rowIndex: *, rowKey: *}|boolean}
     */
    saveDataChk: function (grid, rowdata, reqCol){
        for(let i = 0; reqCol.length > i; i++){
            let chkCol = reqCol[i];
            if(rowdata[chkCol] === undefined || rowdata[chkCol] === ''){
                if(SBGrid3.getColumnByField(grid, chkCol).length > 0){
                    //SBGrid3.columnEditable(grid, rowdata._key_, chkCol, true);
                    return {
                        rowKey  : rowdata._key_,
                        rowIndex: SBGrid3.getRow(grid, rowdata._key_),
                        column  : SBGrid3.getColumnByField(grid, chkCol)[0],
                        name    : SBGrid3.getColumnByField(grid, chkCol)[0].config.caption
                    };//SBGrid3.getColumnByField(grid, chkCol)[0].config.caption;
                }
            }
        }
        return true;
    },
    /**
     * paging 조회 param
     * @param req
     * @param param
     * @param method
     * @returns {[{name: string, value},{name: string, value: number},{name: string, value: number},{name: string, value: string}]}
     */
    setPageSort : function(req, param, method, pageUnit){
        let rtnObj;
        if(Object.keys(req).length == 0){
            req.pageNo = 0;
            req.pageSize = 200;
        }
        let reqPage = (req.pageNo  === undefined ? 0 : req.pageNo) + 1;
        let reqUnit = req.pageSize === undefined ? pageUnit : req.pageSize;

        let sortField = '';
        if(req.orders?.length !== undefined && req.orders?.length > 0){
            for(let i = 0; req.orders.length > i; i++){
                sortField += req.orders[i].field.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase() + ' ';
                if(req.orders.length == i + 1){
                    sortField += req.orders[i].dir;
                } else {
                    sortField += req.orders[i].dir + ', ';
                }
            }
        }
        rtnObj = [
            {name: 'params', value: param}
            , {name: 'pagingPage', value: reqPage}
            , {name: 'pagingUnit', value: reqUnit}
            , {name: 'sortField', value: sortField}
            , {name: 'methodName', value: method}
        ];
        return rtnObj;
    },
    /**
     * no paging 조회 param
     * @param req
     * @param param
     * @param method
     * @returns {[{name: string, value},{name: string, value: number},{name: string, value: number},{name: string, value: string}]}
     */
    setNoPage : function(req, param, method){
        let rtnObj;
        let setParam = param === undefined ? '{}': param;
        rtnObj = [
            {name: 'params', value: setParam}
            ,{name: 'methodName', value: method}
        ];
        return rtnObj;
    },
    convertYMDate : function (val){
        if(val !== undefined && val.length === 8){
            return val?.replace(/^(\d{4})(\d{2})(\d{2})$/,  '$1-$2-$3');
        }

    },
    convertYMDDate : function (val){
        if(val !== undefined && val.length === 6){
            return val?.replace(/^(\d{4})(\d{2})/,  '$1-$2');
        }

    },
    /**
     * 달력 유효성 검사 및 변환
     * @param strDate
     * @return {*|string}
     */
    toDateString : function(strDate){
    	var inputValue = strDate;
        var rtnFormattedDate;
        // 정규식을 사용하여 입력된 값이 'YYYYMMDD' 형식인지 확인
        if (/^\d{8}$/.test(inputValue)) {
            // 'YYYYMMDD'를 'YYYY-MM-DD' 형식으로 변환
            rtnFormattedDate = inputValue.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
        } else if (/^\d{6}$/.test(inputValue)) {
            // 'YYYYMM'를 'YYYY-MM' 형식으로 변환
            rtnFormattedDate = inputValue.replace(/^(\d{4})(\d{2})$/, '$1-$2');
        } else {
            if(strDate.length === 10){
                rtnFormattedDate = inputValue;
            } else {
                return '';
            }
        }
        // 유효한 날짜인지 확인
        if (NsfUtilSBGrid.isValidDate(rtnFormattedDate)) {
            return rtnFormattedDate;
        } else {
            return '';
        }
    },

    isValidTimeFormat(strTime) {
    	if(strTime !== undefined){
			if(strTime.length == 1){
		           // 정규식을 사용하여 1자리 숫자를 시간 형식으로 검사
		           const regex = /^([0-9])$/;
		           if (regex.test(strTime)) {
	                   const hours = strTime.slice(0, 2);

	                   return `0${hours}:00`;
		           } else {
		        	   return '';
		           }
	    	} else if(strTime.length == 2){
	            // 정규식을 사용하여 2자리 숫자를 시간 형식으로 검사
		           const regex = /^([01][0-9]|2[0-3])$/;
		           if (regex.test(strTime)) {
		               return strTime;
		           } else {
		        	   return '';
		           }
	     	} else if(strTime.length == 3) {
		           const regex = /^([01][0-9][0-6]|2[0-3][0-6])$/;
		           if (regex.test(strTime)) {
		               return strTime;
		           } else {
		        	   return '';
		           }

	     	} else if(strTime.length == 4) {

		            // 정규식을 사용하여 4자리 숫자를 시간 형식으로 검사
		            const regex = /^([01]\d|2[0-3])([0-5]\d)$/;
		            if (regex.test(strTime)) {
		                return strTime;
		            } else {
		        	    return '';
		            }

	     	} else {
				return strTime;
	     	}

		}
    },
	toTimeString: function(strTime,field, rowItem) {
	    if(strTime !== undefined){
			if(strTime.length == 1){
	           // 정규식을 사용하여 1자리 숫자를 시간 형식으로 검사
	           const regex = /^([0-9])$/;
	           if (regex.test(strTime)) {
	                const hours = strTime.slice(0, 2);
	                return `0${hours}:00`;
	           }
	    	} else if(strTime.length == 2){
	           // 정규식을 사용하여 2자리 숫자를 시간 형식으로 검사
	           const regex = /^([01][0-9]|2[0-3])$/;
	           if (regex.test(strTime)) {
	                const hours = strTime.slice(0, 2);
	                return `${hours}:00`;
	           }
	    	} else if(strTime.length == 3) {
	           const regex = /^([01][0-9][0-6]|2[0-3][0-6])$/;
	           if (regex.test(strTime)) {
	                const hours = strTime.slice(0, 2);
	                const minutes = strTime.slice(2);
	                // 결과 문자열 반환
	                return `${hours}:${minutes}0`;
	           }
	    	} else if(strTime.length == 4) {
	            // 정규식을 사용하여 4자리 숫자를 시간 형식으로 검사
	            const regex = /^([01]\d|2[0-3])([0-5]\d)$/;
	            if (regex.test(strTime)) {
	                const hours = strTime.slice(0, 2);
	                const minutes = strTime.slice(2);
	                // 결과 문자열 반환
	                return `${hours}:${minutes}`;
	            }
	    	} else {
				return strTime;
			}
	    }
	},

    /**
     * 날짜 유효성 검사
     * @param dateString 'YYYY-MM-DD' 형태
     * @return {boolean}
     */
    isValidDate: function(dateString) {
        // 날짜 객체 생성
        var dateObject = new Date(dateString);
        // 날짜가 유효한지 확인
        return !isNaN(dateObject.getTime());
    },
    /**
     * Column Show / Hide
     */
    pageBarColumnShowHide : {
        init : function(grid){
            let gridDiv = jQuery(grid.container).parent('div');
            let append = '<script class="gridColumnsPopup" type="text/x-handlebars-template">';
            append += '    <input type="button" id="btnColumn'+gridDiv.attr('id')+'" class="sbgrid-tool" onclick="NsfUtilSBGrid.pageBarColumnShowHide.toolbarClick(this)" value="custom toolbar">';
            append += '</script>';
            SBGrid3.$(append).appendTo(grid.container);
        // grid.container.after()
        },
        toolbarClick : function(grid) {
            //let gridDiv = SBGrid3.getGrid(grid.parentElement.parentElement);
            let gridDiv = $(grid).parents('.sbgrid-grid').parent('div')
            const jqPopup = SBGrid3.$("#"+jQuery(gridDiv).attr('id')+"Popup", gridDiv.container);
            if(jqPopup.length === 0){
                this.renderPopup(gridDiv);
            }else{
                jqPopup.remove();
            }
        },
        renderPopup : function (grid){
            //let gridDiv = jQuery(grid.container).parent('div');
            let gridDiv = jQuery(grid);
            let rtnGrid = SBGrid3.getGrid(gridDiv);
            const chkPopup = SBGrid3.$("#"+gridDiv.attr('id')+"Popup", gridDiv.container);
            if(chkPopup.length > 0){
                chkPopup.remove();
            }
            const jqPopup = SBGrid3.$("<div id='"+gridDiv.attr('id')+"Popup' class='sbgrid-menu-group' ></div>").appendTo(rtnGrid.container);
            const jqColumn = SBGrid3.$("<span class='sbgrid-column sbgrid-menu popup'></span>").appendTo(jqPopup);

            const jqValues = SBGrid3.$("<span class='sbgrid-values'></span>").appendTo(jqColumn);
            const jqValue = SBGrid3.$("<span class='sbgrid-value'></span>").appendTo(jqValues);
            const jqul = SBGrid3.$('<ul></ul>').appendTo(jqValue);
            this.renderList(rtnGrid, jqul);

            const jqConfirm = SBGrid3.$("<div class='sbgrid-confirm'></div>").appendTo(jqColumn)
            const jqSubmit =  SBGrid3.$("<button class='sbgrid-summit' type= 'button' >Submit</button>").appendTo(jqConfirm);
            const jqCancel =  SBGrid3.$("<button class='sbgrid-cancel' type= 'button' >닫기</button>").appendTo(jqConfirm);

            this.popupPosition(rtnGrid, jqPopup, jqColumn.height());

            jqSubmit.on('click', function(){
                NsfUtilSBGrid.pageBarColumnShowHide.columnVisible(rtnGrid, jqul);
            });

            jqCancel.on('click', function(){
                jqPopup.remove();
            });
        },
        popupPosition : function(grid, jqPopup, height){
            let gridDiv = jQuery(grid.container).parent('div');
            const target = grid.container.find('#btnColumn'+gridDiv.attr('id'));
            const targetOffset = target.offset();
            const gridOffset = grid.container.offset();
            // if(gridDiv.attr('id') == 'sbGridM1'){
            //     jqPopup.css({top: targetOffset.top - 360,   left: targetOffset.left/2  });
            // } else if(gridDiv.attr('id') == 'sbGridD1'){
            //     jqPopup.css({top:(targetOffset.top) - 665, left : targetOffset.left/2});
            // }
            //jqPopup.css({top:(targetOffset.top)-height, left : targetOffset.left+target.outerWidth()});

        },
        columnVisible: function(grid, jqUl){
            const boxes = jqUl.find('>li>input');
            boxes.each((index,element) => {
                const jqElement = SBGrid3.$(element);
                const field = jqElement.val();
                const columns = SBGrid3.getColumnByField(grid,field);
                if(columns && columns.length > 0){
                    const checked = jqElement.is(':checked');
                    SBGrid3.columnVisible(grid,columns[0],checked)
                }
            });
        },
        renderList: function(grid, jqUl){
            const columns = SBGrid3.getColumns(grid);
            for(let i = 1; i < columns.length; i++){
                const column = columns[i];
                if(column.caption !== undefined && column.caption !== '' &&column.caption !== '_status_'){
                    const li = SBGrid3.$("<li></li>").appendTo(jqUl);
                    const ck = SBGrid3.$("<input type='checkbox' name='"+column.caption+"' value='"+column.field+"'/>").appendTo(li);
                    const label = SBGrid3.$("<label>"+column.caption+"</label>").appendTo(li);
                    if (column.visible) ck.attr('checked', true);
                }
            }
        }
    }
}

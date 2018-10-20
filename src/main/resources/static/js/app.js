/**
 * Created by lish on 18/10/10.
 */
var map;
$(function(){
    /*===========写在前面的话============*/
    /** 开源的gis前端框架只支持WGS84（EPSG：4326）和WEBMERCOT（102100（3587））
     * proj.js可作转换，这里使用的是leaflet框架
     */
    require([
        "esri/map",
        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/GraphicsLayer","esri/layers/FeatureLayer",
        "esri/layers/ImageParameters",
        "esri/layers/LayerDrawingOptions", "esri/renderers/SimpleRenderer",
        "esri/tasks/QueryTask","esri/tasks/query","esri/tasks/StatisticDefinition","esri/tasks/IdentifyTask","esri/tasks/IdentifyParameters",
        "esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol", "esri/Color",
        "esri/geometry/Point", "esri/SpatialReference",
        "esri/symbols/SimpleMarkerSymbol", "esri/graphic",
        "esri/toolbars/draw",
        "esri/arcgis/utils", "esri/dijit/LayerList", "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
        "dojo/domReady!"
    ], function (Map,ArcGISTiledMapServiceLayer, ArcGISDynamicMapServiceLayer, GraphicsLayer,FeatureLayer,ImageParameters,LayerDrawingOptions,SimpleRenderer,QueryTask,Query,
    StatisticDefinition,SimpleFillSymbol,IdentifyTask,IdentifyParameters
    ,SimpleLineSymbol,Color,Point, SpatialReference, SimpleMarkerSymbol, Graphic,Draw,arcgisUtils,LayerList) {

        /**
         * 全局变量
         */
        var url;//点击行元素当前查询图层url

        $(".bs-main-container").css("height",document.body.clientHeight-$("header").outerHeight()-$("footer").outerHeight());
        $(".panel-heading").click(function(e){
            /*切换折叠指示图标*/
            $(this).find("span").toggleClass("glyphicon-chevron-down");
            $(this).find("span").toggleClass("glyphicon-chevron-up");
        });
        $(".bs-group").on('click','li',function () {
            $(this).parents('div.leftMenu').siblings().find('li').removeClass("active");
            $(this).addClass("active").siblings().removeClass("active");
            $('body .modal').modal('hide');
        });
        //全局监听弹框可拖动
        $(document).on("show.bs.modal", ".modal", function(){
            $(".modal-backdrop").hide();
            $(this).draggable();//为模态对话框添加拖拽
            $(this).css({display:"inline-block",overflow:"hidden" });//禁止模态对话框的半透明背景滚动
            $(this).css({
                width:$(this).find("div.modal-dialog").outerWidth(true),
                height:$(this).find("div.modal-dialog").outerHeight(true),
                left:$("body").width()/4,
                top:$("body").height()/4
            });
        });

        map = new Map("map", {
            sliderOrientation : "horizontal",
            logo:false
        });
        var baseMapLayer = new ArcGISTiledMapServiceLayer(SZPL.dzdtServiceUrl, { id:"电子底图",displayLevels:[0,1,2,3,4,5,6,7,8]});
        var imageParameters = new ImageParameters();
        imageParameters.format = "jpeg"; //set the image type to PNG24, note default is PNG8.

        //Takes a URL to a non cached map service.
        var djdcMapServiceLayer = new ArcGISDynamicMapServiceLayer(SZPL.djdcUrl, {
            "id":"djdc",
            "opacity" : 1,
            "imageParameters" : imageParameters
        });

        var layerDrawingOptions = [];
        var layerDrawingOption = new LayerDrawingOptions();

        layerDrawingOption.renderer = new SimpleRenderer(SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
                new Color([255,0,0]), 2),new Color([255,255,0,0.25]));

        layerDrawingOptions[1] = layerDrawingOption;
        djdcMapServiceLayer.setLayerDrawingOptions(layerDrawingOptions);
        var drawLayer = new GraphicsLayer({id:"drawLayer"});
        var showLayer = new GraphicsLayer({id:"showLayer"});
        map.addLayers([baseMapLayer,djdcMapServiceLayer,drawLayer,showLayer]);

        map.on("layers-add-result",function () {
            var layerListWidget = new LayerList({
                map: map,
                showLegend: true,
                showSubLayers: false,
                showOpacitySlider: true,
                layers: []
            },"layerList");
            layerListWidget.startup();
        });
        /**
         * **************************属性查询**********************************
         */
        //监听属性查询model弹框
        $("body").on("shown.bs.modal", "#attrQuery", function(){
            var allLayers = map.getLayersVisibleAtScale();
            for(var i=0 ;i<allLayers.length ; i++){
                var options ;
                if(allLayers[i].tileInfo){//切片动态图层
                    console.log(allLayers[i].url);//不用处理
                }else if(allLayers[i].dynamicLayerInfos){//动态图层
                    options = '<optgroup label="" data-subtext="'+SZPL.getValueFromLayers(allLayers[i].id,"name")+'">';
                    var layerInfos = allLayers[i].layerInfos;
                    for(var j=0;j<layerInfos.length;j++){
                        var layer = SZPL.getValueFromLayers(allLayers[i].id,"childLayer",layerInfos[j].name);
                        if(layer) {
                            options += '<option class="get-class" value="'+allLayers[i].url+"/"+layer.id+'">'+layer.alias+'</option>';
                        }
                    }
                    options += '</optgroup>';
                    console.log(allLayers[i]);
                }
            }
            $("#layerPick")[0].innerHTML = options;
            $("#layerPick").selectpicker('refresh');
        });
        $("#attrQuery").on("click","#doAttrQuery",function () {
            if($("#attrQueryForm").data("bootstrapValidator").isValid()){
                url =$("#layerPick").val();
                var condition = $.trim($("#searchCondition").val());
                var query = new Query();
                query.where = condition;
                query.returnGeometry = false;
                query.outFields = ["*"];
                mapUtil.query(url,query,function (result) {
                    console.log(result);
                    $('#attrQueryTable').css({"min-width":"1500px"});
                    initTable($('#attrQueryTable'),result);
                    $("#attrQuery").css({height:$("#attrQuery .modal-dialog").outerHeight(true)+"px"});
                },function (error) {
                    alert(error)
                })
            }
        })
        /**
         * 公共
         */
        $("body").on("hidden.bs.modal", "#attrQuery", function(){
            clearScene();
        });
        $("body").on("hidden.bs.modal", "#spatialQuery", function(){
            clearScene();
            $("#layerPick3")[0].innerHTML = "";
            $("#layerPick3").attr("disabled", "disabled");
        });
        function clearScene(){
            map.graphics.clear();
            map.getLayer("showLayer").clear();
            map.getLayer("drawLayer").clear();
        }
        function initTable($$element,result) {
            var fields = result.fields;
            var features = result.features;
            var columnsArr = [],featuresArr = [];
            fields.forEach(function (value,index,arr) {
                var column = new Object();
                column.field = value.name;
                column.title = value.alias;
                if(value.name.toUpperCase() == "OBJECTID"){
                    column.visible = false;
                }else if(value.name.toUpperCase() == "SHAPE.AREA"){
                    column.title = "面积";
                }else if(value.name.toUpperCase() == "SHAPE.LENGTH"||value.name.toUpperCase() == "SHAPE.LEN"){
                    column.title = "长度";
                }
                columnsArr.push(column);
            });
            features.forEach(function (value,index,arr) {
                featuresArr.push(value.attributes);
            });
            $$element.bootstrapTable('destroy');
            $$element.bootstrapTable({
                columns: columnsArr,
                search:true,
                sortName:"OBJECTID",
                sortOrder:'asc',
                pagination: true,
                pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
                pageList:[5,8,10],
                pageSize: 8,
                showColumns:true,
                data:featuresArr,
                onClickRow:function(row, $element){
                    $$element.find('.info').removeClass('info');
                    $($element).addClass('info');
                    var query = new Query();
                    query.where = "OBJECTID = '"+ row.OBJECTID+"'";
                    query.returnGeometry = true;
                    query.outFields = ["*"];
                    mapUtil.query(url,query,function (result) {
                        var geo = result.features[0].geometry;
                        var symbol;
                        if(!geo){
                            alert("当前点击行数据无对应图形数据！");
                        }
                        switch (geo.type) {
                            case "point":
                                symbol = mapUtil.highLightMarkerSymbol;
                                break;
                            case "polyline":
                                symbol = mapUtil.highLightLineSymbol;
                                break;
                            case "polygon":
                                symbol = mapUtil.highLightFillSymbol
                        }
                        map.setExtent(geo.getExtent().expand(2));
                        map.graphics.clear();
                        map.graphics.add(new Graphic(geo,symbol));
                        console.log(result);
                    },function (error) {
                        alert(error)
                    })
                }
            });
        }
        function initSearchGraphic(result){
            var symbol;
            switch (result.geometryType) {
                case "esriGeometryPolygon":
                    symbol = mapUtil.showFillSymbol;
                    break;
                case "esriGeometryPolyline":
                    symbol = mapUtil.showLineSymbol;
                    break;
                case "esriGeometryPoint":
                    symbol = mapUtil.showMarkerSymbol;
                    break;
            }
            var features = result.features;
            map.getLayer("showLayer").clear();
            features.forEach(function (value) {
                value.symbol = symbol;
                map.getLayer("showLayer").add(value);
            });
        }
        /**
         * **************************空间查询**********************************
         */
        $("body").on("shown.bs.modal", "#spatialQuery", function(){
            var allLayers = map.getLayersVisibleAtScale();
            for(var i=0 ;i<allLayers.length ; i++){
                var options ;
                if(allLayers[i].tileInfo){//切片动态图层
                    console.log(allLayers[i].url);//不用处理
                }else if(allLayers[i].dynamicLayerInfos){//动态图层
                    options = '<optgroup label="" data-subtext="'+SZPL.getValueFromLayers(allLayers[i].id,"name")+'">';
                    var layerInfos = allLayers[i].layerInfos;
                    for(var j=0;j<layerInfos.length;j++){
                        var layer = SZPL.getValueFromLayers(allLayers[i].id,"childLayer",layerInfos[j].name);
                        if(layer) {
                            if (i==0&&j==0){
                                options += '<option class="get-class" value="'+allLayers[i].url+"/"+layer.id+","+layer.alias+'" selected>'+layer.alias+'</option>';
                            } else {
                                options += '<option class="get-class" value="'+allLayers[i].url+"/"+layer.id+","+layer.alias+'">'+layer.alias+'</option>';
                            }
                        }
                    }
                    options += '</optgroup>';
                    console.log(allLayers[i]);
                }
            }
            $("#layerPick2")[0].innerHTML = options;
            $("#layerPick2").selectpicker('refresh');
        });
        $("#pickType").on("click",'img',function () {
            var handle;
            var drawGeo = new Draw(map);
            var src = $(this).attr("src");
            if(src.split("-on").length>1){//失活状态
                $(this).attr("src","../img/draw"+$(this).attr("data-type")+".png");
                drawGeo.deactivate();
                dojo.disconnect(handle);
            }else{//当前是激活状态
                $(this).attr("src","../img/draw"+$(this).attr("data-type")+"-on.png");
                var realType = Draw.RECTANGLE;
                var drawSymbol = mapUtil.drawFillSymbol;
                switch ($(this).attr("data-type")) {
                    case "point":
                        realType = Draw.POINT;
                        drawSymbol = mapUtil.drawMarkerSymbol;
                        break;
                    case "line":
                        realType = Draw.POLYLINE;
                        drawSymbol = mapUtil.drawLineSymbol;
                        break;
                    case "polygon":
                        realType = Draw.POLYGON;
                        drawSymbol = mapUtil.drawFillSymbol;
                        break;
                }
                drawGeo.activate(realType);
                handle = dojo.connect(drawGeo,"onDrawEnd",function(geometry){
                    drawGeo.deactivate();
                    dojo.disconnect(handle);
                    map.getLayer('drawLayer').clear();
                    map.getLayer('drawLayer').add(new Graphic(geometry,drawSymbol));
                    $("#pickType .point").attr("src","../img/drawpoint.png");
                    $("#pickType .line").attr("src","../img/drawline.png");
                    $("#pickType .polygon").attr("src","../img/drawpolygon.png");
                });
            }
        })
        $("#spatialQuery").on("click","#doSpatialQuery",function () {
            if($("#spatialQueryForm").data("bootstrapValidator").isValid()){
                var graphics = map.getLayer("drawLayer").graphics;
                if(graphics.length==0){
                    alert("请先按范围拾取图层！");
                    return;
                }
                var values = $("#layerPick2").val();
                var options = "";
                values.forEach(function (value,index) {
                    if(index == 0){
                        options += "<option class='get-class' value='"+value.split(",")[0]+"' selected>"+value.split(",")[1]+"</option>";
                    }else {
                        options += "<option class='get-class' value='"+value.split(",")[0]+"'>"+value.split(",")[1]+"</option>";
                    }
                });
                $("#layerPick3").removeAttr("disabled");
                $("#layerPick3")[0].innerHTML = options;
                $("#layerPick3").selectpicker('refresh');
                doSpatialQuery();
            }
        })
        function doSpatialQuery() {
            var graphics = map.getLayer("drawLayer").graphics;
            url = $("#layerPick3").selectpicker('val');
            var query = new Query();
            query.geometry = graphics[0].geometry;
            query.returnGeometry = true;
            query.outFields = ["*"];
            mapUtil.query(url,query,function (result) {
                console.log(result);
                initSearchGraphic(result);
                $('#spatialQueryTable').css({"min-width":"1500px"});
                initTable($("#spatialQueryTable"),result);
                $("#spatialQuery").css({height:$("#spatialQuery .modal-dialog").outerHeight(true)+"px"});
            },function (error) {
                alert(error)
            })
        }

        /**
         * 统计模块
         */
        $("body").on("shown.bs.modal", "#attrStatistic", function(){
            var allLayers = map.getLayersVisibleAtScale();
            console.log(allLayers);
            var featureLayerUrl;
            for(var i=0 ;i<allLayers.length ; i++){
                var options ;
                if(allLayers[i].tileInfo){//切片动态图层
                    console.log(allLayers[i].url);//不用处理
                }else if(allLayers[i].dynamicLayerInfos){//动态图层
                    options = '<optgroup label="" data-subtext="'+SZPL.getValueFromLayers(allLayers[i].id,"name")+'">';
                    var layerInfos = allLayers[i].layerInfos;
                    for(var j=0;j<layerInfos.length;j++){
                        var layer = SZPL.getValueFromLayers(allLayers[i].id,"childLayer",layerInfos[j].name);
                        if(layer) {
                            /*if (j==0){
                                options += '<option class="get-class" value="'+allLayers[i].url+"/"+layer.id+","+layer.alias+'" selected>'+layer.alias+'</option>';
                                featureLayerUrl = allLayers[i].url+"/"+layer.id;
                            } else {

                            }*/
                            options += '<option class="get-class" value="'+allLayers[i].url+"/"+layer.id+","+layer.alias+'">'+layer.alias+'</option>';
                        }
                    }
                    options += '</optgroup>';
                }
            }
            $("#attrStatisticLayerPick")[0].innerHTML = options;
            $("#attrStatisticLayerPick").selectpicker('refresh');

            console.log(featureLayerUrl);
            var handleFeatureLayer  = new FeatureLayer(featureLayerUrl,{
                mode: FeatureLayer.MODE_ONDEMAND,
                    infoTemplate: infoTemplate,
                    outFields: ["*"]
            });
            console.log(handleFeatureLayer);
        });
    });
});

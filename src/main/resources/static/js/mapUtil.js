;var mapUtil;
if(!mapUtil){
    mapUtil = {}
}
$(function(){
    /**
     * 地图工具函数
     */
    require([
        "esri/map",
        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/GraphicsLayer",
        "esri/layers/ImageParameters",
        "esri/layers/LayerDrawingOptions", "esri/renderers/SimpleRenderer",
        "esri/tasks/QueryTask","esri/tasks/query",
        "esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol", "esri/Color",
        "esri/geometry/Point", "esri/SpatialReference",
        "esri/symbols/SimpleMarkerSymbol", "esri/graphic",
        "esri/arcgis/utils", "esri/dijit/LayerList", "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
        "dojo/domReady!"
    ], function (Map,ArcGISTiledMapServiceLayer, ArcGISDynamicMapServiceLayer,GraphicsLayer, ImageParameters,LayerDrawingOptions,SimpleRenderer,QueryTask,Query,SimpleFillSymbol
        ,SimpleLineSymbol,Color,Point, SpatialReference, SimpleMarkerSymbol, Graphic,arcgisUtils,LayerList) {

        // 画点线面symbol
        mapUtil.drawFillSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color('blue'), 2),new Color([255,255,0,0.25]));
        mapUtil.drawLineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            new Color('blue'), 3);
        mapUtil.drawMarkerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color('blue'), 1),
            new Color('blue'));
        // 聚簇显示点线面symbol
        mapUtil.showFillSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
                new Color('green'), 2),new Color([255,255,0,0.25]));
        mapUtil.showLineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH,
            new Color('green'), 3);
        mapUtil.showMarkerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color('green'), 1),
            new Color('green'));
        // 高亮显示点线面symbol
        mapUtil.highLightFillSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
                new Color([255,0,0]), 2),new Color([255,255,0,0.25]));
        mapUtil.highLightLineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH,
            new Color([255,0,0]), 5);
        mapUtil.highLightMarkerSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([255,0,0]), 1),
            new Color([255,0,0]));

        mapUtil.query = function(url,query,successBack,errorBack) {
            var queryTask = new QueryTask(url);
            if(successBack&&errorBack){
                queryTask.execute(query,function (result) {
                    successBack(result);
                    },function (error) {
                    errorBack(error);
                });
            }else if(successBack){
                queryTask.execute(query,function (result) {
                    successBack(result);
                });
            }else if(errorBack){
                queryTask.execute(query,function (error) {
                    errorBack(error);
                });
            }
        }
        mapUtil.queryForCount = function (url, query, successback, errorback){
            var queryTask = new QueryTask(url);
            if(successback && errorback){
                queryTask.executeForCount(query, function(result){
                        successback(result);
                        }, function(error){
                        errorback(error);
                });
            } else if(successback){
                queryTask.executeForCount(query, function(result){
                        successback(result);
                });
            } else if(errorback){
                queryTask.executeForCount(query, function(error){
                        errorback(error);
                });
            }
        };

    })
})
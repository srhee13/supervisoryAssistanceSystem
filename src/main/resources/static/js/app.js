/**
 * Created by lish on 18/10/10.
 */
var map,view;
$(function(){
    $(".bs-main-container").css("height",window.outerHeight-$("header").outerHeight()-$("footer").outerHeight());
    $(".panel-heading").click(function(e){
        /*切换折叠指示图标*/
        $(this).find("span").toggleClass("glyphicon-chevron-down");
        $(this).find("span").toggleClass("glyphicon-chevron-up");
    });
    $(".bs-group").on('click','li',function () {
        $(this).parents('div.leftMenu').siblings().find('li').removeClass("active");
        $(this).addClass("active").siblings().removeClass("active");
    });

    /*===========写在前面的话============*/
    /** 开源的gis前端框架只支持WGS84（EPSG：4326）和WEBMERCOT（102100（3587））
     * proj.js可作转换，这里使用的是leaflet框架
     */
   /* var map = L.map('map',{
        crs: L.CRS.EPSG3857, //要使用的坐标参考系统，默认的坐标参考系,互联网地图主流坐标系
        // crs: L.CRS.EPSG4326, //WGS 84坐标系，GPS默认坐标系
        zoomControl: true,
        // minZoom: 1,
        attributionControl: true,
    }).setView([22.27, 113.46], 6);

    L.esri.dynamicMapLayer({
        url: SZPL.dzdtServiceUrl,
        opacity: 0.7,
        useCors: true, //是否浏览器在跨域的情况下使用GET请求。
    }).addTo(map);*/

    /*require(["esri/map", "dojo/domReady!"], function(Map) {
        var map = new Map("map", {
            center: [-118, 34.5],
            zoom: 8,
            basemap: "topo"
        });
    });*/

    require([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/TileLayer",
        "esri/layers/MapImageLayer",
        "esri/config"
    ], function(Map, MapView,TileLayer,MapImageLayer,esriConfig){
        esriConfig.request.proxyUrl = "http://168.168.1.8:8089/Java/proxy.jsp";

        map = new Map({
            // basemap: "streets"
        });
        view = new MapView({
            container: "map",  // Reference to the scene div created in step 5
            map: map,  // Reference to the map object created before the scene
            zoom: 5,  // Sets zoom level based on level of detail (LOD)
            center: [113.46,22.27]  // Sets center point of view using longitude,latitude
        });
        var dzdtLayer = new TileLayer({
            url: SZPL.dzdtServiceUrl,
            id: "dzdt",
            opacity: 0.7
        });
        var djdcLayer = new MapImageLayer({
            url: SZPL.lvdiUrl,
            id:'djdc'
        });
        map.layers.add(dzdtLayer);
        // map.layers.add(djdcLayer);
    });

});

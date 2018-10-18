/**
 * Created by lish on 18/10/10.
 */
;var SZPL;
if(!SZPL){
    SZPL = {};
}
$(function(){//realestate.szpl.gov.cn:8010   168.168.1.8:5555
    /*SZPL.dzdtServiceUrl =
        "http://realestate.szpl.gov.cn:8010/ArcGIS/rest/services/DigitalMapWebMerc/MapServer";*/
    SZPL.dzdtServiceUrl = "http://192.168.37.152:89/arcgis/rest/services/baseMap/cyyf_basemap_201712_01/MapServer";
    // SZPL.dzdtServiceUrl = "http://192.168.2.37/ArcGIS/rest/services/DigitalMap/MapServer";
    //SZPL.dzdtServiceUrl = "http://suplicmap.szpl.gov.cn:9080/publicdata1/rest/services/BDCJ/DigitalMap_2435/MapServer";
    // SZPL.djdcUrl = "https://suplicmap.szpl.gov.cn:9443/publicdata1ssl/rest/services/BDCJ/DJDC2017_2435/MapServer";
    SZPL.djdcUrl ="http://192.168.37.152:89/arcgis/rest/services/land/cadastral_inventory/MapServer";
    SZPL.lvdiUrl = "http://192.168.37.152:89/arcgis/rest/services/land/green_land/MapServer";
});
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
    // SZPL.dzdtServiceUrl = "http://192.168.37.152:89/arcgis/rest/services/baseMap/cyyf_basemap_201712_01/MapServer";
    // SZPL.dzdtServiceUrl = "http://192.168.2.37/ArcGIS/rest/services/DigitalMap/MapServer";
    SZPL.dzdtServiceUrl = "http://suplicmap.szpl.gov.cn:9080/publicdata1/rest/services/BDCJ/DigitalMap_2435/MapServer";
    // SZPL.djdcUrl = "https://suplicmap.szpl.gov.cn:9443/publicdata1ssl/rest/services/BDCJ/DJDC2017_2435/MapServer";
    SZPL.djdcUrl ="http://suplicmap.szpl.gov.cn:9080/publicdata1/rest/services/BDCJ/DJDC2017_2435/MapServer";
    SZPL.lvdiUrl = "http://192.168.37.152:89/arcgis/rest/services/land/green_land/MapServer";

    SZPL.layers = {
        "djdc":{
            name:"地籍调查",
            url:SZPL.djdcUrl,
            spatialReference:{wkid: 2435, latestWkid: 2435},
            childLayer:[{
                id:0,
                name: "SDE.LAND_PRE_JZW",
                alias:"前期清查建筑物",
                geometryType:"esriGeometryPolygon",
                fields:[{
                    name:"OBJECTID",type: "esriFieldTypeOID",alias:"OBJECTID"
                },{
                    name:"LPW_ID" ,type:"esriFieldTypeString",alias: "核减建筑物表ID" , length: 10
                }, {
                    name:"JZW_STATUS" ,type: "esriFieldTypeString" , alias: '建筑物状态' , length: 20
                }, {
                    name:"LCS_TASK_ID" ,type:"esriFieldTypeString" , alias: '地籍调查任务表主键' , length: 10
                }, {
                    name:"VALID_FLAG" ,type: "esriFieldTypeString" , alias: '有效标识' , length: 2
                }, {
                    name:"LAND_PRE_GRID_ID" ,type: "esriFieldTypeString" , alias: '前期清查基础网格表主键' , length: 10
                }, {
                    name:"LU_FUNCTION" ,type: "esriFieldTypeString" , alias: '用途代码' , length: 400
                }, {
                    name:"LU_CODE" ,type: "esriFieldTypeString" , alias: '用途代码' , length: 200
                }, {
                    name:"NAME_AND_NO" ,type: "esriFieldTypeString" , alias: '名称' , length: 200
                }, {
                    name:"SHAPE" ,type: "esriFieldTypeGeometry" , alias: 'SHAPE'
                }, {
                    name:"SHAPE.AREA" ,type: "esriFieldTypeDouble" , alias: 'SHAPE.AREA'
                }, {
                    name:"SHAPE.LEN" ,type: "esriFieldTypeDouble" , alias: 'SHAPE.LEN'
                }, {
                    name:"IS_DELETE" ,type:"esriFieldTypeString" , alias: '逻辑删除' , length: 1
                }, {
                    name:"IS_DISMANTLE" ,type: "esriFieldTypeString" , alias: '标识拆除' , length: 2
                }]
            },{
                id:1,
                name: "SDE.LAND_JZX",
                alias:"界址线",
                geometryType:"esriGeometryPolyline",
            },{
                id:2,
                name: "SDE.LAND_PRE_JZX",
                alias:"前期清查界址线",
                geometryType:"esriGeometryPolyline",
            },{
                id:3,
                name: "SDE.LAND_ZD",
                alias:"宗地",
                geometryType:"esriGeometryPolygon",
            }]
        }
    }

    SZPL.getValueFromLayers = function (uniqueName,rootName,childName) {//图层标识名称，地图图层属性名称，featureLayer的名称name
        if(!uniqueName){
            return;
        }
        if(rootName&&!childName){
            return SZPL.layers[uniqueName][rootName];
        }else if(childName){
            var child = SZPL.layers[uniqueName][rootName];
            for(var i=0;i<child.length;i++){
                if(child[i].name == childName){
                    return child[i];
                }
            }
        }
    }
});
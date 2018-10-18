<!DOCTYPE html></<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <meta http-equiv="Access-Control-Allow-Origin" content="*" />
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>监察辅助决策系统</title>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <!--<script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>-->
    <#--<script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>-->
    <![endif]-->

    <link rel="stylesheet" href="./third/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="./third/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="./third/bootstrap/css/bootstrap-theme.css">

    <link rel="stylesheet" href="./css/common.css">

    <script src="./third/jquery/jquery-3.3.1.js"></script>
    <script src="./third/bootstrap/js/bootstrap.js"></script>
    <script src="./third/bootstrap/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="./third/leaflet/leaflet.css">
    <script src="./third/leaflet/leaflet.js"></script>
    <script src="./third/proj4leaflet/proj4.js"></script>
    <script src="./third/proj4leaflet/proj4leaflet.js"></script>
    <script src="./third/esri-leaflet/esri-leaflet.js"></script>
    <#--<link rel="stylesheet" href="https://js.arcgis.com/4.9/esri/css/main.css">
    <script src="https://js.arcgis.com/4.9/"></script>-->
<#--<link rel="stylesheet" href="http://realestate.szpl.gov.cn:8009/3.20_api/dojo/dijit/themes/tundra/tundra.css">
<link rel="stylesheet" href="http://realestate.szpl.gov.cn:8009/3.20_api/esri/css/esri.css">
<script src="http://realestate.szpl.gov.cn:8009/3.20_api/init.js"></script>-->
    <#--<script src="http://192.168.2.40:3001/4.9/dojo/dojo.js"></script>-->
    <link rel="stylesheet" href="./third/4.9/esri/css/main.css">
    <script src="./third/4.9/dojo/dojo.js"></script>
    <#--<link rel="stylesheet" href="http://localhost:8089/4.9/esri/css/main.css">
    <script src="http://localhost:8089/4.9/dojo/dojo.js"></script>-->
    <script type="text/javascript" src="./js/config.js"></script>
</head>
<body>
<header class="bs-header navbar navbar-static-top bs-docs-nav">
    <div class="bs-header">
        <div class="col-md-3">
            <h4 class="bs-system-name"><#--监察辅助决策系统--></h4>
        </div>
        <div class="col-md-9"></div>
    </div>
</header>
<div class="bs-main-container">
    <div class="bs-left-menu col-md-2">
        <#--<div class="" role="tablist">&lt;#&ndash;panel-group table-responsive&ndash;&gt;-->
            <div class="leftMenu"><#--panel panel-primary-->
                <!-- 利用data-target指定要折叠的分组列表 -->
                <div class="panel-heading" id="collapseListGroupHeading1" data-toggle="collapse" data-target="#collapseListGroup1" role="tab" >
                    <h4 class="panel-title">
                        数据查询
                        <span class="glyphicon glyphicon-chevron-up right"></span>
                    </h4>
                </div>
                <!-- .panel-collapse和.collapse标明折叠元素 .in表示要显示出来 -->
                <div id="collapseListGroup1" class="panel-collapse collapse in bs-group" role="tabpanel" aria-labelledby="collapseListGroupHeading1">
                    <ul class="bs-list-ul">
                        <li class="bs-list-li">
                            <a href="#"><span class="glyphicon glyphicon-record"></span>&nbsp;&nbsp;查询1</a>
                        </li>
                        <li class="bs-list-li">
                            <a href="#"><span class="glyphicon glyphicon-record"></span>&nbsp;&nbsp;查询2</a>
                        </li>
                    </ul>
                </div>
            </div><!--panel end-->
            <div class="leftMenu">
                <div class="panel-heading" id="collapseListGroupHeading2" data-toggle="collapse" data-target="#collapseListGroup2" role="tab" >
                    <h4 class="panel-title">
                        数据分析
                        <span class="glyphicon glyphicon-chevron-down right"></span>
                    </h4>
                </div>
                <div id="collapseListGroup2" class="panel-collapse collapse bs-group" role="tabpanel" aria-labelledby="collapseListGroupHeading2">
                    <ul class="bs-list-ul">
                        <li class="bs-list-li">
                            <a href="#"><span class="glyphicon glyphicon-record"></span>&nbsp;&nbsp;分析1</a>
                        </li>
                        <li class="bs-list-li">
                            <a href="#"><span class="glyphicon glyphicon-record"></span>&nbsp;&nbsp;分析2</a>
                        </li>
                    </ul>
                </div>
            </div>
        <#--</div>-->
    </div>
    <div class="bs-right-map col-md-10">
        <div id="map"></div>
    </div>

</div>
<footer class="bs-footer text-center navbar-fixed-bottom">
    <div>
        <span>&nbsp&nbsp</span>
    </div>
    <div>
        <span>版权所有&copy;<strong>深圳市规划国土房产信息中心</strong></span>
    </div>
</footer>
<script type="text/javascript" src="./js/app.js"></script>
</body>
</html>
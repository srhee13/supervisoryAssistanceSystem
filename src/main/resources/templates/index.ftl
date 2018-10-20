<!DOCTYPE html></<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <meta http-equiv="Access-Control-Allow-Origin" content="*" />
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>监察辅助决策系统</title>

    <link rel="stylesheet" href="./third/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="./third/bootstrap/css/bootstrap-theme.css">
    <link rel="stylesheet" href="./third/bootstrap/plugins/bootstrap-select.css">
    <link rel="stylesheet" href="./third/bootstrap/plugins/bootstrapValidator.css">
    <link rel="stylesheet" href="./third/bootstrap/plugins/bootstrap-table.min.css">
    <link rel="stylesheet" href="./third/jquery/jquery-ui.min.css">
    <link rel="stylesheet" href="./third/jquery/jquery-ui.theme.min.css">
    <link rel="stylesheet" href="./third/jquery/jquery-ui.structure.min.css">
    <link rel="stylesheet" href="./css/common.css">

    <script src="./third/jquery/jquery-3.3.1.js"></script>
    <script src="./third/jquery/jquery-ui.min.js"></script>
    <script src="./third/bootstrap/js/bootstrap.js"></script>
    <script src="./third/bootstrap/plugins/bootstrap-select.js"></script>
    <script src="./third/bootstrap/plugins/bootstrapValidator.js"></script>
    <script src="./third/bootstrap/plugins/bootstrap-table.min.js"></script>
    <script src="./third/bootstrap/plugins/bootstrap-table-zh-CN.js"></script>
    <script>
        // var apiBaseUrl = "http://lix.gis9:44444/4.9/dojo";
        var apiBaseUrl = "http://lix.gis:3000/3.26/dojo";
    </script>

    <link rel="stylesheet" href="http://lix.gis:3000/3.26/dijit/themes/claro/claro.css">
    <link rel="stylesheet" href="http://lix.gis:3000/3.26/esri/css/esri.css">
    <script src="http://lix.gis:3000/3.26/init.js"></script>
    <script type="text/javascript" src="./js/config.js"></script>
    <script type="text/javascript" src="./js/mapUtil.js"></script>
    <script type="text/javascript" src="./js/validator.js"></script>
</head>
<body>
<header class="bs-header navbar navbar-static-top bs-docs-nav">
    <div class="bs-header">
        <#--<div class="col-md-3">
            <h4 class="bs-system-name">&lt;#&ndash;监察辅助决策系统&ndash;&gt;</h4>
        </div>-->
        <div class="col-md-9"></div>
    </div>
</header>
<div class="bs-main-container">
    <div class="bs-left-menu col-md-2">
        <div class="" role="tablist">
            <div class="leftMenu">
                <!-- 利用data-target指定要折叠的分组列表-->
                <div class="panel-heading" id="collapseListGroupHeading1" data-toggle="collapse" data-target="#collapseListGroup1" role="tab" >
                    <h4 class="panel-title">
                        数据查询
                        <span class="glyphicon glyphicon-chevron-up right"></span>
                    </h4>
                </div>
                <!-- .panel-collapse和.collapse标明折叠元素 .in表示要显示出来 -->
                <div id="collapseListGroup1" class="panel-collapse collapse bs-group" role="tabpanel" aria-labelledby="collapseListGroupHeading1">
                    <ul class="bs-list-ul">
                        <li class="bs-list-li" data-toggle="modal" data-target="#attrQuery">
                            <a href="#"><span class="glyphicon glyphicon-record"></span>&nbsp;&nbsp;属性查询</a>
                        </li>
                        <li class="bs-list-li" data-toggle="modal" data-target="#spatialQuery">
                            <a href="#"><span class="glyphicon glyphicon-record"></span>&nbsp;&nbsp;空间查询</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="leftMenu">
                <div class="panel-heading" id="collapseListGroupHeading2" data-toggle="collapse" data-target="#collapseListGroup2" role="tab" >
                    <h4 class="panel-title">
                        数据分析
                        <span class="glyphicon glyphicon-chevron-down right"></span>
                    </h4>
                </div>
                <div id="collapseListGroup2" class="panel-collapse collapse in bs-group" role="tabpanel" aria-labelledby="collapseListGroupHeading2">
                    <ul class="bs-list-ul">
                        <li class="bs-list-li" data-toggle="modal" data-target="#attrStatistic">
                            <a href="#"><span class="glyphicon glyphicon-record"></span>&nbsp;&nbsp;属性统计</a>
                        </li>
                        <li class="bs-list-li" data-toggle="modal" data-target="#spatialStatistic">
                            <a href="#"><span class="glyphicon glyphicon-record"></span>&nbsp;&nbsp;空间统计</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="bs-right-map col-md-10">
        <div id="map"></div>
        <div id="layerListPane" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'right'">
            <div id="layerList"></div>
        </div>
    </div>
</div>
<!-- 浮动元素 -->
<div id="layerManager" style="">
    <img src="./img/navigative/pan-on.png">
</div>

<footer class="bs-footer text-center navbar-fixed-bottom">
    <div>
        <span>&nbsp&nbsp</span>
    </div>
    <div>
        <span>版权所有&copy;<strong>深圳市规划国土房产信息中心</strong></span>
    </div>
</footer>
<!-- 模态弹框 -->
<!-- 数据查询1 -->
<div class="modal fade" id="attrQuery" tabindex="-1" role="dialog" aria-labelledby="attrQueryLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false">
    <div class="modal-dialog" role="document" style="display: inline-block">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">属性查询</h4>
            </div>
            <div class="modal-body">
                <form id="attrQueryForm" class="form-horizontal" method="post" role="form" action="#">
                    <div class="form-group">
                        <label class="col-lg-2 col-md-2 col-sm-2 control-label">图层</label>
                        <div class="col-lg-10 col-md-10 col-sm-10">
                            <select id="layerPick" class="selectpicker show-tick form-control"  data-live-search="true"></select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-2 col-md-2 col-sm-2 control-label control-label">查询条件</label>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" id="searchCondition" name="searchCondition" placeholder="name='福田区'">
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2">
                            <input type="button" class="btn btn-success" id="doAttrQuery" value="查询">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-2 col-md-2 col-sm-2 control-label">结果</label>
                        <div class="col-lg-10 col-md-10 col-sm-10" >
                            <table data-toggle="table" data-search=”true” data-height="400" id="attrQueryTable" data-click-to-select="true" class="table table-bordered" data-page-size="20"></table>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- 空间查询 -->
<div class="modal fade" id="spatialQuery" tabindex="-1" role="dialog" aria-labelledby="spatialQueryLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false">
    <div class="modal-dialog" role="document" style="display: inline-block">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">空间查询</h4>
            </div>
            <div class="modal-body">
                <form id="spatialQueryForm" class="form-horizontal" method="post" role="form" action="#">
                    <div class="form-group">
                        <label class="col-lg-2 col-md-2 col-sm-2 control-label">图层</label>
                        <div class="col-lg-10 col-md-10 col-sm-10">
                            <input type="hidden"  class="form-control" id="layerPickInput" name="layerPickInput">
                            <select id="layerPick2" class="selectpicker show-tick form-control" name="layerPick2"  data-live-search="true" data-hide-disabled="true" data-actions-box="true" multiple></select>
                        </div>
                    </div>
                    <div class="form-group" id="pickType">
                        <label class="col-lg-2 col-md-2 col-sm-2 control-label control-label">拾取方式</label>
                        <div class="col-lg-2">
                            <img class="point" data-type="point" src="./img/drawpoint.png">
                        </div>
                        <div class="col-lg-2">
                            <img class="line" data-type="line" src="./img/drawline.png">
                        </div>
                        <div class="col-lg-2">
                            <img class="polygon" data-type="polygon" src="./img/drawpolygon.png">
                        </div>
                        <div class="col-lg-2">
                            <input type="button" class="btn btn-success" id="doSpatialQuery" value="查询">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-2 col-md-2 col-sm-2 control-label">结果</label>
                        <div class="col-lg-10">
                            <select id="layerPick3" class="selectpicker show-tick form-control" name="layerPick3" disabled></select>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-lg-offset-2 col-lg-10 col-md-10 col-sm-10" >
                            <table data-toggle="table" data-search=”true” data-height="400" id="spatialQueryTable" data-click-to-select="true" class="table table-bordered" data-page-size="20"></table>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- 统计分析 -->
<div class="modal fade" id="attrStatistic" tabindex="-1" role="dialog" aria-labelledby="attrStatisticLabel" data-backdrop="static" aria-hidden="true" data-keyboard="false">
    <div class="modal-dialog" role="document" style="display: inline-block">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">属性统计</h4>
            </div>
            <div class="modal-body">
                <form id="attrStatisticForm" class="form-horizontal" method="post" role="form" action="#">
                    <div class="form-group">
                        <label class="col-lg-2 col-md-2 col-sm-2 control-label">图层</label>
                        <div class="col-lg-10 col-md-10 col-sm-10">
                            <select id="attrStatisticLayerPick" class="selectpicker show-tick form-control"  data-live-search="true"></select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-2 col-md-2 col-sm-2 control-label control-label">统计字段</label>
                        <div class="col-lg-8">
                            <select id="attrStatisticFieldPick" class="selectpicker show-tick form-control"  data-live-search="true"></select>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2">
                            <input type="button" class="btn btn-success" id="doAttrStatistic" value="统计">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-2 col-md-2 col-sm-2 control-label">结果</label>
                        <div class="col-lg-10 col-md-10 col-sm-10" >
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="./js/app.js"></script>
</body>
</html>
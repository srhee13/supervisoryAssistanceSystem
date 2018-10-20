//表单验证js
$(function () {
    $('#attrQueryForm').bootstrapValidator({
        message: '输入值不合法',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            searchCondition: {
                validators: {
                    notEmpty: {
                        message: '查询条件不能为空！'
                    }
                }
            }
        }
    });
    $('#layerPick2').on('hidden.bs.select', function (e) {
        var tmpSelected = $('#layerPick2').val();
        if(tmpSelected != null){
            $('#layerPickInput').val(tmpSelected);
        }else {
            $('#layerPickInput').val("");
        }
        //由于input为hidden，验证会出现一些bug，此处手动验证隐藏的input组件
        $('#spatialQueryForm').data('bootstrapValidator').updateStatus('layerPickInput', 'NOT_VALIDATED').validateField('layerPickInput');
    });

    $('#spatialQueryForm').bootstrapValidator({
        message: '输入值不合法',
        excluded : [':disabled'],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            layerPickInput: {
                validators: {
                    notEmpty: {
                        message: '图层不能为空！'
                    },
                    callback: {
                        message: '请选择受访人员',
                        callback: function (value, validator) {
                            console.log(value);
                            if (value == -1) { //-1是--请选择--选项
                                return false;
                            } else {
                                return true;
                            }
                        }
                    }
                }
            }
        }
    });
})
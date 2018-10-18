package com.supervisory.base.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lish on 18/10/9.
 */
@Api(value = "TestController", description = "用户登录登出接口")
@Controller
public class TestController {
    @ApiOperation(value="用户登录", notes="用户登录接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "username", value = "用户名", required = true ,dataType = "string"),
            @ApiImplicitParam(name = "passwd", value = "密码", required = true ,dataType = "string")
    })
    @RequestMapping("/freemarker")
    public String login(Map<String, Object> map){
        map.put("descrip", "It's a springboot integrate frewwwemarker's demo!!!!");
        return "freemarker";
    }
}

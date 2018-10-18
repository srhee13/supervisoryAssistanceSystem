package com.supervisory.base.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

/**
 * Created by lish on 18/10/9.
 */
@Controller
public class IndexMapController {
    @RequestMapping("/index")
    public String login(Map<String, Object> map){
        return "index";
    }
}

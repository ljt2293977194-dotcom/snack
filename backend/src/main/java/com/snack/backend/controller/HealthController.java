package com.snack.backend.controller;

import com.snack.backend.common.R;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * 健康检查接口。
 * 用于确认后端服务是否正常，也是前后端联调的第一个接口。
 */
@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/health")
    public R<Map<String, Object>> health() {
        Map<String, Object> data = new HashMap<>();
        data.put("status", "ok");
        data.put("timestamp", LocalDateTime.now().toString());
        return R.ok(data);
    }
}
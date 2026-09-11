package com.snack.backend.exception;

import com.snack.backend.common.R;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常处理器，把各种异常转换成统一的 {code, message, data} 格式。
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 处理 @Valid 校验失败。
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public R<Void> handleValidation(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(err -> err.getDefaultMessage())
                .orElse("参数校验失败");
        return R.fail(1001, message);
    }

    /**
     * 兜底：未预料到的异常。
     */
    @ExceptionHandler(Exception.class)
    public R<Void> handleUnknown(Exception e) {
        // 生产环境应记录日志，这里简单处理
        return R.fail(5000, "服务器内部错误: " + e.getMessage());
    }
}
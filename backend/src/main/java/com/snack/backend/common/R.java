package com.snack.backend.common;

import lombok.Data;

/**
 * 统一响应包装类。
 * 所有接口返回此结构：{ code, message, data }
 *
 * code = 0 表示成功，非 0 表示失败。
 */
@Data
public class R<T> {

    private int code;
    private String message;
    private T data;

    /** 成功，带数据 */
    public static <T> R<T> ok(T data) {
        R<T> r = new R<>();
        r.code = 0;
        r.message = "success";
        r.data = data;
        return r;
    }

    /** 成功，无数据 */
    public static <T> R<T> ok() {
        return ok(null);
    }

    /** 失败 */
    public static <T> R<T> fail(int code, String message) {
        R<T> r = new R<>();
        r.code = code;
        r.message = message;
        r.data = null;
        return r;
    }
}
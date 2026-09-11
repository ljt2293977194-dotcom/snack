package com.snack.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * 上传分数的请求体。
 */
@Data
public class ScoreRequest {

    @NotBlank(message = "playerName 不能为空")
    @Size(min = 1, max = 20, message = "playerName 长度必须在 1 到 20 之间")
    private String playerName;

    @Min(value = 0, message = "score 不能为负数")
    @Max(value = 1000000, message = "score 不能超过 1000000")
    private Integer score;
}
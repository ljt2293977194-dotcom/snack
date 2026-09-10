/**
 * commitlint 配置。
 * 规则参考 CONTRIBUTING.md 第 3 节「提交规范」。
 */
export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
      // 类型必须用小写，且只能是这些之一
      'type-enum': [
        2,
        'always',
        [
          'feat',     // 新功能
          'fix',      // Bug 修复
          'docs',     // 文档
          'style',    // 格式（不影响功能）
          'refactor', // 重构
          'test',     // 测试
          'chore',    // 构建/配置
          'perf',     // 性能
        ],
      ],
      // 类型必填
      'type-empty': [2, 'never'],
      // 描述必填
      'subject-empty': [2, 'never'],
      // 描述结尾不能是句号
      'subject-full-stop': [2, 'never', '.'],
      // 描述不能以大写开头
      'subject-case': [0],
      // 描述长度：最多 100 字符
      'subject-max-length': [2, 'always', 100],
      // header 总长度：最多 100 字符
      'header-max-length': [2, 'always', 100],
    },
  }
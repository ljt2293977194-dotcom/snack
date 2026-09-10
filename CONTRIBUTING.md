# 贡献指南

感谢你参与 Snack 项目。本文档规定了本项目的协作方式，请在提交任何代码前阅读并遵守。

---

## 目录

1. [开始之前](#1-开始之前)
2. [分支规范](#2-分支规范)
3. [提交规范](#3-提交规范)
4. [代码规范](#4-代码规范)
5. [Pull Request 流程](#5-pull-request-流程)
6. [目录与文件约定](#6-目录与文件约定)
7. [问题反馈](#7-问题反馈)

---

## 1. 开始之前

### 1.1 环境准备

请先按 [README](./README.md) 的「环境要求」安装好工具，并确保以下命令版本正确：

| 命令 | 期望结果 |
|---|---|
| `node -v` | v24.x |
| `java -version` | 21 |
| `mvn -v` | 3.9.x，且 `Java version` 显示 21 |
| `mysql --version` | 8.0.x |
| `git --version` | >= 2.40 |

### 1.2 行为准则

- 提交前先自测，确保不影响他人。
- 提交信息清晰、可读，不使用 `update`、`fix bug` 这类含糊描述。
- 尊重代码审查意见，讨论对事不对人。

---

## 2. 分支规范

本项目采用简化版 Git Flow。分支命名规则如下：

| 分支 | 用途 | 示例 |
|---|---|---|
| `main` | 稳定分支，随时可发布 | `main` |
| `feature/*` | 新功能开发 | `feature/snake-movement` |
| `fix/*` | Bug 修复 | `fix/score-not-saved` |
| `docs/*` | 文档修改 | `docs/update-readme` |
| `chore/*` | 构建、依赖、配置等杂项 | `chore/setup-eslint` |
| `refactor/*` | 重构（不改功能） | `refactor/game-loop` |

### 规则

1. **禁止直接在 `main` 上开发**。所有改动必须通过分支 + Pull Request。
2. 分支名统一使用**小写英文 + 连字符**，不使用中文、下划线、空格。
3. 一个分支只做一件事，完成后尽快合并，避免长期存在的分支。
4. 分支合并后及时删除（本地 + 远程）。

---

## 3. 提交规范

本项目遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

### 3.1 格式

```text
<类型>(<范围>): <描述>

[可选的正文]

[可选的脚注]
```

### 3.2 类型（type）

| 类型 | 含义 |
|---|---|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档变更 |
| `style` | 代码格式（不影响功能） |
| `refactor` | 重构（既不新增功能也不修 bug） |
| `test` | 新增或修改测试 |
| `chore` | 构建流程、依赖管理、工具配置 |
| `perf` | 性能优化 |

### 3.3 范围（scope）

可选，表示改动的模块。本项目常用的 scope：

- `frontend` — 前端整体
- `backend` — 后端整体
- `game` — 游戏逻辑
- `api` — 接口
- `db` — 数据库
- `docs` — 文档

### 3.4 示例

```text
feat(game): 实现蛇的移动逻辑
fix(api): 修复分数上传接口 500 错误
docs(readme): 补充本地启动步骤
chore(deps): 升级 Spring Boot 到 3.5.0
refactor(frontend): 抽取游戏循环为独立模块
```

### 3.5 规则

- 描述使用**中文**（本项目统一）。
- 描述**不要以句号结尾**。
- 一次提交只做一件事，避免「巨型提交」。
- 禁止使用 `update`、`fix bug`、`modify` 这类无意义描述。

---

## 4. 代码规范

### 4.1 通用

- 文件编码统一为 **UTF-8**。
- 换行符统一为 **LF**（由 `.gitattributes` 保证）。
- 文件末尾保留一个空行。
- 删除行尾多余空格。

### 4.2 前端（Vue3 + TypeScript）

- 使用 **ESLint + Prettier**，提交前自动格式化。
- 组件文件使用 **PascalCase**，如 `GameBoard.vue`。
- 工具函数、变量使用 **camelCase**。
- 常量使用 **UPPER_SNAKE_CASE**。
- 优先使用 `<script setup>` 语法。

### 4.3 后端（Java + Spring Boot）

- 使用 **spring-javaformat** 统一格式（Maven 插件）。
- 类名 **PascalCase**，方法/变量 **camelCase**，常量 **UPPER_SNAKE_CASE**。
- 包名全小写，如 `com.snack.game`。
- Controller 只做参数校验和转发，业务逻辑放 Service。
- 禁止在 Controller 里直接写 SQL。

---

## 5. Pull Request 流程

即使单人开发，也按以下流程执行，以养成规范习惯。

### 5.1 开发流程

1. 从最新的 `main` 拉出分支：

   ```bash
   git checkout main
   git pull
   git checkout -b feature/xxx
   ```

2. 在分支上开发，小步提交（遵循第 3 节规范）。

3. 推送分支：

   ```bash
   git push -u origin feature/xxx
   ```

4. 在 GitHub 上发起 Pull Request，目标分支为 `main`。

5. 自审代码，确认无误后合并。

6. 合并后删除该分支（本地 + 远程）。

### 5.2 PR 描述模板

PR 描述需包含三部分：

- **做了什么** — 改动概述
- **为什么** — 背景、关联 issue
- **怎么验证** — 测试步骤

### 5.3 PR 标题规范

与提交信息一致，例如：

```text
feat(game): 实现蛇的移动逻辑
```

---

## 6. 目录与文件约定

> 脚手架搭建后补全。

---

## 7. 问题反馈

发现问题请通过 GitHub Issues 提交，描述清楚：

- 复现步骤
- 期望结果
- 实际结果
- 环境信息（OS、浏览器、版本）

---

本项目遵循以上规范。规范本身也会随项目发展更新，如有建议请提 Issue 讨论。
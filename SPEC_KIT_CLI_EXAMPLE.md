# Spec Kit CLI 工具开发完整指南

## 项目示例：文件批量处理工具（File Processor CLI）

本指南将详细说明如何使用 Spec Kit 开发一个 CLI 工具，每一步都包含：
- 在 Cursor 中的具体操作
- 使用的 Spec Kit 命令
- 命令输入示例
- 预期输出
- 文件结构变化

---

## 📋 完整开发流程概览

```
1. /speckit.constitution  → 建立项目原则
2. /speckit.specify       → 创建功能规格
3. /speckit.plan          → 制定技术计划
4. /speckit.tasks         → 生成任务清单
5. /speckit.implement     → 执行实现
```

---

## 步骤 1：建立项目原则（Constitution）

### 🎯 目标
定义项目的核心开发原则和约束，这些原则将指导整个开发过程。

### 📝 在 Cursor 中的操作

1. **打开 Cursor 聊天窗口**（快捷键：`Cmd+L` 或 `Cmd+K`）

2. **输入命令**：
   ```
   /speckit.constitution
   ```

3. **提供项目原则描述**（可选，如果为空，AI 会从项目上下文推断）：
   ```
   这是一个 CLI 工具项目，需要遵循以下原则：
   - 命令行优先：所有功能必须通过 CLI 访问
   - 测试驱动：必须编写测试，遵循 TDD
   - 简单性：保持代码简单，避免过度设计
   - 错误处理：提供清晰的错误信息
   - 文档：每个命令都有帮助文档
   ```

### 🔄 AI 会做什么

1. 读取 `.specify/memory/constitution.md` 模板
2. 识别所有占位符（如 `[PROJECT_NAME]`, `[PRINCIPLE_1_NAME]`）
3. 用实际内容替换占位符
4. 检查并更新相关模板文件的一致性
5. 生成版本号和日期

### 📄 预期输出

**文件更新**：`.specify/memory/constitution.md`

**示例内容**：
```markdown
# SDDSample Constitution

## Core Principles

### I. CLI-First Interface
Every feature must be accessible via command-line interface. 
Text in/out protocol: stdin/args → stdout, errors → stderr. 
Support JSON + human-readable formats.

### II. Test-First (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement. 
Red-Green-Refactor cycle strictly enforced.

### III. Simplicity
Start simple, YAGNI principles. Avoid premature optimization.

### IV. Error Handling
Clear, actionable error messages. All errors must be logged appropriately.

### V. Documentation
Every command must have help documentation accessible via --help flag.

## Governance

**Version**: 1.0.0 | **Ratified**: 2024-12-18 | **Last Amended**: 2024-12-18
```

### ✅ 完成标志

- 看到 "Constitution updated successfully" 消息
- `.specify/memory/constitution.md` 文件已更新，没有占位符

---

## 步骤 2：创建功能规格（Specification）

### 🎯 目标
将自然语言的功能描述转换为结构化的功能规格文档。

### 📝 在 Cursor 中的操作

1. **在 Cursor 聊天窗口输入**：
   ```
   /speckit.specify 我想创建一个文件批量处理工具，可以批量重命名文件、转换文件格式、批量删除文件
   ```

2. **AI 可能会询问澄清问题**（最多 3 个）：
   - 如果功能描述不够清晰，AI 会以表格形式提问
   - 例如：
     ```
     ## Question 1: 文件格式转换
     
     **Context**: 需要支持哪些文件格式转换？
     
     **Suggested Answers**:
     | Option | Answer | Implications |
     |--------|--------|--------------|
     | A      | 图片格式（PNG/JPEG/GIF） | 功能范围较小，实现简单 |
     | B      | 图片+文档（PDF/DOCX） | 需要更多依赖库 |
     | C      | 仅重命名和删除，不转换格式 | MVP 版本，最简实现 |
     ```
   - **你的回复**：`Q1: C` （选择 C，先做 MVP）

### 🔄 AI 会做什么

1. 生成简短的功能名称（如 `file-processor`）
2. 检查是否已有同名分支（自动编号：`1-file-processor`, `2-file-processor`...）
3. 创建新的功能分支并切换
4. 创建 `specs/[编号]-file-processor/` 目录
5. 生成 `spec.md` 文件
6. 生成质量检查清单 `checklists/requirements.md`

### 📄 预期输出

**文件结构**：
```
specs/1-file-processor/
├── spec.md                    # 功能规格文档
└── checklists/
    └── requirements.md        # 质量检查清单
```

**spec.md 示例内容**：
```markdown
# Feature Specification: File Batch Processor CLI

**Feature Branch**: `1-file-processor`
**Created**: 2024-12-18
**Status**: Draft

## User Scenarios & Testing

### User Story 1 - Batch Rename Files (Priority: P1)
As a user, I want to batch rename files using patterns so that I can organize my files efficiently.

**Why this priority**: Core functionality, enables basic file organization

**Independent Test**: Can be tested by renaming a set of test files and verifying new names

**Acceptance Scenarios**:
1. **Given** a directory with files `file1.txt`, `file2.txt`, **When** I run rename command with pattern, **Then** files are renamed according to pattern
2. **Given** invalid pattern, **When** I run command, **Then** clear error message is shown

### User Story 2 - Batch Delete Files (Priority: P2)
...

## Requirements

### Functional Requirements
- **FR-001**: System MUST allow users to batch rename files using pattern matching
- **FR-002**: System MUST allow users to batch delete files matching criteria
- **FR-003**: System MUST provide dry-run mode to preview changes
- **FR-004**: System MUST validate file operations before execution
- **FR-005**: System MUST provide clear error messages for invalid operations

## Success Criteria
- **SC-001**: Users can rename 100 files in under 5 seconds
- **SC-002**: Dry-run mode shows accurate preview of changes
- **SC-003**: 100% of invalid operations show clear error messages
```

### ✅ 完成标志

- 看到 "Specification created successfully" 消息
- 自动切换到新分支 `1-file-processor`
- `specs/1-file-processor/spec.md` 文件已创建
- 如果 AI 询问了澄清问题，所有问题都已回答

---

## 步骤 3：制定技术计划（Plan）

### 🎯 目标
将功能规格转换为技术实现计划，包括技术栈选择、架构设计、数据结构等。

### 📝 在 Cursor 中的操作

1. **在 Cursor 聊天窗口输入**（无需参数，AI 会自动读取 spec.md）：
   ```
   /speckit.plan
   ```

2. **AI 会执行多个阶段**：
   - **Phase 0**: 研究和澄清技术选择
   - **Phase 1**: 设计数据模型和 API 契约

### 🔄 AI 会做什么

**Phase 0 - 研究阶段**：
1. 分析技术上下文（编程语言、依赖、平台等）
2. 识别需要澄清的技术点（标记为 `NEEDS CLARIFICATION`）
3. 生成 `research.md` 文件，记录技术决策

**Phase 1 - 设计阶段**：
1. 生成 `data-model.md`（如果有数据实体）
2. 生成 `contracts/` 目录下的 API 契约（CLI 命令规范）
3. 生成 `quickstart.md`（快速开始指南）
4. 更新 agent context（添加新技术栈信息）

### 📄 预期输出

**文件结构**：
```
specs/1-file-processor/
├── spec.md
├── plan.md                    # ⭐ 技术计划（新创建）
├── research.md                 # ⭐ 技术研究（新创建）
├── data-model.md              # ⭐ 数据模型（新创建）
├── quickstart.md              # ⭐ 快速开始（新创建）
├── contracts/                 # ⭐ API 契约（新创建）
│   └── cli-commands.md
└── checklists/
    └── requirements.md
```

**plan.md 示例内容**：
```markdown
# Implementation Plan: File Batch Processor CLI

**Branch**: `1-file-processor` | **Date**: 2024-12-18

## Summary
Build a CLI tool for batch file operations (rename, delete) with pattern matching and dry-run support.

## Technical Context

**Language/Version**: Python 3.11+
**Primary Dependencies**: click (CLI framework), pathlib (file operations)
**Storage**: N/A (file system operations only)
**Testing**: pytest
**Target Platform**: Linux, macOS, Windows
**Project Type**: CLI tool
**Performance Goals**: Process 100 files in <5 seconds
**Constraints**: Must work offline, no external dependencies beyond stdlib + click
**Scale/Scope**: Handle directories with up to 10,000 files

## Constitution Check
✅ CLI-First: All features accessible via CLI
✅ Test-First: pytest test suite required
✅ Simplicity: Minimal dependencies
✅ Error Handling: Clear error messages
✅ Documentation: --help for all commands

## Project Structure

### Source Code
```
src/
├── cli/
│   ├── __init__.py
│   └── commands.py          # CLI command definitions
├── core/
│   ├── __init__.py
│   ├── renamer.py           # Rename logic
│   └── deleter.py           # Delete logic
└── utils/
    ├── __init__.py
    └── validators.py        # Input validation

tests/
├── test_renamer.py
├── test_deleter.py
└── test_cli.py
```

## Complexity Tracking
(Empty - no violations)
```

**research.md 示例**：
```markdown
# Research: File Batch Processor CLI

## Decision: CLI Framework Choice
**Decision**: Use `click` library
**Rationale**: 
- Python standard for CLI tools
- Built-in help generation
- Good error handling
- Active maintenance

**Alternatives considered**:
- argparse: Too verbose, no built-in help
- typer: Modern but requires Python 3.7+
```

**contracts/cli-commands.md 示例**：
```markdown
# CLI Commands Contract

## Command: rename
**Usage**: `fileproc rename [OPTIONS] PATTERN TARGET_DIR`

**Options**:
- `--dry-run`: Preview changes without executing
- `--pattern`: File matching pattern (glob)
- `--recursive`: Process subdirectories

**Output**: JSON or human-readable format
**Errors**: Exit code 1 with clear message
```

### ✅ 完成标志

- 看到 "Plan created successfully" 消息
- `plan.md`, `research.md`, `data-model.md`, `quickstart.md` 都已创建
- `contracts/` 目录包含 CLI 命令规范

---

## 步骤 4：生成任务清单（Tasks）

### 🎯 目标
将技术计划分解为可执行的具体任务，按优先级和依赖关系组织。

### 📝 在 Cursor 中的操作

1. **在 Cursor 聊天窗口输入**：
   ```
   /speckit.tasks
   ```

2. **AI 会自动**：
   - 读取 `plan.md` 和 `spec.md`
   - 按用户故事优先级组织任务
   - 生成依赖关系图

### 🔄 AI 会做什么

1. 读取所有设计文档（plan.md, spec.md, data-model.md, contracts/）
2. 按用户故事（User Story）组织任务
3. 识别任务依赖关系
4. 标记可并行执行的任务 `[P]`
5. 生成 `tasks.md` 文件

### 📄 预期输出

**文件结构**：
```
specs/1-file-processor/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
├── tasks.md                    # ⭐ 任务清单（新创建）
└── checklists/
```

**tasks.md 示例内容**：
```markdown
# Implementation Tasks: File Batch Processor CLI

**Feature**: File Batch Processor CLI
**Branch**: `1-file-processor`
**Total Tasks**: 25

## Phase 1: Setup

- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize Python project with pyproject.toml
- [ ] T003 Add click dependency to requirements.txt
- [ ] T004 Setup pytest testing framework

## Phase 2: Foundational

- [ ] T005 [P] Create src/cli/__init__.py
- [ ] T006 [P] Create src/core/__init__.py
- [ ] T007 [P] Create src/utils/__init__.py
- [ ] T008 Create src/utils/validators.py with input validation functions

## Phase 3: User Story 1 - Batch Rename (P1)

**Goal**: Implement batch rename functionality
**Independent Test**: Rename test files and verify new names match pattern

- [ ] T009 [US1] Create src/core/renamer.py with Renamer class
- [ ] T010 [US1] Implement pattern matching logic in renamer.py
- [ ] T011 [US1] Implement dry-run mode in renamer.py
- [ ] T012 [US1] Create src/cli/commands.py with rename command
- [ ] T013 [US1] Add rename command to CLI entry point
- [ ] T014 [US1] Create tests/test_renamer.py
- [ ] T015 [US1] Create tests/test_cli_rename.py

## Phase 4: User Story 2 - Batch Delete (P2)

**Goal**: Implement batch delete functionality
**Independent Test**: Delete test files matching criteria

- [ ] T016 [US2] Create src/core/deleter.py with Deleter class
- [ ] T017 [US2] Implement file matching logic in deleter.py
- [ ] T018 [US2] Implement dry-run mode in deleter.py
- [ ] T019 [US2] Add delete command to src/cli/commands.py
- [ ] T020 [US2] Create tests/test_deleter.py
- [ ] T021 [US2] Create tests/test_cli_delete.py

## Phase 5: Polish & Cross-Cutting

- [ ] T022 Add comprehensive error handling
- [ ] T023 Add --help documentation for all commands
- [ ] T024 Create README.md with usage examples
- [ ] T025 Run full test suite and fix any issues

## Dependencies

- Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5
- User Story 1 can be completed independently
- User Story 2 depends on Phase 2 foundational tasks

## Parallel Execution Examples

**Within Phase 2**: Tasks T005, T006, T007 can run in parallel
**Within Phase 3**: Tasks T009, T010 can run in parallel after T008 completes
```

### ✅ 完成标志

- 看到 "Tasks generated successfully" 消息
- `tasks.md` 文件已创建
- 任务按阶段和用户故事组织
- 每个任务都有明确的文件路径

---

## 步骤 5：执行实现（Implement）

### 🎯 目标
按照任务清单逐步实现功能。

### 📝 在 Cursor 中的操作

1. **在 Cursor 聊天窗口输入**：
   ```
   /speckit.implement
   ```

2. **AI 会**：
   - 检查检查清单状态（如果有）
   - 按顺序执行任务
   - 每完成一个任务就标记为完成 `[X]`
   - 报告进度

### 🔄 AI 会做什么

1. **检查检查清单**：
   - 扫描 `checklists/` 目录
   - 如果检查清单未完成，会询问是否继续

2. **验证项目设置**：
   - 创建/验证 `.gitignore`
   - 根据技术栈创建其他 ignore 文件

3. **按阶段执行任务**：
   - Phase 1: 项目初始化
   - Phase 2: 基础结构
   - Phase 3: User Story 1 实现
   - Phase 4: User Story 2 实现
   - Phase 5: 收尾工作

4. **任务执行规则**：
   - 顺序任务：按顺序执行
   - 并行任务 `[P]`：可以同时执行
   - 测试优先：如果任务要求测试，先写测试

### 📄 执行过程示例

**Phase 1 执行**：
```
✓ T001: Created project structure
✓ T002: Created pyproject.toml
✓ T003: Added click to requirements.txt
✓ T004: Configured pytest
```

**Phase 3 执行**（User Story 1）：
```
✓ T009: Created src/core/renamer.py
✓ T010: Implemented pattern matching
✓ T011: Added dry-run mode
✓ T012: Created rename command
✓ T013: Added to CLI entry point
✓ T014: Created tests/test_renamer.py
✓ T015: Created tests/test_cli_rename.py
```

**文件结构变化**：
```
SDDSample/
├── src/
│   ├── cli/
│   │   ├── __init__.py
│   │   └── commands.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── renamer.py
│   │   └── deleter.py
│   └── utils/
│       ├── __init__.py
│       └── validators.py
├── tests/
│   ├── test_renamer.py
│   ├── test_deleter.py
│   └── test_cli.py
├── pyproject.toml
├── requirements.txt
└── README.md
```

### ✅ 完成标志

- 看到 "Implementation completed successfully" 消息
- `tasks.md` 中所有任务都标记为 `[X]`
- 所有测试通过
- 代码已实现并可以运行

---

## 🎓 关键互动技巧

### 1. 如何提供输入

**好的输入**：
```
/speckit.specify 创建一个文件批量处理工具，支持批量重命名和删除文件，要有 dry-run 模式
```

**不好的输入**：
```
/speckit.specify 做个文件工具
```
（太模糊，AI 需要更多信息）

### 2. 如何回答澄清问题

**格式**：
```
Q1: A
Q2: Custom - 我需要支持递归处理子目录
Q3: B
```

### 3. 如何查看进度

- 查看 `tasks.md` 文件，看哪些任务已完成 `[X]`
- 查看 `checklists/` 目录，看检查清单状态
- 查看生成的文件，确认代码已创建

### 4. 如何修改方向

如果在某个步骤发现需要调整：
- **修改规格**：编辑 `spec.md`，然后重新运行 `/speckit.plan`
- **修改计划**：编辑 `plan.md`，然后重新运行 `/speckit.tasks`
- **跳过任务**：在 `tasks.md` 中手动标记为完成，或删除不需要的任务

---

## 📚 可选命令

### `/speckit.clarify`
在规划前澄清模糊需求（可选）

### `/speckit.analyze`
在实现前检查一致性（可选）

### `/speckit.checklist`
生成质量检查清单（可选）

---

## 🎯 总结

完整的 Spec Kit 工作流程：

1. **Constitution** → 定义原则
2. **Specify** → 描述功能
3. **Plan** → 技术设计
4. **Tasks** → 任务分解
5. **Implement** → 执行实现

每一步都有明确的输入输出，AI 会引导你完成整个过程！


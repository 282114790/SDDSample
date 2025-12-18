# 设置指南

## 环境要求

- Python 3.11 或更高版本
- pip（Python 包管理器）

## 安装步骤

### 1. 创建虚拟环境

```bash
cd /Users/wesleyzhang/SDDSample/SDDSample
python3 -m venv venv
```

### 2. 激活虚拟环境

**macOS/Linux:**
```bash
source venv/bin/activate
```

**Windows:**
```bash
venv\Scripts\activate
```

### 3. 安装依赖

```bash
pip install -r requirements.txt
pip install pytest
```

### 4. 安装项目（开发模式）

```bash
pip install -e .
```

## 使用 CLI 工具

激活虚拟环境后，可以使用 `fileproc` 命令：

```bash
# 查看帮助
fileproc --help

# 查看 rename 命令帮助
fileproc rename --help

# 测试 rename 命令（dry-run）
fileproc rename --dry-run "test-{n}.txt" /path/to/directory
```

## 运行测试

```bash
# 运行所有测试
pytest tests/ -v

# 运行特定测试文件
pytest tests/unit/test_validators.py -v

# 运行特定测试类
pytest tests/unit/test_validators.py::TestValidatePattern -v
```

## 常见问题

### Q: 提示 "command not found: pip"
**A:** 使用 `python3 -m pip` 代替 `pip`，或确保虚拟环境已激活。

### Q: 提示 "externally-managed-environment"
**A:** 必须使用虚拟环境。按照上面的步骤创建并激活虚拟环境。

### Q: 如何退出虚拟环境？
**A:** 运行 `deactivate` 命令。

## 下一步

安装完成后，可以：
1. 运行测试验证功能：`pytest tests/ -v`
2. 查看 CLI 帮助：`fileproc --help`
3. 尝试使用工具处理文件


# File Batch Processor CLI

A command-line tool for batch file operations: rename, delete, and convert files efficiently.

## Features

- **Batch Rename**: Rename files using pattern matching with sequential numbering
- **Batch Delete**: Delete files matching criteria (pattern, extension, size, date)
- **Format Conversion**: Convert image files between formats (PNG, JPEG, GIF, BMP, TIFF)
- **Dry-Run Mode**: Preview changes before executing
- **JSON Output**: Machine-parseable output for automation
- **Recursive Processing**: Process subdirectories

## Installation

```bash
# Install dependencies
pip install -r requirements.txt

# Install the tool
pip install -e .
```

## Usage

### Rename Files

```bash
# Basic rename with sequential numbering
fileproc rename "vacation-{n:3}.jpg" ./photos

# Rename with extension filter
fileproc rename --filter .txt "renamed-{n}.txt" ./documents

# Preview changes (dry-run)
fileproc rename --dry-run "file-{n}.txt" .

# Recursive rename
fileproc rename --recursive "renamed-{n}.txt" ./directory
```

**Pattern Syntax**:
- `{n}` - Sequential number starting from 1
- `{n:3}` - Zero-padded sequential number (001, 002, ...)
- `*` - Wildcard matching original filename

### Delete Files

```bash
# Delete files matching pattern
fileproc delete "*.tmp" ./temp

# Delete with extension filter
fileproc delete --extension .log ./logs

# Delete large files
fileproc delete --min-size 1000000 "*.log" ./logs

# Preview deletion (dry-run)
fileproc delete --dry-run "temp*.txt" .
```

### Convert Formats

```bash
# Convert PNG to JPEG
fileproc convert png jpeg ./images

# Convert with quality setting
fileproc convert png jpeg --quality 95 ./images

# Preview conversion (dry-run)
fileproc convert png jpeg --dry-run ./images

# Preserve metadata
fileproc convert png jpeg --preserve-metadata ./images
```

**Supported Formats**: PNG, JPEG, GIF, BMP, TIFF

## Options

All commands support:
- `--dry-run`: Preview operations without executing
- `--recursive, -r`: Process subdirectories recursively
- `--json`: Output results in JSON format
- `--help`: Show help message

## Examples

### Example 1: Organize Vacation Photos

```bash
# Rename photos with sequential numbering
fileproc rename "vacation-{n:3}.jpg" ./photos

# Result: photo1.jpg → vacation-001.jpg, photo2.jpg → vacation-002.jpg
```

### Example 2: Clean Up Temporary Files

```bash
# Preview deletion
fileproc delete --dry-run "*.tmp" ./temp

# Execute deletion
fileproc delete "*.tmp" ./temp
```

### Example 3: Convert Images for Web

```bash
# Convert PNG to JPEG with high quality
fileproc convert png jpeg --quality 90 ./images
```

## Development

### Running Tests

```bash
# Install test dependencies
pip install pytest

# Run all tests
pytest tests/ -v

# Run specific test file
pytest tests/unit/test_renamer.py -v
```

### Project Structure

```
src/
├── cli/          # CLI command definitions
├── core/         # Core logic (renamer, deleter, converter)
└── utils/        # Utility functions (validators, formatters, progress)

tests/
├── unit/         # Unit tests
├── integration/  # Integration tests
└── fixtures/     # Test fixtures
```

## License

MIT License

## Contributing

Contributions are welcome! Please follow the project's coding standards and include tests for new features.


# CLI Commands Contract: File Batch Processor

**Date**: 2025-12-19  
**Feature**: File Batch Processor CLI

## Command Structure

All commands follow the pattern:
```
fileproc <command> [OPTIONS] [ARGUMENTS]
```

Exit codes:
- `0`: Success
- `1`: General error
- `2`: Invalid arguments
- `3`: File operation error
- `4`: Permission denied

---

## Command: rename

Batch rename files using pattern matching.

**Usage**:
```bash
fileproc rename [OPTIONS] PATTERN DIRECTORY
```

**Arguments**:
- `PATTERN` (required): Rename pattern with placeholders:
  - `{n}`: Sequential number starting from 1
  - `{n:3}`: Sequential number with zero-padding (e.g., 001, 002)
  - `*`: Wildcard matching original filename parts
  - Example: `vacation-{n:3}.jpg` → `vacation-001.jpg`, `vacation-002.jpg`
- `DIRECTORY` (required): Target directory containing files to rename

**Options**:
- `--filter EXTENSION`: Filter files by extension (e.g., `--filter .txt`)
- `--pattern GLOB`: Filter files by glob pattern (e.g., `--pattern "*.jpg"`)
- `--dry-run`: Preview changes without executing
- `--recursive, -r`: Process subdirectories recursively
- `--overwrite`: Allow overwriting existing files
- `--json`: Output results in JSON format
- `--help`: Show help message

**Output** (human-readable):
```
Preview of rename operations:
  photo1.jpg → vacation-001.jpg
  photo2.jpg → vacation-002.jpg
  photo3.jpg → vacation-003.jpg

3 files will be renamed.
Run without --dry-run to execute.
```

**Output** (JSON with --json):
```json
{
  "success": true,
  "operation_type": "rename",
  "files_processed": 3,
  "files_succeeded": 3,
  "files_failed": 0,
  "preview": [
    {"source": "photo1.jpg", "target": "vacation-001.jpg", "action": "rename"},
    {"source": "photo2.jpg", "target": "vacation-002.jpg", "action": "rename"},
    {"source": "photo3.jpg", "target": "vacation-003.jpg", "action": "rename"}
  ]
}
```

**Error Examples**:
- Invalid pattern: `Error: Invalid pattern syntax. Use {n} for sequential numbering.`
- Directory not found: `Error: Directory '/path/to/dir' does not exist.`
- Permission denied: `Error: Permission denied. Cannot rename files in '/path/to/dir'.`

---

## Command: delete

Batch delete files matching criteria.

**Usage**:
```bash
fileproc delete [OPTIONS] PATTERN DIRECTORY
```

**Arguments**:
- `PATTERN` (required): Glob pattern for files to delete (e.g., `*.tmp`, `temp-*`)
- `DIRECTORY` (required): Target directory containing files to delete

**Options**:
- `--extension EXT`: Filter by file extension (e.g., `--extension .tmp`)
- `--min-size BYTES`: Delete files larger than specified size
- `--max-size BYTES`: Delete files smaller than specified size
- `--modified-before DATE`: Delete files modified before date (ISO format)
- `--modified-after DATE`: Delete files modified after date (ISO format)
- `--dry-run`: Preview files to be deleted without executing
- `--recursive, -r`: Process subdirectories recursively
- `--json`: Output results in JSON format
- `--help`: Show help message

**Output** (human-readable):
```
Preview of delete operations:
  temp1.txt (will be deleted)
  temp2.txt (will be deleted)
  important.doc (will be kept)

2 files will be deleted.
Run without --dry-run to execute.
```

**Output** (JSON with --json):
```json
{
  "success": true,
  "operation_type": "delete",
  "files_processed": 2,
  "files_succeeded": 2,
  "files_failed": 0,
  "preview": [
    {"source": "temp1.txt", "action": "delete"},
    {"source": "temp2.txt", "action": "delete"}
  ]
}
```

**Error Examples**:
- No files match: `Info: No files matching pattern '*.tmp' found in '/path/to/dir'.`
- Permission denied: `Error: Permission denied. Cannot delete file 'file.txt'.`

---

## Command: convert

Convert files between formats.

**Usage**:
```bash
fileproc convert [OPTIONS] SOURCE_FORMAT TARGET_FORMAT DIRECTORY
```

**Arguments**:
- `SOURCE_FORMAT` (required): Source file format (e.g., `png`, `jpg`, `gif`)
- `TARGET_FORMAT` (required): Target file format (e.g., `jpeg`, `png`)
- `DIRECTORY` (required): Target directory containing files to convert

**Options**:
- `--dry-run`: Preview conversion operations without executing
- `--recursive, -r`: Process subdirectories recursively
- `--quality QUALITY`: Quality setting for lossy formats (1-100, default: 90)
- `--preserve-metadata`: Preserve EXIF and other metadata when possible
- `--json`: Output results in JSON format
- `--help`: Show help message

**Supported Formats**:
- Image: PNG, JPEG, GIF, BMP, TIFF
- Document: PDF, TXT (text extraction/conversion)

**Output** (human-readable):
```
Preview of conversion operations:
  image1.png → image1.jpg (will be created)
  image2.png → image2.jpg (will be created)

2 files will be converted.
Run without --dry-run to execute.
```

**Output** (JSON with --json):
```json
{
  "success": true,
  "operation_type": "convert",
  "files_processed": 2,
  "files_succeeded": 2,
  "files_failed": 0,
  "preview": [
    {"source": "image1.png", "target": "image1.jpg", "action": "convert"},
    {"source": "image2.png", "target": "image2.jpg", "action": "convert"}
  ]
}
```

**Error Examples**:
- Unsupported format: `Error: Conversion from 'xyz' to 'jpg' is not supported. Supported formats: png, jpeg, gif, bmp, tiff, pdf, txt`
- Insufficient disk space: `Error: Insufficient disk space. Need 50MB, available 10MB.`
- Corrupted file: `Error: Cannot read file 'image.png'. File may be corrupted.`

---

## Command: help (default)

Show help for all commands or specific command.

**Usage**:
```bash
fileproc [COMMAND] --help
fileproc --help
```

**Output**: Shows command usage, arguments, options, and examples.

---

## Common Options

All commands support:
- `--json`: Output in JSON format instead of human-readable
- `--help`: Show help message
- `--dry-run`: Preview operations without executing
- `--recursive, -r`: Process subdirectories recursively

---

## Output Format Standards

### Human-Readable Format
- Clear, concise messages
- Progress indication for long operations
- Summary statistics at end
- Error messages with actionable guidance

### JSON Format
- Valid JSON structure
- Consistent schema across all commands
- Includes all operation details
- Machine-parseable for automation

---

## Error Handling

All errors follow this structure:
- Clear error message explaining what went wrong
- Actionable guidance on how to fix
- Appropriate exit code
- Error details in JSON output format

Example error structure (JSON):
```json
{
  "success": false,
  "error": {
    "type": "permission_denied",
    "message": "Permission denied. Cannot rename files in '/path/to/dir'.",
    "file": "/path/to/dir/file.txt"
  }
}
```


# Data Model: File Batch Processor CLI

**Date**: 2025-12-19  
**Feature**: File Batch Processor CLI

## Entities

### File

Represents a file in the file system.

**Attributes**:
- `path` (string): Full file system path
- `name` (string): Filename without directory
- `extension` (string): File extension (e.g., ".txt", ".jpg")
- `size` (integer): File size in bytes
- `modified_date` (datetime): Last modification timestamp
- `permissions` (object): File permissions (read, write, execute)
- `exists` (boolean): Whether file exists

**Relationships**:
- None (file system entity, no database relationships)

**Validation Rules**:
- Path must be valid file system path
- Name must not contain invalid characters for target filesystem
- Extension must be valid (if specified)
- File must exist before operations (except for target files in rename)

**State Transitions**:
- None (file system entity, no state machine)

---

### Operation

Represents a batch operation (rename, delete, convert) with its parameters.

**Attributes**:
- `type` (enum): Operation type - "rename", "delete", "convert"
- `pattern` (string): Pattern for matching/renaming files (e.g., "*.txt", "file-{n}.txt")
- `filters` (object): Filter criteria:
  - `extension` (string, optional): Filter by file extension
  - `pattern` (string, optional): Glob pattern for file matching
  - `min_size` (integer, optional): Minimum file size in bytes
  - `max_size` (integer, optional): Maximum file size in bytes
  - `modified_before` (datetime, optional): Files modified before this date
  - `modified_after` (datetime, optional): Files modified after this date
- `options` (object): Operation options:
  - `dry_run` (boolean): Preview mode, don't execute
  - `recursive` (boolean): Process subdirectories
  - `output_format` (enum): "human" or "json"
  - `target_format` (string, optional): Target format for conversion (e.g., "jpeg", "png")
  - `overwrite` (boolean): Allow overwriting existing files
- `target_directory` (string): Directory to process

**Relationships**:
- Contains multiple File entities (files to be processed)

**Validation Rules**:
- Pattern must be valid syntax for operation type
- Target directory must exist and be accessible
- For rename: pattern must include {n} placeholder if sequential numbering needed
- For convert: target_format must be supported
- Filters must be valid (e.g., min_size < max_size if both specified)

**State Transitions**:
- Created → Validated → Executing → Completed/Failed
- Can be cancelled during execution

---

### Operation Result

Represents the outcome of a batch operation.

**Attributes**:
- `success` (boolean): Whether operation completed successfully
- `files_processed` (integer): Total number of files processed
- `files_succeeded` (integer): Number of files successfully processed
- `files_failed` (integer): Number of files that failed
- `errors` (array): List of error objects:
  - `file` (string): Path of file that failed
  - `error_type` (string): Type of error (e.g., "permission_denied", "invalid_format")
  - `message` (string): Human-readable error message
- `summary` (object): Operation summary:
  - `operation_type` (string): Type of operation performed
  - `duration_seconds` (float): Time taken for operation
  - `start_time` (datetime): When operation started
  - `end_time` (datetime): When operation completed
- `preview` (array, optional): Preview of changes (for dry-run):
  - `source` (string): Original file path
  - `target` (string): Target file path (for rename/convert)
  - `action` (string): Action to be performed ("rename", "delete", "convert")

**Relationships**:
- Belongs to one Operation
- Contains multiple File entities (files that were processed)

**Validation Rules**:
- files_processed = files_succeeded + files_failed
- If success is false, errors array must not be empty
- Duration must be non-negative

**State Transitions**:
- None (result object, no state changes)

---

## Data Flow

### Rename Operation Flow

1. User provides pattern and target directory
2. System scans directory for files matching filters
3. For each file, generate target name using pattern
4. Validate target name doesn't conflict with existing files (unless overwrite allowed)
5. If dry-run: generate preview, return Operation Result with preview
6. If execute: perform rename operation, track success/failure
7. Return Operation Result with statistics

### Delete Operation Flow

1. User provides criteria and target directory
2. System scans directory for files matching criteria
3. Validate files can be deleted (permissions check)
4. If dry-run: generate preview of files to be deleted, return Operation Result
5. If execute: perform delete operation, track success/failure
6. Return Operation Result with statistics

### Convert Operation Flow

1. User provides source format filter, target format, and directory
2. System scans directory for files matching source format
3. Validate format conversion is supported
4. Check disk space for output files
5. If dry-run: generate preview of conversions, return Operation Result
6. If execute: perform conversion, preserve metadata where possible, track success/failure
7. Return Operation Result with statistics

---

## Notes

- No persistent storage required (all operations are file system based)
- All entities are in-memory during operation execution
- Operation Result is returned to user via stdout (JSON or human-readable)
- No database or external storage needed


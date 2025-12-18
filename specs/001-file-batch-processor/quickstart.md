# Quickstart Guide: File Batch Processor CLI

**Date**: 2025-12-19  
**Feature**: File Batch Processor CLI

## Installation

```bash
# Install dependencies
pip install click pillow

# Install the tool (after implementation)
pip install -e .
```

## Basic Usage Examples

### Example 1: Batch Rename Files (User Story 1)

**Scenario**: Rename vacation photos with sequential numbering

**Setup**:
```bash
# Create test directory
mkdir test_photos
cd test_photos
touch photo1.jpg photo2.jpg photo3.jpg
```

**Command**:
```bash
# Preview changes first (dry-run)
fileproc rename --dry-run "vacation-{n:3}.jpg" .

# Execute rename
fileproc rename "vacation-{n:3}.jpg" .
```

**Expected Result**:
- Files renamed: `photo1.jpg` → `vacation-001.jpg`
- Files renamed: `photo2.jpg` → `vacation-002.jpg`
- Files renamed: `photo3.jpg` → `vacation-003.jpg`

**Verification**:
```bash
ls -1
# Should show: vacation-001.jpg, vacation-002.jpg, vacation-003.jpg
```

---

### Example 2: Batch Delete Temporary Files (User Story 2)

**Scenario**: Delete all temporary files matching pattern

**Setup**:
```bash
# Create test directory with temp files
mkdir test_cleanup
cd test_cleanup
touch temp1.txt temp2.txt important.doc
```

**Command**:
```bash
# Preview deletion (dry-run)
fileproc delete --dry-run "temp*.txt" .

# Execute deletion
fileproc delete "temp*.txt" .
```

**Expected Result**:
- Files deleted: `temp1.txt`, `temp2.txt`
- File kept: `important.doc`

**Verification**:
```bash
ls -1
# Should show only: important.doc
```

---

### Example 3: Convert Image Formats (User Story 3)

**Scenario**: Convert PNG images to JPEG format

**Setup**:
```bash
# Create test directory with PNG images
mkdir test_convert
cd test_convert
# Assume PNG files exist: image1.png, image2.png
```

**Command**:
```bash
# Preview conversion (dry-run)
fileproc convert --dry-run png jpeg .

# Execute conversion
fileproc convert png jpeg .
```

**Expected Result**:
- Files converted: `image1.png` → `image1.jpg`
- Files converted: `image2.png` → `image2.jpg`
- Original PNG files preserved (or removed based on implementation)

**Verification**:
```bash
ls -1 *.jpg
# Should show: image1.jpg, image2.jpg
```

---

## Advanced Usage Examples

### Recursive Processing

Process files in subdirectories:

```bash
# Rename files recursively
fileproc rename --recursive "renamed-{n}.txt" /path/to/directory

# Delete files recursively
fileproc delete --recursive "*.tmp" /path/to/directory
```

### Filter by Extension

Only process specific file types:

```bash
# Rename only .txt files
fileproc rename --filter .txt "new-{n}.txt" .

# Delete only .log files
fileproc delete --extension .log "*.log" .
```

### JSON Output for Automation

Get machine-parseable output:

```bash
# Get JSON output
fileproc rename --json "file-{n}.txt" . > results.json

# Parse in script
result=$(fileproc rename --json "file-{n}.txt" .)
files_processed=$(echo $result | jq '.files_processed')
```

### Filter by File Size

Delete files by size criteria:

```bash
# Delete files larger than 10MB
fileproc delete --min-size 10485760 "*.log" .

# Delete files smaller than 1KB
fileproc delete --max-size 1024 "*.tmp" .
```

---

## Integration Test Scenarios

### Test Scenario 1: Complete Rename Workflow

**Objective**: Verify rename operation end-to-end

**Steps**:
1. Create test directory with 10 files: `file1.txt` through `file10.txt`
2. Run dry-run: `fileproc rename --dry-run "renamed-{n:2}.txt" .`
3. Verify preview shows correct mappings
4. Execute rename: `fileproc rename "renamed-{n:2}.txt" .`
5. Verify all files renamed correctly
6. Verify original files no longer exist
7. Verify no files were skipped or duplicated

**Success Criteria**:
- All 10 files renamed correctly
- No errors or warnings
- Operation completes in < 1 second

---

### Test Scenario 2: Error Handling

**Objective**: Verify error handling for invalid operations

**Steps**:
1. Attempt to rename files in non-existent directory
2. Attempt to rename with invalid pattern syntax
3. Attempt to delete files without permissions
4. Attempt to convert unsupported format

**Success Criteria**:
- All errors show clear, actionable messages
- Exit codes are correct (non-zero for errors)
- No partial operations performed

---

### Test Scenario 3: Dry-Run Accuracy

**Objective**: Verify dry-run preview matches actual execution

**Steps**:
1. Run dry-run for rename operation
2. Capture preview output
3. Execute actual operation
4. Compare preview with actual results

**Success Criteria**:
- Preview matches actual results 100%
- No unexpected files processed
- No files missed

---

### Test Scenario 4: Large Batch Performance

**Objective**: Verify performance with large file sets

**Steps**:
1. Create directory with 1000 test files
2. Run rename operation
3. Measure execution time
4. Verify progress indication updates

**Success Criteria**:
- Operation completes in < 10 seconds
- Progress indication updates every 2 seconds
- All files processed correctly

---

### Test Scenario 5: Format Conversion Quality

**Objective**: Verify format conversion preserves quality

**Steps**:
1. Create high-quality PNG image
2. Convert to JPEG with default quality
3. Convert to JPEG with quality=100
4. Compare file sizes and visual quality

**Success Criteria**:
- JPEG files created successfully
- Quality preserved appropriately
- Metadata preserved when possible

---

## Troubleshooting

### Common Issues

**Issue**: "Permission denied" error
- **Solution**: Check file permissions, run with appropriate user permissions

**Issue**: "Pattern syntax error"
- **Solution**: Verify pattern uses correct syntax: `{n}` for numbers, `*` for wildcards

**Issue**: "No files match criteria"
- **Solution**: Check pattern/filter matches files in directory, verify directory path

**Issue**: "Insufficient disk space"
- **Solution**: Free up disk space before conversion operations

---

## Next Steps

After quickstart validation:
1. Review implementation plan (`plan.md`)
2. Generate tasks (`/speckit.tasks`)
3. Begin implementation (`/speckit.implement`)


# Test File Fixtures

This directory contains test files for integration testing and manual testing.

## Files Created

### Text Files
- `file1.txt`, `file2.txt`, `file3.txt` - Sample text files for rename/delete testing

### Temporary Files
- `temp1.tmp`, `temp2.tmp` - Temporary files for delete testing

### Log Files
- `app.log` - Application log file
- `error.log` - Error log file

### Image Files
- `image1.png`, `image2.png` - Sample PNG images for format conversion testing

## Usage

These files can be used for:
1. Manual CLI testing
2. Integration test scenarios
3. Quickstart guide examples

## Running Tests

The test suite creates temporary files automatically, so these fixtures are optional.
They're useful for manual testing and demonstration purposes.

## Example Usage

```bash
# Activate virtual environment
source venv/bin/activate

# Test rename with fixtures
fileproc rename --dry-run "renamed-{n}.txt" tests/fixtures/test_files/

# Test delete with fixtures
fileproc delete --dry-run "*.tmp" tests/fixtures/test_files/

# Test convert with fixtures
fileproc convert --dry-run png jpeg tests/fixtures/test_files/
```

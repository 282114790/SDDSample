"""Unit tests for formatters module."""

import json
from src.utils import formatters


class TestFormatJson:
    """Tests for format_json function."""
    
    def test_format_simple_dict(self):
        """Test formatting simple dictionary."""
        data = {"key": "value"}
        result = formatters.format_json(data)
        assert isinstance(result, str)
        parsed = json.loads(result)
        assert parsed == data
    
    def test_format_nested_dict(self):
        """Test formatting nested dictionary."""
        data = {"a": {"b": {"c": "value"}}}
        result = formatters.format_json(data)
        parsed = json.loads(result)
        assert parsed == data


class TestFormatHumanReadable:
    """Tests for format_human_readable function."""
    
    def test_format_with_preview(self):
        """Test formatting with preview."""
        preview = [
            {"source": "file1.txt", "target": "renamed1.txt", "action": "rename"},
            {"source": "file2.txt", "target": "renamed2.txt", "action": "rename"},
        ]
        result = formatters.format_human_readable(
            "rename", 2, 2, 0, preview=preview
        )
        assert "Preview of rename operations" in result
        assert "file1.txt → renamed1.txt" in result
        assert "2 files will be renamed" in result
    
    def test_format_without_preview(self):
        """Test formatting without preview."""
        result = formatters.format_human_readable("delete", 10, 8, 2)
        assert "Delete operation completed" in result
        assert "Files processed: 10" in result
        assert "Succeeded: 8" in result
        assert "Failed: 2" in result
    
    def test_format_with_errors(self):
        """Test formatting with errors."""
        errors = [
            {"file": "file1.txt", "message": "Permission denied"},
        ]
        result = formatters.format_human_readable(
            "delete", 1, 0, 1, errors=errors
        )
        assert "Errors:" in result
        assert "file1.txt: Permission denied" in result


class TestFormatOperationResult:
    """Tests for format_operation_result function."""
    
    def test_format_json_output(self):
        """Test JSON output format."""
        result = formatters.format_operation_result(
            True, "rename", 5, 5, 0, output_format="json"
        )
        parsed = json.loads(result)
        assert parsed["success"] is True
        assert parsed["operation_type"] == "rename"
        assert parsed["files_processed"] == 5
    
    def test_format_human_output(self):
        """Test human-readable output format."""
        result = formatters.format_operation_result(
            True, "rename", 5, 5, 0, output_format="human"
        )
        assert isinstance(result, str)
        assert "rename" in result.lower()


"""Unit tests for validators module."""

import pytest
from pathlib import Path
import tempfile
import os

from src.core.exceptions import PatternError, PathError, ValidationError
from src.utils import validators


class TestValidatePattern:
    """Tests for validate_pattern function."""
    
    def test_valid_pattern_with_n(self):
        """Test valid pattern with {n} placeholder."""
        validators.validate_pattern("file-{n}.txt")
    
    def test_valid_pattern_with_padding(self):
        """Test valid pattern with {n:3} placeholder."""
        validators.validate_pattern("file-{n:3}.txt")
    
    def test_valid_pattern_with_wildcard(self):
        """Test valid pattern with wildcard."""
        validators.validate_pattern("file-*.txt")
    
    def test_empty_pattern_raises_error(self):
        """Test that empty pattern raises PatternError."""
        with pytest.raises(PatternError):
            validators.validate_pattern("")
    
    def test_invalid_placeholder_raises_error(self):
        """Test that invalid placeholder raises PatternError."""
        with pytest.raises(PatternError):
            validators.validate_pattern("file-{x}.txt")
    
    def test_unbalanced_braces_raises_error(self):
        """Test that unbalanced braces raise PatternError."""
        with pytest.raises(PatternError):
            validators.validate_pattern("file-{n.txt")


class TestValidatePath:
    """Tests for validate_path function."""
    
    def test_valid_path(self):
        """Test valid path string."""
        with tempfile.TemporaryDirectory() as tmpdir:
            path = validators.validate_path(tmpdir)
            assert isinstance(path, Path)
    
    def test_empty_path_raises_error(self):
        """Test that empty path raises PathError."""
        with pytest.raises(PathError):
            validators.validate_path("")
    
    def test_invalid_path_raises_error(self):
        """Test that invalid path raises PathError."""
        with pytest.raises(PathError):
            validators.validate_path("\x00invalid")


class TestValidateDirectory:
    """Tests for validate_directory function."""
    
    def test_valid_directory(self):
        """Test valid directory path."""
        with tempfile.TemporaryDirectory() as tmpdir:
            path = validators.validate_directory(tmpdir)
            assert isinstance(path, Path)
            assert path.is_dir()
    
    def test_nonexistent_directory_raises_error(self):
        """Test that nonexistent directory raises PathError."""
        with pytest.raises(PathError):
            validators.validate_directory("/nonexistent/path/12345")
    
    def test_file_path_raises_error(self):
        """Test that file path raises PathError."""
        with tempfile.NamedTemporaryFile(delete=False) as tmpfile:
            try:
                with pytest.raises(PathError):
                    validators.validate_directory(tmpfile.name)
            finally:
                os.unlink(tmpfile.name)


class TestValidateFileFormat:
    """Tests for validate_file_format function."""
    
    def test_valid_format(self):
        """Test valid format."""
        validators.validate_file_format("png", ["png", "jpg", "gif"])
    
    def test_empty_format_raises_error(self):
        """Test that empty format raises ValidationError."""
        with pytest.raises(ValidationError):
            validators.validate_file_format("", ["png", "jpg"])
    
    def test_unsupported_format_raises_error(self):
        """Test that unsupported format raises ValidationError."""
        with pytest.raises(ValidationError):
            validators.validate_file_format("xyz", ["png", "jpg"])


class TestValidateExtension:
    """Tests for validate_extension function."""
    
    def test_valid_extension_with_dot(self):
        """Test valid extension with dot."""
        validators.validate_extension(".txt")
    
    def test_valid_extension_without_dot(self):
        """Test valid extension without dot."""
        validators.validate_extension("txt")
    
    def test_empty_extension_raises_error(self):
        """Test that empty extension raises ValidationError."""
        with pytest.raises(ValidationError):
            validators.validate_extension("")


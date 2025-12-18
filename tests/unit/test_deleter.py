"""Unit tests for deleter module."""

import pytest
import tempfile
from pathlib import Path

from src.core.exceptions import PathError
from src.core.deleter import Deleter


class TestDeleter:
    """Tests for Deleter class."""
    
    def test_delete_by_pattern(self):
        """Test deleting files matching pattern."""
        with tempfile.TemporaryDirectory() as tmpdir:
            # Create test files
            temp_files = [Path(tmpdir) / f"temp{i}.txt" for i in range(1, 3)]
            important = Path(tmpdir) / "important.doc"
            for f in temp_files + [important]:
                f.write_text("test")
            
            deleter = Deleter()
            result = deleter.delete("temp*.txt", tmpdir, dry_run=False)
            
            # Verify temp files deleted
            assert result.files_succeeded == 2
            assert not temp_files[0].exists()
            assert not temp_files[1].exists()
            # Important file should remain
            assert important.exists()
    
    def test_delete_dry_run(self):
        """Test dry-run mode shows preview without deleting."""
        with tempfile.TemporaryDirectory() as tmpdir:
            temp_file = Path(tmpdir) / "temp1.txt"
            temp_file.write_text("test")
            
            deleter = Deleter()
            result = deleter.delete("temp*.txt", tmpdir, dry_run=True)
            
            # File should not be deleted
            assert temp_file.exists()
            # Preview should be generated
            assert len(result.preview) == 1
    
    def test_delete_by_extension(self):
        """Test deleting files by extension."""
        with tempfile.TemporaryDirectory() as tmpdir:
            txt_files = [Path(tmpdir) / f"file{i}.txt" for i in range(1, 3)]
            doc_files = [Path(tmpdir) / f"file{i}.doc" for i in range(1, 3)]
            for f in txt_files + doc_files:
                f.write_text("test")
            
            deleter = Deleter()
            result = deleter.delete("*", tmpdir, extension=".txt", dry_run=False)
            
            # Only .txt files should be deleted
            assert result.files_succeeded == 2
            assert not txt_files[0].exists()
            assert doc_files[0].exists()  # Should remain
    
    def test_delete_no_matches(self):
        """Test deleting when no files match."""
        with tempfile.TemporaryDirectory() as tmpdir:
            deleter = Deleter()
            result = deleter.delete("nonexistent*.txt", tmpdir, dry_run=False)
            
            # Should process 0 files
            assert result.files_processed == 0
            assert result.files_succeeded == 0
    
    def test_delete_with_size_filter(self):
        """Test deleting files with size filter."""
        with tempfile.TemporaryDirectory() as tmpdir:
            small_file = Path(tmpdir) / "small.txt"
            large_file = Path(tmpdir) / "large.txt"
            small_file.write_text("x" * 100)  # 100 bytes
            large_file.write_text("x" * 10000)  # 10000 bytes
            
            deleter = Deleter()
            result = deleter.delete("*", tmpdir, min_size=1000, dry_run=False)
            
            # Only large file should be deleted
            assert result.files_succeeded == 1
            assert small_file.exists()
            assert not large_file.exists()


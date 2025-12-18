"""Unit tests for renamer module."""

import pytest
import tempfile
import os
from pathlib import Path

from src.core.exceptions import PatternError, PathError
from src.core.renamer import Renamer


class TestRenamer:
    """Tests for Renamer class."""
    
    def test_rename_with_sequential_numbering(self):
        """Test renaming files with sequential numbering."""
        with tempfile.TemporaryDirectory() as tmpdir:
            # Create test files
            files = [Path(tmpdir) / f"file{i}.txt" for i in range(1, 4)]
            for f in files:
                f.write_text("test")
            
            renamer = Renamer()
            pattern = "renamed-{n}.txt"
            result = renamer.rename(pattern, tmpdir, dry_run=False)
            
            # Verify files renamed
            assert result.files_succeeded == 3
            assert (Path(tmpdir) / "renamed-1.txt").exists()
            assert (Path(tmpdir) / "renamed-2.txt").exists()
            assert (Path(tmpdir) / "renamed-3.txt").exists()
    
    def test_rename_with_zero_padding(self):
        """Test renaming files with zero-padded numbering."""
        with tempfile.TemporaryDirectory() as tmpdir:
            files = [Path(tmpdir) / f"file{i}.txt" for i in range(1, 4)]
            for f in files:
                f.write_text("test")
            
            renamer = Renamer()
            pattern = "file-{n:3}.txt"
            result = renamer.rename(pattern, tmpdir, dry_run=False)
            
            assert result.files_succeeded == 3
            assert (Path(tmpdir) / "file-001.txt").exists()
            assert (Path(tmpdir) / "file-002.txt").exists()
            assert (Path(tmpdir) / "file-003.txt").exists()
    
    def test_dry_run_preview(self):
        """Test dry-run mode shows preview without renaming."""
        with tempfile.TemporaryDirectory() as tmpdir:
            files = [Path(tmpdir) / f"file{i}.txt" for i in range(1, 3)]
            for f in files:
                f.write_text("test")
            
            renamer = Renamer()
            pattern = "renamed-{n}.txt"
            result = renamer.rename(pattern, tmpdir, dry_run=True)
            
            # Files should not be renamed
            assert (Path(tmpdir) / "file1.txt").exists()
            assert (Path(tmpdir) / "file2.txt").exists()
            # Preview should be generated
            assert len(result.preview) == 2
    
    def test_filter_by_extension(self):
        """Test filtering files by extension."""
        with tempfile.TemporaryDirectory() as tmpdir:
            txt_files = [Path(tmpdir) / f"file{i}.txt" for i in range(1, 3)]
            doc_files = [Path(tmpdir) / f"file{i}.doc" for i in range(1, 3)]
            for f in txt_files + doc_files:
                f.write_text("test")
            
            renamer = Renamer()
            pattern = "renamed-{n}.txt"
            result = renamer.rename(pattern, tmpdir, filter_extension=".txt", dry_run=False)
            
            # Only .txt files should be renamed
            assert result.files_succeeded == 2
            assert (Path(tmpdir) / "renamed-1.txt").exists()
            assert (Path(tmpdir) / "file1.doc").exists()  # Should remain unchanged
    
    def test_prevent_overwrite(self):
        """Test that overwrite is prevented by default."""
        with tempfile.TemporaryDirectory() as tmpdir:
            # Create file that would conflict
            existing = Path(tmpdir) / "renamed-1.txt"
            existing.write_text("existing")
            
            file1 = Path(tmpdir) / "file1.txt"
            file1.write_text("new")
            
            renamer = Renamer()
            pattern = "renamed-{n}.txt"
            result = renamer.rename(pattern, tmpdir, dry_run=False)
            
            # Should fail due to overwrite conflict
            assert result.files_failed > 0
    
    def test_invalid_pattern_raises_error(self):
        """Test that invalid pattern raises PatternError."""
        renamer = Renamer()
        with tempfile.TemporaryDirectory() as tmpdir:
            # Pattern validation happens before rename, so PatternError should be raised
            # But it's caught and added to errors, so we check the result instead
            result = renamer.rename("invalid-{x}.txt", tmpdir)
            assert not result.success
            assert len(result.errors) > 0
            assert "Invalid placeholder" in str(result.errors[0].get("message", ""))


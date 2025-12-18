"""Integration tests for rename CLI command."""

import pytest
import tempfile
import subprocess
import sys
from pathlib import Path


class TestCLIRename:
    """Integration tests for rename command."""
    
    def test_rename_command_basic(self):
        """Test basic rename command."""
        with tempfile.TemporaryDirectory() as tmpdir:
            # Create test files
            for i in range(1, 4):
                (Path(tmpdir) / f"photo{i}.jpg").write_text("test")
            
            # Run rename command
            result = subprocess.run(
                [sys.executable, "-m", "src.cli.commands", "rename", 
                 "vacation-{n}.jpg", tmpdir],
                capture_output=True,
                text=True,
                cwd=Path(__file__).parent.parent.parent.parent
            )
            
            # Verify command succeeded
            assert result.returncode == 0
            # Verify files renamed
            assert (Path(tmpdir) / "vacation-1.jpg").exists()
            assert (Path(tmpdir) / "vacation-2.jpg").exists()
            assert (Path(tmpdir) / "vacation-3.jpg").exists()
    
    def test_rename_dry_run(self):
        """Test rename command with dry-run."""
        with tempfile.TemporaryDirectory() as tmpdir:
            (Path(tmpdir) / "file1.txt").write_text("test")
            
            result = subprocess.run(
                [sys.executable, "-m", "src.cli.commands", "rename",
                 "--dry-run", "renamed-{n}.txt", tmpdir],
                capture_output=True,
                text=True,
                cwd=Path(__file__).parent.parent.parent.parent
            )
            
            assert result.returncode == 0
            assert "Preview" in result.stdout or "preview" in result.stdout.lower()
            # File should not be renamed
            assert (Path(tmpdir) / "file1.txt").exists()
    
    def test_rename_with_filter(self):
        """Test rename command with extension filter."""
        with tempfile.TemporaryDirectory() as tmpdir:
            (Path(tmpdir) / "file1.txt").write_text("test")
            (Path(tmpdir) / "file1.doc").write_text("test")
            
            result = subprocess.run(
                [sys.executable, "-m", "src.cli.commands", "rename",
                 "--filter", ".txt", "renamed-{n}.txt", tmpdir],
                capture_output=True,
                text=True,
                cwd=Path(__file__).parent.parent.parent.parent
            )
            
            assert result.returncode == 0
            # Only .txt file should be renamed
            assert (Path(tmpdir) / "renamed-1.txt").exists()
            assert (Path(tmpdir) / "file1.doc").exists()


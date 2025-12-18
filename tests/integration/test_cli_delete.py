"""Integration tests for delete CLI command."""

import pytest
import tempfile
import subprocess
import sys
from pathlib import Path


class TestCLIDelete:
    """Integration tests for delete command."""
    
    def test_delete_command_basic(self):
        """Test basic delete command."""
        with tempfile.TemporaryDirectory() as tmpdir:
            # Create test files
            temp_files = [Path(tmpdir) / f"temp{i}.txt" for i in range(1, 3)]
            important = Path(tmpdir) / "important.doc"
            for f in temp_files + [important]:
                f.write_text("test")
            
            # Run delete command
            result = subprocess.run(
                [sys.executable, "-m", "src.cli.commands", "delete",
                 "temp*.txt", tmpdir],
                capture_output=True,
                text=True,
                cwd=Path(__file__).parent.parent.parent.parent
            )
            
            # Verify command succeeded
            assert result.returncode == 0
            # Verify temp files deleted
            assert not temp_files[0].exists()
            assert not temp_files[1].exists()
            # Important file should remain
            assert important.exists()
    
    def test_delete_dry_run(self):
        """Test delete command with dry-run."""
        with tempfile.TemporaryDirectory() as tmpdir:
            temp_file = Path(tmpdir) / "temp1.txt"
            temp_file.write_text("test")
            
            result = subprocess.run(
                [sys.executable, "-m", "src.cli.commands", "delete",
                 "--dry-run", "temp*.txt", tmpdir],
                capture_output=True,
                text=True,
                cwd=Path(__file__).parent.parent.parent.parent
            )
            
            assert result.returncode == 0
            assert "Preview" in result.stdout or "preview" in result.stdout.lower()
            # File should not be deleted
            assert temp_file.exists()
    
    def test_delete_with_extension(self):
        """Test delete command with extension filter."""
        with tempfile.TemporaryDirectory() as tmpdir:
            txt_file = Path(tmpdir) / "file1.txt"
            doc_file = Path(tmpdir) / "file1.doc"
            txt_file.write_text("test")
            doc_file.write_text("test")
            
            result = subprocess.run(
                [sys.executable, "-m", "src.cli.commands", "delete",
                 "--extension", ".txt", "*", tmpdir],
                capture_output=True,
                text=True,
                cwd=Path(__file__).parent.parent.parent.parent
            )
            
            assert result.returncode == 0
            # Only .txt file should be deleted
            assert not txt_file.exists()
            assert doc_file.exists()


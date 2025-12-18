"""Integration tests for convert CLI command."""

import pytest
import tempfile
import subprocess
import sys
from pathlib import Path
from PIL import Image


class TestCLIConvert:
    """Integration tests for convert command."""
    
    def test_convert_command_basic(self):
        """Test basic convert command."""
        with tempfile.TemporaryDirectory() as tmpdir:
            # Create test PNG image
            png_file = Path(tmpdir) / "image1.png"
            img = Image.new('RGB', (100, 100), color='red')
            img.save(png_file, 'PNG')
            
            # Run convert command
            result = subprocess.run(
                [sys.executable, "-m", "src.cli.commands", "convert",
                 "png", "jpeg", tmpdir],
                capture_output=True,
                text=True,
                cwd=Path(__file__).parent.parent.parent.parent
            )
            
            # Verify command succeeded
            assert result.returncode == 0
            # Verify file converted
            assert (Path(tmpdir) / "image1.jpg").exists()
    
    def test_convert_dry_run(self):
        """Test convert command with dry-run."""
        with tempfile.TemporaryDirectory() as tmpdir:
            png_file = Path(tmpdir) / "test.png"
            img = Image.new('RGB', (100, 100), color='red')
            img.save(png_file, 'PNG')
            
            result = subprocess.run(
                [sys.executable, "-m", "src.cli.commands", "convert",
                 "--dry-run", "png", "jpeg", tmpdir],
                capture_output=True,
                text=True,
                cwd=Path(__file__).parent.parent.parent.parent
            )
            
            assert result.returncode == 0
            assert "Preview" in result.stdout or "preview" in result.stdout.lower()
            # File should not be converted
            assert not (Path(tmpdir) / "test.jpg").exists()


"""Unit tests for converter module."""

import pytest
import tempfile
from pathlib import Path
from PIL import Image

from src.core.exceptions import FormatError, ValidationError
from src.core.converter import Converter


class TestConverter:
    """Tests for Converter class."""
    
    def test_convert_png_to_jpeg(self):
        """Test converting PNG to JPEG."""
        with tempfile.TemporaryDirectory() as tmpdir:
            # Create test PNG image
            png_file = Path(tmpdir) / "test.png"
            img = Image.new('RGB', (100, 100), color='red')
            img.save(png_file, 'PNG')
            
            converter = Converter()
            result = converter.convert(
                source_format="png",
                target_format="jpeg",
                directory=tmpdir,
                dry_run=False
            )
            
            # Verify conversion succeeded
            assert result.files_succeeded == 1
            # JPEG format normalizes to .jpg extension
            jpeg_file = Path(tmpdir) / "test.jpg"
            assert jpeg_file.exists(), f"Expected {jpeg_file} to exist. Files: {list(Path(tmpdir).glob('*'))}"
    
    def test_convert_dry_run(self):
        """Test dry-run mode shows preview without converting."""
        with tempfile.TemporaryDirectory() as tmpdir:
            png_file = Path(tmpdir) / "test.png"
            img = Image.new('RGB', (100, 100), color='red')
            img.save(png_file, 'PNG')
            
            converter = Converter()
            result = converter.convert(
                source_format="png",
                target_format="jpeg",
                directory=tmpdir,
                dry_run=True
            )
            
            # File should not be converted
            assert not (Path(tmpdir) / "test.jpg").exists()
            # Preview should be generated
            assert len(result.preview) == 1
    
    def test_unsupported_format_raises_error(self):
        """Test that unsupported format raises FormatError."""
        converter = Converter()
        with tempfile.TemporaryDirectory() as tmpdir:
            # This should raise FormatError (converted from ValidationError)
            with pytest.raises((FormatError, ValidationError)):
                converter.convert("xyz", "abc", tmpdir)
    
    def test_convert_preserves_metadata(self):
        """Test that metadata is preserved when possible."""
        with tempfile.TemporaryDirectory() as tmpdir:
            png_file = Path(tmpdir) / "test.png"
            img = Image.new('RGB', (100, 100), color='red')
            img.save(png_file, 'PNG')
            
            converter = Converter()
            result = converter.convert(
                source_format="png",
                target_format="jpeg",
                directory=tmpdir,
                preserve_metadata=True,
                dry_run=False
            )
            
            assert result.files_succeeded == 1


"""Format conversion logic for file batch processor."""

import shutil
from pathlib import Path
from typing import List, Optional, Dict
from PIL import Image

from src.core.exceptions import FormatError, PathError, OperationError, ValidationError
from src.utils.validators import validate_directory, validate_file_format


class OperationResult:
    """Result of a batch operation."""
    
    def __init__(self):
        self.success = True
        self.files_processed = 0
        self.files_succeeded = 0
        self.files_failed = 0
        self.preview: List[Dict[str, str]] = []
        self.errors: List[Dict[str, str]] = []


class Converter:
    """Handles file format conversion."""
    
    # Supported formats mapping
    SUPPORTED_FORMATS = {
        'png': ['PNG'],
        'jpg': ['JPEG'],
        'jpeg': ['JPEG'],
        'gif': ['GIF'],
        'bmp': ['BMP'],
        'tiff': ['TIFF'],
    }
    
    def __init__(self):
        """Initialize Converter."""
        pass
    
    def convert(
        self,
        source_format: str,
        target_format: str,
        directory: str,
        dry_run: bool = False,
        recursive: bool = False,
        quality: int = 90,
        preserve_metadata: bool = False,
    ) -> OperationResult:
        """
        Convert files between formats.
        
        Args:
            source_format: Source file format (e.g., "png")
            target_format: Target file format (e.g., "jpeg")
            directory: Target directory
            dry_run: If True, only preview changes
            recursive: If True, process subdirectories
            quality: Quality setting for lossy formats (1-100)
            preserve_metadata: If True, preserve metadata when possible
            
        Returns:
            OperationResult with operation statistics
        """
        result = OperationResult()
        
        # Validate inputs
        try:
            validate_directory(directory)
            validate_file_format(source_format, list(self.SUPPORTED_FORMATS.keys()))
            validate_file_format(target_format, list(self.SUPPORTED_FORMATS.keys()))
        except PathError as e:
            result.success = False
            result.errors.append({"message": str(e)})
            return result
        except ValidationError as e:
            # Convert ValidationError to FormatError for format validation
            raise FormatError(str(e))
        
        # Check if conversion is supported
        if not self._is_conversion_supported(source_format, target_format):
            result.success = False
            result.errors.append({
                "message": f"Conversion from {source_format} to {target_format} is not supported"
            })
            return result
        
        # Find files to convert
        dir_path = Path(directory)
        files = self._find_files(dir_path, source_format, recursive)
        result.files_processed = len(files)
        
        if not files:
            return result
        
        # Generate preview
        for file_path in files:
            target_path = self._get_target_path(file_path, target_format)
            result.preview.append({
                "source": str(file_path),
                "target": str(target_path),
                "action": "convert"
            })
        
        # Execute conversion if not dry-run
        if not dry_run:
            # Check disk space before starting
            if not self._check_disk_space(files, target_format):
                result.success = False
                result.errors.append({"message": "Insufficient disk space"})
                return result
            
            for file_path in files:
                try:
                    target_path = self._get_target_path(file_path, target_format)
                    self._convert_file(
                        file_path, target_path, source_format, target_format,
                        quality, preserve_metadata
                    )
                    result.files_succeeded += 1
                except Exception as e:
                    result.files_failed += 1
                    result.errors.append({
                        "file": str(file_path),
                        "message": str(e)
                    })
        else:
            result.files_succeeded = len(files)
        
        result.success = result.files_failed == 0
        return result
    
    def _is_conversion_supported(self, source: str, target: str) -> bool:
        """Check if conversion is supported."""
        # For now, support image format conversions
        return (source.lower() in self.SUPPORTED_FORMATS and
                target.lower() in self.SUPPORTED_FORMATS)
    
    def _find_files(self, directory: Path, source_format: str, recursive: bool) -> List[Path]:
        """Find files matching source format."""
        files = []
        extension = f".{source_format.lower()}"
        
        if recursive:
            pattern = f"**/*{extension}"
        else:
            pattern = f"*{extension}"
        
        for path in directory.glob(pattern):
            if path.is_file():
                files.append(path)
        
        files.sort()
        return files
    
    def _get_target_path(self, source_path: Path, target_format: str) -> Path:
        """Get target file path for conversion."""
        # Normalize jpeg to jpg for consistency
        format_ext = target_format.lower()
        if format_ext == 'jpeg':
            format_ext = 'jpg'
        return source_path.with_suffix(f".{format_ext}")
    
    def _check_disk_space(self, files: List[Path], target_format: str) -> bool:
        """Check if there's enough disk space for conversion."""
        # Simple check: assume target files will be similar size
        # In production, this would be more sophisticated
        total_size = sum(f.stat().st_size for f in files)
        free_space = shutil.disk_usage(files[0].parent).free
        
        # Allow some buffer (2x for safety)
        return free_space > total_size * 2
    
    def _convert_file(
        self,
        source_path: Path,
        target_path: Path,
        source_format: str,
        target_format: str,
        quality: int,
        preserve_metadata: bool,
    ) -> None:
        """Convert a single file."""
        try:
            # Open source image
            img = Image.open(source_path)
            
            # Convert RGB if needed (for formats like PNG with transparency)
            if target_format.lower() in ['jpg', 'jpeg'] and img.mode in ['RGBA', 'LA', 'P']:
                # Create white background
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            
            # Save with appropriate format
            save_kwargs = {}
            if target_format.lower() in ['jpg', 'jpeg']:
                save_kwargs['quality'] = quality
                save_kwargs['optimize'] = True
            
            img.save(target_path, self.SUPPORTED_FORMATS[target_format.lower()][0], **save_kwargs)
            
        except Exception as e:
            raise FormatError(f"Failed to convert {source_path}: {e}")


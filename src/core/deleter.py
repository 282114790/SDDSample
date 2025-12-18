"""Delete logic with criteria matching for file batch processor."""

import glob
from pathlib import Path
from typing import List, Optional, Dict
from datetime import datetime

from src.core.exceptions import PathError, OperationError
from src.utils.validators import validate_directory


class OperationResult:
    """Result of a batch operation."""
    
    def __init__(self):
        self.success = True
        self.files_processed = 0
        self.files_succeeded = 0
        self.files_failed = 0
        self.preview: List[Dict[str, str]] = []
        self.errors: List[Dict[str, str]] = []


class Deleter:
    """Handles batch file deletion with criteria matching."""
    
    def __init__(self):
        """Initialize Deleter."""
        pass
    
    def delete(
        self,
        pattern: str,
        directory: str,
        extension: Optional[str] = None,
        min_size: Optional[int] = None,
        max_size: Optional[int] = None,
        modified_before: Optional[datetime] = None,
        modified_after: Optional[datetime] = None,
        dry_run: bool = False,
        recursive: bool = False,
    ) -> OperationResult:
        """
        Delete files matching criteria.
        
        Args:
            pattern: Glob pattern for files to delete (e.g., "*.tmp")
            directory: Target directory
            extension: Optional extension filter (e.g., ".txt")
            min_size: Optional minimum file size in bytes
            max_size: Optional maximum file size in bytes
            modified_before: Optional files modified before this date
            modified_after: Optional files modified after this date
            dry_run: If True, only preview changes
            recursive: If True, process subdirectories
            
        Returns:
            OperationResult with operation statistics
        """
        result = OperationResult()
        
        # Validate inputs
        try:
            dir_path = validate_directory(directory)
        except PathError as e:
            result.success = False
            result.errors.append({"message": str(e)})
            return result
        
        # Find files to delete
        files = self._find_files(
            dir_path, pattern, extension, min_size, max_size,
            modified_before, modified_after, recursive
        )
        result.files_processed = len(files)
        
        if not files:
            return result
        
        # Generate preview
        for file_path in files:
            result.preview.append({
                "source": str(file_path),
                "action": "delete"
            })
        
        # Execute delete if not dry-run
        if not dry_run:
            for file_path in files:
                try:
                    file_path.unlink()
                    result.files_succeeded += 1
                except PermissionError:
                    result.files_failed += 1
                    result.errors.append({
                        "file": str(file_path),
                        "message": "Permission denied"
                    })
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
    
    def _find_files(
        self,
        directory: Path,
        pattern: str,
        extension: Optional[str],
        min_size: Optional[int],
        max_size: Optional[int],
        modified_before: Optional[datetime],
        modified_after: Optional[datetime],
        recursive: bool,
    ) -> List[Path]:
        """
        Find files matching criteria.
        
        Args:
            directory: Directory to search
            pattern: Glob pattern
            extension: Optional extension filter
            min_size: Optional minimum size
            max_size: Optional maximum size
            modified_before: Optional modification date filter
            modified_after: Optional modification date filter
            recursive: Whether to search recursively
            
        Returns:
            List of matching file paths
        """
        files = []
        
        if recursive:
            search_pattern = f"**/{pattern}"
        else:
            search_pattern = pattern
        
        for path in directory.glob(search_pattern):
            if not path.is_file():
                continue
            
            # Apply filters
            if extension:
                if not path.suffix.lower() == extension.lower():
                    continue
            
            if min_size is not None:
                if path.stat().st_size < min_size:
                    continue
            
            if max_size is not None:
                if path.stat().st_size > max_size:
                    continue
            
            if modified_before:
                mtime = datetime.fromtimestamp(path.stat().st_mtime)
                if mtime >= modified_before:
                    continue
            
            if modified_after:
                mtime = datetime.fromtimestamp(path.stat().st_mtime)
                if mtime <= modified_after:
                    continue
            
            files.append(path)
        
        # Sort for consistent ordering
        files.sort()
        return files


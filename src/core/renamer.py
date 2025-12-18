"""Rename logic with pattern matching for file batch processor."""

import re
from pathlib import Path
from typing import List, Optional, Dict

from src.core.exceptions import PatternError, PathError, OperationError
from src.utils.validators import validate_pattern, validate_directory


class OperationResult:
    """Result of a batch operation."""
    
    def __init__(self):
        self.success = True
        self.files_processed = 0
        self.files_succeeded = 0
        self.files_failed = 0
        self.preview: List[Dict[str, str]] = []
        self.errors: List[Dict[str, str]] = []


class Renamer:
    """Handles batch file renaming with pattern matching."""
    
    def __init__(self):
        """Initialize Renamer."""
        pass
    
    def rename(
        self,
        pattern: str,
        directory: str,
        filter_extension: Optional[str] = None,
        filter_pattern: Optional[str] = None,
        dry_run: bool = False,
        recursive: bool = False,
        overwrite: bool = False,
    ) -> OperationResult:
        """
        Rename files matching pattern.
        
        Args:
            pattern: Rename pattern with {n} or {n:digits} placeholders
            directory: Target directory
            filter_extension: Optional extension filter (e.g., ".txt")
            filter_pattern: Optional glob pattern filter
            dry_run: If True, only preview changes
            recursive: If True, process subdirectories
            overwrite: If True, allow overwriting existing files
            
        Returns:
            OperationResult with operation statistics
        """
        result = OperationResult()
        
        # Validate inputs
        try:
            validate_pattern(pattern)
            dir_path = validate_directory(directory)
        except (PatternError, PathError) as e:
            result.success = False
            result.errors.append({"message": str(e)})
            return result
        
        # Find files to rename
        files = self._find_files(dir_path, filter_extension, filter_pattern, recursive)
        result.files_processed = len(files)
        
        if not files:
            return result
        
        # Generate rename mappings
        rename_mappings = []
        for idx, file_path in enumerate(files, start=1):
            try:
                new_name = self._generate_new_name(pattern, file_path, idx)
                new_path = file_path.parent / new_name
                
                # Check for conflicts
                if not overwrite and new_path.exists() and new_path != file_path:
                    result.files_failed += 1
                    result.errors.append({
                        "file": str(file_path),
                        "message": f"Target file already exists: {new_path}"
                    })
                    continue
                
                rename_mappings.append({
                    "source": str(file_path),
                    "target": str(new_path),
                    "action": "rename"
                })
            except Exception as e:
                result.files_failed += 1
                result.errors.append({
                    "file": str(file_path),
                    "message": str(e)
                })
        
        # Generate preview
        result.preview = rename_mappings
        
        # Execute rename if not dry-run
        if not dry_run:
            for mapping in rename_mappings:
                try:
                    source = Path(mapping["source"])
                    target = Path(mapping["target"])
                    source.rename(target)
                    result.files_succeeded += 1
                except Exception as e:
                    result.files_failed += 1
                    result.errors.append({
                        "file": mapping["source"],
                        "message": str(e)
                    })
        else:
            result.files_succeeded = len(rename_mappings)
        
        result.success = result.files_failed == 0
        return result
    
    def _find_files(
        self,
        directory: Path,
        filter_extension: Optional[str],
        filter_pattern: Optional[str],
        recursive: bool,
    ) -> List[Path]:
        """
        Find files matching criteria.
        
        Args:
            directory: Directory to search
            filter_extension: Optional extension filter
            filter_pattern: Optional glob pattern
            recursive: Whether to search recursively
            
        Returns:
            List of matching file paths
        """
        files = []
        
        if recursive:
            pattern = "**/*"
        else:
            pattern = "*"
        
        if filter_pattern:
            pattern = filter_pattern
            if recursive:
                pattern = f"**/{pattern}"
        
        for path in directory.glob(pattern):
            if not path.is_file():
                continue
            
            if filter_extension:
                if not path.suffix.lower() == filter_extension.lower():
                    continue
            
            files.append(path)
        
        # Sort for consistent ordering
        files.sort()
        return files
    
    def _generate_new_name(self, pattern: str, file_path: Path, index: int) -> str:
        """
        Generate new filename from pattern.
        
        Args:
            pattern: Pattern with {n} or {n:digits} placeholders
            file_path: Original file path
            index: Sequential index starting from 1
            
        Returns:
            New filename
        """
        new_name = pattern
        
        # Replace {n:digits} with zero-padded number
        def replace_padded(match):
            padding = int(match.group(1)) if match.group(1) else 0
            return str(index).zfill(padding) if padding > 0 else str(index)
        
        new_name = re.sub(r'\{n:(\d+)\}', replace_padded, new_name)
        
        # Replace {n} with number
        new_name = re.sub(r'\{n\}', str(index), new_name)
        
        # Replace * with original filename (without extension)
        if '*' in new_name:
            stem = file_path.stem
            new_name = new_name.replace('*', stem)
        
        return new_name


"""Input validation functions for file batch processor."""

import re
from pathlib import Path
from typing import List, Optional

from src.core.exceptions import PatternError, PathError, ValidationError


def validate_pattern(pattern: str) -> None:
    """
    Validate rename pattern syntax.
    
    Valid patterns:
    - {n} for sequential numbering
    - {n:3} for zero-padded sequential numbering
    - * for wildcard matching
    
    Args:
        pattern: Pattern string to validate
        
    Raises:
        PatternError: If pattern is invalid
    """
    if not pattern:
        raise PatternError("Pattern cannot be empty")
    
    # Check for valid placeholder syntax
    # Allow {n} and {n:digits} patterns
    placeholder_pattern = r'\{n(?::\d+)?\}'
    
    # Check for balanced braces
    open_braces = pattern.count('{')
    close_braces = pattern.count('}')
    
    if open_braces != close_braces:
        raise PatternError("Unbalanced braces in pattern")
    
    # Validate placeholder syntax
    if '{' in pattern or '}' in pattern:
        # Extract all placeholders
        placeholders = re.findall(r'\{[^}]+\}', pattern)
        for placeholder in placeholders:
            if not re.match(r'\{n(?::\d+)?\}', placeholder):
                raise PatternError(f"Invalid placeholder syntax: {placeholder}. Use {{n}} or {{n:digits}}")


def validate_path(path: str) -> Path:
    """
    Validate and convert string path to Path object.
    
    Args:
        path: Path string to validate
        
    Returns:
        Path object
        
    Raises:
        PathError: If path is invalid
    """
    if not path:
        raise PathError("Path cannot be empty")
    
    try:
        path_obj = Path(path).resolve()
        return path_obj
    except (OSError, ValueError) as e:
        raise PathError(f"Invalid path: {path}. Error: {e}")


def validate_directory(path: str) -> Path:
    """
    Validate that path exists and is a directory.
    
    Args:
        path: Directory path to validate
        
    Returns:
        Path object
        
    Raises:
        PathError: If path doesn't exist or is not a directory
    """
    path_obj = validate_path(path)
    
    if not path_obj.exists():
        raise PathError(f"Directory does not exist: {path}")
    
    if not path_obj.is_dir():
        raise PathError(f"Path is not a directory: {path}")
    
    return path_obj


def validate_file_format(format_str: str, supported_formats: List[str]) -> None:
    """
    Validate file format against supported formats.
    
    Args:
        format_str: Format string to validate
        supported_formats: List of supported format strings
        
    Raises:
        ValidationError: If format is not supported
    """
    if not format_str:
        raise ValidationError("Format cannot be empty")
    
    format_lower = format_str.lower()
    supported_lower = [f.lower() for f in supported_formats]
    
    if format_lower not in supported_lower:
        raise ValidationError(
            f"Unsupported format: {format_str}. Supported formats: {', '.join(supported_formats)}"
        )


def validate_extension(extension: str) -> None:
    """
    Validate file extension format.
    
    Args:
        extension: Extension string (e.g., '.txt', 'txt')
        
    Raises:
        ValidationError: If extension format is invalid
    """
    if not extension:
        raise ValidationError("Extension cannot be empty")
    
    # Normalize extension (add dot if missing)
    if not extension.startswith('.'):
        extension = '.' + extension
    
    # Basic validation: should be alphanumeric after dot
    if len(extension) < 2 or not extension[1:].replace('_', '').replace('-', '').isalnum():
        raise ValidationError(f"Invalid extension format: {extension}")


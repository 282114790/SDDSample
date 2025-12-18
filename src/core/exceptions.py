"""Custom exceptions for file batch processor."""


class FileBatchProcessorError(Exception):
    """Base exception for file batch processor."""
    pass


class ValidationError(FileBatchProcessorError):
    """Raised when validation fails."""
    pass


class PatternError(ValidationError):
    """Raised when pattern syntax is invalid."""
    pass


class PathError(FileBatchProcessorError):
    """Raised when file path operations fail."""
    pass


class PermissionError(FileBatchProcessorError):
    """Raised when file permissions prevent operation."""
    pass


class FormatError(FileBatchProcessorError):
    """Raised when file format operations fail."""
    pass


class OperationError(FileBatchProcessorError):
    """Raised when batch operation fails."""
    pass


"""Output formatting functions for file batch processor."""

import json
from typing import Any, Dict, List, Optional


def format_json(data: Dict[str, Any]) -> str:
    """
    Format data as JSON string.
    
    Args:
        data: Dictionary to format as JSON
        
    Returns:
        JSON string
    """
    return json.dumps(data, indent=2, ensure_ascii=False)


def format_human_readable(
    operation_type: str,
    files_processed: int,
    files_succeeded: int,
    files_failed: int,
    preview: Optional[List[Dict[str, str]]] = None,
    errors: Optional[List[Dict[str, str]]] = None,
) -> str:
    """
    Format operation result as human-readable text.
    
    Args:
        operation_type: Type of operation (rename, delete, convert)
        files_processed: Total number of files processed
        files_succeeded: Number of files successfully processed
        files_failed: Number of files that failed
        preview: Optional preview of changes (for dry-run)
        errors: Optional list of errors
        
    Returns:
        Human-readable formatted string
    """
    lines = []
    
    if preview:
        lines.append(f"Preview of {operation_type} operations:")
        for item in preview:
            source = item.get('source', '')
            target = item.get('target', '')
            action = item.get('action', operation_type)
            
            if target:
                lines.append(f"  {source} → {target}")
            else:
                lines.append(f"  {source} (will be {action}d)")
        lines.append("")
        lines.append(f"{len(preview)} files will be {operation_type}d.")
        lines.append("Run without --dry-run to execute.")
    else:
        lines.append(f"{operation_type.capitalize()} operation completed:")
        lines.append(f"  Files processed: {files_processed}")
        lines.append(f"  Succeeded: {files_succeeded}")
        if files_failed > 0:
            lines.append(f"  Failed: {files_failed}")
    
    if errors:
        lines.append("")
        lines.append("Errors:")
        for error in errors:
            file_path = error.get('file', 'unknown')
            message = error.get('message', 'Unknown error')
            lines.append(f"  {file_path}: {message}")
    
    return "\n".join(lines)


def format_operation_result(
    success: bool,
    operation_type: str,
    files_processed: int,
    files_succeeded: int,
    files_failed: int,
    preview: Optional[List[Dict[str, str]]] = None,
    errors: Optional[List[Dict[str, str]]] = None,
    output_format: str = "human",
) -> str:
    """
    Format operation result in requested format.
    
    Args:
        success: Whether operation succeeded
        operation_type: Type of operation
        files_processed: Total files processed
        files_succeeded: Files succeeded
        files_failed: Files failed
        preview: Preview of changes
        errors: List of errors
        output_format: Output format ("human" or "json")
        
    Returns:
        Formatted string
    """
    if output_format == "json":
        result = {
            "success": success,
            "operation_type": operation_type,
            "files_processed": files_processed,
            "files_succeeded": files_succeeded,
            "files_failed": files_failed,
        }
        if preview:
            result["preview"] = preview
        if errors:
            result["errors"] = errors
        return format_json(result)
    else:
        return format_human_readable(
            operation_type,
            files_processed,
            files_succeeded,
            files_failed,
            preview,
            errors,
        )


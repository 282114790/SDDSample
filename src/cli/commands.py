"""CLI command definitions for file batch processor."""

import sys
import click
from pathlib import Path

from src.core.renamer import Renamer
from src.core.deleter import Deleter
from src.core.converter import Converter
from src.core.exceptions import FileBatchProcessorError
from src.utils.validators import validate_pattern, validate_directory, validate_extension, validate_file_format
from src.utils.formatters import format_operation_result


@click.group()
@click.version_option(version="0.1.0")
def main():
    """File Batch Processor - CLI tool for batch file operations."""
    pass


@main.command()
@click.argument('pattern', required=True)
@click.argument('directory', required=True)
@click.option('--filter', 'filter_extension', help='Filter files by extension (e.g., .txt)')
@click.option('--pattern', 'filter_pattern', help='Filter files by glob pattern (e.g., *.jpg)')
@click.option('--dry-run', is_flag=True, help='Preview changes without executing')
@click.option('--recursive', '-r', is_flag=True, help='Process subdirectories recursively')
@click.option('--overwrite', is_flag=True, help='Allow overwriting existing files')
@click.option('--json', is_flag=True, help='Output results in JSON format')
def rename(pattern, directory, filter_extension, filter_pattern, dry_run, recursive, overwrite, json):
    """
    Batch rename files using pattern matching.
    
    PATTERN: Rename pattern with {n} for sequential numbering or {n:3} for zero-padding
    DIRECTORY: Target directory containing files to rename
    
    Examples:
        fileproc rename "vacation-{n:3}.jpg" ./photos
        fileproc rename --filter .txt "renamed-{n}.txt" ./documents
        fileproc rename --dry-run "file-{n}.txt" .
    """
    try:
        # Validate inputs
        validate_pattern(pattern)
        validate_directory(directory)
        
        # Create renamer and execute
        renamer = Renamer()
        result = renamer.rename(
            pattern=pattern,
            directory=directory,
            filter_extension=filter_extension,
            filter_pattern=filter_pattern,
            dry_run=dry_run,
            recursive=recursive,
            overwrite=overwrite,
        )
        
        # Format and output result
        output_format = "json" if json else "human"
        output = format_operation_result(
            success=result.success,
            operation_type="rename",
            files_processed=result.files_processed,
            files_succeeded=result.files_succeeded,
            files_failed=result.files_failed,
            preview=result.preview if dry_run else None,
            errors=result.errors if result.errors else None,
            output_format=output_format,
        )
        
        click.echo(output)
        
        # Exit with appropriate code
        sys.exit(0 if result.success else 1)
        
    except FileBatchProcessorError as e:
        error_msg = f"Error: {e}"
        if json:
            import json as json_lib
            click.echo(json_lib.dumps({"success": False, "error": {"message": str(e)}}))
        else:
            click.echo(error_msg, err=True)
        sys.exit(1)
    except Exception as e:
        error_msg = f"Unexpected error: {e}"
        if json:
            import json as json_lib
            click.echo(json_lib.dumps({"success": False, "error": {"message": str(e)}}))
        else:
            click.echo(error_msg, err=True)
        sys.exit(1)


@main.command()
@click.argument('pattern', required=True)
@click.argument('directory', required=True)
@click.option('--extension', help='Filter by file extension')
@click.option('--min-size', type=int, help='Delete files larger than specified size (bytes)')
@click.option('--max-size', type=int, help='Delete files smaller than specified size (bytes)')
@click.option('--modified-before', help='Delete files modified before date (ISO format)')
@click.option('--modified-after', help='Delete files modified after date (ISO format)')
@click.option('--dry-run', is_flag=True, help='Preview files to be deleted')
@click.option('--recursive', '-r', is_flag=True, help='Process subdirectories recursively')
@click.option('--json', is_flag=True, help='Output results in JSON format')
def delete(pattern, directory, extension, min_size, max_size, modified_before, modified_after, dry_run, recursive, json):
    """
    Batch delete files matching criteria.
    
    PATTERN: Glob pattern for files to delete (e.g., *.tmp)
    DIRECTORY: Target directory containing files to delete
    
    Examples:
        fileproc delete "*.tmp" ./temp
        fileproc delete --extension .log --dry-run ./logs
        fileproc delete --min-size 1000000 "*.log" ./logs
    """
    try:
        # Validate inputs
        validate_directory(directory)
        if extension:
            validate_extension(extension)
        
        # Parse date filters
        mod_before = None
        mod_after = None
        if modified_before:
            from datetime import datetime
            mod_before = datetime.fromisoformat(modified_before)
        if modified_after:
            from datetime import datetime
            mod_after = datetime.fromisoformat(modified_after)
        
        # Create deleter and execute
        deleter = Deleter()
        result = deleter.delete(
            pattern=pattern,
            directory=directory,
            extension=extension,
            min_size=min_size,
            max_size=max_size,
            modified_before=mod_before,
            modified_after=mod_after,
            dry_run=dry_run,
            recursive=recursive,
        )
        
        # Format and output result
        output_format = "json" if json else "human"
        output = format_operation_result(
            success=result.success,
            operation_type="delete",
            files_processed=result.files_processed,
            files_succeeded=result.files_succeeded,
            files_failed=result.files_failed,
            preview=result.preview if dry_run else None,
            errors=result.errors if result.errors else None,
            output_format=output_format,
        )
        
        click.echo(output)
        
        # Exit with appropriate code
        sys.exit(0 if result.success else 1)
        
    except FileBatchProcessorError as e:
        error_msg = f"Error: {e}"
        if json:
            import json as json_lib
            click.echo(json_lib.dumps({"success": False, "error": {"message": str(e)}}))
        else:
            click.echo(error_msg, err=True)
        sys.exit(1)
    except Exception as e:
        error_msg = f"Unexpected error: {e}"
        if json:
            import json as json_lib
            click.echo(json_lib.dumps({"success": False, "error": {"message": str(e)}}))
        else:
            click.echo(error_msg, err=True)
        sys.exit(1)


@main.command()
@click.argument('source_format', required=True)
@click.argument('target_format', required=True)
@click.argument('directory', required=True)
@click.option('--dry-run', is_flag=True, help='Preview conversion operations')
@click.option('--recursive', '-r', is_flag=True, help='Process subdirectories recursively')
@click.option('--quality', type=int, default=90, help='Quality setting for lossy formats (1-100, default: 90)')
@click.option('--preserve-metadata', is_flag=True, help='Preserve EXIF and other metadata when possible')
@click.option('--json', is_flag=True, help='Output results in JSON format')
def convert(source_format, target_format, directory, dry_run, recursive, quality, preserve_metadata, json):
    """
    Convert files between formats.
    
    SOURCE_FORMAT: Source file format (e.g., png, jpg)
    TARGET_FORMAT: Target file format (e.g., jpeg, png)
    DIRECTORY: Target directory containing files to convert
    
    Examples:
        fileproc convert png jpeg ./images
        fileproc convert png jpeg --dry-run ./images
        fileproc convert png jpeg --quality 95 ./images
    """
    try:
        # Validate inputs
        validate_directory(directory)
        
        # Validate formats
        supported_formats = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff']
        validate_file_format(source_format, supported_formats)
        validate_file_format(target_format, supported_formats)
        
        # Validate quality
        if quality < 1 or quality > 100:
            raise ValueError("Quality must be between 1 and 100")
        
        # Create converter and execute
        converter = Converter()
        result = converter.convert(
            source_format=source_format,
            target_format=target_format,
            directory=directory,
            dry_run=dry_run,
            recursive=recursive,
            quality=quality,
            preserve_metadata=preserve_metadata,
        )
        
        # Format and output result
        output_format = "json" if json else "human"
        output = format_operation_result(
            success=result.success,
            operation_type="convert",
            files_processed=result.files_processed,
            files_succeeded=result.files_succeeded,
            files_failed=result.files_failed,
            preview=result.preview if dry_run else None,
            errors=result.errors if result.errors else None,
            output_format=output_format,
        )
        
        click.echo(output)
        
        # Exit with appropriate code
        sys.exit(0 if result.success else 1)
        
    except FileBatchProcessorError as e:
        error_msg = f"Error: {e}"
        if json:
            import json as json_lib
            click.echo(json_lib.dumps({"success": False, "error": {"message": str(e)}}))
        else:
            click.echo(error_msg, err=True)
        sys.exit(1)
    except Exception as e:
        error_msg = f"Unexpected error: {e}"
        if json:
            import json as json_lib
            click.echo(json_lib.dumps({"success": False, "error": {"message": str(e)}}))
        else:
            click.echo(error_msg, err=True)
        sys.exit(1)


if __name__ == '__main__':
    main()


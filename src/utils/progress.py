"""Progress indication functionality for long operations."""

import time
from typing import Callable, Optional


class ProgressIndicator:
    """Simple progress indicator for batch operations."""
    
    def __init__(self, total: int, update_interval: float = 2.0):
        """
        Initialize progress indicator.
        
        Args:
            total: Total number of items to process
            update_interval: Minimum seconds between updates
        """
        self.total = total
        self.current = 0
        self.update_interval = update_interval
        self.last_update_time = time.time()
        self.start_time = time.time()
    
    def update(self, increment: int = 1) -> None:
        """
        Update progress counter.
        
        Args:
            increment: Number of items processed since last update
        """
        self.current += increment
        current_time = time.time()
        
        # Only update display if enough time has passed
        if current_time - self.last_update_time >= self.update_interval:
            self._display()
            self.last_update_time = current_time
    
    def _display(self) -> None:
        """Display current progress."""
        if self.total > 0:
            percentage = (self.current / self.total) * 100
            elapsed = time.time() - self.start_time
            print(f"Progress: {self.current}/{self.total} ({percentage:.1f}%) - {elapsed:.1f}s", end='\r')
        else:
            print(f"Progress: {self.current} files processed", end='\r')
    
    def finish(self) -> None:
        """Finish progress indication."""
        self.current = self.total
        self._display()
        print()  # New line after progress
    
    def __enter__(self):
        """Context manager entry."""
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit."""
        self.finish()


def create_progress_indicator(total: int, update_interval: float = 2.0) -> ProgressIndicator:
    """
    Create a progress indicator.
    
    Args:
        total: Total number of items
        update_interval: Update interval in seconds
        
    Returns:
        ProgressIndicator instance
    """
    return ProgressIndicator(total, update_interval)


"""Unit tests for progress module."""

import time
from src.utils.progress import ProgressIndicator, create_progress_indicator


class TestProgressIndicator:
    """Tests for ProgressIndicator class."""
    
    def test_initialization(self):
        """Test progress indicator initialization."""
        indicator = ProgressIndicator(100)
        assert indicator.total == 100
        assert indicator.current == 0
    
    def test_update(self):
        """Test progress update."""
        indicator = ProgressIndicator(100, update_interval=0.1)
        indicator.update(10)
        assert indicator.current == 10
    
    def test_context_manager(self):
        """Test progress indicator as context manager."""
        with ProgressIndicator(10) as indicator:
            indicator.update(5)
            assert indicator.current == 5


class TestCreateProgressIndicator:
    """Tests for create_progress_indicator function."""
    
    def test_create_indicator(self):
        """Test creating progress indicator."""
        indicator = create_progress_indicator(50)
        assert isinstance(indicator, ProgressIndicator)
        assert indicator.total == 50


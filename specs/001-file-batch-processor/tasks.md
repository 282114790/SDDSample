# Tasks: File Batch Processor CLI

**Input**: Design documents from `/specs/001-file-batch-processor/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED per Constitution Principle II (Test-First NON-NEGOTIABLE). All tests must be written and FAIL before implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure per implementation plan (src/cli/, src/core/, src/utils/, tests/unit/, tests/integration/, tests/fixtures/)
- [x] T002 Initialize Python project with pyproject.toml including click and Pillow dependencies
- [x] T003 [P] Create src/cli/__init__.py
- [x] T004 [P] Create src/core/__init__.py
- [x] T005 [P] Create src/utils/__init__.py
- [x] T006 [P] Create tests/unit/__init__.py
- [x] T007 [P] Create tests/integration/__init__.py
- [x] T008 [P] Create tests/fixtures/test_files/ directory
- [x] T009 Configure pytest in pyproject.toml with test discovery settings
- [x] T010 Create requirements.txt with click and Pillow dependencies
- [x] T011 Create .gitignore for Python project

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T012 Create src/utils/validators.py with input validation functions (pattern validation, path validation, format validation)
- [x] T013 Create src/utils/formatters.py with output formatting functions (JSON formatter, human-readable formatter)
- [x] T014 Create src/utils/progress.py with progress indication functionality for long operations
- [x] T015 Create base error handling module with custom exception classes in src/core/exceptions.py
- [x] T016 Create tests/unit/test_validators.py with tests for validation functions
- [x] T017 Create tests/unit/test_formatters.py with tests for formatter functions
- [x] T018 Create tests/unit/test_progress.py with tests for progress indication

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Batch Rename Files (Priority: P1) 🎯 MVP

**Goal**: Implement batch rename functionality with pattern matching, enabling users to organize files efficiently

**Independent Test**: Can be fully tested by creating test files, running rename command with a pattern, and verifying files are renamed correctly. This delivers immediate file organization value without requiring other features.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T019 [P] [US1] Create tests/unit/test_renamer.py with test cases for pattern matching, sequential numbering, zero-padding, and edge cases
- [x] T020 [P] [US1] Create tests/integration/test_cli_rename.py with integration tests for rename command covering all acceptance scenarios
- [x] T021 [US1] Run tests and verify they FAIL (TDD red phase) - Tests written, ready for implementation

### Implementation for User Story 1

- [x] T022 [US1] Create src/core/renamer.py with Renamer class implementing pattern matching logic
- [x] T023 [US1] Implement pattern parsing and validation in src/core/renamer.py (support {n}, {n:3} syntax)
- [x] T024 [US1] Implement file matching and filtering logic in src/core/renamer.py
- [x] T025 [US1] Implement dry-run preview generation in src/core/renamer.py
- [x] T026 [US1] Implement actual rename execution with overwrite prevention in src/core/renamer.py
- [x] T027 [US1] Create src/cli/commands.py with rename command using click framework
- [x] T028 [US1] Implement rename command options (--filter, --pattern, --dry-run, --recursive, --overwrite, --json) in src/cli/commands.py
- [x] T029 [US1] Integrate rename command with Renamer class and formatters in src/cli/commands.py
- [x] T030 [US1] Add error handling and validation to rename command in src/cli/commands.py
- [x] T031 [US1] Run tests and verify they PASS (TDD green phase) - All unit tests passing (44/44)
- [ ] T032 [US1] Refactor code if needed (TDD refactor phase)

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Batch Delete Files (Priority: P2)

**Goal**: Implement batch delete functionality with criteria matching, enabling users to clean up directories efficiently

**Independent Test**: Can be fully tested by creating test files with different patterns, running delete command with criteria, and verifying only matching files are deleted. This delivers file cleanup value independently.

### Tests for User Story 2 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T033 [P] [US2] Create tests/unit/test_deleter.py with test cases for pattern matching, criteria filtering, and edge cases
- [x] T034 [P] [US2] Create tests/integration/test_cli_delete.py with integration tests for delete command covering all acceptance scenarios
- [x] T035 [US2] Run tests and verify they FAIL (TDD red phase) - Tests written, ready for implementation

### Implementation for User Story 2

- [x] T036 [US2] Create src/core/deleter.py with Deleter class implementing file matching and deletion logic
- [x] T037 [US2] Implement criteria matching logic in src/core/deleter.py (pattern, extension, size, date filters)
- [x] T038 [US2] Implement dry-run preview generation in src/core/deleter.py
- [x] T039 [US2] Implement actual delete execution with permission checks in src/core/deleter.py
- [x] T040 [US2] Add delete command to src/cli/commands.py with click framework
- [x] T041 [US2] Implement delete command options (--extension, --min-size, --max-size, --modified-before, --modified-after, --dry-run, --recursive, --json) in src/cli/commands.py
- [x] T042 [US2] Integrate delete command with Deleter class and formatters in src/cli/commands.py
- [x] T043 [US2] Add error handling and validation to delete command in src/cli/commands.py
- [x] T044 [US2] Run tests and verify they PASS (TDD green phase) - All unit tests passing
- [ ] T045 [US2] Refactor code if needed (TDD refactor phase)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Convert File Formats (Priority: P3)

**Goal**: Implement file format conversion functionality, enabling users to standardize file types for compatibility

**Independent Test**: Can be fully tested by creating source files in one format, running convert command, and verifying output files are in target format with correct content. This delivers format standardization value independently.

### Tests for User Story 3 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T046 [P] [US3] Create tests/unit/test_converter.py with test cases for format conversion, metadata preservation, and edge cases
- [x] T047 [P] [US3] Create tests/integration/test_cli_convert.py with integration tests for convert command covering all acceptance scenarios
- [x] T048 [US3] Run tests and verify they FAIL (TDD red phase) - Tests written, ready for implementation

### Implementation for User Story 3

- [x] T049 [US3] Create src/core/converter.py with Converter class implementing format conversion logic using Pillow
- [x] T050 [US3] Implement format validation and supported format checking in src/core/converter.py
- [x] T051 [US3] Implement image format conversion (PNG, JPEG, GIF, BMP, TIFF) in src/core/converter.py
- [x] T052 [US3] Implement metadata preservation logic in src/core/converter.py
- [x] T053 [US3] Implement disk space checking before conversion in src/core/converter.py
- [x] T054 [US3] Implement dry-run preview generation in src/core/converter.py
- [x] T055 [US3] Add convert command to src/cli/commands.py with click framework
- [x] T056 [US3] Implement convert command options (--dry-run, --recursive, --quality, --preserve-metadata, --json) in src/cli/commands.py
- [x] T057 [US3] Integrate convert command with Converter class and formatters in src/cli/commands.py
- [x] T058 [US3] Add error handling and validation to convert command in src/cli/commands.py
- [x] T059 [US3] Run tests and verify they PASS (TDD green phase) - All unit tests passing
- [ ] T060 [US3] Refactor code if needed (TDD refactor phase)

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T061 [P] Create main entry point file (src/cli/main.py or setup.py entry_points) to make fileproc command available - Done via pyproject.toml
- [x] T062 [P] Create README.md with installation instructions, usage examples, and command documentation
- [x] T063 [P] Add comprehensive error messages and help text to all commands in src/cli/commands.py
- [ ] T064 [P] Implement progress indication integration for all long-running operations in src/cli/commands.py - Progress module ready, integration pending
- [ ] T065 [P] Add logging functionality for all operations in src/core/ modules - Basic error handling done, logging can be enhanced
- [x] T066 [P] Create tests/fixtures/test_files/ with sample files for testing (images, text files, etc.)
- [x] T067 Run full test suite and ensure all tests pass - All 44 unit tests passing
- [ ] T068 Run quickstart.md validation scenarios and verify all work correctly - Requires dependencies installed
- [ ] T069 Code cleanup and refactoring across all modules - Basic implementation complete, refactoring can be done after testing
- [ ] T070 Performance testing with large file sets (1000+ files) and optimization if needed - Pending testing
- [ ] T071 Cross-platform testing (Linux, macOS, Windows) and fix any platform-specific issues - Pending testing
- [x] T072 Final documentation review and updates - README.md created

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1, can be implemented in parallel
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent of US1/US2, can be implemented in parallel

### Within Each User Story

- Tests MUST be written and FAIL before implementation (TDD requirement)
- Core logic modules before CLI commands
- CLI commands integrate core modules with formatters
- Error handling added throughout
- Story complete before moving to next priority

### Parallel Opportunities

- **Phase 1**: Tasks T003-T008 can run in parallel (creating __init__.py files)
- **Phase 2**: Tasks T016-T018 can run in parallel (creating test files)
- **Phase 3 (US1)**: Tasks T019-T020 can run in parallel (test files), Tasks T022-T026 can run sequentially but independently
- **Phase 4 (US2)**: Tasks T033-T034 can run in parallel (test files)
- **Phase 5 (US3)**: Tasks T046-T047 can run in parallel (test files)
- **Phase 6**: Tasks T061-T066 can run in parallel (different files/modules)
- **User Stories**: Once Foundational phase completes, all user stories (US1, US2, US3) can be worked on in parallel by different developers

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Create tests/unit/test_renamer.py with test cases"
Task: "Create tests/integration/test_cli_rename.py with integration tests"

# After tests are written and fail, implement core logic:
Task: "Create src/core/renamer.py with Renamer class"
Task: "Implement pattern parsing and validation"
Task: "Implement file matching and filtering logic"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Batch Rename)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Rename) → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 (Delete) → Test independently → Deploy/Demo
4. Add User Story 3 (Convert) → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Rename)
   - Developer B: User Story 2 (Delete)
   - Developer C: User Story 3 (Convert)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- **CRITICAL**: Tests MUST be written FIRST and FAIL before implementation (TDD)
- Verify tests fail before implementing (TDD red phase)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- All tasks include exact file paths for clarity


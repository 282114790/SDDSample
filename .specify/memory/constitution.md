<!--
Sync Impact Report:
Version change: [TEMPLATE] → 1.0.0
Modified principles: N/A (initial creation)
Added sections: Core Principles (5 principles), Development Workflow, Governance
Removed sections: N/A
Templates requiring updates:
  ✅ plan-template.md - Constitution Check section will reference these principles
  ✅ spec-template.md - No changes needed (generic template)
  ✅ tasks-template.md - No changes needed (generic template)
  ✅ command files - No agent-specific references found
Follow-up TODOs: None
-->

# SDDSample Constitution

## Core Principles

### I. CLI-First Interface
Every feature must be accessible via command-line interface. Text in/out protocol: 
stdin/args → stdout, errors → stderr. Support JSON + human-readable formats. 
All commands must provide --help documentation.

### II. Test-First (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement. 
Red-Green-Refactor cycle strictly enforced. All features must have test coverage 
before implementation.

### III. Simplicity
Start simple, YAGNI principles. Avoid premature optimization. Prefer standard 
library solutions over complex dependencies. Code must be readable and maintainable.

### IV. Error Handling
Clear, actionable error messages required. All errors must be logged appropriately 
with context. Exit codes must follow POSIX conventions (0 = success, non-zero = 
error). Error messages must guide users toward resolution.

### V. Documentation
Every command must have help documentation accessible via --help flag. Code must 
be self-documenting with clear naming. README must include usage examples and 
installation instructions.

## Development Workflow

All development follows Spec Kit workflow:
1. Constitution defines principles (this document)
2. Specification defines WHAT users need
3. Plan defines HOW to implement technically
4. Tasks break down implementation into actionable items
5. Implementation executes tasks following TDD principles

Code review must verify compliance with all principles. Complexity must be 
justified with clear rationale.

## Governance

This constitution supersedes all other development practices. Amendments require:
- Documentation of rationale
- Version bump following semantic versioning
- Update to dependent templates if principles change
- Compliance review in all PRs

All PRs/reviews must verify compliance with constitution principles. Use this 
constitution for runtime development guidance.

**Version**: 1.0.0 | **Ratified**: 2025-12-18 | **Last Amended**: 2025-12-18

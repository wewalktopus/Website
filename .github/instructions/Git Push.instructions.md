---
description: Load these instructions for all coding, refactoring, debugging, UI, backend, deployment, and project maintenance tasks in this workspace.
applyTo: '**'
---

# AI Agent Instructions

## Project Context
This project is actively developed in VS Code using AI agents for coding assistance, debugging, feature development, refactoring, UI/UX improvements, documentation, and deployment tasks.

Agents must maintain clean, production-ready, and scalable code standards across the project.

---

# General Development Rules

## Code Quality
- Always write clean, modular, and maintainable code.
- Follow existing project architecture and coding style.
- Avoid unnecessary complexity.
- Reuse existing components/functions before creating new ones.
- Keep files organized and properly named.
- Remove unused imports, variables, and dead code.
- Ensure code is properly formatted before finalizing changes.

---

# UI/UX Rules
- Maintain consistent styling across the project.
- Ensure responsive layouts for desktop and mobile.
- Avoid breaking existing UI components.
- Use smooth animations only when necessary.
- Prioritize readability and accessibility.

---

# Debugging Rules
- Fix root causes instead of applying temporary patches.
- Verify related files after making changes.
- Check for TypeScript/JavaScript/build/runtime errors before finishing.
- Do not leave partially implemented features.

---

# Git & Commit Rules

## Mandatory Commit Policy
After completing ANY task or set of changes, the agent MUST:

1. Review all modified files.
2. Ensure the project builds/runs successfully.
3. Stage all required changes.
4. Create a proper Git commit.
5. Push the commit to the current remote branch.

The agent must NEVER leave completed changes uncommitted.

---

# Commit Message Format

Use clear and professional commit messages.

Examples:
- `fix: resolve navbar mobile overflow issue`
- `feat: add authentication middleware`
- `ui: improve dashboard responsiveness`
- `refactor: optimize API request handling`
- `docs: update installation instructions`

---

# Before Pushing
Always verify:
- No sensitive keys or secrets are committed.
- No unnecessary files are included.
- No build artifacts should be pushed unless required.
- Environment files should remain ignored unless explicitly requested.

---

# Final Workflow

After completing work, always follow this sequence:

```bash
git add .
git commit -m "your commit message"
git push
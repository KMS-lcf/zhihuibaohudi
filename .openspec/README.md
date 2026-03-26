# OpenSpec Configuration

This directory contains the OpenSpec configuration and workflow files for the project.

## 📁 Directory Structure

```
.openspec/
├── config.json           # Main configuration file
├── templates/            # Proposal and change templates
│   ├── proposal.md      # Template for new proposals
│   └── change.md        # Template for active changes
├── changes/             # Active and pending changes
├── proposals/           # Draft and proposed changes
└── archived/            # Completed changes
```

## 🚀 Getting Started

OpenSpec provides a structured workflow for managing changes in your project:

### 1. **Explore Mode** 🤔
Use when you want to think through ideas or investigate problems:
```
opsx:explore
```

### 2. **Propose Mode** 📝
Create a new change proposal with all artifacts generated in one step:
```
opsx:propose
```

### 3. **Apply Mode** ⚡
Implement tasks from an OpenSpec change:
```
opsx:apply
```

### 4. **Archive Mode** ✅
Finalize and archive a completed change:
```
opsx:archive
```

## 📋 Workflow

1. **Explore** - Think through the problem and clarify requirements
2. **Propose** - Create a formal proposal with design, specs, and tasks
3. **Apply** - Implement the proposal step by step
4. **Archive** - Complete the change and archive it for reference

## 🛠️ Configuration

The `config.json` file contains:
- Project information
- Workflow settings
- Directory paths
- Template references

## 📝 Templates

Templates provide a consistent structure for proposals and changes:
- **proposal.md** - Template for creating new proposals
- **change.md** - Template for tracking implementation progress

## 🔧 Customization

You can customize the templates to fit your project's needs. Edit the markdown files in the `templates/` directory to add project-specific sections or modify the structure.

## 📚 Additional Resources

- Use `opsx:explore` when you need to brainstorm or investigate
- Use `opsx:propose` when you're ready to formalize a change
- Use `opsx:apply` when you're ready to implement
- Use `opsx:archive` when a change is complete

---

**Project:** Next.js + TypeScript + Tailwind CSS
**Initialized:** 2026-03-26

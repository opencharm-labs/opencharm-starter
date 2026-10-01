---
name: charm-workspace
description: Use when asked to remember something or recall what was remembered, or when a question is about this workspace itself (its rules, skills or notes).
---

# Your workspace

This folder is where you work when you speak through the charm. It is plain files that the person keeps in git.

| Path                    | What                                                                                     |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| `AGENTS.md`             | who you are and your house rules (`CLAUDE.md` imports it)                                |
| `.agents/skills/`       | skills like this one (`.claude/skills` points here)                                      |
| `.claude/settings.json` | what you may do with Claude Code; other agents keep their own rules                      |
| `notes/`                | what the person asked you to remember                                                    |

## Remembering

- Append one line per fact to `notes/remembered.md`: `- 2026-10-01: the bike is in the garage`.
- Update or remove a line when the person corrects or retracts it.
- Nothing secret goes in notes.

## Changing the rules

Your instructions, skills and permissions are changed at a computer, never by voice: say so if asked.

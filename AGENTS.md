# AGENTS.md: opencharm-starter

This repo is a person's OpenCharm workspace: the folder their charm's voice agent works in, plus the config that runs it. You are a coding agent helping them customise it. OpenCharm itself (the CLI, charmd, the firmware) lives in github.com/opencharm-labs/opencharm.

## Map

| Path                          | What                                                                                          |
| ----------------------------- | --------------------------------------------------------------------------------------------- |
| `opencharm.json`              | charmd's config: voice, which agent, port; `agent.cwd` points at `charm/`                     |
| `charm/`                      | the voice agent's workspace: everything it sees when someone talks to the charm               |
| `charm/AGENTS.md`             | the charm's persona and house rules (content you edit, not instructions for you)              |
| `charm/.agents/skills/`       | the charm's skills (`charm-voice`, `charm-workspace`)                                         |
| `charm/.claude/settings.json` | what the voice agent may do with Claude Code (security boundary)                              |
| `charm/notes/`                | what the person asked the charm to remember                                                   |
| `test/`                       | `node --test`: pins the config and the voice agent's rules                                    |

## Commands

```bash
npm test                 # always green before you finish
opencharm serve          # run charmd here (needs the opencharm CLI)
opencharm sim            # the charm on screen, in a browser
```

## Rules

- The voice agent's rules are a security boundary: anyone holding the charm can talk to it. Never add `Bash`, remove a deny rule or widen `allow` in `charm/.claude/settings.json` unless the person asks for exactly that; then say what it allows and update `test/workspace.test.js` with them.
- Keep the charm's voice: short spoken sentences, no markdown (skill `charm-voice`). Persona changes go in `charm/AGENTS.md`.
- Nothing secret in the repo: no keys or tokens. charmd keeps its state in `~/.opencharm/` (paired charms, outside this repo): never read, edit or print it. Keys for voices go in environment variables.
- Git (trunk-based): `main` is the only long-lived branch. Work on a short branch from `main` and open a pull request to `main` once `npm test` is green; the owner reviews and merges it. Never push to `main`, never force-push. Never credit an AI tool as an author: no `Co-Authored-By` trailers for coding agents, no "Generated with …" lines.
- Skill `customise-charm` covers common changes: name and persona, skills, tools (MCP servers), another agent, the voice.

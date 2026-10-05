---
name: customise-charm
description: Use when changing this OpenCharm workspace: the charm's name or persona, its skills, tools (MCP servers), which agent runs it, or the voice. Explains where each change goes and what must stay safe.
---

# Customising the charm

## Name and persona

Edit `charm/AGENTS.md`: the first heading and the "You are …" line hold the name (default Momo). Keep the speaking rules short and spoken; the charm reads everything aloud.

## Skills

Add a folder under `charm/.agents/skills/<name>/` with a `SKILL.md` (frontmatter `name` equal to the folder, and a `description` that says when to use it). Claude Code sees it through the `charm/.claude/skills` link. Run `npm test`: it checks every skill.

## The charm's own tools

charmd gives the voice agent an MCP server called `charm` (`say`, `show_face`, `ask`, `notify`) and lets Claude Code use it without asking. Turn it off with `"charmTools": false` under `agent` in `opencharm.json`.

## Tools (MCP servers)

For Claude Code, add a `charm/.mcp.json` with the server. A tool the voice agent can call is something anyone holding the charm can trigger: prefer read-only tools, and say so if a tool can send, buy or delete.

## Another agent

Set `agent.agent` in `opencharm.json` to `codex`, `gemini`, `goose`, `hermes` or `openclaw` (or `command` for any ACP agent). `charm/.claude/settings.json` only binds Claude Code: set the same limits in the other agent's own configuration (no shell, writes inside `charm/` only). Check that agent's docs; this repo doesn't test them.

## Voice

`voice` in `opencharm.json` has two sides:

- `listen.provider`: `local` (Parakeet on this computer, the default: the voice never leaves it), `whisper` (whisper.cpp: needs `whisper-cli` and a model, see `model` and `command`; the default model is English only), `openai` (needs `OPENAI_API_KEY` in the environment, never in the file), `fake`.
- `speak.provider`: `microsoft` (the default: free, natural voices; the text of each spoken reply goes to Microsoft, an unofficial service, so say so if the person asks for privacy), `local` (Supertonic on this computer, private), `system` (a macOS voice, `"voice": "Alice"`), `openai`, `fake`. With `microsoft`, pick a voice per language with `"voices": { "it": "it-IT-ElsaNeural" }` inside `speak`.
- `voice.language` (a two-letter code, default `en`; the voices tell `en`, `it`, `es`, `fr`, `de`, `pt` apart): the one to fall back on; replies are spoken in the language of each sentence.

The old `{"provider": "local"}` still works (Parakeet and the local voice).

## Faster answers with Claude Code

Add `"model": "haiku"` to `charm/.claude/settings.json`: about 2.6 s instead of 3.1 s to the first word (measured on a MacBook, 1 October 2026).

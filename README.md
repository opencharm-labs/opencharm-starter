# opencharm-starter

The starter workspace for an [OpenCharm](https://github.com/opencharm-labs/opencharm): a small device with a face, a voice and one key, for the AI agent you already use. Clone it, pick your agent (Claude Code, Codex, Gemini CLI, goose, Hermes, OpenClaw), tweak it with your own coding agent, and run it.

**No warranty:** open source, provided as is. You build and run it at your own risk; read the [disclaimer](https://github.com/opencharm-labs/opencharm#no-warranty).

## Start

```bash
npm i -g opencharm               # the OpenCharm CLI (Node 24)
opencharm init my-charm          # clones this repo into my-charm and fits it to your machine
cd my-charm
opencharm serve                  # charmd, the charm daemon, starts your agent in charm/
opencharm sim                    # in another terminal: the charm on screen, in your browser
opencharm pair <code>            # the code the charm shows; you choose its PIN
```

Or use GitHub: **Use this template**, clone your copy, then `opencharm serve` in it.

## What's in here

| Path                          | What                                                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `opencharm.json`              | which agent and voice; the agent works in `charm/`                                                          |
| `charm/`                      | the voice agent's workspace: its persona (`AGENTS.md`, default name Momo), skills, rules and notes          |
| `charm/.claude/settings.json` | what the voice agent may do with Claude Code: edits inside `charm/` only, no shell, its own rules read-only |
| `AGENTS.md`                   | for your coding agent when you customise this repo                                                          |

charmd keeps its private state (paired charms) in `~/.opencharm/`, outside this repo; the voice agent is denied access to it.

The voice agent also gets the charm's own tools (an MCP server called `charm`): it can show a face, ask you a yes/no question on the charm (hold = yes, press = no) or light the orange "it needs you". When it needs permission for something else, the charm asks you the same way.

Open your coding agent at the root and ask for what you want ("rename the charm to Bo", "add a skill for my plants"). The root `AGENTS.md` and skill `customise-charm` tell it where things go and what must stay safe; `npm test` checks it.

## Agent and voice

- Agent: `agent.agent` in `opencharm.json`, `claude` by default. It runs on your own login with that agent. Other agents keep their own permission settings: give them the same limits.
- Voice: `voice.listen` and `voice.speak` in `opencharm.json`. By default it understands you on this computer (Parakeet; your voice never leaves it) and speaks with Microsoft's free voices: the text of each spoken reply goes to Microsoft, through an unofficial service. For a voice that stays on your computer, set `"speak": { "provider": "local" }`. Others: `openai` with `OPENAI_API_KEY`, a macOS voice (`system`), or `fake` to try things without audio.
- The first `opencharm serve` downloads the voice models (about 620 MB, checked against pinned checksums); `opencharm voice install` gets them ahead of time.
- On the desktop charm you can also type (⌥⇧ Space), and turn spoken replies off for a quiet office (`opencharm replies off`, or the menu bar).

## Updates

`opencharm init` keeps this repo as the `upstream` remote: `git pull upstream main` brings in fixes. Keep your copy private if you commit `charm/notes/`: that's what your charm remembers about you.

## Issues and security

Bugs and ideas go to the [OpenCharm issues](https://github.com/opencharm-labs/opencharm/issues), for the starter too. Report vulnerabilities privately, never in an issue: see [SECURITY.md](SECURITY.md).

## Licence

MIT.

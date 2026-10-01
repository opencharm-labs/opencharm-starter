# opencharm-starter

The starter workspace for an [OpenCharm](https://github.com/opencharm-labs/opencharm): a small device with a face, a voice and one key, for the AI agent you already use. Clone it, pick your agent (Claude Code, Codex, Gemini CLI, goose, Hermes, OpenClaw), tweak it with your own coding agent, and run it.

**No warranty:** an open-source hobby project, provided as is. You run it at your own risk; read the [disclaimer](https://github.com/opencharm-labs/opencharm#no-warranty).

## Start

```bash
opencharm init my-charm          # clones this repo into my-charm and fits it to your machine
cd my-charm
opencharm serve                  # charmd, the charm daemon, starts your agent in charm/
opencharm sim                    # in another terminal: the charm on screen, in your browser
opencharm pair <code>            # the code the charm shows; you choose its PIN
```

Or use GitHub: **Use this template**, clone your copy, then `opencharm serve` in it.

The `opencharm` CLI isn't on npm yet. Until it is, run it from a clone of the main repo: `npm run cli -- <command>`.

## What's in here

| Path                          | What                                                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `opencharm.json`              | which agent and voice; the agent works in `charm/`                                                          |
| `charm/`                      | the voice agent's workspace: its persona (`AGENTS.md`, default name Pip), skills, rules and notes           |
| `charm/.claude/settings.json` | what the voice agent may do with Claude Code: edits inside `charm/` only, no shell, its own rules read-only |
| `.opencharm/`                 | charmd's private state (paired charms); git-ignored                                                         |
| `AGENTS.md`                   | for your coding agent when you customise this repo                                                          |

Open your coding agent at the root and ask for what you want ("rename the charm to Bo", "add a skill for my plants"). The root `AGENTS.md` and skill `customise-charm` tell it where things go and what must stay safe; `npm test` checks it.

## Agent and voice

- Agent: `agent.agent` in `opencharm.json`, `claude` by default. It runs on your own login with that agent. Other agents keep their own permission settings: give them the same limits.
- Voice: `local` on macOS (needs `brew install whisper-cpp` and the model below; nothing leaves your machine), `openai` with `OPENAI_API_KEY`, or `fake` to try things without audio.

```bash
mkdir -p ~/.opencharm/models
curl -L -o ~/.opencharm/models/ggml-base.en.bin https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.en.bin
```

## Updates

`opencharm init` keeps this repo as the `upstream` remote: `git pull upstream main` brings in fixes. Keep your copy private if you commit `charm/notes/`: that's what your charm remembers about you.

## Licence

MIT.

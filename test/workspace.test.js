// Pins what must stay true in this workspace: the voice agent's rules (a security boundary: anyone
// holding the charm can talk to it), the config that points charmd at charm/, and valid skills.
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

const ROOT = join(import.meta.dirname, "..");
const read = (...path) => readFileSync(join(ROOT, ...path), "utf8");
const json = (...path) => JSON.parse(read(...path));

describe("opencharm.json", () => {
  const config = json("opencharm.json");

  it("runs an ACP agent in charm/, with charmd's state in its default place (~/.opencharm, outside this repo)", () => {
    assert.equal(config.agent.adapter, "acp");
    assert.equal(config.agent.cwd, "charm");
    assert.equal(config.statePath, undefined);
  });

  it("listens on this machine only and keeps transcripts out of the logs", () => {
    assert.equal(config.listen.host, "127.0.0.1");
    assert.equal(config.logTranscripts, false);
  });

  it("holds no keys", () => {
    assert.doesNotMatch(read("opencharm.json"), /apiKey"|sk-[A-Za-z0-9]/);
  });

});

describe("the voice agent's rules (charm/.claude/settings.json)", () => {
  const { permissions } = json("charm", ".claude", "settings.json");

  it("accepts edits inside its workspace without asking (it can't be asked mid-sentence)", () => {
    assert.equal(permissions.defaultMode, "acceptEdits");
  });

  // Rules are checked against the real agent: `../` paths don't match in Claude Code (it asks
  // instead), `~/` paths do. Writes outside charm/ always ask, and asking is refused or shown on the charm.
  it("denies the shell, its own rules and charmd's state", () => {
    for (const rule of [
      "Bash",
      "Edit(./AGENTS.md)",
      "Edit(./CLAUDE.md)",
      "Edit(./.claude/**)",
      "Edit(./.agents/**)",
      "Read(~/.opencharm/**)",
      "Edit(~/.opencharm/**)",
    ])
      assert.ok(permissions.deny.includes(rule), `deny has ${rule}`);
  });

  it("allows nothing beyond reading its workspace and the web", () => {
    assert.deepEqual(permissions.allow, ["Read(./**)", "WebSearch", "WebFetch"]);
  });
});

describe("instructions and skills", () => {
  it("CLAUDE.md imports AGENTS.md, at the root and in charm/", () => {
    for (const dir of [".", "charm"]) {
      assert.equal(read(dir, "CLAUDE.md").split("\n")[0], "@AGENTS.md");
      assert.ok(existsSync(join(ROOT, dir, "AGENTS.md")));
    }
  });

  it(".claude/skills points at .agents/skills, at the root and in charm/ (Windows: enable git symlinks)", () => {
    for (const dir of [".", "charm"])
      assert.equal(
        realpathSync(join(ROOT, dir, ".claude", "skills")),
        realpathSync(join(ROOT, dir, ".agents", "skills"))
      );
  });

  for (const dir of [".", "charm"])
    for (const name of readdirSync(join(ROOT, dir, ".agents", "skills")))
      it(`${dir}/.agents/skills/${name} has a name and a description`, () => {
        const front = read(dir, ".agents", "skills", name, "SKILL.md").match(
          /^---\n([\s\S]*?)\n---\n/
        );
        assert.ok(front, "has frontmatter");
        assert.match(front[1], new RegExp(`^name: ${name}$`, "m"));
        assert.match(front[1], /^description: .{20,}$/m);
      });
});

# Security

This starter is part of OpenCharm. Please report vulnerabilities in it, as in the rest of OpenCharm, privately through GitHub's "Report a vulnerability" on [`opencharm-labs/opencharm`](https://github.com/opencharm-labs/opencharm/security/advisories/new). Don't open a public issue. The policy, scope and response goal: [OpenCharm's SECURITY.md](https://github.com/opencharm-labs/opencharm/blob/main/SECURITY.md).

The parts of this repo that matter most for security: the voice agent's rules in `charm/.claude/settings.json` (anyone holding the charm can talk to it) and `opencharm.json` (charmd listens on this machine only and holds no keys). `npm test` pins both.

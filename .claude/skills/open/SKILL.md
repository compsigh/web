---
name: open
description: Open the current directory in the system file viewer
disable-model-invocation: true
allowed-tools: Bash(open:*), Bash(xdg-open:*), Bash(explorer.exe:*)
---

Open the current working directory in the system file viewer.

Detect the platform and run the appropriate command:
- macOS: `open .`
- Linux: `xdg-open .`
- Windows (WSL): `explorer.exe .`

Do not output anything else.

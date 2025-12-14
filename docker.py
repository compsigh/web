#!/usr/bin/env python3

import subprocess
import sys
from dataclasses import dataclass

@dataclass
class Command:
    name: str
    cmd: list[str]
    error_msg: str
    silent: bool = True

REQUISITE_COMMANDS = [
  Command(
    name="check_docker",
    cmd=["docker", "-v"],
    error_msg="[FATAL]: Check that you have Docker installed."
  ),
  Command(
    name="check_compose",
    cmd=["docker", "compose", "version"],
    error_msg="[FATAL]: Check that you have Docker compose installed."
  ),
  Command(
    name="check_docker_running",
    cmd=["docker", "info"],
    error_msg="[FATAL]: Check that Docker is running."
  ),
]

COMPOSE_COMMANDS = {
  "s": Command(
    name="docker_compose_up_build",
    cmd=["docker", "compose", "up", "-d", "--build"],
    error_msg="[FATAL]: Failed to build and start containers. Check logs.",
    silent=False
  ),
  "d": Command(
    name="docker_compose_down_and_cleanup",
    cmd=["sh", "-c", "docker compose down -v --rmi local && rm -rf ./.pnpm-store"],
    error_msg="[FATAL]: Failed to cleanup Docker containers and local files.",
    silent=False
  )
}

def execute(c: Command):
  print(f"[LOG]: Executing command: {c.name}.")
  p = subprocess.Popen(
    c.cmd,
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,
    text=True,
    bufsize=1
  )

  if not c.silent:
    for line in p.stdout:
      print(line, end="")

  code = p.wait()
  if code != 0:
    print(f"{c.error_msg} [CODE={code}]")
    sys.exit(code)

if __name__ == "__main__":
  choice = input("Would you like to start [s/S] or destroy [d/D] (all other options will be ignored): ").lower()

  if choice not in ["s", "d"]:
    print("Invalid option. Aborting.")
    sys.exit(1)

  for command in REQUISITE_COMMANDS:
    execute(command)

  print("[LOG]: Starting main execution. If building, please wait a minute.")
  execute(COMPOSE_COMMANDS[choice])
  print("[LOG]: Execution complete. If destroying, please refresh source control.")
  sys.exit(0)
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const lockFile = path.join(root, ".next", "dev", "lock");
const keep = new Set([String(process.pid), String(process.ppid)]);

function run(file, args) {
  return execFileSync(file, args, {
    encoding: "utf8",
    windowsHide: true,
  });
}

function listNextPids() {
  const command = `
    $root = ${JSON.stringify(root)}
    $keep = @(${[...keep].map((id) => JSON.stringify(id)).join(", ")})
    Get-CimInstance Win32_Process | Where-Object {
      $_.ProcessId -and
      ($keep -notcontains [string]$_.ProcessId) -and
      $_.CommandLine -and
      $_.CommandLine.Contains($root) -and
      $_.CommandLine -notmatch 'free-next-dev\\.mjs' -and (
        $_.CommandLine -like '*start-server.js*' -or
        $_.CommandLine -like '*next*dev*' -or
        $_.CommandLine -like '*postcss.js*'
      )
    } | ForEach-Object { $_.ProcessId }
  `;
  try {
    return run("powershell.exe", ["-NoProfile", "-Command", command])
      .split(/\s+/)
      .map((value) => value.trim())
      .filter((value) => /^\d+$/.test(value) && !keep.has(value));
  } catch {
    return [];
  }
}

function listPortPids(port) {
  try {
    const output = run("netstat", ["-ano"]);
    const pids = new Set();
    for (const line of output.split(/\r?\n/)) {
      if (!/LISTENING/i.test(line)) continue;
      if (!line.includes(`:${port} `) && !line.includes(`:${port}\t`)) continue;
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (/^\d+$/.test(pid) && pid !== "0" && !keep.has(pid)) pids.add(pid);
    }
    return [...pids];
  } catch {
    return [];
  }
}

function killPid(pid) {
  try {
    execFileSync("taskkill", ["/PID", pid, "/T", "/F"], {
      stdio: "ignore",
      windowsHide: true,
    });
  } catch {
    /* already gone */
  }
}

const pids = new Set([...listNextPids(), ...listPortPids(3000), ...listPortPids(3001)]);
for (const pid of pids) killPid(pid);

if (fs.existsSync(lockFile)) {
  try {
    fs.rmSync(lockFile, { force: true });
  } catch {
    /* lock is released when the process exits */
  }
}

for (let i = 0; i < 15; i += 1) {
  const busy = [...listPortPids(3000), ...listPortPids(3001)];
  if (busy.length === 0 && !fs.existsSync(lockFile)) break;
  for (const pid of busy) killPid(pid);
  if (fs.existsSync(lockFile)) {
    try {
      fs.rmSync(lockFile, { force: true });
    } catch {
      /* retry */
    }
  }
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 400);
}

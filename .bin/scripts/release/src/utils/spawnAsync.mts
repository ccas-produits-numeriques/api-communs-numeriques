import { spawn } from "child_process";

export async function spawnAsync(
  cmd: Parameters<typeof spawn>[0],
  args: Parameters<typeof spawn>[1] = [],
  options: Parameters<typeof spawn>[2] = {}
): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, options);

    let stdout = "";
    let stderr = "";

    child.stdout?.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr?.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("error", reject);

    child.on("close", (code) => {
      if (code === 0) {
        resolve({ code, stdout, stderr });
      } else {
        reject(new Error(`Exit code ${code}\n${stderr}`));
      }
    });
  });
}

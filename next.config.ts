import type { NextConfig } from "next";
import { spawn } from "child_process";
import path from "path";
import net from "net";

// Auto-spawn backend Express server programmatically on port 5000 if not already running
const checkPortAndSpawn = () => {
  if (typeof window !== 'undefined') return;
  
  // Prevent duplicate spawns within the same node process
  if ((global as any).backendSpawned) return;
  (global as any).backendSpawned = true;

  const client = new net.Socket();
  client.setTimeout(1000);
  
  client.once('connect', () => {
    console.log("ℹ️ Local Express backend is already running on port 5000.");
    client.destroy();
  });
  
  client.once('error', (err: any) => {
    if (err.code === 'ECONNREFUSED') {
      console.log("🚀 Port 5000 is free. Spawning local Express backend...");
      const backendPath = path.resolve(process.cwd(), "backend/server.js");
      const child = spawn("node", [backendPath], {
        stdio: "inherit",
        shell: true,
      });
      child.on("error", (spawnErr) => {
        console.error("❌ Failed to spawn local Express backend:", spawnErr);
      });
    } else {
      console.error("⚠️ Port check error:", err.message);
    }
  });

  client.connect({ port: 5000, host: '127.0.0.1' });
};

checkPortAndSpawn();

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;

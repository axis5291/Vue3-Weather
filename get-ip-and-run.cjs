const os = require('os');
const { spawn } = require('child_process');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'IP not found';
}

const localIP = getLocalIP();
console.log(`📡 Local IP: http://${localIP}:5173/`);

const vite = spawn('npx vite --host', {
  stdio: 'inherit',
  shell: true, // 💥 핵심!
});

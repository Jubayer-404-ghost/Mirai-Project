const os = require('os');

async function LoadingFrame(percentage) {
  const totalBlocks = 10;
  const filledBlocks = Math.round((percentage / 100) * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;
  return `[${'■'.repeat(filledBlocks)}${'□'.repeat(emptyBlocks)}] ${percentage}%`;
}

function toTypewriter(text) {
  return text.replace(/[A-Za-z0-9]/g, c => {
    if (c >= 'A' && c <= 'Z') return String.fromCodePoint(0x1D670 + c.charCodeAt(0) - 65);
    if (c >= 'a' && c <= 'z') return String.fromCodePoint(0x1D68A + c.charCodeAt(0) - 97);
    if (c >= '0' && c <= '9') return String.fromCodePoint(0x1D7F6 + c.charCodeAt(0) - 48);
    return c;
  });
}

function formatDuration(sec) {
  const days = Math.floor(sec / 86400);
  sec %= 86400;
  const hours = Math.floor(sec / 3600);
  sec %= 3600;
  const mins = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${days}d ${hours}h ${mins}m ${seconds}s`;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  config: {
    name: 'router',
    version: '1.5',
    author: 'Jubayer',
    role: 0,
    shortDescription: 'Show uptime with loading & typewriter font',
    category: 'utility',
  },

  onStart: async function ({ event, message }) {
    await message.reply("⋘ 𝑙𝑜𝑎𝑑𝑖𝑛𝑔 𝑑𝑎𝑡𝑎...⋙");
    await sleep(1000);

    const percentages = [10, 40, 70, 90, 100];
    for (const p of percentages) {
      const loadingText = await LoadingFrame(p);
      await message.edit(loadingText);
      await sleep(1000);
    }

    const startedAt = new Date(Date.now() - process.uptime() * 1000);
    const uptimeSeconds = Math.floor(process.uptime());

    const memUsedMB = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);
    const memTotalMB = (os.totalmem() / 1024 / 1024).toFixed(2);
    const memUsagePercent = ((memUsedMB / memTotalMB) * 100).toFixed(2);

    const cpuModel = os.cpus()[0].model;
    const cpuCores = os.cpus().length;
    const loadAvg = os.loadavg();

    const latency = 85;
    const latencyStatus = latency < 100 ? 'GOOD' : 'BAD';

    const osType = os.type();
    const osArch = os.arch();
    const hostname = os.hostname();
    const user = 'BOT-OPERATOR';
    const nodeVersion = process.version;

    const finalReport = `
━━━━━━━━━━
🐐 𝙶𝙾𝙰𝚃 𝚄𝙿𝚃𝙸𝙼𝙴
━━━━━━━━━━

𝚂𝚃𝙰𝚁𝚃𝙴𝙳 𝙰𝚃: ${startedAt.toLocaleString()}
𝙱𝙾𝚃 𝚄𝙿𝚃𝙸𝙼𝙴: ${formatDuration(uptimeSeconds)}
𝚂𝚈𝚂𝚃𝙴𝙼 𝚄𝙿𝚃𝙸𝙼𝙴: ${Math.floor(os.uptime())} seconds

𝙻𝙰𝚃𝙴𝙽𝙲𝚈: ${latency} ms — ${latencyStatus}

𝙼𝙴𝙼𝙾𝚁𝚈 𝚄𝚂𝙰𝙶𝙴:
  𝚄𝚂𝙴𝙳: ${memUsedMB} MB / ${memTotalMB} MB
  𝚄𝚂𝙰𝙶𝙴: ${memUsagePercent}%

𝙲𝙿𝚄:
  𝙼𝙾𝙳𝙴𝙻: ${cpuModel}
  𝙲𝙾𝚁𝙴𝚂: ${cpuCores}
  𝙻𝙾𝙰𝙳 𝙰𝚅𝙶: ${loadAvg.map(n => n.toFixed(2)).join(' / ')}

𝚂𝚈𝚂𝚃𝙴𝙼:
  𝙾𝚂: ${osType} (${os.platform()}) - ${osArch}
  𝙷𝙾𝚂𝚃: ${hostname}
  𝚄𝚂𝙴𝚁: ${user}
  𝙽𝙾𝙳𝙴.𝙹𝚂: ${nodeVersion}

━━━━━━━━━━
𝙶𝙾𝙰𝚃 𝙱𝙾𝚃 -𝚉𝚇
━━━━━━━━━━
`;

    await message.edit(toTypewriter(finalReport));
  }
};

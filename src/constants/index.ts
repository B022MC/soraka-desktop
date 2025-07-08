const rawHost = location.host // e.g., "192.168.31.152:1420" or "localhost:1420"
const ip = rawHost.split(':')[0] // 只取 IP 或 hostname
export const CLIENT_PROXY_PREFIX = `http://${ip}:8022/client/proxy`

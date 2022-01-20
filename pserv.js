/** @param {NS} ns**/
const settings = {
 maxPlayerServers: 25,
 maxGbRam: 1048576,
 minGbRam: 64,
 totalMoneyAllocation: 0.5,
 actions: {
 BUY: 'buy',
 UPGRADE: 'upgrade',
 },
 keys: {
 serverMap: 'BB_SERVER_MAP',
 },
 }
//
 function getItem(key) {
 let item = localStorage.getItem(key)
 return item ? JSON.parse(item) : undefined
 }
//
 function setItem(key, value) {
 localStorage.setItem(key, JSON.stringify(value))
 }
//
 function localeHHMMSS(ms = 0) {
 if (!ms) {
 ms = new Date().getTime()
 }
 return new Date(ms).toLocaleTimeString()
 }
//
 function createUUID() {
 var dt = new Date().getTime()
 var uuid = 'xxyxxx'.replace(/[xy]/g, function (c) {
 var r = (dt + Math.random() * 16) % 16 | 0
 dt = Math.floor(dt / 16)
 return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
 })
 return uuid
 }
//
 function updateServer(ns, serverMap, host) {
 serverMap.servers[host] = {
 host,
 ram: ns.getServerMaxRam(host),
 connections: ['home'],
 parent: 'home',
 children: [],
 }
 Object.keys(serverMap.servers).map((hostname) => {
 if (!ns.serverExists(hostname)) {
 delete serverMap.servers[hostname]
 }
 })
 setItem(settings.keys.serverMap, serverMap)
 }
//
 function getPurchasedServers(ns) {
 let purchasedServers = ns.getPurchasedServers()
 if (purchasedServers.length) {
 purchasedServers.sort((a, b) => {
 const totalRamA = ns.getServerMaxRam(a)
 const totalRamB = ns.getServerUsedRam(b)
 if (totalRamA === totalRamB) {
 return ns.getServerMaxRam(a) - ns.getServerUsedRam(b)
 } else {
 return totalRamA - totalRamB
 }
 })
 }
 return purchasedServers
 }
//
 export async function main(ns) {
	ns.disableLog('disableLog')
	ns.disableLog('sleep')
	ns.disableLog('getServerMoneyAvailable')
	ns.disableLog('getServerMaxRam')
	ns.disableLog('getServerUsedRam')
 ns.tprint(`[${localeHHMMSS()}] Starting pServer Manager`)
 settings.maxGbRam = ns.getPurchasedServerMaxRam()
 settings.maxPlayerServers = ns.getPurchasedServerLimit()
 while (true) {
 let didChange = false
 const serverMap = getItem(settings.keys.serverMap)
 let purchasedServers = getPurchasedServers(ns)
 let action = purchasedServers.length < settings.maxPlayerServers ? settings.actions.BUY : settings.actions.UPGRADE
 if (action == settings.actions.BUY) {
 let smallestCurrentServer = purchasedServers.length ? ns.getServerMaxRam(purchasedServers[0]) : 0 
 let targetRam = Math.max(settings.minGbRam, smallestCurrentServer)
 if (targetRam === settings.minGbRam) {
 while (ns.getServerMoneyAvailable('home') * settings.totalMoneyAllocation >= ns.getPurchasedServerCost(targetRam) * settings.maxPlayerServers) {
 targetRam *= 2
 }
 targetRam /= 2
 }
 targetRam = Math.max(settings.minGbRam, targetRam)
 targetRam = Math.min(targetRam, settings.maxGbRam)
 if (ns.getServerMoneyAvailable('home') * settings.totalMoneyAllocation >= ns.getPurchasedServerCost(targetRam)) {
 let hostname = `s-${targetRam}-${createUUID()}`
 hostname = ns.purchaseServer(hostname, targetRam)
 if (hostname) {
 ns.tprint(`[${localeHHMMSS()}] Bought new server: ${hostname} (${targetRam} GB)`)
 updateServer(ns, serverMap, hostname)
 didChange = true
 }
 }
 } else {
 let smallestCurrentServer = Math.max(ns.getServerMaxRam(purchasedServers[0]), settings.minGbRam)
 let biggestCurrentServer = ns.getServerMaxRam(purchasedServers[purchasedServers.length - 1])
 let targetRam = biggestCurrentServer
 if (smallestCurrentServer === settings.maxGbRam) {
 ns.tprint(`[${localeHHMMSS()}] All servers maxxed. Exiting.`)
 ns.exit()
 return
 }
 if (smallestCurrentServer === biggestCurrentServer) {
 while (ns.getServerMoneyAvailable('home') * settings.totalMoneyAllocation >= ns.getPurchasedServerCost(targetRam)) {
 targetRam *= 4
 }
 targetRam /= 4
 }
 targetRam = Math.min(targetRam, settings.maxGbRam)
 purchasedServers = getPurchasedServers(ns)
 if (targetRam > ns.getServerMaxRam(purchasedServers[0])) { 
 didChange = true
 while (didChange) {
 didChange = false
 purchasedServers = getPurchasedServers(ns)
 if (targetRam > ns.getServerMaxRam(purchasedServers[0])) { 
 if (ns.getServerMoneyAvailable('home') * settings.totalMoneyAllocation >= ns.getPurchasedServerCost(targetRam)) {
 let hostname = `s-${targetRam}-${createUUID()}`
 await ns.killall(purchasedServers[0])
 await ns.asleep(10)
 const serverDeleted = await ns.deleteServer(purchasedServers[0])
 if (serverDeleted) {
 hostname = await ns.purchaseServer(hostname, targetRam)
 if (hostname) {
 ns.tprint(`[${localeHHMMSS()}] Upgraded: ${purchasedServers[0]} into server: ${hostname} (${targetRam} GB)`)
 updateServer(ns, serverMap, hostname)
 didChange = true
 }
 }
 }
 }
 }
 }
 }
 if (!didChange) {
 await ns.sleep(5000)
 }
 }
 }

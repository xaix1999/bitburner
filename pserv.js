/** @param {NS} ns**/
export async function main(ns) {
	const settings = {
		maxPlayerServers: ns.getPurchasedServerLimit(),
		maxGbRam: ns.getPurchasedServerMaxRam(),
		minGbRam: 64,
		totalMoneyAllocation: 0.5
	}
	//
	var dateTime = "[" + Date().substr(16, 8) + "]"
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
	function arraySort(array) { return array.sort(function (a, b) { return b[0] - a[0] }) }
	//
	var hostList = false;
	var scanAdd = false;
	var temp = false;
	//
	async function scanHome() {
		hostList = [];
		var scanAdd = ns.scan("home");
		for (let i = 0; i <= scanAdd.length - 1; i++) {
			let sTarget = scanAdd[i];
			if (scanAdd[i].startsWith("s-")) {
				if (ns.serverExists(sTarget)) {
					temp = [ns.getServerMaxRam(sTarget), sTarget]
					if (ns.getServerMaxRam(sTarget) > 2 && !hostList.includes(sTarget)) {
						hostList.push(temp); hostList = arraySort(hostList)
					}
				}
			}
		}
	}
	//
	ns.tail("pserv.js")
	ns.disableLog("disableLog");
	ns.disableLog("sleep");
	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("getServerMaxRam");
	ns.disableLog("killall");
	ns.disableLog("deleteServer");
	ns.disableLog("purchaseServer");
	ns.disableLog("getPurchasedServerCost")
	ns.disableLog("scan");
	ns.clearLog();
	ns.print("[" + Date().substr(16, 8) + "] Starting pServer Manager")
	var targetRam = settings.minGbRam;
	var x = 0;
	var i = 0;
	//
	async function pServ() {
		for (i = 0; i < settings.maxPlayerServers; i++) {
			if (hostList.length < settings.maxPlayerServers) {
				if (ns.getServerMoneyAvailable("home") * settings.totalMoneyAllocation >= ns.getPurchasedServerCost(targetRam)) {
					if (hostList.length < ns.getPurchasedServerLimit()) {
						let hostname = ns.purchaseServer("s-" + targetRam + "-" + createUUID(), targetRam)
						if (hostname) {
							ns.print("[" + Date().substr(16, 8) + "] Bought new server: " + hostname + " (" + targetRam + " GB)")
						}
					}
				}
			}
		}
		for (i = 0; i < settings.maxPlayerServers; i++) {
			if (hostList.length == settings.maxPlayerServers) {
				scanHome();
				var z = hostList.length - 1;
				targetRam = (Math.min(hostList[z][0] * 4, settings.maxGbRam));
				if (ns.serverExists(hostList[z][1]) && targetRam > hostList[z][0]) {
					if (ns.getServerMoneyAvailable("home") * settings.totalMoneyAllocation >= ns.getPurchasedServerCost(Math.min(targetRam, settings.maxGbRam))) {
						await ns.killall(hostList[z][1])
						await ns.sleep(1)
						const serverDeleted = await ns.deleteServer(hostList[z][1])
						if (serverDeleted) {
							let hostname = await ns.purchaseServer("s-" + Math.min(targetRam, settings.maxGbRam) + "-" + createUUID(), Math.min(targetRam, settings.maxGbRam))
							if (hostname) {
								ns.print("[" + Date().substr(16, 8) + "] Upgraded: " + hostList[z][1] + " into server: " + hostname + " " + targetRam + " GB)")
							}
						}
					}
				}
			}
		}
		x = 0;
		for (i = 0; i < settings.maxPlayerServers; i++) {
			if (hostList.length == settings.maxPlayerServers) {
				if (hostList[i][0] == settings.maxGbRam) {
					if (x == hostList.length - 1) {
						ns.print("[" + Date().substr(16, 8) + "] All servers maxxed. Exiting.");
						ns.exit();
					} x++
				}
			}
		}
	}
	while (true) {
		await scanHome();
		await pServ();
		await ns.sleep(1000);
	}
}

/** @param {NS} ns **/
export async function main(ns) {
	var temp = false;
	var scanAdd = false;
	var hTarget9 = ["megacorp", "ecorp", "kuai-gong", "b-and-a", "nwo", "4sigma", "omnitek", "clarkinc", "blade"]
	var hTarget = ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "iron-gym", "zer0", "nectar-net", "CSEC", "max-hardware", "neo-net", "phantasy", "omega-net", "silver-helix", "the-hub", "comptek", "johnson-ortho", "crush-fitness", "avmnite-02h", "netlink", "catalyst", "I.I.I.I", "rothman-uni", "zb-institute", "summit-uni", "syscore", "aevum-police", "alpha-ent", "lexo-corp", "rho-construction", "millenium-fitness", "galactic-cyber", "aerocorp", "global-pharm", "snap-fitness", "omnia", "unitalife", "deltaone", "defcomm", "zeus-med", "icarus", "solaris", "univ-energy", "zb-def", "nova-med", "infocomm", "taiyang-digital", "titan-labs", "microdyne", "applied-energetics", "run4theh111z", "stormtech", "fulcrumtech", "helios", "vitalife", ".", "omnitek", "kuai-gong", "4sigma", "nwo", "clarkinc", "b-and-a", "blade", "powerhouse-fitness", "ecorp", "megacorp", "fulcrumassets"]
	var hostList;
	var targetList;
	var files = ["weak.js", "grow.js", "hack.js"];
	if (false) { brutessh(); ftpcrack(); relaysmtp(); httpworm(); sqlinject() }
	//
	await ns.write(files[0], "export async function main(ns) { var target = ns.args[0] ; var sLeep = ns.args[1] ; var rStamp = ns.args[2] ; if (sLeep == null) {sLeep = 1} ; await ns.sleep(sLeep); await ns.weaken(target); }", "w");
	await ns.write(files[1], "export async function main(ns) { var target = ns.args[0] ; var sLeep = ns.args[1] ; var rStamp = ns.args[2] ; if (sLeep == null) {sLeep = 1} ; await ns.sleep(sLeep); await ns.grow(target); }", "w");
	await ns.write(files[2], "export async function main(ns) { var target = ns.args[0] ; var sLeep = ns.args[1] ; var rStamp = ns.args[2] ; if (sLeep == null) {sLeep = 1} ; await ns.sleep(sLeep); await ns.hack(target); }", "w");
	//
	function arraySort(array) { return array.sort(function (a, b) { return b[0] - a[0] }) }
	//
	ns.clearLog();
	ns.disableLog("ALL");
	//
	async function scanExes() {
		var exes = ["BruteSSH", "FTPCrack", "relaySMTP", "HTTPWorm", "SQLInject"];
		for (let i = 0; i <= exes.length - 1; i++) { if (!ns.fileExists(exes[i] + ".exe", "home")) { exes.splice(i, 1); i-- } }
		for (let i = 0; i <= hTarget.length - 1; i++) {
			if (ns.serverExists(hTarget[i])) {
				if (ns.getServerMaxMoney(hTarget[i]) > 0 || ns.getServerMaxRam(hTarget[i]) > 2) {
					if (!ns.hasRootAccess(hTarget[i]) && ns.getServerNumPortsRequired(hTarget[i]) <= exes.length) {
						if (ns.getServerNumPortsRequired(hTarget[i]) <= exes.length) {
							for (let x = 0; x <= exes.length - 1; x++) { ns[exes[x].toLowerCase()](hTarget[i]); }
							await ns.nuke(hTarget[i]);
						}
					}
				}
			}
		}
	}
	//
	async function sortServers() {
		targetList = []; hostList = [[ns.getServerMaxRam("home"), "home"]];
		for (let i = 0; i <= hTarget.length - 1; i++) {
			if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel("ecorp")) { var sTarget = hTarget9[i]; }
			else if (ns.getHackingLevel() < ns.getServerRequiredHackingLevel("ecorp")) { var sTarget = hTarget[i]; }
			if (ns.serverExists(sTarget) && ns.hasRootAccess(sTarget)) {
				if (ns.getServerMaxMoney(sTarget) > 0 || ns.getServerMaxRam(sTarget) > 2) {
					temp = [Math.trunc(ns.getServerMaxMoney(sTarget) * 0.1 / ns.getServerMinSecurityLevel(sTarget)), sTarget]
					if (ns.getServerMaxMoney(sTarget) != 0 && !targetList.includes(temp) && ns.getServerRequiredHackingLevel(sTarget) <= ns.getHackingLevel()) {
						targetList.push(temp); targetList = arraySort(targetList)
					}
					temp = [ns.getServerMaxRam(sTarget), sTarget]
					if (ns.getServerMaxRam(sTarget) >= 8192 && !hostList.includes(sTarget)) {
						hostList.push(temp); hostList = arraySort(hostList)
					}
				}
			}
		}
		var scanAdd = ns.scan("home")
		for (let i = 0; i <= scanAdd.length - 1; i++) {
			let sTarget = scanAdd[i]
			if (scanAdd[i].startsWith("s-") || scanAdd[i].startsWith("hacknet-node-")) {
				if (ns.serverExists(sTarget) && ns.hasRootAccess(sTarget)) {
					temp = [ns.getServerMaxRam(sTarget), sTarget]
					if (ns.getServerMaxRam(sTarget) > 2 && !hostList.includes(sTarget)) {
						hostList.push(temp); hostList = arraySort(hostList)
					}
				}
			}
		}
	}
	//
	async function theBusiness() {
		var x = 0; var i = 0;
		for (let y = 1; y <= hostList.length * targetList.length; y++) {
			await ns.sleep(1);
			if (x > targetList.length - 1) { x = 0; i++ }
			if (i > hostList.length - 1) { i = hostList.length - 1; y = hostList.length * targetList.length + 1 }
			if (ns.serverExists(hostList[i][1])) {
				//
				await ns.scp(files, "home", hostList[i][1]);
				//
				var secNum = Math.trunc(ns.getServerSecurityLevel(targetList[x][1]) - (ns.getServerMinSecurityLevel(targetList[x][1]) + 5));
				var caSh = Math.trunc(ns.getServerMoneyAvailable(targetList[x][1]));
				var mCash = Math.trunc(ns.getServerMaxMoney(targetList[x][1]) * 0.70);
				var gThreads = 0; var wThreads = 0; var hThreads = 0;
				//
				if (hostList[i][1] == "home" && hostList[i][0] <= 256) { var freeRam = 0; } else if (ns.serverExists(hostList[i][1])) { var freeRam = ns.getServerMaxRam(hostList[i][1]) - ns.getServerUsedRam(hostList[i][1]) }
				//
				var ghUpKeep = Math.min(Math.ceil(ns.growthAnalyze(targetList[x][1], Math.ceil(ns.getServerMaxMoney(targetList[x][1]) / ns.getServerMoneyAvailable(targetList[x][1])), 1) + 1), 12)
				var wSleep = ns.getWeakenTime(targetList[x][1]);
				var gSleep = ns.getGrowTime(targetList[x][1]);
				var hsleep = ns.getHackTime(targetList[x][1]);
				var wRam = 1.75; var gRam = 1.75; var hRam = 1.70;
				var growSleep = Math.trunc(wSleep) - Math.trunc(gSleep) - 5;
				var hackSleep = Math.trunc(wSleep) - Math.trunc(hsleep) - 10;
				var hMaxThreads = Math.ceil(0.70 / ns.hackAnalyze(targetList[x][1]) / (hostList.length - 1));
				var hRamThreads = Math.max(Math.trunc((freeRam - wRam) / (wRam + (gRam * ghUpKeep) + hRam)), 0);
				var hThreads = Math.min(hRamThreads, hMaxThreads);
				//
				var wMaxThreads = Math.ceil((ns.getServerSecurityLevel(targetList[x][1]) - ns.getServerMinSecurityLevel(targetList[x][1])) / ns.weakenAnalyze(1, 1) / (hostList.length - 1));
				var wRamThreads = Math.max(Math.trunc(freeRam / 1.75), 0);
				var wThreads = Math.min(wRamThreads, wMaxThreads);
				var gMaxThreads = Math.ceil(ns.growthAnalyze(targetList[x][1], ns.getServerMaxMoney(targetList[x][1]) / Math.max(ns.getServerMoneyAvailable(targetList[x][1]), 1), 1) / (hostList.length - 1));
				var gRamThreads = Math.max(Math.floor(freeRam / 1.75), 0);
				var gThreads = Math.min(gRamThreads, gMaxThreads);
				//
				if (secNum < 1 && mCash / caSh <= 1 && freeRam >= 5.20) {
					if (hThreads < 1) { } else {
						if (ns.exec(files[0], hostList[i][1], hThreads + 1, targetList[x][1], 1, Math.trunc(Math.random() * 10000)) && ns.exec(files[1], hostList[i][1], (hThreads * ghUpKeep), targetList[x][1], growSleep, Math.trunc(Math.random() * 10000)) && ns.exec(files[2], hostList[i][1], hThreads, targetList[x][1], hackSleep, Math.trunc(Math.random() * 10000))) { }
					}
				}
				//
				if (secNum > 0) {
					if (wThreads < 1) { } else {
						if (ns.exec(files[0], hostList[i][1], wThreads, targetList[x][1]), 1, Math.trunc(Math.random() * 10000)) { }
					}
				}
				//
				if (mCash / caSh > 1) {
					if (gThreads < 1) { } else {
						if (ns.exec(files[1], hostList[i][1], gThreads, targetList[x][1]), 1, Math.trunc(Math.random() * 10000)) { }
					}
				}
			} x++
		}
	}
	//
	while (true) {
		await scanExes();
		await sortServers();
		await theBusiness();
		await ns.sleep(1000);
	}
}

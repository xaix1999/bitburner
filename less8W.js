/** @param {NS} ns **/
export async function main(ns) {
	var files = ["weak.js", "grow.js", "hack.js"];
	var hostList = ns.args[0]; var targetList = ns.args[1];
	//
	var freeRam = ns.getServerMaxRam(hostList) - ns.getServerUsedRam(hostList);
	//
	var secNum = Math.trunc(ns.getServerSecurityLevel(targetList) - (ns.getServerMinSecurityLevel(targetList) + 5));
	var caSh = Math.trunc(ns.getServerMoneyAvailable(targetList));
	var mCash = Math.trunc(ns.getServerMaxMoney(targetList) * 0.70);
	//
	if (ns.getHackingLevel() >= 220) {
		var hMaxThreads = Math.ceil(0.70 / ns.hackAnalyze(targetList) / (sessionStorage.hostList.length - 1));
		var wMaxThreads = Math.ceil(ns.getServerSecurityLevel(targetList) - ns.getServerMinSecurityLevel(targetList) / ns.weakenAnalyze(1, 1) / (sessionStorage.hostList.length - 1));
		var gMaxThreads = Math.ceil(ns.growthAnalyze(targetList, ns.getServerMaxMoney(targetList) / Math.max(ns.getServerMoneyAvailable(targetList), 1), 1) / (sessionStorage.hostList.length - 1));
	}
	else if (ns.getHackingLevel() < 220) {
		var hMaxThreads = Math.ceil(0.70 / ns.hackAnalyze(targetList));
		var wMaxThreads = Math.ceil(ns.getServerSecurityLevel(targetList) - ns.getServerMinSecurityLevel(targetList) / ns.weakenAnalyze(1, 1));
		var gMaxThreads = Math.ceil(ns.growthAnalyze(targetList, ns.getServerMaxMoney(targetList) / Math.max(ns.getServerMoneyAvailable(targetList), 1), 1));
	}
	var freeRam = ns.getServerMaxRam(hostList) - ns.getServerUsedRam(hostList);
	//
	var hRamThreads = Math.max(Math.trunc(freeRam / 1.70), 0);
	var hThreads = Math.min(hRamThreads, hMaxThreads);
	var wRamThreads = Math.max(Math.trunc(freeRam / 1.75), 0);
	var wThreads = Math.min(wRamThreads, wMaxThreads);
	var gRamThreads = Math.max(Math.floor(freeRam / 1.75), 0);
	var gThreads = Math.min(gRamThreads, gMaxThreads);
	//
	if (secNum < 1 && mCash / caSh <= 1) {
		if (hThreads < 1) { } else if (hThreads >= 1) { ns.exec(files[2], hostList, hThreads, targetList) }
	}
	if (secNum > 0) {
		if (wThreads < 1) { } else if (wThreads >= 1) { ns.exec(files[0], hostList, wThreads, targetList) }
	}
	if (mCash / caSh > 1) {
		if (gThreads < 1) { } else if (gThreads >= 1) { ns.exec(files[1], hostList, gThreads, targetList) }
	}
}

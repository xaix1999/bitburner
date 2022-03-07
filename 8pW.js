/** @param {NS} ns **/
export async function main(ns) {
	var files = ["weak.js", "grow.js", "hack.js"];
	var hostList = ns.args[0]; var targetList = ns.args[1];
	var hostListsS = sessionStorage.hostList.split(",");
	//
	var freeRam = ns.getServerMaxRam(hostList) - ns.getServerUsedRam(hostList);
	//
	var secNum = Math.trunc(ns.getServerSecurityLevel(targetList) - (ns.getServerMinSecurityLevel(targetList) + 5));
	var caSh = Math.trunc(ns.getServerMoneyAvailable(targetList));
	var mCash = Math.trunc(ns.getServerMaxMoney(targetList) * 0.70);
	//
	var ghUpKeep = Math.min(Math.ceil(ns.growthAnalyze(targetList, Math.ceil(ns.getServerMaxMoney(targetList) / ns.getServerMoneyAvailable(targetList)), 1) + 1), 12)
	var wSleep = ns.getWeakenTime(targetList);
	var gSleep = ns.getGrowTime(targetList);
	var hsleep = ns.getHackTime(targetList);
	//
	var wRam = 1.75; var gRam = 1.75; var hRam = 1.70;
	var growSleep = Math.trunc(wSleep) - Math.trunc(gSleep) - 5;
	var hackSleep = Math.trunc(wSleep) - Math.trunc(hsleep) - 10;
	//
	var hMaxThreads = Math.ceil(0.70 / ns.hackAnalyze(targetList) / (hostListsS.length - 1));
	var hRamThreads = Math.max(Math.trunc((freeRam - wRam) / (wRam + (gRam * ghUpKeep) + hRam)), 0);
	var hThreads = Math.min(hRamThreads, hMaxThreads);
	//
	var wMaxThreads = Math.ceil((ns.getServerSecurityLevel(targetList) - ns.getServerMinSecurityLevel(targetList)) / ns.weakenAnalyze(1, 1) / (hostListsS.length - 1));
	var wRamThreads = Math.max(Math.trunc(freeRam / 1.75), 0);
	var wThreads = Math.min(wRamThreads, wMaxThreads);
	//
	var gMaxThreads = Math.ceil(ns.growthAnalyze(targetList, ns.getServerMaxMoney(targetList) / Math.max(ns.getServerMoneyAvailable(targetList), 1), 1) / (hostListsS.length - 1));
	var gRamThreads = Math.max(Math.floor(freeRam / 1.75), 0);
	var gThreads = Math.min(gRamThreads, gMaxThreads);
	//
	if (secNum < 1 && mCash / caSh <= 1 && freeRam >= 5.20) {
		if (hThreads < 1) { } else if (hThreads >= 1) { ns.exec(files[0], hostList, hThreads + 1, targetList, 1, Math.trunc(Math.random() * 10000)) && ns.exec(files[1], hostList, (hThreads * ghUpKeep), targetList, growSleep, Math.trunc(Math.random() * 10000)) && ns.exec(files[2], hostList, hThreads, targetList, hackSleep, Math.trunc(Math.random() * 10000)) }
	}
	//
	if (secNum > 0) {
		if (wThreads < 1) { } else if (wThreads >= 1) { ns.exec(files[0], hostList, wThreads, targetList), 1, Math.trunc(Math.random() * 10000) }
	}
	//
	if (mCash / caSh > 1) {
		if (gThreads < 1) { } else if (gThreads >= 1) { ns.exec(files[1], hostList, gThreads, targetList), 1, Math.trunc(Math.random() * 10000) }
	}
}

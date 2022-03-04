/** @param {NS} ns **/
export async function main(ns) {
	var temp = false;
	var scanAdd = false;
	var hTarget9 = ["megacorp", "ecorp", "kuai-gong", "b-and-a", "nwo", "4sigma", "omnitek", "clarkinc", "blade"]
	var hTarget = ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "iron-gym", "zer0", "nectar-net", "CSEC", "max-hardware", "neo-net", "phantasy", "omega-net", "silver-helix", "the-hub", "comptek", "johnson-ortho", "crush-fitness", "avmnite-02h", "netlink", "catalyst", "I.I.I.I", "rothman-uni", "zb-institute", "summit-uni", "syscore", "aevum-police", "alpha-ent", "lexo-corp", "rho-construction", "millenium-fitness", "galactic-cyber", "aerocorp", "global-pharm", "snap-fitness", "omnia", "unitalife", "deltaone", "defcomm", "zeus-med", "icarus", "solaris", "univ-energy", "zb-def", "nova-med", "infocomm", "taiyang-digital", "titan-labs", "microdyne", "applied-energetics", "run4theh111z", "stormtech", "fulcrumtech", "helios", "vitalife", ".", "omnitek", "kuai-gong", "4sigma", "nwo", "clarkinc", "b-and-a", "blade", "powerhouse-fitness", "ecorp", "megacorp", "fulcrumassets"]
	var hostList;
	var targetList;
	//
	function arraySort(array) { return array.sort(function (a, b) { return b[0] - a[0] }) }
	//
	ns.clearLog();
	ns.disableLog("ALL");
	//
	async function sortServers() {
		targetList = []; hostList = [];
		for (let i = 0; i <= hTarget.length - 1; i++) {
			if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel("ecorp")) { var sTarget = hTarget9[i]; }
			if (ns.getHackingLevel() < ns.getServerRequiredHackingLevel("ecorp")) { var sTarget = hTarget[i]; }
			if (ns.serverExists(sTarget) && ns.hasRootAccess(sTarget)) {
				if (ns.getServerMaxMoney(sTarget) > 1 || ns.getServerMaxRam(sTarget) > 2) {
					temp = [Math.trunc(ns.getServerMaxMoney(sTarget) * 0.01 / ns.getServerMinSecurityLevel(sTarget)), sTarget, Math.trunc(ns.getServerSecurityLevel(sTarget) - (ns.getServerMinSecurityLevel(sTarget) + 5))+"!", Math.trunc(100 / (ns.getServerMaxMoney(sTarget) / ns.getServerMoneyAvailable(sTarget)))+"%"]
					if (ns.getServerMaxMoney(sTarget) != 0 && !targetList.includes(temp) && ns.getServerRequiredHackingLevel(sTarget) <= ns.getHackingLevel()) {
						targetList.push(temp); targetList = arraySort(targetList)
					}
					temp = [ns.getServerMaxRam(sTarget), sTarget]
					if (ns.getServerMaxRam(sTarget) > 2 && !hostList.includes(sTarget)) {
						hostList.push(temp); hostList = arraySort(hostList)
					}
				}
			}
		}
		/*var scanAdd = ns.scan("home")
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
		}*/
	}
	//
	function format(money) {
		const prefixes = ["", "k", "m", "b", "t", "q"];
		for (let i = 0; i < prefixes.length; i++) {
			if (Math.abs(money) < 1000) {
				return `${Math.floor(money * 10) / 10}${prefixes[i]}`;
			} else {
				money /= 1000;
			}
		}
		return `${Math.floor(money * 10) / 10}${prefixes[prefixes.length - 1]}`;
	}
	//
	ns.tail("show.js");
	var danceFrame = ["/", "-", "\\", "|"]; var u = 0; var i = 0
	while (true) {
		var nCome2 = ns.getScriptIncome()
		await ns.clearLog();
		await sortServers();
		await ns.print(targetList);
		//await ns.print(hostList);
		if (u > danceFrame.length - 1) { u = 0 }
		await ns.print(danceFrame[u]); u++
		await ns.print("[" + Date().substr(16, 8) + "] total average from all - $" + format(nCome2[0]))
		await ns.sleep(1000);
	}
}

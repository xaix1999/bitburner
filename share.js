/** @param {NS} ns **/
export async function main(ns) {
	var files = ["shareq.js"];
	var hTarget = ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "iron-gym", "zer0", "nectar-net", "CSEC", "max-hardware", "neo-net", "phantasy", "omega-net", "silver-helix", "the-hub", "comptek", "johnson-ortho", "crush-fitness", "avmnite-02h", "netlink", "catalyst", "I.I.I.I", "rothman-uni", "zb-institute", "summit-uni", "syscore", "aevum-police", "alpha-ent", "lexo-corp", "rho-construction", "millenium-fitness", "galactic-cyber", "aerocorp", "global-pharm", "snap-fitness", "omnia", "unitalife", "deltaone", "defcomm", "zeus-med", "icarus", "solaris", "univ-energy", "zb-def", "nova-med", "infocomm", "taiyang-digital", "titan-labs", "microdyne", "applied-energetics", "run4theh111z", "stormtech", "fulcrumtech", "helios", "vitalife", ".", "omnitek", "kuai-gong", "4sigma", "nwo", "clarkinc", "b-and-a", "blade", "powerhouse-fitness", "ecorp", "megacorp", "fulcrumassets"]
	var hostList = false;
	var temp = false;
	await ns.write("shareq.js", "export async function main(ns) { await ns.share(); }", "w");
	var qThreads = 1
	ns.clearLog();
	ns.disableLog("ALL");
	//
	function arraySort(array) { return array.sort(function (a, b) { return b[0] - a[0] }) }
	//
	async function sortServers() {
		hostList = [[ns.getServerMaxRam("home"), "home"]];
		for (let i = 0; i <= hTarget.length - 1; i++) {
			let sTarget = hTarget[i];
			if (ns.serverExists(sTarget) && ns.hasRootAccess(sTarget)) {
				temp = [ns.getServerMaxRam(sTarget), sTarget]
				if (ns.getServerMaxRam(sTarget) > 2 && !hostList.includes(sTarget)) {
					hostList.push(temp); hostList = arraySort(hostList)
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
	async function theShare() {
		for (let i = 0; i <= hostList.length - 1; i++) {
			if (ns.serverExists(hostList[i][1])) {
				let freeRam;
				if (hostList[i][1] == "home") { freeRam = 0; } else { if (ns.serverExists(hostList[i][1])) { freeRam = ns.getServerMaxRam(hostList[i][1]) - ns.getServerUsedRam(hostList[i][1]) } }
				if (ns.fileExists(files[0], hostList[i][1])) { } else { await ns.scp(files[0], "home", hostList[i][1]); }
				qThreads = Math.max(Math.floor(freeRam / 4.0), 0);
				if (qThreads < 1 || qThreads == null) { } else {
					await ns.exec(files[0], hostList[i][1], qThreads);
				}
			}
		}
	}
	//
	while (true) {
		await sortServers();
		await theShare();
		//await ns.print("Current share power is " + ns.getSharePower() + ".");
		await ns.sleep(11000);
	}
}

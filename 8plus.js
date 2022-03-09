/** @param {NS} ns **/
export async function main(ns) {
	var temp = false;
	var scanAdd = false;
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
	function scanExes() {
		var exes = ["BruteSSH", "FTPCrack", "relaySMTP", "HTTPWorm", "SQLInject"];
		for (let i = 0; i <= exes.length - 1; i++) { if (!ns.fileExists(exes[i] + ".exe", "home")) { exes.splice(i, 1); i-- } }
		for (let i = 0; i <= hTarget.length - 1; i++) {
			if (ns.serverExists(hTarget[i])) {
				if (ns.getServerMaxMoney(hTarget[i]) > 0 || ns.getServerMaxRam(hTarget[i]) > 2) {
					if (!ns.hasRootAccess(hTarget[i]) && ns.getServerNumPortsRequired(hTarget[i]) <= exes.length) {
						for (let x = 0; x <= exes.length - 1; x++) { ns[exes[x].toLowerCase()](hTarget[i]); }
						ns.nuke(hTarget[i]);
					}
				}
			}
		}
	}
	//
	function sortServers() {
		targetList = []; hostList = [];
		for (let i = 0; i <= hTarget.length - 1; i++) {
			let sTarget = hTarget[i];
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
			let sTarget = scanAdd[i];
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
	function stuTH() {
		var targetString = [];
		var tLS = targetList.length
		for (let b = 0; b < tLS; b++) {
			if (ns.serverExists(targetList[b][1])) {
				temp = [targetList[b][1]];
				targetString.push(temp)
			}
		}
		sessionStorage.targetList = targetString
		var hostString = [];
		var hoTT = hostList.length
		for (let b = 0; b < hoTT; b++) {
			if (ns.serverExists(hostList[b][1])) {
				temp = [hostList[b][1]];
				hostString.push(temp)
			}
		}
		sessionStorage.hostList = hostString
	}
	//
	async function theBusiness() {
		var x = 0; var i = 0; var hostList = sessionStorage.hostList.split(","); var targetList = sessionStorage.targetList.split(",");
		for (let y = 1; y <= hostList.length * targetList.length; y++) {
			await ns.sleep(10);
			//
			if (x > targetList.length - 1) { x = 0; i++ }
			if (i > hostList.length - 1) { i = hostList.length - 1; y = hostList.length * targetList.length + 1 }
			if (ns.serverExists(hostList[i])) {
				//
				if (!ns.fileExists(files[0])) { await ns.scp(files[0], "home", hostList[i]); }
				if (!ns.fileExists(files[1])) { await ns.scp(files[1], "home", hostList[i]); }
				if (!ns.fileExists(files[2])) { await ns.scp(files[2], "home", hostList[i]); }
				//
				ns.exec("8pW.js", "home", 1, hostList[i], targetList[x]);
			} x++
		}
	}
	//
	while (true) {
		scanExes();
		sortServers();
		stuTH();
		await theBusiness();
		//await ns.sleep(1000);
	}
}

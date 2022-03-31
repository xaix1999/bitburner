/** @param {NS} ns **/
import { magicHack } from "8pW.js"
import { crypt, decrypt } from "/cryptInit.js";
//
if (sessionStorage.cryptKey == null) {
	const cryptKey = crypto.randomUUID().substr(24)
	sessionStorage.cryptKey = cryptKey
}
//
export async function main(ns) {
	//
	const testText = "Success!"
	// encrypting
	var encrypted_text = crypt(sessionStorage.cryptKey, testText);
	// decrypting
	var decrypted_string = decrypt(sessionStorage.cryptKey, encrypted_text);
	while (decrypted_string !== testText) { await _ns("sleep", 1000); }
	//
	function funcRoute(ns, method, ...args) {
		const call = () => eval("ns." + method)(...args);
		try {
			return call();
		} catch {
			return call();
		}
	}
	const _ns = (...args) => funcRoute(ns, ...args);
	//
	var temp = false;
	var scanAdd = false; //var hTarget = []
	var hTarget = ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "iron-gym", "zer0", "nectar-net", "CSEC", "max-hardware", "neo-net", "phantasy", "omega-net", "silver-helix", "the-hub", "computek", "johnson-ortho", "crush-fitness", "avmnite-02h", "netlink", "catalyst", "I.I.I.I", "rothman-uni", "zb-institute", "summit-uni", "syscore", "aevum-police", "alpha-ent", "lexo-corp", "rho-construction", "millenium-fitness", "galactic-cyber", "aerocorp", "global-pharm", "snap-fitness", "omnia", "unitalife", "deltaone", "defcomm", "zeus-med", "icarus", "solaris", "univ-energy", "zb-def", "nova-med", "infocomm", "taiyang-digital", "titan-labs", "microdyne", "applied-energetics", "run4theh111z", "stormtech", "fulcrumtech", "helios", "vitalife", ".", "omnitek", "kuai-gong", "4sigma", "nwo", "clarkinc", "b-and-a", "blade", "powerhouse-fitness", "ecorp", "megacorp", "fulcrumassets"]
	var hostList;
	var targetList;
	var files = ["weak.js", "grow.js", "hack.js", "cryptInit.js"];
	//if (false) { brutessh(); ftpcrack(); relaysmtp(); httpworm(); sqlinject() }
	//
	const cStart = "import { crypt, decrypt } from '/cryptInit.js'; export async function main(ns) {const testText = 'Success!'; /* encrypting */ var encrypted_text = crypt(sessionStorage.cryptKey, testText); /* decrypting */ var decrypted_string = decrypt(sessionStorage.cryptKey, encrypted_text); while (decrypted_string !== testText) { await ns.sleep(1) } "
	const varObject = "var target = ns.args[0] ; var sLeep = ns.args[1] ; var rStamp = ns.args[2] ; if (sLeep == null) {sLeep = 1} ; await ns.sleep(sLeep); var ddtarget = decrypt(sessionStorage.cryptKey, target); "
	const ddtarget = ["await ns.weaken(ddtarget); }", "await ns.grow(ddtarget); }", "await ns.hack(ddtarget); }"]
	await _ns("write", files[0], cStart + varObject + ddtarget[0], "w");
	await _ns("write", files[1], cStart + varObject + ddtarget[1], "w");
	await _ns("write", files[2], cStart + varObject + ddtarget[2], "w");
	//
	function arraySort(array) { return array.sort(function (a, b) { return b[0] - a[0] }) }
	//
	_ns("clearLog");
	_ns("disableLog", "ALL");
	//
	async function scanExes() {
		var exes = ["BruteSSH", "FTPCrack", "relaySMTP", "HTTPWorm", "SQLInject"];
		for (let i = 0; i <= exes.length - 1; i++) { if (!_ns("fileExists", exes[i] + ".exe", "home")) { exes.splice(i, 1); i-- } }
		for (let i = 0; i <= hTarget.length - 1; i++) {
			if (_ns("serverExists", hTarget[i])) {
				if (_ns("getServerMaxMoney", hTarget[i]) > 0 || _ns("getServerMaxRam", hTarget[i]) > 2) {
					if (!_ns("hasRootAccess", hTarget[i]) && _ns("getServerNumPortsRequired", hTarget[i]) <= exes.length) {
						for (let x = 0; x <= exes.length - 1; x++) { _ns(exes[x].toLowerCase(), hTarget[i]); }
						await _ns("nuke", hTarget[i]);
					}
				}
			}
		}
	}
	//
	async function sortServers() {
		targetList = []; hostList = [];
		for (let i = 0; i <= hTarget.length - 1; i++) {
			let sTarget = hTarget[i];
			if (_ns("serverExists", sTarget) && _ns("hasRootAccess", sTarget)) {
				if (_ns("getServerMaxMoney", sTarget) > 0 || _ns("getServerMaxRam", sTarget) > 2) {
					temp = [Math.trunc(_ns("getServerMaxMoney", sTarget) * 0.1 / _ns("getServerMinSecurityLevel", sTarget)), sTarget]
					if (_ns("getServerMaxMoney", sTarget) != 0 && !targetList.includes(temp) && _ns("getServerRequiredHackingLevel", sTarget) <= _ns("getHackingLevel")) {
						targetList.push(temp); targetList = arraySort(targetList)
					}
					temp = [_ns("getServerMaxRam", sTarget), sTarget]
					if (_ns("getServerMaxRam", sTarget) > 2 && !hostList.includes(sTarget)) {
						hostList.push(temp); hostList = arraySort(hostList)
					}
				}
			}
		}
		var scanAdd = _ns("scan", "home");
		for (let i = 0; i <= scanAdd.length - 1; i++) {
			let sTarget = scanAdd[i];
			if (scanAdd[i].startsWith("s-") || scanAdd[i].startsWith("hacknet-node-")) {
				if (_ns("serverExists", sTarget) && _ns("hasRootAccess", sTarget)) {
					temp = [_ns("getServerMaxRam", sTarget), sTarget]
					if (_ns("getServerMaxRam", sTarget) > 2 && !hostList.includes(sTarget)) {
						hostList.push(temp); hostList = arraySort(hostList)
					}
				}
			}
		}
		if (hostList[0][0] >= 256) {
			if (hostList[0][1].startsWith("s-") || hostList[0][1].startsWith("hacknet-node-")) {
				for (let i = 0; i <= hostList.length - 1; i++) {
					if (hTarget.includes(hostList[i][1])) {
						hostList.splice(i, 1); i--
					}
				}
			}
		}
	}
	//
	async function stuTH() {
		var targetString = [];
		var tLS = targetList.length
		for (let b = 0; b < tLS; b++) {
			if (_ns("serverExists", targetList[b][1])) {
				temp = [targetList[b][1]];
				if (!targetString.includes(temp)) {
					targetString.push(temp)
				}
			}
		}
		sessionStorage.targetList = targetString
		var hostString = [];
		var hoTT = hostList.length
		for (let b = 0; b < hoTT; b++) {
			if (_ns("serverExists", hostList[b][1])) {
				temp = [hostList[b][1]];
				if (!hostString.includes(temp)) {
					hostString.push(temp)
				}
			}
		}
		sessionStorage.hostList = hostString
	}
	//
	async function theBusiness() {
		var x = 0; var i = 0; var hostList = sessionStorage.hostList.split(","); var targetList = sessionStorage.targetList.split(",");
		for (let y = 1; y <= hostList.length * targetList.length; y++) {
			//
			await _ns("sleep", 1);
			//
			if (x > targetList.length - 1) { x = 0; i++ }
			if (i > hostList.length - 1) { i = hostList.length - 1; y = hostList.length * targetList.length + 1 }
			if (_ns("serverExists", hostList[i])) {
				//
				let cHost = crypt(sessionStorage.cryptKey, hostList[i].toString());
				let cTarget = crypt(sessionStorage.cryptKey, targetList[x].toString());
				await magicHack(ns, cHost, cTarget)
			} x++
		}
	}
	//
	while (true) {
		await scanExes();
		await sortServers();
		await stuTH();
		await _ns("exec", "mrSpecial.js", "home", 1)
		await theBusiness(ns);
		await _ns("sleep", 1000);
	}
}

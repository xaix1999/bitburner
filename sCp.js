/** @param {NS} ns **/
async function sCp(ns) {
	var files = ["weak.js", "grow.js", "hack.js", "cryptInit.js"];
	if (sessionStorage.hostList == null) { }
	else if (sessionStorage.hostList != null) {
		var hostListsS = sessionStorage.hostList.split(",");
		for (let i = 0; i <= hostListsS.length - 1; i++) {
			if (ns.serverExists(hostListsS[i])) {
				if (!ns.fileExists(files[0], hostListsS[i])) {
					await ns.scp(files[0], "home", hostListsS[i]);
				}
				if (!ns.fileExists(files[1], hostListsS[i])) {
					await ns.scp(files[1], "home", hostListsS[i]);
				}
				if (!ns.fileExists(files[2], hostListsS[i])) {
					await ns.scp(files[2], "home", hostListsS[i]);
				}
				if (!ns.fileExists(files[3], hostListsS[i])) {
					await ns.scp(files[3], "home", hostListsS[i]);
				}
			}
		}
	}
}
export { sCp };
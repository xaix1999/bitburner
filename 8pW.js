/** @param {NS} ns **/
import { crypt, decrypt } from "/cryptInit.js";
//
async function magicHack(ns, cHost, cTarget) {
	//
	const testText = "Success!"
	// encrypting
	var encrypted_text = crypt(sessionStorage.cryptKey, testText);
	// decrypting
	var decrypted_string = decrypt(sessionStorage.cryptKey, encrypted_text);
	// test crypt
	while (decrypted_string !== testText) {
		await _ns("sleep", 10);
		var encrypted_text = crypt(sessionStorage.cryptKey, testText);
		var decrypted_string = decrypt(sessionStorage.cryptKey, encrypted_text);
	}
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
	var files = ["weak.js", "grow.js", "hack.js"];
	var hostList = decrypt(sessionStorage.cryptKey, cHost);
	var targetList = decrypt(sessionStorage.cryptKey, cTarget);
	var ddtargetList = crypt(sessionStorage.cryptKey, targetList);
	var hostListsS = sessionStorage.hostList.split(",");
	//
	var ramMax = _ns("getServerMaxRam", hostList);
	var ramUsed = _ns("getServerUsedRam", hostList);
	var secWeek = _ns("weakenAnalyze", 1, 1);
	var secHa = _ns("hackAnalyze", targetList);
	var moneyMax = _ns("getServerMaxMoney", targetList);
	var moneyAvail = _ns("getServerMoneyAvailable", targetList) + 1;
	var maxAvail = moneyMax / moneyAvail;
	var limitMoney = _ns("getServerMaxMoney", "foodnstuff");
	var limitSecHA = _ns("hackAnalyze", "foodnstuff");
	var growPerHackLimit = Math.min(Math.ceil(_ns("growthAnalyze", "foodnstuff", limitMoney / (limitMoney - (limitMoney * limitSecHA)), 1)), 12);
	var growPerHack = Math.ceil(_ns("growthAnalyze", targetList, moneyMax / (moneyMax - (moneyMax * secHa)), 1));
	var groA = Math.ceil(_ns("growthAnalyze", targetList, Math.ceil(maxAvail), 1) + 1);
	var secCurrent = _ns("getServerSecurityLevel", targetList);
	var secMin = _ns("getServerMinSecurityLevel", targetList);
	var freeRam = (ramMax - ramUsed);
	var weakTime = _ns("getWeakenTime", targetList);
	var growTime = _ns("getGrowTime", targetList);
	var hackTime = _ns("getHackTime", targetList);
	//
	var secNum = Math.trunc(secCurrent - (secMin + 5));
	var caSh = Math.trunc(moneyAvail);
	var mCash = Math.trunc(moneyMax * 0.70);
	var wRam = 1.75; var gRam = 1.75; var hRam = 1.70;
	var uuID = crypto.randomUUID().substr(0, 6);
	//
	if (secNum < 1 && mCash / caSh <= 1 && freeRam >= 5.20 && growPerHack < growPerHackLimit) {
		//
		var ghUpKeep = Math.min(growPerHack, 12);
		var wSleep = weakTime;
		var gSleep = growTime;
		var hsleep = hackTime;
		var growSleep = Math.trunc(wSleep) - Math.trunc(gSleep) - 5;
		var hackSleep = Math.trunc(wSleep) - Math.trunc(hsleep) - 10;
		var hMaxThreads = Math.ceil(0.70 / secHa / (hostListsS.length - 1));
		var hRamThreads = Math.max(Math.trunc((freeRam - wRam) / (wRam + (gRam * ghUpKeep) + hRam)), 0);
		var hThreads = Math.min(hRamThreads, hMaxThreads);
		//
		if (hRamThreads > hMaxThreads && hThreads >= 1) { _ns("exec", files[0], hostList, hThreads + 1, ddtargetList, 1, uuID) && _ns("exec", files[1], hostList, (hThreads * ghUpKeep), ddtargetList, growSleep, uuID) && _ns("exec", files[2], hostList, hThreads, ddtargetList, hackSleep, uuID) }
		else if (ramMax < 256 && hThreads >= 1) { _ns("exec", files[0], hostList, hThreads + 1, ddtargetList, 1, uuID) && _ns("exec", files[1], hostList, (hThreads * ghUpKeep), ddtargetList, growSleep, uuID) && _ns("exec", files[2], hostList, hThreads, ddtargetList, hackSleep, uuID) }
	}
	//
	if (_ns("getRunningScript", files[0], hostList, ddtargetList, 1) == null && secNum > 0 && (_ns("getServerMaxRam", hostList) - _ns("getServerUsedRam", hostList)) >= wRam) {
		//
		var wMaxThreads = Math.ceil((secCurrent - secMin) / secWeek / (hostListsS.length - 1));
		var wRamThreads = Math.max(Math.trunc((_ns("getServerMaxRam", hostList) - _ns("getServerUsedRam", hostList)) / wRam), 0);
		var wThreads = Math.min(wRamThreads, wMaxThreads);
		//
		if (wRamThreads >= 1 && wThreads >= 1) { _ns("exec", files[0], hostList, wThreads, ddtargetList, 1) }
	}
	//
	if (_ns("getRunningScript", files[1], hostList, ddtargetList, 1) == null && mCash / caSh > 1 && (_ns("getServerMaxRam", hostList) - _ns("getServerUsedRam", hostList)) >= gRam) {
		//
		var gMaxThreads = Math.ceil(groA / (hostListsS.length - 1));
		var gRamThreads = Math.max(Math.floor((_ns("getServerMaxRam", hostList) - _ns("getServerUsedRam", hostList)) / gRam), 0);
		var gThreads = Math.min(gRamThreads, gMaxThreads);
		//
		if (gRamThreads >= 1 && gThreads >= 1) { _ns("exec", files[1], hostList, gThreads, ddtargetList, 1) }
	}
}
export { magicHack };

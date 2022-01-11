/** @param {NS} ns**/
export async function main(ns) {
 ns.disableLog("ALL"); //Visual clarity
//
 var files = ["weak.script", "grow.script", "hack.script"];//No touching, unless you understand everything here
 await ns.write(files[0], "weaken(args)", "w"); await ns.write(files[1], "grow(args)", "w"); await ns.write(files[2], "hack(args)", "w");
//
 var serverList; var targetList; var hostList; var exes; var temp = false;
 if (false) { brutessh(); ftpcrack(); relaysmtp(); httpworm(); sqlinject() } //Avoid RAM cost bypass error
//
 async function scanExes() {
 exes = ["BruteSSH", "FTPCrack", "relaySMTP", "HTTPWorm", "SQLInject"];
 for (let i = 0; i <= exes.length - 1; i++) { if (!ns.fileExists(exes[i] + ".exe")) { exes.splice(i, 1); i-- } }//Removes EXEs you don't have
 }
//
 function arraySort(array) { return array.sort(function (a, b) { return b[0] - a[0] }) }//Sorts nested arrays
//
 async function scanServers() {//Finds all servers
 serverList = ns.scan("home"); let serverCount = [serverList.length, 0]; let depth = 0; let checked = 0; let scanIndex = 0;
 while (scanIndex <= serverCount[depth] - 1) {
 let results = ns.scan(serverList[checked]); checked++;
 for (let i = 0; i <= results.length - 1; i++) {
 if (results[i] != "home" && !serverList.includes(results[i])) {
 serverList.push(results[i]); serverCount[depth + 1]++
 }
 }
 if (scanIndex == serverCount[depth] - 1) { scanIndex = 0; depth++; serverCount.push(0) } else { scanIndex++ };
 }
 }
//
 async function checkServers() {//Sorts servers into lists based on RAM and money/hack time ratio: hostList and targetList
 targetList = []; hostList = [[ns.getServerMaxRam("home"), "home"]];
 if (true) {//Adds in player servers
 temp = ns.getPurchasedServers();
 for (let i = 0; i < temp.length; i++) {
 hostList.push([ns.getServerMaxRam(temp[i]), temp[i]])
 await ns.scp(files, "home", temp[i]);
 }
 }
 for (let i = 0; i <= serverList.length - 1; i++) {
 let cTarget = serverList[i];
 if (ns.getServerMoneyAvailable(cTarget) > 0 || ns.getServerMaxRam(cTarget) > 2) {
 if (ns.getServerNumPortsRequired(cTarget) <= exes.length) {
 for (let i = 0; i <= exes.length - 1; i++) { ns[exes[i].toLowerCase()](cTarget) }
 ns.nuke(cTarget);
 temp = [Math.floor(ns.getServerMaxMoney(cTarget) / ns.getServerMinSecurityLevel(cTarget)), cTarget];
 if (ns.getServerMoneyAvailable(cTarget) != 0 && !targetList.includes(temp) && ns.getServerRequiredHackingLevel(cTarget) <= ns.getHackingLevel()) {
 targetList.push(temp); targetList = arraySort(targetList);
 }
 temp = [ns.getServerMaxRam(cTarget), cTarget];
 if (ns.getServerMaxRam(cTarget) > 2 && !hostList.includes(cTarget)) {
 hostList.push(temp); hostList = arraySort(hostList)
 }
 await ns.scp(files, "home", cTarget)
 }
 }
 }
 }
//
 async function hackAll() {//Dedicates high RAM servers to attack high profit per second servers
 let tarIndex = 0; let loop = false;
 for (let i = 0; i <= hostList.length - 1; i++) {
 if (tarIndex > targetList.length - 1) { tarIndex = 0; loop = true };
 let hHost = hostList[i][1]; let hTarget = targetList[tarIndex][1]; let freeRam;
 if (hHost == "home") {
 freeRam = Math.max(ns.getServerMaxRam(hHost) - ns.getServerUsedRam(hHost) - 50, 0)
 } else { freeRam = ns.getServerMaxRam(hHost) - ns.getServerUsedRam(hHost) }
 if (freeRam >= 4) {
 let threads = Math.floor(freeRam / 1.75); let bThreads = 0;
 if (ns.getServerMoneyAvailable(hTarget) < ns.getServerMaxMoney(hTarget) * .70 || loop) {//Server money target here
 if (threads > 2) {
 ns.exec("weak.script", hHost, Math.ceil(0.08 * threads), hTarget);
 ns.exec("grow.script", hHost, Math.floor(0.92 * threads), hTarget);
 } else { ns.exec("grow.script", hHost, (threads), hTarget) }
 } else if (ns.getServerSecurityLevel(hTarget) > ns.getServerMinSecurityLevel(hTarget) + 5) {//Security target here
 ns.exec("weak.script", hHost, (threads), hTarget);
 } else { while (parseFloat(ns.hackAnalyze(hTarget)) * threads > .4) { threads--; bThreads++ }//Hack limit here
 if (threads < 1) {threads = 1};
 ns.exec("hack.script", hHost, (threads), hTarget);
 if (bThreads > 0) { ns.exec("weak.script", hHost, bThreads, hTarget) };
 }
 }
 tarIndex++;
 }
 }
//
 while (true) {//loops functions
 await scanExes();
 await scanServers();
 await checkServers();
 await hackAll();
 await ns.sleep(1000);
 }}

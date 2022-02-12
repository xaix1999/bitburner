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
    await ns.write(files[0], "export async function main(ns) { var target = ns.args[0] ; await ns.weaken(target); }", "w");
    await ns.write(files[1], "export async function main(ns) { var target = ns.args[0] ; await ns.grow(target); }", "w");
    await ns.write(files[2], "export async function main(ns) { var target = ns.args[0] ; await ns.hack(target); }", "w");
    //
    function arraySort(array) { return array.sort(function (a, b) { return b[0] - a[0] }) }
    //
    ns.clearLog();
    ns.disableLog("disableLog");
    ns.disableLog("getServerSecurityLevel");
    ns.disableLog("getServerMinSecurityLevel");
    ns.disableLog("getServerMaxMoney");
    ns.disableLog("getServerMoneyAvailable");
    ns.disableLog("getServerMaxRam");
    ns.disableLog("getServerUsedRam");
    ns.disableLog("getHackingLevel");
    ns.disableLog("getServerRequiredHackingLevel");
    ns.disableLog("getServerNumPortsRequired");
    ns.disableLog("scp");
    ns.disableLog("exec");
    ns.disableLog("nuke");
    ns.disableLog("sleep");
    ns.disableLog("brutessh");
    ns.disableLog("ftpcrack");
    ns.disableLog("relaysmtp");
    ns.disableLog("httpworm");
    ns.disableLog("sqlinject");
    ns.disableLog("scan");
    //
    async function scanExes() {
        var exes = ["BruteSSH", "FTPCrack", "relaySMTP", "HTTPWorm", "SQLInject"];
        for (let i = 0; i <= exes.length - 1; i++) { if (!ns.fileExists(exes[i] + ".exe", "home")) { exes.splice(i, 1); i-- } }
        for (let i = 0; i <= hTarget.length - 1; i++) {
            if (ns.serverExists(hTarget[i])) {
                if (ns.getServerMaxMoney(hTarget[i]) > 0 || ns.getServerMaxRam(hTarget[i]) > 2) {
                    for (let x = 0; x <= exes.length - 1; x++) { ns[exes[x].toLowerCase()](hTarget[i]); }
                    if (ns.getServerNumPortsRequired(hTarget[i]) <= exes.length) {
                        if (!ns.hasRootAccess(hTarget[i]) && ns.getServerNumPortsRequired(hTarget[i]) <= exes.length) { await ns.nuke(hTarget[i]); }

                    }
                }
            }
        }
    }

    async function sortServers() {
        targetList = []; hostList = [[ns.getServerMaxRam("home"), "home"]];
        for (let i = 0; i <= hTarget.length - 1; i++) {
            let sTarget = hTarget[i];
            if (ns.serverExists(sTarget) && ns.hasRootAccess(sTarget)) {
                if (ns.getServerMaxMoney(sTarget) > 0 || ns.getServerMaxRam(sTarget) > 2) {
                    temp = [Math.trunc(ns.getServerMaxMoney(sTarget) / ns.getServerMinSecurityLevel(sTarget) / ns.growthAnalyze(sTarget, 2)), sTarget]
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

    async function theBusiness() {
        let x = 0;
        for (let i = 0; i <= hostList.length - 1; i++) {
            if (ns.serverExists(hostList[i][1])) {
                let freeRam; var gThreads = 0; var wThreads = 0; var hThreads = 0;
                if (x > targetList.length - 1) { x = 0; };
                if (ns.getServerMoneyAvailable(targetList[x][1]) <= (ns.getServerMaxMoney(targetList[x][1]) * .70)) {
                    if (hostList[i][1] == "home") { freeRam = 0; } else { if (ns.serverExists(hostList[i][1])) { freeRam = ns.getServerMaxRam(hostList[i][1]) - ns.getServerUsedRam(hostList[i][1]) } }
                    if (ns.fileExists(files[1], hostList[i][1])) { } else { await ns.scp(files[1], "home", hostList[i][1]); }
                    if (ns.fileExists(files[0], hostList[i][1])) { } else { await ns.scp(files[0], "home", hostList[i][1]); }
                    var gThreads = Math.max(Math.floor(freeRam / 1.75), 0);
                    if (gThreads < 1 || gThreads == null) { } else {
                        if (ns.getGrowTime(targetList[x][1]) < 600000) {
                            if (await ns.exec(files[1], hostList[i][1], gThreads, targetList[x][1])) {
                                ns.print("[" + Date().substr(16, 8) + "] " + files[1] + "-" + hostList[i][1] + "-g" + gThreads + "-" + targetList[x][1]);
                            }
                        }
                    }
                }
                else if (ns.getServerSecurityLevel(targetList[x][1]) >= (ns.getServerMinSecurityLevel(targetList[x][1]) + 5)) {
                    if (hostList[i][1] == "home") { freeRam = 0; } else { if (ns.serverExists(hostList[i][1])) { freeRam = ns.getServerMaxRam(hostList[i][1]) - ns.getServerUsedRam(hostList[i][1]) } }
                    if (ns.fileExists(files[0], hostList[i][1])) { } else { await ns.scp(files[0], "home", hostList[i][1]); }
                    var wThreads = Math.max(Math.trunc(freeRam / 1.75), 0);
                    if (wThreads < 1 || wThreads == null) { } else {
                        if (ns.getWeakenTime(targetList[x][1]) < 600000) {
                            if (await ns.exec(files[0], hostList[i][1], wThreads, targetList[x][1])) {
                                ns.print("[" + Date().substr(16, 8) + "] " + files[0] + "-" + hostList[i][1] + "-w" + wThreads + "-" + targetList[x][1]);
                            }
                        }
                    }
                }
                else if (ns.getServerSecurityLevel(targetList[x][1]) <= (ns.getServerMinSecurityLevel(targetList[x][1]) + 5)) {
                    if (hostList[i][1] == "home") { freeRam = 0; } else { if (ns.serverExists(hostList[i][1])) { freeRam = ns.getServerMaxRam(hostList[i][1]) - ns.getServerUsedRam(hostList[i][1]) } }
                    if (ns.getServerMoneyAvailable(targetList[x][1]) >= ns.getServerMaxMoney(targetList[x][1]) * .70) {
                        if (ns.fileExists(files[2], hostList[i][1])) { } else { await ns.scp(files[2], "home", hostList[i][1]); }
                        while (parseFloat(ns.hackAnalyze(targetList[x][1])) * hThreads > 0.40) { hThreads--; await ns.sleep(1); };
                        var hThreads = Math.max(Math.trunc(freeRam / 1.70), 0);
                        if (hThreads < 1 || hThreads == null) { } else {
                            if (await ns.exec(files[2], hostList[i][1], hThreads, targetList[x][1])) {
                                ns.print("[" + Date().substr(16, 8) + "] " + files[2] + "-" + hostList[i][1] + "-h" + hThreads + "-" + targetList[x][1]);
                            }
                        }
                    }
                }
            } x++
        }

    }

    ns.tail("less8.js");
    while (true) {
        await scanExes();
        await sortServers();
        await theBusiness();
        await ns.sleep(1000);
    }
}

/** @param {NS} ns **/
 export async function main(ns) {
	 ns.disableLog("sleep")
 let delayTime = ns.args[0] || 1000;
 let thresholdMultiplier = ns.args[1] || 1; //Bigger threshold, the less it spends
 while (true) {
 let ownedNodes = ns.hacknet.numNodes();
 let minValue = ns.hacknet.getPurchaseNodeCost();
 let nodeIndex = ownedNodes;
 let upgradeType = -1; //-1 -> purchase, 0 -> level, 1 -> ram, 2 -> core, 3 -> cache
 for (let i = 0; i < ownedNodes; i++) {
 let upgrades = [
 ns.hacknet.getLevelUpgradeCost(i, 5),
 ns.hacknet.getRamUpgradeCost(i, 5),
 ns.hacknet.getCoreUpgradeCost(i, 5),
 ns.hacknet.getCacheUpgradeCost(i, 5),
 ];
 let value = Math.min.apply(Math, upgrades);
 if (value < minValue) {
 minValue = value;
 nodeIndex = i;
 upgradeType = upgrades.indexOf(value);
 }
 }
 await waitForMoney(ns, minValue, delayTime, thresholdMultiplier);
 switch (upgradeType) {
 case -1:
 ns.hacknet.purchaseNode();
 break;
 case 0:
 ns.hacknet.upgradeLevel(nodeIndex, 5);
 break;
 case 1:
 ns.hacknet.upgradeRam(nodeIndex, 5);
 break;
 case 2:
 ns.hacknet.upgradeCore(nodeIndex, 5);
 break;
 case 3:
 ns.hacknet.upgradeCache(nodeIndex, 5);
 break;
 }
 }
 }
//
 async function waitForMoney(ns, targetMoney, delayTime, thresholdMultiplier) {
 if (ns.getPlayer().money / thresholdMultiplier < targetMoney) {
 await ns.sleep(delayTime);
 while (ns.hacknet.numHashes() >= 4) {
 ns.hacknet.spendHashes("Sell for Money")
 await ns.sleep(10);
 }
 }}
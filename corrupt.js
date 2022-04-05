/** @param {NS} ns **/
export async function main(ns) {
	var crimes = ["Shoplift", "Rob store", "Mug someone", "Larceny", "Deal Drugs", "Bond Forgery", "Traffick illegal Arms", "Homicide", "Grand theft Auto", "Kidnap and Ransom", "Assassinate", "Heist"];
	var crimeList = false;
	var temp = false;
	var i = 0;
	//var x = 0;
	ns.clearLog();
	ns.disableLog("disableLog");
	ns.disableLog("sleep");
	//
	function arraySort(array) { return array.sort(function (a, b) { return b[0] - a[0] }) }
	//
	async function sortCrimes() {
		crimeList = []; const stats = {};
		for (let i = 0; i <= crimes.length - 1; i++) {
			const stats = ns.getCrimeStats(crimes[i])
			if (ns.getCrimeChance(crimes[i]) == 1) {
				temp = [stats.money / stats.time, stats.name]
				if (!crimeList.includes(temp)) {
					crimeList.push(temp); crimeList = arraySort(crimeList)
				}
			}
		}
	}
	//
	async function corrupt() {
		if (!crimeList == []) { await ns.print("Next crime will be " + crimeList[0][1] + "."); await ns.commitCrime(crimeList[0][1]); }
		if (crimeList == []) { await ns.print("Next crime will be " + crimes[0] + "."); await ns.commitCrime(crimes[0]); }
	}
	//
	await ns.tail("corrupt.js")
	while (true) {
		await sortCrimes();
		await corrupt();
		while (ns.isBusy()) { await ns.sleep(1000); }
		await ns.sleep(1000);
	}
}

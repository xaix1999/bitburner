/** @param {NS} ns **/
export async function main(ns) {
	var targetStat = 200;
	var crimeList = ["Mug","Deal Drugs","Larceny","Homicide","Heist"]
	var p = 2;
	ns.clearLog();
	ns.disableLog("disableLog");
	ns.disableLog("sleep");
	async function sleeveDo() {
		var sleeveNum = ns.sleeve.getNumSleeves();
		for (let x = 0; x <= sleeveNum - 1; x++) {
			if (!(ns.sleeve.getSleevePurchasableAugs(x) == []) && ns.sleeve.getSleeveStats(x).shock == 0) {
				var sleeveAug = ns.sleeve.getSleevePurchasableAugs(x)
				for (let y = 0; y <= sleeveAug.length - 1; y++)
					ns.sleeve.purchaseSleeveAug(x, sleeveAug[y].name)
			}
			if (ns.sleeve.getSleeveStats(x).shock > 1) {
				await ns.sleeve.setToShockRecovery(x);
			}
			else if (ns.sleeve.getSleeveStats(x).shock < 90 && ns.sleeve.getSleeveStats(x).sync < 100) {
				await ns.sleeve.setToSynchronize(x);
			}
			else if (ns.sleeve.getSleeveStats(x).shock < 90 && ns.sleeve.getSleeveStats(x).sync == 100 && ns.sleeve.getSleeveStats(x).strength < targetStat) {
				await ns.sleeve.travel(x, "Sector-12");
				await ns.sleeve.setToGymWorkout(x, "Powerhouse Gym", "Train Strength");
			}
			else if (ns.sleeve.getSleeveStats(x).strength >= targetStat && ns.sleeve.getSleeveStats(x).defense < targetStat) {
				await ns.sleeve.travel(x, "Sector-12");
				await ns.sleeve.setToGymWorkout(x, "Powerhouse Gym", "Train Defense");
			}
			else if (ns.sleeve.getSleeveStats(x).defense >= targetStat && ns.sleeve.getSleeveStats(x).dexterity < targetStat) {
				await ns.sleeve.travel(x, "Sector-12");
				await ns.sleeve.setToGymWorkout(x, "Powerhouse Gym", "Train Dexterity");
			}
			else if (ns.sleeve.getSleeveStats(x).dexterity >= targetStat && ns.sleeve.getSleeveStats(x).agility < targetStat) {
				await ns.sleeve.travel(x, "Sector-12");
				await ns.sleeve.setToGymWorkout(x, "Powerhouse Gym", "Train Agility");
			}
			else if (ns.sleeve.getSleeveStats(x).agility >= targetStat && ns.sleeve.getSleeveStats(x).hacking < targetStat) {
				await ns.sleeve.travel(x, "Volhaven");
				await ns.sleeve.setToUniversityCourse(x, "ZB Institute of Technology", "Algorithms");
			}
			else if (ns.sleeve.getSleeveStats(x).hacking >= targetStat && ns.sleeve.getSleeveStats(x).charisma < targetStat) {
				await ns.sleeve.travel(x, "Volhaven");
				await ns.sleeve.setToUniversityCourse(x, "ZB Institute of Technology", "Leadership");
			}
			else if (ns.sleeve.getSleeveStats(x).charisma >= targetStat && ns.sleeve.getSleeveStats(x).hacking >= targetStat && ns.sleeve.getSleeveStats(x).strength >= targetStat && ns.sleeve.getSleeveStats(x).defense >= targetStat && ns.sleeve.getSleeveStats(x).dexterity >= targetStat && ns.sleeve.getSleeveStats(x).agility >= targetStat && !(ns.sleeve.getTask(x).crime == crimeList[p])) {
				await ns.sleeve.setToCommitCrime(x,crimeList[p]);
			}
		}
	}
	while (true) {
		await sleeveDo();
		await ns.sleep(30000);
	}
}

/** @param {NS} ns **/
export async function main(ns) {
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
			if (ns.sleeve.getSleeveStats(x).shock > 0) {
				await ns.sleeve.setToShockRecovery(x);
			}
			else if (ns.sleeve.getSleeveStats(x).shock == 0 && ns.sleeve.getSleeveStats(x).sync < 100) {
				await ns.sleeve.setToSynchronize(x);
			}
			else if (ns.sleeve.getSleeveStats(x).shock == 0 && ns.sleeve.getSleeveStats(x).sync == 100 && ns.sleeve.getSleeveStats(x).strength < 201) {
				await ns.sleeve.travel(x, "Sector-12");
				await ns.sleeve.setToGymWorkout(x, "Powerhouse Gym", "Train Strength");
			}
			else if (ns.sleeve.getSleeveStats(x).strength >= 201 && ns.sleeve.getSleeveStats(x).defense < 201) {
				await ns.sleeve.travel(x, "Sector-12");
				await ns.sleeve.setToGymWorkout(x, "Powerhouse Gym", "Train Defense");
			}
			else if (ns.sleeve.getSleeveStats(x).defense >= 201 && ns.sleeve.getSleeveStats(x).dexterity < 201) {
				await ns.sleeve.travel(x, "Sector-12");
				await ns.sleeve.setToGymWorkout(x, "Powerhouse Gym", "Train Dexterity");
			}
			else if (ns.sleeve.getSleeveStats(x).dexterity >= 201 && ns.sleeve.getSleeveStats(x).agility < 201) {
				await ns.sleeve.travel(x, "Sector-12");
				await ns.sleeve.setToGymWorkout(x, "Powerhouse Gym", "Train Agility");
			}
			else if (ns.sleeve.getSleeveStats(x).agility >= 201 && ns.sleeve.getSleeveStats(x).hacking < 201) {
				await ns.sleeve.travel(x, "Volhaven");
				await ns.sleeve.setToUniversityCourse(x, "ZB Institute of Technology", "Algorithms");
			}
			else if (ns.sleeve.getSleeveStats(x).hacking >= 201 && ns.sleeve.getSleeveStats(x).charisma < 201) {
				await ns.sleeve.travel(x, "Volhaven");
				await ns.sleeve.setToUniversityCourse(x, "ZB Institute of Technology", "Leadership");
			}
			else if (ns.sleeve.getSleeveStats(x).charisma >= 201 && ns.sleeve.getSleeveStats(x).hacking >= 201 && ns.sleeve.getSleeveStats(x).strength >= 201 && ns.sleeve.getSleeveStats(x).defense >= 201 && ns.sleeve.getSleeveStats(x).dexterity >= 201 && ns.sleeve.getSleeveStats(x).agility >= 201 && !(ns.sleeve.getTask(x).crime == "Homicide")) {
				await ns.sleeve.setToCommitCrime(x, "Larceny");
				//await ns.sleeve.setToCommitCrime(x,"Homicide");

			}
		}
	}
	while (true) {
		await sleeveDo();
		await ns.sleep(30000);
		//await ns.exit();
		//await ns.sleeve.setToCommitCrime(x,"Mug");
		//await ns.sleeve.setToCommitCrime(x,"Deal Drugs");
		//
	}
}
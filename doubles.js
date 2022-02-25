/** @param {NS} ns **/
export async function main(ns) {
	ns.clearLog();
	ns.disableLog("disableLog");
	ns.disableLog("sleep");
	async function sleeveDo() {
		var sleeveNum = ns.sleeve.getNumSleeves();
		for (let x = 0; x <= sleeveNum - 1; x++) {
			if (ns.sleeve.getSleeveStats(x).shock > 0) {
				if (await ns.sleeve.setToShockRecovery(x)) { await ns.print("Sleeve #" + x + " is doing shock recovery.") }
			}
			if (ns.sleeve.getSleeveStats(x).shock == 0 && ns.sleeve.getSleeveStats(x).sync < 100) {
				if (await ns.sleeve.setToSynchronize(x)) { await ns.print("Sleeve #" + x + " is doing sync.") }
			}
			if (ns.sleeve.getSleeveStats(x).shock == 0 && ns.sleeve.getSleeveStats(x).sync == 100 && ns.sleeve.getSleeveStats(x).strength < 201) {
				await ns.sleeve.travel(x, "Sector-12");
				await ns.sleeve.setToGymWorkout(x, "Powerhouse Gym", "Train Strength");
			}
			if (ns.sleeve.getSleeveStats(x).strength >= 201 && ns.sleeve.getSleeveStats(x).defense < 201){
				await ns.sleeve.travel(x, "Sector-12");
				await ns.sleeve.setToGymWorkout(x, "Powerhouse Gym", "Train Defense");
			}
			if (ns.sleeve.getSleeveStats(x).defense >= 201 && ns.sleeve.getSleeveStats(x).dexterity < 201){
				await ns.sleeve.travel(x, "Sector-12");
				await ns.sleeve.setToGymWorkout(x, "Powerhouse Gym", "Train Dexterity");
			}
			if (ns.sleeve.getSleeveStats(x).dexterity >= 201 && ns.sleeve.getSleeveStats(x).agility < 201){
				await ns.sleeve.travel(x, "Sector-12");
				await ns.sleeve.setToGymWorkout(x, "Powerhouse Gym", "Train Agility");
			}
			if (ns.sleeve.getSleeveStats(x).agility >= 201 && ns.sleeve.getSleeveStats(x).hacking < 201) {
				await ns.sleeve.travel(x, "Volhaven");
				//await ns.sleeve.setToUniversityCourse(x, "ZB Institute of Technology", "Leadership");
				await ns.sleeve.setToUniversityCourse(x, "ZB Institute of Technology", "Algorithms");
			}
			if (ns.sleeve.getSleeveStats(x).hacking >= 201 && ns.sleeve.getSleeveStats(x).strength >= 201 && ns.sleeve.getSleeveStats(x).defense >= 201 && ns.sleeve.getSleeveStats(x).dexterity >= 201 && ns.sleeve.getSleeveStats(x).agility >= 201 && !(ns.sleeve.getTask(x).crime == "Larceny")) {
				await ns.sleeve.setToCommitCrime(x, "Larceny")

			}
		}
	}
	while (true) {
		await sleeveDo();
		await ns.sleep(30000);
		//await ns.exit();

		//await ns.sleeve.setToCommitCrime(x,"Mug")
		//await ns.sleeve.setToCommitCrime(x,"Deal Drugs")
		//await ns.sleeve.setToCommitCrime(x,"Homicide")
		//
	}
}

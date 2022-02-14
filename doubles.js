/** @param {NS} ns **/
export async function main(ns) {
	async function sleeveDo() {
		var sleeveNum = ns.sleeve.getNumSleeves();
		for (let x = 0; x <= sleeveNum - 1; x++) {
			if (ns.sleeve.getSleeveStats(x).shock > 0) {
				if (await ns.sleeve.setToShockRecovery(x)) { await ns.print("Sleeve #" + x + " is doing shock recovery.") }
			}
			if (ns.sleeve.getSleeveStats(x).shock == 0 && ns.sleeve.getSleeveStats(x).sync < 100) {
				if (await ns.sleeve.setToSynchronize(x)) { await ns.print("Sleeve #" + x + " is doing sync.") }
			}
			if (ns.sleeve.getSleeveStats(x).shock == 0 && ns.sleeve.getSleeveStats(x).sync == 100) {
				await ns.sleeve.setToGymWorkout(0, "Powerhouse Gym", "Train Strength");
				await ns.sleeve.setToGymWorkout(1, "Powerhouse Gym", "Train Strength");
				await ns.sleeve.setToGymWorkout(2, "Powerhouse Gym", "Train Defense");
				await ns.sleeve.setToGymWorkout(3, "Powerhouse Gym", "Train Defense");
				await ns.sleeve.setToGymWorkout(4, "Powerhouse Gym", "Train Dexterity");
				await ns.sleeve.setToGymWorkout(5, "Powerhouse Gym", "Train Dexterity");
				await ns.sleeve.setToGymWorkout(6, "Powerhouse Gym", "Train Agility");
				await ns.sleeve.setToGymWorkout(7, "Powerhouse Gym", "Train Agility");
				await ns.exit();
			}
		}
	}
	while (true) {
		await sleeveDo();
		await ns.sleep(1000);
	}
}

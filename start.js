/** @param {NS} ns **/
const baseUrl = "https://raw.githubusercontent.com/xaix1999/bitburner/main/"
const filesToDownload = [
	"8pW.js",
	"8plus.js",
	"corrupt.js",
	"cryptInit.js",
	"doubles.js",
	"hnet.js",
	"pserv.js",
	"sCp.js",
	"share.js",
	"shortsticky.js",
	"sinewave.js"
]

export async function main(ns) {
	for (let i = 0; i < filesToDownload.length; i++) {
		const filename = filesToDownload[i]
		const path = baseUrl + filename
		await ns.scriptKill(filename, "home")
		await ns.rm(filename)
		await ns.sleep(100)
		await ns.wget(path, filename)
	}

	await ns.exec("8plus.js", "home");
	await ns.sleep(5000);
	await ns.exec("8plus.js", "home");
}

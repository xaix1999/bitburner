/** @param {NS} ns **/
export async function main(ns) {
 if (ns.getHostname() !== "home") {
 throw new Exception("Run the script from home");
 }
//
 ns.kill("gen_auto.js", "home")
 ns.kill("pServerMan.js", "home")
 ns.kill("hnet.js", "home")
 ns.kill("stonks.js", "home")
 ns.rm("gen_auto.js", "home")
 ns.rm("pserv.js", "home")
 ns.rm("hnet.js", "home")
 ns.rm("stonks.js", "home")
//
 await ns.wget("https://raw.githubusercontent.com/xaix1999/bitburner/main/gen_auto.js", "gen_auto.js");
//
 await ns.wget("https://raw.githubusercontent.com/xaix1999/bitburner/main/pserv.js", "pserv.js");
//
 await ns.wget("https://raw.githubusercontent.com/xaix1999/bitburner/main/hnet.js", "hnet.js");
//
 await ns.wget("https://raw.githubusercontent.com/xaix1999/bitburner/main/stonks.js", "stonks.js");
//
 ns.run("gen_auto.js", 1);
 ns.run("pserv.js", 1);
 ns.run("hnet.js", 1);
 //ns.run("stonks.js", 1);
 }

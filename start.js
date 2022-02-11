/** @param {NS} ns **/
export async function main(ns) {
 if (ns.getHostname() !== "home") {
 throw new Exception("Run the script from home");
 }
//
 ns.kill("less8.js", "home")
 ns.kill("pserv.js", "home")
 ns.kill("hnet.js", "home")
 ns.kill("shortsticky.js", "home")
 ns.kill("sinewave.js", "home")
 ns.rm("less8.js", "home")
 ns.rm("pserv.js", "home")
 ns.rm("hnet.js", "home")
 ns.rm("shortsticky.js", "home")
 ns.rm("sinewave.js", "home")
//
 await ns.wget("https://raw.githubusercontent.com/xaix1999/bitburner/main/less8.js", "less8.js");
 await ns.wget("https://raw.githubusercontent.com/xaix1999/bitburner/main/pserv.js", "pserv.js");
 await ns.wget("https://raw.githubusercontent.com/xaix1999/bitburner/main/hnet.js", "hnet.js");
 await ns.wget("https://raw.githubusercontent.com/xaix1999/bitburner/main/shortsticky.js", "shortsticky.js");
 await ns.wget("https://raw.githubusercontent.com/xaix1999/bitburner/main/sinewave.js", "sinewave.js");
//
 ns.run("less8.js", 1);
 ns.run("pserv.js", 1);
 //ns.run("hnet.js", 1);
 //ns.run("shortsticky.js", 1);
 //ns.run("sinewave.js", 1);
 }

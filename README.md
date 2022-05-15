# Bitburner
**scripts used to automate hacking on all hosts

These are some scripts I use to auto exec hacks to auto gen cash in this game.
There are scripts from others that I have modified in order to "better" run in my play through.
Scripts have been updated to run on all bit nodes (maybe).
Your mileage may vary.

V1.6.3 compatible

8pW.js - 0.00 GB - Worker script for most of the computation needed to run 8plus.

8plus.js - 2.40 GB - It's Back! Started as a 1/1/1 hack/grow/weaken batch script, and was reduced to "multithreading" batches in order to stay under the 75k thread issue of my client locking up. "Improvement" over less8. 8plus now replaces less8. Used a method routing function to obfuscate the syntax of the calls. Better cpu usage and less game ram usage, mostly less host system cpu usage.

corrupt.js - 249.6 / 63.6 / 17.1 GB per Source-File 4 level - Simple script to commit crimes in bitnodes that have less profitable hacking.

cryptInit.js - 0.00 GB - Library file used for scrambling arguments, since everytime I have seen anomaly files on a system, It did not tell you what it was doing. So a little roleplaying is added to the "hacking".

doubles.js - 45.6 GB - Script used to make sure that sleeves are recovered and able to train combat stats. Currently set to do "Larceny" for the hacking exp and money.

*hnet.js - 5.70 GB - Set at buying 5 upgrades per cycle/chance (when the money is available), also added hash sells. Reduced ram usages by 0.4 GB.

pserv.js - 7.40 GB - Rewritten to reduce GB. Updated for BitNodes with reduced max ram amounts.

sCp.js - 0.00 GB - With all the routing and obfuscating of calls to netscripts, scp was having an issue with concurrent calls. Now it's in its own container.

share.js - 7.35 GB - Script used to share() hosts with faction during hacking contracts (faction rep building).

*shortsticky.js - 26.70 GB - Stock manager requiring tix and api access.

*sinewave.js - 23.70 GB - Stock manger with no requirements.

start.js - 4.90 GB - A wget for loop with a start of "8plus.js".

*Means scripts not written by me.


`Obey Heaven and work righteously.`

# Bit burner
**scripts used to automate hacking on all hosts

These are some scripts I use to auto exec hacks to auto gen cash in this game.
There are scripts from others that I have modified in order to "better" run in my play through.
Scripts have been updated to run on all bit nodes (maybe).
Your mileage may vary. Stocks & Hacknets seem to not be as profitable as I hoped.

V1.4.0 compatible

gen_auto.js - 8.20 GB - Deprecated.

hnet.js - 5.70 GB - Set at buying 5 upgrades per cycle/chance (when the money is available), also added hash sells. Reduced ram usages by 0.4 GB.

less8.js - 7.35 GB - Rewrite of gen_auto.js to use less than 8 GB for fresh new runs. It will pickup player owned servers as long as the name is similiar to the pserv.js format, or more exactly, starts with "s-". Added more restrictions to the script to allow it to be less blunt, raised ram usage from 6.00 GB to 7.35 GB.

pserv.js - 7.35 GB - Rewritten to reduce GB.

share.js - 7.35 GB - Script used to share() hosts with faction during hacking contracts (faction rep building).

shortsticky.js - 26.70 GB - Stock manager requiring tix and api access.

sinewave.js - 23.70 GB - Stock manger with no requirements.

start.js - 4.90 GB - A wget for loop with a start of "less8.js".

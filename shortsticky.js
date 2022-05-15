/** @param {NS} ns **/
export async function main(ns) {
	ns.clearLog();
	var maxSharePer = 1.00
	var stockBuyPer = 0.60
	var stockShortBuyPer = 0.35
	var stockVolPer = 0.05
	var moneyKeep = 1e9
	var minSharePer = 50
	while (true) {
		ns.clearLog();
		ns.disableLog('disableLog');
		ns.disableLog('sleep');
		ns.disableLog('getServerMoneyAvailable');
		var stocks = ns.stock.getSymbols() //.sort(function (a, b) { return ns.stock.getForecast(b) - ns.stock.getForecast(a); })
		for (const stock of stocks) {
			var position = ns.stock.getPosition(stock);
			if (position[0]) {
				//ns.print('Position: ' + stock + ', ')
				sellPositions(stock);
			}
			buyPositions(stock);
			if (position[2]) {
				//ns.print('Position: ' + stock + ', ')
				sellShortPositions(stock);
			}
			buyShortPositions(stock);
		}
		//ns.print('Cycle Complete');
		await ns.sleep(6000);
	}
	function buyPositions(stock) {
		var maxShares = (ns.stock.getMaxShares(stock) * maxSharePer) - position[0];
		var askPrice = ns.stock.getAskPrice(stock);
		var forecast = ns.stock.getForecast(stock);
		var volPer = ns.stock.getVolatility(stock);
		var playerMoney = ns.getServerMoneyAvailable('home');

		if (forecast >= stockBuyPer && volPer <= stockVolPer) {
			if (playerMoney - moneyKeep > ns.stock.getPurchaseCost(stock, minSharePer, "Long")) {
				var shares = Math.min((playerMoney - moneyKeep) / askPrice, maxShares);
				ns.stock.buy(stock, shares);
				//ns.print('Bought: '+ stock + '')
			}
		}
	}
	function sellPositions(stock) {
		var forecast = ns.stock.getForecast(stock);
		if (forecast < 0.5) {
			ns.stock.sell(stock, position[0]);
			//ns.print('Sold: '+ stock + '')
		}
	}
	function buyShortPositions(stock) {
		var maxShares = (ns.stock.getMaxShares(stock) * maxSharePer) - position[2];
		var askPrice = ns.stock.getAskPrice(stock);
		var forecast = ns.stock.getForecast(stock);
		var volPer = ns.stock.getVolatility(stock);
		var playerMoney = ns.getServerMoneyAvailable('home');

		if (forecast <= stockShortBuyPer && volPer <= stockVolPer) {
			if (playerMoney - moneyKeep > ns.stock.getPurchaseCost(stock, minSharePer, "Short")) {
				var shares = Math.min((playerMoney - moneyKeep) / askPrice, maxShares);
				ns.stock.short(stock, shares);
				//ns.print('Shorted: '+ stock + '')
			}
		}
	}
	function sellShortPositions(stock) {
		var forecast = ns.stock.getForecast(stock);
		if (forecast > 0.5) {
			ns.stock.sellShort(stock, position[2]);
			//ns.print('Sold short: '+ stock + '')
		}
	}
}
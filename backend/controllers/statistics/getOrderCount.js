const orderModel = require("../../models/orderModel");

async function getOrderCount(req, res) {
  try {
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const todayRange = { start: startOfToday, end: now };

    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);
    const yesterdayRange = { start: startOfYesterday, end: startOfToday };

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisMonthRange = { start: startOfMonth, end: now };

    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const lastMonthRange = { start: startOfLastMonth, end: endOfLastMonth };

    

    // Use aggregation to count orders in each range
    const counts = await Promise.all([
      orderModel.countDocuments({
        createdAt: { $gte: todayRange.start, $lte: todayRange.end },
      }),
      orderModel.countDocuments({
        createdAt: { $gte: yesterdayRange.start, $lte: yesterdayRange.end },
      }),
      orderModel.countDocuments({
        createdAt: { $gte: thisMonthRange.start, $lte: thisMonthRange.end },
      }),
      orderModel.countDocuments({
        createdAt: { $gte: lastMonthRange.start, $lte: lastMonthRange.end },
      }),
    ]);
    const data = {
      today: counts[0],
      yesterday: counts[1],
      thisMonth: counts[2],
      lastMonth: counts[3],
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = getOrderCount;

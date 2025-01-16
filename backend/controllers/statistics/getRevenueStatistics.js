const orderModel = require("../../models/orderModel");

// Thống kê doanh thu
const getRevenueStatistics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Kiểm tra ngày bắt đầu và kết thúc
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp ngày bắt đầu và kết thúc." });
    }

    // Parse thời gian
    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T23:59:59`);

    // Tìm các đơn hàng trong khoảng thời gian với trạng thái hợp lệ
    const orders = await orderModel.find({
      status: { $in: ["Hoàn thành", "Đã nhận hàng"] }, // Chỉ thống kê doanh thu đã hoàn tất
      createdAt: { $gte: start, $lte: end },
    });
    
    const orders1 = await orderModel.find({
      createdAt: { $gte: start, $lte: end },
    });

    // Tính tổng doanh thu
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.priceCheckout,
      0
    );

    res.status(200).json({
      success: true,
      totalRevenue,
      ordersCount: orders.length,
      ordersCount2: orders1.length,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi thống kê doanh thu." });
  }
};

module.exports = { getRevenueStatistics };

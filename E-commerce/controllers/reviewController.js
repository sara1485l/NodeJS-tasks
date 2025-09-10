const { OrdersData } = require("../models/Order");
const nodemailer = require("nodemailer");

const addReview = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { email, rating, description } = req.body;

    if (!orderId) return res.status(400).json({ message: "Order ID is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!rating) return res.status(400).json({ message: "Rating is required" });
    if (!description) return res.status(400).json({ message: "Description is required" });

    if (!email.includes("@") || !email.includes(".")) {
      return res.status(400).json({ message: "Invalid email format" });
    }


    if (isNaN(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    if (description.length < 5 || description.length > 500) {
      return res.status(400).json({ message: "Description must be between 5 and 500 characters" });
    }

    const order = await OrdersData.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.review) {
        return res.status(400).json({ message: "This order already has a review" });
    }

    order.review = { email, rating, description };
    await order.save();

    let subject = "Thank you for your review!";
    let message = "";

    if (rating <= 2) {
        message = "شكراً على تقييمك. نأسف على أي إزعاج، وسنعمل على تحسين الخدمة.";
    } else if (rating === 3) {
        message = "شكراً على تقييمك المحايد. نأمل أن نلبي توقعاتك أكثر في المرات القادمة.";
    } else {
        message = "شكراً جزيلاً على تقييمك الممتاز! سعيدين بتجربتك معنا.";
    }
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject,
        text: message
    });

    return res.status(200).json({ message: "تم إرسال الريفيو بنجاح" });
    } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = { addReview };

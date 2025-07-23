import User from "../models/User.js";
import Book from "../models/Book.js";
import Issue from "../models/Issue.js";

export const getAdminReport = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBooks = await Book.countDocuments();
    const totalIssuedBooks = await Issue.countDocuments();
    const returnedBooks = await Issue.countDocuments({ isReturned: true });
    const pendingReturns = await Issue.countDocuments({ isReturned: false });
    const overdueBooks = await Issue.countDocuments({
      isReturned: false,
      returnDate: { $lt: new Date() }
    });

    const mostIssued = await Issue.aggregate([
      { $group: { _id: "$bookId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book"
        }
      },
      { $unwind: "$book" },
      { $project: { title: "$book.title", issueCount: "$count" } }
    ]);

    res.json({
      totalUsers,
      totalBooks,
      totalIssuedBooks,
      returnedBooks,
      pendingReturns,
      overdueBooks,
      mostIssuedBook: mostIssued[0] || null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
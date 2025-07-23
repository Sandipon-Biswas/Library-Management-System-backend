import Issue from "../models/Issue.js";
import Book from "../models/Book.js";


export const issueBook = async (req, res) => {
  try {
    const { bookId, returnDate } = req.body;

    const book = await Book.findById(bookId);
    if (!book || book.stock < 1)
      return res.status(400).json({ error: "Book unavailable" });

    const already = await Issue.findOne({
      bookId,
      userId: req.user.id,
      isReturned: false
    });
    if (already)
      return res.status(400).json({ error: "You have Already issued this book" });

    const issue = new Issue({
      bookId,
      userId: req.user.id,
      returnDate
    });
    await issue.save();

    book.stock -= 1;
    await book.save();

    res.status(201).json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const returnBook = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue || issue.isReturned)
      return res.status(400).json({ error: "Invalid issue record" });

    issue.isReturned = true;
    await issue.save();

    const book = await Book.findById(issue.bookId);
    book.stock += 1;
    await book.save();

    res.json({ message: "Book returned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyIssues = async (req, res) => {
 try {
  const myIssues= await Issue.find({
    userId:req.user.id,
    isReturned:false
  }).populate("bookId");

     res.json(myIssues);
 } catch (error) {
  console.log(error)
  return res.status(500).json({error:error.message})
 }
};
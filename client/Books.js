import { useEffect, useState } from "react";

function Books() {
    const [bookName, setBookName] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [books, setBooks] = useState([]);

    // Load books from localStorage when page loads
    useEffect(() => {
        const savedBooks = JSON.parse(localStorage.getItem("books"));
        if (savedBooks) {
            setBooks(savedBooks);
        }
    }, []);

    // Save books to localStorage whenever books change
    useEffect(() => {
        localStorage.setItem("books", JSON.stringify(books));
    }, [books]);

    const addBook = () => {
        if (!bookName || !author || !price) {
            alert("Please fill all fields");
            return;
        }

        const newBook = {
            id: Date.now(),
            bookName,
            author,
            price
        };

        setBooks([...books, newBook]);
        setBookName("");
        setAuthor("");
        setPrice("");
    };

    return (
        <div className="min-vh-100 bg-light d-flex flex-column align-items-center pt-5">

            {/* Add Books Form Card */}
            <div className="card shadow-lg p-4 mb-4" style={{ width: "500px" }}>
                <h3 className="text-center mb-4">Add Books</h3>

                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Book Name"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                />

                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Author Name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <button className="btn btn-primary w-100" onClick={addBook}>
                    Add Book
                </button>
            </div>

            {/* Books List Card */}
            <div className="card shadow-lg p-4" style={{ width: "500px" }}>
                <h3 className="text-center mb-3">Books List</h3>

                {books.length === 0 ? (
                    <p className="text-center text-muted">No books added yet</p>
                ) : (
                    <ul className="list-group">
                        {books.map((book) => (
                            <li
                                key={book.id}
                                className="list-group-item d-flex justify-content-between"
                            >
                                <span>
                                    <strong>{book.bookName}</strong> by {book.author}
                                </span>
                                <span className="badge bg-success">
                                    Rs {book.price}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    );

}

export default Books;

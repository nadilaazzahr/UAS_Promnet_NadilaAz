import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InventoryService from '../services/InventoryService';

class ListInventoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchQuery: "", // State untuk menyimpan nilai pencarian
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    InventoryService.getBooks()
      .then((res) => {
        if (!res.data || res.data.length === 0) {
          this.props.history.push('/add-book/_add');
        } else {
          this.setState({ books: res.data });
        }
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }

  addBook() {
    this.props.history.push('/add-book/_add');
  }

  deleteBook(id) {
    InventoryService.deleteBook(id)
      .then((res) => {
        this.setState({
          books: this.state.books.filter((book) => book.id !== id),
        });
      });
  }

  viewBook(id) {
    this.props.history.push(`/view-book/${id}`);
  }

  editBook(id) {
    this.props.history.push(`/add-book/${id}`);
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearch = () => {
    // Melakukan pencarian dengan menyaring daftar buku
    const filteredBooks = this.state.books.filter((book) => {
      const searchLower = this.state.searchQuery.toLowerCase();
      return (
        book.judul_buku.toLowerCase().includes(searchLower) ||
        book.nama_peminjam.toLowerCase().includes(searchLower)
      );
    });

    // Mengupdate state dengan hasil pencarian
    this.setState({ books: filteredBooks,
      searching: true,
     });
  };

  
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <h2 className="text-center" style={{paddingRight:'100px'}}>Books List</h2>
            <div className="row">
              <button className="btn btn-primary" onClick={() => this.addBook()}>
                Add Book
              </button>
            </div>

            <br></br>
            <div className="row">
              <div className="mb-3 input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Title or Borrower"
                  value={this.state.searchQuery}
                  onChange={this.handleSearchChange}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.handleSearch}
                >
                  Search
                </button>
              </div>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Judul Buku</th>
                    <th>Jumlah</th>
                    <th>Nama Peminjam</th>
                    <th>Alamat Peminjam</th>
                    <th>No. Handphone Peminjam</th>
                    <th>Tanggal Pinjam</th>
                    <th>Tanggal Pengembalian</th>
                    <th>Lama Pinjam</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.books.map((book) => (
                    <tr key={book.id}>
                      <td>{book.judul_buku}</td>
                      <td>{book.jumlah}</td>
                      <td>{book.nama_peminjam}</td>
                      <td>{book.alamat_peminjam}</td>
                      <td>{book.noHp_peminjam}</td>
                      <td>{book.tanggal_pinjam}</td>
                      <td>{book.tanggal_pengembalian}</td>
                      <td>{book.lama_pinjam}</td>
                      <td>
                        <button
                          style={{ marginLeft: '10px', marginBottom: '10px'}}
                          onClick={() => this.editBook(book.id)}
                          className="btn btn-info"
                        >
                          Update
                        </button>
                        <button
                          style={{ marginLeft: '10px', marginBottom: '10px'}}
                          onClick={() => this.deleteBook(book.id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                        <button
                          style={{ marginLeft: '10px', marginBottom: '10px' }}
                          onClick={() => this.viewBook(book.id)}
                          className="btn btn-info"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListInventoryComponent;

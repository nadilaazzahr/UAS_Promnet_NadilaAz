import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InventoryService from '../services/InventoryService';

class CreateInventoryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      judul_buku: "",
      jumlah: 0,
      nama_peminjam: "",
      alamat_peminjam: "",
      noHp_peminjam: "",
      tanggal_pinjam: "",
      tanggal_pengembalian: "",
      lama_pinjam: "",
    };

    // Bind the event handlers
    this.changeHandler = this.changeHandler.bind(this);
    this.saveOrUpdateBook = this.saveOrUpdateBook.bind(this);
  }

  componentDidMount() {
    if (this.state.id !== "_add") {
      InventoryService.getBookById(this.state.id).then((res) => {
        let book = res.data;
        this.setState({
          judul_buku: book.judul_buku,
          jumlah: book.jumlah,
          nama_peminjam: book.nama_peminjam,
          alamat_peminjam: book.alamat_peminjam,
          noHp_peminjam: book.noHp_peminjam,
          tanggal_pinjam: book.tanggal_pinjam,
          tanggal_pengembalian: book.tanggal_pengembalian,
          lama_pinjam: book.lama_pinjam,
        });
      });
    }
  }

  saveOrUpdateBook(e) {
    e.preventDefault();
    let book = {
      judul_buku: this.state.judul_buku,
      jumlah: this.state.jumlah,
      nama_peminjam: this.state.nama_peminjam,
      alamat_peminjam: this.state.alamat_peminjam,
      noHp_peminjam: this.state.noHp_peminjam,
      tanggal_pinjam: this.state.tanggal_pinjam,
      tanggal_pengembalian: this.state.tanggal_pengembalian,
      lama_pinjam: this.state.lama_pinjam,
    };

    if (this.state.id === "_add") {
      InventoryService.createBook(book)
        .then((res) => {
          const newBook = res.data;
          this.setState({ jumlah: newBook.jumlah });
          this.props.history.push("/books");
        })
        .catch((error) => {
          console.error("Error creating book:", error);
        });
    } else {
      InventoryService.updateBook(book, this.state.id).then((res) => {
        this.props.history.push("/books");
      });
    }
  }

  changeHandler(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  cancel() {
    this.props.history.push("/books");
  }

  getTitle() {
    return this.state.id === "_add" ? (
      <h1 className="ttl" style={{textAlign: 'center'}}>Add Book</h1>
    ) : (
      <h1 className="ttl">Update Book</h1>
    );
  }

  render() {
    return (
      <div>
        <div className="container" style={{ marginTop: '50px', marginBottom: '50px', height: '100vh', overflowY: 'auto' }}>
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card">
                {this.getTitle()}
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label>Judul Buku</label>
                      <input
                        name="judul_buku"
                        className="form-control"
                        value={this.state.judul_buku}
                        onChange={this.changeHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>Jumlah</label>
                      <input
                        name="jumlah"
                        className="form-control"
                        value={this.state.jumlah}
                        onChange={this.changeHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>Nama Peminjam</label>
                      <input
                        name="nama_peminjam"
                        className="form-control"
                        value={this.state.nama_peminjam}
                        onChange={this.changeHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>Alamat Peminjam</label>
                      <input
                        name="alamat_peminjam"
                        className="form-control"
                        value={this.state.alamat_peminjam}
                        onChange={this.changeHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>No HP Peminjam</label>
                      <input
                        name="noHp_peminjam"
                        className="form-control"
                        value={this.state.noHp_peminjam}
                        onChange={this.changeHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>Tanggal Pinjam</label>
                      <input
                        type="date"
                        name="tanggal_pinjam"
                        className="form-control"
                        value={this.state.tanggal_pinjam}
                        onChange={this.changeHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>Tanggal Pengembalian</label>
                      <input
                        type="date"
                        name="tanggal_pengembalian"
                        className="form-control"
                        value={this.state.tanggal_pengembalian}
                        onChange={this.changeHandler}
                      />
                    </div>
                    <div className="form-group">
                      <label>Lama Pinjam</label>
                      <input
                        name="lama_pinjam"
                        className="form-control"
                        value={this.state.lama_pinjam}
                        onChange={this.changeHandler}
                      />
                    </div>

                    <button
                      className="btn btn-success"
                      onClick={this.saveOrUpdateBook}
                    >
                      Save
                    </button>

                    <button
                      style={{ marginLeft: '14px' }}
                      className="btn btn-danger"
                      onClick={this.cancel.bind(this)}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateInventoryComponent;

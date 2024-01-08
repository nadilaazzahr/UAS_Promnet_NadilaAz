package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	Routers()
}

func Routers() {
	InitDB()
	defer db.Close()
	log.Println("Starting the HTTP server on port 9080")
	router := mux.NewRouter()
	router.HandleFunc("/inventory", CreateBook).Methods("POST")
	router.HandleFunc("/inventory", GetBooks).Methods("GET")
	router.HandleFunc("/inventory/{id}", GetBookByID).Methods("GET")
	router.HandleFunc("/inventory/{id}", UpdateBook).Methods("PUT")
	router.HandleFunc("/inventory/{id}", DeleteBook).Methods("DELETE")
	http.ListenAndServe(":9080", &CORSRouterDecorator{router})
}

// Add new book entry
func CreateBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	stmt, err := db.Prepare("INSERT INTO peminjamanBuku_nadila(judul_buku, jumlah, nama_peminjam, alamat_peminjam, noHp_peminjam, tanggal_pinjam, tanggal_pengembalian, lama_pinjam) VALUES(?,?,?,?,?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}

	var book Book
	json.Unmarshal(body, &book)

	_, err = stmt.Exec(book.JudulBuku, book.Jumlah, book.NamaPeminjam, book.AlamatPeminjam, book.NoHpPeminjam, book.TanggalPinjam, book.TanggalPengembalian, book.LamaPinjam)
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprintf(w, "New book entry was added")
}

// Get all books
func GetBooks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var books []Book

	result, err := db.Query("SELECT id, judul_buku, jumlah, nama_peminjam, alamat_peminjam, noHp_peminjam, tanggal_pinjam, tanggal_pengembalian, lama_pinjam FROM peminjamanBuku_nadila")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()

	for result.Next() {
		var book Book
		err := result.Scan(&book.ID, &book.JudulBuku, &book.Jumlah, &book.NamaPeminjam, &book.AlamatPeminjam, &book.NoHpPeminjam, &book.TanggalPinjam, &book.TanggalPengembalian, &book.LamaPinjam)
		if err != nil {
			panic(err.Error())
		}
		books = append(books, book)
	}

	json.NewEncoder(w).Encode(books)
}

// Get book by ID
func GetBookByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	result, err := db.Query("SELECT id, judul_buku, jumlah, nama_peminjam, alamat_peminjam, noHp_peminjam, tanggal_pinjam, tanggal_pengembalian, lama_pinjam FROM peminjamanBuku_nadila WHERE id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()

	var book Book
	for result.Next() {
		err := result.Scan(&book.ID, &book.JudulBuku, &book.Jumlah, &book.NamaPeminjam, &book.AlamatPeminjam, &book.NoHpPeminjam, &book.TanggalPinjam, &book.TanggalPengembalian, &book.LamaPinjam)
		if err != nil {
			panic(err.Error())
		}
	}

	json.NewEncoder(w).Encode(book)
}

// Update book by ID
func UpdateBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("UPDATE peminjamanBuku_nadila SET judul_buku=?, jumlah=?, nama_peminjam=?, alamat_peminjam=?, noHp_peminjam=?, tanggal_pinjam=?, tanggal_pengembalian=?, lama_pinjam=? WHERE id=?")
	if err != nil {
		panic(err.Error())
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}

	var book Book
	json.Unmarshal(body, &book)

	_, err = stmt.Exec(book.JudulBuku, book.Jumlah, book.NamaPeminjam, book.AlamatPeminjam, book.NoHpPeminjam, book.TanggalPinjam, book.TanggalPengembalian, book.LamaPinjam, params["id"])
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprintf(w, "Book with ID = %s was updated", params["id"])
}

// Delete book by ID
func DeleteBook(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("DELETE FROM peminjamanBuku_nadila WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}

	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprintf(w, "Book with ID = %s was deleted", params["id"])
}

// Book struct definition
type Book struct {
	ID                  string `json:"id"`
	JudulBuku           string `json:"judul_buku"`
	Jumlah              string `json:"jumlah"`
	NamaPeminjam        string `json:"nama_peminjam"`
	AlamatPeminjam      string `json:"alamat_peminjam"`
	NoHpPeminjam        string `json:"noHp_peminjam"`
	TanggalPinjam       string `json:"tanggal_pinjam"`
	TanggalPengembalian string `json:"tanggal_pengembalian"`
	LamaPinjam          string `json:"lama_pinjam"`
}

var db *sql.DB
var err error

// Initialize the database connection
func InitDB() {
	db, err = sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/db_2202333_nadilaazzahra_uas_pilkomB")
	if err != nil {
		panic(err.Error())
	}
}

// CORSRouterDecorator applies CORS headers to a mux.Router
type CORSRouterDecorator struct {
	R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers", "Accept, Accept-Language, Content-Type, YourOwnHeader")
	}
	// Stop here if it's a Preflighted OPTIONS request
	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}

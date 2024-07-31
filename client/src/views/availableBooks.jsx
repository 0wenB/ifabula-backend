import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const AvailableBooks = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const pinjamBuku = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:3000/my-book", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!data.book) {
        await axios.patch(`http://localhost:3000/book-status/${bookId}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        await axios.patch(`http://localhost:3000/user-status`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        navigate("/my-book");
      } else {
        alert(
          "Kamu hanya bisa meminjam 1 buku, berhentikan langgananmu terlebih dahulu di bagian My Book."
        );
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:3000/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      //   console.log(data);
      setProducts(data.books);
      // console.log(products);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  return (
    <>
      {products.map((el, idx) => {
        return (
          <>
            <div className="max-w-xl mx-auto mt-6">
              <div className="flex gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <img
                    className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
                    loading="lazy"
                    src={el.image}
                  />
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <p className="text-xl font-bold">{el.name}</p>
                  <p className="text-gray-500">Status: {el.status}</p>
                  <span className="flex items-center justify-start text-gray-500">
                    <svg
                      className="w-4 h-4 mr-1 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <button
                      className="text-teal-400"
                      onClick={() => pinjamBuku(el.id)}
                    >
                      Pinjam Buku
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default AvailableBooks;

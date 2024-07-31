import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:3000/all-books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      //   console.log(data.books);
      setBooks(data.books);
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
      <button
        className="p-4 bg-yellow-500 text-center font-bold"
        onClick={logout}
      >
        Logout
      </button>

      <h1 className="p-4 text-center font-bold">Daftar Buku</h1>
      {books.map((el, idx) => {
        return (
          <>
            <div className="max-w-xl mx-auto mt-6" key={idx}>
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
                  {el.status == "Masih dalam peminjaman" ? (
                    <p className="text-gray-500">
                      Dipinjam oleh: {el.User?.email}
                    </p>
                  ) : (
                    ""
                  )}
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

export default AdminDashboard;

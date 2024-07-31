import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

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

      <div className="flex justify-center items-center">
        <div className="pt-2 relative mx-auto text-gray-600">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            value={search}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
            <svg
              className="text-gray-600 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              style={{ enableBackground: "new 0 0 56.966 56.966" }}
              xmlSpace="preserve"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
      </div>

      {books
        .filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((el, idx) => {
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

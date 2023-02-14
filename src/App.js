import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [TotalProd, setTotalProd] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();
    setTotalProd(data.total);
    console.log(data);
    setProducts(data.products);
  };

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= TotalProd / 10 &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);
  return (
    <div className="main">
      {TotalProd > 0 && (
        <div className="products">
          {products.map((prod) => {
            return (
              <span className="product__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {TotalProd > 0 && (
        <div className="pagination">
          <span
            className={page !== 1 ? "" : "hideArrow"}
            onClick={() => selectPageHandler(page - 1)}
          >
            👈
          </span>
          {[...Array(TotalProd / 10)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "page_selected" : ""}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page !== TotalProd / 10 ? "" : "hideArrow"}
            onClick={() => selectPageHandler(page + 1)}
          >
            👉
          </span>
        </div>
      )}
    </div>
  );
}

export default App;

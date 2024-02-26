import './Pagination.css';

export const Pagination = ({
  videogamesPerPage,
  totalVideogames,
  paginate,
  total,
}) => {
  const pageNumbers = [];
  const numOfPages = Math.ceil(totalVideogames / videogamesPerPage);

  for (let i = 1; i <= numOfPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <nav className="pagination">
        <div className="paginationNumbers">
          {pageNumbers.map((num) => (
            <div key={num} className="item">
              <button onClick={(e) => paginate(e, num)}>{num}</button>
            </div>
          ))}
        </div>
      </nav>
      <div className="totalCount">
        <p style={{ color: 'white' }}>Total videojuegos: {total}</p>
      </div>
    </>
  );
};

import "./pagination.css";

export default function Pagination({ pages, selectedPage, setSelectedPage }) {
  const handleOnClick = (event, value) => {
    event.preventDefault();

    if (value === "&#8811;") {
      const newValue = selectedPage + 7;
      if (newValue > pages.length) {
        return setSelectedPage(pages.length);
      }
      return setSelectedPage(newValue);
    }
    if (value === "&#8810;") {
      const newValue = selectedPage - 7;
      if (newValue < 0) {
        return setSelectedPage(1);
      }
      return setSelectedPage(newValue);
    } else {
      return setSelectedPage(value);
    }
  };

  const paginationDisplay = (value1, value2) => {
    const maxPAgeShow = 9;
    let totalPage = value1.length;
    let arrayTodisplay = [];

    if (totalPage < 9) {
      return value1;
    } else {
      if (value2 < 5) {
        arrayTodisplay = value1.slice(0, 9);
        arrayTodisplay.push("&#8811;", totalPage);
        return arrayTodisplay;
      }
      if (value2 > totalPage - 5) {
        arrayTodisplay = value1.slice(totalPage - 10);
        arrayTodisplay.unshift(1, "&#8810;");
        return arrayTodisplay;
      }
      if (value2 >= 5 && value2 <= totalPage - 5) {
        const start = value2 - 4;
        const end = value2 + 4;
        arrayTodisplay = value1.slice(start, end);
        arrayTodisplay.unshift(1, "&#8810;");
        arrayTodisplay.push("&#8811;", totalPage);
        return arrayTodisplay;
      }
    }
  };

  return (
    <div className="pagination-section">
      {pages.length !== 0 && (
        <div>
          {paginationDisplay(pages, selectedPage).map((page, index) => {
            return (
              <button
                onClick={(event) => {
                  handleOnClick(event, page);
                }}
                className={selectedPage === page ? "selected" : ""}
                key={page + index}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

{
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tally3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import Card from './Card';
import { useFilter } from './FilterContext';
import Sidebar from './Sidebar';

const MainContent = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [dropDown, setDropdown] = useState<boolean>(false);

  const {
    searchQuery,
    selectCategory,
    keyword,
    maxPrice,
    minPrice,
  } = useFilter();
  const [currentPage, setCurrentpage] = useState<number>(1);

  const totalProduct = 100;
  const productPerPage = 10;
  const noOfPage = totalProduct / productPerPage;

  const getPagination = (page: number) => {
    const button: number[] = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(noOfPage, page + 1);

    for (
      let start = startPage;
      start <= endPage;
      start += 1
    ) {
      button.push(start);
    }

    return button;
  };

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${productPerPage}&skip=${
      (currentPage - 1) * productPerPage
    }`;

    if (keyword) {
      console.log('keyword', keyword);
      url = `https://dummyjson.com/products/search?q=${keyword.toLowerCase()}`;
    }

    fetch(url)
      .then((data) => data.json())
      .then((data) => setProducts(data.products))
      .catch((e) => console.log(e));
  }, [keyword, currentPage]);

  const handleClick = () => {
    setDropdown(!dropDown);
  };

  let filterProduct = products;
  const filterProductAccodingToQuery = () => {
    if (searchQuery) {
      filterProduct = filterProduct.filter((products) =>
        products.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    if (selectCategory) {
      filterProduct = filterProduct.filter(
        (products) => products.category === selectCategory
      );
    }

    if (minPrice !== undefined) {
      filterProduct = filterProduct.filter(
        (products) =>
          Number(products.price) >= Number(minPrice)
      );
    }

    if (maxPrice !== undefined) {
      filterProduct = filterProduct.filter(
        (products) =>
          Number(products.price) >= Number(maxPrice)
      );
    }

    switch (filter) {
      case 'expensive':
        return filterProduct.sort(
          (a, b) => b.price - a.price
        );
      case 'cheap':
        return filterProduct.sort(
          (a, b) => a.price - b.price
        );
      case 'popular':
        return filterProduct.sort(
          (a, b) => a.rating - b.rating
        );
      default:
        return filterProduct;
    }
  };

  filterProduct = filterProductAccodingToQuery();

  return (
    <div className="flex text-white ">
      <aside>
        <Sidebar dropDown={dropDown} />
      </aside>

      <main className="flex-1 min-h-screen">
        <div className="relative z-99 p-4">
          <button
            className="flex space-x-1 items-center cursor-pointer pb-7"
            onClick={() => {
              handleClick();
            }}
          >
            <Tally3 />{' '}
            <span className="text-[1.2rem] font-[500]">
              {filter === 'all'
                ? 'Filter'
                : filter.charAt(0).toUpperCase() +
                  filter.slice(1)}
            </span>
          </button>

          <div className="absolute z-10 top-4 left-30">
            {dropDown && (
              <div className="flex justify-center bg-blue-200 text-black/70 rounded-lg">
                <button
                  onClick={() => setFilter('cheap')}
                  className="font-semibold p-1 cursor-pointer border-r-1 border-gray-700 w-full flex justify-start px-2 h-full"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter('expensive')}
                  className=" font-semibold p-1 cursor-pointer border-r-1 border-gray-700 w-full flex justify-start items-center px-2"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter('popular')}
                  className=" font-semibold p-1 cursor-pointer w-full flex justify-start px-2"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-5 grid-cols-[repeat(auto-fill,_minmax(370px,_1fr))] justify-items-center items-center ">
          {filterProduct.map(
            ({ thumbnail, title, price, id }) => (
              <Card
                key={id}
                thumbnail={thumbnail}
                title={title}
                price={price}
                id={id}
              />
            )
          )}
        </div>

        <div className="container flex items-center mt-10 max-w-[1200px] mx-auto">
          <button
            onClick={() => setCurrentpage(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-[#1a1a1a] ml-6 px-5 py-3 rounded text-[1.5rem] border-1 border-[#fff5] text-semibold"
          >
            Prev
          </button>

          <div className="pagination flex space-x-4 flex-1 justify-center">
            {getPagination(currentPage).map((btn) => (
              <button
                key={btn}
                onClick={() => setCurrentpage(btn)}
                className={`rounded-full w-[40px] h-[40px] bg-[#1a1a1a] border-1 border-[#fff5] ${
                  btn === currentPage
                    ? 'bg-gray-700'
                    : 'bg-black'
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentpage(currentPage + 1)}
            disabled={currentPage === noOfPage}
            className="bg-[#1a1a1a] mr-6 px-5 py-3 border-1 border-[#fff5] rounded text-[1.5rem]"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default MainContent;

import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = ({dropDown}: {dropDown: boolean}) => {
    const [categories, setCategories] = useState<string[]>([]);
    const {
        searchQuery,
        setSearchQuery,
        selectCategory,
        setSelectCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        setKeyword
    } = useFilter();

    const [keywords] = useState([
        "apple",
        "Watch",
        "Fashion",
        "Trend",
        "Shoes",
        "Shirt"
    ]);


    const handleClick = () => {
        setSelectCategory('')
        setSearchQuery('');
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setKeyword('');
    }

    useEffect(() => {
        const fetchCategory = async () => {
            try {
              const response = await fetch(`https://dummyjson.com/products`);
              const data: FetchResponse = await response.json();
              const uniqueCategory = Array.from(new Set(data.products.map(({category}) => category)))
              setCategories(uniqueCategory);
              console.log(uniqueCategory);
            } catch(error) {
              console.error(error)
            }
          }

        fetchCategory();
    }, [])

  return (
      <div 
            id="sidebar" 
            className={`fixed top-0 left-0 sm:h-screen w-full max-w-[350px] p-5
            flex flex-col justify-center
            text-gray-200 z-10
            backdrop-blur-lg bg-white/10
            transform transition-transform duration-300 ease-in-out
            ${dropDown ? '-translate-x-full' : 'translate-x-0'}
            xl:static xl:translate-x-0`}>
              
        <div className=" flex items-center xl:mt-0 sm:mt-10 mt-10">
          <h1 className="text-2xl font-semibold">React Store</h1>
        </div>

        <section className="my-4 flex flex-wrap space-y-4 sm:space-y-2">
          <input type="text" placeholder="...Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border-1 border-gray-500 px-3 py-2 rounded-md w-full  outline-none focus:outline-none" />

          <div className="flex gap-4">
              <input 
                type="text"
                placeholder="min"
                value={minPrice ?? ""} 
                onChange={(e) => setMinPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
                className="border border-gray-500 px-3 py-3 w-1/2 rounded-lg  outline-none focus:outline-none" /> 

              <input 
              placeholder="max" 
              value={maxPrice ?? ""} 
              onChange={(e) => setMaxPrice(e.target.value ? parseFloat(e.target.value) : undefined)} 
              className="border border-gray-500 px-3 py-2 w-1/2 rounded-lg  outline-none focus:outline-none" 
              />
      
          </div>
        </section>

        <div className="my-4 flex flex-col sm:flex-1 justify-center space-y-4">
          <h1 className="text-2xl">Category</h1>
            {
              categories.map((category, index) => (
                <label htmlFor={category} key={index}>
                  <input type="radio" name="category" checked={selectCategory === category} value={category} onChange={e => {
                    setSelectCategory(e.target.value); console.log(e.target.value);
                  }} className="mr-2" id={category} />
                  <span className="text-white font-semibold text-[1.2rem]">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                </label>
              ))
            }
        </div>

        <div className="keyword flex flex-col my-4 sm:flex-grow-1 justify-center space-y-5">
            <h1 className="text-2xl">Keyword</h1>

            <div className="flex flex-col space-y-5"> 
              {keywords.map((keys, index) => (
                <button onClick={() => {setKeyword(keys); console.log(keys);}} className="py-2 pl-4 border-l-5 border-white hover:bg-gray-100 text-left hover:text-blue-500 text-white font-semibold text-[1.1rem]" key={index}>{keys.charAt(0).toUpperCase() + keys.slice(1)}</button>
            ))}
            </div>
        </div>

        <button onClick={handleClick} className="py-2 px-10 bg-black text-white text-[1.2rem] mt-4 rounded-lg w-full">Reset</button>
    </div>
  )
}

export default Sidebar;
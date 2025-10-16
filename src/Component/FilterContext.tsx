import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

interface ContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectCategory: string;
  setSelectCategory: (query: string) => void;
  minPrice: number | undefined;
  setMinPrice: (price: number | undefined) => void;
  maxPrice: number | undefined;
  setMaxPrice: (price: number | undefined) => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
}

const FilterContext = createContext<
  undefined | ContextType
>(undefined);

export const FilterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [searchQuery, setSearchQuery] =
    useState<string>('');
  const [selectCategory, setSelectCategory] =
    useState<string>('');
  const [minPrice, setMinPrice] = useState<
    number | undefined
  >(0);
  const [maxPrice, setMaxPrice] = useState<
    number | undefined
  >(0);
  const [keyword, setKeyword] = useState<string>('');

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectCategory,
        setSelectCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error(
      'Must used within the a FilterProvider'
    );
  } else {
    return context;
  }
};

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export interface ProductDetail {
    images: string[];
    title: string;
    description: string;
    price: string;
    rating: string;
}

const ProductTags = () => {
    const { id } = useParams<{id: string}>();
    const [product, setProduct] = useState<ProductDetail | undefined>(undefined);
    const Navigate = useNavigate();

    useEffect(() => {
        
        fetch(`https://dummyjson.com/products/${id}`)
            .then(data => data.json())
            .then(data => setProduct(data))

    }, [id])


    if(!product) return <div  className="text-3xl text-white text-center">...Loading</div>

  return (
    <div className="min-h-screen bg-[#10172a] flex justify-center items-start py-10 px-4">
      <div className="bg-[#1f2937] rounded-2xl shadow-lg p-8 w-full max-w-4xl text-gray-200">
        <button
          onClick={() => Navigate(-1)}
          className="mb-6 px-4 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] transition-colors duration-200 text-white rounded-lg"
        >
          ← Back
        </button>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full md:w-[40%] rounded-xl shadow-md"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-400 mb-6 leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-8">
              <p className="text-lg font-semibold text-green-400">Price: ${product.price}</p>
              <p className="text-lg font-semibold text-yellow-400">Rating: {product.rating}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTags
import { FaCartPlus, FaFire, FaReact } from "react-icons/fa";
import { Link } from "react-router-dom";

interface CardProps {
    title: string;
    thumbnail: string;
    price: number;
    id: number
}

const Card = ({title, thumbnail, price, id}: CardProps) => {
  return (
       <Link to={`products/${id}`}>
            <div key={id} className="w-[350px] sm:w-[370px] text-[#eee] relative font-semibold">
                <div className="author bg-[#1e293b] w-[60%] h-[70px] grid grid-cols-[50px_1fr] gap-4 rounded-t-[30px] p-3">
                <div> <FaReact className="h-full w-full" /> </div> 
                <div className="name font-mono">
                    <div className=" text-[1.5rem]">React</div><span className="">Store</span>
                </div> 
                </div>

                <div className="image bg-[#1e293b] text-center rounded-tr-[30px]">
                    <img
                        src={thumbnail}
                        alt=""
                        width="90%"
                        className="transform rotate-[15deg] transition duration-500 hover:rotate-[25deg] hover:scale-100 hover:translate-x-[10px] hover:translate-y-[-20px]"
                    />
                </div>

                <div className="info bg-[#1e293b] p-7 text-center text-[1rem] ">
                    <div className="name text-[1.7rem]">{title.split(" ").slice(0, 3).join(" ")}</div>
                    <div className="price">${price}</div>
                </div>

                <div className="more flex justify-between bg-[#1e293b] px-7 pb-7 pt-0 flex rounded-b-[30px]">
                    <div className="button flex gap-2 items-center">
                        <button 
                        className="flex items-center justify-center text-[#eee] bg-[#1e293b] w-[40px] h-[40px] rounded-full border-1 border-[#454545] ">
                        <FaCartPlus/>
                        </button>

                        <button 
                        className="text-[#eee] bg-[#1e293b] py-2 px-5 rounded-full border-1 border-[#454545] ">Buy Now</button>
                    </div>

                    <div className="options ">
                        <label htmlFor="">Options</label>

                        <ul className="flex p-1 items-center justify-center gap-2">
                            <li style={{color: "#fe6969"}} className="w-[15px] h-[15px] bg-[#fe6969] rounded-full"></li>
                            <li className="w-[15px] rounded-full h-[15px] bg-[#ffa666]" style={{color: "#ffa666"}}></li>
                            <li className="w-[15px] rounded-full h-[15px] bg-[#ffdd66]" style={{color: "#ffdd66"}}></li>
                            <li className="w-[15px] rounded-full h-[15px] bg-[#323232]" style={{color:" #323232"}}></li>
                        </ul>
                    </div>
                </div>

                <div 
                className="absolute top-0 right-0 h-[70px] w-[40%] flex items-center justify-center font-bold text-lg shadow-[-30px_30px_0_#1e293b] rounded-bl-[30px]">
                </div>

                <div 
                className="absolute bg-[#1e293b] h-[60px] top-0 right-0 w-[calc(40%-10px)] rounded-[30px] flex items-center justify-center text-[1.2rem] font-bold">
                    <FaFire className="text-yellow-300 pr-2 w-7 h-7" /> Popular
                </div>
            </div>
       </Link>

  )
}

export default Card;
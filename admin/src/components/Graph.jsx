import { assets } from "../assets/admin_assets/assets";
import { useState, useEffect, useContext } from "react";
import { Switch } from "@material-tailwind/react";
import { AuthContext } from "../context/AuthContext";

const Graph = () => {
    const { currency ,role  } = useContext(AuthContext)
    const [count, setCount] = useState(0);
    const targetValue = 200;  
    const duration = 1000;  

    useEffect(() => {
        let start = 0;
        const incrementTime = 50;
        const increment = targetValue / (duration / incrementTime);

        const timer = setInterval(() => {
            start += increment;
            if (start >= targetValue) {
                clearInterval(timer);
                setCount(targetValue);
            } else {
                setCount(Math.ceil(start));
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [targetValue]);

    return (
        <div className="p-4 bg-gray-100 w-full">
            <div className="flex flex-col md:flex-row justify-between mb-16 space-y-4 md:space-y-0 md:space-x-4">
                {["Total Sales", "Total Orders", "Total Vendors", "Total Products"].map((label, idx) => (
                    <div
                        key={label}
                        className="flex justify-between items-center hover:scale-105 transform transition duration-300 ease-in-out border-2 border-black-600 rounded-lg p-4 bg-opacity-50 backdrop-blur-md shadow-lg w-full md:w-1/4"
                    >
                        <div>
                            <p className="text-sm sm:text-xs md:text-lg">{label}</p>
                            <p className="font-bold text-sm sm:text-xs md:text-lg">{currency}{count}</p>
                        </div>
                        <div>
                            <img className="w-10 sm:w-12 md:w-16 h-6 sm:h-8 md:h-12" src={assets[`Graph_${idx + 1}`]} alt="" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">

                {/* Today's Sales Status for Vendor */}
                {role==="Vendor"?<section className="h-auto w-full md:w-2/4 border-2 rounded-lg p-4 shadow-lg">
                    <div className="flex justify-between mb-4">
                        <p className="font-semibold text-sm sm:text-xs md:text-lg">Today's Sales Status</p>
                        {/* more info component */}
                        <More to={"/totalsalesview"}/>
                    </div>
                    <div className="items-center h-64 w-full overflow-y-auto scroll-smooth p-4 bg-gray-100 scrollbar-hide">
                        <table className="w-full text-center">
                            <thead>
                                <tr>
                                    <th className="p-2 text-sm sm:text-sm">Product Name</th>
                                    <th className="p-2 text-sm sm:text-sm">Quantity</th>
                                    <th className="p-2 text-sm sm:text-sm">Price</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white border-b-2">
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <tr key={index} className="border-b-2">
                                        <td className="p-2 text-sm sm:text-sm">Cotton Shirt</td>
                                        <td className="p-2 text-sm sm:text-sm">1</td>
                                        <td className="p-2 text-sm sm:text-sm">230</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between mt-4">
                        <p className="font-semibold text-sm sm:text-xs md:text-lg">Total Sales</p>
                        <p className="text-sm sm:text-xs md:text-lg">1234</p>
                    </div>
                </section>:""}
                
                {/* Today's Total Sales for admin Status */}
                {role==="Admin"?<section className="h-auto w-full md:w-2/4 border-2 rounded-lg p-4 shadow-lg">
                    <div className="flex justify-between mb-4">
                        <p className="font-semibold text-sm sm:text-xs md:text-lg">Today's Sales Status</p>
                        {/* more info component */}
                        <More to={"/totalsalesview"}/>
                    </div>
                    <div className="items-center h-64 w-full overflow-y-auto scroll-smooth p-4 bg-gray-100 scrollbar-hide">
                        <table className="w-full text-center">
                            <thead>
                                <tr>
                                    <th className="p-2 text-sm sm:text-sm">Vendor Name</th>
                                    <th className="p-2 text-sm sm:text-sm">Sales</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white border-b-2">
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <tr key={index} className="border-b-2">
                                        <td className="p-2 text-sm sm:text-sm">Cotton Shirt</td>
                                        <td className="p-2 text-sm sm:text-sm">230</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between mt-4">
                        <p className="font-semibold text-sm sm:text-xs md:text-lg">Total Sales</p>
                        <p className="text-sm sm:text-xs md:text-lg">1234</p>
                    </div>
                </section>:""}
                {/* Vendor Status */}
                {role==="Admin"?<section className="h-auto w-full md:w-2/4 border-2 rounded-lg p-4 shadow-lg">
                    <div className="flex justify-between mb-4">
                        <p className="font-semibold text-sm sm:text-xs md:text-lg">Vendor Status</p>
                        <More to={"/vendor-list"}/>
                    </div>
                    <div className="items-center h-64 w-full overflow-y-auto scroll-smooth p-4 bg-gray-100 scrollbar-hide">
                        <div className="flex justify-between mb-2 text-sm sm:text-xs md:text-lg">
                            <p>Vendors</p>
                            <p>Name</p>
                            <p>Status</p>
                        </div>
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="flex justify-between items-center mt-1">
                                <img className="rounded-full w-6 sm:w-10" src={assets.order_icon} alt="Admin Logo" />
                                <p className="text-sm sm:text-xs md:text-lg">Vendor Name</p>
                                <Switch
                                    ripple={false}
                                    className="h-full w-full checked:bg-[#2ec946]"
                                    containerProps={{ className: "w-11 h-6" }}
                                    circleProps={{ className: "before:hidden left-0.5 border-none" }}
                                />
                            </div>
                        ))}
                    </div>
                </section>:""}
            </div>
        </div>
    );
};

export const More = ({to})=>{
    const {navigate} = useContext(AuthContext)
return(
<p className="flex items-center text-sm sm:text-xs cursor-pointer" onClick={()=>navigate(to)}>
                            more
                            <span className="ml-1">
                                <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <line x1="13" y1="18" x2="19" y2="12" />
                                    <line x1="13" y1="6" x2="19" y2="12" />
                                </svg>
                            </span>
                        </p>
)
}
export default Graph;

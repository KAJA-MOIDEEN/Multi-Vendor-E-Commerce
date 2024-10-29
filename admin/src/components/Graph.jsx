import { assets } from "../assets/admin_assets/assets"
import { useState, useEffect } from "react";
import { Switch } from "@material-tailwind/react";


const Graph = ()=>{
    const [count, setCount] = useState(0);  // Initial count starts at 0
    const targetValue = 200;  // Target value for counting up
    const duration = 1000;   // Animation duration in milliseconds

    useEffect(() => {
        let start = 0;
        const end = targetValue;
        const incrementTime = 50; // Update frequency in ms (higher frequency = smoother animation)
        const increment = end / (duration / incrementTime); 

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                clearInterval(timer);
                setCount(end);  // Set to target value when done
            } else {
                setCount(Math.ceil(start)); // Rounding up for integer effect
            }
        }, incrementTime);

        return () => clearInterval(timer); // Cleanup interval on component unmount
    }, [targetValue]);
    return(
        <div>
            <div className="md:flex justify-between mb-16 ">
                <div className="flex justify-between hover:scale-110 transform transition duration-300 ease-in-out border-solid border-2 border-black-600 rounded-lg p-4 bg-opacity-50 backdrop-blur-md shadow-lg">
                    <div>
                        <p className="md:text-xl">Total Sales</p>
                        <p className="font-bold md:text-xl">${count}</p>
                    </div>
                    <div>
                        <img className="w-20 h-12 " src={assets.Graph_1} alt="" />
                    </div>
                </div>
                
                <div className="flex justify-between hover:scale-110 transform transition duration-300 ease-in-out border-solid border-2 border-black-600 rounded-lg p-4 bg-opacity-50 backdrop-blur-md shadow-lg">
                <div>
                        <p className="md:text-xl">Total Orders</p>
                        <p className="font-bold md:text-xl">{count}</p>
                    </div>
                    <div>
                        <img className="w-20 h-12 " src={assets.Graph_2} alt="" />
                    </div>
                </div>

                <div className="flex justify-between hover:scale-110 transform transition duration-300 ease-in-out border-solid border-2 border-black-600 rounded-lg p-4 bg-opacity-50 backdrop-blur-md shadow-lg">
                <div>
                        <p className="md:text-xl">Total Vendors</p>
                        <p className="font-bold md:text-xl">{count}</p>
                    </div>
                    <div>
                        <img className="w-20 h-12" src={assets.Graph_3} alt="" />
                    </div>
                </div>

                <div className="flex justify-between hover:scale-110 transform transition duration-300 ease-in-out border-solid border-2 border-black-600 rounded-lg p-4 bg-opacity-50 backdrop-blur-md shadow-lg">
                <div>
                        <p className="md:text-xl">Total Products</p>
                        <p className="font-bold md:text-xl">{count}</p>
                    </div>
                    <div>
                        <img className="w-20 h-12" src={assets.Graph_4} alt="" />
                    </div>
                </div>
            </div>

            <div className="flex justify-between">
            <section className="h-auto w-1/3 border-2 rounded-lg p-4">
                <div className="flex justify-between mb-4">
                    <p className="font-semibold">Today's Sales Status</p>
                        <p className="flex items-center"> 
                            more 
                            <span className="ml-1">
                                <svg
                                    className="h-4 w-4 text-gray-500"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <line x1="13" y1="18" x2="19" y2="12" />
                                    <line x1="13" y1="6" x2="19" y2="12" />
                                </svg>
                            </span>
                        </p>
                </div>
                    <div className="items-center h-64 w-full overflow-y-auto scroll-smooth p-4 bg-gray-100">
                        <table className="w-full text-center">
                            <thead >
                                <tr>
                                    <th className="p-2">Product Name</th>
                                    <th className="p-2">Quantity</th>
                                    <th className="p-2">Price</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white border-b-2">
                                <tr className="bg-white border-b-2">
                                    <td className="p-2">Cotton Shirt</td>
                                    <td className="p-2">1</td>
                                    <td className="p-2">230</td>
                                </tr>
                                <tr className="bg-white border-b-2">
                                    <td className="p-2">Cotton Shirt</td>
                                    <td className="p-2">1</td>
                                    <td className="p-2">230</td>
                                </tr>
                                <tr className="bg-white border-b-2">
                                    <td className="p-2">Cotton Shirt</td>
                                    <td className="p-2">1</td>
                                    <td className="p-2">230</td>
                                </tr>
                                <tr className="bg-white border-b-2">
                                    <td className="p-2">Cotton Shirt</td>
                                    <td className="p-2">1</td>
                                    <td className="p-2">230</td>
                                </tr>                                <tr className="bg-white border-b-2">
                                    <td className="p-2">Cotton Shirt</td>
                                    <td className="p-2">1</td>
                                    <td className="p-2">230</td>
                                </tr>
                                <tr className="bg-white border-b-2">
                                    <td className="p-2">Cotton Shirt</td>
                                    <td className="p-2">1</td>
                                    <td className="p-2">230</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between m-6">
                        <p className="font-semibold">Total Sales</p>
                        <p>1234</p>
                    </div>
            </section>    

            <div>
                <div className="flex justify-between">
                    <p>Vendor Status</p>
                    <p className="flex items-center"> 
                            more 
                            <span className="ml-1">
                                <svg
                                    className="h-4 w-4 text-gray-500"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <line x1="13" y1="18" x2="19" y2="12" />
                                    <line x1="13" y1="6" x2="19" y2="12" />
                                </svg>
                            </span>
                        </p>
                </div>
                <div className="items-center h-64 w-full overflow-y-auto scroll-smooth p-4 bg-gray-100">
                    <div className="flex justify-between">
                        <p>Vendors</p>
                        <p>Status</p>
                    </div>
                        <div className="flex justify-between">
                            <img className="rounded-full" src={assets.Admin_logo} alt="" />
                            <p className="pl-4">
                                <Switch
                                    // id={index}
                                    // checked={item.status} // Set checked based on item.status
                                    // onChange={() => updateStatus(item._id, !item.status)} // Toggle status on change
                                    ripple={false}
                                    className="h-full w-full checked:bg-[#2ec946]"
                                    containerProps={{
                                    className: "w-11 h-6",
                                    }}
                                    circleProps={{
                                    className: "before:hidden left-0.5 border-none",
                                    }}
                                />
                            </p>
                        </div>
                        

                 </div>

            </div>  
            </div>

            
            
        </div>
    )
}

export default Graph
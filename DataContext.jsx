import { createContext, useState } from "react";
import axios from "axios";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]); // initialize as empty array

    const fetchAllProducts = async () => {
        try {
           const res = await axios.get('https://fakestoreapi.com/products')
           console.log(res.data);
           setData(res.data); // no .products here
        } catch (error) {
            console.log(error);
        }
    }

    const getUniqueCategory = (data, property)=>{
        let newVAL = data?.map((curElem)=>{
            return curElem[property]
        })
        newVAL = ["All",...new Set(newVAL)]
        return newVAL
    }

    const categoryOnlyData = getUniqueCategory(data,'category')

    return (
        <DataContext.Provider value={{ data, setData, fetchAllProducts,categoryOnlyData}}>
            {children}
        </DataContext.Provider>
    )
}


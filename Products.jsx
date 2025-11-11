import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext'
import FilterSection from '../components/FilterSection'
import Loading from '../assets/Loading4.webm'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json"


const Products = () => {
    const { data, fetchAllProducts } = useContext(DataContext)

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("All")
    const [priceRange, setPriceRange] = useState([0, 2000])
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchAllProducts()
        window.scrollTo(0,0)
    }, [])

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
        setPage(1)

    }

    const pageHandler = (selectedPage) => {
        setPage(selectedPage)
    }


    const filteredData = data?.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "All" || item.category === category) &&
        item.price >= priceRange[0] && item.price <= priceRange[1]
    )

    const dynamicPage = Math.ceil(filteredData?.length / 4)



    return (
        <div>
            <div className='max-w-6xl mx-auto px-4 mb-10'>
                {data?.length > 0 ? (
                    <>
                        <div className='flex gap-8'>

                            <FilterSection
                                search={search}
                                setSearch={setSearch}
                                category={category}
                                setCategory={setCategory}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                handleCategoryChange={handleCategoryChange}
                            />

                            {
                                filteredData?.length > 0 ? (
                                    <div className='flex flex-col justify-center items-center'>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                                            {filteredData?.slice(page * 4 - 4, page * 4).map((product, index) => (
                                                <ProductCard key={index} product={product} />
                                            ))}
                                        </div>
                                        <Pagination pageHandler={pageHandler} page={page} dynamicPage={dynamicPage} />
                                    </div>
                                ) : (
                                    <div className='flex justify-center items-center md:h-[600px] md:w-[900px] mt-10'>
                                        <Lottie animationData={notfound} className="w-[500px]" />

                                    </div>
                                )
                            }


                        </div>


                    </>
                ) : (
                    <div className='flex flex-col gap-3 justify-center items-center h-[600px]'>
                        <video muted autoPlay loop>
                            <source src={Loading} type="video/webm" />
                        </video>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Products

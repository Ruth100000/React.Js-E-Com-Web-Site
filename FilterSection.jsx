import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'

const FilterSection = ({search, setSearch, priceRange, setPriceRange, category, setCategory, handleCategoryChange}) => {
    const { categoryOnlyData} = useContext(DataContext)

    return (
        <div className='bg-gray-100 mt-10 p-4 rounded-md h-max'>
            <input
                type='text'
                placeholder='Search'
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className='bg-white p-2 rounded-md border-gray-400 border-2 w-full'
            />

            {/* category only data */}
            <h1 className='mt-5 font-semibold text-xl'>Category</h1>

            <div className='flex flex-col gap-3 mt-3'>
                {categoryOnlyData?.map((item, index) => (
                    <div key={index} className='flex gap-2 items-center'>
                        <input type='checkbox' name='{item}' checked={category===item} value={item} onChange={handleCategoryChange} />
                        <button className='cursor-pointer uppercase text-sm'>{item}</button>
                    </div>
                ))}
            </div>

            {/* Price range */}
            <h1 className='mt-5 font-semibold text-xl mb-3'>Price Range</h1>
            <div className='flex flex-col gap-2'>
                <label htmlFor="">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
                <input type="range" min="0" max="2000" name='' id='' value={priceRange[1]} onChange={(e) =>setPriceRange([priceRange[0], Number(e.target.value)])}/>
            </div>

            <button className='bg-red-500 text-white rounded-md px-3 mt-5 cursor-pointer'
            onClick={()=>{setSearch(''); setCategory('All'); setPriceRange([0, 2000])}}
            >
                Reset Filter</button>
        </div>
    )
}

export default FilterSection

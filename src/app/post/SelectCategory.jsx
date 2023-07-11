'use client'
import LoadCategory from "@/components/LoadCategory"
import { useAllCategorys } from "@/hooks/fetchData"

const SelectCategory = ({ formik,setCategoryName }) => {
  const {isLoading, data, isError} = useAllCategorys()
  if (isLoading) return <LoadCategory />
  if (isError) {
    return <LoadCategory />
  }
  
  const selectCategory = (id, name) => {
    formik.setFieldValue('category', id)
    setCategoryName(name)
  }

  return (
    <>
      <ul className='flex-1'>
        {data?.map(item => (
          <div key={item._id} className='flex items-center gap-x-2 border-b py-5 cursor-pointer hover:bg-gray-50'
            onClick={() => selectCategory(item._id,item.title)}>
            <p dangerouslySetInnerHTML={{ __html: item.icon }} />
            <p className='text-gray-500 text-sm'>{item.title}</p>
          </div>
        ))}
      </ul>
    </>
  )
}

export default SelectCategory
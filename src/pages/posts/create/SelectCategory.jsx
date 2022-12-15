import { toast } from "react-toastify"
import LoadCategory from "../../../components/LoadCategory"
import useFetch from "../../../hooks/useFetch"

const SelectCategory = ({ selectCategory }) => {
  const { data, loading, error } = useFetch(`${process.env.REACT_APP_BASE_API_URL}/api/post-category`)
  if (loading) return <LoadCategory />
  if (error) {
    toast.error(error.message)
    return <LoadCategory />
  }

  return (
    <>
      <ul className='flex-1'>
        {data?.map(item => (
          <div key={item._id} className='flex items-center gap-x-2 border-b py-5 cursor-pointer hover:bg-gray-50'
            onClick={() => selectCategory(item._id, item.title)}>
            <p dangerouslySetInnerHTML={{ __html: item.icon }} />
            <p className='text-gray-500 text-sm'>{item.title}</p>
          </div>
        ))}
      </ul>
    </>
  )
}

export default SelectCategory
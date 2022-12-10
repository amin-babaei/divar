import AdsItem from '../components/ads/AdsItem'
import useFetch from "../hooks/useFetch.js";
import {toast} from "react-toastify";
import Loading from "../components/Loading";

const AdsContainer = () => {
  const {data, loading, error} = useFetch(`${process.env.REACT_APP_BASE_URL}/api/posts`)
  if (loading) return <Loading/>
  if (error) {
      toast.error(error.message)
  }
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 mt-12 md:mt-28 sm:mr-72">
          <AdsItem data={data}/>
    </div>
  )
}

export default AdsContainer
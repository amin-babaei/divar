import React from 'react'
import AdsItem from '../components/ads/AdsItem'

const AdsContainer = () => {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 mt-12 md:mt-28 sm:mr-72">
          <AdsItem/>
    </div>
  )
}

export default AdsContainer
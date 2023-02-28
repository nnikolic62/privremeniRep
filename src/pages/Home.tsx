import React from 'react'
import storeItems from '../data/storeItems.json'

function Home() {
  return (
    <div>
      <p>home</p>
      <img src={storeItems[0].imgUrl} />
    </div>
  )
}

export default Home

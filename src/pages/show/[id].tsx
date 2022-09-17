import type { NextPage } from 'next'
import React from 'react'

const Show: NextPage = () => {
  return (
    <>
      <React.Suspense fallback={<div>Loading...</div>}>
        <div>Show</div>
      </React.Suspense>
    </>
  )
}

export default Show

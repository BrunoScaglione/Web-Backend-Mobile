import React from 'react'

// vai ser a legenda das cores 

export default  function MissionKey() {
  return (
    <div className={my-3}>
      <p>
        <span className="px-3 mr-2 bg-sucess" /> = Sucess
      </p>
      <p>
        <span className="px-3 mr-2 bg-danger" /> = Fail
      </p>
    </div>
  )
}
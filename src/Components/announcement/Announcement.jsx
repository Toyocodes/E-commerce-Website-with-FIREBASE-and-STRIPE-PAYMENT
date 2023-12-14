import React from "react"
import banner1 from '../../assets/images/banner-1.png'
import banner2 from '../../assets/images/banner-2.png'
import "./Announcement.css"

const  Announcement = () => {
  // const mystyle = {
  //   width: "30%",
  //   height: "400px",
  // }
  // const mystyle1 = {
  //   width: "68%",
  //   height: "340px",
  // }
  return (
    <>
      <section className='annocument background px-[6%]'>
        <div className='container d_flex'>
          <div className='img w-[35%] h-[340px]'>
            <img src={banner1} height='100%' />
          </div>
          <div className='img w-[68%] h-[340px]' >
            <img src={banner2} width='100%' height='100%' />
          </div>
        </div>
      </section>
    </>
  )
}

export default Announcement

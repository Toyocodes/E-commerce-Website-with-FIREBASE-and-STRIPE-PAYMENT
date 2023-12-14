import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Img1 from '../../assets/flash/flash-1.png'
import Img2 from '../../assets/flash/flash-2.png'
import Img3 from '../../assets/flash/flash-3.png'
import Img4 from '../../assets/flash/flash-4.png'
import Img5 from '../../assets/flash/flash-5.png'
import Img6 from '../../assets/flash/flash-6.png'
import Img7 from '../../assets/flash/flash-7.png'

const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <i className='fa fa-long-arrow-alt-right'></i>
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <i className='fa fa-long-arrow-alt-left'></i>
      </button>
    </div>
  )
}

function App() {
  const settings = {
    dots: true,
    infinite: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    arrows:true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className='px-[10%] sm:px-[6%]'>
      <div className="mt-20">
      <Slider {...settings}>
        {data.map((d) => (
          <div key={d.name} className="bg-gray-100 text-black rounded-xl">
            <div className='h-40 flex justify-center items-center rounded-t-xl rounded-b-xl pt-10'>
              <img src={d.image} alt="sales " className="h-44 w-44"/>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-4 p-4 mt-8">
              {/* <p className="text-[16px] font-semibold">{d.name}</p> */}
              <div className='rate text-yellow-500'>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
                <i className='fa fa-star'></i>
            </div>
              {/* <button className='bg-red-500 text-white text-[14px] px-4 py-1 rounded-xl'>buy now</button> */}
            </div>
          </div>
        ))}
      </Slider>
      </div>
      
    </div>
  );
}

const data = [
  {
   
    image: Img1,
   
  },
  {
   
    image: Img2,
   
  },
  {
  
    image: Img3,
   
  },
  {
   
    image: Img4,
    
  },
  {
   
    image: Img5,
    
  },
  {
   
    image: Img6,
    
  },
  {
   
    image: Img7,
    
  },
 
 
 
];

export default App;
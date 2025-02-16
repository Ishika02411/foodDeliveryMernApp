import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
//import Carousel from '../components/Carousel'
import { useEffect, useState } from 'react'

export default function Home() {
  const [search, setsearch] = useState('');
  const [fooCateg, setfooCateg] = useState([]);
  const [fooItem, setfooItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:8000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    // console.log(response[0], response[1]);

    // ✅ Store fetched data in state
    setfooItem(response[0]);  // Assuming first array contains items
    setfooCateg(response[1]); // Assuming second array contains categories
  }

  useEffect(() => {
    loadData()
  }, []          // [] inside this we give dependencies so that loke on changing footer this state will change otherwise stare will not change without change footer,, but if we keep it empty means only function will call on first load
  );


  return (
    <>
      <div> <Navbar /> </div>
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='car'>
<div className='carousel-caption' style={{zIndex : "10"}}>
<div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}}/>


      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
</div>

    <div className="carousel-item active">
      <img src="https://thumbs.dreamstime.com/b/pizza-hum-cheese-tomato-pepper-slice-34972007.jpg" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://img.lovepik.com/photo/48015/7094.jpg_wh860.jpg" className="d-block w-100 h-50" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg" alt="crypto" className="d-block w-100" />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div></div>




      <div className='container'>
        {
          fooCateg !== [] ?
            fooCateg.map((data) => {
              return (<div className='row mb-3'>
                <div key={data._id}>{data.CategoryName}</div>
                <hr />
                {fooItem !== [] ?
                  fooItem.filter((item) => (item.CategoryName === data.CategoryName)&& (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                  .map(filterItems => {
                    return (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                        <Card fooItem= {filterItems}  // now all data is in fooditem, ab props ki need nhi hogi,this will use in usecontext
                        
                        
                              options ={filterItems.options[0]}
                             
                             ></Card>
                        <br></br>
                        <br></br>
                        <br></br>
                      </div>
                    )
                  })
                  : <div>no data found</div>}

              </div>
              )
            })
            : <div>""""""""</div>
        }
      </div>
      <br></br>
      <div> <Footer /></div>
    </>
  )
}
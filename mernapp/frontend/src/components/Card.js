import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './contextReducer';

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();

  const priceRef = useRef();

  let optiions = props.options;
  let priceOptions = Object.keys(optiions);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const handelAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.fooItem._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.fooItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size){
        await dispatch({ type: "ADD", id: props.fooItem._id, name: props.fooItem.name, price: finalPrice, qty: qty, size: size })
      return
      // console.log(data);
    }
    return
  }

    await dispatch({ type: "ADD", id: props.fooItem._id, name: props.fooItem.name, price: finalPrice, qty: qty, size: size })
  }
  let finalPrice = qty * parseInt(optiions[size]);
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])


  return (
    <div>
      <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
        <img src={props.fooItem.img} className="card-img-top" alt="..." style={{ objectFit: "fill", height: "120px" }} />
        <div className="card-body ">
          <h5 className="card-title">{props.fooItem.name}</h5>
          {/* <p className="card-text">{props.descrp}</p> */}
          <div className="container w-100">
            <select className="m-2 h-100  bg-success rounded" onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (<option key={i + 1} value={i + 1}> {i + 1}</option>)
              })}
            </select>

            <select className="m-2 h-100  bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })}
            </select>
            <div className="d-inline fs-5 h-100">Rs{finalPrice}/-</div>
          </div>

        </div>
        <button className={`btn justify-center btn-success ms-2`} onClick={handelAddToCart}>Add To Cart</button>
      </div>
    </div>
  )
}
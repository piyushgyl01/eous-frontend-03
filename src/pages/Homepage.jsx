import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../features/product/productSlice";

export default function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className=" py-4 bg-black" id="ehhe">
        <main className="container py-4">
          <Link to="/products">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mb-4"
            >
              <SwiperSlide>
                <img
                  className="img-fluid rounded w-100"
                  src="https://github.com/piyushgyl01/images-db/blob/main/pc1.png?raw=true"
                  alt="slide-01"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="img-fluid rounded w-100"
                  src="https://github.com/piyushgyl01/images-db/blob/main/image%206.png?raw=true"
                  alt="slide-02"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="img-fluid rounded w-100"
                  src="https://github.com/piyushgyl01/images-db/blob/main/image%205.png?raw=true"
                  alt="slide-03"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="img-fluid rounded w-100"
                  src="https://github.com/piyushgyl01/images-db/blob/main/image%207.png?raw=true"
                  alt="slide-04"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="img-fluid rounded w-100"
                  src="https://github.com/piyushgyl01/images-db/blob/main/image%205.png?raw=true"
                  alt="slide-05"
                />
              </SwiperSlide>
            </Swiper>
          </Link>
          <div className="row">
            <h1 className="text-center text-light display-6  pt-4">
              Choose Your Build Type
            </h1>
            <p className="text-center text-light opacity-75">
              From budget builds to high-end workstations, we've got you
              covered!
            </p>
            <div
              className="col-md-4 pt-4"
              onClick={() => {
                dispatch(setCategory("Budget"));
                navigate("/products");
              }}
            >
              <img
                className="img-fluid rounded"
                src="https://th.bing.com/th/id/OIG3.fTgzY8dAI.fueqp7Tju.?pid=ImgGn"
                alt="budget-pc"
              />
            </div>
            <div
              className="col-md-4 pt-4"
              onClick={() => {
                dispatch(setCategory("Premium"));
                navigate("/products");
              }}
            >
              <img
                className="img-fluid rounded"
                src="https://th.bing.com/th/id/OIG3.VCXu_wR1PLvVBgB3Qght?pid=ImgGn"
                alt="premium-pc"
              />
            </div>
            <div
              className="col-md-4 pt-4"
              onClick={() => {
                dispatch(setCategory("Ultra-Premium"));
                navigate("/products");
              }}
            >
              <Link to="/products?category=Women">
                <img
                  className="img-fluid rounded"
                  src="https://th.bing.com/th/id/OIG3.A2J6pM105wEVXUQW_cLP?w=1024&h=1024&rs=1&pid=ImgDetMain"
                  alt="ultra-premium-pc"
                />
              </Link>
            </div>
          </div>
          <div className="row ">
            <h1 className="text-center text-light display-6 mt-4  pt-4">
              Premium Components
            </h1>
            <p className="text-center text-light opacity-75">
              From GPUs to CPUs, we stock only the best!
            </p>
            <div className="col-md-6  mt-4 pt-4">
              <img
                className="img-fluid rounded"
                src="https://th.bing.com/th/id/OIG1.xVklgl5aTrQS8uUk6bsF?w=1024&h=1024&rs=1&pid=ImgDetMain"
                alt=""
              />
            </div>
            <div className="col-md-6  mt-4 pt-4">
              <img
                className="img-fluid rounded"
                src="https://th.bing.com/th/id/OIG3.zz0OE7iKxv5Y4K05Mz4W?w=1024&h=1024&rs=1&pid=ImgDetMain"
                alt=""
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-3"></div>
            <div className="col-md-6 mt-3 pt-2">
              <img
                className="img-fluid rounded"
                src="https://th.bing.com/th/id/OIG4.aIndyMw5gZOHqWvoFcVc?pid=ImgGn"
                alt=""
              />
            </div>
            <div className="col-md-3"></div>
          </div>
        </main>
      </div>
    </>
  );
}

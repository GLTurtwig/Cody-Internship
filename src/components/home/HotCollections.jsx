// https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {

  const [ hotCollection, setHotCollection ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(
                  "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
              );
              setHotCollection(response.data);
              
           } catch (err) {
              console.error(err);
           } finally {
              setLoading(false);
           }
      };

      fetchData();
  }, []);

  const arrowLeft = "<";
  const arrowRight = ">";

  
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      mode: 'snap',
      slides: 
      {
        perView: 4,
        spacing: 10,
      },
      breakpoints: {
        "(max-width: 1200px)": {
          slides: {
            perView: 3,
            spacing: 10,
          },
          },
          "(max-width: 992px)": {
            slides: {
              perView: 2,
              spacing: 10,
            },
          },
          "(max-width: 576px)": {
            slides: {
              perView: 1,
              spacing: 10,
            }
          },
      },
    },
    [
      // add plugins here
    ]
  )

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [hotCollection, instanceRef]);

  const handleImageLoad = () => {
    instanceRef.current?.update();
  };
  console.log(hotCollection)


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

         
            <div className="slider__wrapper">

            <button className="owl-prev"onClick={() => instanceRef.current?.prev()}>
              {arrowLeft}
            </button>
            <div ref={sliderRef} className="keen-slider">
            { 
                      loading ?  [...Array(4)].map((_, index) => (
                            <div className="keen-slider__slide" key={index}>
                              <div className="nft_coll">
                                <div className="nft_wrap">
                                  <Skeleton
                                    width="100%"
                                    height="250px"
                                    borderRadius="10px"
                                  />
                                </div>

                                <div className="nft_coll_pp">
                                  <Skeleton
                                    width="60px"
                                    height="60px"
                                    borderRadius="50%"
                                  />
                                </div>

                                <div className="nft_coll_info">
                                  <Skeleton
                                    width="80%"
                                    height="20px"
                                    borderRadius="4px"
                                  />
                                  <Skeleton
                                    width="50%"
                                    height="16px"
                                    borderRadius="4px"
                                  />
                                </div>
                              </div>
                            </div>
                          )):
                      hotCollection.map((collection, index) => (
                      <div className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                        <div className="nft_coll">
                          <div className="nft_wrap">
                            <Link to={`/item-details/${collection.nftId}`}>
                              <img
                                src={collection.nftImage}
                                className="lazy img-fluid"
                                alt=""
                                onLoad={handleImageLoad}
                              />
                            </Link>
                          </div>
                          <div className="nft_coll_pp">
                            <Link to={`/author/${collection.authorId}`}>
                              <img className="lazy pp-coll" src={collection.authorImage} alt="" />
                            </Link>
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="nft_coll_info">
                            <Link to={`/item-details/${collection.nftId}`}>
                              <h4>{collection.title}</h4>
                            </Link>
                            <span>{collection.nftId}</span>
                          </div>
                        </div>
                      </div>
            ))}
          </div>

          <button className="owl-next" onClick={() => instanceRef.current?.next()}>
            {arrowRight}
          </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HotCollections;

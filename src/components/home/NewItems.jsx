import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Countdown from "../UI/Countdown";
import Skeleton from '../UI/Skeleton';

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const arrowLeft = "<";
  const arrowRight = ">";

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems');
        setNewItems(response.data);
      } catch (error) {
        //console.error('Error fetching new items:', error);
      }
    };

    fetchNewItems();
    setLoading(false);
  }, []);

  //console.log('New Items:', newItems); // Log the fetched new items for debugging


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
  }, [newItems, instanceRef]);
    

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="slider__wrapper">

            <button
              className="owl-prev"
              onClick={() => instanceRef.current?.prev()}
              type="button"
            >
              {arrowLeft}
            </button>

            <div ref={sliderRef} className="keen-slider">
              
              {loading ? 
              ([...Array(4)].map((_, index) => (
                            <div className="keen-slider__slide" key={index}>
                              <div className="nft_item">

                                <div className="author_list_pp">
                                  <Skeleton
                                    width="60px"
                                    height="60px"
                                    borderRadius="50%"
                                  />
                                </div>

                                <div className="nft__item_wrap">
                                  <Skeleton
                                    width="100%"
                                    height="250px"
                                    borderRadius="10px"
                                  />
                                </div>

                                <div className="nft__item_info">
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
                          ))
              ) : (
                newItems.map((item, index) => (
                  <div
                    className="keen-slider__slide"
                    key={item.id || index}
                  >
                    <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img
                          className="lazy"
                          src={item.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    {item.expiryDate && <Countdown timeID={item.expiryDate} />}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button type="button">Buy Now</button>

                          <div className="nft__item_share">
                            <h4>Share</h4>

                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>

                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>

                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>

                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.id}`}>
                        <h4>{item.title}</h4>
                      </Link>

                      <div className="nft__item_price">
                        {item.price} ETH
                      </div>

                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              )}
            </div>

            <button
              className="owl-next"
              onClick={() => instanceRef.current?.next()}
              type="button"
            >
              {arrowRight}
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;

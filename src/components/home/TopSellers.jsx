import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Skeleton from '../UI/Skeleton';


const TopSellers = () => {

  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');
        setTopSellers(response.data);
      } catch (error) {
      console.error('Error fetching top sellers:', error);
      }
    };

    fetchTopSellers();
    setLoading(false);
  }, []);

  console.log('Top Sellers:', topSellers); // log the topSellers state to check if data is being fetched correctly
  
  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading? (
                [...Array(12)].map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Skeleton
                        width="60px"
                        height="60px"
                        borderRadius="50%"
                      />
                    </div>
                    <div className="author_list_info">
                      <Skeleton
                        width="100%"
                        height="20px"
                        borderRadius="4px"
                      />
                      <Skeleton
                        width="50%"
                        height="16px"
                        borderRadius="4px"
                      />
                    </div>
                  </li>
                ))
              ) : (
                topSellers.map((seller, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to={`/author/#${seller.authorId}`}>
                        <img
                          className="lazy pp-author"
                        src={seller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/#${seller.authorId}`}>{seller.authorName}</Link>
                    <span>{seller.price} ETH</span>
                  </div>
                </li>
              )))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;

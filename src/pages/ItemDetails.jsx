import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {

  const { id } = useParams();
  const [ itemDetails, setItemDetails ] = useState();
  const [ loading, setLoading ] = useState(true);
  

  useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
                );
                setItemDetails(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ?(
                  <Skeleton width="540px" height="480px" />
                )
                :
                (<img
                  src={itemDetails.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />)}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {loading ? 
                  (<Skeleton width="280px" height="42px"/>)
                  : 
                  (<h2>{itemDetails.title}</h2>)}

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {itemDetails?.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {itemDetails?.likes}
                    </div>
                  </div>
                  {loading ? (<Skeleton width="340px" height="90px"/>) :
                  (<p>
                    {itemDetails.description}
                  </p>)}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails?.ownerId}`}>
                            {loading ? (<Skeleton width="50px" height="50px" borderRadius="50%"/>) : (<img className="lazy" src={itemDetails.ownerImage} alt="" />)}
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          {loading ? (<Skeleton width="160px" height="18px"/>) : (<Link to={`/author/${itemDetails?.ownerId}`}>{itemDetails?.ownerName}</Link>)}
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails?.creatorId}`}>
                            {loading ? (<Skeleton width="50px" height="50px" borderRadius="50%"/>) : (<img className="lazy" src={itemDetails.creatorImage} alt="" />)}
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          {loading ? (<Skeleton width="160px" height="18px"/>) : (<Link to={`/author/${itemDetails?.creatorId}`}>{itemDetails?.creatorName}</Link>)}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      {loading ? (<Skeleton width="80px" height="48px"/>) : (<span>{itemDetails?.price}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;

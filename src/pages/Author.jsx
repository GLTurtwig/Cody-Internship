import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from 'axios';
import Skeleton from "../components/UI/Skeleton";

const Author = () => {

  const { id } = useParams();
  const [ author, setAuthor ] = useState();
  const [ nftCollection, setNftCollection ] = useState([]);
  const [ image, setImage ] = useState("");
  const [ loading, setLoading ] = useState(true);
  const [ followers, setFollowers ] = useState(0)
  const [ following, setFollowing ] = useState(false);

  useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
                );
                setAuthor(response.data);
                setFollowers(response.data.followers);
                setNftCollection(response.data.nftCollection);
                setImage(response.data.authorImage)
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    
    const handleFollowing = () => {
      if (following) {
        setFollowers(followers - 1);
        setFollowing(false);
      } else {
        setFollowers(followers + 1);
        setFollowing(true);
      }
    };
  

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (<Skeleton width="150px" height="150px" borderRadius="50%" /> ) : <img src={author.authorImage} alt="" />}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (<Skeleton width="150px" height="24px" /> ) : author.authorName}
                          {loading ? (<Skeleton width="80px" height="8px"/>) : <span className="profile_username">@{author.tag}</span>}
                          {loading ? (<Skeleton width="80px" height="8px"/>) : (<span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>)}
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (<Skeleton width="80px" height="8px"/>) : (<div className="profile_follower">{followers} followers</div>)}
                      {following ? 
                      (<Link to="#" className="btn-main" onClick={handleFollowing}>Unfollow</Link>) 
                      : 
                      (<Link to="#" className="btn-main" onClick={handleFollowing}>Follow</Link>)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorItems={nftCollection} loading={loading} pfp={image} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;

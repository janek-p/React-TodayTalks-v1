import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

const Newsletter = () => {
  const { setting } = useSelector((state) => state.setting);

  return (
    <>
      <section className="newsletter-area-three">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="newsletter-wrap-three">
                <div className="newsletter-content">
                  <h2 className="title">Get Our Latest News & Update</h2>
                </div>
                <div className="newsletter-form">
                  <form>
                    <div className="form-grp">
                      <input type="text" placeholder="Name" />
                    </div>
                    <div className="form-grp">
                      <input type="email" placeholder="E-mail" />
                    </div>
                    <button type="submit" className="btn">
                      Submit Now
                    </button>
                  </form>
                </div>
                <div className="newsletter-social">
                  <h4 className="title">Follow Us:</h4>
                  <ul className="list-wrap">
                    <li>
                      <Link to={setting.social_fb}>
                        <FontAwesomeIcon icon="fa-brands fa-facebook-f" />
                      </Link>
                    </li>
                    <li>
                      <Link to={setting.social_twitter}>
                        <FontAwesomeIcon icon="fa-brands fa-x-twitter" />
                      </Link>
                    </li>
                    <li>
                      <Link to={setting.social_insta}>
                        <FontAwesomeIcon icon="fa-brands fa-instagram" />
                      </Link>
                    </li>
                    <li>
                      <Link to={setting.social_linkedin}>
                        <FontAwesomeIcon icon="fa-brands fa-linkedin" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;

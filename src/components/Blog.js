import React, { useState, useEffect, Suspense } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import axios from '../config';
import { IMAGE_BASE_URL } from '../config';
import CustomPagination from './CustomPagination';
import Breadcrumb from './Breadcrumb';
import SubCategoryBreadcrumb from './SubCategoryBreadCrumb';
import Loader from './Loader';
import { fetchSelectCategory } from '../actions/categoryAction';
import { useDispatch, useSelector } from 'react-redux';
import NoPost from '../views/error/No_post';
import Menu from '../layouts/Menu';

const Blog = ({ title, isHomepage }) => {
  const dispatch = useDispatch();
  const { homePosts } = useSelector((state) => state.posts);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      let response;
      if (isHomepage === 1) {
        response = homePosts.find((post) => post.category === title);
        if (response) setPosts(response.posts);
      } else {
        const response = await axios.get(`/api/user/pagenationPosts`, {
          params: {
            category: title,
            currentPage: currentPage,
            postsPerPage,
          },
        });
        if (postsPerPage === 'all') {
          setPosts(response.data);
          setTotalPosts(response.data.length);
        } else {
          setPosts(response.data.data);
          setTotalPosts(response.data.total);
        }
      }
      setLoading(false);
    };
    fetch();
    window.scrollTo(0, 0);
  }, [title, currentPage, postsPerPage]);

  useEffect(() => {
    const fetchSubCategory = async () => {
      const response = await axios.get(`/api/user/subcategory?id=${title}`);
      setSubCategory(response.data);
    };
    fetchSubCategory();
  }, [title]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handlePerPageChange = (event) => {
    setPostsPerPage(event.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  const handleViewClick = (name) => {
    dispatch(fetchSelectCategory(name));
  };

  if (loading && isHomepage === 0) {
    return <Loader />;
  }

  return (
    <>
      <Suspense
        fallback={
          <>
            <Loader />
          </>
        }
      >
        {posts.length ? (
          <section className='pb-60'>
            {subCategory.length ? <SubCategoryBreadcrumb subCategories={subCategory} title={title} /> : ''}
            <Breadcrumb title={title} />
            <div className='container content-container row'>
              <div className='col-lg-9 col-md-12 col-12 mt-20'>
                <div>
                  {posts.map((post) => (
                    <div className='col-md-12' key={post.id}>
                      <div className='weekly-post-three'>
                        <div className='weekly-post-thumb'>
                          <Link to={`/${post.seo_slug}`}>
                            <img src={IMAGE_BASE_URL + post.img} alt={post.title} />
                          </Link>
                        </div>
                        <div className='weekly-post-content'>
                          <h2 className='post-title'>
                            <Link to={`/${post.seo_slug}`}>{post.title}</Link>
                          </h2>

                          <p>{post.subTitle}</p>
                          <div className='blog-post-meta'>
                            <ul className='list-wrap mt-3'>
                              <li>
                                <FontAwesomeIcon icon='fa-regular fa-calendar' /> {new Date(post.created_at).toLocaleDateString()}
                              </li>
                              <li>
                                <span className='homeblog-link-icon-phone'>
                                  <Link to='/'>
                                    <FontAwesomeIcon icon='fa-solid fa-phone' />
                                  </Link>
                                </span>
                                <span className='homeblog-link-icon-facebook'>
                                  <Link to='/'>
                                    <FontAwesomeIcon icon='fa-brands fa-facebook-f' />
                                  </Link>
                                </span>
                                <span className='homeblog-link-icon-twitter'>
                                  <Link to='/'>
                                    <FontAwesomeIcon icon='fa-brands fa-twitter' />
                                  </Link>
                                </span>
                              </li>
                              <li>
                                <div className='view-all-btn'>
                                  <Link to={`/`} className='homeblog-link-btn'>
                                    Read More
                                    <span className='svg-icon'>
                                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' fill='none'>
                                        <path d='M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z' fill='currentColor' />
                                        <path d='M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z' fill='currentColor' />
                                      </svg>
                                    </span>
                                  </Link>
                                </div>
                              </li>
                              {/* <li>
                                <i className="flaticon-history"></i>20 Mins
                              </li> */}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {isHomepage === 0 && (
                  <>
                    <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    <form className='form-inline ml-3'>
                      <label htmlFor='per_page' className='mr-2'>
                        Show:
                      </label>
                      <select name='per_page' id='per_page' className='form-control' value={postsPerPage} onChange={handlePerPageChange}>
                        <option value='10'>10/page</option>
                        <option value='20'>20/page</option>
                        <option value='all'>All</option>
                      </select>
                    </form>
                  </>
                )}
              </div>
              <div className='col-lg-3'></div>
            </div>
          </section>
        ) : (
          isHomepage === 0 && <NoPost />
        )}
      </Suspense>
    </>
  );
};

export default Blog;

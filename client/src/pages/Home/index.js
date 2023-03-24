import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('main_home')}>
            <div className={cx('wrapper')}>
                <div className={cx('news')}>
                    <div className={cx('inner')}>
                        <div className={cx('inner_news')}>
                            <div className={cx('news_form')}>
                                <div className={cx('news_form_header')}>
                                    <div className={cx('header_title')}>
                                        <div className={cx('header_title_wrapper_img')}>
                                            <div className={cx('header_title_img')}>
                                                <img src="data:image/png;base64,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" />
                                            </div>

                                            <div className={cx('profile_form')}>
                                                <div className={cx('profile_wrapper')}>
                                                    <div className={cx('profile_avatar')}>
                                                        <div className={cx('follow_wrapper_avatar')}>
                                                            <div className={cx('follow_avatar')}>
                                                                <Link className={cx('follow_avatar_link')}>
                                                                    <img src="https://ddxcu89oqzgqh.cloudfront.net/uploads/account/avatar/5c92181f98f4500bb0003fbc/44884218_345707102882519_2446069589734326272_n.jpg" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className={cx('follow_wrapper_username')}>
                                                            <div className={cx('follow_username')}>
                                                                <Link className={cx('follow_username_link')}>
                                                                    minhoanq_
                                                                </Link>
                                                            </div>
                                                            <div className={cx('follow_name')}>Suggested for you</div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('profile_number')}></div>
                                                    <div className={cx('profile_img')}></div>
                                                    <div className={cx('profile_btn')}></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={cx('header_title_wrapper_name')}>
                                            <div className={cx('header_title_name')}>
                                                <Link className={cx('header_title_name-link')}>set_shoppp</Link>
                                            </div>

                                            <div className={cx('title_name_wrapper_time')}>
                                                <div className={cx('title_name_dot')} />
                                                <div className={cx('title_name_time')}>7h</div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className={cx('header_options')}>
                                        <div className={cx('options_svg')}>
                                            <svg
                                                aria-label="More options"
                                                className={cx('_ab6-')}
                                                color="rgb(142, 142, 142)"
                                                fill="rgb(38, 38, 38)"
                                                height="24"
                                                role="img"
                                                viewBox="0 0 24 24"
                                                width="24"
                                            >
                                                <circle cx="12" cy="12" r="1.5"></circle>
                                                <circle cx="6" cy="12" r="1.5"></circle>
                                                <circle cx="18" cy="12" r="1.5"></circle>
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                                <div className={cx('news_form_img')}>
                                    <div className={cx('form_img')}>
                                        <img src="https://down-vn.img.susercontent.com/file/f8ca37812b0e2720985aecb461f7c85f" />
                                    </div>
                                </div>
                                <div className={cx('news_form_desc')}>
                                    <div className={cx('news_form_desc_temp')}>
                                        <div className={cx('desc_wrapper')}>
                                            <button className={cx('desc_icon', 'desc_reaction')}>
                                                <div className={cx('desc_inner', 'desc_inner_reaction', 'clickTym')}>
                                                    {/* <svg
                                                        aria-label="Like"
                                                        className={cx('x1lliihq x1n2onr6')}
                                                        color="rgb(38, 38, 38)"
                                                        fill="rgb(38, 38, 38)"
                                                        height="24"
                                                        role="img"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                    >
                                                        <title>Like</title>
                                                        <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                                                    </svg> */}

                                                    <svg
                                                        aria-label="Unlike"
                                                        className={cx('x1lliihq x1n2onr6')}
                                                        color="rgb(255, 48, 64)"
                                                        fill="rgb(255, 48, 64)"
                                                        height="24"
                                                        role="img"
                                                        viewBox="0 0 48 48"
                                                        width="24"
                                                    >
                                                        <title>Unlike</title>
                                                        <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                                                    </svg>
                                                </div>
                                            </button>
                                            <button className={cx('desc_icon')}>
                                                <div className={cx('desc_inner')}>
                                                    <svg
                                                        aria-label="Comment"
                                                        className={cx('x1lliihq x1n2onr6')}
                                                        color="rgb(38, 38, 38)"
                                                        fill="rgb(38, 38, 38)"
                                                        height="24"
                                                        role="img"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                    >
                                                        <title>Comment</title>
                                                        <path
                                                            d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeLinejoin={'round'}
                                                            strokeWidth={'2'}
                                                        ></path>
                                                    </svg>
                                                </div>
                                            </button>
                                            <button className={cx('desc_icon')}>
                                                <div className={cx('desc_inner')}>
                                                    <svg
                                                        aria-label="Share Post"
                                                        className={cx('x1lliihq x1n2onr6')}
                                                        color="rgb(38, 38, 38)"
                                                        fill="rgb(38, 38, 38)"
                                                        height="24"
                                                        role="img"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                    >
                                                        <title>Share Post</title>
                                                        <line
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeLinejoin={'round'}
                                                            strokeWidth={'2'}
                                                            x1="22"
                                                            x2="9.218"
                                                            y1="3"
                                                            y2="10.083"
                                                        ></line>
                                                        <polygon
                                                            fill="none"
                                                            points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                                                            stroke="currentColor"
                                                            strokeLinejoin={'round'}
                                                            strokeWidth={'2'}
                                                        ></polygon>
                                                    </svg>
                                                </div>
                                            </button>
                                            <button className={cx('desc_icon', 'desc_save')}>
                                                <div className={cx('desc_inner')}>
                                                    <svg
                                                        aria-label="Save"
                                                        className={cx('x1lliihq x1n2onr6')}
                                                        color="rgb(38, 38, 38)"
                                                        fill="rgb(38, 38, 38)"
                                                        height="24"
                                                        role="img"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                    >
                                                        <title>Save</title>
                                                        <polygon
                                                            fill="none"
                                                            points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                                                            stroke="currentColor"
                                                            strokeLinecap={'round'}
                                                            strokeLinejoin={'round'}
                                                            strokeWidth={'2'}
                                                        ></polygon>
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    <div className={cx('desc_wrapper_likes')}>
                                        <div className={cx('desc_likes')}>
                                            <span>23</span> {' likes'}
                                        </div>
                                    </div>

                                    <div className={cx('desc_content')}>
                                        <div className={cx('wrapper_content')}>
                                            <div className={cx('content')}>
                                                <div className={cx('content_inside')}>
                                                    <div className={cx('content_name')}>
                                                        <Link className={cx('content_name-link')}>set_shoppp</Link>
                                                    </div>
                                                    <span className={cx('content_space')}> </span>
                                                    <span className={cx('content_text')}>
                                                        <h1>
                                                            Yếm kaki tông màu xanh trendy.
                                                            <br />
                                                            Chi tiết dây đan màu cam nổi bật.
                                                            <br />
                                                            Ẻm này có thể mix đẹp với hầu hết các kiểu áo từ áo phông
                                                            đến sơmi nha.
                                                            <br />
                                                            Size S {'<'} 54kg
                                                            <br />
                                                            Size M {'<'} 60kg
                                                            <br />
                                                            Giá: #330k ạ
                                                            <br />
                                                            Có sẵn tại store ạ.
                                                        </h1>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={cx('translation')}>See translation</div>
                                        </div>
                                    </div>

                                    <div className={cx('desc_input_comment')}>
                                        <div className={cx('input_comment_wrapper')}>
                                            <button className={cx('button_input_comment')}>
                                                <input type={'text'} placeholder={'Add a comment...'} />
                                            </button>
                                            <div className={cx('icon_comment')}>
                                                <svg
                                                    aria-label="Emoji"
                                                    className={cx('x1lliihq x1n2onr6')}
                                                    color="rgb(142, 142, 142)"
                                                    fill="rgb(142, 142, 142)"
                                                    height="13"
                                                    role="img"
                                                    viewBox="0 0 24 24"
                                                    width="13"
                                                >
                                                    <title>Emoji</title>
                                                    <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('suggestions')}>
                    <div className={cx('suggestions_user')}>
                        <div className={cx('suggestions_user_temp')}>
                            <div className={cx('wrapper_user')}>
                                <div className={cx('user_wrapper_avatar')}>
                                    <div className={cx('user_avatar')}>
                                        <Link className={cx('user_avatar_link')}>
                                            <img src="https://ddxcu89oqzgqh.cloudfront.net/uploads/account/avatar/5c92181f98f4500bb0003fbc/44884218_345707102882519_2446069589734326272_n.jpg" />
                                        </Link>
                                    </div>
                                </div>
                                <div className={cx('user_wrapper_username')}>
                                    <div className={cx('user_username')}>
                                        <Link className={cx('user_username_link')}>minhoanq_</Link>
                                    </div>
                                    <div className={cx('user_name')}>Minh Hoàng</div>
                                </div>
                                <div className={cx('user_wrapper_switch')}>
                                    <button className={cx('switch_btn')}>
                                        <span className={cx('switch_text')}>Switch</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('suggestions_all')}>
                        <div className={cx('suggestions_title')}>
                            <div className={cx('suggestions_title_text')}>Suggestions for you</div>
                            <div className={cx('suggestions_title_btn')}>
                                <Link className={cx('suggestions_title_btn_link')}>
                                    <span className={cx('suggestions_title_btn-text')}>See All</span>
                                </Link>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <div className={cx('suggestions_follow')}>
                        <div className={cx('follow_user')}>
                            <div className={cx('follow_wrapper_avatar')}>
                                <div className={cx('follow_avatar')}>
                                    <Link className={cx('follow_avatar_link')}>
                                        <img src="https://ddxcu89oqzgqh.cloudfront.net/uploads/account/avatar/5c92181f98f4500bb0003fbc/44884218_345707102882519_2446069589734326272_n.jpg" />
                                    </Link>
                                </div>
                            </div>
                            <div className={cx('follow_wrapper_username')}>
                                <div className={cx('follow_username')}>
                                    <Link className={cx('follow_username_link')}>minhoanq_</Link>
                                </div>
                                <div className={cx('follow_name')}>Suggested for you</div>
                            </div>
                            <div className={cx('follow_wrapper_switch')}>
                                <button className={cx('follow_btn')}>
                                    <Link className={cx('follow_link')}>
                                        <span className={cx('follow_text')}>Follow</span>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('suggestions_follow')}>
                        <div className={cx('follow_user')}>
                            <div className={cx('follow_wrapper_avatar')}>
                                <div className={cx('follow_avatar')}>
                                    <Link className={cx('follow_avatar_link')}>
                                        <img src="https://ddxcu89oqzgqh.cloudfront.net/uploads/account/avatar/5c92181f98f4500bb0003fbc/44884218_345707102882519_2446069589734326272_n.jpg" />
                                    </Link>
                                </div>
                            </div>
                            <div className={cx('follow_wrapper_username')}>
                                <div className={cx('follow_username')}>
                                    <Link className={cx('follow_username_link')}>minhoanq_</Link>
                                </div>
                                <div className={cx('follow_name')}>Suggested for you</div>
                            </div>
                            <div className={cx('follow_wrapper_switch')}>
                                <button className={cx('follow_btn')}>
                                    <Link className={cx('follow_link')}>
                                        <span className={cx('follow_text')}>Follow</span>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('suggestions_follow')}>
                        <div className={cx('follow_user')}>
                            <div className={cx('follow_wrapper_avatar')}>
                                <div className={cx('follow_avatar')}>
                                    <Link className={cx('follow_avatar_link')}>
                                        <img src="https://ddxcu89oqzgqh.cloudfront.net/uploads/account/avatar/5c92181f98f4500bb0003fbc/44884218_345707102882519_2446069589734326272_n.jpg" />
                                    </Link>
                                </div>
                            </div>
                            <div className={cx('follow_wrapper_username')}>
                                <div className={cx('follow_username')}>
                                    <Link className={cx('follow_username_link')}>minhoanq_</Link>
                                </div>
                                <div className={cx('follow_name')}>Suggested for you</div>
                            </div>
                            <div className={cx('follow_wrapper_switch')}>
                                <button className={cx('follow_btn')}>
                                    <Link className={cx('follow_link')}>
                                        <span className={cx('follow_text')}>Follow</span>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('suggestions_follow')}>
                        <div className={cx('follow_user')}>
                            <div className={cx('follow_wrapper_avatar')}>
                                <div className={cx('follow_avatar')}>
                                    <Link className={cx('follow_avatar_link')}>
                                        <img src="https://ddxcu89oqzgqh.cloudfront.net/uploads/account/avatar/5c92181f98f4500bb0003fbc/44884218_345707102882519_2446069589734326272_n.jpg" />
                                    </Link>
                                </div>
                            </div>
                            <div className={cx('follow_wrapper_username')}>
                                <div className={cx('follow_username')}>
                                    <Link className={cx('follow_username_link')}>minhoanq_</Link>
                                </div>
                                <div className={cx('follow_name')}>Suggested for you</div>
                            </div>
                            <div className={cx('follow_wrapper_switch')}>
                                <button className={cx('follow_btn')}>
                                    <Link className={cx('follow_link')}>
                                        <span className={cx('follow_text')}>Follow</span>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('suggestions_follow')}>
                        <div className={cx('follow_user')}>
                            <div className={cx('follow_wrapper_avatar')}>
                                <div className={cx('follow_avatar')}>
                                    <Link className={cx('follow_avatar_link')}>
                                        <img src="https://ddxcu89oqzgqh.cloudfront.net/uploads/account/avatar/5c92181f98f4500bb0003fbc/44884218_345707102882519_2446069589734326272_n.jpg" />
                                    </Link>
                                </div>
                            </div>
                            <div className={cx('follow_wrapper_username')}>
                                <div className={cx('follow_username')}>
                                    <Link className={cx('follow_username_link')}>minhoanq_</Link>
                                </div>
                                <div className={cx('follow_name')}>Suggested for you</div>
                            </div>
                            <div className={cx('follow_wrapper_switch')}>
                                <button className={cx('follow_btn')}>
                                    <Link className={cx('follow_link')}>
                                        <span className={cx('follow_text')}>Follow</span>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
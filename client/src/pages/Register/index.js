import styles from './Register.module.scss';
import classNames from 'classnames/bind';
// import { AiFillFacebook } from 'react-icons/ai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Register() {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [gender, setGender] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState({
        month: '1',
        day: '1',
        year: '2023'
    })

    const handleRegister = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/auth/register', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ username, firstname, lastname, sex: gender, password, confirmPassword, email, phone, dateOfBirth: `${dateOfBirth.day}-${dateOfBirth.month}-${dateOfBirth.year}` })
        })
        const dataApi = await response.json()
        if (dataApi.status === 'fail') {
            setError(dataApi.msg)
            return
        }
        if (dataApi.status === 'success') {
            navigate('/login')
        }
    }

    return (
        <div className={cx('wrapper')}>
            <form className={cx('register_form')} onSubmit={handleRegister}>
                <div className={cx('register_form_logo')}>
                    <svg
                        className="register_form_logo-link"
                        aria-label="Instagram"
                        color="rgb(38, 38, 38)"
                        fill="rgb(38, 38, 38)"
                        height="29"
                        role="img"
                        viewBox="32 4 113 32"
                        width="103"
                    >
                        <path
                            clipRule={'evenodd'}
                            d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z"
                            fill="currentColor"
                            fillRule={'evenodd'}
                        ></path>
                    </svg>
                </div>

                <div className={cx('register_form_body')}>
                    {/* description */}
                    <div className={cx('register_form_desc')}>
                        <h2>Sign up to see photos and videos from your friends.</h2>
                    </div>

                    {/* inputs */}
                    <div className={cx('register_form_enter_info')}>
                        {/* input user name */}
                        <div className={cx('enter_info_ipnut')}>
                            <input className={cx('enter_info_ipnut-user')} placeholder="Username" type={'text'} value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        {/* input full name */}
                        <div className={cx('enter_info_ipnut_wrapper')}>
                            <div className={cx('enter_info_ipnut-fname')}>
                                <input
                                    className={cx('enter_info_ipnut-user-fname')}
                                    placeholder="First name"
                                    type={'text'}
                                    value={firstname} onChange={e => setFirstname(e.target.value)}
                                />
                                <input
                                    className={cx('enter_info_ipnut-user-fname')}
                                    placeholder="Last name"
                                    type={'text'}
                                    value={lastname} onChange={e => setLastname(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* input user sex */}
                        <div className={cx('enter_info_ipnut')}>
                            <div className={cx('enter_info_wrapper_radio')}>
                                <div className={cx('enter_radio-male')}>
                                    <input name="gender" type="radio" value="male" className={cx('enter_info_radio')} onChange={e => setGender(e.target.value)}/>
                                    Male
                                </div>
                                <div className={cx('enter_radio-female')}>
                                    <input
                                        name="gender"
                                        type="radio"
                                        value="female"
                                        className={cx('enter_info_radio')}
                                        onChange={e => setGender(e.target.value)}
                                    />
                                    Female
                                </div>
                                <div className={cx('enter_radio-orther')}>
                                    <input
                                        name="gender"
                                        type="radio"
                                        value="orther"
                                        className={cx('enter_info_radio')}
                                        onChange={e => setGender(e.target.value)}
                                    />
                                    Orther
                                </div>
                            </div>
                        </div>
                        {/* input birth */}
                        <div className={cx('enter_info_ipnut-select')}>
                            <div className={cx('wrapper_temp_select')}>
                                <span className={cx('wrapper_select')}>
                                    <span className="_aav1 _9z-6"></span>
                                    <select className={cx('selector_day')} title="Month:" onChange={e => setDateOfBirth({...dateOfBirth, month: e.target.value})}>
                      
                                        <option title="January" value="01">
                                            January
                                        </option>
                                        <option title="February" value="02">
                                            February
                                        </option>
                                        <option title="March" value="03">
                                            March
                                        </option>
                                        <option title="April" value="04">
                                            April
                                        </option>
                                        <option title="May" value="05">
                                            May
                                        </option>
                                        <option title="June" value="06">
                                            June
                                        </option>
                                        <option title="July" value="07">
                                            July
                                        </option>
                                        <option title="August" value="08">
                                            August
                                        </option>
                                        <option title="September" value="09">
                                            September
                                        </option>
                                        <option title="October" value="10">
                                            October
                                        </option>
                                        <option title="November" value="11">
                                            November
                                        </option>
                                        <option title="December" value="12">
                                            December
                                        </option>
                                    </select>
                                </span>
                                <span className={cx('wrapper_select')}>
                                    <span className="_aav1 _9z-6"></span>
                                    <select className={cx('selector_day')} title="Day:" onChange={e => setDateOfBirth({...dateOfBirth, day: e.target.value})}>
                                        <option title="1" value="01">
                                            1
                                        </option>
                                        <option title="2" value="02">
                                            2
                                        </option>
                                        <option title="3" value="03">
                                            3
                                        </option>
                                        <option title="4" value="04">
                                            4
                                        </option>
                                        <option title="5" value="05">
                                            5
                                        </option>
                                        <option title="6" value="06">
                                            6
                                        </option>
                                        <option title="7" value="07">
                                            7
                                        </option>
                                        <option title="8" value="08">
                                            8
                                        </option>
                                        <option title="9" value="09">
                                            9
                                        </option>
                                        <option title="10" value="10">
                                            10
                                        </option>
                                        <option title="11" value="11">
                                            11
                                        </option>
                                        <option title="12" value="12">
                                            12
                                        </option>
                                        <option title="13" value="13">
                                            13
                                        </option>
                                        <option title="14" value="14">
                                            14
                                        </option>
                                        <option title="15" value="15">
                                            15
                                        </option>
                                        <option title="16" value="16">
                                            16
                                        </option>
                                        <option title="17" value="17">
                                            17
                                        </option>
                                        <option title="18" value="18">
                                            18
                                        </option>
                                        <option title="19" value="19">
                                            19
                                        </option>
                                        <option title="20" value="20">
                                            20
                                        </option>
                                        <option title="21" value="21">
                                            21
                                        </option>
                                        <option title="22" value="22">
                                            22
                                        </option>
                                        <option title="23" value="23">
                                            23
                                        </option>
                                        <option title="24" value="24">
                                            24
                                        </option>
                                        <option title="25" value="25">
                                            25
                                        </option>
                                        <option title="26" value="26">
                                            26
                                        </option>
                                        <option title="27" value="27">
                                            27
                                        </option>
                                        <option title="28" value="28">
                                            28
                                        </option>
                                        <option title="29" value="29">
                                            29
                                        </option>
                                        <option title="30" value="30">
                                            30
                                        </option>
                                        <option title="31" value="31">
                                            31
                                        </option>
                                    </select>
                                </span>
                                <span className={cx('wrapper_select')}>
                                    <span className="_aav1 _9z-6"></span>
                                    <select className={cx('selector_day')} title="Year:" onChange={e => setDateOfBirth({...dateOfBirth, year: e.target.value})}>
                                        <option title="2023" value="2023">
                                            2023
                                        </option>
                                        <option title="2022" value="2022">
                                            2022
                                        </option>
                                        <option title="2021" value="2021">
                                            2021
                                        </option>
                                        <option title="2020" value="2020">
                                            2020
                                        </option>
                                        <option title="2019" value="2019">
                                            2019
                                        </option>
                                        <option title="2018" value="2018">
                                            2018
                                        </option>
                                        <option title="2017" value="2017">
                                            2017
                                        </option>
                                        <option title="2016" value="2016">
                                            2016
                                        </option>
                                        <option title="2015" value="2015">
                                            2015
                                        </option>
                                        <option title="2014" value="2014">
                                            2014
                                        </option>
                                        <option title="2013" value="2013">
                                            2013
                                        </option>
                                        <option title="2012" value="2012">
                                            2012
                                        </option>
                                        <option title="2011" value="2011">
                                            2011
                                        </option>
                                        <option title="2010" value="2010">
                                            2010
                                        </option>
                                        <option title="2009" value="2009">
                                            2009
                                        </option>
                                        <option title="2008" value="2008">
                                            2008
                                        </option>
                                        <option title="2007" value="2007">
                                            2007
                                        </option>
                                        <option title="2006" value="2006">
                                            2006
                                        </option>
                                        <option title="2005" value="2005">
                                            2005
                                        </option>
                                        <option title="2004" value="2004">
                                            2004
                                        </option>
                                        <option title="2003" value="2003">
                                            2003
                                        </option>
                                        <option title="2002" value="2002">
                                            2002
                                        </option>
                                        <option title="2001" value="2001">
                                            2001
                                        </option>
                                        <option title="2000" value="2000">
                                            2000
                                        </option>
                                        <option title="1999" value="1999">
                                            1999
                                        </option>
                                        <option title="1998" value="1998">
                                            1998
                                        </option>
                                        <option title="1997" value="1997">
                                            1997
                                        </option>
                                        <option title="1996" value="1996">
                                            1996
                                        </option>
                                        <option title="1995" value="1995">
                                            1995
                                        </option>
                                        <option title="1994" value="1994">
                                            1994
                                        </option>
                                        <option title="1993" value="1993">
                                            1993
                                        </option>
                                        <option title="1992" value="1992">
                                            1992
                                        </option>
                                        <option title="1991" value="1991">
                                            1991
                                        </option>
                                        <option title="1990" value="1990">
                                            1990
                                        </option>
                                    </select>
                                </span>
                            </div>
                        </div>

                        {/* input email */}
                        <div className={cx('enter_info_ipnut')}>
                            <input className={cx('enter_info_ipnut-user')} placeholder="Email" type={'text'} value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        {/* input phone */}
                        <div className={cx('enter_info_ipnut')}>
                            <input className={cx('enter_info_ipnut-user')} placeholder="Phone" type={'text'} value={phone} onChange={e => setPhone(e.target.value)}></input>
                        </div>

                        {/* input user password */}
                        <div className={cx('enter_info_ipnut')}>
                            <input
                                className={cx('enter_info_ipnut-user')}
                                placeholder="Password"
                                type={'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        {/* input confirm password */}
                        <div className={cx('enter_info_ipnut')}>
                            <input
                                className={cx('enter_info_ipnut-user')}
                                placeholder="Confirm password"
                                type={'password'}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* rules */}
                    <p className={cx('rules')}>
                        <span className={cx('rules_wrapper')}>
                            <span className={cx('rules_wrapper_text')}>
                                People who use our service may have uploaded your contact information to Instagram.{' '}
                                <a href="https://cv.fullstack.edu.vn/">Learn More</a>
                            </span>
                            <br />
                            <br />
                            By signing up, you agree to our <a href="https://cv.fullstack.edu.vn/">Terms</a>
                            {' , '}
                            <a href="https://cv.fullstack.edu.vn/">Privacy Policy</a>
                            {' and '}
                            <a href="https://cv.fullstack.edu.vn/">Cookies Policy</a>
                            {' .'}
                        </span>
                    </p>
                    <div className={cx('wrapper_msg')}>
                        <p className={cx('msg_notify')}>{error}</p>
                    </div>

                    {/* btn register */}
                    <div className={cx('enter_info_wrapper_btn')}>
                        <button className={cx('enter_info_btn')}>Sign up</button>
                    </div>
                </div>
            </form>

            <div className={cx('register_temp')}>
                <div className={cx('register_temp_wrapper_text')}>
                    <span className={cx('register_temp_text')}>
                        Have an account?
                        <a href={'https://www.instagram.com/accounts/emailsignup/'} className={cx('pppp')}>
                            Log in
                        </a>
                    </span>
                </div>
            </div>

            <div className={cx('get_the_app')}>
                <div className={cx('get_the_app_wapper_text')}>
                    <span className={cx('get_the_app_text')}>Get the app.</span>
                </div>
                <div className={cx('get_the_app_wrapper')}>
                    <a href="https://www.instagram.com/" className={cx('get_the_app_link-google-play')}>
                        <img
                            alt="Get it on Google Play"
                            src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
                        />
                    </a>
                    <a href="https://www.instagram.com/" className={cx('get_the_app_link-microsoft')}>
                        <img
                            alt="Get it from Microsoft"
                            src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Register;

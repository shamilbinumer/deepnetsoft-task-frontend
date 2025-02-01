import './Footer.scss'
import phoneIcon from '/Images/Group.png'
import emailIcon from '/Images/formkit_email.png'
import CompnyLogo from '/Images/Logo.png'
import locationLogo from '/Images/streamline_travel-map-location-pin-navigation-map-maps-pin-gps-location.png'
import { LuFacebook, LuTwitter } from 'react-icons/lu'
import { RiYoutubeLine } from 'react-icons/ri'
import { FaInstagram } from 'react-icons/fa'

const Footer = () => {
    return (
        <div className='FooterMainWrapper'>
            <div className="footer-top">
                <div className="contact-cards-wrapper">
                    <div className="contact-card cardOne">
                        <h5>Connect with Us</h5>
                        <div className="mail-number">
                            <div><img src={phoneIcon} alt="" /><a href="tel:9567843340">+91 9567843340</a></div>
                            <div><img src={emailIcon} alt="" /><a href="mailto:info@deepnetsoft.com">info@deepnetsoft.com</a></div>
                        </div>
                    </div>
                    <div className="contact-card cardTwo">
                        <img src={CompnyLogo} alt="" />
                        <div className="content">
                            <h3><span className='first-word'>DEEP</span> <span className='second-word'>NET</span> <span className='third-word'>SOFT</span></h3>
                            <div className="social-icons">
                            <LuFacebook className='icon' />
                            <LuTwitter className='icon'/>
                            <RiYoutubeLine className='icon' />
                            <FaInstagram className='icon'/>
                            </div>
                        </div>
                    </div>
                    <div className="contact-card cardThree">
                    <h5>Find us</h5>
                        <div className="mail-number">
                            <div><img src={locationLogo} alt="" /><a href="">First floor, Geo infopark, <br /> Infopark EXPY, Kakkanad</a></div>
                     
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div>© 2024 Deepnetsoft Solutions. All rights reserved.</div>
                <div className='footer-bottom-right'>
                    <div>Terms & Conditions</div>
                    <div>Privacy Policy</div>
                </div>
            </div>
        </div>
    )
}

export default Footer

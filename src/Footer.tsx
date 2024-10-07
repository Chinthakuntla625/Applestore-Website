import React from 'react';
import './CSS_Files/Footer.css';
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { FaCcApplePay } from "react-icons/fa6";

const Footer = () => {
  return (
   
    <div className='container-2'>
      <div className='store'>
        <p><b>APPLE STORE</b></p>
        <p>FIND A STORE</p>
        <p>TODAY AT APPLE</p>
        <p>APPLE CAMP</p>
        <p>SHOPPING HELP</p>
        <a href='https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html' style={{color:"black"}}>Copyrights@2024 APPLE</a>
      </div>

      <div className='values'>
        <p><b>APPLE VALUES</b></p>
        <p>ACCESSIBILITY</p>
        <p>EDUCATION</p>
        <p>ENVIRONMENT</p>
        <p>PRIVACY</p>
        <a href='https://devasaiportfolio.netlify.app/'  
        style={{color:"black"}}>Founder<GiPoliceOfficerHead />: DEVASAI CHINTHAKUNTLA</a>
      </div>

      <div className='Account'>
        <p><b>APPLE ACCOUNT</b></p>
        <p>MANAGE YOUR APPLE ID</p>
        <p>APPLE STORE ACCOUNT</p>
        <p>WALLET <FaCcApplePay /></p>
        <p>ICLOUD.COM</p>
        <a href='https://www.instagram.com/apple/'  
        style={{color:"black"}} > <FaInstagramSquare /> INSTAGRAM</a>
      </div>

      <div className='About'>
        <p><b>ABOUT APPLE</b></p>
        <p>NEWSROOM</p>
        <p>APPLE LEADERSHIP</p>
        <p>EVENTS</p>
        <p>CONTACT APPLE</p>
        <a href='https://www.bing.com/ck/a?!&&p=e90dde57755d626fJmltdHM9MTcyNDI4NDgwMCZpZ3VpZD0xN2NkNzIyYy0xMzFhLTZhNzgtM2E5Yi02NjkzMTI2NTZiMTAmaW5zaWQ9NTIyMA&ptn=3&ver=2&hsh=3&fclid=17cd722c-131a-6a78-3a9b-669312656b10&psq=apple+youtube&u=a1aHR0cHM6Ly93d3cueW91dHViZS5jb20vdXNlci9BcHBsZQ&ntb=1'
         style={{color:"black"}}> <FaYoutube /> YOUTUBE</a>
      </div>
      
    </div>
    
    /* <div className='foot'>
      <div><hr></hr></div>
<a href='https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html' >Copyrights@2024 APPLE</a>
<a href='https://devasaiportfolio.netlify.app/'  >Founder: DEVASAI CHINTHAKUNTLA</a>
<a href='https://www.instagram.com/apple/'  >INSTAGRAM</a>
<a href='https://www.bing.com/ck/a?!&&p=e90dde57755d626fJmltdHM9MTcyNDI4NDgwMCZpZ3VpZD0xN2NkNzIyYy0xMzFhLTZhNzgtM2E5Yi02NjkzMTI2NTZiMTAmaW5zaWQ9NTIyMA&ptn=3&ver=2&hsh=3&fclid=17cd722c-131a-6a78-3a9b-669312656b10&psq=apple+youtube&u=a1aHR0cHM6Ly93d3cueW91dHViZS5jb20vdXNlci9BcHBsZQ&ntb=1'>YOUTUBE</a>


</div> */
    

  );
};

export default Footer;

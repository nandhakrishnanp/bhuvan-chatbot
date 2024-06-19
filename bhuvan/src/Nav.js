// Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt , FaFile, FaInfo, FaFolder, FaBars, FaCross, FaTimes} from 'react-icons/fa';

const Nav = () => {
  return (
    <>
     <input type="checkbox" id="check" />
     <label htmlFor="check" id="btn"><FaBars /></label>
     
      <FaTimes id='cancel'/>
    <div className="sidebar">
     
      <ul id='list'>
        <img style={{position:"relative" , left:"40px" , listStyle:"none",textDecoration:"none"}} src="https://bhuvan.nrsc.gov.in/home/images/bhuvanlite.png"  width="50px" alt="" />
       <Link to="/About" style={{textDecoration: 'none ',color:"white",fontWeight:"bold"}} ><li >About<FaInfo style={{paddingLeft:'10px'}}/></li></Link> 
       <Link to="/Contact" style={{textDecoration: 'none ',color:"white",fontWeight:"bold"}} ><li>Contact  <FaPhoneAlt style={{paddingLeft:'10px'}}/></li></Link> 
       <Link to="/Resource" style={{textDecoration: 'none ',color:"white",fontWeight:"bold"}} ><li>Resources<FaFile style={{paddingLeft:'10px'}}/></li></Link> 
      </ul>
       <footer>
           <h5 className='footer'> &copy; Team Celestial Coders</h5>
       </footer>
    </div>
    </>
  );
};

export default Nav;

import * as React from 'react';
//import '../assets/Mike-G.png';

const mikeimage = require('../assets/Mike.png');
const billImage = require('../assets/Bill.png');
const rogerImage = require('../assets/Roger.png');

const IssueDetail: any = (props) => (
  <div onMouseLeave={props.handleMouseLeave} className="issue-detail">
    <h1>INTEL's VIEW</h1>
    <h4>2nd Amendment</h4>
    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
       ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
       esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </p> <br />
    <p>Top Three Politicians Donated To:</p>
    <div className="row">
      <img className="images" src={mikeimage} />
      <img className="images" src={billImage} />
      <img className='images' src={rogerImage} />
    </div>
  </div>
)

export default IssueDetail;
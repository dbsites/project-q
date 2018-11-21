import * as React from 'react';

const blurPolitOne = require('../assets/blur-polit-1.jpg');
const blurPolitTwo = require('../assets/blur-polit-2.jpg');
const blurPolitThree = require('../assets/blur-polit-3.jpg');

const Recipients = (props: any) => {

  let display;

  if (props.data) {
    const {
      recip_1,
      recip_1_amount,
      recip_1_img,
      recip_2,
      recip_2_amount,
      recip_2_img,
      recip_3,
      recip_3_amount,
      recip_3_img
    } = props.data;

    display = (
      <React.Fragment>
        <p className="polit-recip">Top Recipients</p>
        <div className="politician" key="recip-1">
          <img src={recip_1_img} />
        </div>
        <p className="polit-info-name">{`${recip_1}`}</p>
        <p className="polit-info">{`${recip_1_amount}`}</p>
        <div className="politician">
          <img src={recip_2_img} />
        </div>
        <p className="polit-info-name">{`${recip_2}`}</p>
        <p className="polit-info">{`${recip_2_amount}`}</p>
        <div className="politician">
          <img src={recip_3_img} />
        </div>
        <p className="polit-info-name">{`${recip_3}`}</p>
        <p className="polit-info">{`${recip_3_amount}`}</p>
      </React.Fragment>
    );
  } else {
    display = (
      <React.Fragment>
        <p className="polit-recip">Loading Recipients...</p>
        <div className="politician" key="recip-1">
          <img src={blurPolitOne} />
        </div>
        <p className="polit-info-name">No Recipients</p>
        <p className="polit-info">$-</p>
        <div className="politician">
          <img src={blurPolitTwo} />
        </div>
        <p className="polit-info-name">No Recipients</p>
        <p className="polit-info">$-</p>
        <div className="politician">
          <img src={blurPolitThree} />
        </div>
        <p className="polit-info-name">No Recipients</p>
        <p className="polit-info">$-</p>
      </React.Fragment>
    );
  }

  return (
    <div className="issues-politicians">
      {display}
    </div>
  );
}

export default Recipients;
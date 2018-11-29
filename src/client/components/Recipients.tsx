import * as React from 'react';

const blurPolitOne = require('../assets/blur-polit-1.jpg');
const blurPolitTwo = require('../assets/blur-polit-2.jpg');
const blurPolitThree = require('../assets/blur-polit-3.jpg');

const Recipients = (props: any) => {

  let display;

  // console.log('props.data = ', props.data);

  if (!props.data) {
    display = (
      <React.Fragment>
        <p className="polit-recip">Loading...</p>
        <div className="politician" key="recip-1">
          <img src={blurPolitOne} />
        </div>
        <p className="polit-info-name">Recipient #1</p>
        <p className="polit-info">$-</p>
        <div className="politician">
          <img src={blurPolitTwo} />
        </div>
        <p className="polit-info-name">Recipient #2</p>
        <p className="polit-info">$-</p>
        <div className="politician">
          <img src={blurPolitThree} />
        </div>
        <p className="polit-info-name">Recipient #3</p>
        <p className="polit-info">$-</p>
      </React.Fragment>
    );
  } else if (Object.keys(props.data).length === 0) {
    display = (
      <React.Fragment>
        <p className="polit-recip">Top Recipients</p>
        <div className="politician" key="recip-1">
          <img src={blurPolitOne} />
        </div>
        <p className="polit-info-name">No Recipients</p>
        <p className="polit-info-hide">$-</p>
        <div className="politician">
          <img src={blurPolitTwo} />
        </div>
        <p className="polit-info-name">No Recipients</p>
        <p className="polit-info-hide">$-</p>
        <div className="politician">
          <img src={blurPolitThree} />
        </div>
        <p className="polit-info-name">No Recipients</p>
        <p className="polit-info-hide">$-</p>
      </React.Fragment>
    );
  } else {
    const {
      recip_1,
      recip_1_amount,
      recip_1_img,
      recip_1_info,
      recip_2,
      recip_2_amount,
      recip_2_img,
      recip_2_info,
      recip_3,
      recip_3_amount,
      recip_3_img,
      recip_3_info,
    } = props.data;

    display = (
      <React.Fragment>
        <p className="polit-recip">Top Recipients</p>
        <div className="politician" key="recip-1">
          <a href={recip_1_info} target='_blank' className="recip_links"><img src={recip_1_img} /></a>
        </div>
        <p className="polit-info-name">{`${recip_1}`}</p>
        <p className="polit-info">{`${recip_1_amount}`}</p>
        <div className="politician">
          <a href={recip_2_info} target='_blank' className="recip_links"><img src={recip_2_img} /></a>
        </div>
        <p className="polit-info-name">{`${recip_2}`}</p>
        <p className="polit-info">{`${recip_2_amount}`}</p>
        <div className="politician">
          <a href={recip_3_info} target='_blank' className="recip_links"><img src={recip_3_img} /></a>
        </div>
        <p className="polit-info-name">{`${recip_3}`}</p>
        <p className="polit-info">{`${recip_3_amount}`}</p>
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
import * as React from 'react';

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
        <p className="polit-info">{`${recip_1} ${recip_1_amount}`}</p>
        <div className="politician">
          <img src={recip_2_img} />
        </div>
        <p className="polit-info">{`${recip_2} ${recip_2_amount}`}</p>
        <div className="politician">
          <img src={recip_3_img} />
        </div>
        <p className="polit-info">{`${recip_3} ${recip_3_amount}`}</p>
      </React.Fragment>
    );

  } else {
    display = (
      <div className="issues-politicians"></div>
    );
  }

  return (
    <div className="issues-politicians">
      {display}
    </div>
  );
}

export default Recipients;
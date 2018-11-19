import * as React from 'react';

const Recipients = (props: any) => {
  const p1: any[] = [];
  const p2: any[] = [];
  const p3: any[] = [];

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

    p1.push(recip_1, recip_1_amount, recip_1_img);
    p2.push(recip_2, recip_2_amount, recip_2_img);
    p3.push(recip_3, recip_3_amount, recip_3_img);
  } else {
    return (
      <div className="issues-politicians"></div>
    );
  }

  return (
    <div className="issues-politicians">
      <p className="polit-recip">Top Recipients</p>
      <div className="politician" key="recip-1">
        <img src={p1[2]} />
      </div>
      <p className="polit-info">{`${p1[0]} ${p1[1]}`}</p>
      <div className="politician">
        <img src={p2[2]} />
      </div>
      <p className="polit-info">{`${p2[0]} ${p2[1]}`}</p>
      <div className="politician">
        <img src={p3[2]} />
      </div>
      <p className="polit-info">{`${p3[0]} ${p3[1]}`}</p>
    </div>
  );
}

export default Recipients;
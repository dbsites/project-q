import * as React from 'react';

const issueMatcher = {
  '0755baa6-1b5f-49c2-918a-457f1e16fe1c': "Civil/Women's Rights",
  '2383b711-794f-4829-a189-25ceb32753a2': "Economy and Jobs",
  '30d820a3-9d0c-48a2-ae5e-0624ad0ffc4f': "Health Care",
  '70df714e-8566-4265-abe5-266d5a2004a9': "2nd Amendment",
  'f58fc13c-cb4d-4011-bf26-9fbd5eaef3b2': "Drug Legalization",
  '58400255-75d9-41ad-b156-b073dbc03b0e': "Money and Politics"
} 



const IssuesCharts = (props: any) => {
  console.log('issues props: ', props.selected)
  // const {
  //   description, logo, ticker, //name
  // } = props;

  const issues = Object.keys(props.selected)
    .filter(key => key !== 'description' && key !== 'logo' && key !== 'ticker');

  console.log('issues key issues: ', issues);

  let display;

  if (!props.selected.id) {
    display = (<p>Click a company to see their overview</p>);
  } else {
    display = (<p>Future issues charts for {props.selected.name}</p>)
  }

  return (
    <div className='quad'>
      <h3>Issues</h3>
      {display}
    </div>
  );
}

export default IssuesCharts;

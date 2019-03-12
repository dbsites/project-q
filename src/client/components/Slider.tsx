import * as React from 'react';


const Slider = (props: any) => {
  const { issueId, issuesSelected, updateWeight } = props;
  return (
    <input 
      type="range" 
      min="1" 
      max="10" 
      value={issuesSelected[issueId].weight} 
      id={issueId}
      className='slider'
      onChange={(event)=>updateWeight(issueId, Number(event.target.value))}
    />
  )
}

export default Slider;
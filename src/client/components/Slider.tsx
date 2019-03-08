import * as React from 'react';


const Slider = (props: any) => {
  const { issueId, issuesSelected, updateWeight } = props;
  return (
      <input 
        type="range" 
        min="1" 
        max="10" 
        value={issuesSelected[issueId].weight} 
        className="slider" 
        id={issueId} step="1" 
        onChange={(event)=>updateWeight(issueId, event.target.value)}/>
  )
}

export default Slider;
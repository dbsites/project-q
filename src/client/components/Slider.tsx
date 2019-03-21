import * as React from 'react';


const Slider = (props: any) => {
  const { issueId, issuesSelected, updateWeight } = props;
  return (
    <div>
      <input 
        type="range" 
        min="1" 
        max="10" 
        value={issuesSelected[issueId].weight} 
        id={issueId}
        className='slider'
        onChange={(event)=>updateWeight(issueId, Number(event.target.value))}
      />
      <ul className="range-labels">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
      </ul>
    </div>
  )
}

export default Slider;
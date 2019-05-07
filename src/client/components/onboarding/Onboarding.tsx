/**
 * @module Onboarding.tsx
 * @description Ethiq Onboarding Upon Login
 */

import * as React from 'react';

import './Onboarding.css';

import Button from '../Button';

const doctor = require('../../assets/doctor.png')
const handShake = require('../../assets/hand-shake.png')
const like = require('../../assets/like.png')
const mortarboard = require('../../assets/mortarboard.png')
const rifle = require('../../assets/rifle.png')

interface OnboardingProps {
  updateIssuesSelected: any,
}

const Onboarding = (props: OnboardingProps) => {
  return (
    <div className='onboarding'>
      <div className='onboarding-step'>
        <div className='onboarding-step-text'>Step 1: Select your most important issues.</div>
        <div className='onboarding-step-icons'>
          <img className="onboarding-icons-img" alt="Mortar Board Icon" src={mortarboard} />
          <img className="onboarding-icons-img" alt="Doctor Icon" src={doctor} />
          <img className="onboarding-icons-img" alt="Rifle Icon" src={rifle} />
        </div>
      </div>
      <div className='onboarding-step'>
        <div className='onboarding-step-text'>Step 2: Tell us where you stand on these issues.</div>
        <div className='onboarding-step-icons'>
          
          <img className="onboarding-icons-img" alt="Like Icon" src={like} />
        </div>
      </div>
      <div className='onboarding-step'>
        <div className='onboarding-step-text'>Step 3: Discover companies most aligned with your values.</div>
        <div className='onboarding-step-icons'>
          
          <img className="onboarding-icons-img" alt="Hand Shake Icon" src={handShake} />
        </div>
      </div>
      <Button 
        className="onboarding-button"
        onClick={props.updateIssuesSelected}
      >
        BEGIN
      </Button>
    </div>
  )
};

export default Onboarding;

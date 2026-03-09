import React, { useState } from 'react';
import './FeatureFlag.css';

const flags = { showBetaFeature: true };

const FeatureFlag = ({ flagName, children, fallback = null }) => {
  return flags[flagName] ? children : fallback;
};

const Demo = () => (
  <div className="featureflag-container">
    <h2>Feature Flag</h2>
    <FeatureFlag flagName="showBetaFeature" fallback={<p>Feature is hidden</p>}>
      <div className="beta-box">🚀 Beta Feature is ON!</div>
    </FeatureFlag>
  </div>
);
export default Demo;

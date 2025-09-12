import React from 'react';

export const StarIcon = ({ className = '', size = 24, color = '#FBBF24', opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{opacity}}>
    <path d="M12 2.5l2.9 5.88 6.5.95-4.7 4.58 1.11 6.49L12 17.77 6.19 20.4l1.11-6.49-4.7-4.58 6.5-.95L12 2.5z" fill={color}/>
  </svg>
);

export const PlanetIcon = ({ className = '', size = 64, primary = '#34D399', ring = '#60A5FA', opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{opacity}}>
    <circle cx="32" cy="32" r="16" fill={primary}/>
    <ellipse cx="32" cy="34" rx="26" ry="8" fill={ring} opacity="0.6"/>
    <ellipse cx="32" cy="30" rx="26" ry="8" fill={ring} opacity="0.35"/>
  </svg>
);

export const RocketIcon = ({ className = '', size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M40 4C26 8 18 24 18 24l-8 2 6 6-2 8 8-2 6 6 2-8s16-8 20-22c1.2-4.2-3.8-9.2-10-10z" fill="#60A5FA"/>
    <circle cx="34" cy="22" r="4" fill="#93C5FD"/>
    <path d="M18 38l8-2 2-8-8 2-2 8z" fill="#F59E0B"/>
    <path d="M16 48l6-6" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round"/>
    <path d="M22 50l6-6" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

export const RobotHeadIcon = ({ className = '', size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="12" y="18" width="40" height="28" rx="8" fill="#22D3EE"/>
    <circle cx="24" cy="32" r="6" fill="#0EA5E9"/>
    <circle cx="40" cy="32" r="6" fill="#0EA5E9"/>
    <rect x="28" y="14" width="8" height="6" rx="2" fill="#14B8A6"/>
    <rect x="20" y="40" width="24" height="4" rx="2" fill="#0EA5E9"/>
  </svg>
);

export const SparkleIcon = ({ className = '', size = 20, color = '#A78BFA', opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{opacity}}>
    <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" fill={color}/>
  </svg>
);

export const BlobShape = ({ className = '', size = 160, color = 'rgba(99,102,241,0.15)' }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fill={color} d="M41.8,-53.8C54.3,-45.7,64.5,-33.4,69.6,-19.3C74.7,-5.2,74.8,10.8,68.6,24.2C62.5,37.7,50.1,48.6,36.6,56.4C23.1,64.2,8.5,68.8,-6.7,76.6C-22,84.4,-44,95.3,-56.9,89.6C-69.9,83.9,-73.8,61.7,-77.4,42.2C-81,22.7,-84.3,5.9,-80.6,-9.2C-76.8,-24.3,-66.1,-37.6,-53.1,-46.3C-40.1,-55,-24.9,-59.1,-10.4,-62.9C4.1,-66.7,8.2,-70.2,17.8,-67.3C27.4,-64.4,41.4,-55.9,41.8,-53.8Z" transform="translate(100 100)" />
  </svg>
);

const IconLibrary = { StarIcon, PlanetIcon, RocketIcon, RobotHeadIcon, SparkleIcon, BlobShape };
export default IconLibrary;



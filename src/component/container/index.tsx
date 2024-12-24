import React from 'react';
import './container.css';

interface ContainerProps {
    children: React.ReactNode
    width?: string;
    height?: string;
    padding?: string;
    margin?: string;
    backgroundColor?: string;
}

const Container: React.FC<ContainerProps> = ({
    children,
    width = '100%',
    height = '100%',
    padding = '20px',
    margin = '0',
    backgroundColor = '#f0f0f0',
  }) => {
    const containerStyle: React.CSSProperties = {
      width,
      height,
      padding,
      margin,
      backgroundColor,
    };
  
    return (
        <div className="container" style={containerStyle}>
        {children}
      </div>
    );
  };

export default Container;
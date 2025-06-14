import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = (props) => {
  // Determine button classes based on props
  const getButtonClasses = () => {
    let classes = 'btn ';
    
    // Add custom class if provided
    if (props.class) {
      classes += props.class + ' ';
    }
    
    // Add size class if provided (sm, lg)
    if (props.size) {
      classes += `btn-${props.size} `;
    }
    
    // Add variant class (defaults to primary)
    const variant = props.variant || 'primary';
    classes += `btn-${variant} `;
    
    // Add gradient class if specified
    if (props.gradient) {
      classes += 'bg-gradient ';
    }
    
    // Add outline class if specified
    if (props.outline) {
      classes = classes.replace(`btn-${variant}`, `btn-outline-${variant}`);
    }
    
    // Add rounded-pill if specified
    if (props.rounded) {
      classes += 'rounded-pill ';
    }
    
    // Add shadow if specified
    if (props.shadow) {
      classes += 'shadow ';
    }
    
    return classes.trim();
  };

  // Button styles that match your dashboard theme
  const buttonStyles = {
    primary: {
      background: 'linear-gradient(145deg, #00c3ff, #0084b6)',
      border: 'none',
      color: 'white',
      boxShadow: '0 5px 15px rgba(0, 195, 255, 0.3)',
    },
    secondary: {
      background: 'linear-gradient(145deg, #6c757d, #495057)',
      border: 'none',
      color: 'white',
    },
    danger: {
      background: 'linear-gradient(145deg, #dc3545, #a71d2a)',
      border: 'none',
      color: 'white',
    },
    // Add more variants as needed
  };

  // Render as button or link based on props
  if (props.onClick || props.type === 'button') {
    return (
      <button
        type={props.type || 'button'}
        className={getButtonClasses()}
        onClick={props.onClick}
        disabled={props.disabled}
        style={props.style || buttonStyles[props.variant] || {}}
      >
        {props.icon && <FontAwesomeIcon icon={props.icon} className={props.text ? 'me-2' : ''} />}
        {props.text}
      </button>
    );
  }

  return (
    <Link
      to={props.url || '#'}
      className={getButtonClasses()}
      style={props.style || buttonStyles[props.variant] || {}}
    >
      {props.icon && <FontAwesomeIcon icon={props.icon} className={props.text ? 'me-2' : ''} />}
      {props.text}
    </Link>
  );
};

// Default props
Button.defaultProps = {
  variant: 'primary',
  size: null,
  gradient: false,
  outline: false,
  rounded: false,
  shadow: false,
  disabled: false,
};

export default Button;
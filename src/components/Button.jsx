"use client";

import React from 'react'
import './button.css'

function Button({text, handleClick}) {
  return (
    <button className='btn-primary rounded-full shadow-2xl/30' onClick={handleClick}>
      {text}
    </button>
  );
}

export default Button
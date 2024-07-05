import React, { useState } from 'react';
import Paintspace from './Paintspace'

export default function Menu() {
  
    const [sizes, setSizes] = useState(10); // Initialize brush size with 10
    const [color, setColor] = useState("#000000"); // Initialize brush color with black

    const handleBrushSizeChange = (event) => {
        setSizes(parseInt(event.target.value)); // Update brush size state
    };

    const handleBrushColorChange = (event) => {
        setColor(event.target.value); // Update brush color state
    };

    const brushStyle = {
        width: sizes + 'px', // Set brush size
        height: sizes + 'px', // Set brush size
        backgroundColor: color, // Set brush color
        borderRadius: '50%', // Make brush circular
        position: 'absolute' // Set position fixed for brush
    };

    const brushMove = (e) => {
      
        const paintBrush = document.querySelector('.brush');
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        paintBrush.style.left = mouseX + 'px'; // Set left position
        paintBrush.style.top = mouseY + 'px';
        // paintBrush.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    window.addEventListener('mousemove', brushMove);

    return (
        <div className='w-full h-full'>
        <div className='flex justify-around bg-blue-300 w-full h-10 items-center'>
            <div className='w-3 h-3 bg-black rounded-full brush' style={brushStyle}></div>
            <div className='flex justify-around bg-green-400 w-1/3 p-1'>
                <div className='select-none'>Brush Size: {sizes}</div>
                <input className='size' onChange={handleBrushSizeChange} type="range" name="" min='1' max='60' value={sizes} />
            </div>
            <div className='flex justify-around bg-green-400 w-1/3 p-1'>
                <div className='select-none'>Brush Color</div>
                <input type="color" className='colors' onChange={handleBrushColorChange} value={color} />
            </div>
        </div>
            <Paintspace lineColor = {color} lineWidth = {sizes}/>
        </div>
    );
}

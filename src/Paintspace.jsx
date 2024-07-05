import React, { useEffect, useRef, useState } from 'react';

export default function Paintspace(props) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    // Set initial canvas size and context properties
    resizeCanvas();
    setContextProperties();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setContextProperties();
  }, [props.lineColor, props.lineWidth]);
    
  const handleResize = () => {
    resizeCanvas();
    setContextProperties();
  };

  const setContextProperties = () => {
    const ctx = ctxRef.current;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = props.lineColor;
    ctx.lineWidth = props.lineWidth;
  };

  const startDraw = (e) => {
    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };
  
const clickDraw = (e)=>{
  const ctx = ctxRef.current;
  ctx.beginPath();
  let radius = props.lineWidth/2
  ctx.arc(e.nativeEvent.offsetX, e.nativeEvent.offsetY, radius, 0 , 2*Math.PI);
}
  const endDraw = () => {
    const ctx = ctxRef.current;
    ctx.closePath();
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = ctxRef.current;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  };

  return (
    <canvas
      id='workspace'
      className='bg-slate-100'
      onMouseDown={startDraw}
      onMouseUp={endDraw}
      onClick={clickDraw}
      onMouseMove={draw}
      ref={canvasRef}
      style={{ width: "100%", height: "94.5vh", cursor: "none" }}
    ></canvas>
  );
}

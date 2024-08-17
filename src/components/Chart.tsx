"use client";
import React, { useEffect, useRef } from 'react'

// import { Chart as ChartJS, registerables } from 'chart.js';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';

// ChartJS.register(...registerables);

interface ChartProps {
  value: number;
}


const Chart = ({ value }: ChartProps) => {
  const { randomPoint, isRoundStarted, roundSpeed } = useAppSelector((state: RootState) => state.game)

  const canvRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (randomPoint < 10) {

      const canvas = canvRef.current;
      if (canvas) {
        const context = canvas.getContext("2d");


        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);

          context.strokeStyle = "rgb(8, 145, 178)"; // Aqua-like color
          context.lineWidth = 4; // Line width

          // Set line cap and join for smoother curves
          context.lineCap = "round"; // Rounded ends of the line
          context.lineJoin = "round"; // Rounded corners where lines meet

          // Set shadow for a more 3D effect
          context.shadowColor = "rgba(8, 145, 178, 0.1)"; // Subtle shadow color
          context.shadowBlur = 2; // Blur radius for the shadow
          context.shadowOffsetX = 2; // Horizontal shadow offset
          context.shadowOffsetY = 4; // Vertical shadow offset

          // Draw the line
          context.beginPath();
          context.moveTo(50, 300);
          context.quadraticCurveTo(150, 300, randomPoint * 50, (300 - randomPoint * 30));
          context.stroke();
        }
      }
    }
  }, [randomPoint])

  return (
    <div className="w-full h-full bg-gray-900 rounded-md overflow-hidden">
      <div className="flex justify-center items-center relative  w-[500px] h-[300px] overflow-hidden">
        <div
          // className={`w-full h-full absolute bg-gray-900 ${isRoundStarted ? "overlay-translate" : "translate-x-[500px]"}`}
          className={`w-full h-full absolute bg-gray-900 transition-transform duration-300`}
          // style={{ animationDuration: `${(6 - roundSpeed) * 1800}ms`}}
        style={{ transform: `translateX(${((value) * 50) + 2}px)` }}
        ></div>
        <canvas ref={canvRef} width={500} height={300} className='bg-gray-900 rounded-md'></canvas>

        <p className="text-6xl absolute left-10 top-10">{value}x</p>
      </div>
    </div>
  )
}

export default Chart

// const canvRef = useRef<HTMLCanvasElement | null>(null);

// useEffect(() => {
//   const canvas = canvRef.current;
//   if (canvas) {
//     const context = canvas.getContext("2d");
//     if (context) {
//       context.beginPath()
//       context.moveTo(10, 100);
//       context.quadraticCurveTo(150, 100, 230, 20);
//       context.stroke();
//     }
//   }
// }, [])

{/* <ApexChart 
        options={{
          
          fill,
          stroke,
          xaxis,
          yaxis,
          grid,
          dataLabels,
          // chart,
        }}
        height={300}
        width={500}
        series={series}
        type="line"
      /> */}


// const chart = {
//   height: "100%",
//   maxWidth: "100%",
//   type: "area",
//   fontFamily: "Inter, sans-serif",
//   dropShadow: {
//     enabled: false,
//   },
//   toolbar: {
//     show: false,
//   },
// };

// const tooltip = {
//   enabled: true,
//   x: {
//     show: false,
//   },
// };

// const fill = {
//   type: "gradient",
//   gradient: {
//     // opacityFrom: 0.55,
//     opacityTo: 0,
//     shade: "#1C64F2",
//     gradientToColors: ["#1C64F2"],
//   },
// };

// const dataLabels = {
//   enabled: false,
// };


// const stroke = {
//   width: 6,
// };

// const grid = {
//   show: false,
//   strokeDashArray: 4,
//   padding: {
//     left: 2,
//     right: 2,
//     top: 0
//   },
// };

// const xaxis = {
//   categories: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   labels: {
//     show: true,
//   },
//   axisBorder: {
//     show: false,
//   },
//   axisTicks: {
//     show: false,
//   },
// };

// const yaxis = {
//   categories: Array(6).fill(1).map((item, index) => item + index * 10),
//   show: true,
// };

// const series = [
//   {
//     name: "New users",
//     data: [1, 2, 4, 6, 7, 8, 9, 3, 2, 1],
//     color: "#1A56DB",
//   },
// ];

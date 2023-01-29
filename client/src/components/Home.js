import React, { useState, useEffect, useRef } from 'react'
import TemporaryDrawer from "../UI/Sidebar";
import Counter from "./Counter";
import Header from '../UI/Header';
import Shortcuts from '../UI/Shortcuts';
import h337 from 'heatmapjs';

export default function Home({ camId = 0 }) {
  const [count, setCount] = useState(0)
  const [points, setPoints] = useState([])
  const [currCamId, setCamId] = useState(camId)
  const [heatmap, setHeatmap] = useState(null)

  // const [heatmap, setHeatmap] = useState(heatmapInstance)
  useEffect(() => {
    console.log(currCamId, 'new cam id')
    const interval = setInterval(() => {
      if (currCamId <= -1) {

        fetch('http://127.0.0.1:5000/snapshot?camId=' + currCamId).then(res => res.json()).then(res => {
          // console.log(res)
          setPoints(res)
        })
      } else {
        var mockPoints = [];
        var max = 2;
        var width = 640;
        var height = 480;
        var len = 100;

        while (len--) {
          var val = Math.floor(Math.random() * 100);
          max = Math.max(max, val);
          var point = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height),
            value: val
          };
          mockPoints.push(point);
        }
        // heatmap data format
        setPoints(mockPoints)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [currCamId])

  useEffect(() => {
    var heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: document.querySelector('.Heatmap')
    });
    // now generate some random data
    // var points = [];
    var max = 2;
    var width = 640;
    var height = 480;
    // var len = 200;

    // while (len--) {
    //   var val = Math.floor(Math.random() * 100);
    //   max = Math.max(max, val);
    //   var point = {
    //     x: Math.floor(Math.random() * width),
    //     y: Math.floor(Math.random() * height),
    //     value: val
    //   };
    //   points.push(point);
    // }
    // heatmap data format
    var data = {
      max: max,
      data: points
    };
    // if you have a set of datapoints always use setData instead of addData
    // for data initialization
    heatmapInstance.setData(data);
    setCount(points.length)
    setHeatmap(prev => {
      if (prev !== undefined && prev !== null) {
        prev.setData({ max: 0, data: [] })
      }

      return heatmapInstance
    })
  }, [points, currCamId])

  return (
    <div>
      <Header />
      <div className='flex flex-col gap-y-5 justify-center align-middle items-center'>
        <div className='bg-[#ecececee] rounded-[15px] text-black w-[40%] h-[40%] text-center'>
          <h1>Floor 1</h1>
          <h2>Capacity: {count}/100</h2>
        </div>
        <div>
          <div className='Heatmap'>
            <canvas  style={{ backgroundImage: "url(/3rd-ssmu.png)" }} className='rounded-[15px]' width={640} height={480} />
          </div>
          <div className='flex justify-center items-center my-5'>
            <img width={100} height={50} src={'legend.png'} className='rounded-lg' />
          </div>
        </div>
        <Shortcuts camId={currCamId} setCamId={setCamId} />
      </div>
    </div>
  )
}

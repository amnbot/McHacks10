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
    setInterval(() => {
      fetch('http://127.0.0.1:5000/snapshot?camId=' + currCamId).then(res => res.json()).then(res => {
        // console.log(res)
        setPoints(res)
        setCount(res.length)
      })
    }, 3000)
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
    setHeatmap(prev => {
      if (prev !== undefined && prev !== null) {
        prev.setData({ max: 0, data: [] })
      }

      return heatmapInstance
    })

    setInterval(() => { })
  }, [points, currCamId, heatmap])

  return (
    <div>
      <Header />
      <div className='bg-slate-600 rounded-[15px] text-white w-[15%] h-[25%] text-center'>
        <h1>Floor 1</h1>
        <h2>Capacity: {count}/100</h2>
      </div>
      <div>
        <div className='Heatmap'>
          <canvas width={640} height={480} />
        </div>
      </div>
      <Shortcuts camId={currCamId} setCamId={setCamId} />
    </div>
  )
}

import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

let data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Query',
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',

      ],
      borderWidth: 1,
    },
  ],
};

function PieChart(props) {
  const [state, setState] = useState(data)
  useEffect(() => {
    
    setState((prevState) => {
      prevState.datasets[0]['data'] = props.data
      prevState.labels = props.labels
      return ({ ...prevState })
    })
  }, [props.data])


  return (
    <>
      <div className=''>
        <h4 className='title'>Summary</h4>
      </div>
      <Pie data={state} />
    </>
  )
};

export default PieChart;
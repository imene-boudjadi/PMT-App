import React, {useState, useEffect} from 'react';
import axios from '../axios'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Histogram = () => {
    const parameters = ['ING+', 'CU', 'AC', 'CS', 'TS', 'TECHNICIEN', 'TECHNIQUE', 'AUTRE', 'ADM', 'AIDE'];

    const [histogramData, setHistData] = useState([]);



    useEffect(() => {
      recupererStatistiques();
  }, []); // Empty dependency array to ensure useEffect runs only once
  
  const recupererStatistiques = async () => {
      try {
          const response = await axios.get("/calculerCSPPers");
          console.log('Data from server1:',response);
  
           const calculs = response.data.statistic;
           console.log('Data from server2:', calculs);
           setHistData(calculs);
           
      } catch (error) {
          console.error('Error fetching data:', error.response);
      }
  };

  const chartData = histogramData.map((value, index) => ({
    name: parameters[index],
    value: value,
  }));
    
    return (
        <div className="centered-container">
            <div className="card-hist">
                <div className="card-body">
                    <h2 className="card-title">Mouvement des Effectifs par CSP</h2>
                    <div className="centered-chart">
                        <BarChart width={550} height={370} data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#606060cc" />
                        </BarChart>
                    </div>
                </div>
            </div>
        </div>
    );
};
    
export default Histogram;

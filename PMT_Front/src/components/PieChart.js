import React, { useState, useEffect } from 'react';
import axios from '../axios';
import ReactApexChart from 'react-apexcharts';

const PieChart = () => {
    const [chartData, setChartData] = useState({
        options: {
            labels: [],
        },
        series: [],
        colors: ['#FF6384', '#36A2EB', '#FFCE56'],
    });

    useEffect(() => {
        recupererStatistiques();
    }, []); // Empty dependency array to ensure useEffect runs only once

    const recupererStatistiques = async () => {
        try {
            const response = await axios.get("/calculerActPers");
            console.log('Data from server1:',response);

             const calculs = response.data.statistic;
             console.log('Data from server2:', calculs);
             const activities = ['FST', 'FSP', 'FCM'];
             console.log('Data from server3:', activities);

             const seriesData = activities.map(activity => calculs[activity]);


             setChartData({
                 options: {
                     labels: activities,
                 },
                 series: seriesData,
                 colors: ['#F48220', '#606060cc', '#34444c'],
             });
        } catch (error) {
            console.error('Error fetching data:', error.response);
        }
    };

    return (
        <div className="centered-container">
        <div className="card-pie">
            <div className="card-body">
                <h2 className="card-title">Mouvement des effectifs <br /> par fonction</h2>
                <div className="centered-chart">
                    <ReactApexChart
                        options={{
                            ...chartData.options,
                            colors: chartData.colors,
                            
                        }}
                        series={chartData.series}
                        type="pie"
                        width="150%"
                    />
                </div>
            </div>
        </div>
    </div>
    );
};

export default PieChart;

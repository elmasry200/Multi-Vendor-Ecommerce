"use client";
import React, { useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';


export default function WeeklySalesChart() {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
        },
    };
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Sales',
                data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            //   {
            //     label: 'Orders',
            //     data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
            //     borderColor: 'rgb(53, 162, 235)',
            //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
            //   },
        ],
    };


    const tabs = [
        {
            title: "Sales",
            type: "sales",
            data: {
                labels,
                datasets: [
                    {
                        label: 'Sales',
                        data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },

                ],
            }
        },
        {
            title: "Orders",
            type: "orders",
            data: {
                labels,
                datasets: [
                    {
                        label: 'Orders',
                        data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
                        borderColor: 'rgb(0, 137, 132)',
                        backgroundColor: 'rgba(0, 137, 132, 0.5)',
                    },

                ],
            }
        }
    ]

    const [chartToDisplay, setChartToDisplay] = useState(tabs[0].type);

    return (
        <div className='dark:bg-slate-700 bg-slate-50 p-8 rounded-lg shadow-xl'>
            <h2 className='text-xl font-bold mb-4 text-slate-800 dark:text-slate-50'>Weekly Sales</h2>
            <div className="p-4">
                {/* Tabs */}


                <div className="border-b border-gray-400 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-200 dark:text-gray-400">

                        {
                            tabs.map((tab, i) => {
                                return (
                                    <li className="me-2" key={i}>
                                        <button onClick={() => setChartToDisplay(tab.type)} className={chartToDisplay == tab.type ?
                                            "inline-flex items-center justify-center p-4 text-orange-600 border-b-2 border-orange-600 rounded-t-lg active dark:text-orange-500 dark:border-orange-500 group" : "inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg text-slate-800 hover:text-gray-700 hover:border-gray-100 dark:hover:text-gray-100 group"
                                        }>
                                            {tab.title}
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                {/* Content to display */}
                {
                    tabs.map((tab, i) => {
                        if (chartToDisplay == tab.type) {
                            return <Line key={tab.type} options={options} data={tab.data} />
                        };
                        return null;
                    })}
            </div>
        </div>
    )
}

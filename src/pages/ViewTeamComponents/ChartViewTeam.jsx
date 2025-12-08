import React from 'react'
import ReactDOM from 'react-dom'
import { PieChart } from '@mui/x-charts'
import { valueFormatter ,  makePieChartData} from '../../services/webUsage';
import { legendClasses } from '@mui/x-charts/ChartsLegend';
function ChartViewTeam({
    completed = 100 , inProgress = 0, notStarted = 0 
}) {
    return (
        <div className='w-full min-h-60 mt-5 flex flex-col items-start justify-between'>
            <div className='mt-4 flex items-center justify-start w-full min-h-50'>
                <PieChart
                    series={[
                        {
                            data: makePieChartData(completed , inProgress , notStarted), 
                            highlightScope: { fade: 'global', highlight: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            valueFormatter,
                        },
                    ]}
                    height={(window.innerWidth) <= 768 ? 220 : 320}
                    width={(window.innerWidth) <= 768 ? 220 : 320}
                    slotProps={{
                        legend: {
                            sx: {
                                gap: '16px',
                                // CSS-in-JS
                                [`.${legendClasses.mark}`]: {
                                    height: 24,
                                    width: 15,
                                },
                                // CSS class
                                ['.MuiChartsLegend-series']: {
                                    gap: '7px',
                                    fontSize: (window.innerWidth <= 768? 16 : 18),
                                    fontWeight: 500

                                },
                            },
                        },
                    }}
                />

            </div>
        </div>
    )
}
export default ChartViewTeam
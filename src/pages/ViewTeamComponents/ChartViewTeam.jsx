import React from 'react'
import ReactDOM from 'react-dom'
import { PieChart } from '@mui/x-charts'
import { valueFormatter , desktopOS } from '../../services/webUsage';
import { legendClasses } from '@mui/x-charts/ChartsLegend';
function ChartViewTeam() {
    return (
        <div className='w-full min-h-60 mt-5'>
            <h2 className='font-md text-2xl text-black w-full'>Thống kê</h2>
            <div className='mt-4 flex items-center justify-start w-full min-h-50'>
                <PieChart
                    series={[
                        {
                            data: desktopOS,
                            highlightScope: { fade: 'global', highlight: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            valueFormatter,
                        },
                    ]}
                    height={320}
                    width={320}
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
                                    gap: '8px',
                                    fontSize: '18px',
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
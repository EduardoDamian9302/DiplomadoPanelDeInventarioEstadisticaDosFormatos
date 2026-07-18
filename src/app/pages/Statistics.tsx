import { FilterBar } from "../components/FilterBar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useState } from "react";
import { LayoutTemplate, Palette, Calendar, TrendingUp, TrendingDown } from "lucide-react";

// Datos para el Heatmap (Matriz simulada)
const heatMapData = [
  { day: 'Lun', hours: [10, 20, 45, 80, 50, 20, 10, 5] },
  { day: 'Mar', hours: [15, 25, 55, 90, 60, 25, 12, 8] },
  { day: 'Mié', hours: [20, 30, 60, 100, 75, 30, 15, 10] },
  { day: 'Jue', hours: [18, 28, 50, 85, 55, 28, 14, 9] },
  { day: 'Vie', hours: [25, 40, 70, 120, 90, 40, 20, 15] },
  { day: 'Sáb', hours: [5, 10, 20, 40, 30, 15, 8, 4] },
  { day: 'Dom', hours: [8, 12, 25, 45, 35, 18, 10, 5] }
];

const weeklyData = [
  { name: 'Lun', ventas: 4000, usuarios: 2400 },
  { name: 'Mar', ventas: 3000, usuarios: 1398 },
  { name: 'Mié', ventas: 2000, usuarios: 9800 },
  { name: 'Jue', ventas: 2780, usuarios: 3908 },
  { name: 'Vie', ventas: 1890, usuarios: 4800 },
  { name: 'Sáb', ventas: 2390, usuarios: 3800 },
  { name: 'Dom', ventas: 3490, usuarios: 4300 },
];

const monthlyData = [
  { name: 'Ene', ingresos: 12000, gastos: 8000 },
  { name: 'Feb', ingresos: 19000, gastos: 9000 },
  { name: 'Mar', ingresos: 15000, gastos: 8500 },
  { name: 'Abr', ingresos: 22000, gastos: 10000 }
];

const pieData = [
  { name: 'Prod A', value: 400 },
  { name: 'Prod B', value: 300 },
  { name: 'Prod C', value: 300 },
  { name: 'Prod D', value: 200 },
];

const yearlyData = [
  { name: 'Q1', crecimiento: 12 },
  { name: 'Q2', crecimiento: 18 },
  { name: 'Q3', crecimiento: 14 },
  { name: 'Q4', crecimiento: 24 }
];

const COLORS = [
  { name: 'Lila', value: '#8b5cf6', subColors: ['#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed'] },
  { name: 'Azul', value: '#3b82f6', subColors: ['#93c5fd', '#60a5fa', '#3b82f6', '#2563eb'] },
  { name: 'Esmeralda', value: '#10b981', subColors: ['#6ee7b7', '#34d399', '#10b981', '#059669'] },
  { name: 'Rosa', value: '#ec4899', subColors: ['#f9a8d4', '#f472b6', '#ec4899', '#db2777'] }
];

const KPI_DATA = {
  weekly: [
    { label: "Ventas Diarias", value: "19,550", trend: "+12%" },
    { label: "Nuevos Usuarios", value: "30,406", trend: "+8%" },
    { label: "Conversión", value: "4.8%", trend: "-1.2%" },
    { label: "Tasa Rebote", value: "32%", trend: "-2%" }
  ],
  monthly: [
    { label: "Ingresos Mes", value: "$84,300", trend: "+8%" },
    { label: "Gastos Mes", value: "$32,500", trend: "-4%" },
    { label: "Nuevos Leads", value: "1,240", trend: "+15%" },
    { label: "CAC", value: "$45", trend: "-5%" }
  ],
  yearly: [
    { label: "ARR", value: "$1.2M", trend: "+24%" },
    { label: "Retención", value: "94%", trend: "+2%" },
    { label: "Churn", value: "6%", trend: "-2%" },
    { label: "NPS", value: "72", trend: "+4" }
  ]
};

function KPIWidget({ data }: { data: { label: string, value: string, trend: string } }) {
  const isPositive = data.trend.startsWith('+');
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center">
      <div className="text-xs md:text-sm font-medium text-gray-500 mb-1">{data.label}</div>
      <div className="text-lg md:text-2xl font-bold text-gray-900">{data.value}</div>
      <div className={`text-xs md:text-sm mt-1 md:mt-2 font-medium flex items-center gap-1 ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
        {isPositive ? <TrendingUp className="h-3 w-3 md:h-4 md:w-4" /> : <TrendingDown className="h-3 w-3 md:h-4 md:w-4" />}
        {data.trend.replace(/[+-]/, '')} vs ant.
      </div>
    </div>
  );
}

export function Statistics() {
  const [template, setTemplate] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const [colorIdx, setColorIdx] = useState(0);
  const activePalette = COLORS[colorIdx];

  const getHeatmapColor = (val: number) => {
    if (val < 20) return activePalette.subColors[0];
    if (val < 50) return activePalette.subColors[1];
    if (val < 80) return activePalette.subColors[2];
    return activePalette.subColors[3];
  };

  const activeKPIs = KPI_DATA[template];

  return (
    <div className="flex flex-col h-full bg-transparent overflow-y-auto">
      <FilterBar />
      <div className="p-4 md:p-8">
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Estadísticas</h1>
            <p className="text-gray-500 text-sm mt-1">Plantillas preconfiguradas para analizar tus métricas.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white p-2 rounded-lg border border-gray-200 shadow-sm w-full md:w-auto overflow-x-auto shrink-0">
            <div className="flex items-center gap-2 pr-4 border-r border-gray-200 shrink-0">
              <Calendar className="h-4 w-4 text-gray-400" />
              <select 
                value={template} 
                onChange={(e) => setTemplate(e.target.value as any)}
                className="text-sm bg-transparent border-none focus:ring-0 text-gray-700 font-medium cursor-pointer outline-none"
              >
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensual</option>
                <option value="yearly">Anual</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pl-2 shrink-0">
              <Palette className="h-4 w-4 text-gray-400" />
              <div className="flex gap-1.5">
                {COLORS.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setColorIdx(i)}
                    className={`w-6 h-6 rounded-full transition-transform ${colorIdx === i ? 'scale-110 ring-2 ring-offset-1 ring-gray-400' : 'hover:scale-110'}`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Z-Pattern: Row 1 - KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6">
          {activeKPIs.map((kpi, idx) => (
            <KPIWidget key={idx} data={kpi} />
          ))}
        </div>

        {/* Z-Pattern: Row 2 - Charts (Max 2 horizontally on mobile) */}
        {template === 'weekly' && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-6">
            <div className="col-span-1 bg-white p-3 md:p-6 rounded-xl border border-gray-200 shadow-sm h-[200px] md:h-[350px] flex flex-col">
              <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 md:mb-4 truncate">Ventas por Día</h3>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis key="xaxis" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 10}} />
                    <YAxis key="yaxis" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 10}} width={25} />
                    <RechartsTooltip key="tooltip" contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px'}} />
                    <Bar key="bar" dataKey="ventas" fill={activePalette.value} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-span-1 bg-white p-3 md:p-6 rounded-xl border border-gray-200 shadow-sm h-[200px] md:h-[350px] flex flex-col">
              <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 md:mb-4 truncate">Usuarios Activos</h3>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis key="xaxis" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 10}} />
                    <YAxis key="yaxis" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 10}} width={25} />
                    <RechartsTooltip key="tooltip" contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px'}} />
                    <Line key="line" type="monotone" dataKey="usuarios" stroke={activePalette.value} strokeWidth={2} dot={{r: 3, fill: activePalette.value, strokeWidth: 1, stroke: '#fff'}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-span-2 lg:col-span-1 bg-white p-3 md:p-6 rounded-xl border border-gray-200 shadow-sm h-[200px] md:h-[350px] flex flex-col">
              <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 md:mb-4 truncate">Actividad (Calor)</h3>
              <div className="flex-1 flex flex-col justify-center min-h-0">
                <div className="grid grid-cols-[auto_1fr] gap-1 md:gap-2 h-full">
                  <div className="flex flex-col justify-between text-[10px] md:text-xs text-gray-500 py-1">
                    {heatMapData.map(d => <span key={d.day} className="flex items-center flex-1">{d.day.charAt(0)}</span>)}
                  </div>
                  <div className="flex flex-col justify-between gap-0.5">
                    {heatMapData.map((row, i) => (
                      <div key={i} className="grid grid-cols-8 gap-0.5 flex-1">
                        {row.hours.map((val, j) => (
                          <div 
                            key={j} 
                            className="rounded-sm md:rounded transition-colors h-full"
                            style={{ backgroundColor: getHeatmapColor(val) }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {template === 'monthly' && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-6">
            <div className="col-span-2 lg:col-span-1 bg-white p-3 md:p-6 rounded-xl border border-gray-200 shadow-sm h-[200px] md:h-[350px] flex flex-col">
              <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 md:mb-4 truncate">Ingresos vs Gastos</h3>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis key="xaxis" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 10}} />
                    <YAxis key="yaxis" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 10}} width={30} />
                    <RechartsTooltip key="tooltip" contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px'}} />
                    <Bar key="bar-ingresos" dataKey="ingresos" fill={activePalette.value} radius={[4, 4, 0, 0]} />
                    <Bar key="bar-gastos" dataKey="gastos" fill={activePalette.subColors[1]} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-span-1 bg-white p-3 md:p-6 rounded-xl border border-gray-200 shadow-sm h-[200px] md:h-[350px] flex flex-col">
              <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 md:mb-4 truncate">Distribución</h3>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie key="pie" nameKey="name"
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={activePalette.subColors[index % activePalette.subColors.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip key="tooltip" contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px'}} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="col-span-1 bg-white p-3 md:p-6 rounded-xl border border-gray-200 shadow-sm h-[200px] md:h-[350px] flex flex-col">
              <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 md:mb-4 truncate">Tendencia</h3>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis key="xaxis" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 10}} />
                    <YAxis key="yaxis" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 10}} width={30} />
                    <RechartsTooltip key="tooltip" contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px'}} />
                    <Line key="line" type="monotone" dataKey="ingresos" stroke={activePalette.value} strokeWidth={2} dot={{r: 3, fill: activePalette.value, strokeWidth: 1, stroke: '#fff'}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {template === 'yearly' && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-6">
            <div className="col-span-2 lg:col-span-1 bg-white p-3 md:p-6 rounded-xl border border-gray-200 shadow-sm h-[200px] md:h-[350px] flex flex-col">
              <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 md:mb-4 truncate">Crecimiento (Líneas)</h3>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={yearlyData}>
                    <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis key="xaxis" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 10}} />
                    <YAxis key="yaxis" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 10}} width={25} />
                    <RechartsTooltip key="tooltip" contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px'}} />
                    <Line key="line" type="monotone" dataKey="crecimiento" stroke={activePalette.value} strokeWidth={3} dot={{r: 4, fill: activePalette.value, strokeWidth: 2, stroke: '#fff'}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-span-1 bg-white p-3 md:p-6 rounded-xl border border-gray-200 shadow-sm h-[200px] md:h-[350px] flex flex-col">
              <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 md:mb-4 truncate">Resumen Cuartos</h3>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyData}>
                    <CartesianGrid key="grid" strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis key="xaxis" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 10}} />
                    <YAxis key="yaxis" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 10}} width={25} />
                    <RechartsTooltip key="tooltip" contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px'}} />
                    <Bar key="bar" dataKey="crecimiento" fill={activePalette.subColors[2]} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="col-span-1 bg-white p-3 md:p-6 rounded-xl border border-gray-200 shadow-sm h-[200px] md:h-[350px] flex flex-col">
              <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 md:mb-4 truncate">Mercado Anual</h3>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie key="pie" nameKey="name"
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={activePalette.subColors[index % activePalette.subColors.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip key="tooltip" contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px'}} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

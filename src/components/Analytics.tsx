import React from 'react';
import { BarChart3, TrendingUp, Users, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function Analytics() {
  // Mock data for demonstration
  const stats = {
    totalClicks: 1234,
    clicksToday: 156,
    clicksGrowth: 12.5,
    uniqueVisitors: 789,
    visitorsToday: 45,
    visitorsGrowth: 8.3,
    avgTimeOnPage: '2:45',
    bounceRate: '35%',
    bounceRateChange: -5.2,
  };

  const topLinks = [
    { title: 'Instagram', clicks: 456, growth: 15.2 },
    { title: 'YouTube', clicks: 342, growth: -2.8 },
    { title: 'Twitter', clicks: 234, growth: 8.7 },
    { title: 'Portfolio', clicks: 189, growth: 5.4 },
    { title: 'Blog', clicks: 123, growth: 12.1 },
  ];

  const timeData = [65, 45, 75, 35, 55, 45, 85, 35, 55, 45, 65, 45];
  const maxValue = Math.max(...timeData);

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de Cliques</p>
              <p className="text-2xl font-bold">{stats.totalClicks}</p>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>+{stats.clicksGrowth}% esse mês</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Visitantes Únicos</p>
              <p className="text-2xl font-bold">{stats.uniqueVisitors}</p>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>+{stats.visitorsGrowth}% esse mês</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tempo Médio</p>
              <p className="text-2xl font-bold">{stats.avgTimeOnPage}</p>
              <p className="text-sm text-gray-500">por visita</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Taxa de Rejeição</p>
              <p className="text-2xl font-bold">{stats.bounceRate}</p>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <ArrowDownRight className="w-4 h-4" />
                <span>{Math.abs(stats.bounceRateChange)}% menor</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Over Time Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-medium mb-6">Tráfego ao Longo do Dia</h3>
        <div className="h-64">
          <div className="h-full flex items-end gap-2">
            {timeData.map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-purple-100 rounded-t-lg relative group"
                style={{ height: `${(value / maxValue) * 100}%` }}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {value} cliques
                </div>
                <div
                  className="absolute bottom-0 left-0 w-full bg-purple-600 rounded-t-lg transition-all group-hover:opacity-100"
                  style={{ height: `${(value / maxValue) * 100}%`, opacity: 0.7 }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-500">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>23:59</span>
          </div>
        </div>
      </div>

      {/* Top Links Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium">Links Mais Clicados</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-4 px-6 font-medium text-gray-600">Link</th>
              <th className="text-center py-4 px-6 font-medium text-gray-600">Cliques</th>
              <th className="text-right py-4 px-6 font-medium text-gray-600">Crescimento</th>
            </tr>
          </thead>
          <tbody>
            {topLinks.map((link, index) => (
              <tr key={index} className="border-b last:border-0">
                <td className="py-4 px-6">{link.title}</td>
                <td className="py-4 px-6 text-center">{link.clicks}</td>
                <td className="py-4 px-6">
                  <div className={`flex items-center justify-end gap-1 ${
                    link.growth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {link.growth >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    <span>{Math.abs(link.growth)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

// Common UI Components
const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

const Card = ({ title, color = "blue", children }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className={`text-xl font-semibold mb-4 text-${color}-600`}>{title}</h3>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid md:grid-cols-2 gap-4">{children}</div>
);

const ListItem = ({ children }) => (
  <li className="flex items-start">
    <span className="text-green-500 mr-2">✓</span>
    <span className="text-gray-600">{children}</span>
  </li>
);

const WarningItem = ({ children }) => (
  <li className="flex items-start">
    <span className="text-red-500 mr-2">×</span>
    <span className="text-gray-600">{children}</span>
  </li>
);

const CollapsibleSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="mb-6 border rounded-lg overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="text-gray-500">
          {isOpen ? '▼' : '▶'}
        </span>
      </button>
      {isOpen && (
        <div className="p-6">
          {children}
        </div>
      )}
    </div>
  );
};

const SubjectComparisonChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'center',
        labels: {
          boxWidth: 10,
          padding: 10,
          font: {
            size: 11
          }
        }
      },
      title: {
        display: true,
        text: [
          '2025年北京与张家口中考科目设置对比',
          '北京共6门课程         张家口 共11门课程'
        ],
        font: {
          size: 13
        },
        padding: {
          top: 10,
          bottom: 10
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const labels = {
              '语文': ['100分', '120分'],
              '数学': ['100分', '120分'],
              '外语': ['100分（笔试60分，听力口语40分）', '120分（笔试90分，听力30分）'],
              '道德与法治': ['80分（笔试70分，综合素质评价10分）', '60分'],
              '历史': ['不计入总分，等级呈现', '60分'],
              '地理': ['不计入总分，等级呈现', '60分'],
              '物理': ['80分（笔试70分，实验操作10分）', '68分（笔试60分，实验8分）'],
              '化学': ['不计入总分，等级呈现', '66分（笔试60分，实验6分）'],
              '生物学': ['不计入总分，等级呈现', '66分（笔试60分，实验6分）'],
              '体育与健康': ['50分（现场考试30分，过程性考核20分）', '50分（现场测试30分，过程性考核20分）'],
              '信息科技': ['不计入总分', '10分']
            };
            const label = context.dataset.label;
            const type = context.label;
            return `${label}: ${labels[type][label === '北京（总分510分）' ? 0 : 1]}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 9
          },
          maxRotation: 45,
          minRotation: 45,
          padding: 5
        }
      },
      y: {
        beginAtZero: true,
        max: 120,
        title: {
          display: true,
          text: '分数',
          font: {
            size: 11
          }
        },
        ticks: {
          font: {
            size: 9
          },
          padding: 5
        }
      }
    },
    layout: {
      padding: {
        left: 5,
        right: 5,
        top: 5,
        bottom: 5
      }
    }
  };

  const data = {
    labels: ['语文', '数学', '外语', '道德与法治', '历史', '地理', '物理', '化学', '生物学', '体育与健康', '信息科技'],
    datasets: [
      {
        label: '北京（总分510分）',
        data: [100, 100, 100, 80, 0, 0, 80, 0, 0, 50, 0],
        backgroundColor: 'rgba(53, 162, 235, 0.7)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
      },
      {
        label: '张家口（总分800分）',
        data: [120, 120, 120, 60, 60, 60, 68, 66, 66, 50, 10],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="h-[350px] sm:h-[500px] mb-4">
        <Bar options={options} data={data} />
      </div>
      <div className="mt-2 text-xs sm:text-sm text-gray-600">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-blue-50 p-2 rounded">
            <h4 className="font-semibold mb-1 text-blue-700">北京（总分510分）</h4>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>语文：100分</li>
              <li>数学：100分</li>
              <li>外语：100分（笔试60分，听力口语40分）</li>
              <li>道德与法治：80分（笔试70分，综合素质评价10分）</li>
              <li>物理：80分（笔试70分，实验操作10分）</li>
              <li>体育与健康：50分（现场考试30分，过程性考核20分）</li>
              <li>历史、地理、化学、生物学、信息科技：不计入总分，以等级呈现</li>
            </ul>
          </div>
          <div className="bg-green-50 p-2 rounded">
            <h4 className="font-semibold mb-1 text-green-700">张家口（总分800分）</h4>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>语文：120分</li>
              <li>数学：120分</li>
              <li>外语：120分（笔试90分，听力30分）</li>
              <li>道德与法治：60分</li>
              <li>历史：60分</li>
              <li>地理：60分</li>
              <li>物理：68分（笔试60分，实验8分）</li>
              <li>化学：66分（笔试60分，实验6分）</li>
              <li>生物学：66分（笔试60分，实验6分）</li>
              <li>体育与健康：50分（现场测试30分，过程性考核20分）</li>
              <li>信息科技：10分</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// 高中分数线数据（放在文件顶部，App和其他组件都能用）
const beijingHighSchools = [
  { name: "北京市十一学校龙樾实验中学", score: 494 },
  { name: "北京市上地实验学校", score: 492 },
  { name: "北师大二附中海淀学校", score: 492 },
  { name: "北大附中西三旗学校", score: 489 },
  { name: "北大附中新馨学校", score: 489 },
  { name: "首都师范大学附属育新学校", score: 457 },
  { name: "北京一零一中石油分校", score: 461 },
  { name: "北京市第二十中学", score: 470 },
  { name: "北京市清河中学", score: 430 },
  { name: "北京外国语大学附属外国语学校", score: 448 },
  { name: "北京职业中学1", score: 429 },


].sort((a, b) => b.score - a.score);
const zjkHighSchools = [
  { name: "张家口一中", score: 577 },
  { name: "张家口市东方中学（市区）", score: 498 },
  { name: "张家口正博中学", score: 493 },
  { name: "张家口四中（普通班）", score: 485 },
  { name: "张家口衡实成博中学", score: 475 },
  { name: "张家口实验中学", score: 427 },
  { name: "张家口二中", score: 342 },
  { name: "张家口十中", score: 342 },
  { name: "张家口京源高级中学", score: 342 },
  { name: "张家口职业中学1", score: 330 },
  { name: "张家口职业中学2", score: 190 },
].sort((a, b) => b.score - a.score);


function App() {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">北京与张家口升学计划对比</h1>
      <h5 className="text-sm sm:text-base mb-4"><p>参考依据 </p><p>北京  https://www.xschu.com/北京小升初网  https://www.eol.cn/e_html/gk/fsx/index.shtml中国教育</p>    <p>张家口：张家口市教育局公开文件</p></h5>

      {/* 初中阶段 */}
      <CollapsibleSection title="初中阶段" defaultOpen={true}>
        <Section title="2025年中考科目设置对比">
          <div className="bg-white rounded-lg shadow p-2 sm:p-6">
            <div className="w-full h-[800px] sm:h-[1000px] mb-4 sm:mb-8">
              <SubjectComparisonChart />
            </div>
          </div>
        </Section>

        <Section title="重点高中录取分数线分布对比">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold mb-2 text-blue-700">北京（510分）</h4>
              {beijingHighSchools.map(s => (
                <div key={s.name} className="flex items-center mb-2">
                  <span className="w-32 sm:w-48 truncate text-sm">{s.name}</span>
                  <div className="flex-1 mx-2 bg-blue-100 rounded h-2">
                    <div
                      className="bg-blue-500 h-2 rounded"
                      style={{ width: `${(s.score / 510) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-sm">{s.score}</span>
                </div>
              ))}
            </div>
            <div>
              <h4 className="font-bold mb-2 text-green-700">张家口（800分）</h4>
              {zjkHighSchools.map(s => (
                <div key={s.name} className="flex items-center mb-2">
                  <span className="w-32 sm:w-48 truncate text-sm">{s.name}</span>
                  <div className="flex-1 mx-2 bg-green-100 rounded h-2">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: `${(s.score / 800) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-sm">{s.score}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 text-xs sm:text-sm text-gray-600">
            <p>注：北京总分510分，张家口总分800分，分数不可直接换算，仅作横向参考。</p>
          </div>
        </Section>

        <Section title="2023年录取情况对比">
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">指标</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">北京海淀区</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">河北张家口市</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">中考人数</td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">2.2万人</td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">约1.1万人</td>
                </tr>
                <tr>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">普高录取人数</td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">1.7万人</td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">约0.7万人</td>
                </tr>
                <tr>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">普高录取率</td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">77%</td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">64%</td>
                </tr>
                <tr>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">重点高中人数</td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">0.9万人</td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">约0.25万人</td>
                </tr>
                <tr>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">重点高中率</td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">40%</td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">23%</td>
                </tr>
                <tr>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">职中录取人数</td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">0.5万人</td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">约0.4万人</td>
                </tr>
                <tr>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">职中录取率</td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">23%</td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">36%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>
        <Section title="北京海淀区与张家口市职业高中对比分析">
          <div className="bg-white rounded-lg shadow p-6">


            {/* 培养目标对比 */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-3 text-blue-600">一、培养目标与特色</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-700 mb-2">北京海淀区职业高中</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>升学主导：90%以上通过3+2贯通、职教高考升入高职或本科</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>专业高端化：聚焦数字经济、金融科技、文化艺术等</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>政策支持：财政补贴贯通培养，部分专业免学费+企业奖学金</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-green-700 mb-2">张家口市职业高中</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>就业为主：70%毕业生直接进入本地合作企业</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>产业绑定：围绕"首都两区"（可再生能源、冰雪经济）需求</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>订单培养：企业包就业，如"亿华通氢能班"、"长城葡萄酒班"</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 代表学校对比 */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-3 text-blue-600">二、代表学校与专业</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">地区</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">学校名称</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">重点专业</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">升学/就业路径</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">发展方向</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-blue-600" rowSpan="5">北京海淀区</td>
                      <td className="px-3 py-2 text-xs">北京市信息管理学校</td>
                      <td className="px-3 py-2 text-xs">人工智能技术应用、大数据</td>
                      <td className="px-3 py-2 text-xs">3+2贯通至北京电子科技职业学院</td>
                      <td className="px-3 py-2 text-xs">互联网企业技术岗</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-xs">北京市商务管理学校</td>
                      <td className="px-3 py-2 text-xs">金融事务、跨境电商</td>
                      <td className="px-3 py-2 text-xs">3+2对接北京财贸职业学院</td>
                      <td className="px-3 py-2 text-xs">银行/电商运营</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-xs">海淀区艺术职业学校</td>
                      <td className="px-3 py-2 text-xs">舞蹈表演、数字媒体艺术</td>
                      <td className="px-3 py-2 text-xs">职教高考升入北京戏曲艺术职业学院</td>
                      <td className="px-3 py-2 text-xs">文艺团体/广告设计</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-xs">北京市外事学校</td>
                      <td className="px-3 py-2 text-xs">高星级饭店运营与管理</td>
                      <td className="px-3 py-2 text-xs">3+2升入北京联合大学旅游学院</td>
                      <td className="px-3 py-2 text-xs">五星级酒店管理</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-xs">北京市盲人学校</td>
                      <td className="px-3 py-2 text-xs">中医推拿、钢琴调律</td>
                      <td className="px-3 py-2 text-xs">单考单招升入长春大学特殊教育学院</td>
                      <td className="px-3 py-2 text-xs">康复机构/音乐行业</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-green-600" rowSpan="5">张家口市</td>
                      <td className="px-3 py-2 text-xs">张家口市机械工业学校</td>
                      <td className="px-3 py-2 text-xs">风电设备维修、数控技术</td>
                      <td className="px-3 py-2 text-xs">中煤张煤机、金风科技</td>
                      <td className="px-3 py-2 text-xs">新能源装备制造</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-xs">宣化职业技术教育中心</td>
                      <td className="px-3 py-2 text-xs">现代农业技术、畜牧兽医</td>
                      <td className="px-3 py-2 text-xs">张家口农投集团、牧原食品</td>
                      <td className="px-3 py-2 text-xs">乡村振兴相关岗位</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-xs">崇礼区职教中心</td>
                      <td className="px-3 py-2 text-xs">滑雪教练、冰雪场馆运营</td>
                      <td className="px-3 py-2 text-xs">万龙滑雪场、太舞度假区</td>
                      <td className="px-3 py-2 text-xs">冬奥遗产相关行业</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-xs">张北县职教中心</td>
                      <td className="px-3 py-2 text-xs">旅游服务与管理、酒店运营</td>
                      <td className="px-3 py-2 text-xs">草原天路景区、中都草原度假村</td>
                      <td className="px-3 py-2 text-xs">文旅产业</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-xs">怀来县职教中心</td>
                      <td className="px-3 py-2 text-xs">葡萄酒酿造、电子商务</td>
                      <td className="px-3 py-2 text-xs">长城葡萄酒庄、京东怀来仓</td>
                      <td className="px-3 py-2 text-xs">农业深加工/物流</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 核心差异对比 */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-3 text-blue-600">三、核心差异对比</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">对比维度</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">北京海淀职高</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">张家口职高</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">培养目标</td>
                      <td className="px-6 py-4 text-sm">升学（3+2/职教高考）</td>
                      <td className="px-6 py-4 text-sm">直接就业（本地产业工人）</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">专业特色</td>
                      <td className="px-6 py-4 text-sm">金融、IT、文化艺术等现代服务业</td>
                      <td className="px-6 py-4 text-sm">机械、农业、旅游等传统产业</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">课程重点</td>
                      <td className="px-6 py-4 text-sm">文化课+专业技术理论（升学考试科目）</td>
                      <td className="px-6 py-4 text-sm">实操技能训练（企业定制课程）</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">政企合作</td>
                      <td className="px-6 py-4 text-sm">共建实训基地（如京东AI实验室）</td>
                      <td className="px-6 py-4 text-sm">企业订单班（包就业）</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">薪资水平</td>
                      <td className="px-6 py-4 text-sm">升学后大专毕业生起薪约6000元</td>
                      <td className="px-6 py-4 text-sm">直接就业平均起薪3500-4500元</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">发展瓶颈</td>
                      <td className="px-6 py-4 text-sm">高职阶段竞争激烈</td>
                      <td className="px-6 py-4 text-sm">职业晋升空间有限</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 选择建议 */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-3 text-blue-600">四、选择建议</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-700 mb-2">北京海淀学生</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>成绩中等偏下：优先选择3+2贯通项目（如北京电子科技职业学院对接专业）</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>艺术特长：考虑艺术类职高（可通过职教高考升本科）</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-green-700 mb-2">张家口学生</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>计划本地就业：选择订单班专业（如风电维修、冰雪服务）</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>想升学：关注河北单招对口院校（如河北石油职业技术大学）</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2024年最新动态 */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-blue-600">五、2024年最新动态</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-700 mb-2">北京</h5>
                  <p className="text-sm">新增"数字经济"、"智慧养老"等专业方向</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-green-700 mb-2">张家口</h5>
                  <p className="text-sm">2024年开设"氢能技术应用"专业（对接亿华通产业基地）</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

      </CollapsibleSection>

      {/* 高中阶段 */}
      <CollapsibleSection title="高中阶段">
        <Section title="2024年高考基本情况对比">
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <div className="p-3 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">基础数据对比</h3>
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">对比维度</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">北京（非京籍）2024年</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">河北张家口市 2024年</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">高考总分</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">750分（全国乙卷）</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">750分（全国乙卷）</td>
                  </tr>
                  <tr>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">高考人数</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">约6.7万人（全市）<br />非京籍考生约2万人</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">约4万人（张家口教育考试院公布）</td>
                  </tr>
                  <tr>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">一本线</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">特招线 523分<br />（北京招生考试院公布）</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">理科 490分 / 文科 520分<br />（河北省教育考试院）</td>
                  </tr>
                  <tr>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">二本线</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">普通本科线 434分</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">理科 430分 / 文科 460分</td>
                  </tr>
                  <tr>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">专科线</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">120分（专科资格线）</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">200分</td>
                  </tr>
                  <tr>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">录取模式</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">"3+3"新高考<br />（自主选科+等级赋分）</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">"3+1+2"新高考<br />（首选+再选+等级赋分）</td>
                  </tr>
                  <tr>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">考试时间</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">统一全国高考时间</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">同上</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        <Section title="非京籍升学路径对比分析">
          <div className="grid md:grid-cols-2 gap-6">
            {/* 北京升学路径 */}
            <Card title="北京升学路径" color="blue">
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="font-semibold text-lg mb-2">① 回原籍高考</h4>
                  <p className="text-gray-600">高中北京读完，高三回原籍复读一年</p>
                  <p className="text-gray-500 text-sm mt-1">适用于原籍高考环境相对宽松者，建议请清北学霸一对一辅导，按原籍教材复习</p>
                </div>
                <div className="border-b pb-4">
                  <h4 className="font-semibold text-lg mb-2">② 北理工"3+0"</h4>
                  <p className="text-gray-600">无需高考，只看会考成绩，三年制本科（中外合作）</p>
                  <p className="text-gray-500 text-sm mt-1">适合成绩中上但不擅长高考的学生；需注意合作方质量和毕业含金量</p>
                </div>
                <div className="border-b pb-4">
                  <h4 className="font-semibold text-lg mb-2">③ 北京高考专科→专升本</h4>
                  <p className="text-gray-600">在京参加高考报考专科，后专升本</p>
                  <p className="text-gray-500 text-sm mt-1">北京就业资源丰富，部分大专与企业合作紧密，就业率高；专升本比例较可观</p>
                </div>
                <div className="border-b pb-4">
                  <h4 className="font-semibold text-lg mb-2">④ 靠工居政策争取本科资格</h4>
                  <p className="text-gray-600">工居证+子女在京完成高中</p>
                  <p className="text-gray-500 text-sm mt-1">政策逐步放宽中，将赋权报考所有本科批（当前已征求意见）</p>
                </div>
                <div className="border-b pb-4">
                  <h4 className="font-semibold text-lg mb-2">⑤ 公立国际部出国路线</h4>
                  <p className="text-gray-600">A-Level/AP课程，方向为海外/港澳高校</p>
                  <p className="text-gray-500 text-sm mt-1">成本高（年均20万+），适合家庭预算充足，有明确出国计划者</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">⑥ 特长升学（艺术/体育）</h4>
                  <p className="text-gray-600">就读带集体户口的附中类学校</p>
                  <p className="text-gray-500 text-sm mt-1">有机会直接在京参加高考报本科；需提前规划并强化专业课与文化课双轨准备</p>
                </div>
              </div>
            </Card>

            {/* 张家口升学路径 */}
            <Card title="张家口升学路径" color="green">
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="font-semibold text-lg mb-2">① 本地高考冲刺</h4>
                  <p className="text-gray-600">985录取率：1.5%（河北平均），低于北京4.5%</p>
                  <div className="mt-2 space-y-2">
                    <p className="text-gray-500 text-sm">• 衡水模式：张家口一中重点班本科率92%，但每日学习时长14小时</p>
                    <p className="text-gray-500 text-sm">• 贫困专项：涿鹿县等贫困地区考生可降20分录取（需连续3年县域学籍）</p>
                  </div>
                </div>
                <div className="border-b pb-4">
                  <h4 className="font-semibold text-lg mb-2">② 异地高考"洼地"</h4>
                  <div className="mt-2 space-y-2">
                    <p className="text-gray-500 text-sm">• 天津购房落户：武清区房价1.2万/㎡，获得户口后高考一本率比河北高18%</p>
                    <p className="text-gray-500 text-sm">• 西藏购房落户：成本25万起，但需满足"3年户籍+1年学籍"</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">③ 职教高考</h4>
                  <p className="text-gray-600">张家口职业技术学院：与北汽福田合作，专科→本科对接河北工业大学</p>
                  <p className="text-gray-500 text-sm mt-1">通过率41%，适合成绩中等但动手能力强的学生</p>
                </div>
              </div>
            </Card>
          </div>

          {/* 决策对比矩阵 */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">决策对比矩阵</h3>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">对比维度</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">北京最优路径</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">张家口最优路径</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">成本最低</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">专科→专升本（总投入约15万）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">本地高考（总投入约8万）</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">升学上限</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">国际部→香港大学（花费80万+）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">衡水模式→清北（花费20万）</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">风险最低</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">工居证政策（需政策落地）</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">天津落户（需购房资格）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        <Section title="院校对比分析">
          <div className="grid md:grid-cols-2 gap-6">
            {/* 北京院校 */}
            <Card title="北京院校选择" color="blue">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3">本科批次普通院校</h4>
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">学校名称</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">最低分数</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">市排名</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">学费/年</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">特色专业/备注</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">北京城市学院</td>
                          <td className="px-6 py-4 text-sm text-gray-500">448分</td>
                          <td className="px-6 py-4 text-sm text-gray-500">约32,000名</td>
                          <td className="px-6 py-4 text-sm text-gray-500">¥28,800</td>
                          <td className="px-6 py-4 text-sm text-gray-500">学前教育、护理学（过线即录）</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">北邮世纪学院</td>
                          <td className="px-6 py-4 text-sm text-gray-500">456分</td>
                          <td className="px-6 py-4 text-sm text-gray-500">约30,500名</td>
                          <td className="px-6 py-4 text-sm text-gray-500">¥30,000</td>
                          <td className="px-6 py-4 text-sm text-gray-500">通信工程（推荐470分以上）</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">北工大耿丹学院</td>
                          <td className="px-6 py-4 text-sm text-gray-500">445分</td>
                          <td className="px-6 py-4 text-sm text-gray-500">约33,000名</td>
                          <td className="px-6 py-4 text-sm text-gray-500">¥46,600</td>
                          <td className="px-6 py-4 text-sm text-gray-500">设计类（需加试美术）</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">中瑞酒店管理学院</td>
                          <td className="px-6 py-4 text-sm text-gray-500">442分</td>
                          <td className="px-6 py-4 text-sm text-gray-500">约34,000名</td>
                          <td className="px-6 py-4 text-sm text-gray-500">¥49,800</td>
                          <td className="px-6 py-4 text-sm text-gray-500">酒店管理（英语单科≥100分）</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">首师科德学院</td>
                          <td className="px-6 py-4 text-sm text-gray-500">438分</td>
                          <td className="px-6 py-4 text-sm text-gray-500">约35,000名</td>
                          <td className="px-6 py-4 text-sm text-gray-500">¥79,800</td>
                          <td className="px-6 py-4 text-sm text-gray-500">艺术类为主（文化分可低至300）</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">北工商嘉华学院</td>
                          <td className="px-6 py-4 text-sm text-gray-500">440分</td>
                          <td className="px-6 py-4 text-sm text-gray-500">约34,500名</td>
                          <td className="px-6 py-4 text-sm text-gray-500">¥79,800</td>
                          <td className="px-6 py-4 text-sm text-gray-500">金融国际班（英语单科要求）</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">国际合作项目</h4>
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">院校</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">模式</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">专业方向</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">学费/年</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">招生说明</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">北理工×英国兰开夏</td>
                          <td className="px-6 py-4 text-sm text-gray-500">3+0/2+1</td>
                          <td className="px-6 py-4 text-sm text-gray-500">电子工程</td>
                          <td className="px-6 py-4 text-sm text-gray-500">前两年7万，英方16,500英镑</td>
                          <td className="px-6 py-4 text-sm text-gray-500">良乡校区，自主招生90人</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">北理工×美国犹他</td>
                          <td className="px-6 py-4 text-sm text-gray-500">4+0</td>
                          <td className="px-6 py-4 text-sm text-gray-500">国际经济</td>
                          <td className="px-6 py-4 text-sm text-gray-500">大一¥110,000，逐年递减</td>
                          <td className="px-6 py-4 text-sm text-gray-500">房山校区，自主招生150人</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">中央财经大学</td>
                          <td className="px-6 py-4 text-sm text-gray-500">2+2</td>
                          <td className="px-6 py-4 text-sm text-gray-500">金融</td>
                          <td className="px-6 py-4 text-sm text-gray-500">¥88,000</td>
                          <td className="px-6 py-4 text-sm text-gray-500">报名费¥600，计划200人</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">中央财经大学</td>
                          <td className="px-6 py-4 text-sm text-gray-500">3+1+1</td>
                          <td className="px-6 py-4 text-sm text-gray-500">商科类</td>
                          <td className="px-6 py-4 text-sm text-gray-500">¥98,000</td>
                          <td className="px-6 py-4 text-sm text-gray-500">计划外招生</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">北京交通大学</td>
                          <td className="px-6 py-4 text-sm text-gray-500">3+1+1</td>
                          <td className="px-6 py-4 text-sm text-gray-500">计算机/商科/艺术等</td>
                          <td className="px-6 py-4 text-sm text-gray-500">¥55,000-68,000</td>
                          <td className="px-6 py-4 text-sm text-gray-500">招生计划200人</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">中国传媒大学</td>
                          <td className="px-6 py-4 text-sm text-gray-500">2+2</td>
                          <td className="px-6 py-4 text-sm text-gray-500">传媒类、艺术类</td>
                          <td className="px-6 py-4 text-sm text-gray-500">¥98,000-118,000</td>
                          <td className="px-6 py-4 text-sm text-gray-500">招生200人</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">中传（DAP）</td>
                          <td className="px-6 py-4 text-sm text-gray-500">2+2</td>
                          <td className="px-6 py-4 text-sm text-gray-500">数字艺术方向</td>
                          <td className="px-6 py-4 text-sm text-gray-500">¥118,000</td>
                          <td className="px-6 py-4 text-sm text-gray-500">每专业限招40人</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">中央民族大学</td>
                          <td className="px-6 py-4 text-sm text-gray-500">2+2</td>
                          <td className="px-6 py-4 text-sm text-gray-500">金融/计算机/艺术等</td>
                          <td className="px-6 py-4 text-sm text-gray-500">普通¥68,000；艺术¥78,000</td>
                          <td className="px-6 py-4 text-sm text-gray-500">计划200人</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">北京服装学院</td>
                          <td className="px-6 py-4 text-sm text-gray-500">2+2</td>
                          <td className="px-6 py-4 text-sm text-gray-500">时尚设计/视觉传达</td>
                          <td className="px-6 py-4 text-sm text-gray-500">¥70,000+2万实践费</td>
                          <td className="px-6 py-4 text-sm text-gray-500">各方向限60人</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">中国石油大学</td>
                          <td className="px-6 py-4 text-sm text-gray-500">3+1</td>
                          <td className="px-6 py-4 text-sm text-gray-500">商科/计算机方向</td>
                          <td className="px-6 py-4 text-sm text-gray-500">¥65,000</td>
                          <td className="px-6 py-4 text-sm text-gray-500">招生200人</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">外交学院</td>
                          <td className="px-6 py-4 text-sm text-gray-500">2+2</td>
                          <td className="px-6 py-4 text-sm text-gray-500">国际事务/经济</td>
                          <td className="px-6 py-4 text-sm text-gray-500">¥83,000</td>
                          <td className="px-6 py-4 text-sm text-gray-500">招生75人</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">北二外</td>
                          <td className="px-6 py-4 text-sm text-gray-500">3+1</td>
                          <td className="px-6 py-4 text-sm text-gray-500">商科/人力资源</td>
                          <td className="px-6 py-4 text-sm text-gray-500">¥78,000</td>
                          <td className="px-6 py-4 text-sm text-gray-500">招生200人</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">北京语言大学</td>
                          <td className="px-6 py-4 text-sm text-gray-500">2+2</td>
                          <td className="px-6 py-4 text-sm text-gray-500">计算机、商科、教育、艺术</td>
                          <td className="px-6 py-4 text-sm text-gray-500">普通¥78,000；艺术¥88,000；音乐¥98,000</td>
                          <td className="px-6 py-4 text-sm text-gray-500">招生200人</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">北外（韩国班）</td>
                          <td className="px-6 py-4 text-sm text-gray-500">1+4</td>
                          <td className="px-6 py-4 text-sm text-gray-500">韩国TOP高校对接专业</td>
                          <td className="px-6 py-4 text-sm text-gray-500">¥52,000+服务费¥25,000</td>
                          <td className="px-6 py-4 text-sm text-gray-500">住宿1.5-2.2万，招生100人</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">北外（韩国建国大学）</td>
                          <td className="px-6 py-4 text-sm text-gray-500">1+3</td>
                          <td className="px-6 py-4 text-sm text-gray-500">建国大学设计/人文学科</td>
                          <td className="px-6 py-4 text-sm text-gray-500">学分豁免直升项目</td>
                          <td className="px-6 py-4 text-sm text-gray-500">招生另列</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Card>

            {/* 张家口院校 */}
            <Card title="张家口院校选择" color="green">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3">1. 顶尖院校（985/211/双一流）</h4>
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">学校</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">录取分（物理）</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">全省录取比例</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">张家口录取人数</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">优势专业</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">东北大学秦皇岛（985）</td>
                          <td className="px-6 py-4 text-sm text-gray-500">613分</td>
                          <td className="px-6 py-4 text-sm text-gray-500">0.42%</td>
                          <td className="px-6 py-4 text-sm text-gray-500">≈9人</td>
                          <td className="px-6 py-4 text-sm text-gray-500">计算机、自动化</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">河北工业大学（211）</td>
                          <td className="px-6 py-4 text-sm text-gray-500">607分</td>
                          <td className="px-6 py-4 text-sm text-gray-500">1.1%</td>
                          <td className="px-6 py-4 text-sm text-gray-500">≈24人</td>
                          <td className="px-6 py-4 text-sm text-gray-500">电气工程（B+）、材料科学</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">华北电力大学（保定）</td>
                          <td className="px-6 py-4 text-sm text-gray-500">598分</td>
                          <td className="px-6 py-4 text-sm text-gray-500">0.9%</td>
                          <td className="px-6 py-4 text-sm text-gray-500">≈20人</td>
                          <td className="px-6 py-4 text-sm text-gray-500">能源动力（A）、智能电网</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-600">张家口市一中2023年共有86人考入985/211，占本校考生6.3%</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">2. 省属重点一本院校</h4>
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">学校</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">物理组分数</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">历史组分数</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">张家口录取占比</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">特色专业</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">燕山大学</td>
                          <td className="px-6 py-4 text-sm text-gray-500">565分</td>
                          <td className="px-6 py-4 text-sm text-gray-500">553分</td>
                          <td className="px-6 py-4 text-sm text-gray-500">4.2%</td>
                          <td className="px-6 py-4 text-sm text-gray-500">机械工程（A-）、材料科学</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">河北大学</td>
                          <td className="px-6 py-4 text-sm text-gray-500">543分</td>
                          <td className="px-6 py-4 text-sm text-gray-500">538分</td>
                          <td className="px-6 py-4 text-sm text-gray-500">5.8%</td>
                          <td className="px-6 py-4 text-sm text-gray-500">法学、临床医学</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">河北医科大学</td>
                          <td className="px-6 py-4 text-sm text-gray-500">569分</td>
                          <td className="px-6 py-4 text-sm text-gray-500">-</td>
                          <td className="px-6 py-4 text-sm text-gray-500">3.1%</td>
                          <td className="px-6 py-4 text-sm text-gray-500">口腔医学（全省前1.2万名）</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">3. 普通二本院校（录取主力层）</h4>
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">学校</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">物理组分数</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">历史组分数</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">本地就业对口率</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">高性价比专业</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">河北师范大学</td>
                          <td className="px-6 py-4 text-sm text-gray-500">512分</td>
                          <td className="px-6 py-4 text-sm text-gray-500">525分</td>
                          <td className="px-6 py-4 text-sm text-gray-500">81%</td>
                          <td className="px-6 py-4 text-sm text-gray-500">公费师范生（免学费）</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">河北建筑工程学院</td>
                          <td className="px-6 py-4 text-sm text-gray-500">487分</td>
                          <td className="px-6 py-4 text-sm text-gray-500">498分</td>
                          <td className="px-6 py-4 text-sm text-gray-500">73%</td>
                          <td className="px-6 py-4 text-sm text-gray-500">土木工程（中建局校招）</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">河北北方学院</td>
                          <td className="px-6 py-4 text-sm text-gray-500">465分</td>
                          <td className="px-6 py-4 text-sm text-gray-500">478分</td>
                          <td className="px-6 py-4 text-sm text-gray-500">68%</td>
                          <td className="px-6 py-4 text-sm text-gray-500">临床医学（本地医院定向）</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">4. 高职专科院校</h4>
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">学校</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">热门专业</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">本地录取占比</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">升本通道</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">张家口职业技术学院</td>
                          <td className="px-6 py-4 text-sm text-gray-500">新能源装备技术</td>
                          <td className="px-6 py-4 text-sm text-gray-500">42%</td>
                          <td className="px-6 py-4 text-sm text-gray-500">对口华北电力大学（保定）</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">河北工业职业技术大学</td>
                          <td className="px-6 py-4 text-sm text-gray-500">智能制造装备技术</td>
                          <td className="px-6 py-4 text-sm text-gray-500">31%</td>
                          <td className="px-6 py-4 text-sm text-gray-500">职教高考本科（通过率35%）</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Section>
      </CollapsibleSection>

      {/* 研究生阶段 */}
      <CollapsibleSection title="研究生阶段">
        <Section title="升硕路径分析">
          <div className="grid md:grid-cols-2 gap-6">
            {/* 北京院校升学路径 */}
            <Card title="北京院校升学路径" color="blue">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3">一、本科一批普通院校</h4>
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">学校名称</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">是否能升硕</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">升硕路径说明</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">北京城市学院</td>
                          <td className="px-6 py-4 text-sm text-gray-500">✔️可以</td>
                          <td className="px-6 py-4 text-sm text-gray-500">具备硕士研究生报考资格，部分学生可考本校或外校研究生，教育学、护理学方向适合继续深造。</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">北京邮电大学世纪学院</td>
                          <td className="px-6 py-4 text-sm text-gray-500">✔️可以</td>
                          <td className="px-6 py-4 text-sm text-gray-500">虽为独立学院，属于民办本科，但符合全国硕士考试报名资格，可考信息类研究生（建议本科期间成绩优秀）。</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">北京工业大学耿丹学院</td>
                          <td className="px-6 py-4 text-sm text-gray-500">✔️可以</td>
                          <td className="px-6 py-4 text-sm text-gray-500">美术类设计专业如提升作品集质量，有望考入清华美院、央美或其他设计强校的研究生。</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">中瑞酒店管理学院</td>
                          <td className="px-6 py-4 text-sm text-gray-500">✔️可以</td>
                          <td className="px-6 py-4 text-sm text-gray-500">酒店管理、旅游管理方向可考中外高校硕士，也有合作升硕项目（如瑞士或英国方向）。</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">首都师范大学科德学院</td>
                          <td className="px-6 py-4 text-sm text-gray-500">✔️可以</td>
                          <td className="px-6 py-4 text-sm text-gray-500">艺术类本科，文化分相对低，但需依赖作品集与面试表现考研，如播音主持、影视表演类。</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">北京工商大学嘉华学院</td>
                          <td className="px-6 py-4 text-sm text-gray-500">✔️可以</td>
                          <td className="px-6 py-4 text-sm text-gray-500">商科、金融类专业如基础好、英语优，可考财经类院校研究生。</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-600">💡 结论：这些独立学院虽然不是211/985，但只要是"教育部认证的本科学历"，都可以报考全国硕士研究生考试。升硕关键靠学生自身能力+学业规划。</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">二、国际合作项目（中外联合培养）</h4>
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">院校项目</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">升硕机会</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">说明</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">北理工×英国兰开夏大学</td>
                          <td className="px-6 py-4 text-sm text-gray-500">✔️强推荐</td>
                          <td className="px-6 py-4 text-sm text-gray-500">英国本硕连读常见路径，3+1或2+2后多数可在英继续硕士（一年制为主）。</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">中央财经大学2+2、3+1+1</td>
                          <td className="px-6 py-4 text-sm text-gray-500">✔️极佳</td>
                          <td className="px-6 py-4 text-sm text-gray-500">财经类专业出国读硕非常常见，含国际认证课程；2+2后可申请美/英/澳商科硕士。</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">中传DAP项目、数字艺术方向</td>
                          <td className="px-6 py-4 text-sm text-gray-500">✔️推荐</td>
                          <td className="px-6 py-4 text-sm text-gray-500">英美艺术院校（UAL、SAIC）认可度高，毕业作品优秀者可升硕。</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">中国传媒大学、中传DAP、北服2+2项目</td>
                          <td className="px-6 py-4 text-sm text-gray-500">✔️可以</td>
                          <td className="px-6 py-4 text-sm text-gray-500">媒体、设计方向可申英美澳艺术类硕士，申请门槛包括语言成绩+作品集。</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">北外韩国项目、建国大学等</td>
                          <td className="px-6 py-4 text-sm text-gray-500">✔️可以</td>
                          <td className="px-6 py-4 text-sm text-gray-500">可升读韩国硕士，韩语需达到TOPIK 4-6级，或选择英语授课硕士项目。</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-600">📝 结论：这类项目大多可无缝衔接国外硕士课程，尤其推荐规划出国读研的学生选择，要求英语或小语种成绩。</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 张家口院校升学路径 */}
            <Card title="张家口院校升学路径" color="green">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3">三、张家口本科院校</h4>
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">学校</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">是否支持升硕</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">升硕建议</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">东北大学秦皇岛分校</td>
                          <td className="px-6 py-4 text-sm text-gray-500">✔️非常好</td>
                          <td className="px-6 py-4 text-sm text-gray-500">985身份，考研资源优质，推荐保研/本校或外校升硕，计算机方向热门。</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">河北工业大学</td>
                          <td className="px-6 py-4 text-sm text-gray-500">✔️很好</td>
                          <td className="px-6 py-4 text-sm text-gray-500">211院校，自动化、电气、机械类硕士机会多，就业与升硕兼顾。</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">华北电力大学（保定）</td>
                          <td className="px-6 py-4 text-sm text-gray-500">✔️非常好</td>
                          <td className="px-6 py-4 text-sm text-gray-500">能源动力类专业强项，本校硕士较易考取，亦可升电网方向研究生。</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">省属重点（二本中升硕较稳）</h4>
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">学校</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">是否能升硕</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">升硕优势</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">燕山大学</td>
                          <td className="px-6 py-4 text-sm text-gray-500">✔️可升硕</td>
                          <td className="px-6 py-4 text-sm text-gray-500">机械、材料专业实力强，研究生考试较为友好。</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">河北大学</td>
                          <td className="px-6 py-4 text-sm text-gray-500">✔️可升硕</td>
                          <td className="px-6 py-4 text-sm text-gray-500">综合类大学，文理均可考研，法学/金融有升硕优势。</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">河北医科大学</td>
                          <td className="px-6 py-4 text-sm text-gray-500">✔️医学硕士强</td>
                          <td className="px-6 py-4 text-sm text-gray-500">医学类需报考临床型硕士，难度中等，但就业强。</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">普通本科（二本主力层）</h4>
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">学校</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">是否可升硕</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">说明</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">河北师范大学</td>
                          <td className="px-6 py-4 text-sm text-gray-500">✔️可以</td>
                          <td className="px-6 py-4 text-sm text-gray-500">师范类生源可考教育硕士（读研较热门），尤其是公费师范生。</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">河北建筑工程学院</td>
                          <td className="px-6 py-4 text-sm text-gray-500">✔️可以</td>
                          <td className="px-6 py-4 text-sm text-gray-500">土木类专业较偏就业，但亦可考结构、规划方向研究生。</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">河北北方学院</td>
                          <td className="px-6 py-4 text-sm text-gray-500">✔️可以</td>
                          <td className="px-6 py-4 text-sm text-gray-500">医学类考研常见，但建议本校升硕或定向项目。</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">四、高职高专（升硕路径较少但可转本）</h4>
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">学校</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">升硕可能性</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">升学建议</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">张家口职业技术学院</td>
                          <td className="px-6 py-4 text-sm text-gray-500">⛔本科前置，升硕需先"专升本"</td>
                          <td className="px-6 py-4 text-sm text-gray-500">可通过转入华北电力本科后再考研，路径较长但可行。</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-900">河北工业职业技术大学</td>
                          <td className="px-6 py-4 text-sm text-gray-500">⛔需先升本</td>
                          <td className="px-6 py-4 text-sm text-gray-500">可参加"职教高考"，升入本科后再考研。</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-600">📌 注：专科不能直接考研，必须先通过"专升本"获得全日制本科学历。</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Section>
      </CollapsibleSection>

      {/* 艺术与科技教育路径 */}
      <CollapsibleSection title="艺术与科技教育路径">
        <Section title="艺术与科技教育路径分析">
          <div className="grid md:grid-cols-2 gap-6">
            {/* 高分路径 */}
            <Card title="高分路径（北京600+/张家口500+）" color="blue">
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold mb-2">北京选择：艺术+科技融合路线</h5>
                  <div className="space-y-2">
                    <p className="text-gray-600">目标学校：中央美术学院附属中学或北京工业大学附属中学（艺术特长班）</p>
                    <ul className="space-y-2">
                      <ListItem>强化绘画基础（素描、色彩、速写）</ListItem>
                      <ListItem>选修数字艺术课程（PS、Blender、AI绘画工具）</ListItem>
                      <ListItem>参加科技类竞赛（全国青少年科技创新大赛）</ListItem>
                    </ul>
                    <p className="text-gray-600 mt-2">升学优势：央美附中可直接保送中央美术学院，或通过高考进入清华美院、北影动画系等</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">张家口选择：衡水模式+艺术特招</h5>
                  <div className="space-y-2">
                    <p className="text-gray-600">目标学校：张家口一中（重点班）+ 校外美术集训</p>
                    <ul className="space-y-2">
                      <ListItem>文化课按衡水模式高强度学习</ListItem>
                      <ListItem>利用寒暑假集中训练美术</ListItem>
                      <ListItem>通过河北省艺术类统考+校考</ListItem>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* 中分路径 */}
            <Card title="中分路径（北京500-550/张家口400-450）" color="green">
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold mb-2">北京选择：民办艺术高中+国际衔接</h5>
                  <div className="space-y-2">
                    <p className="text-gray-600">目标学校：北京凯文学校或北音附中</p>
                    <ul className="space-y-2">
                      <ListItem>主攻数字绘画、平面设计</ListItem>
                      <ListItem>选修AI基础课程（Python编程、Stable Diffusion）</ListItem>
                      <ListItem>参加国际艺术比赛</ListItem>
                    </ul>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">张家口选择：职教高考+艺术升本</h5>
                  <div className="space-y-2">
                    <p className="text-gray-600">目标学校：张家口职业技术学校（对口升学班）</p>
                    <ul className="space-y-2">
                      <ListItem>文化课以职教高考为主</ListItem>
                      <ListItem>美术技能训练（设计软件）</ListItem>
                      <ListItem>通过职教高考升入河北科技师范学院</ListItem>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* 低分路径 */}
            <Card title="低分路径（北京<450/张家口<300）" color="blue">
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold mb-2">北京选择：中职艺术类+技能就业</h5>
                  <div className="space-y-2">
                    <p className="text-gray-600">目标学校：北京国际艺术学校（中职）</p>
                    <ul className="space-y-2">
                      <ListItem>学习动漫制作、UI设计</ListItem>
                      <ListItem>考取Adobe认证</ListItem>
                      <ListItem>通过"3+2"贯通升入北京电子科技职业学院</ListItem>
                    </ul>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">张家口选择：中职+本地就业</h5>
                  <div className="space-y-2">
                    <p className="text-gray-600">目标学校：张家口华美中等职业学校</p>
                    <ul className="space-y-2">
                      <ListItem>学习基础设计软件</ListItem>
                      <ListItem>参与本地企业实习</ListItem>
                      <ListItem>可通过单招升入河北工业职业技术大学</ListItem>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* 未来市场结合建议 */}
            <Card title="未来市场结合建议" color="green">
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold mb-2">AI+艺术趋势</h5>
                  <ul className="space-y-2">
                    <ListItem>学习AI辅助设计工具（Adobe Firefly、DALL·E 3）</ListItem>
                    <ListItem>关注生成式3D建模（NVIDIA Omniverse平台）</ListItem>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">父亲资源利用</h5>
                  <ul className="space-y-2">
                    <ListItem>参与3D建模项目实践（游戏资产制作）</ListItem>
                    <ListItem>学习AI艺术生成的底层逻辑（Diffusion模型原理）</ListItem>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">总结选择建议</h5>
                  <ul className="space-y-2">
                    <ListItem>高分：优先北京（艺术科技资源丰富）或张家口冲刺985（低成本路径）</ListItem>
                    <ListItem>中分：北京选国际艺术路径，张家口选职教高考+专升本</ListItem>
                    <ListItem>低分：北京中职→技能就业，张家口中职→本地稳定工作</ListItem>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </Section>
      </CollapsibleSection>

      {/* 父亲视角分析 */}
      <CollapsibleSection title="父亲视角分析">
        <Section title="父亲视角的深度分析：孩子转学北京 vs 留在张家口的风险与对策">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">1. 核心矛盾点</h3>
            <Grid>
              <Card title="父亲的担忧" color="blue">
                <ul className="space-y-3">
                  <WarningItem>叛逆期失控：担心孩子在张家口受不良社交影响（如逃课、早恋、混社会）</WarningItem>
                  <WarningItem>学业荒废：女孩若缺乏监督，可能成绩下滑，失去升学竞争力</WarningItem>
                  <WarningItem>亲子疏离：长期异地导致父女关系淡漠，无法及时干预成长问题</WarningItem>
                </ul>
              </Card>

              <Card title="现实限制" color="blue">
                <ul className="space-y-3">
                  <WarningItem>创业期无法离京：父亲事业处于关键期，回张家口可能影响收入</WarningItem>
                  <WarningItem>母亲角色未明：需确认母亲能否承担主要监护责任</WarningItem>
                </ul>
              </Card>
            </Grid>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">2. 两种选择的利弊分析</h3>
            <Grid>
              <Card title="方案一：转学北京（父亲创业，母亲/老人监护）" color="blue">
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold mb-2">优势</h5>
                    <ul className="space-y-2">
                      <ListItem>北京教育资源优质，升学路径更宽</ListItem>
                      <ListItem>远离张家口"混社会"环境</ListItem>
                      <ListItem>父亲可通过周末/假期参与教育</ListItem>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">劣势</h5>
                    <ul className="space-y-2">
                      <WarningItem>父亲无法日常陪伴，仍依赖母亲/老人</WarningItem>
                      <WarningItem>高成本（房租+补课）压力大</WarningItem>
                      <WarningItem>非京籍中考后可能被迫离京</WarningItem>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">关键风险</h5>
                    <ul className="space-y-2">
                      <li className="text-gray-600">若母亲/老人无力管教，孩子可能因孤独沉迷网络（北京诱惑更多）</li>
                      <li className="text-gray-600">北京青春期孩子攀比更严重（如电子产品、奢侈品）</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card title="方案二：留在张家口（父亲远程关注+严格管控）" color="green">
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold mb-2">优势</h5>
                    <ul className="space-y-2">
                      <ListItem>成本低，经济压力小</ListItem>
                      <ListItem>河北高考规则明确，无政策风险</ListItem>
                      <ListItem>若老人靠谱，生活照料更稳定</ListItem>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">劣势</h5>
                    <ul className="space-y-2">
                      <WarningItem>父亲无法实地监督，易失控</WarningItem>
                      <WarningItem>小城市不良社交圈更难规避</WarningItem>
                      <WarningItem>孩子可能因缺爱更叛逆</WarningItem>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">关键风险</h5>
                    <ul className="space-y-2">
                      <li className="text-gray-600">张家口部分公立校管理松散，尤其普通班学风较差</li>
                      <li className="text-gray-600">父亲仅靠电话/视频管教，效果有限</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </Grid>
          </div>




          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">北京工作居住证 vs 张家口初中三年 关键对比</h3>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">项目</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">北京工作居住证方案</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">张家口初中三年方案</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-sm">适用阶段</td>
                    <td className="px-4 py-2 text-sm">初一结束-初三毕业（2025.12-2028.8）</td>
                    <td className="px-4 py-2 text-sm">初一-初三（3年）</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">政策目标</td>
                    <td className="px-4 py-2 text-sm">获得北京高中/高考资格（非京籍随迁子女）</td>
                    <td className="px-4 py-2 text-sm">河北中考/高考常规升学</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">关键政策门槛</td>
                    <td className="px-4 py-2 text-sm">2027.9.1前持有效居住证+社保</td>
                    <td className="px-4 py-2 text-sm">无特殊门槛，学籍/户籍稳定</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">办理/学费</td>
                    <td className="px-4 py-2 text-sm">居住证中介费约8万</td>
                    <td className="px-4 py-2 text-sm">介绍费4万+学费6万</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">社保/补课费</td>
                    <td className="px-4 py-2 text-sm">社保3年约9.9万</td>
                    <td className="px-4 py-2 text-sm">补课费4.8万</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">交通/其他</td>
                    <td className="px-4 py-2 text-sm">-</td>
                    <td className="px-4 py-2 text-sm">交通费1.8万</td>
                  </tr>
                  <tr className="font-bold bg-gray-50">
                    <td className="px-4 py-2 text-sm">三年总费用</td>
                    <td className="px-4 py-2 text-sm">约17.9万</td>
                    <td className="px-4 py-2 text-sm">约16.6万</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">风险与不确定性</td>
                    <td className="px-4 py-2 text-sm">需确保社保连续、政策无变动</td>
                    <td className="px-4 py-2 text-sm">未来高中能否顺利入京极不确定</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">教育资源与升学通道</td>
                    <td className="px-4 py-2 text-sm">北京优质资源、升学路径更广</td>
                    <td className="px-4 py-2 text-sm">河北升学规则明确，资源有限</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>✅ <span className="font-semibold">结论建议：</span>如果目标明确为高中在北京读书，"办理北京工作居住证+社保缴纳"路径更为稳妥可靠。</p>
              <p>张家口读完初中虽然短期便宜一点，但未来高中是否能顺利入京存在极大不确定性，可能导致临时调整。</p>
              <p>两者花费相差仅约13,000元，但在教育资源和政策通路上的差距非常大。</p>
              <p className="font-semibold text-blue-700">建议优先考虑北京居住证方案，更利于孩子未来稳定发展。</p>
            </div>
          </div>
        </Section>
      </CollapsibleSection>
    </div>
  );
}

export default App;

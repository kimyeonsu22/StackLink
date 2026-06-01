// 진행중인 프로젝트 통계

const StatBar = ({ stats }) => {
    return (
        <div className="flex items-center justify-around bg-white border-t border-gray-200 px-6 py-3">
            {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                    <span className="text-xs text-gray-400">{stat.label}</span>
                    <span className="text-sm font-bold text-purple-600">{stat.value}</span>
                </div>
            ))}
        </div>
    );
};

export default StatBar;
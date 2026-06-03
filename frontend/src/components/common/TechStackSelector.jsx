const TECH_LIST = [
    'JAVA', 'Spring Boot', 'Spring Security', 'JPA', 'QueryDSL',
    'SQL/RDBMS', 'NoSQL', 'C++', 'C#', 'Embedded',
    'HTML5', 'CSS3', 'JavaScript', 'TypeScript',
    'React.js', 'Vue.js', 'Kotlin', 'Swift'
];

const CAREER_LIST = [
    '1년 미만', '1년 이상 ~ 3년 미만', '3년 이상 ~ 5년 미만',
    '5년 이상 ~ 7년 미만', '7년 이상 ~ 10년 미만', '10년 이상'
];

const TechStackSelector = ({ selectedTechs, onChange }) => {

    const handleTechCheck = (tech) => {
        if (selectedTechs[tech] !== undefined) {
            const updated = { ...selectedTechs };
            delete updated[tech];
            onChange(updated);
        } else {
            onChange({ ...selectedTechs, [tech]: '' });
        }
    };

    const handleCareerSelect = (tech, career) => {
        onChange({ ...selectedTechs, [tech]: career });
    };

    return (
        <div className="flex flex-col gap-3">
            {TECH_LIST.map((tech) => (
                <div key={tech} className="flex flex-col gap-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={selectedTechs[tech] !== undefined}
                            onChange={() => handleTechCheck(tech)}
                        />
                        <span className="text-sm">{tech}</span>
                    </label>
                    {selectedTechs[tech] !== undefined && (
                        <select
                            value={selectedTechs[tech]}
                            onChange={(e) => handleCareerSelect(tech, e.target.value)}
                            className="ml-6 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-purple-500"
                        >
                            <option value="">경력 선택</option>
                            {CAREER_LIST.map((career) => (
                                <option key={career} value={career}>{career}</option>
                            ))}
                        </select>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TechStackSelector;

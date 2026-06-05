// 공고 수정 페이지

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import { getProject, updateProject } from '../../api/project';

const TECH_LIST = [
    'JAVA', 'Spring Boot', 'Spring Security', 'JPA', 'QueryDSL',
    'SQL/RDBMS', 'NoSQL', 'C++', 'C#', 'Embedded',
    'HTML5', 'CSS3', 'JavaScript', 'TypeScript',
    'React.js', 'Vue.js', 'Kotlin', 'Swift'
];

const ProjectEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(null);

    useEffect(() => {
        getProject(id).then((res) => {
            const p = res.data;
            setForm({
                projectname: p.projectname,
                content: p.content,
                recruitCount: p.recruitCount,
                deadlineAt: p.deadlineAt?.slice(0, 10) ?? '',
                techNames: p.tags ?? [],
            });
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleTechToggle = (tech) => {
        setForm((prev) => ({
            ...prev,
            techNames: prev.techNames.includes(tech)
                ? prev.techNames.filter((t) => t !== tech)
                : [...prev.techNames, tech],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.projectname.trim()) return alert('공고명을 입력해주세요.');
        if (!form.content.trim()) return alert('내용을 입력해주세요.');
        if (!form.deadlineAt) return alert('마감일을 선택해주세요.');

        const data = {
            projectname: form.projectname,
            content: form.content,
            recruitCount: Number(form.recruitCount),
            deadlineAt: new Date(form.deadlineAt).toISOString(),
            techNames: form.techNames,
        };

        await updateProject(id, data);
        navigate(`/projects/${id}`);
    };

    if (!form) return null;

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-6 flex justify-center">
                    <div className="w-full max-w-3xl">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">공고 수정</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                            <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold text-gray-700">공고명</label>
                                    <input
                                        name="projectname"
                                        value={form.projectname}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold text-gray-700">내용</label>
                                    <textarea
                                        name="content"
                                        value={form.content}
                                        onChange={handleChange}
                                        rows={6}
                                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 resize-none"
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex flex-col gap-1 flex-1">
                                        <label className="text-sm font-semibold text-gray-700">모집 인원</label>
                                        <input
                                            type="number"
                                            name="recruitCount"
                                            value={form.recruitCount}
                                            onChange={handleChange}
                                            min={1}
                                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 flex-1">
                                        <label className="text-sm font-semibold text-gray-700">마감일</label>
                                        <input
                                            type="date"
                                            name="deadlineAt"
                                            value={form.deadlineAt}
                                            onChange={handleChange}
                                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
                                <label className="text-sm font-semibold text-gray-700">기술 스택</label>
                                <div className="flex flex-wrap gap-2">
                                    {TECH_LIST.map((tech) => (
                                        <button
                                            key={tech}
                                            type="button"
                                            onClick={() => handleTechToggle(tech)}
                                            className={`text-xs px-3 py-1.5 rounded-full border transition ${
                                                form.techNames.includes(tech)
                                                    ? 'bg-purple-600 text-white border-purple-600'
                                                    : 'bg-white text-gray-600 border-gray-300 hover:border-purple-400'
                                            }`}
                                        >
                                            {tech}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="px-5 py-2 text-sm border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition"
                                >
                                    취소
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                                >
                                    수정 완료
                                </button>
                            </div>

                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProjectEditPage;

// 회원가입 화면에서 기술 스택 포지션 아코디언

import { useState } from 'react';

const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-300 rounded">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center px-3 py-2 text-sm text-left"
            >
                <span>{title}</span>
                <span>{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
                <div className="px-3 py-2 border-t border-gray-300 text-sm">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Accordion;
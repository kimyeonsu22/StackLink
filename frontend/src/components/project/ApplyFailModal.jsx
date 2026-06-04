
const ApplyFailModal = ({displayOption, isOpen, onClose}) => {

    // x 버튼, 확인 버튼 클릭 시 모달 hidden 처리 함수
    const toggleModal = () => {
        document.getElementById("applyFailModal").className = "hidden";
        location.reload();
    }

    return (
        <div id="applyFailModal" className={displayOption} className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6 relative">

                {/* 닫기 버튼 */}
                <button onClick={toggleModal} className="bg-gray-500 text-white px-4 py-2 rounded">
                    &times;
                </button>

                <h2 className="text-xl font-bold mb-4">지원 실패</h2>
                <p className="text-gray-600 mb-6">
                    이미 지원하셨거나 모집이 마감된 프로젝트 입니다.
                </p>

                {/* 하단 버튼 영역 */}
                <div className="flex justify-end space-x-2">
                    <button onClick={toggleModal} className="bg-red-500 text-white px-4 py-2 rounded">
                        확인
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ApplyFailModal;
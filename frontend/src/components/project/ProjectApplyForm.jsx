import {useState} from "react";
import PositionRadioOption from "./PositionRadioOption.jsx";
import SelfIntroduction from "./SelfIntroduction.jsx";
import ApplySuccessModal from "./ApplySuccessModal.jsx";
import ApplyFailModal from "./ApplyFailModal.jsx";

const ProjectApplyForm = ({projectId}) => {
    const [selectedPositions, setSelectedPositions] = useState('');
    const [selfIntroduction, setSelfIntroduction] = useState('');
    const [successModal, setSuccessModal] = useState('hidden');
    const [failModal, setFailModal] = useState('hidden');

    const handlePositionChange = (e) => {
        setSelectedPositions(e.target.value);
    };

    const handleSelfIntroductionChange = (e) => {
        setSelfIntroduction(e.target.value);
    }

    // 지원하기 버튼 클릭시 동작시킬 백엔드 API 호출
    const handleApply = () => {
        // selectedPositions, selfIntroduction, id 값, 현재 시간을 포함하는 데이터를 형성하여 백엔드로 요청
        const data = {
            position: selectedPositions,
            content: selfIntroduction,
            projectId: projectId,
        };

        console.log("요청 확인용 로그")

        // 임시 URI 지정
        fetch(`/api/projects/${projectId}/apply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            /* response.status == 200 인 경우 ApplySuccessModal 컴포넌트를 호출하고
             response.status == 401 인 경우 ApplyFailModal 컴포넌트를 호출한다.
             */
            if (response.status === 200) {
                setSuccessModal('block');
            } else if (response.status === 401) {
                setFailModal('block');
            }


        }).catch(
            // 이미 지원한 프로젝트이거나 지원이 마감된 경우
            error => {
                console.error('Error:', error);
                // document.getElementById('applyFail').className = 'block';
            }
        )
    }

    return (


        <div>
            {/* 지원 성공시 모달 출력 */}
            <div className={successModal}>
                <ApplySuccessModal displayOption={successModal}></ApplySuccessModal>
            </div>

            <div className={failModal}>
                <ApplyFailModal displayOption={failModal}></ApplyFailModal>
            </div>
            {/* 지원 실패시 모달 출력 */}


            {/* 한 줄 소개 컴포넌트*/}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
                <SelfIntroduction id="selfintroduction" name="selfintroduction"
                                  placeholder="간단한 자기소개를 입력해주세요." onChange={handleSelfIntroductionChange}>

                </SelfIntroduction>
            </div>

            {/*포지션 선택 radio option*/}
            <div className="flex bg-white rounded-xl p-5 border border-gray-200 gap-22">
                <PositionRadioOption name="position" id="backend" value="backend"
                                     selectedPositions={selectedPositions} onChange={handlePositionChange}>
                    백엔드 개발
                </PositionRadioOption>

                <PositionRadioOption name="position" id="frontend" value="frontend"
                                     selectedPositions={selectedPositions} onChange={handlePositionChange}>
                    프론트엔드 개발
                </PositionRadioOption>

                <PositionRadioOption name="position" id="database" value="database"
                                     selectedPositions={selectedPositions} onChange={handlePositionChange}>
                    DB
                </PositionRadioOption>

                <PositionRadioOption name="position" id="projectManager" value="projectManager"
                                     selectedPositions={selectedPositions} onChange={handlePositionChange}>
                    PM
                </PositionRadioOption>

                <PositionRadioOption name="position" id="design" value="design"
                                     selectedPositions={selectedPositions} onChange={handlePositionChange}>
                    디자인
                </PositionRadioOption>
            </div>

            {/* 지원하기 및 뒤로가기 버튼*/}
            <div className="flex justify-end gap-4 mt-4">
                <button className="bg-violet-300 rounded-xl w-md h-15 text-amber-50 hover:bg-violet-500 border-gray-200
                         active:translate-y-[5px]" onClick={handleApply}>

                    {/*버튼 글자 바로 왼쪽에 아이콘 붙이기*/}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 2 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 inline-block">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    지원하기
                </button>
                <button className="bg-red-500 rounded-xl w-md h-15 text-amber-50 hover:bg-red-700 border-gray-200
                         active:translate-y-[5px]" onClick={() => window.history.back()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 2 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 inline-block">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    뒤로가기
                </button>
            </div>
        </div>


    );

        // 버튼 컴포넌트
};

export default ProjectApplyForm;
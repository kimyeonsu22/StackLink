import {useState} from "react";
import PositionRadioOption from "../common/PositionRadioOption.jsx";
import SelfIntroduction from "../common/SelfIntroduction.jsx";

const ProjectApplyForm = ({id}) => {
    const [selectedPositions, setSelectedPositions] = useState('');
    const [selfIntroduction, setSelfIntroduction] = useState('');

    const handlePositionChange = (e) => {
        setSelectedPositions(e.target.value);
    };

    const handleSelfIntroductionChange = (e) => {
        setSelfIntroduction(e.target.value);
    }

    // 지원하기 버튼 클릭시 동작시킬 백엔드 API 호출


    return (


        <div>

            {/* 한 줄 소개 컴포넌트*/}
            <div>
                <SelfIntroduction id="selfintroduction" name="selfintroduction"
                                  placeholder="간단한 자기소개를 입력해주세요." onChange={handleSelfIntroductionChange}>

                </SelfIntroduction>
            </div>

            {/*포지션 선택 radio option*/}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
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
        </div>


    );

        // 버튼 컴포넌트
};

export default ProjectApplyForm;
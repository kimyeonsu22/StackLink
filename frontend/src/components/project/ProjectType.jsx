
import ProjectTypeRadio from "./ProjectTypeRadio";

const ProjectType = ({onChange}) => {
    return(
        <div>
            <p>
                프로젝트 유형&nbsp;
                {/*Red Dot */}
                <span className="relative inline-flex top-0 right-0 block h-3 w-3 rounded-full bg-red-600 ring-2 ring-white"></span>
            </p>
            <br/>
            <div className="inline-flex gap-4">
                <ProjectTypeRadio typeName="사이드 프로젝트"
                                  description="개인, 또는 소규모 팀의 프로젝트"
                                  onChange={onChange}></ProjectTypeRadio>
                <ProjectTypeRadio typeName="해커톤"
                                  description="해커톤 / 공모전 참여"
                                  onChange={onChange}></ProjectTypeRadio>
                <ProjectTypeRadio typeName="스터티 / 교육"
                                  description="학습 목적의 스터디"
                                  onChange={onChange}></ProjectTypeRadio>
                <ProjectTypeRadio typeName="취업 / 창업"
                                  description="창업 또는 취업 목적"
                                  onChange={onChange}></ProjectTypeRadio>
            </div>
        </div>
    )
}

export default ProjectType;
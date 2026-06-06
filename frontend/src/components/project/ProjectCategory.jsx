
import ProjectCategoryRadio from "./ProjectCategoryRadio";

const ProjectCategory = ({onChange}) => {

    return (
        <div>
            <p>
                프로젝트 카테고리&nbsp;
                <span className="relative inline-flex top-0 right-0 block h-3 w-3 rounded-full bg-red-600 ring-2 ring-white"></span>
            </p>
            <br/>
            <div className="inline-flex gap-4">
                <ProjectCategoryRadio categoryName="웹 개발"
                                      onChange={onChange}>
                </ProjectCategoryRadio>
                <ProjectCategoryRadio categoryName="모바일 앱"
                                      onChange={onChange}>
                </ProjectCategoryRadio>
                <ProjectCategoryRadio categoryName="AI/ML"
                                      onChange={onChange}>
                </ProjectCategoryRadio>
                <ProjectCategoryRadio categoryName="백엔드"
                                      onChange={onChange}>
                </ProjectCategoryRadio>
                <ProjectCategoryRadio categoryName="게임"
                                      onChange={onChange}>
                </ProjectCategoryRadio>
                <ProjectCategoryRadio categoryName="디자인"
                                      onChange={onChange}>
                </ProjectCategoryRadio>
                <ProjectCategoryRadio categoryName="기타"
                                      onChange={onChange}>
                </ProjectCategoryRadio>
            </div>
            <br/><br/>
        </div>
    )
}

export default ProjectCategory;
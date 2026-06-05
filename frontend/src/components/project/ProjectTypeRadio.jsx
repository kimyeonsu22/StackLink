
const ProjectTypeRadio = ({typeName, description, selectedType, onChange}) => {
    return (
        <div className="relative flex justify-center items-center gap-2 bg-white rounded-lg p-2 border border-gray-300 w-1/4 has-[:checked]:border-purple-500">
            {/* input radio 선택될 경우 부모 div border-purple-500 으로 변경 */}
            <input type="radio" value={typeName}
                   onChange={onChange}/>
            <label htmlFor={typeName}>{typeName}
                <div className="text-xs text-gray-500">
                    {description}
                </div>
            </label>
        </div>
    )
}

export default ProjectTypeRadio;
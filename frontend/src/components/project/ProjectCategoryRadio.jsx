
const ProjectCategoryRadio = ({categoryName, selectedCategory, onChange}) => {
    return (
        <label className="cursor-pointer">
            <input type="radio" value={categoryName} className="peer sr-only"
                   onChange={onChange}/>
            <div className="flex justify-center items-center gap-2 bg-white rounded-lg p-2 w-22 border border-gray-300 peer-checked:border-purple-500">
                {categoryName}
            </div>
        </label>
    )
}

export default ProjectCategoryRadio;
export const formatCategoryName = (category) => {
    return category.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
}

export default formatCategoryName
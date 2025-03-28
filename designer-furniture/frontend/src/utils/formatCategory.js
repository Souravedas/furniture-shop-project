export const formatCategoryName = (category) => {
    return category.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()); 
    // ✅ Converts "living_table" → "Living Table"
  };
  
  export default formatCategoryName;  
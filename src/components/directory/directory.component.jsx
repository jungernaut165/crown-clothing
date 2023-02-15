import CategoryItem from "../category-item/category-item.component";

import "./directory.styles.scss";

function Directory(props) {
  return (
    <div className="directory-container">
      {props.categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}

export default Directory;

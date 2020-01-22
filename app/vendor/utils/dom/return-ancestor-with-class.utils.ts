export default function returnAncestorWithClass(element: any, className: string): any {
  const formattedClassName = className.split('.').join("");

  if (element.classList.contains(formattedClassName)) {
    return element;
  }

  if (element.parentNode && element.parentNode.classList) {
    return returnAncestorWithClass(element.parentNode, formattedClassName);
  } else {
    return false;
  }
}

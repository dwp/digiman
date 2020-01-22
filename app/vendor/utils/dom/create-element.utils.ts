const domify = require('domify');

export default function createElement(html: any) {
  return domify(html);
}

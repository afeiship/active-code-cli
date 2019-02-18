'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = {
  renderNode: function renderNode(inProps, inEditor, inNext) {
    var children = inProps.children,
        node = inProps.node,
        isFocused = inProps.isFocused,
        isSelected = inProps.isSelected,
        attributes = _objectWithoutProperties(inProps, ['children', 'node', 'isFocused', 'isSelected']);

    var href = node.data.get('href');
    var target = node.data.get('target') || '_blank';
    switch (node.type) {
      case 'link':
        return React.createElement(
          'a',
          _extends({ href: href, target: target }, attributes, { className: 'slate-plugin-link-node' }),
          children
        );
      default:
        return inNext();
    }
  }
};
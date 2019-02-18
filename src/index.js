export default {
  renderNode(inProps, inEditor, inNext) {
    const { children, node, ...attributes } = inProps;
    const href = node.data.get('href');
    const target = node.data.get('target') || '_blank';
    switch (node.type) {
      case 'link':
        return (
          <a href={href} target={target} {...attributes} className={'slate-plugin-link-node'}>
            {children}
          </a>
        );
      default:
        return inNext();
    }
  }
};

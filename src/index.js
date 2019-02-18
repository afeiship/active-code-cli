export default {
  renderMark(inProps, inEditor, inNext) {
    const { children, ...attributes } = inProps;
    const href = inProps.node.data.get('href');
    const target = inProps.node.data.get('target') || '_blank';
    switch (inProps.mark.type) {
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

# slate-plugin-link
> SlateJS link plugin.


## install:
```bash
npm install -S afeiship/slate-plugin-link --registry=https://registry.npm.taobao.org
```

## usage:
```js
const hasLink = editor.value.inlines.some((block) => block.type == 'link');

// toggle link:
if (!hasLink) {
  editor.wrapInline({
    type: 'link',
    data: { href: 'https://www.baidu.com' }
  });
  // editor.moveToEnd();
} else {
  editor.unwrapInline('link');
}
```

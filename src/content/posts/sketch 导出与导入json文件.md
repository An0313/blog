---
title: sketch 导出与导入json文件
date: 2023-05-25 16:23:50
updated: 2023-05-29 17:37:30
tags:
  - 工程化
permalink: /2023/05/25/sketch%20%E5%AF%BC%E5%87%BA%E4%B8%8E%E5%AF%BC%E5%85%A5json%E6%96%87%E4%BB%B6/
---
### sketch 元素 转 json

```javascript
import { toSJSON } from 'sketch-json-helper';
import fs from "@skpm/fs";

const sketch = require('sketch')

// 导出json文件
export const exportJson = (context) => {
  const document = sketch.fromNative(context.document);//声明
  const selectedLayers = document.selectedLayers;

  const arr = selectedLayers.layers;
  const format = 'json'

  if (arr.length === 0) sketch.UI.message("请选择要导出的组件!");
  else if (arr.length > 1) sketch.UI.alert('提示', '只支持单选')
  else {
    arr.forEach(item => {
      const savePanel = NSSavePanel.savePanel();
      savePanel.setTitle('Save File');
      savePanel.setNameFieldStringValue(item.name)
      savePanel.setDirectoryURL(document.sketchObject.fileURL())
      savePanel.setAllowedFileTypes([format]);

      if (savePanel.runModal() === NSModalResponseOK) {
        const url = savePanel.URL().URLByDeletingLastPathComponent().path();
        const customFileName = savePanel.nameFieldStringValue()

        fs.writeFileSync(`${url}/${customFileName}.${format}`, JSON.stringify(toSJSON(item)));
      }
    });

    sketch.UI.message(`导出结束`);
  }
};
```

### sketch json 转 元素

```javascript
import {fromNative} from 'sketch/dom';
import {toSJSON} from 'sketch-json-helper';

const nativeLayer = fromSJSON(json);
const sketchObj = fromNative(nativeLayer);
adjustFrame(sketchObj);
Document.getSelectedDocument().selectedPage.layers.push(sketchObj);
```

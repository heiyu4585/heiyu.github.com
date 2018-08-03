# js读取文件

##通过 File API 使用 JavaScript 读取文件

[通过 File API 使用 JavaScript 读取文件](https://www.html5rocks.com/zh/tutorials/file/dndfiles/)

```
简介
HTML5 终于为我们提供了一种通过 File API 规范与本地文件交互的标准方式。为了举例说明其功能，可使用 File API 在向服务器发送图片的过程中创建图片的缩略图预览，或者允许应用程序在用户离线时保存文件引用。另外，您可以使用客户端逻辑来验证上传内容的 mimetype 与其文件扩展名是否匹配，或者限制上传内容的大小。

该规范通过“本地”文件系统提供了多种文件访问接口：

File - 独立文件；提供只读信息，例如名称、文件大小、mimetype 和对文件句柄的引用。
FileList - File 对象的类数组序列（考虑 <input type="file" multiple> 或者从桌面拖动目录或文件）。
Blob - 可将文件分割为字节范围。
与以上数据结构结合使用时，FileReader 接口可用于通过熟悉的 JavaScript 事件处理来异步读取文件。因此，可以监控读取进度、找出错误并确定加载何时完成。这些 API 与 XMLHttpRequest 的事件模型有很多相似之处。

请注意：在编写此教程时，Chrome 浏览器 6.0 和 Firefox 3.6 均支持处理本地文件所必需的 API。从 Firefox 3.6.3 起，就不支持 File.slice() 方法了。

选择文件
首先需要检查您的浏览器是否完全支持 File API：

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}
当然，如果您的应用程序只会用到这些 API 中的一小部分，请相应地修改此代码段。

使用表单输入进行选择
要加载文件，最直接的方法就是使用标准 <input type="file"> 元素。JavaScript 会返回选定的 File 对象的列表作为 FileList。以下示例使用“multiple”属性实现了同时选择多个文件：

<input type="file" id="files" name="files[]" multiple />
<output id="list"></output>

<script>
  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate.toLocaleDateString(), '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
</script>
示例：使用表单输入进行选择。赶快试试吧！

 
使用拖放操作进行选择
另一种加载文件的方法是在本地将文件从桌面拖放到浏览器。我们可以对前一个示例稍作修改，加入拖放支持。

<div id="drop_zone">Drop files here</div>
<output id="list"></output>

<script>
  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate.toLocaleDateString(), '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  // Setup the dnd listeners.
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
</script>
示例：使用拖放操作进行选择。赶快试试吧！

将文件拖放到此处

请注意，有些浏览器会将 <input type="file"> 元素视为本地拖放目标。在前一个示例中尝试将文件拖动到输入字段上。

读取文件
现在精彩的部分到了！

当您获取了 File 引用后，实例化 FileReader 对象，以便将其内容读取到内存中。加载结束后，将触发读取程序的 onload 事件，而其 result 属性可用于访问文件数据。

FileReader 包括四个异步读取文件的选项：

FileReader.readAsBinaryString(Blob|File) - result 属性将包含二进制字符串形式的 file/blob 数据。每个字节均由一个 [0..255] 范围内的整数表示。
FileReader.readAsText(Blob|File, opt_encoding) - result 属性将包含文本字符串形式的 file/blob 数据。该字符串在默认情况下采用“UTF-8”编码。使用可选编码参数可指定其他格式。
FileReader.readAsDataURL(Blob|File) - result 属性将包含编码为数据网址的 file/blob 数据。
FileReader.readAsArrayBuffer(Blob|File) - result 属性将包含 ArrayBuffer 对象形式的 file/blob 数据。
对您的 FileReader 对象调用其中某一种读取方法后，可使用 onloadstart、onprogress、onload、onabort、onerror 和 onloadend 跟踪其进度。

下面的示例从用户选择的内容中过滤掉了图片，对文件调用 reader.readAsDataURL()，并通过将“src”属性设为数据网址来呈现缩略图。

<style>
  .thumb {
    height: 75px;
    border: 1px solid #000;
    margin: 10px 5px 0 0;
  }
</style>

<input type="file" id="files" name="files[]" multiple />
<output id="list"></output>

<script>
  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
</script>
示例：读取文件。赶快试试吧！

用图片目录试试这个示例吧！



分割文件
在某些情况下，将整个文件读取到内存中并不是最好的选择。例如，您要编写一个异步文件上传器。要提高上传速度，一种可行的方法是以彼此独立的字节范围块读取和发送文件。然后，由服务器组件负责按正确顺序重建文件。

对我们来说幸运的是，File 接口支持分割方法，因而可以支持此用例。在该方法中，起始字节为第一个参数，终止字节为第二个参数，选项内容类型字符串为第三个参数。该方法的语义近期做了更改，因此已由供应商添加前缀：

if (file.webkitSlice) {
  var blob = file.webkitSlice(startingByte, endindByte);
} else if (file.mozSlice) {
  var blob = file.mozSlice(startingByte, endindByte);
}
reader.readAsBinaryString(blob);
以下示例演示了如何读取文件块。值得注意的是，该示例使用 onloadend 并检查 evt.target.readyState，而不是使用 onload 事件。

<style>
  #byte_content {
    margin: 5px 0;
    max-height: 100px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  #byte_range { margin-top: 5px; }
</style>

<input type="file" id="files" name="file" /> Read bytes: 
<span class="readBytesButtons">
  <button data-startbyte="0" data-endbyte="4">1-5</button>
  <button data-startbyte="5" data-endbyte="14">6-15</button>
  <button data-startbyte="6" data-endbyte="7">7-8</button>
  <button>entire file</button>
</span>
<div id="byte_range"></div>
<div id="byte_content"></div>

<script>
  function readBlob(opt_startByte, opt_stopByte) {

    var files = document.getElementById('files').files;
    if (!files.length) {
      alert('Please select a file!');
      return;
    }

    var file = files[0];
    var start = parseInt(opt_startByte) || 0;
    var stop = parseInt(opt_stopByte) || file.size - 1;

    var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) { // DONE == 2
        document.getElementById('byte_content').textContent = evt.target.result;
        document.getElementById('byte_range').textContent = 
            ['Read bytes: ', start + 1, ' - ', stop + 1,
             ' of ', file.size, ' byte file'].join('');
      }
    };

    if (file.webkitSlice) {
      var blob = file.webkitSlice(start, stop + 1);
    } else if (file.mozSlice) {
      var blob = file.mozSlice(start, stop + 1);
    }
    reader.readAsBinaryString(blob);
  }
  
  document.querySelector('.readBytesButtons').addEventListener('click', function(evt) {
    if (evt.target.tagName.toLowerCase() == 'button') {
      var startByte = evt.target.getAttribute('data-startbyte');
      var endByte = evt.target.getAttribute('data-endbyte');
      readBlob(startByte, endByte);
    }
  }, false);
</script>
示例：分割文件。赶快试试吧！

 读取字节：  1-5  6-15 7-8  整个文件
监控读取进度
我们在使用异步事件处理时还能顺便获得一项优势，那就是能够监控文件的读取进度；这对于读取大文件、查找错误和预测读取完成时间非常实用。

onloadstart 和 onprogress 事件可用于监控读取进度。

以下示例演示了如何通过显示进度条来监控读取状态。要查看进度指示器的实际效果，请尝试读取大文件或远程驱动器中的文件。

<style>
  #progress_bar {
    margin: 10px 0;
    padding: 3px;
    border: 1px solid #000;
    font-size: 14px;
    clear: both;
    opacity: 0;
    -moz-transition: opacity 1s linear;
    -o-transition: opacity 1s linear;
    -webkit-transition: opacity 1s linear;
  }
  #progress_bar.loading {
    opacity: 1.0;
  }
  #progress_bar .percent {
    background-color: #99ccff;
    height: auto;
    width: 0;
  }
</style>

<input type="file" id="files" name="file" />
<button onclick="abortRead();">Cancel read</button>
<div id="progress_bar"><div class="percent">0%</div></div>

<script>
  var reader;
  var progress = document.querySelector('.percent');

  function abortRead() {
    reader.abort();
  }

  function errorHandler(evt) {
    switch(evt.target.error.code) {
      case evt.target.error.NOT_FOUND_ERR:
        alert('File Not Found!');
        break;
      case evt.target.error.NOT_READABLE_ERR:
        alert('File is not readable');
        break;
      case evt.target.error.ABORT_ERR:
        break; // noop
      default:
        alert('An error occurred reading this file.');
    };
  }

  function updateProgress(evt) {
    // evt is an ProgressEvent.
    if (evt.lengthComputable) {
      var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
      // Increase the progress bar length.
      if (percentLoaded < 100) {
        progress.style.width = percentLoaded + '%';
        progress.textContent = percentLoaded + '%';
      }
    }
  }

  function handleFileSelect(evt) {
    // Reset progress indicator on new file selection.
    progress.style.width = '0%';
    progress.textContent = '0%';

    reader = new FileReader();
    reader.onerror = errorHandler;
    reader.onprogress = updateProgress;
    reader.onabort = function(e) {
      alert('File read cancelled');
    };
    reader.onloadstart = function(e) {
      document.getElementById('progress_bar').className = 'loading';
    };
    reader.onload = function(e) {
      // Ensure that the progress bar displays 100% at the end.
      progress.style.width = '100%';
      progress.textContent = '100%';
      setTimeout("document.getElementById('progress_bar').className='';", 2000);
    }

    // Read in the image file as a binary string.
    reader.readAsBinaryString(evt.target.files[0]);
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
</script>
示例：监控读取进度。赶快试试吧！

  取消读取
0%
提示：要查看进度指示器的实际效果，请尝试读取大文件或远程驱动器中的资源。

参考
File API 规范
FileReader 接口规范
Blob 接口规范
FileError 接口规范
ProgressEvent 接口规范
```
#DNS-Prefetch、prefetch、preload

## DNS-Prefetch
通过 DNS 预解析来告诉浏览器未来我们可能从某个特定的 URL 获取资源，当浏览器真正使用到该域中的某个资源时就可以尽快地完成 DNS 解析。例如，我们将来可能从 example.com 获取图片或音频资源，那么可以在文档顶部的 <head> 标签中加入以下内容：

`<link rel="dns-prefetch" href="//example.com">`

当我们从该 URL 请求一个资源时，就不再需要等待 DNS 的解析过程。该技术对使用第三方资源特别有用。

## 预渲染 Prerender
这是一个核武器，因为 prerender 可以预先加载文档的所有资源：

`<link rel="prerender" href="http://example.com">`

会造成浏览器压力

## Preload
preload 是一个新规范，与 prefetch 不同（可能被忽略）的是，浏览器一定会预加载该资源：

`<link rel="preload" href="image.png">`


DNS-Prefetch | Prerender | Preload | Subresources(已废弃)|preconnect|prefetch
------------ | ------------- | ------------| ------------| ------------| ------------
dns预解析 | 预渲染| 必须优先渲染| |tcp预连接|资源预获取
当浏览器真正请求该域中的某个资源时，DNS 的解析就已经完成了| 会预处理这个页面中所有的资源，慎重使用；确保用户会访问这个链接，才去预渲染，否则可能浪费较多资源（高流量、高cpu）。  | 　加载的资源作用于当前页面。浏览器可以正确指定优先级，即preload不会影响当前页面重要资源的下载；和prefetch不同的是，prefetch可能会被浏览器忽略，但浏览器必定会响应preload|这是另一个预获取方式，这种方式指定的预获取资源具有最高的优先级，在所有 prefetch 项之前进行：|预先建立 socket 连接，从而消除昂贵的 DNS 查找、TCP 握手和 TLS 往返开销|告诉浏览器加载下一页面可能会用到的资源，因为资源是作用于下一个页面，所以优先级很低


[浏览器页面资源加载过程与优化](https://blog.kaolafed.com/2018/01/05/%E6%B5%8F%E8%A7%88%E5%99%A8%E9%A1%B5%E9%9D%A2%E8%B5%84%E6%BA%90%E5%8A%A0%E8%BD%BD%E8%BF%87%E7%A8%8B%E4%B8%8E%E4%BC%98%E5%8C%96/)
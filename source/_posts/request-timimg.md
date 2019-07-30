---
title: '浏览器请求耗时阶段解释'
date: 2019-07-18T16:04:07+08:00
tags: 'Browser'
categories: 'Web'
---

## 一个请求耗时阶段解释

**Queueing** 浏览器会在以下情况时将请求加入队列，有优先级更高的请求；当请求协议是 HTTP/1.0 和 HTTP/1.1 时，同一域名下已经有 6 个 TCP 链接；浏览器在分配磁盘缓存

**Stalled** 由于排队中描述的任何原因，请求可能会停止

**DNS Lookup** 浏览器正在解析请求的 IP 地址

**Proxy negotiation** 浏览器与代理服务器协商请求

**Request sent** 请求已经发出

**ServiceWorker Preparation** 浏览器启动 service worker

**Request to ServiceWorker** 请求已经向 service worker 发出

**Waiting (TTFB)** 浏览器等待第一个字节返回，此时间包括 1 次往返延迟和服务器准备响应所用的时间。

**Content Download**. 浏览器接收响应

**Receiving Push**. 浏览器收到通过 HTTP/2 Server Push 的响应

**Reading Push**. 浏览器正在读取先前收到的本地数据

## Timing breakdown phases explained

Here's more information about each of the phases you may see in the Timing tab:

**Queueing**. The browser queues requests when:

- There are higher priority requests.
- There are already six TCP connections open for this origin, which is the limit. Applies to HTTP/1.0 and HTTP/1.1 only.
- The browser is briefly allocating space in the disk cache

**Stalled**. The request could be stalled for any of the reasons described in**Queueing**.

**DNS Lookup**. The browser is resolving the request's IP address.

**Proxy negotiation**. The browser is negotiating the request with a[proxy server](https://en.wikipedia.org/wiki/Proxy_server).

**Request sent**. The request is being sent.

**ServiceWorker Preparation**. The browser is starting up the service worker.

**Request to ServiceWorker**. The request is being sent to the service worker.

**Waiting (TTFB)**. The browser is waiting for the first byte of a response. TTFB stands for Time To First Byte. This timing includes 1 round trip of latency and the time the server took to prepare the response.

**Content Download**. The browser is receiving the response.

**Receiving Push**. The browser is receiving data for this response via HTTP/2 Server Push.

**Reading Push**. The browser is reading the local data previously received.

// 优化的Service Worker
const CACHE_NAME = "popcorn-games-v2"
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.json",
  "/favicon.ico",
  "/images/logo.png",
  "/images/games/popcorn-game-1.jpg",
  "/images/games/popcorn-game-2.jpg",
  "/images/games/popcorn-game-3.jpg",
]

// 安装事件 - 缓存核心资源
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => self.skipWaiting()),
  )
})

// 激活事件 - 清理旧缓存
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.filter((cacheName) => cacheName !== CACHE_NAME).map((cacheName) => caches.delete(cacheName)),
        )
      })
      .then(() => self.clients.claim()),
  )
})

// 获取事件 - 实现网络优先策略
self.addEventListener("fetch", (event) => {
  // 跳过非GET请求和浏览器扩展请求
  if (event.request.method !== "GET" || event.request.url.startsWith("chrome-extension://")) {
    return
  }

  // 处理导航请求
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match("/offline.html")
      }),
    )
    return
  }

  // 处理图片请求 - 缓存优先
  if (event.request.destination === "image") {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }

        return fetch(event.request)
          .then((networkResponse) => {
            const clonedResponse = networkResponse.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clonedResponse))
            return networkResponse
          })
          .catch(() => {
            // 如果是游戏图片，返回默认图片
            if (event.request.url.includes("/games/")) {
              return caches.match("/images/games/popcorn-game-1.jpg")
            }
            return new Response("Image not available", { status: 404 })
          })
      }),
    )
    return
  }

  // 其他资源 - 网络优先，缓存回退
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // 缓存成功的响应
        const clonedResponse = networkResponse.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clonedResponse))
        return networkResponse
      })
      .catch(() => caches.match(event.request)),
  )
})


"use client"

import { useEffect } from "react"

export function PerformanceMonitoring() {
  useEffect(() => {
    // 只在生产环境中运行
    if (process.env.NODE_ENV !== "production") return

    // 监控页面加载性能
    if (typeof window !== "undefined" && "performance" in window) {
      window.addEventListener("load", () => {
        // 使用 requestIdleCallback 在浏览器空闲时执行
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(() => {
            const perfData = window.performance.timing
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
            const domReadyTime = perfData.domComplete - perfData.domLoading

            // 这里可以发送到分析服务
            console.log(`Page load time: ${pageLoadTime}ms`)
            console.log(`DOM ready time: ${domReadyTime}ms`)

            // 获取关键渲染路径指标
            if ("getEntriesByType" in performance) {
              const paintMetrics = performance.getEntriesByType("paint")
              paintMetrics.forEach((metric) => {
                console.log(`${metric.name}: ${metric.startTime}ms`)
              })
            }
          })
        }
      })
    }

    // 监控资源加载性能
    if (typeof window !== "undefined" && "PerformanceObserver" in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        const resources = list.getEntries()
        resources.forEach((resource) => {
          // 过滤出加载时间超过2秒的资源
          if (resource.duration > 2000) {
            console.warn(`Slow resource: ${resource.name} - ${resource.duration}ms`)
          }
        })
      })

      resourceObserver.observe({ entryTypes: ["resource"] })
    }

    return () => {
      // 清理观察者
      if (typeof window !== "undefined" && "PerformanceObserver" in window) {
        PerformanceObserver.disconnect()
      }
    }
  }, [])

  return null
}


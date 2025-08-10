/**
 * LanguageDetector API 类型定义
 * 基于 MDN 文档: https://developer.mozilla.org/en-US/docs/Web/API/LanguageDetector
 */
declare interface Window {
  LanguageDetector: LanguageDetector
}

/**
 * LanguageDetector 接口，包含所有语言检测功能
 * 包括检查 AI 模型可用性、创建新的 LanguageDetector 实例、执行语言检测等
 */
declare interface LanguageDetector {
  /**
   * 检查给定 LanguageDetector 配置的 AI 模型可用性
   * @param options 语言检测器配置选项
   * @returns 表示模型可用性的枚举值，如果无法确定支持则返回 null
   */
  availability: (options?: LanguageDetectorAvailabilityOptions) => Promise<LanguageDetectorAvailability | null>

  /**
   * 创建新的 LanguageDetector 实例用于检测语言
   * 注意：此方法需要瞬态激活，即必须响应用户操作（如鼠标点击或按钮按下）调用
   * @param options 语言检测器配置选项
   * @returns LanguageDetector 实例
   */
  create: (options?: LanguageDetectorCreateOptions) => Promise<LanguageDetectorInstance>
}

/**
 * availability() 方法的配置选项
 */
declare interface LanguageDetectorAvailabilityOptions {
  /**
   * 预期在输入文本中检测到的语言列表
   * 应为有效的 BCP 47 语言标签数组（如 RFC 5646 中指定）
   * 默认值为 ["en"]
   */
  expectedInputLanguages: string[]
}

/**
 * 创建 LanguageDetector 实例的配置选项
 */
declare interface LanguageDetectorCreateOptions {
  /**
   * 预期在输入文本中检测到的语言列表，有助于提高语言检测的准确性
   * 应为有效的 BCP 47 语言标签数组（如 RFC 5646 中指定）
   * 默认值为 ["en"]
   */
  expectedInputLanguages?: string[]

  /** 可选的监控器函数，用于监听 AI 模型的下载进度 */
  monitor?: (monitor: LanguageDetectorMonitor) => void

  /** 可选的 AbortSignal，允许通过关联的 AbortController 中止 create() 操作 */
  signal?: AbortSignal
}

/**
 * detect() 方法的配置选项
 */
declare interface LanguageDetectorDetectOptions {
  /** 可选的 AbortSignal，允许通过关联的 AbortController 中止 detect() 操作 */
  signal?: AbortSignal
}

/**
 * LanguageDetector 模型可用性枚举
 */
declare type LanguageDetectorAvailability
  = | 'available' // 浏览器支持给定配置且可立即使用
    | 'downloadable' // 浏览器支持给定配置，但需要先下载 AI 模型或模型的微调数据
    | 'downloading' // 浏览器支持给定配置，但需要完成正在进行的下载
    | 'unavailable' // 浏览器不支持给定配置

/**
 * 语言检测器监控器接口，用于监听下载进度
 */
declare interface LanguageDetectorMonitor extends EventTarget {
  /**
   * 添加下载进度事件监听器
   * @param type 事件类型
   * @param listener 事件监听器
   */
  addEventListener: (type: 'downloadprogress', listener: (event: LanguageDetectorDownloadProgressEvent) => void) => void
}

/**
 * 下载进度事件
 */
declare interface LanguageDetectorDownloadProgressEvent extends Event {
  /** 已下载的百分比（0-1 之间的数值） */
  readonly loaded: number
}

/**
 * 语言检测结果接口
 */
declare interface LanguageDetectionResult {
  /**
   * 检测到的语言，为 BCP 47 语言标签
   * 最后一个数组元素的 detectedLanguage 值始终为 "und"（"undetermined" 的缩写），
   * 表示文本不是用模型已知语言编写的概率
   */
  detectedLanguage: string
  /**
   * AI 模型对检测到的语言正确性的置信度，0-1 之间的数值
   * 所有返回的置信度值之和理论上应为 1，但可能会更低，因为非常低的置信度值会被排除在结果之外
   */
  confidence: number
}

/**
 * LanguageDetector 实例接口
 */
declare interface LanguageDetectorInstance {
  /** 浏览器检测语言的输入配额（只读） */
  readonly inputQuota: number

  /** 预期在输入文本中检测到的语言列表（只读） */
  readonly expectedInputLanguages: string[]

  /**
   * 销毁当前 LanguageDetector 实例
   * 建议在不再使用时调用此方法，因为实例会占用大量资源
   * @returns 无返回值 (undefined)
   */
  destroy: () => void

  /**
   * 检测给定文本字符串最可能使用的语言
   * @param input 要检测语言的文本字符串
   * @param options 可选的配置选项
   * @returns Promise，解析为语言检测结果数组，按置信度降序排列
   * @throws {InvalidStateError} 当前 Document 不活跃时抛出
   * @throws {QuotaExceededError} 语言检测操作超过可用 inputQuota 时抛出
   */
  detect: (input: string, options?: LanguageDetectorDetectOptions) => Promise<LanguageDetectionResult[]>

  /**
   * 报告给定文本输入的语言检测操作将使用多少输入配额
   * @param text 要测量的文本字符串
   * @param options 可选的配置选项
   * @returns Promise，解析为表示输入配额使用量的数字
   * @throws {InvalidStateError} 当前 Document 不活跃时抛出
   * @throws {NotAllowedError} 当 LanguageDetector API 被权限策略阻止时抛出
   * @throws {UnknownError} 其他未知错误
   */
  measureInputUsage: (text: string, options?: LanguageDetectorDetectOptions) => Promise<number>
}

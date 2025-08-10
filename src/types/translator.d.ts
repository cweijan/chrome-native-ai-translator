/**
 * Translator API 类型定义
 * 基于 MDN 文档: https://developer.mozilla.org/en-US/docs/Web/API/Translator
 */
interface Window {
  Translator: Translator
}

/**
 * Translator 接口，包含所有相关的翻译功能
 * 包括检查 AI 模型可用性、创建新的 Translator 实例、执行翻译等
 */
declare interface Translator {
  /**
   * 检查给定 Translator 配置的 AI 模型可用性
   * @param options 翻译器配置选项
   * @returns 表示模型可用性的枚举值，如果无法确定支持则返回 null
   */
  availability: (options: TranslatorCreateOptions) => Promise<TranslatorAvailability | null>

  /**
   * 创建新的 Translator 实例用于生成翻译
   * @param options 翻译器配置选项（可包含监控器）
   * @returns Translator 实例
   */
  create: (options: TranslatorCreateOptionsWithMonitor) => Promise<TranslatorInstance>
}

/**
 * 创建 Translator 实例的基础配置选项
 */
declare interface TranslatorCreateOptions {
  /** 输入文本的预期语言，应为有效的 BCP 47 语言标签 */
  sourceLanguage: string
  /** 输入文本将被翻译成的目标语言，应为有效的 BCP 47 语言标签 */
  targetLanguage: string
}

/**
 * 创建 Translator 实例的配置选项（包含可选的监控器）
 */
declare interface TranslatorCreateOptionsWithMonitor extends TranslatorCreateOptions {
  /** 可选的监控器函数，用于监听下载进度 */
  monitor?: (monitor: TranslatorMonitor) => void
}

/**
 * 翻译操作的配置选项
 */
declare interface TranslatorOperationOptions {
  /** 可选的 AbortSignal，用于取消操作 */
  signal?: AbortSignal
}

/**
 * Translator 模型可用性枚举
 */
declare type TranslatorAvailability
  = | 'available' // 浏览器支持给定配置且可立即使用
    | 'downloadable' // 浏览器支持给定配置，但需要先下载 AI 模型
    | 'downloading' // 浏览器支持给定配置，但需要完成正在进行的下载
    | 'unavailable' // 浏览器不支持给定配置

/**
 * 翻译器监控器接口，用于监听下载进度
 */
declare interface TranslatorMonitor extends EventTarget {
  /**
   * 添加下载进度事件监听器
   * @param type 事件类型
   * @param listener 事件监听器
   */
  addEventListener: (type: 'downloadprogress', listener: (event: TranslatorDownloadProgressEvent) => void) => void
}

/**
 * 下载进度事件
 */
declare interface TranslatorDownloadProgressEvent extends Event {
  /** 已下载的百分比（0-1 之间的数值） */
  readonly loaded: number
}

/**
 * Translator 实例接口
 */
declare interface TranslatorInstance {
  /** 浏览器生成翻译的输入配额（只读） */
  readonly inputQuota: number

  /** 待翻译输入文本的预期语言（只读） */
  readonly sourceLanguage: string

  /** 输入文本将被翻译成的目标语言（只读） */
  readonly targetLanguage: string

  /**
   * 销毁当前 Translator 实例
   * 建议在不再使用时调用此方法，因为实例会占用大量资源
   * @returns 无返回值 (undefined)
   */
  destroy: () => void

  /**
   * 报告给定文本输入的翻译操作将使用多少输入配额
   * @param text 要测量的文本字符串
   * @param options 可选的配置选项
   * @returns Promise，解析为表示输入配额使用量的数字
   * @throws {InvalidStateError} 当前 Document 不活跃时抛出
   * @throws {NotAllowedError} 当 Translator API 被权限策略阻止时抛出
   * @throws {UnknownError} 其他未知错误
   */
  measureInputUsage: (text: string, options?: TranslatorOperationOptions) => Promise<number>

  /**
   * 返回包含输入字符串翻译的字符串
   * @param text 要翻译的文本字符串
   * @param options 可选的配置选项
   * @returns Promise，解析为翻译结果字符串
   * @throws {InvalidStateError} 当前 Document 不活跃时抛出
   * @throws {QuotaExceededError} 翻译操作超过可用 inputQuota 时抛出
   * @throws {NotAllowedError} 当 Translator API 被权限策略阻止时抛出
   * @throws {UnknownError} 其他未知错误
   */
  translate: (text: string, options?: TranslatorOperationOptions) => Promise<string>

  /**
   * 以 ReadableStream 形式生成输入字符串的翻译
   * @param text 要翻译的文本字符串
   * @param options 可选的配置选项
   * @returns 包含生成翻译的 ReadableStream
   * @throws {InvalidStateError} 当前 Document 不活跃时抛出
   * @throws {QuotaExceededError} 翻译操作超过可用 inputQuota 时抛出
   * @throws {NotAllowedError} 当 Translator API 被权限策略阻止时抛出
   * @throws {UnknownError} 其他未知错误
   */
  translateStreaming: (text: string, options?: TranslatorOperationOptions) => ReadableStream<string>
}

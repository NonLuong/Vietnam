type WebMCPTool = {
  name: string
  title?: string
  description: string
  inputSchema: Record<string, unknown>
  annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean }
  execute(input: any): unknown
}

interface Document {
  readonly modelContext?: {
    registerTool(tool: WebMCPTool): void | Promise<void>
  }
}

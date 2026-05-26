import { Component, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo)
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined })
    window.location.reload()
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center">
          <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-black text-slate-800 mb-2">Algo deu errado</h1>
          <p className="text-slate-500 text-sm mb-4">
            {this.state.error?.message ?? 'Erro inesperado no painel.'}
          </p>
          {this.state.error?.stack && (
            <details className="text-left text-xs text-slate-400 bg-slate-50 rounded-lg p-3 mb-4 max-h-32 overflow-y-auto">
              <summary className="cursor-pointer">Detalhes técnicos</summary>
              <pre className="mt-2 whitespace-pre-wrap break-words">{this.state.error.stack}</pre>
            </details>
          )}
          <button
            onClick={this.reset}
            className="bg-marco-azul hover:bg-marco-azul-esc text-white font-bold px-6 py-2.5 rounded-lg inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Recarregar
          </button>
        </div>
      </div>
    )
  }
}

import { Component } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("React Error Boundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          background: "#0d0f1a",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          fontFamily: "monospace",
        }}>
          <h1 style={{ color: "#e91e8c", marginBottom: "16px" }}>
            ⚠️ Error al renderizar
          </h1>
          <pre style={{
            background: "#1a1d2e",
            padding: "20px",
            borderRadius: "8px",
            maxWidth: "800px",
            overflow: "auto",
            fontSize: "13px",
            color: "#f87171",
          }}>
            {this.state.error?.message}
            {"\n\n"}
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: "24px",
              background: "#e91e8c",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              padding: "10px 24px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Reintentar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

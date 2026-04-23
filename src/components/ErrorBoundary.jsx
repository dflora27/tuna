import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (typeof console !== 'undefined') {
      console.error('[ErrorBoundary]', error, info);
    }
  }

  handleReload = () => {
    if (typeof window !== 'undefined') window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '1rem',
            background: '#2B2422',
            color: '#FDEBE1',
            padding: '2rem',
            textAlign: 'center',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          <h1 style={{ fontSize: '2rem', fontWeight: 400 }}>Beklenmeyen bir hata oluştu.</h1>
          <p style={{ opacity: 0.75, maxWidth: 520 }}>
            Lütfen sayfayı yenileyin. Sorun devam ederse info@bahtiyartuna.com
            adresinden bize ulaşabilirsiniz.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              marginTop: '0.8rem',
              padding: '0.9rem 2rem',
              background: 'transparent',
              color: '#FDEBE1',
              border: '1px solid rgba(253,235,225,0.4)',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Yenile
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

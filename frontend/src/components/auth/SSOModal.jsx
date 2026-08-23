import React from 'react';
import { APPROVED_DEMO_ACCOUNTS } from '../../services/authService';

function GoogleLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function MicrosoftLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
      <path fill="#f35325" d="M0 0h11v11H0z"/>
      <path fill="#81bc06" d="M12 0h11v11H12z"/>
      <path fill="#05a6f0" d="M0 12h11v11H0z"/>
      <path fill="#ffba08" d="M12 12h11v11H12z"/>
    </svg>
  );
}

export default function SSOModal({ isOpen, onClose, provider, onSelectAccount }) {
  if (!isOpen) return null;

  const isGoogle = provider === 'Google';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden transform transition-all duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sso-modal-title"
      >
        {/* Header */}
        <div className="p-6 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-200/80">
              {isGoogle ? <GoogleLogo /> : <MicrosoftLogo />}
            </div>
            <div>
              <h3 id="sso-modal-title" className="text-base font-bold text-slate-900">
                Sign in with {isGoogle ? 'Google Workspace' : 'Microsoft 365'}
              </h3>
              <p className="text-xs text-slate-500">
                Choose an enterprise account to continue
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Account Selection List */}
        <div className="p-6 space-y-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Available Enterprise Accounts
          </p>

          <div className="space-y-2.5">
            {APPROVED_DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.id}
                type="button"
                onClick={() => onSelectAccount(acc)}
                className="w-full text-left p-3.5 rounded-xl border border-slate-200/90 hover:border-blue-500 hover:bg-blue-50/40 transition-all duration-150 group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center ${
                    acc.role === 'ROLE_ADMIN'
                      ? 'bg-purple-100 text-purple-700'
                      : acc.role === 'ROLE_MANAGER'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {acc.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                      {acc.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {acc.email} &bull; <span className="font-medium text-slate-700">{acc.displayRole}</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Connect →
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              🔒 Enterprise OAuth 2.0 Single Sign-On simulation enabled for local development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

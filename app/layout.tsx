import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vending Machine App",
  description: "A modern vending machine application built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        {/* Background Pattern */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50"></div>
        </div>

        {/* Modern Navigation */}
        <nav className="bg-white/80 backdrop-blur-md shadow-soft border-b border-white/20 sticky top-0 z-40 safe-area-top">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mobile-nav">
              <div className="flex items-center">
                <a
                  href="/"
                  className="flex items-center space-x-2 sm:space-x-3 group"
                >
                  <div className="text-3xl sm:text-4xl transform group-hover:scale-110 transition-transform duration-300 animate-float">
                    🥤
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="text-xl sm:text-2xl font-bold text-gradient">
                      SmartVend
                    </h1>
                    <p className="text-xs text-secondary-500 font-medium hidden sm:block">
                      Modern Vending Solution
                    </p>
                  </div>
                  <div className="sm:hidden">
                    <h1 className="text-lg font-bold text-gradient">
                      SmartVend
                    </h1>
                  </div>
                </a>
              </div>

              <div className="flex items-center space-x-1 sm:space-x-2">
                <a
                  href="/"
                  className="nav-link mobile-nav-item rounded-lg sm:rounded-xl touch-target"
                >
                  <span className="flex items-center space-x-1 sm:space-x-2">
                    <span className="text-base sm:text-lg">🏠</span>
                    <span className="hidden sm:inline">Home</span>
                  </span>
                </a>
                <a
                  href="/admin"
                  className="nav-link mobile-nav-item rounded-lg sm:rounded-xl touch-target"
                >
                  <span className="flex items-center space-x-1 sm:space-x-2">
                    <span className="text-base sm:text-lg">⚙️</span>
                    <span className="hidden sm:inline">Admin</span>
                  </span>
                </a>
                <a
                  href="/history"
                  className="nav-link mobile-nav-item rounded-lg sm:rounded-xl touch-target"
                >
                  <span className="flex items-center space-x-1 sm:space-x-2">
                    <span className="text-base sm:text-lg">📊</span>
                    <span className="hidden sm:inline">History</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="relative z-10">
          <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
            <div className="animate-fade-in">{children}</div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 mt-20 border-t border-white/20 bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-2xl animate-float">🥤</span>
                <span className="text-lg font-bold text-gradient">
                  SmartVend
                </span>
              </div>
              <p className="text-secondary-600 text-sm">
                © 2024 SmartVend. Modern vending machine experience powered by
                Next.js
              </p>
              <div className="mt-4 flex justify-center space-x-6 text-secondary-500">
                <span className="text-xs">⚡ Lightning Fast</span>
                <span className="text-xs">📱 Responsive</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

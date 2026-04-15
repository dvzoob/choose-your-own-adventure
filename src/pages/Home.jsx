import Header from '../components/Header'
import StoryList from '../components/StoryList'
import { ACCESSIBILITY } from '../constants'

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.08),transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.06),transparent_24%)]" />
      </div>
      <div className="floating-question" style={{ left: '10%', top: '15%', animationDelay: '0s', fontSize: '8rem' }}>?</div>
      <div className="floating-question" style={{ left: '80%', top: '25%', animationDelay: '1s', fontSize: '7rem' }}>?</div>
      <div className="floating-question" style={{ left: '15%', top: '60%', animationDelay: '2s', fontSize: '6rem' }}>?</div>
      <div className="floating-question" style={{ left: '75%', top: '45%', animationDelay: '1.5s', fontSize: '9rem' }}>?</div>
      <div className="floating-question" style={{ left: '50%', top: '20%', animationDelay: '0.5s', fontSize: '7.5rem' }}>?</div>
      <div className="floating-question" style={{ left: '20%', top: '80%', animationDelay: '2.5s', fontSize: '8.5rem' }}>?</div>
      <div className="floating-question" style={{ left: '85%', top: '75%', animationDelay: '3s', fontSize: '7rem' }}>?</div>
      <div className="floating-question" style={{ left: '40%', top: '70%', animationDelay: '0.8s', fontSize: '8rem' }}>?</div>

      {/* Content */}
      <div className="relative z-10">
        <Header />

        {/* Main Content */}
        <main id={ACCESSIBILITY.MAIN_CONTENT_ID} className="flex-grow">
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center mb-16 relative overflow-hidden rounded-[2rem] bg-white p-10 shadow-[0_30px_80px_rgba(15,23,42,0.08)] animate-fade-in-up">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.06),transparent_24%)] opacity-70 pointer-events-none" />
              <div className="relative">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight">
                  Choose Your Own Adventure
                </h1>
                <p className="text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
                  Create and explore interactive branching stories.
                  <span className="block mt-2">Each choice shapes your unique adventure.</span>
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <div className="text-5xl animate-bounce" style={{ animationDelay: '0s' }}>📚</div>
                  <div className="text-5xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</div>
                  <div className="text-5xl animate-bounce" style={{ animationDelay: '0.4s' }}>🎭</div>
                </div>
              </div>
            </div>

            {/* Story List */}
            <StoryList />
          </div>
        </main>
      </div>

      {/* Add animation styles */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-80px) rotate(15deg);
            opacity: 0.8;
          }
        }
        
        @keyframes sway {
          0%, 100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(40px);
          }
        }
        
        .floating-question {
          position: absolute;
          font-weight: 900;
          color: #c084fc;
          filter: blur(2px);
          animation: float 8s ease-in-out infinite, sway 10s ease-in-out infinite;
          user-select: none;
          pointer-events: none;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  )
}

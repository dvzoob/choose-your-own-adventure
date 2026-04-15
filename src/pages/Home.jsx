import Header from '../components/Header'
import StoryList from '../components/StoryList'
import { ACCESSIBILITY } from '../constants'

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Floating question marks background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="floating-question" style={{ left: '10%', top: '15%', animationDelay: '0s', fontSize: '8rem' }}>?</div>
        <div className="floating-question" style={{ left: '80%', top: '25%', animationDelay: '1s', fontSize: '7rem' }}>?</div>
        <div className="floating-question" style={{ left: '15%', top: '60%', animationDelay: '2s', fontSize: '6rem' }}>?</div>
        <div className="floating-question" style={{ left: '75%', top: '45%', animationDelay: '1.5s', fontSize: '9rem' }}>?</div>
        <div className="floating-question" style={{ left: '50%', top: '20%', animationDelay: '0.5s', fontSize: '7.5rem' }}>?</div>
        <div className="floating-question" style={{ left: '20%', top: '80%', animationDelay: '2.5s', fontSize: '8.5rem' }}>?</div>
        <div className="floating-question" style={{ left: '85%', top: '75%', animationDelay: '3s', fontSize: '7rem' }}>?</div>
        <div className="floating-question" style={{ left: '40%', top: '70%', animationDelay: '0.8s', fontSize: '8rem' }}>?</div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />

        {/* Main Content */}
        <main id={ACCESSIBILITY.MAIN_CONTENT_ID} className="flex-grow">
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
              <h1 className="text-6xl md:text-7xl font-black text-purple-600 mb-6 drop-shadow-sm">
                Choose Your Own Adventure
              </h1>
              <p className="text-2xl md:text-3xl text-gray-700 max-w-3xl mx-auto drop-shadow font-medium leading-relaxed">
                Create and explore interactive branching stories. 
                <span className="block mt-2">Each choice shapes your unique adventure.</span>
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <div className="text-5xl animate-bounce" style={{ animationDelay: '0s' }}>📚</div>
                <div className="text-5xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</div>
                <div className="text-5xl animate-bounce" style={{ animationDelay: '0.4s' }}>🎭</div>
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

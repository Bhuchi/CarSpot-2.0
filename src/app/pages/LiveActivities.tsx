import { useParams } from 'react-router';
import { Trophy, Clock } from 'lucide-react';
import { Progress } from '../components/ui/progress';

export function LiveActivities() {
  const { eventId } = useParams();

  const votingOptions = [
    { id: '1', option: 'Best Modified', votes: 45, percentage: 35 },
    { id: '2', option: 'Best Classic', votes: 38, percentage: 30 },
    { id: '3', option: 'Best Paint', votes: 28, percentage: 22 },
    { id: '4', option: 'Best Sound', votes: 17, percentage: 13 },
  ];

  const quizQuestion = {
    question: 'What year was the first BMW M3 released?',
    options: ['1984', '1986', '1988', '1990'],
    timeLeft: 45,
  };

  const leaderboard = [
    { rank: 1, username: 'carspotter_23', avatar: 'CS', points: 850 },
    { rank: 2, username: 'speed_demon', avatar: 'SD', points: 720 },
    { rank: 3, username: 'luxury_rides', avatar: 'LR', points: 680 },
    { rank: 4, username: 'muscle_mania', avatar: 'MM', points: 540 },
    { rank: 5, username: 'tuner_pro', avatar: 'TP', points: 490 },
  ];

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border-yellow-500/30';
    if (rank === 2) return 'bg-gradient-to-r from-gray-400/20 to-gray-300/20 border-gray-400/30';
    if (rank === 3) return 'bg-gradient-to-r from-orange-600/20 to-orange-500/20 border-orange-500/30';
    return 'bg-[#0B1120] border-white/[0.07]';
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="mb-8">Live Activities - Event #{eventId}</h2>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Voting & Quiz */}
        <div className="lg:col-span-2 space-y-6">
          {/* Voting Card */}
          <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-6">
            <h3 className="mb-6">Live Voting</h3>
            <div className="space-y-4">
              {votingOptions.map((option) => (
                <div key={option.id}>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{option.option}</span>
                    <span className="text-[#6B7280]">{option.votes} votes</span>
                  </div>
                  <div className="relative">
                    <Progress value={option.percentage} className="h-8 bg-[#1E293B]" />
                    <div className="absolute inset-0 flex items-center justify-end px-3">
                      <span className="text-sm font-medium">{option.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Card */}
          <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3>Quick Quiz</h3>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#A3E635]/20 text-[#A3E635] rounded-full">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{quizQuestion.timeLeft}s</span>
              </div>
            </div>
            <p className="mb-6 text-lg">{quizQuestion.question}</p>
            <div className="grid grid-cols-2 gap-4">
              {quizQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className="p-4 bg-[#0B1120] border border-white/[0.07] rounded-lg hover:border-[#A3E635]/50 transition-colors text-left"
                >
                  <span className="font-medium">{option}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Leaderboard */}
        <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-6 h-6 text-[#A3E635]" />
            <h3>Leaderboard</h3>
          </div>
          <div className="space-y-3">
            {leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center gap-3 p-4 border rounded-lg ${getRankStyle(entry.rank)}`}
              >
                <div className="w-8 text-center font-bold text-lg">
                  {entry.rank <= 3 ? (
                    <span className={entry.rank === 1 ? 'text-yellow-500' : entry.rank === 2 ? 'text-gray-400' : 'text-orange-500'}>
                      {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                    </span>
                  ) : (
                    <span className="text-[#6B7280]">#{entry.rank}</span>
                  )}
                </div>
                <div className="w-10 h-10 bg-[#A3E635] rounded-full flex items-center justify-center">
                  <span className="text-black font-semibold text-sm">{entry.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">@{entry.username}</div>
                </div>
                <div className="font-bold text-[#A3E635]">{entry.points}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

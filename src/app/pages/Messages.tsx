import { useState } from 'react';
import { Send } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

interface Conversation {
  id: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

interface Message {
  id: string;
  content: string;
  sender: 'me' | 'them';
  timestamp: string;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    username: 'carspotter_23',
    avatar: 'CS',
    lastMessage: 'That M3 is incredible!',
    timestamp: '2h ago',
    unread: true,
  },
  {
    id: '2',
    username: 'speed_demon',
    avatar: 'SD',
    lastMessage: 'See you at the meet',
    timestamp: '1d ago',
    unread: false,
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hey! Love your recent post',
    sender: 'them',
    timestamp: '2:30 PM',
  },
  {
    id: '2',
    content: 'Thanks! Appreciate it',
    sender: 'me',
    timestamp: '2:32 PM',
  },
  {
    id: '3',
    content: 'That M3 is incredible!',
    sender: 'them',
    timestamp: '2:35 PM',
  },
];

export function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<string>(mockConversations[0].id);
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const selectedConv = mockConversations.find(c => c.id === selectedConversation);

  return (
    <div className="h-[calc(100vh-120px)] max-w-7xl mx-auto px-6 py-12">
      <h2 className="mb-6">Messages</h2>

      <div className="flex gap-6 h-[calc(100%-80px)]">
        {/* Conversations List */}
        <div className="w-80 bg-[#0F172A] border border-white/[0.07] rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/[0.07]">
            <h4>Conversations</h4>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`w-full p-4 flex gap-3 items-start hover:bg-white/5 transition-colors border-b border-white/[0.07] ${
                  selectedConversation === conv.id ? 'bg-white/5' : ''
                }`}
              >
                <div className="w-12 h-12 bg-[#A3E635] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-semibold">{conv.avatar}</span>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium truncate">@{conv.username}</div>
                    <div className="text-xs text-[#6B7280] flex-shrink-0">{conv.timestamp}</div>
                  </div>
                  <div className={`text-sm truncate ${conv.unread ? 'text-white font-medium' : 'text-[#6B7280]'}`}>
                    {conv.lastMessage}
                  </div>
                </div>
                {conv.unread && (
                  <div className="w-2 h-2 bg-[#A3E635] rounded-full flex-shrink-0 mt-2" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 bg-[#0F172A] border border-white/[0.07] rounded-xl flex flex-col">
          {selectedConv ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-white/[0.07] flex items-center gap-3">
                <div className="w-10 h-10 bg-[#A3E635] rounded-full flex items-center justify-center">
                  <span className="text-black font-semibold text-sm">{selectedConv.avatar}</span>
                </div>
                <div className="font-medium">@{selectedConv.username}</div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${message.sender === 'me' ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          message.sender === 'me'
                            ? 'bg-[#A3E635] text-black'
                            : 'bg-[#0B1120] border border-white/[0.07]'
                        }`}
                      >
                        {message.content}
                      </div>
                      <div className="text-xs text-[#6B7280] mt-1 px-4">{message.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/[0.07]">
                <div className="flex gap-2">
                  <Input
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="bg-[#0B1120] border-white/10 text-white placeholder:text-white/40"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-[#A3E635] text-black hover:bg-[#A3E635]/90"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-[#6B7280] mb-2">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

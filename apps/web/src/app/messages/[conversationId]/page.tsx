'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Send } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { mockStore } from '@/lib/mockStore';

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
}

export default function ConversationPage() {
  const params = useParams();
  const conversationId = params.conversationId as string;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherName, setOtherName] = useState('');
  const [otherPhoto, setOtherPhoto] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated || !conversationId) return;

    const conv = mockStore.getConversationById(conversationId);
    if (!conv) {
      router.push('/messages');
      return;
    }

    const otherId = conv.participants.find((p) => p !== 'demo-user' && p !== user?.id) || '';
    const profile = mockStore.getProfileById(otherId);
    setOtherName(profile?.displayName || 'Unknown');
    setOtherPhoto(profile?.photos?.[0] || '');

    const msgs = mockStore.getMessagesByConversationId(conversationId);
    setMessages(
      msgs.map((m) => ({
        id: m.id,
        senderId: m.senderId,
        content: m.content,
        createdAt: new Date(m.createdAt),
        isRead: m.isRead,
      }))
    );

    // Mark messages as read
    api.messages.markRead(conversationId).catch(() => {});

    setIsLoading(false);
  }, [isAuthenticated, conversationId, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Poll for new messages (auto-replies)
  useEffect(() => {
    if (!isAuthenticated || !conversationId) return;
    const interval = setInterval(() => {
      const msgs = mockStore.getMessagesByConversationId(conversationId);
      if (msgs.length !== messages.length) {
        setMessages(
          msgs.map((m) => ({
            id: m.id,
            senderId: m.senderId,
            content: m.content,
            createdAt: new Date(m.createdAt),
            isRead: m.isRead,
          }))
        );
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isAuthenticated, conversationId, messages.length]);

  const isCurrentUser = (senderId: string) => {
    return senderId === 'demo-user' || senderId === user?.id;
  };

  const handleSend = async () => {
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    const text = newMessage.trim();
    setNewMessage('');

    try {
      const sent = await api.messages.send(conversationId, text);
      setMessages((prev) => [
        ...prev,
        {
          id: sent.id,
          senderId: sent.senderId,
          content: sent.content,
          createdAt: new Date(sent.createdAt),
          isRead: false,
        },
      ]);
    } catch {
      setNewMessage(text);
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <button onClick={() => router.push('/messages')} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          {otherPhoto && (
            <img src={otherPhoto} alt={otherName} className="w-9 h-9 rounded-full object-cover" />
          )}
          <div className="flex-1">
            <h1 className="text-base font-semibold">{otherName}</h1>
            <p className="text-xs text-gray-400">Online</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 max-w-md mx-auto w-full">
        {messages.map((msg) => {
          const mine = isCurrentUser(msg.senderId);
          return (
            <div key={msg.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                  mine
                    ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-br-md'
                    : 'bg-white/10 text-white rounded-bl-md'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <p className={`text-[10px] mt-1 ${mine ? 'text-white/60' : 'text-gray-500'}`}>
                  {formatTime(msg.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-white/10 bg-black/80 backdrop-blur-sm px-4 py-3">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim() || isSending}
            className="p-3 bg-gradient-to-r from-rose-500 to-pink-600 disabled:opacity-40 rounded-xl transition-opacity"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

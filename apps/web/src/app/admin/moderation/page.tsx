'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Shield, CheckCircle, XCircle, Ban, AlertTriangle, Clock } from 'lucide-react';
import { mockStore } from '@/lib/mockStore';

interface ModerationReport {
  id: string;
  reporterId: string;
  reportedUserId: string;
  reason: string;
  details?: string;
  status: string;
  createdAt: Date;
}

const SEED_REPORTS: ModerationReport[] = [
  {
    id: 'report-1',
    reporterId: 'user-demo',
    reportedUserId: 'user-lucas',
    reason: 'Inappropriate content',
    details: 'User posted explicit photos in their profile.',
    status: 'pending',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 'report-2',
    reporterId: 'user-emma',
    reportedUserId: 'user-william',
    reason: 'Harassment',
    details: 'Sending repeated unwanted messages after being asked to stop.',
    status: 'pending',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: 'report-3',
    reporterId: 'user-sarah',
    reportedUserId: 'user-ethan',
    reason: 'Fake profile',
    details: 'Using photos of a celebrity. Refuses to video chat.',
    status: 'pending',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

const VERIFICATION_QUEUE = [
  { id: 'ver-1', userId: 'user-mia', displayName: 'Mia', submittedAt: new Date(Date.now() - 1 * 60 * 60 * 1000) },
  { id: 'ver-2', userId: 'user-sophia', displayName: 'Sophia', submittedAt: new Date(Date.now() - 3 * 60 * 60 * 1000) },
];

function timeAgo(date: Date): string {
  const hours = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60));
  if (hours < 1) return 'Just now';
  if (hours === 1) return '1 hour ago';
  if (hours < 24) return `${hours} hours ago`;
  return `${Math.floor(hours / 24)} days ago`;
}

export default function ModerationPage() {
  const router = useRouter();
  const [reports, setReports] = useState<ModerationReport[]>([]);
  const [verifications, setVerifications] = useState(VERIFICATION_QUEUE);
  const [tab, setTab] = useState<'reports' | 'verification'>('reports');

  useEffect(() => {
    const stored = mockStore.getReports();
    setReports(stored.length > 0 ? (stored as ModerationReport[]) : SEED_REPORTS);
  }, []);

  const handleReportAction = (reportId: string, action: 'approved' | 'rejected' | 'banned') => {
    setReports(prev =>
      prev.map(r => (r.id === reportId ? { ...r, status: action } : r))
    );
  };

  const handleVerificationAction = (verId: string, action: 'approved' | 'rejected') => {
    setVerifications(prev => prev.filter(v => v.id !== verId));
  };

  const pendingReports = reports.filter(r => r.status === 'pending');
  const resolvedReports = reports.filter(r => r.status !== 'pending');

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Moderation</h1>
          <div className="w-5" />
        </div>
      </header>

      <div className="pt-20 pb-8 px-4 max-w-2xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
            <p className="text-2xl font-bold text-amber-400">{pendingReports.length}</p>
            <p className="text-xs text-gray-400">Pending</p>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
            <p className="text-2xl font-bold text-green-400">{resolvedReports.length}</p>
            <p className="text-xs text-gray-400">Resolved</p>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
            <p className="text-2xl font-bold text-blue-400">{verifications.length}</p>
            <p className="text-xs text-gray-400">Verifications</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab('reports')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              tab === 'reports'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-white/5 text-gray-400 border border-white/10'
            }`}
          >
            Reports ({pendingReports.length})
          </button>
          <button
            onClick={() => setTab('verification')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              tab === 'verification'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-white/5 text-gray-400 border border-white/10'
            }`}
          >
            Verification ({verifications.length})
          </button>
        </div>

        {/* Reports Tab */}
        {tab === 'reports' && (
          <div className="space-y-3">
            {pendingReports.length === 0 && (
              <div className="text-center py-12">
                <Shield className="w-10 h-10 text-green-400 mx-auto mb-3" />
                <p className="text-gray-400">All clear! No pending reports.</p>
              </div>
            )}
            {pendingReports.map((report) => {
              const profile = mockStore.getProfileById(report.reportedUserId);
              return (
                <div key={report.id} className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        <span className="font-medium text-white">{report.reason}</span>
                      </div>
                      <p className="text-sm text-gray-400">
                        Reported user: <span className="text-white">{profile?.displayName || report.reportedUserId}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {timeAgo(report.createdAt)}
                    </div>
                  </div>
                  {report.details && (
                    <p className="text-sm text-gray-300 mb-4 p-3 rounded-lg bg-white/5">{report.details}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReportAction(report.id, 'approved')}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-sm rounded-lg transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReportAction(report.id, 'rejected')}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/10 hover:bg-white/20 text-gray-300 text-sm rounded-lg transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                    <button
                      onClick={() => handleReportAction(report.id, 'banned')}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm rounded-lg transition-colors"
                    >
                      <Ban className="w-4 h-4" />
                      Ban
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Verification Tab */}
        {tab === 'verification' && (
          <div className="space-y-3">
            {verifications.length === 0 && (
              <div className="text-center py-12">
                <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
                <p className="text-gray-400">No pending verifications.</p>
              </div>
            )}
            {verifications.map((ver) => (
              <div key={ver.id} className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-white">{ver.displayName}</p>
                    <p className="text-xs text-gray-500">{timeAgo(ver.submittedAt)}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400">
                    Pending Review
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleVerificationAction(ver.id, 'approved')}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-sm rounded-lg transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleVerificationAction(ver.id, 'rejected')}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm rounded-lg transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

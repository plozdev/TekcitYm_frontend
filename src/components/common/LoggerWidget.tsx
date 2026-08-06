import React, { useState, useEffect } from 'react';
import { logger, type LogEntry, type LogLevel } from '../../utils/logger';


export const LoggerWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filterLevel, setFilterLevel] = useState<LogLevel | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    setLogs(logger.getLogs());
    const unsubscribe = logger.subscribe(() => {
      setLogs(logger.getLogs());
    });
    return unsubscribe;
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesLevel = filterLevel === 'ALL' || log.level === filterLevel;
    const matchesSearch =
      searchQuery === '' ||
      log.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.data && JSON.stringify(log.data).toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  const getLevelBadgeClass = (level: LogLevel) => {
    switch (level) {
      case 'ERROR':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'WARN':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'INFO':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'DEBUG':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 flex items-center gap-2 px-3 py-2 text-xs font-mono font-medium rounded-full bg-slate-900/80 backdrop-blur-md text-slate-200 border border-slate-700/60 shadow-lg hover:bg-slate-800 transition-all hover:scale-105"
        title="Open FE Activity & Debug Logs"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
        </span>
        <span>Logs</span>
        <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
          {logs.length}
        </span>
      </button>

      {/* Log Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="flex flex-col w-full max-w-4xl h-[85vh] bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">Frontend Activity Logs</h3>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Persistent client log recorder & file exporter
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => logger.downloadLogs()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 font-sans text-xs font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export .log File
                </button>

                <button
                  onClick={() => logger.clearLogs()}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-sans text-xs font-medium transition-colors"
                >
                  Clear Logs
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Filter Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b border-slate-800 bg-slate-900/40">
              <div className="flex items-center gap-1.5">
                {(['ALL', 'INFO', 'WARN', 'ERROR', 'DEBUG'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setFilterLevel(lvl)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                      filterLevel === lvl
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              <div className="relative flex-1 max-w-xs">
                <input
                  type="text"
                  placeholder="Filter logs by keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500/50"
                />
              </div>
            </div>

            {/* Log List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filteredLogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 text-center font-sans">
                  <p className="text-sm">No log entries found.</p>
                  <p className="text-xs text-slate-600 mt-1">
                    Logs will automatically appear here as you interact with the app.
                  </p>
                </div>
              ) : (
                filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/80 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] text-slate-500">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>

                        <span
                          className={`px-1.5 py-0.5 text-[10px] rounded border font-semibold ${getLevelBadgeClass(
                            log.level
                          )}`}
                        >
                          {log.level}
                        </span>

                        <span className="px-1.5 py-0.5 text-[10px] rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-medium">
                          {log.module}
                        </span>

                        <span className="text-slate-200 font-medium break-all">
                          {log.message}
                        </span>
                      </div>

                      {log.data !== undefined && (
                        <button
                          onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
                          className="text-[10px] text-cyan-400 hover:underline flex-shrink-0 font-sans"
                        >
                          {expandedId === log.id ? 'Collapse Data' : 'View Data'}
                        </button>
                      )}
                    </div>

                    {/* Expandable JSON Data */}
                    {expandedId === log.id && log.data !== undefined && (
                      <div className="mt-2.5 p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-emerald-400 overflow-x-auto">
                        <pre>{JSON.stringify(log.data, null, 2)}</pre>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Footer Status Bar */}
            <div className="flex items-center justify-between px-6 py-2 border-t border-slate-800 bg-slate-950/80 text-[11px] text-slate-500 font-sans">
              <span>Showing {filteredLogs.length} of {logs.length} stored logs</span>
              <span>Hint: Run <code className="text-cyan-400 font-mono">__downloadLogs()</code> in DevTools Console to export anytime</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

import { useMemo, useState } from 'react';
import {
  DoorOpen,
  Clock,
  CheckCircle2,
  XCircle,
  CalendarClock,
  Users,
  Lock,
  MapPin,
} from 'lucide-react';
import type { Booking, Room, Verdict } from './types';
import { ROOMS, INITIAL_BOOKINGS } from './sampleData';
import { evaluateAvailability, fmt, MINUTES_PER_DAY_EXPORT } from './availability';

const toMinutes = (hhmm: string): number => {
  if (!/^\d{1,2}:\d{2}$/.test(hhmm)) return NaN;
  const [h, m] = hhmm.split(':').map(Number);
  if (h < 0 || h > 23 || m < 0 || m > 59) return NaN;
  return h * 60 + m;
};

function App() {
  const [bookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [roomId, setRoomId] = useState<string>('');
  const [startStr, setStartStr] = useState<string>('');
  const [endStr, setEndStr] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<number>(9 * 60); // 09:00

  const room: Room | null = useMemo(
    () => ROOMS.find((r) => r.id === roomId) ?? null,
    [roomId]
  );

  const start = startStr ? toMinutes(startStr) : NaN;
  const end = endStr ? toMinutes(endStr) : NaN;

  const hasInput = Boolean(roomId && startStr && endStr);
  const result = hasInput
    ? evaluateAvailability(room, start, end, currentTime, bookings)
    : null;
  const verdict: Verdict = !result ? 'idle' : result.ok ? 'available' : 'unavailable';

  const roomBookings = useMemo(
    () =>
      room
        ? bookings
            .filter((b) => b.room === room.name)
            .sort((a, b) => a.start - b.start)
        : [],
    [bookings, room]
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-600 p-2.5 text-white shadow-sm">
            <DoorOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Smart Campus Room Availability
            </h1>
            <p className="text-sm text-slate-500">
              Check whether a room is free for your time slot before you book.
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Form */}
          <section className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <CalendarClock className="h-5 w-5 text-emerald-600" />
              Booking Request
            </h2>

            <label className="mb-1 block text-sm font-medium text-slate-700">
              Room
            </label>
            <select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="mb-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            >
              <option value="">Select a room…</option>
              {ROOMS.map((r) => (
                <option key={r.id} value={r.id} disabled={r.blocked}>
                  {r.name} — {r.building} (cap. {r.capacity})
                  {r.blocked ? ' [blocked]' : ''}
                </option>
              ))}
            </select>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Start time
                </label>
                <input
                  type="time"
                  value={startStr}
                  onChange={(e) => setStartStr(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  End time
                </label>
                <input
                  type="time"
                  value={endStr}
                  onChange={(e) => setEndStr(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Current time (sim)
                </label>
                <input
                  type="time"
                  value={fmt(currentTime)}
                  onChange={(e) => setCurrentTime(toMinutes(e.target.value) || currentTime)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Max booking length is 120 minutes. Touching endpoints are allowed
              (e.g. 10:00–11:00 and 11:00–12:00 do not overlap).
            </p>

            {/* Verdict */}
            <div className="mt-6">
              {verdict === 'idle' && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-500">
                  Pick a room and a start/end time to see the availability result.
                </div>
              )}
              {verdict === 'available' && (
                <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                  <div>
                    <p className="font-semibold text-emerald-800">Available</p>
                    <p className="text-sm text-emerald-700">
                      {room?.name} is free from {fmt(start)} to {fmt(end)}.
                    </p>
                  </div>
                </div>
              )}
              {verdict === 'unavailable' && (
                <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-4">
                  <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600" />
                  <div>
                    <p className="font-semibold text-rose-800">Unavailable</p>
                    <p className="text-sm text-rose-700">{result?.reason}</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Room detail + existing bookings */}
          <section className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <MapPin className="h-5 w-5 text-emerald-600" />
              Room Details
            </h2>

            {!room ? (
              <p className="text-sm text-slate-500">
                Select a room to view its details and current bookings.
              </p>
            ) : (
              <>
                <div className="mb-4 space-y-1.5 text-sm">
                  <p className="text-base font-semibold text-slate-900">{room.name}</p>
                  <p className="flex items-center gap-1.5 text-slate-600">
                    <MapPin className="h-4 w-4" /> {room.building}
                  </p>
                  <p className="flex items-center gap-1.5 text-slate-600">
                    <Users className="h-4 w-4" /> Capacity: {room.capacity}
                  </p>
                  <p className="flex items-center gap-1.5">
                    {room.blocked ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-700">
                        <Lock className="h-3.5 w-3.5" /> Blocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Open
                      </span>
                    )}
                  </p>
                </div>

                <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                  <Clock className="h-4 w-4" /> Existing bookings today
                </h3>
                {roomBookings.length === 0 ? (
                  <p className="text-sm text-slate-500">No bookings yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {roomBookings.map((b) => (
                      <li
                        key={b.id}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                      >
                        <div className="font-medium text-slate-800">
                          {fmt(b.start)} – {fmt(b.end)}
                        </div>
                        <div className="text-xs text-slate-500">{b.bookedBy}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </section>
        </div>

        <footer className="mt-8 text-center text-xs text-slate-400">
          Day window: 00:00–24:00 ({MINUTES_PER_DAY_EXPORT} min). Sample data only.
        </footer>
      </div>
    </div>
  );
}

export default App;

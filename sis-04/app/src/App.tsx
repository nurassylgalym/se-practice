import { useEffect, useMemo, useState } from 'react';
import { DoorOpen, Clock, CheckCircle2, XCircle, CalendarClock, Users, Lock, SlidersHorizontal, SearchX } from 'lucide-react';
import { ROOMS } from './rooms';
import { filterRooms } from './filter';
import { checkRoom, MAX_MINUTES } from './booking';
import { toMinutes, fmt } from './time';

const EQUIPMENT = [...new Set(ROOMS.flatMap((r) => r.equipment))];
const card = 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6';
const field = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200';
const label = 'mb-1 block text-sm font-medium text-slate-700';
const title = 'mb-4 flex items-center gap-2 text-lg font-semibold';

export default function App() {
  const [attendees, setAttendees] = useState(1);
  const [wanted, setWanted] = useState<string[]>([]);
  const [roomId, setRoomId] = useState('');
  const [startStr, setStartStr] = useState('');
  const [endStr, setEndStr] = useState('');
  const [now, setNow] = useState(9 * 60);

  const matches = useMemo(() => filterRooms(ROOMS, { attendees, equipment: wanted }), [attendees, wanted]);
  const room = matches.find((r) => r.id === roomId) ?? null;
  // F5: a room that drops out of the filtered list is no longer selected
  useEffect(() => { if (roomId && !room) setRoomId(''); }, [roomId, room]);

  const start = toMinutes(startStr);
  const end = toMinutes(endStr);
  const verdict = !room || !startStr || !endStr ? 'idle'
    : checkRoom(ROOMS, room.id, { start, end, now }) ? 'available' : 'unavailable';
  const toggle = (e: string) => setWanted((w) => (w.includes(e) ? w.filter((x) => x !== e) : [...w, e]));
  const setClock = (v: string) => { const m = toMinutes(v); if (!Number.isNaN(m)) setNow(m); }; // 00:00 = 0 is valid

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <header className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-600 p-2.5 text-white shadow-sm"><DoorOpen className="h-6 w-6" /></div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Smart Campus Room Availability</h1>
            <p className="text-sm text-slate-500">Find a room that fits your group, then check your time slot.</p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <section className={card}>
              <h2 className={title}><SlidersHorizontal className="h-5 w-5 text-emerald-600" /> Requirements</h2>
              <label className={label}>Attendees</label>
              <input type="number" min={1} value={attendees} className={`${field} mb-4`}
                onChange={(e) => setAttendees(Math.max(1, Number(e.target.value) || 1))} />
              <span className={label}>Equipment (all selected items required)</span>
              <div className="flex flex-wrap gap-2">
                {EQUIPMENT.map((e) => (
                  <label key={e} className={`cursor-pointer rounded-full border px-3 py-1 text-sm ${wanted.includes(e) ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-slate-300 text-slate-600'}`}>
                    <input type="checkbox" className="mr-1.5 accent-emerald-600" checked={wanted.includes(e)} onChange={() => toggle(e)} />{e}
                  </label>
                ))}
              </div>
            </section>

            <section className={card}>
              <h2 className={title}><Users className="h-5 w-5 text-emerald-600" /> Matching rooms ({matches.length})</h2>
              {matches.length === 0 ? (
                <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-800">
                  <SearchX className="mt-0.5 h-5 w-5 flex-shrink-0" />
                  <p><span className="font-semibold">No rooms match.</span> No room fits {attendees} people
                    {wanted.length ? ` with ${wanted.join(' + ')}` : ''}. Lower the attendees or untick some equipment.</p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {matches.map((r) => (
                    <li key={r.id}>
                      <button onClick={() => setRoomId(r.id)}
                        className={`w-full rounded-xl border px-4 py-3 text-left text-sm ${r.id === roomId ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-slate-200 hover:bg-slate-50'}`}>
                        <span className="flex items-center justify-between gap-2">
                          <span className="font-semibold">{r.name}</span>
                          {r.blocked && <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700"><Lock className="h-3 w-3" /> Blocked</span>}
                        </span>
                        <span className="text-slate-500">{r.capacity} seats · {r.equipment.join(', ')}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          <section className={card}>
            <h2 className={title}><CalendarClock className="h-5 w-5 text-emerald-600" /> Booking request</h2>
            <p className="mb-4 text-sm">
              {room ? <>Room: <span className="font-semibold">{room.name}</span></> : <span className="text-slate-500">Select a room from the list.</span>}
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div><label className={label}>Start time</label><input type="time" value={startStr} onChange={(e) => setStartStr(e.target.value)} className={field} /></div>
              <div><label className={label}>End time</label><input type="time" value={endStr} onChange={(e) => setEndStr(e.target.value)} className={field} /></div>
              <div><label className={label}>Current time (sim)</label><input type="time" value={fmt(now)} onChange={(e) => setClock(e.target.value)} className={field} /></div>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Max booking length is {MAX_MINUTES} minutes. Touching endpoints are allowed (10:00–11:00 and 11:00–12:00 do not overlap).
            </p>

            <div className="mt-6">
              {verdict === 'idle' && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-500">Pick a room and a start/end time to see the result.</div>
              )}
              {verdict === 'available' && room && (
                <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                  <div><p className="font-semibold text-emerald-800">Available</p>
                    <p className="text-sm text-emerald-700">{room.name} is free from {fmt(start)} to {fmt(end)}.</p></div>
                </div>
              )}
              {verdict === 'unavailable' && room && (
                <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-4">
                  <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600" />
                  <div><p className="font-semibold text-rose-800">Unavailable</p>
                    <p className="text-sm text-rose-700">
                      {room.blocked ? `${room.name} is blocked and cannot be booked.`
                        : `Check that the slot starts after ${fmt(now)}, ends after it starts, is at most ${MAX_MINUTES} minutes and does not overlap a booking below.`}
                    </p></div>
                </div>
              )}
            </div>

            {room && (
              <div className="mt-6">
                <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-700"><Clock className="h-4 w-4" /> {room.name} bookings today</h3>
                {room.bookings.length === 0 ? <p className="text-sm text-slate-500">No bookings yet.</p> : (
                  <ul className="space-y-2">
                    {room.bookings.map((b) => (
                      <li key={b.start} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800">{fmt(b.start)} – {fmt(b.end)}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </section>
        </div>

        <footer className="mt-8 text-center text-xs text-slate-400">Fictional sample data only.</footer>
      </div>
    </div>
  );
}
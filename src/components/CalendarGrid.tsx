import { useAppContext } from '../context/AppContext';
import { generateMonthGrid, DAY_HEADERS, MONTH_NAMES } from '../utils/calendar';

export default function CalendarGrid() {
  const { state, dispatch } = useAppContext();
  const { year, month } = state;
  const weeks = generateMonthGrid(year, month);

  const prevMonth = () => {
    if (month === 0) dispatch({ type: 'SET_MONTH', year: year - 1, month: 11 });
    else dispatch({ type: 'SET_MONTH', year, month: month - 1 });
  };

  const nextMonth = () => {
    if (month === 11) dispatch({ type: 'SET_MONTH', year: year + 1, month: 0 });
    else dispatch({ type: 'SET_MONTH', year, month: month + 1 });
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        className="pointer-events-auto rounded-sm p-8"
        style={{
          backgroundColor: 'rgba(245, 240, 232, 0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--color-border)',
          width: 680,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="text-lg px-2 cursor-pointer transition-opacity duration-300 ease-out hover:opacity-60"
            style={{ color: 'var(--color-muted)' }}
          >
            &lsaquo;
          </button>
          <div className="text-center">
            <span
              className="font-serif-en text-sm"
              style={{ color: 'var(--color-muted)' }}
            >
              {year}
            </span>
            <h2
              className="font-serif-display text-xl font-medium -mt-0.5"
              style={{ color: 'var(--color-accent)' }}
            >
              {MONTH_NAMES[month]}
            </h2>
          </div>
          <button
            onClick={nextMonth}
            className="text-lg px-2 cursor-pointer transition-opacity duration-300 ease-out hover:opacity-60"
            style={{ color: 'var(--color-muted)' }}
          >
            &rsaquo;
          </button>
        </div>

        {/* Day headers */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 8,
            marginBottom: 8,
          }}
        >
          {DAY_HEADERS.map((d, i) => (
            <div
              key={i}
              className="text-center font-medium text-sm"
              style={{ color: 'var(--color-muted)', padding: '4px 0' }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Date cells */}
        {weeks.map((week, wi) => (
          <div
            key={wi}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 8,
              marginBottom: 8,
            }}
          >
            {week.map((cell, di) => (
              <div
                key={di}
                className="font-serif-en flex pt-1 items-top justify-center rounded-sm text-lg font-medium"
                style={{
                  aspectRatio: '1 / 1',
                  minHeight: 56,
                  backgroundColor: cell.day !== null
                    ? (cell.isToday ? 'var(--color-accent)' : 'var(--color-surface)')
                    : 'transparent',
                  color: cell.day !== null
                    ? (cell.isToday ? '#F5F0E8' : 'var(--color-text)')
                    : 'transparent',
                }}
              >
                {cell.day ?? ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

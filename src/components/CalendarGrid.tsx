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
        className="pointer-events-auto rounded-lg p-8"
        style={{
          backgroundColor: 'rgba(250, 250, 248, 0.92)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
          width: 680,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={prevMonth}
            className="text-lg px-2 cursor-pointer"
            style={{ color: '#7E8C82' }}
          >
            &lsaquo;
          </button>
          <div className="text-center">
            <span className="text-sm" style={{ color: '#7E8C82' }}>{year}</span>
            <h2 className="text-xl font-semibold -mt-0.5" style={{ color: '#26332A', fontFamily: 'var(--font-display)' }}>
              {MONTH_NAMES[month]}
            </h2>
          </div>
          <button
            onClick={nextMonth}
            className="text-lg px-2 cursor-pointer"
            style={{ color: '#7E8C82' }}
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
              style={{ color: '#7E8C82', padding: '4px 0' }}
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
                className="flex pt-1 items-top justify-center rounded-md text-lg font-medium"
                style={{
                  aspectRatio: '1 / 1',
                  minHeight: 56,
                  backgroundColor: cell.day !== null
                    ? (cell.isToday ? '#0F4C81' : 'rgba(38, 51, 42, 0.06)')
                    : 'transparent',
                  color: cell.day !== null
                    ? (cell.isToday ? '#FAFAF8' : '#26332A')
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

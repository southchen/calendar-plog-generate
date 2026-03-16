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
        className="bg-white/85 backdrop-blur-md rounded-2xl shadow-lg p-5 pointer-events-auto"
        style={{ minWidth: 340 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="text-gray-500 hover:text-gray-800 text-lg px-2 cursor-pointer"
          >
            &lsaquo;
          </button>
          <div className="text-center">
            <span className="text-sm text-gray-400">{year}</span>
            <h2 className="text-xl font-semibold text-gray-800 -mt-0.5">
              {MONTH_NAMES[month]}
            </h2>
          </div>
          <button
            onClick={nextMonth}
            className="text-gray-500 hover:text-gray-800 text-lg px-2 cursor-pointer"
          >
            &rsaquo;
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAY_HEADERS.map((d, i) => (
            <div
              key={d}
              className={`text-xs font-medium text-center py-1 ${
                i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-gray-400'
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Date cells */}
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1">
            {week.map((cell, di) => (
              <div
                key={di}
                className={`text-sm text-center py-1.5 rounded-lg ${
                  cell.day === null
                    ? ''
                    : cell.isToday
                      ? 'bg-gray-800 text-white font-bold'
                      : di === 0
                        ? 'text-red-500'
                        : di === 6
                          ? 'text-blue-500'
                          : 'text-gray-700'
                }`}
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

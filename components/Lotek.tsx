// @ts-nocheck
// Lotek: maskotka-szybowiec (wspólna dla aplikacji i strony głównej)
export function LotekFigure({ mood, action, talking }) {
  const happy = mood === 'happy' || mood === 'celebrate';
  const sleepy = mood === 'sleepy';
  const worried = mood === 'worried';
  const thinking = mood === 'thinking';
  const yawning = action === 'yawn';
  const crossed = action === 'legs' || sleepy;
  const look = action === 'look' ? 2.5 : 0;

  // Usta zależnie od emocji
  let mouth = <path d="M52 64 Q58 68 64 64" stroke="#1E293B" strokeWidth="2.2" fill="none" strokeLinecap="round" />;
  if (happy) mouth = <path d="M50 62 Q58 72 66 62 Z" fill="#991B1B" stroke="#1E293B" strokeWidth="1.8" strokeLinejoin="round" />;
  if (worried) mouth = <path d="M52 67 Q58 62 64 67" stroke="#1E293B" strokeWidth="2.2" fill="none" strokeLinecap="round" />;
  if (thinking) mouth = <path d="M53 66 L62 64" stroke="#1E293B" strokeWidth="2.2" fill="none" strokeLinecap="round" />;
  if (sleepy) mouth = <ellipse cx="58" cy="66" rx="2.2" ry="1.6" fill="#1E293B" />;
  if (talking && !sleepy) mouth = <ellipse className="bbd-mouth-talk" cx="58" cy="65" rx="4.5" ry="3.6" fill="#991B1B" stroke="#1E293B" strokeWidth="1.6" />;
  if (yawning) mouth = <ellipse className="bbd-mouth-yawn" cx="58" cy="66" rx="5" ry="5.5" fill="#7F1D1D" stroke="#1E293B" strokeWidth="1.6" />;

  const eyes = sleepy || yawning ? (
    <>
      <path d="M44 52 Q48 55 52 52" stroke="#1E293B" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M62 50 Q66 53 70 50" stroke="#1E293B" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </>
  ) : happy ? (
    <>
      <path d="M44 53 Q48 48 52 53" stroke="#1E293B" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M62 51 Q66 46 70 51" stroke="#1E293B" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </>
  ) : (
    <g className="bbd-blink">
      <ellipse cx="48" cy="52" rx="4.2" ry="5" fill="#fff" stroke="#1E293B" strokeWidth="1.6" />
      <ellipse cx="66" cy="50" rx="4.2" ry="5" fill="#fff" stroke="#1E293B" strokeWidth="1.6" />
      <circle cx={48.5 + look + (thinking ? 1.5 : 0)} cy={thinking ? 50.5 : 53} r="2.2" fill="#1E293B" />
      <circle cx={66.5 + look + (thinking ? 1.5 : 0)} cy={thinking ? 48.5 : 51} r="2.2" fill="#1E293B" />
    </g>
  );

  const brows = worried ? (
    <>
      <path d="M43 44 L52 46" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M71 41 L62 44" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ) : thinking ? (
    <>
      <path d="M43 45 Q48 42 52 44" stroke="#1E293B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M62 39 Q66 36 71 39" stroke="#1E293B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </>
  ) : null;

  return (
    <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible" aria-hidden="true">
      {/* jasne tło, żeby Lotek był czytelny nad tabelami */}
      <circle cx="60" cy="62" r="54" fill="#FFFFFF" opacity="0.92" stroke="#E2E8F0" strokeWidth="1" />
      {/* cień na ziemi */}
      <ellipse cx="60" cy="108" rx="24" ry="3.5" fill="#0F172A" opacity="0.12" />
      {/* orbita z logo z karmazynowym punktem */}
      <path d="M14 86 C30 104 82 104 108 70" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" fill="none" strokeLinecap="round" />
      <g className="bbd-orbit">
        <circle cx="60" cy="9" r="3.2" fill="#991B1B" />
      </g>

      <g className="bbd-float">
        {/* nogi: zwykle albo noga na nogę */}
        {crossed ? (
          <g stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" fill="none">
            <path d="M54 84 L56 100" />
            <path d="M62 84 Q60 94 50 96" />
            <ellipse cx="57" cy="101.5" rx="4" ry="2" fill="#1E293B" />
            <ellipse cx="47.5" cy="96" rx="3.6" ry="1.8" fill="#1E293B" />
          </g>
        ) : (
          <g stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" fill="none">
            <path d="M53 84 L50 100" />
            <path d="M63 84 L66 100" />
            <ellipse cx="48.5" cy="101.5" rx="4" ry="2" fill="#1E293B" />
            <ellipse cx="67.5" cy="101.5" rx="4" ry="2" fill="#1E293B" />
          </g>
        )}

        {/* ogon w kształcie T (za kadłubem) */}
        <path d="M58 34 L60 14 L64 14 L64 34 Z" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />
        <path d="M44 14 L80 14" stroke="#1E293B" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M44 14 L49 14 M75 14 L80 14" stroke="#991B1B" strokeWidth="3.2" strokeLinecap="round" />
        {/* lewe długie skrzydło szybowca */}
        <path d="M42 60 L-2 50 L-2 54 L42 66 Z" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />
        <path d="M-2 50 L-2 54" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" />
        {/* kadłub-kropla */}
        <ellipse cx="60" cy="60" rx="19" ry="24" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2.4" />
        {/* przezroczysta owiewka kabiny */}
        <path d="M43 52 C43 36 77 34 77 50 C77 58 43 60 43 52 Z" fill="#BFDBFE" stroke="#1E293B" strokeWidth="2" />
        <path d="M48 44 L53 41" stroke="#fff" strokeWidth="2" strokeLinecap="round" />

        <g transform="translate(2 0)">
          {brows}
          {eyes}
        </g>
        <g transform="translate(2 2)">
          {(happy || mood === 'calm') && (
            <>
              <ellipse cx="40" cy="60" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.75" />
              <ellipse cx="76" cy="58" rx="3.5" ry="2" fill="#FCA5A5" opacity="0.75" />
            </>
          )}
          {mouth}
        </g>
        <path d="M46 76 Q60 82 74 76" stroke="#991B1B" strokeWidth="2.2" fill="none" strokeLinecap="round" />

        {/* prawe długie skrzydło-rączka: drapanie za uchem, machanie */}
        <g className={`bbd-arm ${action === 'scratch' ? 'bbd-arm-scratch' : ''} ${action === 'wave' || mood === 'celebrate' ? 'bbd-arm-wave' : ''}`}>
          <path d="M78 60 L122 50 L122 54 L78 66 Z" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />
          <path d="M122 50 L122 54" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* dodatki emocji */}
        {worried && <path d="M78 36 Q81 42 78 44 Q75 42 78 36 Z" fill="#7DD3FC" stroke="#0369A1" strokeWidth="1" />}
        {thinking && <text x="80" y="32" fontSize="16" fontWeight="700" fill="#64748B">?</text>}
        {sleepy && (
          <g fill="#64748B" fontWeight="700">
            <text className="bbd-zzz" x="78" y="34" fontSize="11">z</text>
            <text className="bbd-zzz" x="84" y="28" fontSize="14" style={{ animationDelay: '0.9s' }}>Z</text>
          </g>
        )}
        {mood === 'celebrate' && (
          <g fill="#F59E0B">
            <path className="bbd-spark" d="M20 30 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z" />
            <path className="bbd-spark" style={{ animationDelay: '0.4s' }} d="M100 44 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 z" />
            <path className="bbd-spark" style={{ animationDelay: '0.8s' }} d="M36 18 l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2 -3 -3 -1.2 3 -1.2 z" />
          </g>
        )}
      </g>
    </svg>
  );
}

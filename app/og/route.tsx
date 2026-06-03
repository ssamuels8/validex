import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0A0B0A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Green radial glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '700px',
            height: '700px',
            background:
              'radial-gradient(circle, rgba(45,90,66,0.25) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        {/* Wordmark */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '80px',
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'serif',
            fontSize: '18px',
            fontWeight: 500,
            color: '#ECE7DD',
            letterSpacing: '0.05em',
          }}
        >
          Validex
          <span style={{ color: '#4FAE7E', marginLeft: '2px' }}>.</span>
        </div>
        {/* Headline */}
        <div
          style={{
            fontFamily: 'serif',
            fontSize: '64px',
            fontWeight: 500,
            color: '#ECE7DD',
            lineHeight: 1.05,
            maxWidth: '900px',
            marginBottom: '32px',
          }}
        >
          The market has $35 trillion in answers.{' '}
          <span style={{ fontStyle: 'italic' }}>None of it is verified.</span>
        </div>
        {/* Sub */}
        <div
          style={{
            fontFamily: 'sans-serif',
            fontSize: '20px',
            fontWeight: 300,
            color: 'rgba(236,231,221,0.55)',
            letterSpacing: '0.02em',
          }}
        >
          Independent measurement infrastructure · Anchored to ESRS
        </div>
        {/* Green lume accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '80px',
            width: '6px',
            height: '60px',
            background: '#4FAE7E',
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

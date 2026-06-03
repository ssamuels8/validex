'use client';

export default function Preloader() {
  return (
    <div id="preloader" aria-hidden="true">
      <div id="preloader-wordmark" className="display">
        Validex<span>.</span>
      </div>
      <div id="preloader-progress-track">
        <div id="preloader-progress-fill" />
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <a href="/" className="footer-logo">
        Validex<span>.</span>
      </a>
      <p className="footer-copy">
        © {new Date().getFullYear()} · The Hague, Netherlands
      </p>
    </footer>
  );
}

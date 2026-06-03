const WORDS = "Capital follows the story. Almost no one checks the ending.".split(" ");

export default function Manifesto() {
  return (
    <section className="manifesto" id="manifesto">
      <p className="manifesto-line">
        {WORDS.map((word, i) => (
          <span key={i} className="manifesto-word">
            {word}&nbsp;
          </span>
        ))}
      </p>
    </section>
  );
}

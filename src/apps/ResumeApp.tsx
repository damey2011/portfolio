const RESUME_URL =
  'https://drive.google.com/file/d/15gVpbi4JDR2NovM-S1zJkxc6n9Ss5CzT/preview';

export default function ResumeApp() {
  return (
    <div className="w-full h-full bg-fg/5">
      <iframe
        src={RESUME_URL}
        title="Résumé"
        className="w-full h-full border-0"
        allow="autoplay"
      />
    </div>
  );
}

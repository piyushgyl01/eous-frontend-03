export default function ErrorToast({ text }) {
  return (
    <div className="alert alert-danger mt-3" role="alert">
      {text}
    </div>
  );
}

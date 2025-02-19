import useMessage from "../customHooks/useMessage";

export default function Notification() {
  const message = useMessage();
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="position-fixed top-0 end-0 p-3"
      style={{ zIndex: 1900 }}
    >
      <div className="toast-container top-0 end-0 p-3">
        {message.show && (
          <div
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto">
                {message.type === "success" ? "Success" : "Warning"}
              </strong>
              <small className="text-body-secondary">just now</small>
            </div>
            <div className="toast-body">{message.message}</div>
          </div>
        )}
      </div>
    </div>
  );
}

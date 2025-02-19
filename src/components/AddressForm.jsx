import AddressFormFields from "./AddressFormFields";

export default function AddressForm({
  formData,
  setFormData,
  showModal = false,
  onClose,
  onSubmit,
  isLoading,
  title = "Edit Address",
  submitText = "Add Address",
  isInline = false,
}) {
  const formContent = (
    <form>
      <AddressFormFields formData={formData} setFormData={setFormData} />
    </form>
  );

  if (isInline) {
    return formContent;
  }

  return (
    <div
      className={`modal fade ${showModal ? "show d-block" : ""}`}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">{formContent}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={onSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : submitText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

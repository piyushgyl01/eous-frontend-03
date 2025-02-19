export default function AddressFormFields({ formData, setFormData }) {
  return (
    <div className="row g-3">
      <div className="col-md-6">
        <label className="form-label">First Name</label>
        <input
          type="text"
          className="form-control"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({
              ...formData,
              firstName: e.target.value,
            })
          }
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Last Name</label>
        <input
          type="text"
          className="form-control"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({
              ...formData,
              lastName: e.target.value,
            })
          }
          required
        />
      </div>
      <div className="col-12">
        <label className="form-label">Street Address</label>
        <input
          type="text"
          className="form-control"
          value={formData.street}
          onChange={(e) =>
            setFormData({
              ...formData,
              street: e.target.value,
            })
          }
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Town</label>
        <input
          type="text"
          className="form-control"
          value={formData.town}
          onChange={(e) =>
            setFormData({
              ...formData,
              town: e.target.value,
            })
          }
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Province</label>
        <input
          type="text"
          className="form-control"
          value={formData.province}
          onChange={(e) =>
            setFormData({
              ...formData,
              province: e.target.value,
            })
          }
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">ZIP Code</label>
        <input
          type="number"
          className="form-control"
          value={formData.zip}
          onChange={(e) =>
            setFormData({
              ...formData,
              zip: parseFloat(e.target.value),
            })
          }
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Country</label>
        <input
          type="text"
          className="form-control"
          value={formData.country}
          onChange={(e) =>
            setFormData({
              ...formData,
              country: e.target.value,
            })
          }
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Phone</label>
        <input
          type="tel"
          className="form-control"
          value={formData.phoneNumber}
          onChange={(e) =>
            setFormData({
              ...formData,
              phoneNumber: parseFloat(e.target.value),
            })
          }
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          required
        />
      </div>
    </div>
  );
}

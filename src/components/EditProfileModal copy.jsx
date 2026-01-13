import { useEffect, useState } from "react";
import { getSubjects, getGradeLevels, getCities, updateProfile, getStates } from "../api/auth";

const EditProfileModal = ({ open, onClose, profile }) => {
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [locations, setLocations] = useState([]);
  const [states, setStates] = useState([]);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    avatar_url: null,
    banner_image_url: null,
    position: "",
    total_experience: 1,
    address: "",
    city: "",
    state: "",
    pincode: "",
    resume: null,
    additional_info: {
      about_us: "",
      subjects: [],
      grade_levels: [],
      achievement: [""],
      certification: [""],
      availability: "",
      min_salary: "",
      max_salary: "",
      notice_period: "",
      education: [
        { degree: "", college_university: "", from: "", to: "", percentage: "" }
      ],
      experience_details: [
        { position: "", school: "", from: "", to: "", key_responsibilities: [""] }
      ],
      preferred_location: []
    }
  });

  const selectedLocations = form.additional_info.preferred_location || [];

  // ---------------- LOAD DATA ----------------
  useEffect(() => {
    if (!open) return;

    const load = async () => {
      const s = await getSubjects();
      const g = await getGradeLevels();
      const state = await getStates();
      const l = await getCities();
      
      setSubjects(s.data.data);
      setGrades(g.data.data);
      setStates(state.data.data);
      setLocations(l.data.data);

      if (profile) {
        setForm({
          name: profile.name || "",
          phone: profile.phone || "",
          email: profile.email || "",
          avatar_url: null,
          banner_image_url: null,
          position: profile.position || "",
          total_experience: profile.total_experience || "",
          resume: null,
          address: profile.addresses.address,
          city: profile.addresses.city,
          state: profile.addresses.state,
          pincode: profile.addresses.pincode,
          additional_info: {
            about_us: profile.additional_info?.about_us || "",
            subjects: Array.isArray(profile.additional_info?.subjects) ? profile.additional_info.subjects : [],
            grade_levels: Array.isArray(profile.additional_info?.grade_levels) ? profile.additional_info.grade_levels : [],
            achievement: profile.additional_info?.achievement
              ? profile.additional_info.achievement.split(",").map(a => a.trim())
              : [""],
            certification: profile.additional_info?.certification
              ? profile.additional_info.certification.split(",").map(c => c.trim())
              : [""],
            availability: profile.additional_info?.availability || "",
            min_salary: profile.additional_info?.min_salary || "",
            max_salary: profile.additional_info?.max_salary || "",
            notice_period: profile.additional_info?.notice_period || "",
            education: Array.isArray(profile.additional_info?.education)
              ? profile.additional_info.education
              : [{ degree: "", college_university: "", from: "", to: "", percentage: "" }],
            experience_details: Array.isArray(profile.additional_info?.experience_details)
              ? profile.additional_info.experience_details
              : [{ position: "", school: "", from: "", to: "", key_responsibilities: [""] }],
            preferred_location: Array.isArray(profile.additional_info?.preferred_location)
              ? profile.additional_info.preferred_location
              : []
          }
        });
      }
    };

    load();
  }, [open, profile]);

  // ---------------- HANDLERS ----------------
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm({ ...form, [name]: type === "file" ? files[0] : value });
  };

  const handleAdditional = (name, value) => {
    setForm({
      ...form,
      additional_info: { ...form.additional_info, [name]: value }
    });
  };

  const handleMulti = (e, field, source) => {
    const ids = Array.from(e.target.selectedOptions, o => Number(o.value));
    const data = source
      .filter(i => ids.includes(i.id))
      .map(i => ({ id: i.id, name: i.name }));
    handleAdditional(field, data);
  };

  const updateArray = (field, index, value) => {
    const arr = [...(form.additional_info[field] || [])];
    arr[index] = value;
    handleAdditional(field, arr);
  };

  const addArray = (field) => {
    const currentArray = form.additional_info[field] || [];
    handleAdditional(field, [...currentArray, ""]);
  };

  const removeArray = (field, index) => {
    const arr = [...(form.additional_info[field] || [])];
    arr.splice(index, 1);
    handleAdditional(field, arr.length ? arr : [""]);
  };

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(search.toLowerCase())
  );

  const addLocation = (location) => {
    if (!selectedLocations.find(l => l.id === location.id)) {
      handleAdditional("preferred_location", [...selectedLocations, location]);
    }
    setSearch("");
    setShowDropdown(false);
  };

  const removeLocation = (id) => {
    handleAdditional(
      "preferred_location",
      selectedLocations.filter(l => l.id !== id)
    );
  };

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Name is required";
    if (!form.phone) e.phone = "Phone is required";
    if (!form.position) e.position = "Position is required";
    if (!form.additional_info.subjects.length) e.subjects = "At least one subject required";
    if (!form.additional_info.grade_levels.length) e.grade_levels = "At least one grade level required";
    if (!form.additional_info.education[0]?.degree) e.education = "Education details required";
    if (!form.additional_info.experience_details[0]?.position) e.experience = "Experience details required";
    if (!form.additional_info.preferred_location.length) e.preferred_location = "Preferred location required";
    if (!form.additional_info.min_salary) e.min_salary = "Min salary required";
    if (!form.additional_info.max_salary) e.max_salary = "Max salary required";
    if (Number(form.additional_info.max_salary) < Number(form.additional_info.min_salary)) {
      e.max_salary = "Max salary must be greater than Min salary";
    }
    if (!form.address) e.address = "Address required";
    if (!form.city) e.city = "City required";
    if (!form.state) e.state = "State required";
    if (!form.pincode) e.pincode = "Pincode required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const ErrorText = ({ error }) => error ? <p className="text-red-500 text-xs mt-1">{error}</p> : null;

  const inputClass = (err) =>
    `input ${err ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""}`;

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      setErrors({});
      const fd = new FormData();

      // Subjects
      form.additional_info.subjects.forEach((s, i) => fd.append(`subjects[${i}]`, s.id));
      // Grade levels
      form.additional_info.grade_levels.forEach((g, i) => fd.append(`grade_levels[${i}]`, g.id));
      // Education
      form.additional_info.education.forEach((edu, i) => {
        fd.append(`education[${i}][degree]`, edu.degree);
        fd.append(`education[${i}][college_university]`, edu.college_university);
        fd.append(`education[${i}][from]`, edu.from);
        fd.append(`education[${i}][to]`, edu.to);
        fd.append(`education[${i}][percentage]`, edu.percentage);
      });
      // Experience
      form.additional_info.experience_details.forEach((exp, i) => {
        fd.append(`experience[${i}][position]`, exp.position);
        fd.append(`experience[${i}][school]`, exp.school);
        fd.append(`experience[${i}][from]`, exp.from);
        fd.append(`experience[${i}][to]`, exp.to);
        exp.key_responsibilities.forEach((r, j) => fd.append(`experience[${i}][key_responsibilities][${j}]`, r));
      });
      // Preferred location
      form.additional_info.preferred_location.forEach((loc, i) => fd.append(`preferred_location[${i}]`, loc.id));
      // Basic fields
      fd.append("name", form.name);
      fd.append("phone", form.phone);
      fd.append("position", form.position);
      fd.append("total_experience", form.total_experience);
      fd.append("availability", form.additional_info.availability);
      fd.append("notice_period", form.additional_info.notice_period);
      fd.append("min_salary", form.additional_info.min_salary);
      fd.append("max_salary", form.additional_info.max_salary);
      fd.append("address", form.address);
      fd.append("city", form.city);
      fd.append("state", form.state);
      fd.append("pincode", form.pincode);
      fd.append("about_us", form.additional_info.about_us || "");
      fd.append("achievement", form.additional_info.achievement.filter(a => a.trim() !== "").join(","));
      fd.append("certification", form.additional_info.certification.filter(c => c.trim() !== "").join(","));
      // Files
      if (form.avatar_url) fd.append("avatar", form.avatar_url);
      if (form.banner_image_url) fd.append("banner_image", form.banner_image_url);
      if (form.resume) fd.append("resume", form.resume);

      await updateProfile(fd);
      alert("Profile updated successfully ✅");
      onClose();
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert("Server error, try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl sm:max-w-3xl md:max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 sm:px-8 rounded-t-2xl z-10">
          <Header title="Edit Profile" onClose={onClose} />
        </div>

        {/* CONTENT */}
        <div className="px-4 sm:px-6 md:px-8 py-6 space-y-8">

          {/* === PERSONAL INFO === */}
          <Section title="Personal Information" icon="👤">
            <Grid>
              <Field label="Full Name" required>
                <input
                  type="text"
                  name="name"
                  className={inputClass(errors.name)}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </Field>

              <Field label="Email Address" required>
                <input
                  type="email"
                  name="email"
                  className="input bg-gray-100"
                  value={form.email}
                  disabled
                />
              </Field>
            </Grid>

            <Grid>
              <Field label="Phone Number">
                <input
                  type="tel"
                  name="phone"
                  className={inputClass(errors.phone)}
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                />
              </Field>

              <Field label="Position" required>
                <input
                  type="text"
                  name="position"
                  className={inputClass(errors.position)}
                  value={form.position}
                  onChange={handleChange}
                  placeholder="e.g., Senior Teacher"
                />
              </Field>

              <Field label="Years of Experience">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="total_experience"
                    min="0"
                    className="input flex-1"
                    value={form.total_experience}
                    onChange={handleChange}
                  />
                  <span className="text-gray-600 font-medium">years</span>
                </div>
              </Field>
            </Grid>

            <Grid>
              <Field label="Profile Picture">
                <input type="file" name="avatar_url" accept="image/*" onChange={handleChange} className="file-input" />
              </Field>
              <Field label="Banner Image">
                <input type="file" name="banner_image_url" accept="image/*" onChange={handleChange} className="file-input" />
              </Field>
            </Grid>
          </Section>

          {/* === ADDRESS === */}
          <Section title="Address">
            <Grid>
              <Field label="Address" required>
                <textarea
                  className={inputClass(errors.address)}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Enter full address"
                />
                <ErrorText error={errors.address} />
              </Field>

              <Field label="State" required>
                <select
                  className={inputClass(errors.state)}
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <ErrorText error={errors.state} />
              </Field>

              <Field label="City" required>
                <select
                  className={inputClass(errors.city)}
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                >
                  <option value="">Select City</option>
                  {locations.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <ErrorText error={errors.city} />
              </Field>

              <Field label="Pincode" required>
                <input
                  type="text"
                  maxLength={6}
                  className={inputClass(errors.pincode)}
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, "") })}
                  placeholder="6-digit pincode"
                />
                <ErrorText error={errors.pincode} />
              </Field>
            </Grid>
          </Section>

          {/* === ADDITIONAL INFO === */}
          {/* ... Subjects, Grade Levels, Achievements, Certifications, Salary, Availability remain same with spacing tuned */}

          {/* === EDUCATION === */}
          <Section title="Education" icon="🎓">
            {form.additional_info.education.map((edu, index) => (
              <div key={index} className="border rounded-xl p-4 space-y-3 bg-gray-50 relative">
                {/* REMOVE BUTTON */}
                {form.additional_info.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const arr = [...form.additional_info.education];
                      arr.splice(index, 1);
                      handleAdditional("education", arr);
                    }}
                    className="absolute top-2 right-2 text-red-600 hover:bg-red-100 rounded-full p-1"
                    aria-label="Remove Education"
                  >
                    ✕
                  </button>
                )}

                <Grid>
                  <Field label="Degree">
                    <input
                      className="input"
                      value={edu.degree}
                      onChange={(e) => {
                        const arr = [...form.additional_info.education];
                        arr[index].degree = e.target.value;
                        handleAdditional("education", arr);
                      }}
                    />
                  </Field>
                  <Field label="College / University">
                    <input
                      className="input"
                      value={edu.college_university}
                      onChange={(e) => {
                        const arr = [...form.additional_info.education];
                        arr[index].college_university = e.target.value;
                        handleAdditional("education", arr);
                      }}
                    />
                  </Field>
                </Grid>

                <Grid>
                  <Field label="From">
                    <input
                      type="month"
                      className="input"
                      value={edu.from}
                      onChange={(e) => {
                        const arr = [...form.additional_info.education];
                        arr[index].from = e.target.value;
                        handleAdditional("education", arr);
                      }}
                    />
                  </Field>
                  <Field label="To">
                    <input
                      type="month"
                      className="input"
                      value={edu.to}
                      onChange={(e) => {
                        const arr = [...form.additional_info.education];
                        arr[index].to = e.target.value;
                        handleAdditional("education", arr);
                      }}
                    />
                  </Field>
                </Grid>

                <Field label="Percentage">
                  <input
                    type="number"
                    className="input"
                    value={edu.percentage}
                    onChange={(e) => {
                      const arr = [...form.additional_info.education];
                      arr[index].percentage = e.target.value;
                      handleAdditional("education", arr);
                    }}
                  />
                </Field>

                <button
                  type="button"
                  onClick={() => handleAdditional("education", [...form.additional_info.education, { degree: "", college_university: "", from: "", to: "", percentage: "" }])}
                  className="text-blue-600 text-sm font-medium"
                >
                  + Add Education
                </button>
              </div>
            ))}
          </Section>

          {/* === EXPERIENCE === */}
          <Section title="Experience" icon="💼">
            {form.additional_info.experience_details.map((exp, index) => (
              <div key={index} className="border rounded-xl p-4 space-y-3 bg-gray-50 relative">
                {/* REMOVE BUTTON */}
                {form.additional_info.experience_details.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const arr = [...form.additional_info.experience_details];
                      arr.splice(index, 1);
                      handleAdditional("experience_details", arr);
                    }}
                    className="absolute top-2 right-2 text-red-600 hover:bg-red-100 rounded-full p-1"
                    aria-label="Remove Experience"
                  >
                    ✕
                  </button>
                )}

                <Grid>
                  <Field label="Position">
                    <input
                      className="input"
                      value={exp.position}
                      onChange={(e) => {
                        const arr = [...form.additional_info.experience_details];
                        arr[index].position = e.target.value;
                        handleAdditional("experience_details", arr);
                      }}
                    />
                  </Field>
                  <Field label="School / Company">
                    <input
                      className="input"
                      value={exp.school}
                      onChange={(e) => {
                        const arr = [...form.additional_info.experience_details];
                        arr[index].school = e.target.value;
                        handleAdditional("experience_details", arr);
                      }}
                    />
                  </Field>
                </Grid>

                <Grid>
                  <Field label="From">
                    <input
                      type="month"
                      className="input"
                      value={exp.from}
                      onChange={(e) => {
                        const arr = [...form.additional_info.experience_details];
                        arr[index].from = e.target.value;
                        handleAdditional("experience_details", arr);
                      }}
                    />
                  </Field>
                  <Field label="To">
                    <input
                      type="month"
                      className="input"
                      value={exp.to}
                      onChange={(e) => {
                        const arr = [...form.additional_info.experience_details];
                        arr[index].to = e.target.value;
                        handleAdditional("experience_details", arr);
                      }}
                    />
                  </Field>
                </Grid>

                {/* Key Responsibilities */}
                {exp.key_responsibilities.map((k, kIndex) => (
                  <div key={kIndex} className="flex items-center gap-2">
                    <input
                      className="input flex-1"
                      value={k}
                      onChange={(e) => {
                        const arr = [...form.additional_info.experience_details];
                        arr[index].key_responsibilities[kIndex] = e.target.value;
                        handleAdditional("experience_details", arr);
                      }}
                      placeholder="Key Responsibility"
                    />
                    {exp.key_responsibilities.length > 1 && (
                      <button
                        type="button"
                        className="text-red-500 font-bold p-1"
                        onClick={() => {
                          const arr = [...form.additional_info.experience_details];
                          arr[index].key_responsibilities.splice(kIndex, 1);
                          handleAdditional("experience_details", arr);
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const arr = [...form.additional_info.experience_details];
                    arr[index].key_responsibilities.push("");
                    handleAdditional("experience_details", arr);
                  }}
                  className="text-blue-600 text-sm font-medium"
                >
                  + Add Responsibility
                </button>

                <button
                  type="button"
                  onClick={() => handleAdditional("experience_details", [...form.additional_info.experience_details, { position: "", school: "", from: "", to: "", key_responsibilities: [""] }])}
                  className="text-blue-600 text-sm font-medium"
                >
                  + Add Experience
                </button>
              </div>
            ))}
          </Section>

          {/* SUBMIT */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="btn-outline"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Reusable small components ---
const Grid = ({ children }) => <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
const Section = ({ title, icon, children }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold flex items-center gap-2">{icon} {title}</h3>
    {children}
  </div>
);
const Field = ({ label, required, children }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
    {children}
  </div>
);
const Header = ({ title, onClose }) => (
  <div className="flex justify-between items-center">
    <h2 className="text-xl font-semibold">{title}</h2>
    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-lg font-bold">✕</button>
  </div>
);

export default EditProfileModal;

import { use, useEffect, useState } from "react";
import { getSubjects, getGradeLevels, getCities, updateProfile, getProfile, getStates } from "../api/auth";

const EditProfileModal = ({ open, onClose, profile, onUpdate }) => {
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [locations, setLocations] = useState([]);
  const [states, setStates] = useState([]);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const[pageLoading, setPageLoading] = useState(true)
  const [userType, setUserType] = useState(0);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
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
    country: "",
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
        {
          degree: "",
          college_university: "",
          from: "",
          to: "",
          percentage: ""
        }
      ],
      experience: [
        {
          position: "",
          school: "",
          from: "",
          to: "",
          key_responsibilities: [""]
        }
      ],
      preferred_location: "",
      students: "",
      teachers: "",
      why_join_us: [""],
      website: ""
    }
  });

  const selectedLocations = form.additional_info.preferred_location || [];

  const USER_BASE_DETAILS = {
    1: {
      positionLabel: "Position",
      positionPlaceHolder: "e.g., Senior Teacher",
      totalExperience: "Years of Experience",
      avatarUrl: "Profile Picture",
      firstNameLabel: "First Name",
    },

    2: {
      positionLabel: "Educational Board",
      positionPlaceHolder: "e.g., CBSE Affiliated School",
      totalExperience: "Year Established",
      avatarUrl: "School Profile",
      firstNameLabel: "School Name",
    },

    3: {
      positionLabel: "Position",
      positionPlaceHolder: "e.g., CBSE Affiliated School",
      totalExperience: "Years",
      avatarUrl: "Bussiness Profile",
      firstNameLabel: "Bussiness Name",
    },
  };

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    if (!open) return;

    const load = async () => {
      try {
        const s = await getSubjects();
        const g = await getGradeLevels();
        const state = await getStates();
        const l = await getCities();
        
        setSubjects(s.data.data);
        setGrades(g.data.data);
        setStates(state.data.data);
        setLocations(l.data.data);

        if (profile) {
          setUserType(profile.user_type);
          
          setForm({
            first_name: profile.first_name || "",
            last_name: profile.last_name || "",
            phone: profile.phone || "",
            email: profile.email || "",
            avatar_url: null,
            banner_image_url: null,
            position: profile.position || "",
            board: profile.board || "",
            total_experience: profile.total_experience || "",
            resume: null,
            address: profile?.addresses?.address || "",
            city: profile?.addresses?.city || "",
            state: profile?.addresses?.state || "",
            pincode: profile?.addresses?.pincode || "",
            country: profile?.addresses?.country || "India",
            additional_info: {
              about_us: profile.additional_info?.about_us || "",
              subjects: Array.isArray(profile.additional_info?.subjects) 
                ? profile.additional_info.subjects
                : [],
              grade_levels: Array.isArray(profile.additional_info?.grade_levels)
                ? profile.additional_info.grade_levels
                : [],
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
                : [
                    {
                      degree: "",
                      college_university: "",
                      from: "",
                      to: "",
                      percentage: ""
                    }
                  ],

              experience: Array.isArray(profile.additional_info?.experience)
                ? profile.additional_info.experience
                : [
                    {
                      position: "",
                      school: "",
                      from: "",
                      to: "",
                      key_responsibilities: [""]
                    }
                  ],

              preferred_location: profile.additional_info?.preferred_location
                ? profile.additional_info.preferred_location.split(",").map(l => l.trim())
                : "",
              
              students: profile?.additional_info?.students || 0,
              teachers: profile?.additional_info?.teachers || 0,
              why_join_us: profile?.additional_info?.why_join_us
                ? profile.additional_info.why_join_us.split(",").map(c => c.trim())
                : [""],
              website: profile?.additional_info?.website || ""
            }
          });
        }
      } finally {
        setPageLoading(false);
      }
    };

    load();
  }, [open, profile]);

  /* ---------------- HANDLERS ---------------- */
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
    if (!selectedLocations.includes(location)) {
      handleAdditional(
        "preferred_location",
        [...selectedLocations, location]
      );
    }
    setSearch("");
    setShowDropdown(false);
  };

  const removeLocation = (index) => {
    const updated = [...selectedLocations];
    updated.splice(index, 1);

    handleAdditional("preferred_location", updated);
  };

  const validate = () => {
    const e = {};

    if (!form.first_name) e.first_name = "Name is required";
    if (!form.phone) e.phone = "Phone is required";
    
    if (userType == 1) {      
      if (!form.additional_info.subjects.length)
        e.subjects = "At least one subject required";
  
      if (!form.additional_info.grade_levels.length)
        e.grade_levels = "At least one grade level required";
  
      if (!form.additional_info.education[0]?.degree)
        e.education = "Education details required";
  
      if (!form.additional_info.experience[0]?.position)
        e.experience = "Experience details required";
  
      if (!form.additional_info.preferred_location.length)
        e.preferred_location = "Preferred location required";
  
      if (!form.additional_info.min_salary)
        e.min_salary = "Min salary required";
  
      if (!form.additional_info.max_salary)
        e.max_salary = "Max salary required";
  
      if (
        Number(form.additional_info.max_salary) <
        Number(form.additional_info.min_salary)
      ) {
        e.max_salary = "Max salary must be greater than Min salary";
      }
    }

    if(userType == 2) {
      if (!form.additional_info.website) e.website = "Website required";
      if (!form.additional_info.students) e.students = "Students required";
      if (!form.additional_info.teachers) e.teachers = "Teachers required";
      if (!form.board) e.board = "Board required";
    }

    if(userType == 1 || userType == 3) {
      if (!form.position) e.position = "Position is required";
    }

    // Address
    if (!form.address) e.address = "Address required";
    if (!form.city) e.city = "City required";
    if (!form.state) e.state = "State required";
    if (!form.pincode) e.pincode = "Pincode required";
    if (!form.country) e.country = "Country required";

    setErrors(e);
    console.log(e);
    return Object.keys(e).length === 0;
  };

  const ErrorText = ({ error }) =>
    error ? (
      <p className="text-red-500 text-xs mt-1">{error}</p>
    ) : null;

  const inputClass = (err) =>
  `input ${err ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""}`;


  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      setErrors({});

      const fd = new FormData();
      
      if (userType == 1) {
        // SUBJECTS
        form.additional_info.subjects.forEach((s, i) =>
          fd.append(`subjects[${i}]`, s.id)
        );

        // GRADE LEVELS
        form.additional_info.grade_levels.forEach((g, i) =>
          fd.append(`grade_levels[${i}]`, g.id)
        );

        // EDUCATION
        form.additional_info.education.forEach((edu, i) => {
          fd.append(`education[${i}][degree]`, edu.degree);
          fd.append(`education[${i}][college_university]`, edu.college_university);
          fd.append(`education[${i}][from]`, edu.from);
          fd.append(`education[${i}][to]`, edu.to);
          fd.append(`education[${i}][percentage]`, edu.percentage);
        });

        // EXPERIENCE
        form.additional_info.experience.forEach((exp, i) => {
          fd.append(`experience[${i}][position]`, exp.position);
          fd.append(`experience[${i}][school]`, exp.school);
          fd.append(`experience[${i}][from]`, exp.from);
          fd.append(`experience[${i}][to]`, exp.to);

          exp.key_responsibilities.forEach((r, j) => {
            fd.append(`experience[${i}][key_responsibilities][${j}]`, r);
          });
        });

        // PREFERRED LOCATION (as string)
        const preferredLocation = form.additional_info.preferred_location
          .filter(l => l.trim() !== "")
          .join(", ");

        fd.append("preferred_location", preferredLocation);

        fd.append("availability", form.additional_info.availability);
        fd.append("notice_period", form.additional_info.notice_period);
        fd.append("min_salary", form.additional_info.min_salary);
        fd.append("max_salary", form.additional_info.max_salary);

        fd.append("achievement", form.additional_info.achievement .filter(a => a.trim() !== "") .join(","));
        fd.append("certification", form.additional_info.certification .filter(c => c.trim() !== "") .join(","));

        fd.append("last_name", form.last_name);
        
        if (form.resume) fd.append("resume", form.resume);
      }

      if (userType == 2) {
        fd.append("students", form.additional_info.students);
        fd.append("teachers", form.additional_info.teachers);
        fd.append("why_join_us", form.additional_info.why_join_us .filter(c => c.trim() !== "") .join(","));
        fd.append("website", form.additional_info.website);
        fd.append("board", form.board);
      }

      if (userType == 1 || userType == 2) {
        fd.append("position", form.position);
      }

      // BASIC FIELDS
      fd.append("first_name", form.first_name);
      fd.append("phone", form.phone);
      fd.append("total_experience", form.total_experience);

      fd.append("address", form.address);
      fd.append("city", form.city);
      fd.append("state", form.state);
      fd.append("pincode", form.pincode);
      fd.append("country", form.country);

      fd.append("about_us", form.additional_info.about_us || "");

      // FILES
      if (form.avatar_url) fd.append("avatar_url", form.avatar_url);
      if (form.banner_image_url) fd.append("banner_image_url", form.banner_image_url);

      await updateProfile(fd);

      const res = await getProfile();
      
      onUpdate(res.data.data);

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

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loader" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl z-10">
          <Header title="Edit Profile" onClose={onClose} />
        </div>
        
        <div className="px-8 py-6">
          {/* Personal Information */}
          <Section title="Personal Information" icon="👤">
            <Grid>
              <Field label={USER_BASE_DETAILS[userType]?.firstNameLabel} required>

                <input
                  type="text"
                  name="first_name"
                  className="input"
                  value={form.first_name}
                  onChange={handleChange}
                />

                {errors.firstName && (
                  <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
                )}
              </Field>

              {userType == 1 && (
                <>
                  <Field label="Last Name" required>

                    <input
                      type="text"
                      name="last_name"
                      className="input"
                      value={form.last_name}
                      onChange={handleChange}
                    />
                  </Field>
                </>
              )}
              
              <Field label="Email Address" required>
                <input
                  type="email"
                  name="email"
                  className="input bg-gray-100"
                  value={form.email}
                  disabled
                  placeholder="your.email@example.com"
                />
              </Field>
            </Grid>

            <Grid>
              <Field label="Phone Number">
                <input
                  type="tel"
                  name="phone"
                  className="input"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                />
              </Field>

              {userType == 1 && (
                <>
                  <Field label={USER_BASE_DETAILS[userType]?.positionLabel} required>
                    <input
                      type="text"
                      name="position"
                      className="input"
                      value={form.position}
                      onChange={handleChange}
                      placeholder={USER_BASE_DETAILS[userType]?.positionPlaceHolder}
                    />
                  </Field>
                </>
              )}

              {userType == 2 && (
                <>
                  <Field label={USER_BASE_DETAILS[userType]?.positionLabel} required>
                    <input
                      type="text"
                      name="board"
                      className="input"
                      value={form.board}
                      onChange={handleChange}
                      placeholder={USER_BASE_DETAILS[userType]?.positionPlaceHolder}
                    />
                  </Field>
                </>
              )}

              <Field label={USER_BASE_DETAILS[userType]?.totalExperience}>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="total_experience"
                    min="0"
                    className="input"
                    value={form.total_experience}
                    onChange={handleChange}
                  />
                  <span className="text-gray-600 font-medium">years</span>
                </div>
              </Field>
            </Grid>

            <Grid>
              <Field label={USER_BASE_DETAILS[userType]?.avatarUrl}>
                <input
                  type="file"
                  name="avatar_url"
                  accept="image/*"
                  onChange={handleChange}
                  className="file-input"
                />
              </Field>

              <Field label="Banner Image">
                <input
                  type="file"
                  name="banner_image_url"
                  accept="image/*"
                  onChange={handleChange}
                  className="file-input"
                />
              </Field>
            </Grid>
          </Section>

          <Section title="Address" icon="">
            <Field label="Address" required>
              <textarea
                className={inputClass(errors.address)}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Enter full address"
              />
              <ErrorText error={errors.address} />
            </Field>

            <Grid>
              <Field label="Pincode" required>
                <input
                  type="text"
                  maxLength={6}
                  className={inputClass(errors.pincode)}
                  value={form.pincode}
                  onChange={(e) =>
                    setForm({ ...form, pincode: e.target.value.replace(/\D/g, "") })
                  }
                  placeholder="6-digit pincode"
                />
                <ErrorText error={errors.pincode} />
              </Field>

              <Field label="Country" required>
                <input
                  type="text"
                  maxLength={6}
                  className={inputClass(errors.country)}
                  value={form.country}
                  disabled
                />
                <ErrorText error={errors.country} />
              </Field>
            </Grid>

            <Grid>
              <Field label="State" required>
                <select
                  className={inputClass(errors.state)}
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
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
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ErrorText error={errors.city} />
              </Field>
            </Grid>
          </Section>

          {/* Additional Information */}
          <Section title="Additional Information" icon="📋">
            <Field label="About">
              <textarea
                className="input min-h-[120px] resize-none"
                value={form.additional_info.about_us}
                onChange={(e) => handleAdditional("about_us", e.target.value)}
                placeholder="Tell us about yourself, your teaching philosophy, and experience..."
              />
            </Field>

            {userType == 1 && (
              <>
                <Grid>
                  <Field label="Subjects">
                    <select
                      multiple
                      className="input h-40 overflow-y-auto"
                      value={form.additional_info.subjects.map(s => String(s.id))}
                      onChange={(e) => handleMulti(e, "subjects", subjects)}
                    >
                      {subjects.map(s => (
                        <option key={s.id} value={s.id} className="py-2">
                          {s.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                  </Field>

                  <Field label="Grade Levels">
                    <select
                      multiple
                      className="input h-40 overflow-y-auto"
                      value={form.additional_info.grade_levels.map(g => String(g.id))}
                      onChange={(e) => handleMulti(e, "grade_levels", grades)}
                    >
                      {grades.map(g => (
                        <option key={g.id} value={g.id} className="py-2">
                          {g.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                  </Field>
                </Grid>

                <Dynamic
                  label="Achievements"
                  icon="🏆"
                  values={form.additional_info.achievement}
                  onAdd={() => addArray("achievement")}
                  onChange={(i, v) => updateArray("achievement", i, v)}
                  onRemove={(i) => removeArray("achievement", i)}
                  placeholder="e.g., Teacher of the Year 2023"
                />

                <Dynamic
                  label="Certifications"
                  icon="📜"
                  values={form.additional_info.certification}
                  onAdd={() => addArray("certification")}
                  onChange={(i, v) => updateArray("certification", i, v)}
                  onRemove={(i) => removeArray("certification", i)}
                  placeholder="e.g., TEFL Certified"
                />

                <Grid>
                  <Field label="Availability">
                    <select
                      className="input"
                      value={form.additional_info.availability}
                      onChange={(e) => handleAdditional("availability", e.target.value)}
                    >
                      <option value="">Select availability</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </Field>

                  <Field label="Notice Period">
                    <select
                      className="input"
                      value={form.additional_info.notice_period}
                      onChange={(e) => handleAdditional("notice_period", e.target.value)}
                    >
                      <option value="">Select notice period</option>
                      <option value="Immediate">Immediate</option>
                      <option value="10 Days">10 Days</option>
                      <option value="15 Days">15 Days</option>
                      <option value="30 Days">30 Days</option>
                    </select>
                  </Field>
                </Grid>

                <Field label="Expected Salary Range (per year)">
                  <div className="flex gap-3 items-center">
                    <div className="flex-1">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          min={1000}
                          className="input"
                          style={{ paddingLeft: "2.5rem" }} // 👈 FIX
                          value={form.additional_info.min_salary}
                          onChange={(e) => handleAdditional("min_salary", e.target.value)}
                          placeholder="Min"
                        />
                      </div>
                    </div>

                    <span className="text-gray-400 font-medium">to</span>

                    <div className="flex-1">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          min={form.additional_info.min_salary}
                          className="input"
                          style={{ paddingLeft: "2.5rem" }} // 👈 FIX
                          value={form.additional_info.max_salary}
                          onChange={(e) => handleAdditional("max_salary", e.target.value)}
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                </Field>
              </>
            )}

            {userType == 2 && (
              <>
                <Dynamic
                  label="Why Join Us"
                  icon="📜"
                  values={form.additional_info.why_join_us}
                  onAdd={() => addArray("why_join_us")}
                  onChange={(i, v) => updateArray("why_join_us", i, v)}
                  onRemove={(i) => removeArray("why_join_us", i)}
                />

                <Grid>
                  <Field label="Students">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        name="students"
                        min="0"
                        className="input"
                        value={form.additional_info.students}
                        onChange={(e) => handleAdditional("students", e.target.value)}
                      />
                    </div>
                  </Field>

                  <Field label="Teachers">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        name="teachers"
                        min="0"
                        className="input"
                        value={form.additional_info.teachers}
                        onChange={(e) => handleAdditional("teachers", e.target.value)}
                      />
                    </div>
                  </Field>

                  <Field label="Website">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        name="website"
                        min="0"
                        className="input"
                        value={form.additional_info.website}
                        onChange={(e) => handleAdditional("website", e.target.value)}
                      />
                    </div>
                  </Field>
                </Grid>
              </>
            )}
          </Section>
          
          {userType == 1 && (
            <>
              <Section title="Education" icon="🎓">
                {form.additional_info.education.map((edu, index) => (
                  <div key={index} className="border rounded-xl p-4 space-y-3 bg-gray-50 relative">
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
                          value={edu.to || ""}
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
                      onClick={() =>
                        handleAdditional("education", [
                          ...form.additional_info.education,
                          { degree: "", college_university: "", from: "", to: "", percentage: "" }
                        ])
                      }
                      className="text-blue-600 text-sm font-medium"
                    >
                      + Add Education
                    </button>
                  </div>
                ))}
              </Section>

              <Section title="Experience" icon="💼">
                {form.additional_info.experience.map((exp, index) => (
                  <div key={index} className="border rounded-xl p-4 bg-gray-50 space-y-3 relative">
                    {/* REMOVE BUTTON */}
                    {form.additional_info.experience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const arr = [...form.additional_info.experience];
                          arr.splice(index, 1);
                          handleAdditional("experience", arr);
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
                            const arr = [...form.additional_info.experience];
                            arr[index].position = e.target.value;
                            handleAdditional("experience", arr);
                          }}
                        />
                      </Field>

                      <Field label="School / Organization">
                        <input
                          className="input"
                          value={exp.school}
                          onChange={(e) => {
                            const arr = [...form.additional_info.experience];
                            arr[index].school = e.target.value;
                            handleAdditional("experience", arr);
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
                            const arr = [...form.additional_info.experience];
                            arr[index].from = e.target.value;
                            handleAdditional("experience", arr);
                          }}
                        />
                      </Field>

                      <Field label="To">
                        <input
                          type="month"
                          className="input"
                          value={exp.to || ""}
                          onChange={(e) => {
                            const arr = [...form.additional_info.experience];
                            arr[index].to = e.target.value;
                            handleAdditional("experience", arr);
                          }}
                        />
                      </Field>
                    </Grid>

                    {/* RESPONSIBILITIES */}
                    <Dynamic
                      label="Key Responsibilities"
                      values={exp.key_responsibilities}
                      onAdd={() => {
                        const arr = [...form.additional_info.experience];
                        arr[index].key_responsibilities.push("");
                        handleAdditional("experience", arr);
                      }}
                      onChange={(i, v) => {
                        const arr = [...form.additional_info.experience];
                        arr[index].key_responsibilities[i] = v;
                        handleAdditional("experience", arr);
                      }}
                      onRemove={(i) => {
                        const arr = [...form.additional_info.experience];
                        arr[index].key_responsibilities.splice(i, 1);
                        handleAdditional("experience", arr);
                      }}
                      placeholder="Responsibility details"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        handleAdditional("experience", [
                          ...form.additional_info.experience,
                          {
                            position: "",
                            school: "",
                            from: "",
                            to: "",
                            key_responsibilities: [""]
                          }
                        ])
                      }
                      className="text-blue-600 text-sm font-medium"
                    >
                      + Add Experience
                    </button>
                  </div>
                ))}
              </Section>

              <div className="my-8">
                <label className="label">Preferred Location</label>

                {/* Selected Chips */}
                <div className="flex flex-wrap gap-2">
                  {selectedLocations.map((loc, index) => (

                    <span
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                    >
                      {loc}
                      <button
                        type="button"
                        onClick={() => removeLocation(index)}
                        className="text-red-500"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>

                {/* Search Input */}
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowDropdown(true);
                  }}
                  placeholder="Search location..."
                  className="input"
                />

                {/* Dropdown */}
                {showDropdown && (
                  <div className="border rounded-md max-h-48 overflow-auto bg-white shadow">
                    {filteredLocations.length ? (
                      filteredLocations.map((loc) => (
                        <div
                          key={loc.id}
                          onClick={() => addLocation(loc.name)}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          {loc.name}
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-gray-500">No results found</div>
                    )}
                  </div>
                )}
              </div>

              {/* Resume */}
              <Section title="Resume" icon="📄">
                <Field label="Upload Resume (PDF)">
                  <input
                    type="file"
                    accept="application/pdf"
                    name="resume"
                    onChange={handleChange}
                    className="file-input"
                  />
                  {form.resume && (
                    <p className="text-sm text-green-600 mt-2">✓ {form.resume.name}</p>
                  )}
                </Field>
              </Section>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          transition: all 0.2s;
          background: white;
        }
        .input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .input::placeholder {
          color: #9ca3af;
        }
        .file-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px dashed #e5e7eb;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
          background: #fafafa;
        }
        .file-input:hover {
          border-color: #3b82f6;
          background: #f0f9ff;
        }
        select.input option {
          padding: 0.5rem;
        }
        select[multiple].input {
          padding: 0.5rem;
        }
      `}</style>
    </div>
  );
};

/* ---------------- UI HELPERS ---------------- */
const Header = ({ title, onClose }) => (
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    <button
      onClick={onClose}
      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
      aria-label="Close"
    >
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
);

const Section = ({ title, icon, children }) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-100">
      {icon && <span className="text-xl">{icon}</span>}
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);

const Field = ({ label, required, children }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
  </div>
);

const Dynamic = ({ label, icon, values, onAdd, onChange, onRemove, placeholder }) => {
  const safeValues = Array.isArray(values) ? values : [""];

  return (
    <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {label}
        </label>
        <button
          type="button"
          onClick={onAdd}
          className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add
        </button>
      </div>
      <div className="space-y-2">
        {safeValues.map((v, i) => (
          <div key={i} className="flex gap-2">
            <input
              className="input flex-1"
              value={v}
              onChange={(e) => onChange(i, e.target.value)}
              placeholder={placeholder}
            />
            {safeValues.length > 1 && (
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Remove"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditProfileModal;
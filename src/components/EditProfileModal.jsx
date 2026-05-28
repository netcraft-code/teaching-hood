import { use, useEffect, useState } from "react";
import {
  getSubjects,
  getGradeLevels,
  getCities,
  updateProfile,
  getProfile,
  getStates,
  profileCompletion,
} from "../api/auth";
import AsyncSelect from "react-select/async";
import ProfileMeter from "./ProfileMeter";

const EditProfileModal = ({ open, onClose, profile, onUpdate }) => {
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [locations, setLocations] = useState([]);
  const [states, setStates] = useState([]);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [userType, setUserType] = useState(0);
  const [selectedStateId, setSelectedStateId] = useState(0);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    position: "",
    grade: "",
    subject: "",
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
          percentage: "",
        },
      ],
      experience: [
        {
          position: "",
          school: "",
          from: "",
          to: "",
          key_responsibilities: [""],
          is_currently_working: false,
          board: "",
          board_other: "",
        },
      ],
      preferred_location: "",
      students: "",
      teachers: "",
      why_join_us: [""],
      website: "",
    },
  });
  const [cityOption, setCityOption] = useState(null);

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
      totalExperience: "Years since establishment",
      avatarUrl: "School Profile Picture",
      firstNameLabel: "School Name",
    },

    3: {
      positionLabel: "Position",
      positionPlaceHolder: "e.g., CBSE Affiliated School",
      totalExperience: "Years of Experience",
      avatarUrl: "Bussiness Profile",
      firstNameLabel: "Bussiness Name",
    },
  };

  const isValidDateRange = (from, to) => {
    if (!from) return false;

    // handle null, undefined, empty string properly
    if (to === "null" || to === null || to === undefined || to === "") {
      return true;
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    // invalid date protection
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return false;
    }

    return fromDate <= toDate;
  };

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    if (!open) return;

    const load = async () => {
      try {
        const [subjectsRes, gradesRes, stateRes] = await Promise.all([
          getSubjects(),
          getGradeLevels(),
          getStates(),
        ]);

        setSubjects(subjectsRes.data.data);
        setGrades(gradesRes.data.data);
        setStates(stateRes.data.data);

        if (profile) {
          setUserType(profile.user_type);

          const stateValue = profile?.addresses?.state || "";

          setCityOption(
            profile?.addresses?.city
              ? {
                  value: profile.addresses.city,
                  label: profile.addresses.city,
                }
              : null,
          );

          const knownBoards = [
            "CBSE",
            "ISCE",
            "ISC",
            "NIOS",
            "BSB",
            "IB",
            "CAIE",
            "State Board",
          ];

          setForm({
            first_name: profile.first_name || "",
            last_name: profile.last_name || "",
            phone: profile.phone || "",
            email: profile.email || "",
            position: profile.position || "",
            grade: profile.grade || "",
            subject: profile.subject || "",
            board: knownBoards.includes(profile.board)
              ? profile.board
              : profile.board
                ? "Others"
                : "",
            board_other: knownBoards.includes(profile.board)
              ? ""
              : profile.board || "",
            total_experience: profile.total_experience || "",
            resume: null,
            address: profile?.addresses?.address || "",
            city: profile?.addresses?.city || "",
            state: stateValue,
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
                ? profile.additional_info.achievement
                    .split(",")
                    .map((a) => a.trim())
                : [""],
              certification: profile.additional_info?.certification
                ? profile.additional_info.certification
                    .split(",")
                    .map((c) => c.trim())
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
                      percentage: "",
                    },
                  ],

              experience: Array.isArray(profile.additional_info?.experience)
                ? profile.additional_info.experience.map((exp) => ({
                    ...exp,
                    // Convert "0", "1", 0, 1, true, false to proper boolean
                    is_currently_working:
                      exp.is_currently_working === true ||
                      exp.is_currently_working === 1 ||
                      exp.is_currently_working === "1"
                        ? true
                        : false,
                    // ✅ board normalize
                    board: knownBoards.includes(exp.board)
                      ? exp.board
                      : exp.board
                        ? "Others"
                        : "",
                    // ✅ board_other — agar known board nahi hai to original value rakh
                    board_other: knownBoards.includes(exp.board)
                      ? ""
                      : exp.board || "",
                  }))
                : [
                    {
                      position: "",
                      school: "",
                      from: "",
                      to: "",
                      key_responsibilities: [""],
                      is_currently_working: false,
                      board: "",
                      board_other: "",
                    },
                  ],

              preferred_location: profile.additional_info?.preferred_location
                ? profile.additional_info.preferred_location
                    .split(",")
                    .map((l) => l.trim())
                : "",

              students: profile?.additional_info?.students || 0,
              teachers: profile?.additional_info?.teachers || 0,
              why_join_us: profile?.additional_info?.why_join_us
                ? profile.additional_info.why_join_us
                    .split(",")
                    .map((c) => c.trim())
                : [""],
              website: profile?.additional_info?.website || "",
            },
          });
        }
      } finally {
        setPageLoading(false);
      }
    };

    load();
  }, [open, profile]);

  // const fetchCities = async (stateId) => {
  //   const cityRes = await getCities({ state_id: stateId });

  //   setLocations(cityRes.data.data.data);
  // };

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm({ ...form, [name]: type === "file" ? files[0] : value });

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleAdditional = (name, value) => {
    console.log("Updating additional_info:", name, value);
    setForm({
      ...form,
      additional_info: { ...form.additional_info, [name]: value },
    });

    setErrors((prev) => {
      const updated = { ...prev };

      // Normal field
      updated[name] = "";

      return updated;
    });
  };

  const handleSalaryRange = (minVal, maxVal) => {
    setForm((form) => ({
      ...form,
      additional_info: {
        ...form.additional_info,
        min_salary: minVal,
        max_salary: maxVal,
      },
    }));
  };

  const handleMulti = (e, field, source) => {
    const ids = Array.from(e.target.selectedOptions, (o) => Number(o.value));
    const data = source
      .filter((i) => ids.includes(i.id))
      .map((i) => ({ id: i.id, name: i.name }));

    handleAdditional(field, data);

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
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

  // filteredLocations = locations.filter((loc) =>
  //   loc.name.toLowerCase().includes(search.toLowerCase()),
  // );

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (search) {
        const res = await getCities({
          search: search || "",
          limit: 20,
        });

        // API se jo aaya usko set karo
        setFilteredLocations(res?.data?.data?.data || []);
      } else {
        // jab search empty ho → initial locations dikhao
        setFilteredLocations(locations);
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const addLocation = (location) => {
    if (!selectedLocations.includes(location)) {
      handleAdditional("preferred_location", [...selectedLocations, location]);
    }

    setErrors((prev) => ({
      ...prev,
      preferred_location: "",
    }));

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
      // if (!form.additional_info.availability.length)
      //   e.availability = "Select employment type";

      // if (!form.additional_info.notice_period.length)
      //   e.notice_period = "Select notice period";

      if (!form.additional_info.education[0]?.degree)
        e.education = "Education details required";

      if (!form.additional_info.experience[0]?.position)
        e.experience = "Experience details required";

      // if (!form.additional_info.preferred_location.length)
      //   e.preferred_location = "Preferred location required";

      // if (!form.additional_info.min_salary)
      //   e.min_salary = "Min salary required";

      // if (!form.additional_info.max_salary)
      //   e.max_salary = "Max salary required";

      form.additional_info.experience.forEach((exp, index) => {
        if (!isValidDateRange(exp.from, exp.to)) {
          e[`experience_${index}`] = "From date cannot be greater than To date";
        }
      });

      form.additional_info.education.forEach((edu, index) => {
        if (!isValidDateRange(edu.from, edu.to)) {
          e[`education_${index}`] = "From date cannot be greater than To date";
        }
      });
    }

    if (userType == 2) {
      // if (!form.additional_info.website) e.website = "Website required";
      // if (!form.additional_info.students) e.students = "Students required";
      // if (!form.additional_info.teachers) e.teachers = "Teachers required";

      form.board = form.board === "Others" ? form.board_other : form.board;

      if (!form.board) e.board = "Board required";
    }

    if (userType == 1) {
      form.grade = form.grade === "Others" ? form.grade_other : form.grade;

      if (!form.grade) e.grade = "Grade required";

      form.subject =
        form.subject === "Others" ? form.subject_other : form.subject;

      if (!form.subject) e.subject = "Subject required";
    }

    // if (userType == 1 || userType == 3) {
    //   if (!form.position) e.position = "Position is required";
    // }

    // Address
    if (!form.address) e.address = "Address required";
    if (!form.city) e.city = "City required";
    if (!form.state) e.state = "State required";
    if (!form.pincode) e.pincode = "Pincode required";
    if (!form.country) e.country = "Country required";
    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const isAnyCurrentlyWorking = form.additional_info.experience.some(
    (exp) => exp.is_currently_working,
  );

  const ErrorText = ({ error }) =>
    error ? <p className="text-red-500 text-xs mt-1">{error}</p> : null;

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
          fd.append(`subjects[${i}]`, s.id),
        );

        // GRADE LEVELS
        form.additional_info.grade_levels.forEach((g, i) =>
          fd.append(`grade_levels[${i}]`, g.id),
        );

        // EDUCATION
        form.additional_info.education.forEach((edu, i) => {
          fd.append(`education[${i}][degree]`, edu.degree);
          fd.append(
            `education[${i}][college_university]`,
            edu.college_university,
          );
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
          fd.append(
            `experience[${i}][is_currently_working]`,
            exp.is_currently_working ? 1 : 0,
          );

          fd.append(
            `experience[${i}][board]`,
            exp.board === "Others" ? exp.board_other : exp.board,
          );

          if (exp.is_currently_working) {
            fd.append(`experience[${i}][to]`, "");
          }

          exp.key_responsibilities.forEach((r, j) => {
            fd.append(`experience[${i}][key_responsibilities][${j}]`, r);
          });
        });

        // PREFERRED LOCATION (as string)
        const locations = Array.isArray(
          form?.additional_info?.preferred_location,
        )
          ? form.additional_info.preferred_location
          : form?.additional_info?.preferred_location
            ? [form.additional_info.preferred_location]
            : [];

        const preferredLocation = locations
          .filter((l) => typeof l === "string" && l.trim() !== "")
          .join(", ");

        fd.append("preferred_location", preferredLocation);

        fd.append("availability", form.additional_info.availability);
        fd.append("notice_period", form.additional_info.notice_period);
        fd.append("min_salary", form.additional_info.min_salary);
        fd.append("max_salary", form.additional_info.max_salary);

        fd.append(
          "achievement",
          form.additional_info.achievement
            .filter((a) => a.trim() !== "")
            .join(","),
        );
        fd.append(
          "certification",
          form.additional_info.certification
            .filter((c) => c.trim() !== "")
            .join(","),
        );

        fd.append("last_name", form.last_name);

        if (form.resume) fd.append("resume", form.resume);
      }

      if (userType == 2) {
        fd.append("students", form.additional_info.students);
        fd.append("teachers", form.additional_info.teachers);
        fd.append(
          "why_join_us",
          form.additional_info.why_join_us
            .filter((c) => c.trim() !== "")
            .join(","),
        );
        fd.append("website", form.additional_info.website);
        fd.append("board", form.board);
      }

      if (userType == 1) {
        fd.append(
          "grade",
          form.grade === "Other" ? form.grade_other : form.grade,
        );
        fd.append(
          "subject",
          form.subject === "Other" ? form.subject_other : form.subject,
        );
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
      await updateProfile(fd);

      const res = await getProfile();

      onUpdate(res.data.data);

      const profileCompletionRes = await profileCompletion();

      <ProfileMeter
        percentage={profileCompletionRes.data.profile_completion.percentage}
        missingFields={
          profileCompletionRes.data.profile_completion.missing_fields
        }
      />;

      setPopupMessage("Profile updated successfully ✅");
      setShowPopup(true);
    } catch (error) {
      console.error("Job save failed:", error);

      // ✅ Backend validation handling (Laravel)
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setPopupMessage("Something went wrong. Please try again.");

        setShowPopup(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadCities = async (stateId, inputValue) => {
    try {
      const res = await getCities({
        state_id: stateId,
        search: inputValue || "",
        limit: 20,
      });

      const cities =
        res?.data?.data?.data?.map((city) => ({
          value: city.id,
          label: city.name,
        })) || [];

      // ✅ only set locations when no search (initial load)
      if (!inputValue) {
        setLocations(res?.data?.data?.data || []);
      }

      return cities;
    } catch (error) {
      console.error("City API error", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      if (!form.state) return;

      if (form.state && states.length > 0) {
        const matched = states.find((s) => s.name === form.state);

        if (matched) {
          setSelectedStateId(matched.id);

          const cityRes = await getCities({
            state_id: matched.id,
            limit: 20,
          });

          setLocations(cityRes.data.data.data);
        }
      }
    };

    fetchCities();
  }, [form.state]);

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
          <Section title="Personal Information">
            {/* Name, Email Address */}
            <Grid>
              {/* First Name Input */}
              <Field
                label={USER_BASE_DETAILS[userType]?.firstNameLabel}
                required
              >
                <input
                  type="text"
                  name="first_name"
                  className={inputClass(errors.first_name)}
                  value={form.first_name}
                  onChange={handleChange}
                />

                <ErrorText error={errors.first_name} />
              </Field>

              {/* Last Name Input */}
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

              {/* Email Address */}
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

              {/* Phone Number */}
              <Field label="Phone Number" required>
                <div className="grid grid-cols-5 gap-2">
                  <input
                    type="text"
                    value="+91"
                    readOnly
                    className="input col-span-1 bg-gray-100 cursor-not-allowed text-center"
                  />

                  <input
                    type="tel"
                    name="phone"
                    className={`col-span-4 ${inputClass(errors.phone)}`}
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    maxLength={10}
                  />
                </div>

                <ErrorText error={errors.phone} />
              </Field>
            </Grid>

            <span className="text-sm font-medium text-gray-700 mb-1.5 block">
              Current Position<span className="text-red-500 ml-1">*</span>
            </span>

            {/* Phone Number, Position, Board, Total Experience */}
            <Grid>
              {/* Position */}
              {userType == 1 && (
                <>
                  {/* Grade Field */}
                  <Field label="Grade" required>
                    <select
                      className={inputClass(errors.grade)}
                      value={
                        form.grade === "Other" ? "Other" : form.grade || ""
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        setForm((prev) => ({
                          ...prev,
                          grade: val,
                          grade_other: "",
                        }));
                        setErrors((prev) => ({ ...prev, grade: "" }));
                      }}
                    >
                      <option value="">Select Grade</option>
                      {grades.map((g) => (
                        <option key={g.id} value={g.name}>
                          {g.name}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>

                    {form.grade === "Other" && (
                      <input
                        type="text"
                        className={`${inputClass(errors.grade)} mt-2`}
                        placeholder="Enter grade"
                        value={form.grade_other || ""}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            grade_other: e.target.value,
                          }))
                        }
                      />
                    )}
                    <ErrorText error={errors.grade} />
                  </Field>

                  {/* Subject Field */}
                  <Field label="Subject" required>
                    <select
                      className={inputClass(errors.subject)}
                      value={
                        form.subject === "Other" ? "Other" : form.subject || ""
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        setForm((prev) => ({
                          ...prev,
                          subject: val,
                          subject_other: "",
                        }));
                        setErrors((prev) => ({ ...prev, subject: "" }));
                      }}
                    >
                      <option value="">Select Subject</option>
                      {subjects.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>

                    {form.subject === "Other" && (
                      <input
                        type="text"
                        className={`${inputClass(errors.subject)} mt-2`}
                        placeholder="Enter subject"
                        value={form.subject_other || ""}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            subject_other: e.target.value,
                          }))
                        }
                      />
                    )}
                    <ErrorText error={errors.subject} />
                  </Field>
                </>
              )}

              {/* Board */}
              {userType == 2 && (
                <>
                  <Field
                    label={USER_BASE_DETAILS[userType]?.positionLabel}
                    required
                  >
                    <select
                      className={inputClass(errors.board)}
                      value={
                        form.board === "CBSE" ||
                        form.board === "ISCE" ||
                        form.board === "ISC" ||
                        form.board === "NIOS" ||
                        form.board === "BSB" ||
                        form.board === "IB" ||
                        form.board === "CAIE" ||
                        form.board === "State Board"
                          ? form.board
                          : form.board
                            ? "Others"
                            : ""
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        setForm((prev) => ({
                          ...prev,
                          board: val,
                          board_other: "",
                        }));
                        setErrors((prev) => ({ ...prev, board: "" }));
                      }}
                    >
                      <option value="">Select Board</option>
                      {[
                        "CBSE",
                        "ISCE",
                        "ISC",
                        "NIOS",
                        "BSB",
                        "IB",
                        "CAIE",
                        "State Board",
                      ].map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                      <option value="Others">Others</option>
                    </select>

                    {form.board === "Others" && (
                      <input
                        type="text"
                        className={`${inputClass(errors.board)} mt-2`}
                        placeholder="Enter board name"
                        value={form.board_other || ""}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            board_other: e.target.value,
                          }))
                        }
                      />
                    )}
                    <ErrorText error={errors.board} />
                  </Field>
                </>
              )}

              {/* Total Experience */}
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
                  {/* <span className="text-gray-600 font-medium">years</span> */}
                </div>
              </Field>
            </Grid>
          </Section>

          {/* Address, Pincode, Country, State, City */}
          <Section title="Address" icon="">
            {/* Address */}
            <Field label="Address" required>
              <textarea
                className={inputClass(errors.address)}
                value={form.address}
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }));

                  setErrors((prev) => ({
                    ...prev,
                    address: "",
                  }));
                }}
                placeholder="Enter full address"
              />
              <ErrorText error={errors.address} />
            </Field>

            {/* Pincode, Country */}
            <Grid>
              {/* Pincode */}
              <Field label="Pincode" required>
                <input
                  type="text"
                  maxLength={6}
                  className={inputClass(errors.pincode)}
                  value={form.pincode}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      pincode: e.target.value.replace(/\D/g, ""),
                    }));

                    setErrors((prev) => ({
                      ...prev,
                      pincode: "",
                    }));
                  }}
                  placeholder="6-digit pincode"
                />
                <ErrorText error={errors.pincode} />
              </Field>

              {/* Country */}
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

            {/* State, City */}
            <Grid>
              {/* State */}
              <Field label="State" required>
                <select
                  className={inputClass(errors.state)}
                  value={
                    form.state
                      ? JSON.stringify(
                          states.find((s) => s.name === form.state) || "",
                        )
                      : ""
                  }
                  onChange={(e) => {
                    if (!e.target.value) return;
                    const selectedState = JSON.parse(e.target.value);
                    setForm((prev) => ({ ...prev, state: selectedState.name }));
                    setErrors((prev) => ({ ...prev, state: "" }));
                  }}
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s.id} value={JSON.stringify(s)}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <ErrorText error={errors.state} />
              </Field>

              {/* City */}
              <Field label="City" required>
                {/* <select
                  className={inputClass(errors.city)}
                  value={form.city}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }));

                    setErrors((prev) => ({
                      ...prev,
                      city: "",
                    }));
                  }}
                >
                  <option value="">Select City</option>
                  {locations.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select> */}
                <AsyncSelect
                  cacheOptions
                  defaultOptions={locations.map((c) => ({
                    value: c.name,
                    label: c.name,
                  }))}
                  loadOptions={(inputValue) =>
                    loadCities(selectedStateId, inputValue)
                  }
                  value={cityOption}
                  onChange={(option) => {
                    setCityOption(option);

                    // form update
                    setForm((prev) => ({
                      ...prev,
                      city: option ? option.value : "",
                    }));

                    // error clear
                    setErrors((prev) => ({
                      ...prev,
                      city: "",
                    }));
                  }}
                  placeholder="Select City"
                  isClearable
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "14px",
                      minHeight: "48px",
                      paddingLeft: "10px",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor: "#ffffff",
                      zIndex: 9999,
                    }),
                    input: (provided) => ({
                      ...provided,
                      color: "#9ca3af",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#111827",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#9ca3af",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      color: "#111827",
                      backgroundColor: state.isFocused
                        ? "#f3f4f6"
                        : state.isSelected
                          ? "#e5e7eb"
                          : "#ffffff",
                    }),
                  }}
                />

                <ErrorText error={errors.city} />
              </Field>
            </Grid>
          </Section>

          {/* Additional Information */}
          <Section title="Additional Information" icon="">
            <Field label="About" required>
              <textarea
                className="input min-h-[120px] resize-none"
                value={form.additional_info.about_us}
                onChange={(e) => handleAdditional("about_us", e.target.value)}
                placeholder="Tell us about yourself, your teaching philosophy, and experience..."
              />

              <ErrorText error={errors.about_us} />
            </Field>

            {userType == 1 && (
              <>
                <span className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Select other subjects and grades you are interested in
                </span>
                <Grid>
                  <Field label="Subjects" required>
                    <select
                      multiple
                      className={`h-40 overflow-y-auto ${inputClass(errors.subjects)}`}
                      value={form.additional_info.subjects.map((s) =>
                        String(s.id),
                      )}
                      onChange={(e) => handleMulti(e, "subjects", subjects)}
                    >
                      {subjects.map((s) => (
                        <option key={s.id} value={s.id} className="py-2">
                          {s.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Hold Ctrl/Cmd to select multiple
                    </p>

                    <ErrorText error={errors.subjects} />
                  </Field>

                  <Field label="Grade Levels" required>
                    <select
                      multiple
                      className={`h-40 overflow-y-auto ${inputClass(errors.grade_levels)}`}
                      value={form.additional_info.grade_levels.map((g) =>
                        String(g.id),
                      )}
                      onChange={(e) => handleMulti(e, "grade_levels", grades)}
                    >
                      {grades.map((g) => (
                        <option key={g.id} value={g.id} className="py-2">
                          {g.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Hold Ctrl/Cmd to select multiple
                    </p>

                    <ErrorText error={errors.grade_levels} />
                  </Field>
                </Grid>

                <Dynamic
                  label="Achievements"
                  icon=""
                  values={form.additional_info.achievement}
                  onAdd={() => addArray("achievement")}
                  onChange={(i, v) => updateArray("achievement", i, v)}
                  onRemove={(i) => removeArray("achievement", i)}
                  placeholder="e.g., Teacher of the Year 2023"
                />

                <Dynamic
                  label="Certifications"
                  icon=""
                  values={form.additional_info.certification}
                  onAdd={() => addArray("certification")}
                  onChange={(i, v) => updateArray("certification", i, v)}
                  onRemove={(i) => removeArray("certification", i)}
                  placeholder="e.g., TEFL Certified"
                />

                <Grid>
                  <Field label="Employment Type">
                    <select
                      className="input"
                      value={form.additional_info.availability}
                      onChange={(e) =>
                        handleAdditional("availability", e.target.value)
                      }
                    >
                      <option value="">Select Employment Type</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Contract">Contract</option>
                    </select>

                    <ErrorText error={errors.availability} />
                  </Field>

                  <Field label="Notice Period">
                    <select
                      className="input"
                      value={form.additional_info.notice_period}
                      onChange={(e) =>
                        handleAdditional("notice_period", e.target.value)
                      }
                    >
                      <option value="">Select notice period</option>
                      <option value="Immediate">Immediate</option>
                      <option value="15 Days">15 Days</option>
                      <option value="30 Days">30 Days</option>
                      <option value="60 Days">60 Days</option>
                      <option value="90 Days">90 Days</option>
                    </select>

                    <ErrorText error={errors.notice_period} />
                  </Field>
                </Grid>

                {/* Min-Max Salary */}
                <Field label="Expected Salary Range (per month)" required>
                  {(() => {
                    const SALARY_RANGES = [
                      { label: "Upto 10,000", min: "0", max: "10000" },
                      { label: "10,000 - 20,000", min: "10000", max: "20000" },
                      { label: "20,000 - 30,000", min: "20000", max: "30000" },
                      { label: "30,000 - 40,000", min: "30000", max: "40000" },
                      { label: "40,000 - 50,000", min: "40000", max: "50000" },
                      { label: "50,000 - 75,000", min: "50000", max: "75000" },
                      {
                        label: "75,000 - 1,00,000",
                        min: "75000",
                        max: "100000",
                      },
                      {
                        label: "1,00,000 - 1,50,000",
                        min: "100000",
                        max: "150000",
                      },
                      { label: "Above 1,50,000", min: "150000", max: "0" },
                    ];

                    const selectedValue =
                      form.additional_info.min_salary !== undefined &&
                      form.additional_info.max_salary !== undefined
                        ? `${String(form.additional_info.min_salary ?? 0)}-${String(form.additional_info.max_salary ?? 0)}`
                        : "";

                    return (
                      <div>
                        <select
                          value={selectedValue}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (!val) {
                              handleSalaryRange("", "");
                              return;
                            }
                            const found = SALARY_RANGES.find(
                              (r) => `${r.min}-${r.max}` === val,
                            );
                            if (found) {
                              handleSalaryRange(found.min, found.max); // ✅ Ek sath set karo
                            }
                          }}
                          className={inputClass(
                            errors.min_salary || errors.max_salary,
                          )}
                        >
                          <option value="">Select Salary Range</option>
                          {SALARY_RANGES.map((r) => (
                            <option
                              key={`${r.min}-${r.max}`}
                              value={`${r.min}-${r.max}`}
                            >
                              {r.label}
                            </option>
                          ))}
                        </select>
                        <ErrorText error={errors.min_salary} />{" "}
                        <ErrorText error={errors.max_salary} />
                      </div>
                    );
                  })()}
                </Field>
              </>
            )}

            {/* Why Join Us, Students, Teachers, Website */}
            {userType == 2 && (
              <>
                <Dynamic
                  label="Why Join Us"
                  icon=""
                  values={form.additional_info.why_join_us}
                  onAdd={() => addArray("why_join_us")}
                  onChange={(i, v) => updateArray("why_join_us", i, v)}
                  onRemove={(i) => removeArray("why_join_us", i)}
                />

                {/* Students, Teachers, Website */}
                <Grid>
                  <Field label="Total No. of Students">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        name="students"
                        min="0"
                        className={inputClass(errors.students)}
                        value={form.additional_info.students}
                        onChange={(e) =>
                          handleAdditional("students", e.target.value)
                        }
                      />
                    </div>
                    <ErrorText error={errors.students} />
                  </Field>

                  <Field label="Total No. of Teachers">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        name="teachers"
                        min="0"
                        className={inputClass(errors.teachers)}
                        value={form.additional_info.teachers}
                        onChange={(e) =>
                          handleAdditional("teachers", e.target.value)
                        }
                      />
                    </div>
                    <ErrorText error={errors.teachers} />
                  </Field>

                  <Field label="Website">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        name="website"
                        min="0"
                        className={inputClass(errors.website)}
                        value={form.additional_info.website}
                        onChange={(e) =>
                          handleAdditional("website", e.target.value)
                        }
                      />
                    </div>

                    <ErrorText error={errors.website} />
                  </Field>
                </Grid>
              </>
            )}
          </Section>

          {userType == 1 && (
            <>
              <Section title="Experience" icon="" required="true">
                {form.additional_info.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-4 bg-gray-50 space-y-3 relative"
                  >
                    <h4>Experience {index + 1}</h4>
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
                          className={inputClass(errors.experience)}
                          value={exp.position}
                          onChange={(e) => {
                            const arr = [...form.additional_info.experience];
                            arr[index].position = e.target.value;
                            handleAdditional("experience", arr);
                          }}
                        />

                        <ErrorText error={errors.experience} />
                      </Field>

                      <Grid>
                        <Field label="Board">
                          <select
                            className="input"
                            value={exp.board || ""}
                            onChange={(e) => {
                              const arr = [...form.additional_info.experience];
                              arr[index].board = e.target.value;
                              arr[index].board_other = "";
                              handleAdditional("experience", arr);
                            }}
                          >
                            <option value="">Select Board</option>
                            {[
                              "CBSE",
                              "ISCE",
                              "ISC",
                              "NIOS",
                              "BSB",
                              "IB",
                              "CAIE",
                              "State Board",
                            ].map((b) => (
                              <option key={b} value={b}>
                                {b}
                              </option>
                            ))}
                            <option value="Others">Others</option>
                          </select>
                        </Field>

                        {exp.board === "Others" && (
                          <Field label="Specify Board">
                            <input
                              className="input"
                              placeholder="Enter board name"
                              value={exp.board_other || ""}
                              onChange={(e) => {
                                const arr = [
                                  ...form.additional_info.experience,
                                ];
                                arr[index].board_other = e.target.value;
                                handleAdditional("experience", arr);
                              }}
                            />
                          </Field>
                        )}
                      </Grid>

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
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <input
                          type="checkbox"
                          checked={exp.is_currently_working === true} // Strict equality
                          onChange={(e) => {
                            const arr = [...form.additional_info.experience]; // ✅ Pehle array define kar

                            if (e.target.checked) {
                              // Uncheck all others
                              arr.forEach((expItem, i) => {
                                if (i !== index) {
                                  expItem.is_currently_working = false;
                                }
                              });
                              // Check current and clear "to" date
                              arr[index].is_currently_working = true;
                              arr[index].to = "";
                            } else {
                              // Uncheck current
                              arr[index].is_currently_working = false;
                            }

                            handleAdditional("experience", arr); // ✅ Then pass it
                          }}
                          disabled={
                            isAnyCurrentlyWorking && !exp.is_currently_working
                          }
                        />
                        <label>I am currently working here</label>
                      </div>
                    </Grid>

                    <Grid>
                      <Field label="From">
                        <input
                          type="month"
                          className="input"
                          value={exp.from}
                          min={
                            index > 0
                              ? form.additional_info.experience[index - 1].to ||
                                ""
                              : ""
                          }
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
                          disabled={exp.is_currently_working}
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

                    {index === form.additional_info.experience.length - 1 &&
                      !isAnyCurrentlyWorking && (
                        <button
                          type="button"
                          onClick={() =>
                            handleAdditional("experience", [
                              ...form.additional_info.experience,
                              {
                                position: "",
                                school: "",
                                board: "",
                                board_other: "",
                                from: "",
                                to: "",
                                key_responsibilities: [""],
                                is_currently_working: false,
                              },
                            ])
                          }
                          className="text-blue-600 text-sm font-medium"
                        >
                          + Add Experience
                        </button>
                      )}

                    <ErrorText error={errors[`experience_${index}`]} />
                  </div>
                ))}
              </Section>

              <Section title="Education" icon="" required={true}>
                {form.additional_info.education.map((edu, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-4 space-y-3 bg-gray-50 relative"
                  >
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
                      <Field
                        label={
                          <div className="flex items-center gap-2">
                            <span>Degree</span>
                          </div>
                        }
                      >
                        <select
                          className={`${inputClass(errors.education)} transition focus:ring-2 focus:ring-primary/30`}
                          value={edu.degree}
                          onChange={(e) => {
                            const arr = [...form.additional_info.education];
                            arr[index].degree = e.target.value;
                            handleAdditional("education", arr);
                          }}
                        >
                          <option value="">Select Degree</option>
                          {[
                            "BA – Bachelor of Arts",
                            "MA – Master of Arts",
                            "BSc – Bachelor of Science",
                            "MSc – Master of Science",
                            "BCom – Bachelor of Commerce",
                            "MCom – Master of Commerce",
                            "BBA – Bachelor of Business Administration",
                            "MBA – Master of Business Administration",
                            "BMS – Bachelor of Management Studies",
                            "MMS – Master of Management Studies",
                            "BCA – Bachelor of Computer Applications",
                            "MCA – Master of Computer Applications",
                            "BTech – Bachelor of Technology",
                            "MTech – Master of Technology",
                            "BE – Bachelor of Engineering",
                            "ME – Master of Engineering",
                            "BEd – Bachelor of Education",
                            "MEd – Master of Education",
                            "BElEd – Bachelor of Elementary Education",
                            "LLB – Bachelor of Laws",
                            "LLM – Master of Laws",
                            "MBBS – Bachelor of Medicine & Bachelor of Surgery",
                            "MD – Doctor of Medicine",
                            "MS – Master of Surgery",
                            "BDS – Bachelor of Dental Surgery",
                            "MDS – Master of Dental Surgery",
                            "BPharm – Bachelor of Pharmacy",
                            "MPharm – Master of Pharmacy",
                            "BArch – Bachelor of Architecture",
                            "MArch – Master of Architecture",
                            "BDes – Bachelor of Design",
                            "MDes – Master of Design",
                            "BFA – Bachelor of Fine Arts",
                            "MFA – Master of Fine Arts",
                            "BHM – Bachelor of Hotel Management",
                            "MHM – Master of Hotel Management",
                            "BPEd – Bachelor of Physical Education",
                            "MPEd – Master of Physical Education",
                            "BSW – Bachelor of Social Work",
                          ].map((degree) => (
                            <option key={degree} value={degree}>
                              {degree}
                            </option>
                          ))}
                        </select>
                        <ErrorText error={errors.education} />
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
                      <div className="flex gap-4 items-center">
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
                        %
                      </div>
                    </Field>
                    <button
                      type="button"
                      onClick={() =>
                        handleAdditional("education", [
                          ...form.additional_info.education,
                          {
                            degree: "",
                            college_university: "",
                            from: "",
                            to: "",
                            percentage: "",
                          },
                        ])
                      }
                      className="text-blue-600 text-sm font-medium"
                    >
                      + Add Education
                    </button>
                    <ErrorText error={errors[`education_${index}`]} />
                  </div>
                ))}
              </Section>

              <div className="my-8">
                <Field label="Preferred Location"></Field>

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
                  placeholder="Location (e.g.,Agra)..."
                  className={inputClass(errors.preferred_location)}
                />

                <ErrorText error={errors.preferred_location} />

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
                      <div className="px-3 py-2 text-gray-500">
                        No results found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Resume */}
              <Section title="Resume" icon="">
                <Field label="Upload Resume (PDF)">
                  <input
                    type="file"
                    accept="application/pdf"
                    name="resume"
                    onChange={handleChange}
                    className="file-input"
                  />
                  {form.resume && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {form.resume.name}
                    </p>
                  )}

                  <ErrorText error={errors.resume} />
                </Field>
              </Section>
            </>
          )}

          {Object.keys(errors).length > 0 &&
            Object.values(errors).some(
              (val) =>
                val && (typeof val === "string" ? val.trim().length > 0 : true),
            ) && (
              <ErrorText error="There are some missing fields or validation failed, please check." />
            )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-2 pt-6 border-t border-gray-200">
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

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <p className="text-gray-800 text-sm mb-6">{popupMessage}</p>

            <button
              onClick={() => {
                setShowPopup(false);
                onClose(); // 👉 modal yaha close hoga
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}
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
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
);

const Section = ({ title, icon, children, required }) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-100">
      {icon && <span className="text-xl">{icon}</span>}
      <h3 className="text-lg font-semibold text-gray-800">
        {title}
        {required && <span className="text-red-500">*</span>}
      </h3>
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

const Dynamic = ({
  label,
  icon,
  values,
  onAdd,
  onChange,
  onRemove,
  placeholder,
}) => {
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
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
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
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
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

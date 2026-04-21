import { useEffect, useRef, useState } from "react";
import { ChevronRight, ChevronLeft, MapPin, Briefcase, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL =
  "https://teaching-hood-backend.netcraftglobal.com/api/job-posts?page=1&city_id=all&job_type=all&posted=any&search=&radius=0&subject_id=all&grade_id=all&state_id=all&board=all&min_salary=0&max_salary=0&limit=25&is_applied=false&sort=updated_at-desc";

const SALARY_RANGES = [
  { label: "Upto ₹10,000", min: 0, max: 10000 },
  { label: "₹10,000 - ₹20,000", min: 10000, max: 20000 },
  { label: "₹20,000 - ₹30,000", min: 20000, max: 30000 },
  { label: "₹30,000 - ₹40,000", min: 30000, max: 40000 },
  { label: "₹40,000 - ₹50,000", min: 40000, max: 50000 },
  { label: "₹50,000 - ₹75,000", min: 50000, max: 75000 },
  { label: "₹75,000 - ₹1,00,000", min: 75000, max: 100000 },
  { label: "₹1,00,000 - ₹1,50,000", min: 100000, max: 150000 },
  { label: "Above ₹1,50,000", min: 150000, max: 0 },
];

const formatSalary = (min, max) => {
  if (min === null || max === null) return "As per industry standards";
  const found = SALARY_RANGES.find(
    (r) => r.min === Number(min) && r.max === Number(max)
  );
  return found ? found.label : `₹${min} - ₹${max}`;
};

const getTimeAgo = (dateString) => {
  const diffDays = Math.ceil(
    Math.abs(new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24)
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1d ago";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
};

const getJobTitle = (job) => {
  if (job.subject_name && job.grade_name)
    return `${job.grade_name} ${job.subject_name} Teacher`;
  if (job.subject_name) return `${job.position} - ${job.subject_name}`;
  if (job.grade_name) return `${job.position} - ${job.grade_name}`;
  return job.position;
};

const JobCarousel = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data.status) {
          setJobs(data.data?.data?.slice(0, 25) || []);
        }
      } catch (e) {
        console.error("Job fetch error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <div style={styles.titleBlock}>
            <h2 style={styles.title}>Latest Jobs</h2>
            <span style={styles.subtitle}>Loading...</span>
          </div>
        </div>
        <div style={styles.skeletonRow}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={styles.skeletonCard} />
          ))}
        </div>
      </div>
    );
  }

  if (!jobs.length) return null;

  return (
    <div style={styles.wrapper}>
      <style>{`.job-scroll::-webkit-scrollbar{display:none}`}</style>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.titleBlock}>
          <h2 style={styles.title}>Latest Jobs</h2>
          <span style={styles.badge}>{jobs.length} openings</span>
        </div>

        <div style={styles.headerRight}>
          {/* Scroll buttons — hide on mobile */}
          <div style={styles.arrowGroup}>
            <button
              style={{
                ...styles.arrowBtn,
                opacity: canScrollLeft ? 1 : 0.3,
                cursor: canScrollLeft ? "pointer" : "default",
              }}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              style={{
                ...styles.arrowBtn,
                opacity: canScrollRight ? 1 : 0.3,
                cursor: canScrollRight ? "pointer" : "default",
              }}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <button
            style={styles.viewAllBtn}
            onClick={() => navigate("/find-job")}
          >
            View All <ChevronRight size={15} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="job-scroll"
        style={styles.scrollContainer}
        onScroll={updateScrollButtons}
      >
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => navigate(`/job/${job.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

const JobCard = ({ job, onClick }) => {
  const location = job.city_name
    ? `${job.city_name}${job.city?.state?.name ? `, ${job.city.state.name}` : ""}`
    : "Location N/A";

  return (
    <div style={styles.card} onClick={onClick}>
      {/* Top: icon + title + like */}
      <div style={styles.cardTop}>
        <div style={styles.iconWrap}>
          🏫
        </div>
        <div style={styles.cardTitleBlock}>
          <p style={styles.cardTitle}>{getJobTitle(job)}</p>
          <p style={styles.cardSchool}>{job.school_name}</p>
        </div>
      </div>

      {/* Board tag */}
      {job.board && (
        <span style={styles.boardBadge}>{job.board}</span>
      )}

      {/* Meta row */}
      <div style={styles.metaRow}>
        <span style={styles.metaItem}>
          <MapPin size={12} style={{ flexShrink: 0 }} />
          <span style={styles.metaText}>{location}</span>
        </span>
        <span style={styles.metaItem}>
          <Briefcase size={12} style={{ flexShrink: 0 }} />
          <span style={styles.metaText}>{job.job_type || "Full-Time"}</span>
        </span>
        <span style={styles.metaItem}>
          <Clock size={12} style={{ flexShrink: 0 }} />
          <span style={styles.metaText}>{getTimeAgo(job.created_at)}</span>
        </span>
      </div>

      {/* Salary */}
      <div style={styles.salaryRow}>
        <span style={styles.salary}>
          {formatSalary(job.min_salary, job.max_salary)}
        </span>
        <span style={styles.expTag}>
          {job.experience_required || 0} yr exp
        </span>
      </div>

      {/* Applicants */}
      <div style={styles.applicantsRow}>
        <Star size={11} color="#f59e0b" fill="#f59e0b" />
        <span style={styles.applicantsText}>
          {job.total_applicants || 0} applicant{job.total_applicants !== 1 ? "s" : ""}
        </span>
        {job.is_applied && (
          <span style={styles.appliedBadge}>Applied</span>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "20px 16px 8px",
    background: "transparent",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    gap: 8,
  },
  titleBlock: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: "#111827",
    margin: 0,
  },
  badge: {
    fontSize: 11,
    fontWeight: 600,
    background: "#eff6ff",
    color: "#2563eb",
    padding: "3px 8px",
    borderRadius: 20,
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  arrowGroup: {
    display: "flex",
    gap: 4,
  },
  arrowBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    border: "1.5px solid #e5e7eb",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#374151",
    transition: "background 0.15s",
  },
  viewAllBtn: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    fontSize: 13,
    fontWeight: 600,
    color: "#2563eb",
    background: "#eff6ff",
    border: "none",
    borderRadius: 8,
    padding: "6px 12px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  scrollContainer: {
    display: "flex",
    gap: 14,
    overflowX: "auto",
    paddingBottom: 12,
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    WebkitOverflowScrolling: "touch",
  },

  /* Card */
  card: {
    minWidth: 240,
    maxWidth: 240,
    background: "#fff",
    borderRadius: 14,
    borderTop: "4px solid #60a5fa",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
    padding: "14px 14px 12px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    flexShrink: 0,
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  cardTop: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
  },
  iconWrap: {
    width: 38,
    height: 38,
    minWidth: 38,
    background: "#eff6ff",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
  },
  cardTitleBlock: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#111827",
    margin: 0,
    lineHeight: 1.35,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  cardSchool: {
    fontSize: 12,
    color: "#3b82f6",
    margin: "2px 0 0",
    fontWeight: 500,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  boardBadge: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 600,
    background: "#fef9c3",
    color: "#854d0e",
    padding: "3px 8px",
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  metaRow: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    color: "#6b7280",
  },
  metaText: {
    fontSize: 11,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  salaryRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
    borderTop: "1px solid #f3f4f6",
    paddingTop: 8,
  },
  salary: {
    fontSize: 12,
    fontWeight: 700,
    color: "#111827",
    lineHeight: 1.2,
  },
  expTag: {
    fontSize: 10,
    fontWeight: 600,
    background: "#f0fdf4",
    color: "#166534",
    padding: "2px 7px",
    borderRadius: 20,
    whiteSpace: "nowrap",
  },
  applicantsRow: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  applicantsText: {
    fontSize: 11,
    color: "#9ca3af",
    flex: 1,
  },
  appliedBadge: {
    fontSize: 10,
    fontWeight: 600,
    background: "#fef2f2",
    color: "#dc2626",
    padding: "2px 7px",
    borderRadius: 20,
  },

  /* Skeleton */
  skeletonRow: {
    display: "flex",
    gap: 14,
    overflow: "hidden",
  },
  skeletonCard: {
    minWidth: 240,
    height: 180,
    borderRadius: 14,
    background: "#f3f4f6",
    animation: "pulse 1.5s infinite",
  },
};

export default JobCarousel;
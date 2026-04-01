import { useState, useEffect, useRef } from "react";
import { backendURL } from "../api/auth";

// ─── REUSABLE UPLOAD PANEL ────────────────────────────────────────────────────
const UploadPanel = ({
  title,
  description,
  apiEndpoint,
  fieldName = "files",
  submitLabel = "SUBMIT →",
}) => {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef();

  const addFiles = (incoming) => {
    const newFiles = Array.from(incoming).map((f) => ({
      id: Math.random().toString(36).slice(2),
      file: f,
      name: f.name,
      size: f.size,
      type: f.type || "application/octet-stream",
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    setUploadStatus(null);
  };

  const removeFile = (id) =>
    setFiles((prev) => prev.filter((f) => f.id !== id));

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const getFileIcon = (type) => {
    if (type.startsWith("image/")) return "◈";
    if (type.includes("pdf")) return "◉";
    if (type.includes("json") || type.includes("text")) return "◎";
    if (type.includes("zip") || type.includes("compressed")) return "⬡";
    return "◇";
  };

  const handleSubmit = async () => {
    if (!files.length) {
      setUploadStatus({
        type: "error",
        message: "No files selected. Please add at least one file.",
      });
      return;
    }
    setUploading(true);
    setProgress(0);
    setUploadStatus(null);

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 18, 90));
    }, 200);

    try {
      const formData = new FormData();
      files.forEach(({ file }) => formData.append(fieldName, file));

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        setUploadStatus({
          type: "success",
          message:
            `${files.length} file${files.length > 1 ? "s" : ""} submitted successfully. ${data.message || ""}`.trim(),
        });
        setFiles([]);
      } else {
        setUploadStatus({
          type: "error",
          message: `Failed: ${response.status} ${response.statusText}`,
        });
      }
    } catch (err) {
      clearInterval(progressInterval);
      setProgress(0);
      setUploadStatus({
        type: "error",
        message: `Request failed: ${err.message}`,
      });
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1200);
    }
  };

  return (
    <div style={ds.sectionWrap}>
      <div style={ds.sectionHeader}>
        <h2 style={ds.sectionTitle}>{title}</h2>
        <p style={ds.sectionDesc}>{description}</p>
      </div>

      <div style={ds.panel}>
        <div style={ds.panelTopRow}>
          <span style={ds.panelLabel}>SELECT FILES</span>
          <span style={ds.endpointBadge} title={apiEndpoint}>
            {apiEndpoint}
          </span>
        </div>

        {/* Drop zone */}
        <div
          style={{ ...ds.dropZone, ...(dragging ? ds.dropZoneActive : {}) }}
          className="drop-zone"
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={(e) => addFiles(e.target.files)}
          />
          <span style={ds.dropIcon}>{dragging ? "◎" : "⬡"}</span>
          <span style={ds.dropTitle}>
            {dragging ? "Release to add files" : "Drop files here"}
          </span>
          <span style={ds.dropSub}>or click to browse your device</span>
          <span style={ds.dropHint}>All file types accepted</span>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div style={ds.fileList}>
            <div style={ds.fileListHeader}>
              <span>
                {files.length} file{files.length > 1 ? "s" : ""} queued
              </span>
              <button style={ds.clearAllBtn} onClick={() => setFiles([])}>
                Clear all
              </button>
            </div>
            {files.map((f) => (
              <div key={f.id} style={ds.fileItem}>
                <span style={ds.fileIcon}>{getFileIcon(f.type)}</span>
                <div style={ds.fileMeta}>
                  <span style={ds.fileName}>{f.name}</span>
                  <span style={ds.fileSize}>{formatSize(f.size)}</span>
                </div>
                <button style={ds.removeBtn} onClick={() => removeFile(f.id)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Progress */}
        {uploading && (
          <div style={ds.progressWrap}>
            <div style={ds.progressTrack}>
              <div style={{ ...ds.progressBar, width: `${progress}%` }} />
            </div>
            <span style={ds.progressLabel}>{Math.round(progress)}%</span>
          </div>
        )}

        {/* Status */}
        {uploadStatus && (
          <div
            style={{
              ...ds.statusBox,
              ...(uploadStatus.type === "success"
                ? ds.statusSuccess
                : ds.statusError),
            }}
          >
            <span style={{ marginRight: 8 }}>
              {uploadStatus.type === "success" ? "✦" : "⚠"}
            </span>
            {uploadStatus.message}
          </div>
        )}

        {/* Submit button */}
        <button
          style={{
            ...ds.submitBtn,
            opacity: uploading ? 0.6 : 1,
            cursor: uploading ? "not-allowed" : "pointer",
          }}
          className="submit-btn"
          onClick={handleSubmit}
          disabled={uploading}
        >
          {uploading ? (
            <span style={ds.loadingRow}>
              <span className="spin" style={ds.spinner} />
              Uploading...
            </span>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </div>
  );
};

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
const Dashboard = ({ userEmail, onLogout }) => (
  <div style={ds.root}>
    <style>{css}</style>
    <div style={ds.gridBg} />
    <div style={ds.glowOrb1} />
    <div style={ds.glowOrb2} />

    <header style={ds.nav}>
      <div style={ds.navLeft}>
        <span style={ds.navPage}>Admin Dashboard</span>
      </div>
      <div style={ds.navRight}>
        <span style={ds.navEmail}>{userEmail}</span>
        <button style={ds.logoutBtn} onClick={onLogout} className="logout-btn">
          Sign out
        </button>
      </div>
    </header>

    <main style={ds.main} className="fade-in">
      <div style={ds.pageHeader}>
        <h1 style={ds.pageTitle}>Control Panel</h1>
        <p style={ds.pageDesc}>Manage uploads and newsletter distribution.</p>
      </div>

      <div style={ds.twoCol}>
        <UploadPanel
          title="Upload Files"
          description="Upload job data files to the update-jobs endpoint."
          apiEndpoint={backendURL() + "/api/update-jobs"}
          fieldName="files"
          submitLabel="SUBMIT FILES →"
        />

        {/* <div style={ds.colDivider} /> */}

        <UploadPanel
          title="Newsletter"
          description="Upload newsletter files to be sent via the newsletter endpoint."
          apiEndpoint={backendURL() + "/api/update-newsletters"}
          fieldName="newsletter"
          submitLabel="SEND NEWSLETTER →"
        />
      </div>
    </main>
  </div>
);

// ─── LOGIN ────────────────────────────────────────────────────────────────────
const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setIsLoading(false);
    if (email === "admin@example.com" && password === "password") {
      setIsLoggedIn(true);
    } else {
      setError("Invalid credentials. Try admin@example.com / password");
    }
  };

  if (isLoggedIn) {
    return (
      <Dashboard
        userEmail={email}
        onLogout={() => {
          setIsLoggedIn(false);
          setEmail("");
          setPassword("");
        }}
      />
    );
  }

  return (
    <div style={ls.root}>
      <style>{css}</style>
      <div style={ls.gridBg} />
      <div style={ls.glowOrb1} />
      <div style={ls.glowOrb2} />

      <div
        style={{
          ...ls.card,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div style={ls.cardHeader}>
          <div style={ls.dividerLine} />
          <h1 style={ls.heading}>Admin Portal</h1>
        </div>

        <form onSubmit={handleLogin} style={ls.form}>
          <div style={ls.fieldGroup}>
            <label style={ls.label}>EMAIL ADDRESS</label>
            <div style={ls.inputWrap}>
              <span style={ls.inputIcon}>◈</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                style={ls.input}
                className="admin-input"
              />
            </div>
          </div>
          <div style={ls.fieldGroup}>
            <label style={ls.label}>PASSWORD</label>
            <div style={ls.inputWrap}>
              <span style={ls.inputIcon}>◉</span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                style={ls.input}
                className="admin-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={ls.eyeBtn}
              >
                {showPassword ? "◐" : "◑"}
              </button>
            </div>
          </div>

          {error && (
            <div style={ls.error} className="shake">
              <span style={{ marginRight: 6 }}>⚠</span>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{ ...ls.submitBtn, opacity: isLoading ? 0.7 : 1 }}
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span style={ls.loadingRow}>
                <span className="spin" style={ls.spinner} />
                Authenticating...
              </span>
            ) : (
              "Login →"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const shared = {
  gridBg: {
    position: "fixed",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(99,240,175,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,240,175,0.03) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    pointerEvents: "none",
  },
  glowOrb1: {
    position: "fixed",
    top: "-10%",
    right: "-5%",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(99,240,175,0.08) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  glowOrb2: {
    position: "fixed",
    bottom: "-15%",
    left: "-10%",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(56,132,255,0.06) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "2px",
    padding: "13px 14px 13px 38px",
    fontSize: "13px",
    color: "#f0f4f8",
    outline: "none",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    letterSpacing: "0.03em",
    transition: "border-color 0.2s, background 0.2s",
    boxSizing: "border-box",
  },
  inputIcon: {
    position: "absolute",
    left: "14px",
    color: "rgba(99,240,175,0.4)",
    fontSize: "14px",
    pointerEvents: "none",
    zIndex: 1,
  },
  inputWrap: { position: "relative", display: "flex", alignItems: "center" },
  label: {
    fontSize: "10px",
    letterSpacing: "0.15em",
    color: "rgba(99,240,175,0.6)",
    fontWeight: "600",
  },
  submitBtn: {
    background: "linear-gradient(135deg, #63f0af 0%, #3dd68c 100%)",
    border: "none",
    borderRadius: "2px",
    padding: "14px 20px",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.12em",
    color: "#080b12",
    cursor: "pointer",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    marginTop: "4px",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  loadingRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  spinner: {
    width: "14px",
    height: "14px",
    border: "2px solid rgba(8,11,18,0.3)",
    borderTopColor: "#080b12",
    borderRadius: "50%",
    display: "inline-block",
  },
};

const ls = {
  root: {
    minHeight: "100vh",
    background: "#080b12",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    position: "relative",
    overflow: "hidden",
    padding: "24px",
  },
  gridBg: shared.gridBg,
  glowOrb1: shared.glowOrb1,
  glowOrb2: shared.glowOrb2,
  card: {
    width: "100%",
    maxWidth: "440px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(99,240,175,0.15)",
    borderRadius: "2px",
    padding: "48px 44px",
    position: "relative",
    backdropFilter: "blur(12px)",
    boxShadow: "0 0 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
  },
  cardHeader: { marginBottom: "36px" },
  dividerLine: {
    height: "1px",
    background: "linear-gradient(90deg, rgba(99,240,175,0.4), transparent)",
    marginBottom: "20px",
  },
  heading: {
    margin: "0 0 8px",
    fontSize: "26px",
    fontWeight: "700",
    color: "#f0f4f8",
    letterSpacing: "-0.02em",
    fontFamily: "'DM Mono', monospace",
  },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  fieldGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: shared.label,
  inputWrap: shared.inputWrap,
  inputIcon: shared.inputIcon,
  input: shared.input,
  eyeBtn: {
    position: "absolute",
    right: "12px",
    background: "none",
    border: "none",
    color: "rgba(240,244,248,0.3)",
    cursor: "pointer",
    fontSize: "16px",
    padding: "4px",
    lineHeight: 1,
  },
  error: {
    background: "rgba(255,80,80,0.08)",
    border: "1px solid rgba(255,80,80,0.2)",
    borderRadius: "2px",
    padding: "10px 14px",
    fontSize: "12px",
    color: "#ff7070",
    letterSpacing: "0.02em",
  },
  submitBtn: shared.submitBtn,
  loadingRow: shared.loadingRow,
  spinner: shared.spinner,
};

const ds = {
  root: {
    minHeight: "100vh",
    background: "#080b12",
    fontFamily: "'DM Mono', 'Courier New', monospace",
    position: "relative",
  },
  gridBg: shared.gridBg,
  glowOrb1: shared.glowOrb1,
  glowOrb2: shared.glowOrb2,
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
    height: "56px",
    background: "rgba(8,11,18,0.9)",
    borderBottom: "1px solid rgba(99,240,175,0.1)",
    backdropFilter: "blur(12px)",
  },
  navLeft: { display: "flex", alignItems: "center", gap: "10px" },
  navPage: {
    fontSize: "11px",
    color: "rgba(240,244,248,0.4)",
    letterSpacing: "0.1em",
  },
  navRight: { display: "flex", alignItems: "center", gap: "16px" },
  navEmail: { fontSize: "11px", color: "rgba(240,244,248,0.35)" },
  logoutBtn: {
    background: "none",
    border: "1px solid rgba(240,244,248,0.1)",
    borderRadius: "2px",
    color: "rgba(240,244,248,0.4)",
    fontSize: "10px",
    letterSpacing: "0.12em",
    padding: "6px 14px",
    cursor: "pointer",
    fontFamily: "'DM Mono', monospace",
    textTransform: "uppercase",
  },
  main: { maxWidth: "1200px", margin: "0 auto", padding: "48px 32px" },
  pageHeader: { marginBottom: "40px" },
  pageTitle: {
    margin: "0 0 8px",
    fontSize: "28px",
    fontWeight: "700",
    color: "#f0f4f8",
    letterSpacing: "-0.02em",
  },
  pageDesc: {
    margin: 0,
    fontSize: "12px",
    color: "rgba(240,244,248,0.35)",
    letterSpacing: "0.06em",
  },
  twoCol: {
    // display: "grid",
    // gridTemplateColumns: "1fr 1px 1fr",
    gap: "20px 40px",
    alignItems: "start",
    display: "flex",
     flexWrap: "wrap",
  },
  colDivider: {
    width: "1px",
    background:
      "linear-gradient(to bottom, transparent, rgba(99,240,175,0.12) 20%, rgba(99,240,175,0.12) 80%, transparent)",
    alignSelf: "stretch",
    minHeight: "400px",
  },
  sectionWrap: { display: "flex", flexDirection: "column", gap: "20px" },
  sectionHeader: {
    paddingBottom: "16px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  sectionTitle: {
    margin: "0 0 6px",
    fontSize: "18px",
    fontWeight: "700",
    color: "#f0f4f8",
    letterSpacing: "-0.01em",
  },
  sectionDesc: {
    margin: 0,
    fontSize: "11px",
    color: "rgba(240,244,248,0.3)",
    letterSpacing: "0.04em",
    lineHeight: 1.6,
  },
  panel: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "2px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  panelTopRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    flexWrap: "wrap",
  },
  panelLabel: {
    fontSize: "10px",
    letterSpacing: "0.18em",
    color: "rgba(99,240,175,0.5)",
    fontWeight: "600",
  },
  endpointBadge: {
    fontSize: "10px",
    color: "rgba(240,244,248,0.2)",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "2px",
    padding: "3px 8px",
    maxWidth: "220px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  dropZone: {
    border: "1px dashed rgba(99,240,175,0.2)",
    borderRadius: "2px",
    padding: "32px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "7px",
    cursor: "pointer",
    transition: "all 0.2s",
    background: "rgba(255,255,255,0.01)",
  },
  dropZoneActive: {
    borderColor: "rgba(99,240,175,0.6)",
    background: "rgba(99,240,175,0.04)",
  },
  dropIcon: {
    fontSize: "26px",
    color: "rgba(99,240,175,0.4)",
    lineHeight: 1,
    marginBottom: "2px",
  },
  dropTitle: { fontSize: "13px", color: "#f0f4f8", fontWeight: "600" },
  dropSub: { fontSize: "11px", color: "rgba(240,244,248,0.35)" },
  dropHint: {
    fontSize: "10px",
    color: "rgba(240,244,248,0.2)",
    letterSpacing: "0.08em",
    marginTop: "2px",
  },
  fileList: { display: "flex", flexDirection: "column" },
  fileListHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "10px",
    color: "rgba(240,244,248,0.35)",
    letterSpacing: "0.1em",
    marginBottom: "10px",
  },
  clearAllBtn: {
    background: "none",
    border: "none",
    color: "rgba(255,100,100,0.5)",
    fontSize: "10px",
    cursor: "pointer",
    fontFamily: "inherit",
    letterSpacing: "0.08em",
    padding: 0,
  },
  fileItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "9px 0",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  fileIcon: { fontSize: "14px", color: "rgba(99,240,175,0.5)", flexShrink: 0 },
  fileMeta: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  fileName: {
    fontSize: "12px",
    color: "#f0f4f8",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  fileSize: { fontSize: "10px", color: "rgba(240,244,248,0.3)" },
  removeBtn: {
    background: "none",
    border: "none",
    color: "rgba(240,244,248,0.25)",
    cursor: "pointer",
    fontSize: "11px",
    flexShrink: 0,
    padding: "4px",
    lineHeight: 1,
  },
  progressWrap: { display: "flex", alignItems: "center", gap: "12px" },
  progressTrack: {
    flex: 1,
    height: "3px",
    background: "rgba(255,255,255,0.06)",
    borderRadius: "2px",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg, #63f0af, #3dd68c)",
    transition: "width 0.3s ease",
    borderRadius: "2px",
  },
  progressLabel: {
    fontSize: "10px",
    color: "rgba(99,240,175,0.6)",
    width: "30px",
    textAlign: "right",
  },
  statusBox: {
    borderRadius: "2px",
    padding: "10px 14px",
    fontSize: "12px",
    letterSpacing: "0.02em",
    display: "flex",
    alignItems: "flex-start",
  },
  statusSuccess: {
    background: "rgba(99,240,175,0.07)",
    border: "1px solid rgba(99,240,175,0.2)",
    color: "#63f0af",
  },
  statusError: {
    background: "rgba(255,80,80,0.07)",
    border: "1px solid rgba(255,80,80,0.2)",
    color: "#ff7070",
  },
  submitBtn: { ...shared.submitBtn, marginTop: "2px" },
  loadingRow: shared.loadingRow,
  spinner: shared.spinner,
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;600&display=swap');
  * { box-sizing: border-box; }

  .admin-input:focus {
    border-color: rgba(99, 240, 175, 0.4) !important;
    background: rgba(99, 240, 175, 0.04) !important;
  }
  .admin-input::placeholder { color: rgba(240,244,248,0.18); }

  .drop-zone:hover {
    border-color: rgba(99, 240, 175, 0.35) !important;
    background: rgba(99, 240, 175, 0.02) !important;
  }

  .submit-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(99,240,175,0.25);
  }
  .submit-btn:active:not(:disabled) { transform: translateY(0); }

  .logout-btn:hover {
    border-color: rgba(240,244,248,0.25) !important;
    color: rgba(240,244,248,0.7) !important;
  }

  @keyframes spin { to { transform: rotate(360deg); } }
  .spin { animation: spin 0.7s linear infinite; }

  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%,60%  { transform: translateX(-5px); }
    40%,80%  { transform: translateX(5px); }
  }
  .shake { animation: shake 0.4s ease; }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-in { animation: fadeIn 0.55s ease forwards; }

  @media (max-width: 768px) {
    .two-col { grid-template-columns: 1fr !important; }
  }
`;

export default Admin;

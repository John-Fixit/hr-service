# LMS Dashboard – Suggested Sections & Data Requirements

Sections marked **Suggested** in the admin dashboard can be wired to real data using the following API/data ideas, based on the current LMS data architecture.

---

## 1. Recent Completions (`RecentCompletionsSuggested`)

**What it shows:** Latest course or lesson completions across the organization (who completed what and when).

**Suggested API:**  
- **Endpoint (example):** `GET /course/get-recent-completions` or derived from lesson-recipient logs.  
- **Query params (optional):** `?limit=10&org_id=...`

**Suggested response shape:**

```json
[
  {
    "STAFF_ID": "string",
    "STAFF_NAME": "string",
    "COURSE_ID": "string",
    "COURSE_TITLE": "string",
    "COMPLETED_AT": "ISO date",
    "PROGRESS_PERCENT": 100
  }
]
```

**Data source (if no dedicated endpoint):**  
Aggregate from lesson-recipient completion records (e.g. `update_type = completed`), join with `course` and `staff` to get titles and names, order by `COMPLETED_AT` desc.

---

## 2. Other possible suggested sections (for later)

| Section idea        | Purpose                         | Possible data source / API |
|--------------------|----------------------------------|-----------------------------|
| **Certifications** | Certificates or badges issued   | New table or API: certifications per staff/course. |
| **Learning streak**| Active days / streak per user   | Count distinct dates of lesson completion per staff. |
| **Low engagement** | Courses with few completions    | Use `get-creator-dashboard-charts` (TOTAL_RECIPIENTS_COMPLETED) or similar; flag courses below a threshold. |

---

## Existing LMS APIs (reference)

- `get-all-courses` – all courses (admin).
- `get-courses-by-staff-id/:staffId` – courses for a staff (assigned + progress).
- `get-courses-by-creator` – courses created by a creator.
- `get-creator-dashboard-charts` – chart data (e.g. course vs respondents).
- `get-creator-popular-courses` – popular courses by category.
- `get-creator-courses-lesson-summary` – lesson/course summary for creator.

Use these to drive existing widgets; add new endpoints or aggregates for **Suggested** sections as above.

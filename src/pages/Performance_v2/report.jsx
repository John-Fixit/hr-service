// PerformanceReport.jsx
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // or your router
import {
  Breadcrumbs,
  BreadcrumbItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Chip,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  Home,
  ChevronRight,
  FileText,
  Download,
  Eye,
  MoreVertical,
  Plus,
} from "lucide-react";
import { Drawer } from "antd";
import IndividualPerformanceReport from "./individual-performance";
import TeamPerformanceReport from "./TeamPerformanceReport";

/* ------------------------------------------------------------------ */
/*  Fake data – 42 rows so pagination is visible                      */
/* ------------------------------------------------------------------ */
const makeReports = () => {
  const cycles = [
    "H1 2024",
    "H2 2024",
    "Q1 2024",
    "Q2 2024",
    "Q3 2024",
    "Q4 2024",
  ];
  const depts = [
    "Engineering",
    "Sales",
    "Marketing",
    "HR",
    "Finance",
    "Operations",
  ];
  const statuses = ["Completed", "In-Progress", "Pending"];
  const rows = [];
  for (let i = 1; i <= 42; i++) {
    rows.push({
      id: i,
      title: `${cycles[i % cycles.length]} Performance Report – ${
        depts[i % depts.length]
      }`,
      cycle: cycles[i % cycles.length],
      department: depts[i % depts.length],
      generatedOn: `2024-${String(1 + (i % 11)).padStart(2, "0")}-${String(
        1 + (i % 27)
      ).padStart(2, "0")}`,
      generatedBy: ["Sarah J.", "Mike C.", "Emma W."][i % 3],
      status: statuses[i % 3],
      employees: 10 + (i % 40),
      pdfUrl: "#",
    });
  }
  return rows;
};

const statusColor = {
  Completed: "success",
  "In-Progress": "warning",
  Pending: "default",
};

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */
const PerformanceReport = () => {
  const [reports] = useState(makeReports());
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "generatedOn",
    direction: "descending",
  });
  const rowsPerPage = 8;

  /* sorting --------------------------------------------------------- */
  const sorted = useMemo(() => {
    return [...reports].sort((a, b) => {
      const aa = a[sortDescriptor.column];
      const bb = b[sortDescriptor.column];
      let cmp = 0;
      if (aa > bb) cmp = 1;
      else if (aa < bb) cmp = -1;
      return sortDescriptor.direction === "ascending" ? cmp : -cmp;
    });
  }, [reports, sortDescriptor]);

  /* pagination ------------------------------------------------------ */
  const pages = Math.ceil(sorted.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sorted.slice(start, start + rowsPerPage);
  }, [page, sorted]);

  return (
    <div className="min-h-screen  p-6">
      {/* Breadcrumb -------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Breadcrumbs
          size="md"
          separator={<ChevronRight size={16} className="text-gray-400" />}
        >
          <BreadcrumbItem
            href="/performance/dashboard"
            startContent={<Home size={16} />}
          >
            Home
          </BreadcrumbItem>
          <BreadcrumbItem href="/performance/reports">Reports</BreadcrumbItem>
        </Breadcrumbs>
      </motion.div>
      {
        // {/* Header ------------------------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Performance Reports
              </h1>
              <p className="text-gray-600">
                Generated review cycles ready for download or preview
              </p>
            </div>
            {/* <Button
              as={Link}
              to="#"
              color="primary"
              startContent={<Plus size={20} />}
            >
              Generate Report
            </Button> */}
          </div>
        </motion.div>
        // {/* Responsive table ------------------------------------------- */}
        // <motion.div
        //   initial={{ opacity: 0 }}
        //   animate={{ opacity: 1 }}
        //   transition={{ duration: 0.4 }}
        // >
        //   <Table
        //     isHeaderSticky
        //     aria-label="Performance reports"
        //     sortDescriptor={sortDescriptor}
        //     onSortChange={setSortDescriptor}
        //     classNames={{ wrapper: 'shadow-lg rounded-xl max-h-[calc(100vh-280px)]' }}
        //     bottomContent={
        //       pages > 1 && (
        //         <div className="flex w-full justify-center py-4">
        //           <Pagination
        //             isCompact
        //             showControls
        //             color="primary"
        //             page={page}
        //             total={pages}
        //             onChange={setPage}
        //           />
        //         </div>
        //       )
        //     }
        //   >
        //     <TableHeader>
        //       <TableColumn key="title" allowsSorting>Report Title</TableColumn>
        //       <TableColumn key="cycle" allowsSorting>Cycle</TableColumn>
        //       <TableColumn key="department" allowsSorting>Department</TableColumn>
        //       <TableColumn key="generatedOn" allowsSorting>Generated On</TableColumn>
        //       <TableColumn key="generatedBy">Generated By</TableColumn>
        //       <TableColumn key="employees" allowsSorting className="text-center">Employees</TableColumn>
        //       <TableColumn key="status">Status</TableColumn>
        //       <TableColumn width={50}>Actions</TableColumn>
        //     </TableHeader>
        //     <TableBody items={items}>
        //       {(r) => (
        //         <TableRow key={r.id} className="hover:bg-blue-50 transition-colors">
        //           <TableCell>
        //             <div className="flex items-center gap-3">
        //               <FileText size={20} className="text-blue-600" />
        //               <span className="font-semibold text-gray-900">{r.title}</span>
        //             </div>
        //           </TableCell>
        //           <TableCell>{r.cycle}</TableCell>
        //           <TableCell>{r.department}</TableCell>
        //           <TableCell>
        //             {new Date(r.generatedOn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        //           </TableCell>
        //           <TableCell>{r.generatedBy}</TableCell>
        //           <TableCell className="text-center">{r.employees}</TableCell>
        //           <TableCell>
        //             <Chip size="sm" variant="flat" color={statusColor[r.status]}>{r.status}</Chip>
        //           </TableCell>
        //           <TableCell>
        //             <Dropdown>
        //               <DropdownTrigger>
        //                 <Button isIconOnly size="sm" variant="light">
        //                   <MoreVertical size={18} className="text-gray-600" />
        //                 </Button>
        //               </DropdownTrigger>
        //               <DropdownMenu aria-label="Report actions">
        //                 <DropdownItem key="view" startContent={<Eye size={16} />}>Preview</DropdownItem>
        //                 <DropdownItem key="download" startContent={<Download size={16} />}>Download PDF</DropdownItem>
        //               </DropdownMenu>
        //             </Dropdown>
        //           </TableCell>
        //         </TableRow>
        //       )}
        //     </TableBody>
        //   </Table>
        // </motion.div>
      }

      <PerformanceReportsMenu />
    </div>
  );
};

export default PerformanceReport;

function PerformanceReportsMenu() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const components = {
    "Individual Performance Report": <IndividualPerformanceReport />,
    "Team Performance Summary": <TeamPerformanceReport />,
    // "Departmental Performance Report": <DepartmentalPerformanceReport,
    // "Company-Wide Performance Report": CompanyPerformanceReport,
    // "Rating Distribution Report": RatingDistributionReport,
    // "Goal Progress Over Time": GoalProgressOverTime,
    // "Goal Alignment Report": GoalAlignmentReport,
    // "Feedback Activity Report": FeedbackActivityReport,
    // "360° Feedback Summary": FeedbackSummary,
    // "Pending Review Report": PendingReviewReport,
    // "Late Review Report": LateReviewReport,
    // "Review Completion Status Report": ReviewCompletionStatusReport,
  };

  const handleItemClick = (item) => {
    console.log(item);
    setSelectedItem(item);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-16">
          {/* Left Column */}
          <div>
            {/* Section 1 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-6">
                1. Performance Evaluation Reports
              </h2>
              <div className="space-y-3">
                {[
                  "Individual Performance Report",
                  "Team Performance Summary",
                  "Departmental Performance Report",
                  "Company-Wide Performance Report",
                  "Rating Distribution Report",
                ].map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleItemClick(item)}
                    className="text-gray-700 text-lg cursor-pointer hover:text-teal-600 hover:translate-x-2 transition-all duration-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">
                2. Goal and KPI Reports
              </h2>
              <div className="space-y-3">
                {[
                  "Goal Achievement Report",
                  "KPI Performance Report",
                  "Goal Alignment Report",
                  "Goal Progress Over Time",
                ].map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleItemClick(item)}
                    className="text-gray-700 text-lg cursor-pointer hover:text-teal-600 hover:translate-x-2 transition-all duration-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Section 3 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-6">
                3. Feedback and Engagement Reports
              </h2>
              <div className="space-y-3">
                {["Feedback Activity Report", "360° Feedback Summary"].map(
                  (item, index) => (
                    <div
                      key={index}
                      onClick={() => handleItemClick(item)}
                      className="text-gray-700 text-lg cursor-pointer hover:text-teal-600 hover:translate-x-2 transition-all duration-200"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">
                4. Appraisal and Review Cycle Reports
              </h2>
              <div className="space-y-3">
                {[
                  "Review Completion Status Report",
                  "Pending Review Report",
                  "Late Review Report",
                ].map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleItemClick(item)}
                    className="text-gray-700 text-lg cursor-pointer hover:text-teal-600 hover:translate-x-2 transition-all duration-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Drawer
          open={openDrawer}
          maskClosable={false}
          width={"1500px"}
          onClose={handleCloseDrawer}
        >
          {components?.[selectedItem]}
        </Drawer>
      </div>
    </div>
  );
}

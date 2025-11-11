/* ------------------------------------------------------------------ */
/*  1.  Imports                                                       */
/* ------------------------------------------------------------------ */
import  { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
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
  DropdownItem
} from '@nextui-org/react';
import {
  Plus,
  FileText,
  Calendar,
  Edit,
  Trash2,
  Copy,
  MoreVertical
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  2.  Dummy data – 26 rows so pagination is visible                 */
/* ------------------------------------------------------------------ */
const makeTemplates = () => {
  const base = [
    { name: 'Annual Performance Review', desc: 'Comprehensive yearly performance evaluation' },
    { name: 'Quarterly Check-in', desc: 'Quick quarterly performance assessment' },
    { name: 'Probation Review', desc: 'New employee probation period evaluation' },
    { name: '360-Degree Feedback', desc: 'Multi-rater comprehensive feedback template' },
    { name: 'Leadership Assessment', desc: 'Management and leadership skills evaluation' },
    { name: 'Sales Team Review', desc: 'Sales performance and target achievement review' }
  ];
  const creators = ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim'];
  const statuses = ['Active', 'Draft'];

  const rows = [];
  for (let i = 0; i < 26; i++) {
    const b = base[i % base.length];
    rows.push({
      id: i + 1,
      name: `${b.name} ${i > 5 ? i : ''}`.trim(),
      description: b.desc,
      sections: 4 + (i % 5),
      questions: 10 + (i % 20),
      createdBy: creators[i % creators.length],
      createdDate: `2024-${String(1 + (i % 11)).padStart(2, '0')}-${String(1 + (i % 27)).padStart(2, '0')}`,
      lastModified: `2024-${String(1 + (i % 11)).padStart(2, '0')}-${String(1 + (i % 27)).padStart(2, '0')}`,
      status: statuses[i % statuses.length],
      usageCount: 10 + i * 3
    });
  }
  return rows;
};

/* ------------------------------------------------------------------ */
/*  3.  Component                                                     */
/* ------------------------------------------------------------------ */
const PerformanceTemplate = () => {
  const [templates] = useState(makeTemplates());
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState({ column: 'name', direction: 'ascending' });
  const rowsPerPage = 7;

  /* ------------- sorting ----------------------------------------- */
  const sorted = useMemo(() => {
    const sorted = [...templates].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      let cmp = 0;
      if (first > second) cmp = 1;
      else if (first < second) cmp = -1;
      return sortDescriptor.direction === 'ascending' ? cmp : -cmp;
    });
    return sorted;
  }, [templates, sortDescriptor]);

  /* ------------- pagination -------------------------------------- */
  const pages = Math.ceil(sorted.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sorted.slice(start, start + rowsPerPage);
  }, [page, sorted]);

  /* ------------- tiny helpers ------------------------------------ */
  const statusColorMap = {
    Active: 'success',
    Draft: 'default'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br pt-6 ">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Performance Templates</h1>
            <p className="text-gray-600">Manage and create performance review templates</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-5 py-3 bg-white text-gray-700 rounded-lg font-medium shadow-md hover:shadow-lg transition-all border border-gray-200"
            >
              <Calendar size={20} />
              Create Cycle
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-lg hover:bg-blue-700 transition-all"
            >
              <Plus size={20} />
              Create Template
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* -------------- NextUI responsive table ----------------------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Table
          aria-label="Performance templates"
          isHeaderSticky
          classNames={{ wrapper: 'max-h-[calc(100vh-280px)] shadow-lg rounded-xl' }}
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          bottomContent={
            pages > 1 && (
              <div className="flex w-full justify-center py-4">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={(p) => setPage(p)}
                />
              </div>
            )
          }
        >
          <TableHeader>
            <TableColumn key="name" allowsSorting>Template Name</TableColumn>
            <TableColumn key="description">Description</TableColumn>
            <TableColumn key="sections" allowsSorting className="text-center">Sections</TableColumn>
            <TableColumn key="questions" allowsSorting className="text-center">Questions</TableColumn>
            <TableColumn key="createdBy">Created By</TableColumn>
            <TableColumn key="lastModified" allowsSorting>Last Modified</TableColumn>
            <TableColumn key="status">Status</TableColumn>
            <TableColumn key="usageCount" allowsSorting className="text-center">Used</TableColumn>
            <TableColumn width={50}>Actions</TableColumn>
          </TableHeader>

          <TableBody items={items} >
            {(item) => (
              <TableRow key={item.id} className="hover:bg-blue-50 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="text-blue-600" size={20} />
                    </div>
                    <span className="font-semibold text-gray-900">{item.name}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="text-sm text-gray-600 max-w-xs truncate">{item.description}</span>
                </TableCell>

                <TableCell className="text-center">{item.sections}</TableCell>
                <TableCell className="text-center">{item.questions}</TableCell>

                <TableCell>{item.createdBy}</TableCell>

                <TableCell>
                  {new Date(item.lastModified).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </TableCell>

                <TableCell>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={statusColorMap[item.status]}
                  >
                    {item.status}
                  </Chip>
                </TableCell>

                <TableCell className="text-center">{item.usageCount}×</TableCell>

                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="light">
                        <MoreVertical size={18} className="text-gray-600" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Actions">
                      <DropdownItem key="edit" startContent={<Edit size={16} />}>Edit</DropdownItem>
                      <DropdownItem key="duplicate" startContent={<Copy size={16} />}>Duplicate</DropdownItem>
                      <DropdownItem key="delete" className="text-danger" startContent={<Trash2 size={16} />}>Delete</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
};

export default PerformanceTemplate;
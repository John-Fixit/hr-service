/* ------------------------------------------------------------------ */
/*  1.  Imports                                                       */
/* ------------------------------------------------------------------ */
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { useGetCycleList } from "../../API/performance";
import useCurrentUser from "../../hooks/useCurrentUser";
import { GiCycle } from "react-icons/gi";
import { BiSolidMessageSquare } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import ViewCycle from "./ViewCycle";

/* ------------------------------------------------------------------ */
/*  3.  Component                                                     */
/* ------------------------------------------------------------------ */
const PerformanceCycle = () => {
  //   const [cycleList] = useState(makeTemplates());
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });
  const rowsPerPage = 20;

  const { userData } = useCurrentUser();

  const [cycleAction, setCycleAction] = useState({
    state: false,
    cycle: null,
    type: null,
  });

  const { data: getTemplates, isPending: isLoadingCycles } = useGetCycleList({
    company_id: userData?.data?.COMPANY_ID,
  });

  const cycleList = useMemo(
    () =>
      getTemplates?.map((tmpt) => ({
        ...tmpt,
        title: tmpt?.TITLE,
        id: tmpt?.ID,
      })) || [],
    [getTemplates]
  );

  console.log(cycleList);

  /* ------------- sorting ----------------------------------------- */
  const sorted = useMemo(() => {
    const sorted = [...cycleList].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      let cmp = 0;
      if (first > second) cmp = 1;
      else if (first < second) cmp = -1;
      return sortDescriptor.direction === "ascending" ? cmp : -cmp;
    });
    return sorted;
  }, [cycleList, sortDescriptor]);

  /* ------------- pagination -------------------------------------- */
  const pages = Math.ceil(sorted.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sorted.slice(start, start + rowsPerPage);
  }, [page, sorted]);

  const handleOpenCycleAction = (type, cycle) => {
    setCycleAction({ state: true, cycle: cycle, type: type });
  };

  const closeCycleAction = () => {
    setCycleAction({ state: false, cycle: null, type: null });
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Performance Cycle
            </h1>
            <p className="text-gray-600">
              Manage and create performance review cycleList
            </p>
          </div>
          <div className="flex gap-3">
            {/* <motion.button
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
            </motion.button> */}
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
          aria-label="Performance cycleList"
          isHeaderSticky
          classNames={{
            wrapper: "max-h-[calc(100vh-280px)] shadow-lg rounded-xl",
          }}
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
            <TableColumn key="name" allowsSorting>
              Cycle Title
            </TableColumn>
            <TableColumn key="description">Destination</TableColumn>
            <TableColumn key="sections" allowsSorting className="text-center">
              Start Date
            </TableColumn>
            <TableColumn key="questions" allowsSorting className="text-center">
              End Date
            </TableColumn>
            <TableColumn key="createdBy">Created By</TableColumn>
            <TableColumn key="lastModified" allowsSorting>
              Date Created
            </TableColumn>

            <TableColumn width={50}>Actions</TableColumn>
          </TableHeader>

          <TableBody
            items={items}
            loadingContent={<Spinner />}
            loadingState={isLoadingCycles}
          >
            {(item) => (
              <TableRow
                key={item.id}
                className="hover:bg-blue-50 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <GiCycle className="text-primary/80" size={20} />
                    </div>
                    <span className="font-semibold text-gray-900">
                      {item?.TITLE}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="">{item?.RECIPIENT_TYPE}</TableCell>

                <TableCell className="text-center">
                  {new Date(item?.START_DATE).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-center">
                  {new Date(item?.END_DATE).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell className="">
                  {item?.FIRST_NAME} {item?.LAST_NAME}
                </TableCell>

                <TableCell>
                  {new Date(item?.DATE_CREATED).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>

                <TableCell>
                  <div className="flex gap-2 items-center">
                    <div
                      className="hover:bg-gray-200/50 p-1 rounded-lg transition-all duration-100 cursor-pointer"
                      onClick={() =>
                        handleOpenCycleAction("VIEW_RECIPIENT", item)
                      }
                    >
                      <FaUsers size={21} className="text-[#14B8A6]" />
                    </div>
                    <div
                      className="hover:bg-gray-200/50 p-1 rounded-lg transition-all duration-100 cursor-pointer"
                      onClick={() =>
                        handleOpenCycleAction("VIEW_RESPONSE", item)
                      }
                    >
                      <BiSolidMessageSquare
                        size={21}
                        className="text-[#092035]"
                      />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>

      <ViewCycle
        isOpenViewTemplate={cycleAction.state}
        closeViewTemplate={closeCycleAction}
        cycle={cycleAction.cycle}
        actionType={cycleAction.type}
      />
    </div>
  );
};

export default PerformanceCycle;

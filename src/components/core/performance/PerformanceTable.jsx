import {
  cn,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import ActionIcons from "../shared/ActionIcons";
import moment from "moment";
import PropTypes from "prop-types";
import StarLoader from "../loaders/StarLoader";

const PerformanceTable = ({
  tableData,
  handleViewAper,
  tableStatus,
  viewIndex,
  isPending,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;
  const pages = useMemo(() => {
    return Math.ceil(tableData?.length / rowsPerPage) || null; // total divided by row-per-page
  }, [tableData]);

  const tableHead = [
    {
      name: "START DATE",
      key: "date_from",
      isDate: true,
    },
    {
      name: "END DATE",
      key: "date_to",
      isDate: true,
    },
    tableStatus !== "pending" && {
      name: "AVERAGE SCORE",
      key: "average_score",
      isNumber: true,
    },
    {
      name: "ACTION",
      key: "action",
    },
  ]?.filter(Boolean);

  return (
    <div>
      <Table
        aria-label="Attendance Table"
        isHeaderSticky
        isStriped
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <TableHeader>
          {tableHead?.map((head, index) => (
            <TableColumn key={index + "_____table_head"}>
              {head?.name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          emptyContent={
            <div className="flex items-center justify-center text-2xl">
              {" "}
              Empty data
            </div>
          }
        >
          {tableData?.map((record, i) => (
            <TableRow key={i}>
              {tableHead?.map((head, index) => (
                <TableCell
                  key={index + "_____table_head"}
                  align={head?.key === "action" && "center"}
                  className={cn("text-default-500")}
                >
                  {head?.isDate ? (
                    moment(record?.[head?.key]).format("DD MMM YYYY")
                  ) : head?.isNumber ? (
                    record?.[head?.key]?.toFixed(2)
                  ) : head?.key === "action" ? (
                    <div className="flex ">
                      <div className="pl-4 flex items-center">
                        {viewIndex === i && isPending ? (
                          <StarLoader size={20} />
                        ) : record?.status === "draft" ? (
                          <ActionIcons
                            variant={"EDIT"}
                            action={() =>
                              handleViewAper({ ...record, is_draft: 1 }, i)
                            }
                          />
                        ) : (
                          <ActionIcons
                            variant={"VIEW"}
                            action={() => handleViewAper(record, i)}
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    record?.[head?.key]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex mt-4">
        <Pagination
          total={pages}
          initialPage={1}
          page={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

PerformanceTable.propTypes = {
  tableData: PropTypes.array,
  handleViewAper: PropTypes.func,
  tableStatus: PropTypes.string,
  viewIndex: PropTypes.number,
  isPending: PropTypes.bool,
};

export default PerformanceTable;

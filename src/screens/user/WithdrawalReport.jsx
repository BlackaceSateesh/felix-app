/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const WithdrawalReport = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const report = userInfo?.withdrawal;
  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const [amounts, setAmounts] = useState({
    totalAmount: 0,
    paidAmount: 0,
    rejectAmount: 0,
  });

  useEffect(() => {
    let totalAmount = 0;
    let paidAmount = 0; 
    let rejectAmount = 0;
    if (report) {
      report.forEach((item) => {
        totalAmount += item.amount;
        if (item.status === "Confirm") {
          paidAmount += item.amount;
        } else if (item.status === "Reject") {
          rejectAmount += item.amount;
        }
      });
    }
    setAmounts({ totalAmount, paidAmount, rejectAmount });
  }, [report]);
  console.log(amounts)

  return (
    <>
      <div className="WithdrawalReport martop">
        <div className="top-wrapper">
          <div className="ss-card">
            <div className="txt">
              <h5 className="heading">Total Withdrawal</h5>
              <p className="para1">${ amounts?.totalAmount?.toFixed(2)}</p>
            </div>
            <div className="icon">
              <img
                src="https://img.icons8.com/3d-fluency/94/money-bag.png"
                alt=""
              />
            </div>
          </div>
          <div className="ss-card">
            <div className="txt">
              <h5 className="heading">Paid Withdrawal</h5>
              <p className="para1">$ {amounts?.paidAmount?.toFixed(2)}</p>
            </div>
            <div className="icon">
              <img
                src="https://img.icons8.com/3d-fluency/94/approval.png"
                alt=""
              />
            </div>
          </div>
          <div className="ss-card">
            <div className="txt">
              <h5 className="heading">Reject Withdrawal</h5>
              <p className="para1">$ {amounts?.rejectAmount?.toFixed(2)}</p>
            </div>
            <div className="icon">
              <img
                src="https://img.icons8.com/3d-fluency/94/cancel.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="dataTable ss-card martop">
          <DataTable
            value={report}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            globalFilter={globalFilter}
          >
            <Column body={serialNumberTemplate} header="S.No" filter sortable />
            <Column field="amount" header="Withdrawal Amount" filter sortable />
            <Column field="status" header="Status" filter sortable />
            <Column field="createdAt" header="Date" filter sortable />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default WithdrawalReport;

/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { WithdrawalReportContent } from "../../constants/content/dummy/WithdrawalReportContent";

const WithdrawalReport = () => {
  const [globalFilter, setGlobalFilter] = useState(null);

  return (
    <>
      <div className="WithdrawalReport martop">
        <div className="top-wrapper">
          <div className="ss-card">
            <div className="txt">
              <h5 className="heading">Total Withdrawal</h5>
              <p className="para1">$ 5,000</p>
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
              <p className="para1">$ 3,000</p>
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
              <p className="para1">$ 2,000</p>
            </div>
            <div className="icon">
              <img
                src="https://img.icons8.com/3d-fluency/94/cancel.png"
                alt=""
              />
            </div>
          </div>
        </div>
{/* 
        <div className="global-filter-container">
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Global Search"
            className="p-inputtext-sm"
          />
        </div> */}

        <div className="dataTable ss-card martop">
          <DataTable
            value={WithdrawalReportContent}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            globalFilter={globalFilter}
          >
            <Column field="S_No" header="S.No" filter sortable />
            <Column field="Amount" header="Amount ($)" filter sortable />
            <Column field="Admin_charges" header="Admin Charges" filter sortable />
            <Column field="Payable_Amount" header="Payable Amount" filter sortable />
            <Column field="Status" header="Status" filter sortable />
            <Column field="Reason" header="Reason" filter sortable />
            <Column field="Date" header="Date" filter sortable />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default WithdrawalReport;

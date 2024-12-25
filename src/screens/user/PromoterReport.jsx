/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { maskMemberId } from "../../utils/additionalFunc";

const PromoterReport = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const report = userInfo?.partners;
  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const userStatus = (rowData) => {
    return rowData.isActive ? "Active" : "Inactive";
  };

  // Function to mask the email
  const emailMaskVal = (rowData) => {
    return maskMemberId(rowData.email); 
  };
  const totalCommission = (rowData) => {
    const commissionRate = 0.25;
    const investment = rowData.investment;
    
    const commission = investment * commissionRate;
    
    return commission.toFixed(2);
  };

  return (
    <>
      <div className="WithdrawalReport martop">
        <div className="top-wrapper">
          <div className="ss-card">
            <div className="txt">
              <h5 className="heading">Total Earning</h5>
              <p className="para1">$ {userInfo?.totalIncome}</p>
            </div>
            <div className="icon">
              <img
                src="https://img.icons8.com/3d-fluency/94/money-bag.png"
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
            <Column body={emailMaskVal} header="Email" filter sortable />
            <Column body={userStatus} header="Status" filter sortable />
            <Column body={totalCommission} header="Commission" filter sortable />
            <Column field="investment" header="Investment" filter sortable />
            <Column field="createdAt" header="Date" filter sortable />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default PromoterReport;

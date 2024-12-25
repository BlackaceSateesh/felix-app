/* eslint-disable no-unused-vars */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { maskMemberId } from "../../utils/additionalFunc";
import { approvePromoter, getPendingPromoters, rejectPromoter } from "../../api/admin-api";
import PageLoader from "../../components/ui/PageLoader";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";

const PromoterAproval = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [loading, setLoading] = useState(null);
  const [promoterList, setPromoterList] = useState([]);
  const rejectPromoterHandler = async(id) => {
    try {
      setLoading(true);
      await rejectPromoter(id);
      SwalSuccess.fire({
        icon: "success",
        title: "Rejected",
        text: "Promoter Rejected Successfully",
      })
      setInterval(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message,
      })
    }finally{
      setLoading(false);
    }
  };
  const approvePromoterHandler = async(id) => {
    try {
      setLoading(true);
      await approvePromoter(id);
      SwalSuccess.fire({
        icon: "success",
        title: "Approved",
        text: "Promoter Approved Successfully",
      });
      setInterval(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      SwalError.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message,
      })
    }finally{
      setLoading(false);
    }
  };
  const getPendingPromoter = async() => {
    try {
      setLoading(true);
      const response =   await getPendingPromoters();
      setPromoterList(response);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    getPendingPromoter();
  }, []);
  console.log(promoterList);
  

  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const handleApprove = (rowData) => {
    approvePromoterHandler(rowData._id);
  };
  
  const handleReject = (rowData) => {
    rejectPromoterHandler(rowData._id);
  };

  const actionTemplate = (rowData) => {
    return (
      <div className="action-buttons">
        <Button
          label="Approve"
          icon="pi pi-check"
          className="p-button-success p-mr-2"
          onClick={() => handleApprove(rowData)}
          style={{color: "green", marginRight: "10px"}}
          />
        <Button
          label="Reject"
          icon="pi pi-times"
          className="p-button-danger"
          onClick={() => handleReject(rowData)}
          style={{color: "red"}}
        />
      </div>
    );
  };

  return (
    <>
      {loading && <PageLoader />}
      <div className="WithdrawalReport martop">
        <div className="dataTable ss-card martop">
          <DataTable
            value={promoterList}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
            globalFilter={globalFilter}
          >
            <Column body={serialNumberTemplate} header="S.No" filter sortable />
            <Column field="_id" header="ID" filter sortable />
            <Column field="status" header="Status" filter sortable />
            <Column field="createdAt" header="Date" filter sortable />

            <Column body={actionTemplate} header="Actions" />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default PromoterAproval;

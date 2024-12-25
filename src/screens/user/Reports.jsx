import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { ReportContent } from "../../constants/content/dummy/ReportContent";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/dateFunctions";

const Reports = () => {
  const userInfo = useSelector((state) => state.userInfo.userInfo);

  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  useEffect(() => {
    const packageData = userInfo?.package;
    setData([{ sr_id: 1, name: packageData?.packageName, activeDate: formatDate(userInfo?.activeDate) , amount: packageData?.amount }]);
  }, [userInfo]);

  console.log(data);
  return (
    <div className="Reports WithdrawalReport martop">
      <div className="top-wrapper">
        <div className="ss-card">
          <div className="txt">
            <h5 className="heading">Total Investment</h5>
            <p className="para1">$ {userInfo?.investment?.toFixed(2)}</p>
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
            <h5 className="heading">Total Trade Profit</h5>
            <p className="para1">$ {userInfo?.totalIncome?.toFixed(4)}</p>
          </div>
          <div className="icon">
            <img
              src="https://img.icons8.com/3d-fluency/94/approval.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="dataTable ss-card martop">
        <DataTable
          value={data}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          filterDisplay="row"
        >
          <Column field="sr_id" header="Sr No" filter sortable />
          <Column field="name" header="Package" filter sortable />
          <Column field="amount" header="Amount" filter sortable />
          <Column field="activeDate" header="Active Date" filter sortable />
        </DataTable>
      </div>
    </div>
  );
};

export default Reports;

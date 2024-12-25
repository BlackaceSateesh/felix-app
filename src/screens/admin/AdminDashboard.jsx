import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { getTodayTransactions } from "../../api/admin-api";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(null);

  const [totalValues, setTotalValues] = useState({
    totalUser: 0,
    totalInvestment: 0,
    totalPromoter: 0,
    totalWithdrawal: 0,
    todaysWithdrawal: 0,
  });
  const fetchTodayTransactions = async () => {
    try {
      setLoading(true);
      const response = await getTodayTransactions();
      setTotalValues({ ...totalValues, todaysWithdrawal: response?.totalAmount });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTodayTransactions();
  }, []);
  return (
    <>
      {loading && <PageLoader />}

      <div className="UserHome AdminDashboard">
        <div className="income-wrapper mar-top">
          <div className="income-card ss-card">
            <div className="left">
              <h5>Total User</h5>
              <p>0</p>
            </div>
            <div className="right">
              <img
                src={"https://img.icons8.com/3d-fluency/94/coin-wallet.png"}
                alt=""
              />
            </div>
          </div>
          <div className="income-card ss-card">
            <div className="left">
              <h5>Total Investment</h5>
              <p>$0</p>
            </div>
            <div className="right">
              <img
                src={"https://img.icons8.com/3d-fluency/94/expensive-price.png"}
                alt=""
              />
            </div>
          </div>
          <div className="income-card ss-card">
            <div className="left">
              <h5>Total Promoter</h5>
              <p>$0</p>
            </div>
            <div className="right">
              <img
                src={
                  "https://img.icons8.com/3d-fluency/94/change-user-male.png"
                }
                alt=""
              />
            </div>
          </div>
          <div className="income-card ss-card">
            <div className="left">
              <h5>Total Withdrawal</h5>
              <p>$0</p>
            </div>
            <div className="right">
              <img
                src={
                  "https://img.icons8.com/3d-fluency/94/change-user-male.png"
                }
                alt=""
              />
            </div>
          </div>
          <div className="income-card ss-card">
            <div className="left">
              <h5>Todays Withdrawal</h5>
              <p>$0</p>
            </div>
            <div className="right">
              <img
                src={
                  "https://img.icons8.com/3d-fluency/94/change-user-male.png"
                }
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

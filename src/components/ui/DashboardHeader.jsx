import { useEffect } from "react";
import { getUserInfo } from "../../api/auth-api";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../redux/slice/UserInfoSlice";

/* eslint-disable react/prop-types */
const DashboardHeader = ({ name }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  console.log(userInfo);
  useEffect(() => {
    if (!userInfo) {
      const fetchUserInfo = async () => {
        try {
          const user = await getUserInfo();
          dispatch(setUserInfo(user));
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };

      fetchUserInfo();
    }
  }, [dispatch, userInfo]);

  // if (!userInfo) {
  //   return (
  //     <div className="DashboardHeader ss-card">
  //       <div className="pageName">{name}</div>
  //       <div className="user-login">
  //         <div className="img-card ss-card">
  //           <img
  //             src="https://img.icons8.com/3d-fluency/94/guest-male--v2.png"
  //             alt="user"
  //           />
  //         </div>
  //         <h5 className="name">Loading...</h5> {/* Display loading until userInfo is fetched */}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="DashboardHeader ss-card">
      <div className="pageName">{name}</div>
      <div className="user-login">
        <div className="img-card ss-card">
          <img
            src="https://img.icons8.com/3d-fluency/94/guest-male--v2.png"
            alt="user"
          />
        </div>
        <h5 className="name">Hii, {userInfo?.username || "User"}</h5>
      </div>
    </div>
  );
};

export default DashboardHeader;

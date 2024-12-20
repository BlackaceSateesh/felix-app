/* eslint-disable react/prop-types */
const DashboardHeader = ({ name }) => {
  return (
    <>
      <div className="DashboardHeader ss-card">
        <div className="pageName">{name}</div>
        <div className="user-login">
          <div className="img-card ss-card">
            <img src="https://img.icons8.com/3d-fluency/94/guest-male--v2.png" alt="" />
          </div>
          <h5 className="name">Hii, BlackAce</h5>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;

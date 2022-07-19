import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { images } from "../../constants/images";
import UpdateAccount from "./EditProfile/UpdateAccount";
import ChangePasswordForm from "./EditProfile/ChangePasswordForm";
import OrderList from "./OrderList";

import classes from "./Profile.module.css";

const Profile = (props) => {
  const [editProfile, setEditProfile] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const user = useSelector((state) => state.auth.user);

  const editProfileHandler = () => {
    setEditProfile((prev) => !prev);
  };

  /* PAGINATION */
  const orders = user.orders;
  const ordersPerPage = 4;
  const pagesVisited = pageNo * ordersPerPage;
  const pageCount = Math.ceil(orders?.length / ordersPerPage); //Place orders array here

  const displayOrders =
    orders?.slice(pagesVisited, pagesVisited + ordersPerPage).map((orders) => {
      const createdAtDate = orders?.createdAt;
      const date = new Intl.DateTimeFormat(navigator.language, {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(new Date(createdAtDate));
      const amount = orders.amount / 100;
      return (
        <OrderList
          key={orders._id}
          id={orders._id}
          title={orders._id}
          amount={amount}
          createdAt={date}
        />
      );
    }) ?? "";

  const changePageHandler = ({ selected }) => {
    setPageNo(selected);
  };

  const memberSince = new Date(user?.createdAt);
  const date = new Intl.DateTimeFormat(navigator.language, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(memberSince);

  return (
    <div className={classes.profile}>
      {!editProfile && (
        <React.Fragment>
          <div className={classes.orders}>
            <h1>Orders</h1>
            <ul>{displayOrders}</ul>

            {orders?.length > 0 && (
              <ReactPaginate
                previousLabel={
                  <AiOutlineLeft
                    fontSize={25}
                    className={classes["react-icon"]}
                  />
                }
                nextLabel={
                  <AiOutlineRight
                    fontSize={25}
                    className={classes["react-icon"]}
                  />
                }
                pageCount={pageCount}
                onPageChange={changePageHandler}
                containerClassName={classes.paginationContainer}
                previousLinkClassName={classes.prevPage}
                nextLinkClassName={classes.nextPage}
                activeClassName={classes.activePage}
              />
            )}
          </div>
        </React.Fragment>
      )}
      {editProfile && (
        <React.Fragment>
          <div className={classes.editProfile}>
            <h1>Edit Profile</h1>
            <UpdateAccount />
            <div className="line"> &nbsp; </div>
            <ChangePasswordForm />
          </div>
        </React.Fragment>
      )}

      <div className={classes.userProfile}>
        <figure>
          <img src={images.defaultImage} alt="default" />
        </figure>
        <h2>{user?.name}</h2>
        <ul className={classes["userProfile_deets"]}>
          <li>
            <strong>Email:</strong>
            <span>{user?.email}</span>
          </li>
          <li>
            <strong>Verified:</strong>
            <span>Yes</span>
          </li>
          <li>
            <strong>Customer Since:</strong>
            <span>{date}</span>
          </li>
        </ul>
        <button
          type="button"
          className={classes.editBtn}
          onClick={editProfileHandler}
        >
          {editProfile ? "Orders" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;

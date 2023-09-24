import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "views/components/common/ErrorComponent";
import { useSelector } from "react-redux";
import { permissions } from "logic/constants/permissions";

const LayoutAuthentication = (props) => {
  const { children, heading = "" } = props;

  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id && userRole === permissions.ADMIN) {
      navigate("/admin-dashboard");
    }

    if (user && user.id && userRole === permissions.MANAGER) {
      navigate("/manager-dashboard");
    }

    if (user && user.id && userRole === permissions.TRAINER) {
      navigate("/trainer-dashboard");
    }

    if (user && user.id && userRole === permissions.TRAINEE) {
      navigate("/trainee-dashboard");
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div className="relative w-full min-h-screen p-10 bg-slate-300 dark:bg-darkbg isolate flex flex-col justify-center items-center">
      <img
        src="/ellipse.png"
        alt="bg"
        className="hidden lg:block absolute bottom-0 left-0 right-0 pointer-events-none z-[-1]"
      />
      <Link to="/login" className="inline-block">
        <img
          srcSet="/deralogo.png 3x"
          alt="ojt-management-system"
          className="object-fill"
        />
      </Link>
      <div className="w-full max-w-[556px] bg-white dark:bg-darkSecondary rounded-xl px-5 py-8 lg:px-16 lg:py-12 mx-auto">
        <h1 className="mb-1 text-lg font-semibold text-center lg:text-xl lg:mb-3 text-text1 dark:text-white">
          {heading}
        </h1>
        {children}
      </div>
    </div>
  );
};
LayoutAuthentication.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.node,
};
export default withErrorBoundary(LayoutAuthentication, {
  FallbackComponent: ErrorComponent,
});

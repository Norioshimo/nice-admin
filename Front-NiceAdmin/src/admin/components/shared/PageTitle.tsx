import React from "react";
import { Link } from "react-router";

interface PageTitleProps {
  title: string;
  breadcrumbItem: string[];
}

const PageTitle = ({ title, breadcrumbItem }: PageTitleProps) => {
  console.log("Construir PageTitle");
  return (
    <>
      <div
        className="pagetitle"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1>{title}</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              {breadcrumbItem.map((bci, index) => (
                <li
                  key={index}
                  className={`breadcrumb-item ${
                    index === breadcrumbItem.length - 1 ? "active" : ""
                  }`}
                >
                  {bci}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </>
  );
};

export default React.memo(PageTitle);

import type React from "react";

interface Props {
  children: React.ReactNode;

  // eventos
  onFilter: () => void;
}

export const Filters = ({ children, onFilter }: Props) => {
  return (
    <>
      {
        <div className="collapse" id="collapseBuscar">
          <div className="row">
            {children}

            <div
              className="col-12 col-sm-4 col-md-4 col-lg-3"
              style={{ display: "flex", alignItems: "end" }}
            >
              <div style={{ width: "100%", paddingTop: "10px" }}>
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  style={{ width: "100%" }}
                  onClick={onFilter}
                >
                  Filtrar
                </button>
              </div>
            </div>
          </div>
          <br />
        </div>
      }
    </>
  );
};

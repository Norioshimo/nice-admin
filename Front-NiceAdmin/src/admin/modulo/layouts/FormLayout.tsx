import React from "react";
import { Loading } from "../../components/utils";

interface Props {
  title: string;
  children: React.ReactNode;

  // Control de visibilidad
  showFilter?: boolean;
  showCreate?: boolean;
  showSave?: boolean;
  showCancel?: boolean;

  // Eventos
  onCreateClick?: () => void;
  onCancelClick?: () => void;
  onSaveClick?: (e?: React.BaseSyntheticEvent) => void;
}

const FormLayout = ({
  title,
  children,
  showFilter = false,
  showCreate = false,
  showSave = false,
  showCancel = false,
  onCreateClick,
  onCancelClick,
  onSaveClick,
}: Props) => {
  return (
    <>
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="container">
                  <form noValidate onSubmit={onSaveClick}>
                    <div className="row">
                      <div className="col-md-6">
                        <h5
                          className="card-title"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {title}
                        </h5>
                      </div>

                      <div className="col-md-6 actions-buttons gap-1">
                        {showCreate && (
                          <button
                            type="button"
                            className="btn btn-success btn-sm"
                            onClick={onCreateClick}
                          >
                            Crear
                          </button>
                        )}

                        {showFilter && (
                          <button
                            type="button"
                            className="btn btn-success btn-sm"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseBuscar"
                            aria-expanded="false"
                            aria-controls="collapseBuscar"
                          >
                            Buscador
                          </button>
                        )}

                        {showSave && (
                          <button
                            type="submit"
                            className="btn btn-success btn-sm"
                          >
                            <Loading isPosting={false} texto="Guardar" />
                          </button>
                        )}

                        {showCancel && (
                          <button
                            type="button"
                            className="btn btn-success btn-sm"
                            onClick={onCancelClick}
                          >
                            Cancelar
                          </button>
                        )}
                      </div>
                    </div>

                    {children}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FormLayout;

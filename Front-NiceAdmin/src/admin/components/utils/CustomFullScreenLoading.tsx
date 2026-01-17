export const CustomFullScreenLoading = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      {/* Spinner de Bootstrap */}
      <div className="spinner-border text-primary mb-3" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>

      {/* Mensaje */}
      <h1>Cargando, por favor espere...</h1>
    </div>
  );
};

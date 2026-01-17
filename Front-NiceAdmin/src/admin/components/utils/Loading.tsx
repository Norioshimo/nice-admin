interface Props {
  isPosting: boolean;
  texto: string;
}

export const Loading = ({ isPosting, texto }: Props) => {
  return (
    <>
      {isPosting ? (
        <>
          <span
             style={{ marginRight: '8px' }}
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span>Procesando...</span>
        </>
      ) : (
        texto
      )}
    </>
  );
};

interface FooterProps {
  isLogin: boolean;
}

export const Footer = ({ isLogin }: FooterProps) => {
  return (
    <>
      <footer
        id="footer" 
        className={
          isLogin
            ? "login-footer"
            : "footer"
        }
      >
        <div className="copyright">
          &copy; Copyright{" "}
          <strong>
            <span>NiceAdmin</span>
          </strong>
          . All Rights Reserved
        </div>
        <div className="credits">
          Designed by <a href="#">Unknown</a>
        </div>
      </footer>
    </>
  );
};
